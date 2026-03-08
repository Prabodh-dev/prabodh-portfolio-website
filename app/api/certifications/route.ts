import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { readDb, writeDb } from '@/lib/db';
import { Certification } from '@/types/portfolio';

export async function GET() {
  try {
    const data = readDb();
    return NextResponse.json(data.certifications);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch certifications' }, { status: 500 });
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
    
    const newCert: Certification = {
      ...body,
      id: `cert-${Date.now()}`,
      order: data.certifications.length + 1,
    };
    
    data.certifications.push(newCert);
    writeDb(data);
    
    return NextResponse.json(newCert);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create certification' }, { status: 500 });
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
    
    const id = body.id;
    const index = data.certifications.findIndex(c => c.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Certification not found' }, { status: 404 });
    }
    
    data.certifications[index] = body;
    writeDb(data);
    
    return NextResponse.json(data.certifications[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update certification' }, { status: 500 });
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
    data.certifications = data.certifications.filter(c => c.id !== id);
    writeDb(data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete certification' }, { status: 500 });
  }
}
