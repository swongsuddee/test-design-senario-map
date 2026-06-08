import { NextRequest, NextResponse } from 'next/server';
import { setRejection } from '@/server/reviews';
import { emitRefresh } from '@/server/bus';
import { normalizeStoryId } from '@/server/normalize';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { storyId?: string; tcId?: string; reason?: string };
    const { storyId: rawStoryId, tcId, reason } = body;
    const storyId = normalizeStoryId(rawStoryId ?? '');
    if (!storyId || !tcId || reason === undefined) {
      return NextResponse.json({ error: 'storyId, tcId and reason are required' }, { status: 400 });
    }
    await setRejection(storyId, tcId, reason);
    emitRefresh(storyId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[rejections POST]', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
