import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    CLIENT([API Client sends\\nPOST /api/v1/organizer/auth/login]) --> SCHEMA{Request schema\\nvalid?}
    SCHEMA -->|No| R400[400 Bad Request\\nValidation error]
    SCHEMA -->|Yes| AUTH{Credentials\\ncorrect?}
    AUTH -->|Yes| R200[200 OK\\naccessToken + refreshToken + expiresIn + tokenType]
    AUTH -->|No| R401[401 Unauthorized\\nerror + message]

    style R200 fill:#4CAF50,color:#fff
    style R401 fill:#f44336,color:#fff
    style R400 fill:#FF9800,color:#fff`;

const FLOW_HAPPY = `flowchart TD
    S1([Valid credentials\\nsent]) -->|"T1 · OA-TC-001"| S2[Schema validation\\npasses]
    S2 -->|"T2 · OA-TC-001"| S3[Auth check\\npasses]
    S3 -->|"T3 · OA-TC-001"| S4([200 OK — Token\\nContract returned])

    style S4 fill:#4CAF50,color:#fff`;

const FLOW_AUTH_FAIL = `flowchart TD
    S5([Credentials sent]) -->|"T4 · OA-TC-002"| S6{Credentials\\nvalid?}
    S6 -->|"Wrong password · OA-TC-002"| S7([401 Unauthorized\\nerror + message])
    S6 -->|"Unknown email · OA-TC-003"| S8([401 Unauthorized\\nerror + message — no enumeration])

    style S7 fill:#f44336,color:#fff
    style S8 fill:#f44336,color:#fff`;

const FLOW_VALIDATION = `flowchart TD
    S9([Request body\\nsent]) --> S10{Schema\\ncheck}
    S10 -->|"Missing email · OA-TC-004"| S11([400 — email required])
    S10 -->|"Missing password · OA-TC-005"| S12([400 — password required])
    S10 -->|"Empty body · OA-TC-006"| S13([400 — both fields required])
    S10 -->|"Invalid email format · OA-TC-007"| S14([400 — email format invalid])
    S10 -->|"Password < 8 chars · OA-TC-008a"| S15([400 — minLength: 8 violated])
    S10 -->|"Password = 8 chars wrong · OA-TC-008b"| S16([401 — schema passes, auth fails])
    S10 -->|"Extra field · OA-TC-009"| S17([400 — additionalProperties: false])

    style S11 fill:#FF9800,color:#fff
    style S12 fill:#FF9800,color:#fff
    style S13 fill:#FF9800,color:#fff
    style S14 fill:#FF9800,color:#fff
    style S15 fill:#FF9800,color:#fff
    style S16 fill:#f44336,color:#fff
    style S17 fill:#FF9800,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — POST /api/v1/organizer/auth/login',
  subtitle: 'Request schema validation → auth check → response',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-happy',
    num: '2',
    title: 'Sub-Flow 1 · Happy Path — 200 Token Contract',
    subtitle: 'S1–S4 · T1–T3 · OA-TC-001',
    chart: FLOW_HAPPY,
    states: [
      ['S1', 'Valid credentials sent'],
      ['S2', 'Schema validation passes'],
      ['S3', 'Auth check passes'],
      ['S4', '200 OK — token contract returned (accessToken, refreshToken, expiresIn, tokenType)'],
    ],
    transitions: [
      ['T1', 'Request body satisfies schema (email format + password minLength)'],
      ['T2', 'Credentials match organizer record in DB'],
      ['T3', '200 response with full token shape'],
    ],
  },
  {
    sectionId: 'flow-auth-fail',
    num: '3',
    title: 'Sub-Flow 2 · Auth Failures — 401',
    subtitle: 'S5–S8 · T4 · OA-TC-002–OA-TC-003',
    chart: FLOW_AUTH_FAIL,
    states: [
      ['S5', 'Credentials sent (schema valid)'],
      ['S6', 'Auth check performed'],
      ['S7', '401 — wrong password, error + message'],
      ['S8', '401 — unknown email, error + message (no enumeration)'],
    ],
    transitions: [
      ['T4', 'Schema valid but credentials rejected — 401'],
      ['T5', 'Wrong password path'],
      ['T6', 'Unknown email path (same response shape, no info leakage)'],
    ],
  },
  {
    sectionId: 'flow-validation',
    num: '4',
    title: 'Sub-Flow 3 · Schema Validation — 400',
    subtitle: 'S9–S17 · OA-TC-004–OA-TC-009',
    chart: FLOW_VALIDATION,
    states: [
      ['S9',  'Request body sent'],
      ['S10', 'Schema check executed'],
      ['S11', '400 — email field missing'],
      ['S12', '400 — password field missing'],
      ['S13', '400 — both fields missing (empty body)'],
      ['S14', '400 — email format invalid'],
      ['S15', '400 — password minLength: 8 violated (7 chars)'],
      ['S16', '401 — password 8 chars (schema passes), wrong credentials'],
      ['S17', '400 — additionalProperties: false violated (extra field)'],
    ],
    transitions: [
      ['T7',  'Missing required field — email'],
      ['T8',  'Missing required field — password'],
      ['T9',  'Both required fields missing'],
      ['T10', 'Email format: email constraint fails'],
      ['T11', 'Password < 8 chars — minLength boundary violated'],
      ['T12', 'Password = 8 chars — minLength boundary passes, auth decides'],
      ['T13', 'Extra field present — additionalProperties: false'],
    ],
  },
];
