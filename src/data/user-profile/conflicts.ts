import type { ClarifyItem } from '@/types';

export const CONFLICT_ITEMS: ClarifyItem[] = [
  {
    id: 'C1',
    type: 'question',
    status: 'pending',
    title: 'DELETE account — empty string reason behaviour',
    body: 'The endpoint schema marks `reason` as `required: ["reason"]` but defines no `minLength`. Sending `reason: ""` passes schema validation. Should the API accept an empty string as a valid reason, or reject it at business logic level?',
    affectedTc: 'UP-TC-027',
    date: '2026-06-01',
  },
];
