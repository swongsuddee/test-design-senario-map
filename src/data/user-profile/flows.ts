import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    TOKEN["accessToken\\n(from POST verify-otp)"] --> GET_P
    TOKEN --> PATCH_P
    TOKEN --> PUT_I
    TOKEN --> DEL_A

    GET_P["GET /api/v1/user/profile\\nAuthorization: Bearer token"]
    GET_P --> G200["200 OK\\n{ id, name, bio?, phone?, avatar?, interests?, stats? }"]
    GET_P --> G401["401 Unauthorized"]

    PATCH_P["PATCH /api/v1/user/profile\\n{ name?, bio?, phone? }"]
    PATCH_P --> P200["200 OK\\n{ success: true, data: { id, name, bio, phone } }"]
    PATCH_P --> P400["400 Bad Request\\nvalidation error (maxLength / extra field)"]
    PATCH_P --> P401_P["401 Unauthorized"]

    PUT_I["PUT /api/v1/user/interests\\n{ interests: string[1..3] }"]
    PUT_I --> I200["200 OK\\n{ success: true, interests: string[] }"]
    PUT_I --> I400["400 Bad Request\\nminItems / maxItems violated"]
    PUT_I --> I401["401 Unauthorized"]

    DEL_A["DELETE /api/v1/user/account\\n{ reason: string }"]
    DEL_A --> D200["200 OK\\n{ success: true, message? }"]
    DEL_A --> D400["400 Bad Request\\nmaxLength / missing field"]
    DEL_A --> D401["401 Unauthorized"]

    style G200 fill:#4CAF50,color:#fff
    style P200 fill:#4CAF50,color:#fff
    style I200 fill:#4CAF50,color:#fff
    style D200 fill:#4CAF50,color:#fff
    style G401 fill:#f44336,color:#fff
    style P400 fill:#FF9800,color:#fff
    style P401_P fill:#f44336,color:#fff
    style I400 fill:#FF9800,color:#fff
    style I401 fill:#f44336,color:#fff
    style D400 fill:#FF9800,color:#fff
    style D401 fill:#f44336,color:#fff`;

const FLOW_GET_PROFILE = `flowchart TD
    S1(["accessToken from auth"]) --> S2["GET /api/v1/user/profile\\nAuthorization: Bearer"]
    S2 --> S3{"200 OK?"}
    S3 -->|"UP-TC-001"| S4["{ id, name } (required fields)"]
    S4 -->|"UP-TC-002"| S5(["bio, phone, avatar, interests\\nstats.upcoming / history / saved"])
    S3 -->|"UP-TC-003"| S6["401 - no Authorization header"]
    S3 -->|"UP-TC-004"| S7["401 - invalid / expired token"]
    style S5 fill:#4CAF50,color:#fff
    style S6 fill:#f44336,color:#fff
    style S7 fill:#f44336,color:#fff`;

const FLOW_PATCH_PROFILE = `flowchart TD
    S1(["valid accessToken"]) --> S2["PATCH /api/v1/user/profile\\n{ name?, bio?, phone? }"]
    S2 --> S3{"Schema valid?"}
    S3 -->|"UP-TC-009"| S4["400 - name > 50 chars"]
    S3 -->|"UP-TC-011"| S5["400 - bio > 250 chars"]
    S3 -->|"UP-TC-013"| S6["400 - extra field (additionalProperties: false)"]
    S3 -->|"Yes"| S7{"Authorized?"}
    S7 -->|"UP-TC-014,015"| S8["401 Unauthorized"]
    S7 -->|"UP-TC-005~008,010,012"| S9(["200 OK\\n{ success: true, data: { id, name, bio, phone } }"])
    style S9 fill:#4CAF50,color:#fff
    style S4 fill:#FF9800,color:#fff
    style S5 fill:#FF9800,color:#fff
    style S6 fill:#FF9800,color:#fff
    style S8 fill:#f44336,color:#fff`;

const FLOW_INTERESTS = `flowchart TD
    S1(["valid accessToken"]) --> S2["PUT /api/v1/user/interests\\n{ interests: string[] }"]
    S2 --> S3{"Schema valid?"}
    S3 -->|"UP-TC-019"| S4["400 - empty array (minItems: 1)"]
    S3 -->|"UP-TC-020"| S5["400 - 4 items (maxItems: 3)"]
    S3 -->|"UP-TC-022"| S6["400 - missing interests field"]
    S3 -->|"1-3 items"| S7{"Authorized?"}
    S7 -->|"UP-TC-023"| S8["401 Unauthorized"]
    S7 -->|"UP-TC-016~018,021"| S9(["200 OK\\n{ success: true, interests: [...] }\\narray fully replaced"])
    style S9 fill:#4CAF50,color:#fff
    style S4 fill:#FF9800,color:#fff
    style S5 fill:#FF9800,color:#fff
    style S6 fill:#FF9800,color:#fff
    style S8 fill:#f44336,color:#fff`;

