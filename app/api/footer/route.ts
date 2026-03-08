import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { readDb, updateSection } from '@/lib/db';

export async function GET() {
  try {
    const data = readDb();
    return NextResponse.json(data.footer);
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
    const body = await request.json();
    updateSection('footer', body);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update footer' }, { status: 500 });
  }
}
