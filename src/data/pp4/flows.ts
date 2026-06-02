import type { FlowSectionDef } from '@/types';

// ── Section 1 — Requirements-Based Master Flow ────────────────────────────────
const MASTER_FLOW = `flowchart TD
    START([Agency visits Web App]) --> REG[Register Page]

    REG --> TYPE{Select Type}
    TYPE -->|Individual| FORM_I[Form: Name / ID Card No. / Address]
    TYPE -->|Corporate| FORM_C[Form: Company Name / Tax ID / Address]

    FORM_I --> VAL_I{Frontend Validation\\nID Card 13 digits Regex}
    FORM_C --> VAL_C{Frontend Validation\\nTax ID 13 digits Regex}
    VAL_I -->|Invalid| ERR_VAL[Validation Error shown]
    VAL_C -->|Invalid| ERR_VAL
    ERR_VAL --> FORM_I
    ERR_VAL --> FORM_C
    VAL_I -->|Valid| UPLOAD[Document Upload\\nDrag and Drop]
    VAL_C -->|Valid| UPLOAD

    UPLOAD --> FILE_CHK{File Check\\ntype and size}
    FILE_CHK -->|Invalid type or >10MB| ERR_FILE[File Error shown]
    ERR_FILE --> UPLOAD
    FILE_CHK -->|Valid| BUCKET[Upload to Private Bucket\\nSecure Storage]
    BUCKET --> INTEGRITY{Backend\\nFile Integrity}
    INTEGRITY -->|Corrupted| ERR_400[Error 400]
    ERR_400 --> UPLOAD
    INTEGRITY -->|OK| SUBMIT[Submit Registration\\nIdempotency Guard]
    SUBMIT --> PENDING[(DB: Status = Pending)]
    PENDING --> VER_PAGE[/Verification Status Page/]

    VER_PAGE --> ADMIN_ACT{Admin Action}
    ADMIN_ACT -->|Approve| APPROVED[(DB: Status = Approved)]
    ADMIN_ACT -->|Reject + Comment| REJECTED[(DB: Status = Rejected)]

    APPROVED --> LOGIN[Agency Login]
    REJECTED --> LOGIN
    PENDING --> LOGIN

    LOGIN --> STATUS_CHK{Check Status}
    STATUS_CHK -->|Pending| VER_PAGE
    STATUS_CHK -->|Rejected| REJECT_PAGE[Show Rejection Reason\\n+ Re-submit Form]
    STATUS_CHK -->|Approved| DASHBOARD[/BO Dashboard/]

    REJECT_PAGE --> RESUBMIT[Edit Info / Re-upload Docs\\nRe-submit]
    RESUBMIT --> PENDING

    DASHBOARD --> CREATE_EVENT[Create / Edit Event]
    DASHBOARD --> PARTICIPANTS[Manage Participants]

    style DASHBOARD fill:#4CAF50,color:#fff
    style REG fill:#FF6B35,color:#fff
    style PENDING fill:#2196F3,color:#fff
    style ERR_400 fill:#f44336,color:#fff`;