const FLOW_DELETE = `flowchart TD
    S1(["throwaway account\\ncreated via request-otp + verify-otp"]) --> S2["DELETE /api/v1/user/account\\n{ reason: string }"]
    S2 --> S3{"Schema valid?"}
    S3 -->|"UP-TC-026"| S4["400 - reason > 500 chars"]
    S3 -->|"UP-TC-028"| S5["400 - missing reason field"]
    S3 -->|"UP-TC-027 ⚠"| S6["? - empty string (required but no minLength)"]
    S3 -->|"Yes"| S7{"Authorized?"}
    S7 -->|"UP-TC-029"| S8["401 Unauthorized"]
    S7 -->|"UP-TC-024,025"| S9["200 OK\\n{ success: true, message? }"]
    S9 -->|"UP-TC-030"| S10["second DELETE\\n401 (account gone)"]
    style S9 fill:#4CAF50,color:#fff
    style S4 fill:#FF9800,color:#fff
    style S5 fill:#FF9800,color:#fff
    style S6 fill:#FF9800,color:#fff
    style S8 fill:#f44336,color:#fff
    style S10 fill:#f44336,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — User Profile & Account API',
  subtitle: 'GET profile · PATCH profile · PUT interests · DELETE account',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-get-profile',
    num: '2',
    title: 'Sub-Flow 1 · GET /api/v1/user/profile',
    subtitle: 'UP-TC-001–004 · read profile + auth guard',
    chart: FLOW_GET_PROFILE,
    states: [
      ['S1', 'accessToken from verify-otp'],
      ['S2', 'GET /api/v1/user/profile sent'],
      ['S3', '200 OK response check'],
      ['S4', 'Required fields present: id, name'],
      ['S5', 'Optional fields: bio, phone, avatar, interests, stats'],
      ['S6', '401 — no Authorization header'],
      ['S7', '401 — invalid or expired token'],
    ],
    transitions: [
      ['T1', 'Valid Bearer token → 200 with profile'],
      ['T2', 'Required fields id + name confirmed'],
      ['T3', 'Optional profile fields present'],
      ['T4', 'No auth header → 401'],
      ['T5', 'Bad token → 401'],
    ],
  },
  {
    sectionId: 'flow-patch-profile',
    num: '3',
    title: 'Sub-Flow 2 · PATCH /api/v1/user/profile',
    subtitle: 'UP-TC-005–015 · update name/bio/phone · BVA on maxLength',
    chart: FLOW_PATCH_PROFILE,
    states: [
      ['S1', 'Valid accessToken'],
      ['S2', 'PATCH request sent'],
      ['S3', 'Schema validation'],
      ['S4', '400 — name > 50 chars (maxLength: 50)'],
      ['S5', '400 — bio > 250 chars (maxLength: 250)'],
      ['S6', '400 — extra field (additionalProperties: false)'],
      ['S7', 'Auth check'],
      ['S8', '401 — no/bad token'],
      ['S9', '200 OK — { success: true, data }'],
    ],
    transitions: [
      ['T1', 'name 50 chars (BVA boundary) → 200'],
      ['T2', 'name 51 chars → 400'],
      ['T3', 'bio 250 chars (BVA boundary) → 200'],
      ['T4', 'bio 251 chars → 400'],
      ['T5', 'extra field → 400'],
      ['T6', 'no auth → 401'],
      ['T7', 'valid request → 200 + updated data'],
    ],
  },
  {
    sectionId: 'flow-interests',
    num: '4',
    title: 'Sub-Flow 3 · PUT /api/v1/user/interests',
    subtitle: 'UP-TC-016–023 · interests array · BVA minItems=1 maxItems=3',
    chart: FLOW_INTERESTS,
    states: [
      ['S1', 'Valid accessToken'],
      ['S2', 'PUT request sent'],
      ['S3', 'Schema validation'],
      ['S4', '400 — empty array (minItems: 1 violated)'],
      ['S5', '400 — 4 items (maxItems: 3 violated)'],
      ['S6', '400 — missing interests field'],
      ['S7', 'Auth check'],
      ['S8', '401 — no/bad token'],
      ['S9', '200 OK — { success: true, interests: [...] }'],
    ],
    transitions: [
      ['T1', '1 item (BVA min) → 200'],
      ['T2', '3 items (BVA max) → 200'],
      ['T3', '0 items → 400'],
      ['T4', '4 items → 400'],
      ['T5', 'interests replaced (PUT semantics) → new array returned'],
      ['T6', 'no auth → 401'],
    ],
  },
  {
    sectionId: 'flow-delete',
    num: '5',
    title: 'Sub-Flow 4 · DELETE /api/v1/user/account',
    subtitle: 'UP-TC-024–030 · account deletion · throwaway account pattern',
    chart: FLOW_DELETE,
    states: [
      ['S1', 'Throwaway account (created via timestamp phone + bypass OTP)'],
      ['S2', 'DELETE request sent'],
      ['S3', 'Schema validation'],
      ['S4', '400 — reason > 500 chars'],
      ['S5', '400 — missing reason field'],
      ['S6', '? — empty string reason (required, no minLength)'],
      ['S7', 'Auth check'],
      ['S8', '401 — no/bad token'],
      ['S9', '200 OK — { success: true }'],
      ['S10', '401 — second delete on deleted account'],
    ],
    transitions: [
      ['T1', 'reason 500 chars (BVA max) → 200'],
      ['T2', 'reason 501 chars → 400'],
      ['T3', 'missing reason → 400'],
      ['T4', 'empty string reason → unclear (conflict C1)'],
      ['T5', 'no auth → 401'],
      ['T6', 'account deleted → second request returns 401'],
    ],
  },
];
