import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    TPHONE["timestampPhone()\\nString(Date.now()).slice(-9)\\nUnique 9-digit per run"] --> REQ
    REQ["POST /api/v1/auth/request-otp\\n{ phone }"] --> REQ_OK{"200 OK?"}
    REQ_OK -->|"No - bad phone"| REQ400["400 Bad Request\\npattern ^[0-9]{9,10}$ violated"]
    REQ_OK -->|"Yes"| REQ_SUCC["{ success: true, expiredAt }\\nOTP sent to phone (STG: skipped)"]
    REQ_SUCC --> VER["POST /api/v1/auth/verify-otp\\n{ phone, otp: '123456' }"]
    VER --> VER_OK{"200 OK?"}
    VER_OK -->|"No - wrong otp"| VER401["401 Unauthorized\\notp not bypass and not real OTP"]
    VER_OK -->|"No - bad schema"| VER400["400 Bad Request\\nmissing field / bad format"]
    VER_OK -->|"Yes"| TOKEN["{ accessToken, refreshToken\\nexpiresIn, tokenType: Bearer }"]
    TOKEN --> USE1["GET /api/v1/user/profile\\nAuthorization: Bearer {accessToken}"]
    TOKEN --> USE2["POST /api/v1/auth/refresh-token\\n{ refreshToken }"]
    USE1 --> P200{"200 OK?"}
    P200 -->|"Yes"| PDATA["{ id, name, phone }\\nnew user auto-created on first login"]
    P200 -->|"No"| P401["401 Unauthorized\\ntoken invalid or expired"]
    USE2 --> R200{"200 OK?"}
    R200 -->|"Yes"| RDATA["{ accessToken, expiresIn }\\ntoken rotated"]
    R200 -->|"No"| R401["401 Unauthorized\\nrefreshToken invalid or expired"]
    style TOKEN fill:#4CAF50,color:#fff
    style PDATA fill:#4CAF50,color:#fff
    style RDATA fill:#4CAF50,color:#fff
    style REQ400 fill:#FF9800,color:#fff
    style VER400 fill:#FF9800,color:#fff
    style VER401 fill:#f44336,color:#fff
    style P401 fill:#f44336,color:#fff
    style R401 fill:#f44336,color:#fff`;

const FLOW_REGISTER = `flowchart TD
    S1(["New phone\\ntimestampPhone()"]) --> S2["POST /api/v1/auth/request-otp\\n{ phone }"]
    S2 --> S3{"200 OK?"}
    S3 -->|"UA-REG-TC-004~008"| S4["400 Bad Request\\nphone pattern violated"]
    S3 -->|"UA-REG-TC-001~003"| S5["{ success: true, expiredAt }\\nOTP dispatched"]
    S5 --> S6["POST /api/v1/auth/verify-otp\\n{ phone, otp: '123456' }"]
    S6 --> S7{"200 OK?"}
    S7 -->|"UA-REG-TC-009"| S8["{ accessToken, refreshToken\\nexpiresIn, tokenType: Bearer }"]
    S8 --> S9["GET /api/v1/user/profile\\nBearer {accessToken}"]
    S9 --> S10{"200 OK?"}
    S10 -->|"UA-REG-TC-010"| S11(["{ id, name, phone }\\nnew user auto-created"])
    S10 -->|"UA-REG-TC-011"| S12(["same userId\\nreturning user confirmed"])
    style S11 fill:#4CAF50,color:#fff
    style S12 fill:#4CAF50,color:#fff
    style S4 fill:#FF9800,color:#fff
    style S8 fill:#2196F3,color:#fff`;

const FLOW_LOGIN = `flowchart TD
    S1(["Registered phone\\n+ bypass otp=123456"]) --> S2["POST /api/v1/auth/verify-otp\\n{ phone, otp }"]
    S2 --> S3{"200 OK?"}
    S3 -->|"UA-LOGIN-TC-001"| S4["{ accessToken, refreshToken\\nexpiresIn, tokenType: Bearer }"]
    S4 --> S5["GET /user/profile\\nUA-LOGIN-TC-002"]
    S4 --> S6["POST refresh-token\\nUA-LOGIN-TC-003"]
    S5 --> S7(["200 OK - profile data"])
    S6 --> S8(["200 OK - new accessToken"])
    S3 -->|"UA-LOGIN-TC-004"| S9["401 - wrong otp"]
    S3 -->|"UA-LOGIN-TC-005~007"| S10["400 - otp pattern violation"]
    S3 -->|"UA-LOGIN-TC-008"| S11["401/404 - unregistered phone"]
    S3 -->|"UA-LOGIN-TC-009~014"| S12["400 - phone/body schema error"]
    style S4 fill:#2196F3,color:#fff
    style S7 fill:#4CAF50,color:#fff
    style S8 fill:#4CAF50,color:#fff
    style S9 fill:#f44336,color:#fff
    style S11 fill:#f44336,color:#fff
    style S10 fill:#FF9800,color:#fff
    style S12 fill:#FF9800,color:#fff`;

