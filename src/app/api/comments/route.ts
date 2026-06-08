import { NextRequest, NextResponse } from 'next/server';
import { addComment, editComment, deleteComment, getCommentStoryId } from '@/server/reviews';
import { emitRefresh } from '@/server/bus';
import { normalizeStoryId } from '@/server/normalize';
import { triggerClaudeResponse } from '@/server/claude-responder';
import { triggerGptResponse } from '@/server/gpt-responder';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      storyId?: string; tcId?: string; author?: string; content?: string;
    };
    const { storyId: rawStoryId, tcId, author, content } = body;
    const storyId = normalizeStoryId(rawStoryId ?? '');
    if (!storyId || !tcId || !author || !content) {
      return NextResponse.json({ error: 'storyId, tcId, author and content are required' }, { status: 400 });
    }
    const comment = await addComment(storyId, tcId, author, content);
    emitRefresh(storyId);

    // If the comment mentions @Claude (and wasn't written by Claude itself), trigger an async response
    if (/\@claude\b/i.test(content) && author.toLowerCase() !== 'claude') {
      triggerClaudeResponse(storyId, tcId, { author, content }).catch(err => {
        console.error('[claude-responder]', err);
      });
    }

    if (/\@gpt\b/i.test(content) && author.toLowerCase() !== 'gpt') {
      triggerGptResponse(storyId, tcId, { author, content }).catch(err => {
        console.error('[gpt-responder]', err);
      });
    }

    return NextResponse.json({ comment });
  } catch (err) {
    console.error('[comments POST]', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json() as { id?: number; content?: string };
    const { id, content } = body;
    if (id === undefined || content === undefined) {
      return NextResponse.json({ error: 'id and content are required' }, { status: 400 });
    }
    const storyId = await getCommentStoryId(id);
    await editComment(id, content);
    if (storyId) emitRefresh(storyId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[comments PUT]', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const idStr = req.nextUrl.searchParams.get('id');
    if (!idStr) return NextResponse.json({ error: 'id is required' }, { status: 400 });
    const id = parseInt(idStr, 10);
    if (isNaN(id)) return NextResponse.json({ error: 'id must be a number' }, { status: 400 });
    const storyId = await getCommentStoryId(id);
    await deleteComment(id);
    if (storyId) emitRefresh(storyId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[comments DELETE]', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
