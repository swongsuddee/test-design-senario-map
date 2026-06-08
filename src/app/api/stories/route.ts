import { NextResponse } from 'next/server';
import { ALL_STORIES } from '@/data/stories';

export async function GET() {
  return NextResponse.json(ALL_STORIES.map(s => ({
    id:    s.id,
    slug:  s.href.slice(1),
    title: s.title,
  })));
}
