import { NextRequest, NextResponse } from 'next/server';
import { getAllReviewed, getComments, getRejections, toggleReviewed } from '@/server/reviews';
import type { ReviewType } from '@/server/reviews';
import { emitRefresh } from '@/server/bus';
import { normalizeStoryId } from '@/server/normalize';

export async function GET(req: NextRequest) {
  try {
    const storyId = normalizeStoryId(req.nextUrl.searchParams.get('storyId') ?? '');
    if (!storyId) return NextResponse.json({ error: 'storyId required' }, { status: 400 });
    const [reviews, comments, rejections] = await Promise.all([
      getAllReviewed(storyId), getComments(storyId), getRejections(storyId),
    ]);
    return NextResponse.json({ ...reviews, comments, rejections });
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
    const { storyId: rawStoryId, tcId, type, checked } = body;
    const storyId = normalizeStoryId(rawStoryId ?? '');
    if (!storyId || !tcId || !type || checked === undefined) {
      return NextResponse.json({ error: 'storyId, tcId, type and checked are required' }, { status: 400 });
    }
    await toggleReviewed(storyId, tcId, type, checked);
    emitRefresh(storyId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[reviews POST]', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
