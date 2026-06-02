import type { ClarifyItem } from '@/types';

export const CONFLICT_ITEMS: ClarifyItem[] = [
  {
    id: 'C1',
    type: 'conflict',
    status: 'resolved',
    title: 'Refresh Failure HTTP Status — 401 Only or Also 403?',
    body: 'AC 1.3 specifies force logout when the refresh token is expired or invalid but does not state which HTTP status codes the refresh endpoint returns. The diagram and test design assumed both 401 and 403, but this was QA inference rather than a confirmed spec. Leaving 403 unhandled is a security issue.',
    resolution: 'Both 401 (token expired) and 403 (token revoked/blacklisted) must trigger force logout and redirect to Login. PP20-TC-004 is split into TC-004a (401) and TC-004b (403).',
    affectedTc: 'PP20-TC-004',
    date: '2026-05-16',
  },
  {
    id: 'C2',
    type: 'conflict',
    status: 'resolved',
    title: 'Silent Refresh Duplicated — PP-20 AC 1.2 vs. PP-2 Sub-Flow 4',
    body: 'PP-20 AC 1.2 describes reactive silent refresh on 401 while PP-2 Sub-Flow 4 (T35) describes proactive refresh when a token is near expiry. Both appear to describe the same mechanism, raising concern about duplicate implementation and whether PP20-TC-003 and PP2-TC-043 test the same code path.',
    resolution: 'There is no duplicate: both stories describe the same single `/refresh-token` flow. PP-2 T35 triggers via `accessTokenExpiredAt` (proactive); PP-20 AC 1.2 triggers via 401 interceptor (reactive). Both lead to the same call. Force logout only occurs when the refresh token itself is expired.',
    affectedTc: 'PP20-TC-003, PP2-TC-043',
    date: '2026-05-16',
  },
  {
    id: 'Q1',
    type: 'question',
    status: 'resolved',
    title: 'Concurrent 401 Responses — Race Condition Not Specified',
    body: 'AC 1.2 covers single-call silent refresh but does not address concurrent API calls that all receive 401 simultaneously. Without a guard, each call would independently attempt to refresh, causing subsequent calls to use an already-invalidated rotating refresh token and triggering an unwarranted force logout.',
    resolution: 'Backend uses rotating refresh tokens (one-time-use). Frontend must implement a single-in-flight refresh guard so only one `/refresh-token` call fires; concurrent 401s must queue and retry with the new token. A new concurrent test case (PP20-TC-003-concurrent) is required.',
    affectedTc: 'PP20-TC-003',
    date: '2026-05-16',
  },
  {
    id: 'Q2',
    type: 'question',
    status: 'pending',
    title: 'Secure Storage Library Not Specified',
    body: 'AC 1.1 requires "Secure Storage" but does not name the library or mechanism. The test design assumed Keychain (iOS) and EncryptedSharedPreferences (Android) as QA inference. Without knowing the actual Flutter plugin and key names, PP20-TC-001 cannot include a technical assertion and falls back to trust-based verification.',
    affectedTc: 'PP20-TC-001',
    date: '2026-05-16',
  },
];
