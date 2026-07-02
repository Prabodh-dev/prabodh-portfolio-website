import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import { Project } from "@/lib/models/projects";

function validateProjectPayload(body: Record<string, unknown>) {
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const summary = typeof body.summary === "string" ? body.summary.trim() : "";
  const description =
    typeof body.description === "string" ? body.description.trim() : "";
  const status = typeof body.status === "string" ? body.status.trim() : "";

  if (!title || !summary || !description || !status) {
    return "Title, summary, description, and status are required";
  }

  return null;
}

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort({ order: 1 });
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
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
    await connectDB();
    const body = await request.json();

    const validationError = validateProjectPayload(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const projectCount = await Project.countDocuments();

    const newProject = await Project.create({
      ...body,
      id: `project-${Date.now()}`,
      order: projectCount + 1,
    });

    return NextResponse.json(newProject);
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
