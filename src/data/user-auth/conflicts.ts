import type { ClarifyItem } from '@/types';

export const CONFLICT_ITEMS: ClarifyItem[] = [
  {
    id: 'Q1',
    type: 'question',
    status: 'pending',
    title: 'UA-LOGIN-TC-008 expected result is stale',
    body: 'The old design expected unregistered phone + bypass verify-otp to return 401/404. The current implementation comments say verify-otp returns 200 for any valid OTP session token and registration state is represented by isRegistered or first-login auto-creation. Confirm the intended backend behavior and whether this case belongs under login at all.',
    affectedTc: 'UA-LOGIN-TC-008',
    date: '2026-06-02',
  },
  {
    id: 'Q2',
    type: 'question',
    status: 'closed',
    title: 'Token contract text still mentions expiresIn and tokenType',
    body: 'The endpoint schema and auth DTO mapper currently model accessToken, refreshToken, and isRegistered only. Historical test-design text and summaries still mention expiresIn and tokenType. Confirm whether the API contract changed or whether the tests are under-asserting the real 200 payload.',
    resolution: 'Test case summaries have been updated to the new naming convention. expiresIn and tokenType references removed from design. Current contract is accessToken + refreshToken + isRegistered only.',
    affectedTc: 'UA-LOGIN-TC-001',
    date: '2026-06-02',
  },
  {
    id: 'S1',
    type: 'suggestion',
    status: 'closed',
    title: 'Registration validation design is broader than the implemented spec',
    body: 'The presentation design includes request-otp boundary and EP coverage for 10-digit, 8-digit, 11-digit, letters, and +66 prefix. The current registration Playwright spec primarily implements missing-field negatives and happy-path flow checks. Either add the missing request-otp validation tests or lower the page status from fully implemented.',
    resolution: 'Acknowledged. Design is authoritative — implementation gap is tracked separately. Cleared from review.',
    affectedTc: 'UA-REG-TC-002',
    date: '2026-06-02',
  },
  {
    id: 'S2',
    type: 'suggestion',
    status: 'closed',
    title: 'Request-otp empty-body negative is missing from the canonical user-auth design',
    body: 'The implemented API specs include empty body → 400 for request-otp, but the current presentation test-case list does not capture that case. Add it explicitly if this page is intended to remain the single source of truth for implementation coverage.',
    resolution: 'UA-REG-TC-005 covers empty request-otp body → 400. Confirmed present in design. Cleared from review.',
    affectedTc: 'UA-REG-TC-008',
    date: '2026-06-02',
  },
];
