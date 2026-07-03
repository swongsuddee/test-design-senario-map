import { NextRequest, NextResponse } from 'next/server';
import {
  addClarifyComment, editClarifyComment,
  deleteClarifyComment, getClarifyCommentStoryId,
} from '@/server/reviews';
import { emitRefresh } from '@/server/bus';
import { normalizeStoryId } from '@/server/normalize';
import { triggerClarifyClaudeResponse } from '@/server/clarify-responder';
import { triggerClarifyGptResponse } from '@/server/clarify-responder';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      storyId?: string; clarifyId?: string; author?: string; content?: string;
    };
    const { storyId: rawStoryId, clarifyId, author, content } = body;
    const storyId = normalizeStoryId(rawStoryId ?? '');
    if (!storyId || !clarifyId || !author || !content) {
      return NextResponse.json(
        { error: 'storyId, clarifyId, author and content are required' },
        { status: 400 },
      );
    }
    const comment = await addClarifyComment(storyId, clarifyId, author, content);
    emitRefresh(storyId);

    if (/\@claude\b/i.test(content) && author.toLowerCase() !== 'claude') {
      triggerClarifyClaudeResponse(storyId, clarifyId, { author, content }).catch(err => {
        console.error('[clarify-claude-responder]', err);
      });
    }
    if (/\@gpt\b/i.test(content) && author.toLowerCase() !== 'gpt') {
      triggerClarifyGptResponse(storyId, clarifyId, { author, content }).catch(err => {
        console.error('[clarify-gpt-responder]', err);
      });
    }

    return NextResponse.json({ comment });
  } catch (err) {
    console.error('[clarify-comments POST]', err);
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
    const storyId = await getClarifyCommentStoryId(id);
    await editClarifyComment(id, content);
    if (storyId) emitRefresh(storyId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[clarify-comments PUT]', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const idStr = req.nextUrl.searchParams.get('id');
    if (!idStr) return NextResponse.json({ error: 'id is required' }, { status: 400 });
    const id = parseInt(idStr, 10);
    if (isNaN(id)) return NextResponse.json({ error: 'id must be a number' }, { status: 400 });
    const storyId = await getClarifyCommentStoryId(id);
    await deleteClarifyComment(id);
    if (storyId) emitRefresh(storyId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[clarify-comments DELETE]', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