// ── Section 2 — Observed STG Navigation Flow ─────────────────────────────────
const FLOW_STG_NAV = `flowchart TD
    GUEST([Guest / Unauthenticated]) --> LOGIN_PAGE["/login\\nLogin Page"]

    LOGIN_PAGE -->|"Click 'สมัครที่นี่'"| STEP1["/register\\nStep 1: User Info\\nDisplayName · Name · DOB · Phone"]
    LOGIN_PAGE -->|"Click 'ลืมรหัสผ่าน?'"| FORGOT["/forgot-password\\n(exact URL unconfirmed)"]
    LOGIN_PAGE -->|"Submit wrong credentials"| LOGIN_PAGE

    STEP1 -->|"Click 'ถัดไป' (valid)"| STEP2["/register/account\\nStep 2: Create Account\\nEmail · Password · Confirm"]
    STEP1 -->|"Click 'ถัดไป' (invalid)"| STEP1
    STEP2 -->|"Click 'ย้อนกลับ'"| STEP1
    STEP2 -->|"Click 'ถัดไป' (valid)"| STEP3["/register/verify\\nStep 3: Email Verification"]
    STEP2 -->|"Click 'ถัดไป' (invalid)"| STEP2
    STEP3 -->|"Click 'ส่งใหม่อีกครั้ง'"| STEP3

    LOGIN_PAGE -->|"Valid credentials (PENDING_SUBMISSION)\\nHTTP 200 CONFIRMED"| HOME["/\\nHome / Overview\\nVerification Banner visible"]
    LOGIN_PAGE -->|"Valid Approved account\\n(not yet tested)"| HOME_APPROVED["/\\nHome (no banner)"]
    LOGIN_PAGE -->|"Valid Rejected account\\n(not yet tested)"| REJECTED_PAGE["Rejection Page\\n(expected per req)"]

    HOME -->|"Click 'รายการอีเวนต์'"| EVENT_LIST["/event\\nEvent List\\nPaginated · Status filter"]
    HOME -->|"Click 'โปรไฟล์ (Organizer)'"| PROFILE["/profile\\nAccount Type Selection"]
    HOME -->|"Click user → Sign Out"| LOGIN_PAGE

    EVENT_LIST -->|"Click '+ สร้างอีเวนต์'"| CREATE_STEP1["/event/create\\nStep 1: Category\\nActive · Wellness · Creative · Social"]
    CREATE_STEP1 -->|"Select category → ถัดไป"| CREATE_STEP2["/event/create\\nStep 2: Event Type"]
    CREATE_STEP1 -->|"No selection (ถัดไป disabled)"| CREATE_STEP1
    CREATE_STEP2 -->|"Select type → ถัดไป"| CREATE_STEP3["/event/create\\nStep 3+: Details (TBC)"]
    CREATE_STEP2 -->|"Click 'ย้อนกลับ'"| CREATE_STEP1

    PROFILE -->|"Select Individual → ถัดไป"| PROFILE_IND["/profile/individual\\nInfo · Address · Documents · Bank"]
    PROFILE -->|"Select Corporate → ถัดไป"| PROFILE_CORP["/profile/corporate\\nCompany · Address · DBD · Bank"]
    PROFILE_IND -->|"Fill all + Submit"| PENDING_STATE["VERIFICATION_STATUS_PENDING\\n(Admin review)"]
    PROFILE_CORP -->|"Fill all + Submit"| PENDING_STATE
    PENDING_STATE -->|"Admin approves"| APPROVED_STATE["VERIFICATION_STATUS_APPROVED\\n(Full access)"]
    PENDING_STATE -->|"Admin rejects"| REJECTED_STATE["VERIFICATION_STATUS_REJECTED\\n(Rejection page + re-submit)"]
    REJECTED_STATE -->|"Re-submit"| PENDING_STATE

    style HOME fill:#4CAF50,color:#fff
    style LOGIN_PAGE fill:#FF6B35,color:#fff
    style PROFILE fill:#2196F3,color:#fff
    style PENDING_STATE fill:#9C27B0,color:#fff
    style APPROVED_STATE fill:#1565C0,color:#fff
    style REJECTED_STATE fill:#FF9800,color:#fff`;

// ── Section 3 — Verification Status Lifecycle ────────────────────────────────
const FLOW_VERIFICATION = `stateDiagram-v2
    [*] --> EmailUnverified : User completes Register Step 3

    EmailUnverified --> Unverified : User clicks email verification link

    Unverified --> Pending : Agency submits identity docs\\n(Individual or Corporate via /profile)

    Pending --> Approved : Admin approves
    Pending --> Rejected : Admin rejects + adds comment

    Rejected --> Pending : Agency re-submits\\n(edit info / re-upload docs)

    Approved --> [*] : Full BO Dashboard access\\nCreate Event enabled`;

