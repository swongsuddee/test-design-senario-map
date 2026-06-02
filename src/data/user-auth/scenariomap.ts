import type { DagNode, DagEdge, Scenario } from '@/types';

// ── DAG — User Auth API Action & State Flow ────────────────────────────────────
//
//         col 0          col 1              col 2
// row 0:             [Initial State]                  ← state (circle)
// row 1:  [Error 400] [POST req-otp]                  ← circle, rect
// row 2:             [POST verify-otp]  [Error 401]   ← rect, circle
// row 3: [Profile Loaded]              [POST refresh] ← circle, rect
//
// Round nodes  = states  (where you are)
// Rect  nodes  = actions (what you call)
// E400 = validation / schema error (400)
// E401 = wrong pin or unregistered phone (401)

export const SM_NODES: DagNode[] = [
  { id: 'INIT',    name: 'Initial\nState',        type: 'action',   row: 0, col: 1 },
  { id: 'E400',    name: 'Error\n400',             type: 'decision', row: 1, col: 0 },
  { id: 'OTP',     name: 'POST\nrequest-otp',      type: 'action',   row: 1, col: 1, shape: 'rect' },
  { id: 'AUTH',    name: 'POST\nverify-otp',       type: 'action',   row: 2, col: 1, shape: 'rect' },
  { id: 'E401',    name: 'Error\n401',             type: 'decision', row: 2, col: 2 },
  { id: 'PROFILE', name: 'Profile\nLoaded',        type: 'expect',   row: 3, col: 0 },
  { id: 'REFRESH', name: 'POST\nrefresh-token',    type: 'action',   row: 3, col: 2, shape: 'rect' },
];

