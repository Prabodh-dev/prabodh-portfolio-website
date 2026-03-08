import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { readDb, writeDb } from '@/lib/db';
import { Project } from '@/types/portfolio';

export async function GET() {
  try {
    const data = readDb();
    return NextResponse.json(data.projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = readDb();
    
    const newProject: Project = {
      ...body,
      id: `project-${Date.now()}`,
      order: data.projects.length + 1,
    };
    
    data.projects.push(newProject);
    writeDb(data);
    
    return NextResponse.json(newProject);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