const FLOW_REFRESH = `flowchart TD
    S1(["refreshToken obtained\\nfrom verify-otp"]) --> S2["POST /api/v1/auth/refresh-token\\n{ refreshToken }"]
    S2 --> S3{"200 OK?"}
    S3 -->|"UA-LOGIN-TC-003"| S4(["{ accessToken, expiresIn }\\ntoken rotated"])
    S3 -->|"No"| S5(["401 Unauthorized\\nrefreshToken invalid or expired"])
    style S4 fill:#4CAF50,color:#fff
    style S5 fill:#f44336,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — User Auth OTP (PP-566 bypass)',
  subtitle: 'request-otp → verify-otp → profile / refresh-token',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-register',
    num: '2',
    title: 'Sub-Flow 1 · OTP Registration (timestamp phone)',
    subtitle: 'UA-REG-TC-001–011 · POST request-otp → verify-otp → GET profile',
    chart: FLOW_REGISTER,
    states: [
      ['S1',  'New phone (timestampPhone — unique 9-digit)'],
      ['S2',  'POST request-otp sent'],
      ['S3',  'request-otp response check'],
      ['S4',  '400 Bad Request — phone pattern ^[0-9]{9,10}$ violated'],
      ['S5',  '200 OK — { success: true, expiredAt }'],
      ['S6',  'POST verify-otp sent (bypass otp=123456)'],
      ['S7',  'verify-otp response check'],
      ['S8',  '200 OK — token contract'],
      ['S9',  'GET profile with accessToken'],
      ['S10', 'Profile response check'],
      ['S11', '200 OK — new user profile auto-created'],
      ['S12', '200 OK — returning user, same userId'],
    ],
    transitions: [
      ['T1', 'Valid 9-digit phone → request-otp 200'],
      ['T2', 'Invalid phone (too short/long/letters/prefix) → 400'],
      ['T3', 'bypass otp=123456 after request-otp → verify-otp 200'],
      ['T4', 'accessToken used to fetch profile → 200'],
      ['T5', 'Second login same phone → same userId in profile'],
    ],
  },
  {
    sectionId: 'flow-login',
    num: '3',
    title: 'Sub-Flow 2 · OTP Login (verify-otp)',
    subtitle: 'UA-LOGIN-TC-001–014 · POST /api/v1/auth/verify-otp',
    chart: FLOW_LOGIN,
    states: [
      ['S1',  'Registered phone + bypass otp'],
      ['S2',  'POST verify-otp sent'],
      ['S3',  'verify-otp response check'],
      ['S4',  '200 OK — { accessToken, refreshToken, expiresIn, tokenType: Bearer }'],
      ['S5',  'GET profile with accessToken'],
      ['S6',  'POST refresh-token with refreshToken'],
      ['S7',  '200 OK — profile data'],
      ['S8',  '200 OK — new accessToken'],
      ['S9',  '401 — wrong otp (non-bypass)'],
      ['S10', '400 — otp pattern violation (length/format)'],
      ['S11', '401/404 — unregistered phone + bypass'],
      ['S12', '400 — phone/body schema error'],
    ],
    transitions: [
      ['T1', 'bypass otp=123456 on registered phone → 200 token contract'],
      ['T2', 'accessToken valid → GET profile 200'],
      ['T3', 'refreshToken valid → POST refresh-token 200'],
      ['T4', 'wrong otp (otp=000000) → 401'],
      ['T5', 'otp length outside 6 digits → 400'],
      ['T6', 'non-numeric otp → 400'],
      ['T7', 'unregistered phone with bypass → 401/404'],
      ['T8', 'missing phone / missing otp / empty body → 400'],
      ['T9', 'phone pattern violation (8/11 digits, +66 prefix) → 400'],
    ],
  },
  {
    sectionId: 'flow-refresh',
    num: '4',
    title: 'Sub-Flow 3 · Token Refresh',
    subtitle: 'UA-LOGIN-TC-003 · POST /api/v1/auth/refresh-token',
    chart: FLOW_REFRESH,
    states: [
      ['S1', 'refreshToken obtained from verify-otp response'],
      ['S2', 'POST refresh-token sent'],
      ['S3', 'Response check'],
      ['S4', '200 OK — { accessToken, expiresIn } — token rotated'],
      ['S5', '401 Unauthorized — refreshToken invalid or expired'],
    ],
    transitions: [
      ['T1', 'Valid refreshToken → 200 + new accessToken'],
      ['T2', 'Invalid/expired refreshToken → 401'],
    ],
  },
];