// ── Section 4 — Registration & Form Validation ───────────────────────────────
const FLOW_REGISTRATION = `flowchart TD
    S1([Agency visits Web App]) -->|"T1 · PP4-TC-001 PP4-TC-002"| S2[Register Page]
    S2 --> S3{Type Selection}
    S3 -->|"T2 · PP4-TC-001 PP4-TC-003 PP4-TC-004 PP4-TC-006"| S4[Individual Form]
    S3 -->|"T3 · PP4-TC-002 PP4-TC-005 PP4-TC-006"| S5[Corporate Form]

    S4 --> S6{ID Card Regex valid?}
    S5 --> S7{Tax ID Regex valid?}
    S6 -->|"T4 · PP4-TC-003 PP4-TC-004"| S8[Validation Error shown]
    S7 -->|"T5 · PP4-TC-005"| S8
    S8 -->|"T6"| S4
    S8 -->|"T6"| S5
    S6 -->|"T7 · PP4-TC-001"| S9[Document Upload]
    S7 -->|"T7 · PP4-TC-002"| S9

    S9 --> S10{File Check\\ntype and size}
    S10 -->|"T8 · PP4-TC-012 PP4-TC-013 PP4-TC-014"| S11[File Error shown]
    S11 -->|"T9"| S9
    S10 -->|"T10 · PP4-TC-008 PP4-TC-009 PP4-TC-010 PP4-TC-011 PP4-TC-016"| S12[Upload to Private Bucket]
    S12 --> S13{Backend\\nFile Integrity}
    S13 -->|"T11 · PP4-TC-015"| S14[Error 400]
    S14 -->|"T12"| S9
    S13 -->|"T13 · PP4-TC-001 PP4-TC-002"| S15[Submit Registration\\nIdempotency Guard]
    S15 -->|"T14 · PP4-TC-001 PP4-TC-002 PP4-TC-024"| S16[(DB: Status = Pending)]
    S16 -->|"T15 · PP4-TC-001 PP4-TC-002"| S17([Verification Status Page])

    style S17 fill:#2196F3,color:#fff
    style S14 fill:#f44336,color:#fff`;

// ── Section 5 — Verification Status State Machine ────────────────────────────
const FLOW_STATUS_MACHINE = `stateDiagram-v2
    [*] --> Pending : T14 · Register & Submit Docs
    Pending --> Approved : T16 · PP4-TC-018 · Admin Approves
    Pending --> Rejected : T17 · PP4-TC-020 · Admin Rejects + Comment
    Rejected --> Pending : T18 · PP4-TC-023 · Agency Re-submits
    Approved --> [*] : Full BO Access`;

// ── Section 6 — Login & RBAC ──────────────────────────────────────────────────
const FLOW_LOGIN_RBAC = `flowchart TD
    S23([Login Page]) -->|"T19"| S24[Authenticate]
    S24 --> S25{Status Check}
    S25 -->|"T20 · PP4-TC-019 PP4-TC-021"| S26[Verification Status Page\\nCreate Event hidden]
    S25 -->|"T21 · PP4-TC-020 PP4-TC-022"| S27[Rejection Page\\nReason + Re-submit button]
    S25 -->|"T22 · PP4-TC-018"| S29([BO Dashboard\\nFull Access])

    S27 -->|"T23 · PP4-TC-023"| S28[Edit Info / Re-upload Docs]
    S28 --> S26

    S26 -->|"T24 · PP4-TC-021"| S26
    S27 -->|"T25 · PP4-TC-022"| S27

    style S29 fill:#4CAF50,color:#fff
    style S26 fill:#2196F3,color:#fff`;

