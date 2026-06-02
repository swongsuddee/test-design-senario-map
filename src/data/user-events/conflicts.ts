import type { ClarifyItem } from '@/types';

export const CONFLICT_ITEMS: ClarifyItem[] = [
  {
    id: 'C1',
    type: 'question',
    status: 'pending',
    title: 'POST /events/{eventId}/save — toggle or idempotent?',
    body: 'The endpoint response has `saved: boolean`. Calling save twice on the same event: does `saved` toggle (true → false → true) or stay idempotent (always true)? The endpoint definition does not specify. This affects whether UE-TC-009 should assert `saved:false` or `saved:true`.',
    affectedTc: 'UE-TC-009',
    date: '2026-06-01',
  },
  {
    id: 'C2',
    type: 'question',
    status: 'pending',
    title: 'POST /events/{eventId}/save — non-existent eventId response code',
    body: 'The endpoint schema only documents a 200 response. If `eventId` does not exist in the database, the expected status code is unclear — could be 404, 400, or 200 with `saved:false`. Needs confirmation from backend team.',
    affectedTc: 'UE-TC-010',
    date: '2026-06-01',
  },
];
