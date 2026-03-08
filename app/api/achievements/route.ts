import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { readDb, writeDb } from '@/lib/db';
import { Achievement } from '@/types/portfolio';

export async function GET() {
  try {
    const data = readDb();
    return NextResponse.json(data.achievements);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 });
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
    
    const newAchievement: Achievement = {
      ...body,
      id: `achievement-${Date.now()}`,
      order: data.achievements.length + 1,
    };
    
    data.achievements.push(newAchievement);
    writeDb(data);
    
    return NextResponse.json(newAchievement);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create achievement' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = readDb();
    
    const index = data.achievements.findIndex(a => a.id === body.id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Achievement not found' }, { status: 404 });
    }
    
    data.achievements[index] = body;
    writeDb(data);
    
    return NextResponse.json(data.achievements[index]);
  } catch (error) {
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
    
    const data = readDb();
    data.achievements = data.achievements.filter(a => a.id !== id);
    writeDb(data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete achievement' }, { status: 500 });
  }
}
