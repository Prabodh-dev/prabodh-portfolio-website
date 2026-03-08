import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import { Certification } from '@/lib/models/certifications';

export async function GET() {
  try {
    await connectDB();
    const certifications = await Certification.find().sort({ order: 1 });
    return NextResponse.json(certifications);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch certifications' }, { status: 500 });
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
    
    const certCount = await Certification.countDocuments();
    
    const newCert = await Certification.create({
      ...body,
      id: `cert-${Date.now()}`,
      order: certCount + 1,
    });
    
    return NextResponse.json(newCert);
  } catch {
    return NextResponse.json({ error: 'Failed to create certification' }, { status: 500 });
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
    const id = body.id;
    
    const cert = await Certification.findOneAndUpdate(
      { id },
      body,
      { new: true }
    );
    
    if (!cert) {
      return NextResponse.json({ error: 'Certification not found' }, { status: 404 });
    }
    
    return NextResponse.json(cert);
  } catch {
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
    
    await connectDB();
    await Certification.findOneAndDelete({ id });
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete certification' }, { status: 500 });
  }
}
