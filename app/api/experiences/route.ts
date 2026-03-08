import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { readDb, writeDb } from '@/lib/db';
import { Experience } from '@/types/portfolio';

export async function GET() {
  try {
    const data = readDb();
    return NextResponse.json(data.experiences);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
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
    
    const newExperience: Experience = {
      ...body,
      id: `exp-${Date.now()}`,
      order: data.experiences.length + 1,
    };
    
    data.experiences.push(newExperience);
    writeDb(data);
    
    return NextResponse.json(newExperience);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
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
    
    const index = data.experiences.findIndex(e => e.id === body.id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }
    
    data.experiences[index] = body;
    writeDb(data);
    
    return NextResponse.json(data.experiences[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
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
    data.experiences = data.experiences.filter(e => e.id !== id);
    writeDb(data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
  }
}
