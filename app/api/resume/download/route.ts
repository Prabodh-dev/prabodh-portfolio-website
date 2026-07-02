import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import connectDB from "@/lib/mongodb";
import { Resume } from "@/lib/models/resume";

export async function GET() {
  try {
    await connectDB();
    const resume = await Resume.findOne();

    if (!resume?.url && !resume?.downloadUrl) {
      const localPath = path.join(process.cwd(), "public", "resume.pdf");

      try {
        const buffer = await readFile(localPath);

        return new NextResponse(buffer, {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="resume.pdf"',
          },
        });
      } catch {
        return NextResponse.json(
          { error: "Resume not found" },
          { status: 404 },
        );
      }
    }

    const sourceUrl = resume.downloadUrl || resume.url;

    if (sourceUrl.startsWith("/")) {
      const localPath = path.join(process.cwd(), "public", sourceUrl);
      const buffer = await readFile(localPath);

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="resume.pdf"',
        },
      });
    }

    const response = await fetch(sourceUrl);

    if (!response.ok || !response.body) {
      return NextResponse.json(
        { error: "Failed to fetch resume" },
        { status: 502 },
      );
    }

    const contentType =
      response.headers.get("content-type") || "application/pdf";
    const contentLength = response.headers.get("content-length");

    return new NextResponse(response.body, {
      headers: {
        "Content-Type": contentType,
        ...(contentLength ? { "Content-Length": contentLength } : {}),
        "Content-Disposition": 'attachment; filename="resume.pdf"',
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to download resume" },
      { status: 500 },
    );
  }
}
