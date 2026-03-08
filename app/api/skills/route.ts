import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import { SkillCategory } from '@/lib/models/skills';

export async function GET() {
  try {
    await connectDB();
    const skillCategories = await SkillCategory.find().sort({ order: 1 });
    return NextResponse.json(skillCategories);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await request.json();
    
    // Delete all existing categories and insert new ones
    await SkillCategory.deleteMany({});
    await SkillCategory.insertMany(body);
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update skills' }, { status: 500 });
  }
}
