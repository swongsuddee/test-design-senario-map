import { NextRequest, NextResponse } from 'next/server';
import { getAllReviewed, toggleReviewed } from '@/db/reviews';
import type { ReviewType } from '@/db/reviews';

export async function GET(req: NextRequest) {
  try {
    const storyId = req.nextUrl.searchParams.get('storyId');
    if (!storyId) return NextResponse.json({ error: 'storyId required' }, { status: 400 });
    return NextResponse.json(await getAllReviewed(storyId));
  } catch (err) {
    console.error('[reviews GET]', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      storyId?: string; tcId?: string;
      type?: ReviewType; checked?: boolean;
    };
    const { storyId, tcId, type, checked } = body;
    if (!storyId || !tcId || !type || checked === undefined) {
      return NextResponse.json({ error: 'storyId, tcId, type and checked are required' }, { status: 400 });
    }
    await toggleReviewed(storyId, tcId, type, checked);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[reviews POST]', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
