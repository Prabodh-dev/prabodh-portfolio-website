import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import { Resume } from '@/lib/models/resume';
import { writeFile } from 'fs/promises';
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

    // Save as static resume.pdf in public folder
    const filepath = path.join(process.cwd(), 'public', 'resume.pdf');
    await writeFile(filepath, buffer);

    const resumeData = {
      fileName: 'resume.pdf',
      uploadDate: new Date(),
    };

    await connectDB();
    await Resume.findOneAndUpdate({}, resumeData, { upsert: true, new: true });

    return NextResponse.json({ success: true, fileName: 'resume.pdf' });
  } catch {
    return NextResponse.json({ error: 'Failed to upload resume' }, { status: 500 });
  }
}
