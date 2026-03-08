import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import { Achievement } from '@/lib/models/achievements';

export async function GET() {
  try {
    await connectDB();
    const achievements = await Achievement.find().sort({ order: 1 });
    return NextResponse.json(achievements);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await request.json();
    
    const achievementCount = await Achievement.countDocuments();
    
    const newAchievement = await Achievement.create({
      ...body,
      id: `achievement-${Date.now()}`,
      order: achievementCount + 1,
    });
    
    return NextResponse.json(newAchievement);
  } catch {
    return NextResponse.json({ error: 'Failed to create achievement' }, { status: 500 });
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
    
    const achievement = await Achievement.findOneAndUpdate(
      { id: body.id },
      body,
      { new: true }
    );
    
    if (!achievement) {
      return NextResponse.json({ error: 'Achievement not found' }, { status: 404 });
    }
    
    return NextResponse.json(achievement);
  } catch {
    return NextResponse.json({ error: 'Failed to update achievement' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    
    await connectDB();
    await Achievement.findOneAndDelete({ id });
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete achievement' }, { status: 500 });
  }
}
