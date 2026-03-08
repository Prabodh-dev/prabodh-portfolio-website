import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import { Footer } from '@/lib/models/footer';

export async function GET() {
  try {
    await connectDB();
    const footer = await Footer.findOne();
    return NextResponse.json(footer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch footer' }, { status: 500 });
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
    await Footer.findOneAndUpdate({}, body, { upsert: true, new: true });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update footer' }, { status: 500 });
  }
}
