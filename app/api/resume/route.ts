import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import { Resume } from '@/lib/models/resume';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    await connectDB();
    const resume = await Resume.findOne();
    return NextResponse.json(resume);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch resume' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch {
      // Directory might already exist
    }

    const filename = `resume-${Date.now()}.pdf`;
    const filepath = path.join(uploadsDir, filename);

    await writeFile(filepath, buffer);

    const resumeData = {
      fileName: filename,
      uploadDate: new Date(),
    };

    await connectDB();
    await Resume.findOneAndUpdate({}, resumeData, { upsert: true, new: true });

    return NextResponse.json({ success: true, fileName: filename });
  } catch {
    console.error('Resume upload error');
    return NextResponse.json({ error: 'Failed to upload resume' }, { status: 500 });
  }
}