export const SM_EDGES: DagEdge[] = [
  { from: 'INIT',    to: 'OTP',     label: '200 session'    },
  { from: 'INIT',    to: 'E400',    label: 'bad phone 400'  },
  { from: 'OTP',     to: 'AUTH',    label: 'bypass pin'     },
  { from: 'OTP',     to: 'E400',    label: 'bad schema 400' },
  { from: 'AUTH',    to: 'PROFILE', label: 'GET profile'    },
  { from: 'AUTH',    to: 'REFRESH', label: 'refresh-token'  },
  { from: 'AUTH',    to: 'E401',    label: 'wrong pin 401'  },
  { from: 'REFRESH', to: 'PROFILE', label: 'GET profile'    },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const INIT_OTP_STEP = {
  action: 'POST /api/v1/auth/phone/request-otp',
  data:   'countryCode: "+66", phoneNumber: "<registered_phone>"',
  expect: '200 · data.token is truthy (OTP session token)',
};

const REG_OTP_STEP = {
  action: 'POST /api/v1/auth/phone/request-otp',
  data:   'countryCode: "+66", phoneNumber: String(Date.now()).slice(-9)',
  expect: '200 · data.token is truthy · data.expiredAt > Date.now()',
};

const VERIFY_BYPASS_STEP = (capture = '') => ({
  action: 'POST /api/v1/auth/phone/verify-otp',
  data:   `providerType: "PROVIDER_TYPE_PHONE", token: <otpToken>, pin: "123456"${capture}`,
  expect: '200 · accessToken (string, non-empty) · refreshToken (string, non-empty) · isRegistered (boolean)',
});

const GET_PROFILE_STEP = (source = 'accessToken') => ({
  action: 'GET /api/v1/user/profile',
  data:   `Authorization: Bearer <${source}>`,
  expect: '200 · response body includes id (string)',
});

// ── Scenarios ─────────────────────────────────────────────────────────────────

export const SM_SCENARIOS: Scenario[] = [

  // ── OTP Login (verify-otp on registered phone) ────────────────────────────

  {
    id: 'UA-LOGIN-TC-001', type: 'Functional', typeCls: 'high',
    name: 'Bypass pin=123456 on registered phone → 200 + full token contract',
    activePath:  ['INIT', 'OTP', 'AUTH'],
    activeEdges: [['INIT','OTP'], ['OTP','AUTH']],
    steps: [
      INIT_OTP_STEP,
      VERIFY_BYPASS_STEP(),
    ],
  },

  {
    id: 'UA-LOGIN-TC-002', type: 'Functional', typeCls: 'high',
    name: 'accessToken from bypass is usable — GET /user/profile → 200',
    activePath:  ['INIT', 'OTP', 'AUTH', 'PROFILE'],
    activeEdges: [['INIT','OTP'], ['OTP','AUTH'], ['AUTH','PROFILE']],
    steps: [
      INIT_OTP_STEP,
      VERIFY_BYPASS_STEP(' · capture accessToken'),
      GET_PROFILE_STEP('accessToken'),
    ],
  },

  {
    id: 'UA-LOGIN-TC-003', type: 'Functional', typeCls: 'high',
    name: 'refreshToken renews accessToken — POST /auth/refresh-token → 200',
    activePath:  ['INIT', 'OTP', 'AUTH', 'REFRESH', 'PROFILE'],
    activeEdges: [['INIT','OTP'], ['OTP','AUTH'], ['AUTH','REFRESH'], ['REFRESH','PROFILE']],
    steps: [
      INIT_OTP_STEP,
      { ...VERIFY_BYPASS_STEP(' · capture refreshToken'), expect: '200 · capture refreshToken from data.refreshToken' },
      {
        action: 'POST /api/v1/auth/refresh-token',
        data:   'refreshToken: <refreshToken>',
        expect: '200 · new accessToken (string, non-empty) · new refreshToken (string, non-empty)',
      },
      GET_PROFILE_STEP('new accessToken'),
    ],
  },

  {
    id: 'UA-LOGIN-TC-004', type: 'Negative', typeCls: 'ep',
    name: 'pin=000000 (wrong, non-bypass) → 401',
    activePath:  ['INIT', 'OTP', 'AUTH', 'E401'],
    activeEdges: [['INIT','OTP'], ['OTP','AUTH'], ['AUTH','E401']],
    steps: [
      INIT_OTP_STEP,
      {
        action: 'POST /api/v1/auth/phone/verify-otp',
        data:   'providerType: "PROVIDER_TYPE_PHONE", token: <otpToken>, pin: "000000"',
        expect: '401 Unauthorized — wrong OTP',
      },
    ],
  },

  {
    id: 'UA-LOGIN-TC-005', type: 'Boundary', typeCls: 'bva',
    name: 'pin=12345 (5 digits — below 6) → 400',
    activePath:  ['INIT', 'E400'],
    activeEdges: [['INIT','E400']],
    steps: [
      {
        action: 'POST /api/v1/auth/phone/verify-otp',
        data:   'providerType: "PROVIDER_TYPE_PHONE", token: "dummy-token", pin: "12345"',
        expect: '400 — pin fails 6-digit pattern validation',
      },
    ],
  },

  {
    id: 'UA-LOGIN-TC-006', type: 'Boundary', typeCls: 'bva',
    name: 'pin=1234567 (7 digits — above 6) → 400',
    activePath:  ['INIT', 'E400'],
    activeEdges: [['INIT','E400']],
    steps: [
      {
        action: 'POST /api/v1/auth/phone/verify-otp',
        data:   'providerType: "PROVIDER_TYPE_PHONE", token: "dummy-token", pin: "1234567"',
        expect: '400 — pin fails 6-digit pattern validation',
      },
    ],
  },

  {
    id: 'UA-LOGIN-TC-007', type: 'Negative', typeCls: 'ep',
    name: 'pin=abcdef (non-numeric) → 400',
    activePath:  ['INIT', 'E400'],
    activeEdges: [['INIT','E400']],
    steps: [
      {
        action: 'POST /api/v1/auth/phone/verify-otp',
        data:   'providerType: "PROVIDER_TYPE_PHONE", token: "dummy-token", pin: "abcdef"',
        expect: '400 — pin must be numeric',
      },
    ],
  },

  {
    id: 'UA-LOGIN-TC-008', type: 'Negative', typeCls: 'ep',
    name: 'Unregistered phone + bypass pin=123456 → 401 or 404',
    activePath:  ['INIT', 'OTP', 'AUTH', 'E401'],
    activeEdges: [['INIT','OTP'], ['OTP','AUTH'], ['AUTH','E401']],
    steps: [
      {
        action: 'POST /api/v1/auth/phone/request-otp',
        data:   'countryCode: "+66", phoneNumber: timestampPhoneNumber() (fresh, never registered)',
        expect: '200 · OTP session token issued (phone is accepted for OTP even if unregistered)',
      },
      {
        action: 'POST /api/v1/auth/phone/verify-otp',
        data:   'providerType: "PROVIDER_TYPE_PHONE", token: <otpToken>, pin: "123456"',
        expect: '401 or 404 — phone not found in user registry',
      },
    ],
  },

  {
    id: 'UA-LOGIN-TC-009', type: 'Negative', typeCls: 'ep',
    name: 'missing phone field in request-otp → 400',
    activePath:  ['INIT', 'E400'],
    activeEdges: [['INIT','E400']],
    steps: [
      {
        action: 'POST /api/v1/auth/phone/request-otp',
        data:   '{ countryCode: "+66" }  ← phoneNumber omitted',
        expect: '400 — required field phoneNumber is missing',
      },
    ],
  },

  {
    id: 'UA-LOGIN-TC-010', type: 'Negative', typeCls: 'ep',
    name: 'missing otp field in verify-otp → 400',
    activePath:  ['INIT', 'E400'],
    activeEdges: [['INIT','E400']],
    steps: [
      {
        action: 'POST /api/v1/auth/phone/verify-otp',
        data:   '{ providerType: "PROVIDER_TYPE_PHONE", token: "dummy-token" }  ← pin omitted',
        expect: '400 — required field pin is missing',
      },
    ],
  },

  {
    id: 'UA-LOGIN-TC-011', type: 'Negative', typeCls: 'ep',
    name: 'empty body {} → 400',
    activePath:  ['INIT', 'E400'],
    activeEdges: [['INIT','E400']],
    steps: [
      {
        action: 'POST /api/v1/auth/phone/verify-otp',
        data:   '{}  ← empty body',
        expect: '400 — all required fields are missing',
      },
    ],
  },

  {
    id: 'UA-LOGIN-TC-012', type: 'Boundary', typeCls: 'bva',
    name: 'phone 8 digits (below ^[0-9]{9,10}$) → request-otp → 400',
    activePath:  ['INIT', 'E400'],
    activeEdges: [['INIT','E400']],
    steps: [
      {
        action: 'POST /api/v1/auth/phone/request-otp',
        data:   'countryCode: "+66", phoneNumber: "08123456" (8 digits — below min 9)',
        expect: '400 — phoneNumber fails ^[0-9]{9,10}$ validation',
      },
    ],
  },

  {
    id: 'UA-LOGIN-TC-013', type: 'Boundary', typeCls: 'bva',
    name: 'phone 11 digits (above ^[0-9]{9,10}$) → request-otp → 400',
    activePath:  ['INIT', 'E400'],
    activeEdges: [['INIT','E400']],
    steps: [
      {
        action: 'POST /api/v1/auth/phone/request-otp',
        data:   'countryCode: "+66", phoneNumber: "08123456789" (11 digits — above max 10)',
        expect: '400 — phoneNumber fails ^[0-9]{9,10}$ validation',
      },
    ],
  },

  {
    id: 'UA-LOGIN-TC-014', type: 'Negative', typeCls: 'ep',
    name: 'phone with +66 prefix → request-otp → 400',
    activePath:  ['INIT', 'E400'],
    activeEdges: [['INIT','E400']],
    steps: [
      {
        action: 'POST /api/v1/auth/phone/request-otp',
        data:   'countryCode: "+66", phoneNumber: "+66812345678"  ← + sign rejected by pattern',
        expect: '400 — phoneNumber pattern ^[0-9]{9,10}$ rejects non-digit characters',
      },
    ],
  },

  // ── OTP Registration (new user, timestamp phone) ──────────────────────────

  {
    id: 'UA-REG-TC-001', type: 'Functional', typeCls: 'high',
    name: 'New timestamp phone → POST request-otp → 200 + session token + expiredAt in future',
    activePath:  ['INIT', 'OTP'],
    activeEdges: [['INIT','OTP']],
    steps: [
      REG_OTP_STEP,
    ],
  },

  {
    id: 'UA-REG-TC-002', type: 'Boundary', typeCls: 'bva',
    name: '10-digit phone (upper BVA boundary) → request-otp → 200',
    activePath:  ['INIT', 'OTP'],
    activeEdges: [['INIT','OTP']],
    steps: [
      {
        action: 'POST /api/v1/auth/phone/request-otp',
        data:   'countryCode: "+66", phoneNumber: "0" + String(Date.now()).slice(-9) (10 digits)',
        expect: '200 · data.token is truthy — 10-digit phone is accepted (max boundary)',
      },
    ],
  },

  {
    id: 'UA-REG-TC-003', type: 'Functional', typeCls: 'high',
    name: 'Re-request OTP same phone → 200 (idempotent re-send)',
    activePath:  ['INIT', 'OTP'],
    activeEdges: [['INIT','OTP']],
    steps: [
      REG_OTP_STEP,
      {
        action: 'POST /api/v1/auth/phone/request-otp (same phone, second call)',
        data:   'countryCode: "+66", phoneNumber: <same as step 1>',
        expect: '200 · new data.token issued — idempotent re-send succeeds',
      },
    ],
  },

  {
    id: 'UA-REG-TC-004', type: 'Boundary', typeCls: 'bva',
    name: 'phone 8 digits (below min 9) → request-otp → 400',
    activePath:  ['INIT', 'E400'],
    activeEdges: [['INIT','E400']],
    steps: [
      {
        action: 'POST /api/v1/auth/phone/request-otp',
        data:   'countryCode: "+66", phoneNumber: "08123456" (8 digits)',
        expect: '400 — phoneNumber fails ^[0-9]{9,10}$ — below min boundary',
      },
    ],
  },

  {
    id: 'UA-REG-TC-005', type: 'Boundary', typeCls: 'bva',
    name: 'phone 11 digits (above max 10) → request-otp → 400',
    activePath:  ['INIT', 'E400'],
    activeEdges: [['INIT','E400']],
    steps: [
      {
        action: 'POST /api/v1/auth/phone/request-otp',
        data:   'countryCode: "+66", phoneNumber: "08123456789" (11 digits)',
        expect: '400 — phoneNumber fails ^[0-9]{9,10}$ — above max boundary',
      },
    ],
  },

  {
    id: 'UA-REG-TC-006', type: 'Negative', typeCls: 'ep',
    name: 'Phone contains letters → request-otp → 400',
    activePath:  ['INIT', 'E400'],
    activeEdges: [['INIT','E400']],
    steps: [
      {
        action: 'POST /api/v1/auth/phone/request-otp',
        data:   'countryCode: "+66", phoneNumber: "abc123456" (contains letters)',
        expect: '400 — phoneNumber pattern ^[0-9]{9,10}$ rejects non-digit characters',
      },
    ],
  },

  {
    id: 'UA-REG-TC-007', type: 'Negative', typeCls: 'ep',
    name: 'Phone with +66 prefix → request-otp → 400',
    activePath:  ['INIT', 'E400'],
    activeEdges: [['INIT','E400']],
    steps: [
      {
        action: 'POST /api/v1/auth/phone/request-otp',
        data:   'countryCode: "+66", phoneNumber: "+66812345678"',
        expect: '400 — + sign rejected; phoneNumber must be ^[0-9]{9,10}$ with no prefix',
      },
    ],
  },

  {
    id: 'UA-REG-TC-008', type: 'Negative', typeCls: 'ep',
    name: 'Missing phone field → request-otp → 400',
    activePath:  ['INIT', 'E400'],
    activeEdges: [['INIT','E400']],
    steps: [
      {
        action: 'POST /api/v1/auth/phone/request-otp',
        data:   '{ countryCode: "+66" }  ← phoneNumber omitted',
        expect: '400 — required field phoneNumber is missing',
      },
    ],
  },

  {
    id: 'UA-REG-TC-009', type: 'Functional', typeCls: 'high',
    name: 'request-otp → verify-otp bypass → 200 + full token contract',
    activePath:  ['INIT', 'OTP', 'AUTH'],
    activeEdges: [['INIT','OTP'], ['OTP','AUTH']],
    steps: [
      REG_OTP_STEP,
      VERIFY_BYPASS_STEP(),
    ],
  },

  {
    id: 'UA-REG-TC-010', type: 'Functional', typeCls: 'high',
    name: 'Full new-user journey: request-otp → verify-otp → GET profile → id is non-empty',
    activePath:  ['INIT', 'OTP', 'AUTH', 'PROFILE'],
    activeEdges: [['INIT','OTP'], ['OTP','AUTH'], ['AUTH','PROFILE']],
    steps: [
      REG_OTP_STEP,
      VERIFY_BYPASS_STEP(' · capture accessToken'),
      {
        ...GET_PROFILE_STEP('accessToken'),
        expect: '200 · profile.id is a non-empty string (new user auto-created on first verify-otp)',
      },
    ],
  },

  {
    id: 'UA-REG-TC-011', type: 'Functional', typeCls: 'high',
    name: 'Second login same phone → GET profile → userId matches first login (returning user)',
    activePath:  ['INIT', 'OTP', 'AUTH', 'PROFILE'],
    activeEdges: [['INIT','OTP'], ['OTP','AUTH'], ['AUTH','PROFILE']],
    steps: [
      { ...REG_OTP_STEP, action: 'First login — POST /api/v1/auth/phone/request-otp' },
      { ...VERIFY_BYPASS_STEP(' · capture firstAccessToken'), action: 'First login — POST /api/v1/auth/phone/verify-otp' },
      { ...GET_PROFILE_STEP('firstAccessToken'), expect: '200 · capture profile.id as firstUserId' },
      { action: 'Second login — POST /api/v1/auth/phone/request-otp (same phone)', data: 'countryCode: "+66", phoneNumber: <same as step 1>', expect: '200 · new otpToken' },
      { action: 'Second login — POST /api/v1/auth/phone/verify-otp', data: 'providerType: "PROVIDER_TYPE_PHONE", token: <otpToken2>, pin: "123456"', expect: '200 · capture secondAccessToken' },
      { ...GET_PROFILE_STEP('secondAccessToken'), expect: '200 · profile.id === firstUserId — same user account returned' },
    ],
  },
];
