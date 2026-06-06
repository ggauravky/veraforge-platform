import { NextResponse } from 'next/server';
import { getOrCreateUser } from '@/lib/auth-sync';

export async function GET() {
  try {
    const user = await getOrCreateUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    return NextResponse.json({ user });
  } catch (error: any) {
    console.error('API /api/dev/me error:', error);
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
