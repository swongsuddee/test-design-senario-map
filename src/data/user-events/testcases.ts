import type { TcSectionDef } from '@/types';

export const TC_SECTIONS: TcSectionDef[] = [
  {
    sectionId: 'tc-get-events',
    num: '4',
    title: 'Test Cases · GET /api/v1/events',
    subtitle: 'UE-TC-001–007 · list · search · pagination · auth guard',
    cols: ['type', 'labels'],
    rows: [
      { id: 'UE-TC-001', summary: 'default call (no query params) → 200 + data (array) + meta (object)', type: 'Functional', priority: 'high', auto: 'auto', labels: [['smoke','Smoke'],['api','API'],['ep','EP']] },
      { id: 'UE-TC-002', summary: '200 response schema: each event object has required id (string) + title (string)', type: 'Functional', priority: 'high', auto: 'auto', labels: [['api','API'],['ep','EP']] },
      { id: 'UE-TC-003', summary: 'search ?q={keyword} → 200 + data array filtered to matching events', type: 'Functional', priority: 'medium', auto: 'auto', labels: [['api','API'],['ep','EP']] },
      { id: 'UE-TC-004', summary: 'pagination ?page=1&limit=5 → 200 + meta.limit=5 + data.length ≤ 5', type: 'Functional', priority: 'medium', auto: 'auto', labels: [['api','API'],['ep','EP']] },
      { id: 'UE-TC-005', summary: 'page beyond total ?page=9999 → 200 + data:[] (empty array)', type: 'Negative', priority: 'medium', auto: 'auto', labels: [['api','API'],['ep','EP']] },
      { id: 'UE-TC-006', summary: 'no Authorization header → 401 + error + message', type: 'Negative', priority: 'high', auto: 'auto', labels: [['api','API'],['ep','EP']] },
      { id: 'UE-TC-007', summary: 'invalid/expired token → 401 + error + message', type: 'Negative', priority: 'high', auto: 'auto', labels: [['api','API'],['ep','EP']] },
    ],
  },
  {
    sectionId: 'tc-save-event',
    num: '5',
    title: 'Test Cases · POST /api/v1/events/{eventId}/save',
    subtitle: 'UE-TC-008–012 · save toggle · non-existent event · auth guard',
    cols: ['type', 'labels'],
    rows: [
      { id: 'UE-TC-008', summary: 'save valid eventId → 200 + success:true + saved:true', type: 'Functional', priority: 'high', auto: 'auto', labels: [['smoke','Smoke'],['api','API'],['ep','EP']] },
      { id: 'UE-TC-009', summary: 'save already-saved eventId (second call) → 200 + saved:false (toggle) or saved:true (idempotent) — C1 clarify', type: 'Functional', priority: 'medium', auto: 'auto', labels: [['api','API'],['st','ST']] },
      { id: 'UE-TC-010', summary: 'non-existent eventId → 404 (or 200 with saved:false) — C2 clarify', type: 'Negative', priority: 'medium', auto: 'auto', labels: [['api','API'],['ep','EP']] },
      { id: 'UE-TC-011', summary: 'no Authorization header → 401', type: 'Negative', priority: 'high', auto: 'auto', labels: [['api','API'],['ep','EP']] },
      { id: 'UE-TC-012', summary: 'invalid/expired token → 401', type: 'Negative', priority: 'high', auto: 'auto', labels: [['api','API'],['ep','EP']] },
    ],
  },
];
