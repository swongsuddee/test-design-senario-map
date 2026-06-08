import { NextRequest, NextResponse } from 'next/server';
import { ALL_STORIES } from '@/data/stories';
import type { TcSectionDef } from '@/types';

export async function GET(req: NextRequest) {
  const storyId = req.nextUrl.searchParams.get('storyId');
  if (!storyId) return NextResponse.json({ error: 'storyId required' }, { status: 400 });

  const story = ALL_STORIES.find(s => s.id === storyId);
  if (!story) return NextResponse.json({ error: 'story not found' }, { status: 404 });

  const slug = story.href.slice(1);

  try {
    const mod = await import(`@/data/${slug}/testcases`) as { TC_SECTIONS: TcSectionDef[] };
    const tcs = mod.TC_SECTIONS.flatMap(section =>
      section.rows.map(r => ({
        id:       r.id,
        summary:  r.summary,
        priority: r.priority,
        auto:     r.auto,
        type:     (r as unknown as Record<string, unknown>).type as string | undefined,
      }))
    );
    return NextResponse.json({ storyId, slug, tcs });
  } catch {
    return NextResponse.json({ error: `no testcases found for ${slug}` }, { status: 404 });
  }
}
