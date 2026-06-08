import { NextRequest } from 'next/server';
import { onRefresh } from '@/server/bus';
import { normalizeStoryId } from '@/server/normalize';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const storyId = normalizeStoryId(req.nextUrl.searchParams.get('storyId') ?? '');
  const enc = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const send = () => {
        try { controller.enqueue(enc.encode('data: refresh\n\n')); } catch { /* closed */ }
      };

      const unsub = onRefresh(storyId, send);

      // heartbeat every 20 s to keep the connection alive through proxies
      const hb = setInterval(() => {
        try { controller.enqueue(enc.encode(': heartbeat\n\n')); } catch { clearInterval(hb); }
      }, 20_000);

      req.signal.addEventListener('abort', () => {
        clearInterval(hb);
        unsub();
        try { controller.close(); } catch { /* already closed */ }
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type':  'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection':    'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