// ── Exports ───────────────────────────────────────────────────────────────────
export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Register & Login (Requirements-Based)',
  subtitle: 'Full system overview from requirements spec',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-stg-nav',
    num: '2',
    title: 'Sub-Flow 1 · Observed STG Navigation Flow',
    subtitle: 'Confirmed routes and transitions from live Playwright exploration',
    chart: FLOW_STG_NAV,
  },
  {
    sectionId: 'flow-verification',
    num: '3',
    title: 'Sub-Flow 2 · Verification Status Lifecycle',
    subtitle: 'EmailUnverified → Unverified → Pending → Approved / Rejected',
    chart: FLOW_VERIFICATION,
  },
  {
    sectionId: 'flow-registration',
    num: '4',
    title: 'Sub-Flow 3 · Registration & Form Validation',
    subtitle: 'S1–S17 · T1–T15 · TC-001–016, TC-020–032, TC-034–035',
    chart: FLOW_REGISTRATION,
    states: [
      ['S1',  'Agency visits Web App'],
      ['S2',  'Register Page'],
      ['S3',  'Type Selection'],
      ['S4',  'Individual Form (Name, ID Card, Address)'],
      ['S5',  'Corporate Form (Company Name, Tax ID, Address)'],
      ['S6',  'Frontend Validation — ID Card (Regex 13 digits)'],
      ['S7',  'Frontend Validation — Tax ID (Regex 13 digits)'],
      ['S8',  'Validation Error shown'],
      ['S9',  'Document Upload (Drag & Drop)'],
      ['S10', 'File Check (type & size ≤10MB)'],
      ['S11', 'File Error (invalid type or over 10MB)'],
      ['S12', 'Upload to Private Bucket'],
      ['S13', 'Backend File Integrity Check'],
      ['S14', 'Error 400 (corrupted file)'],
      ['S15', 'Registration Submit (Idempotency Guard)'],
      ['S16', 'DB Status = Pending'],
      ['S17', 'Verification Status Page'],
    ],
    transitions: [
      ['T1',  'Navigate to Register page'],
      ['T2',  'Select Individual'],
      ['T3',  'Select Corporate'],
      ['T4',  'ID Card format invalid — show error'],
      ['T5',  'Tax ID format invalid — show error'],
      ['T6',  'Error cleared — retry input'],
      ['T7',  'Validation OK — proceed to upload'],
      ['T8',  'File type invalid or size >10MB — show error'],
      ['T9',  'Error cleared — retry upload'],
      ['T10', 'File valid — upload to bucket'],
      ['T11', 'Backend: file corrupted — Error 400'],
      ['T12', 'Error 400 — retry upload'],
      ['T13', 'Backend: file OK — submit registration'],
      ['T14', 'Submit with idempotency guard → DB Pending'],
      ['T15', 'DB Pending → Verification Status Page'],
    ],
  },
  {
    sectionId: 'flow-status-machine',
    num: '5',
    title: 'Sub-Flow 4 · Verification Status State Machine',
    subtitle: 'S18–S22 · T16–T18 · TC-037–039, TC-042',
    chart: FLOW_STATUS_MACHINE,
    states: [
      ['S18', 'Pending — awaiting admin review'],
      ['S19', 'Admin Reviews documents'],
      ['S20', 'Approved — full BO access'],
      ['S21', 'Rejected — with rejection comment'],
      ['S22', 'Re-submit Form (edit info / re-upload docs)'],
    ],
    transitions: [
      ['T16', 'Admin approves → status Approved'],
      ['T17', 'Admin rejects → status Rejected with comment'],
      ['T18', 'Agency re-submits → status back to Pending'],
    ],
  },
  {
    sectionId: 'flow-login-rbac',
    num: '6',
    title: 'Sub-Flow 5 · Login & RBAC',
    subtitle: 'S23–S29 · T19–T25 · TC-037–042',
    chart: FLOW_LOGIN_RBAC,
    states: [
      ['S23', 'Login Page'],
      ['S24', 'Authenticate'],
      ['S25', 'Status Check'],
      ['S26', 'Verification Status Page (Pending — Create Event hidden)'],
      ['S27', 'Rejection Page (Rejected — reason + Re-submit button)'],
      ['S28', 'Edit Info / Re-upload Docs'],
      ['S29', 'BO Dashboard (Approved — full access)'],
    ],
    transitions: [
      ['T19', 'Login with credentials'],
      ['T20', 'Status = Pending → Verification Status page'],
      ['T21', 'Status = Rejected → show reason + Re-submit form'],
      ['T22', 'Status = Approved → BO Dashboard'],
      ['T23', 'Edit info / re-upload docs → Re-submit → Pending'],
      ['T24', 'RBAC guard — direct URL blocked for Pending user'],
      ['T25', 'RBAC guard — direct URL blocked for Rejected user'],
    ],
  },
];
