import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import { Resume } from "@/lib/models/resume";
import cloudinary from "@/lib/cloudinary";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    await connectDB();
    const resume = await Resume.findOne();
    return NextResponse.json(resume);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch resume" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDate = new Date();
    let fileName = file.name;
    let url = "";
    let downloadUrl = "";

    const hasCloudinaryConfig =
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET;

    if (hasCloudinaryConfig) {
      const base64 = buffer.toString("base64");
      const dataURI = `data:${file.type || "application/pdf"};base64,${base64}`;
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "portfolio/resume",
        resource_type: "raw",
        public_id: `resume-${Date.now()}`,
      });

      url = result.secure_url;
      downloadUrl = result.secure_url.replace(
        "/upload/",
        "/upload/fl_attachment/",
      );
    } else {
      // Local fallback for development environments.
      const filepath = path.join(process.cwd(), "public", "resume.pdf");
      await writeFile(filepath, buffer);
      fileName = "resume.pdf";
      url = "/resume.pdf";
      downloadUrl = "/resume.pdf";
    }

    const resumeData = {
      fileName,
      uploadDate,
      url,
      downloadUrl,
    };

    await connectDB();
    await Resume.findOneAndUpdate({}, resumeData, { upsert: true, new: true });

    return NextResponse.json({ success: true, ...resumeData });
  } catch {
    return NextResponse.json(
      { error: "Failed to upload resume" },
      { status: 500 },
    );
  }
}
