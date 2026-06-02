import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    START([App Launch]) --> TOKEN{"JWT Token\\nValid?"}
    TOKEN -->|Yes| HOME([Home Page])
    TOKEN -->|No| LOGIN["Login Page\\nPhone / Apple / LINE / Google"]
    LOGIN -->|Phone| PH1[Enter Phone Number]
    PH1 --> PH2{"Format OK?\\n10 digits"}
    PH2 -->|No| PH3["Show Error\\nDisable OTP Button"]
    PH3 --> PH1
    PH2 -->|Yes| PH4[Send OTP via SMS]
    PH4 --> PH5["OTP Screen\\n60s Countdown"]
    PH5 -->|Timeout| PH6["Resend OTP\\nmax 3x / 5 min"]
    PH6 --> PH5
    PH5 --> PH7{OTP Correct?}
    PH7 -->|No| PH8[Show OTP Error]
    PH8 --> PH5
    PH7 -->|Yes| PROFILE_CHECK
    LOGIN -->|Apple| APPLE[Apple Auth]
    APPLE --> APPLE2{Hide My Email?}
    APPLE2 -->|Yes| APPLE3[Use Apple Private Email]
    APPLE2 -->|No| APPLE4[Use Real Email]
    APPLE3 --> EMAIL_CHK
    APPLE4 --> EMAIL_CHK
    LOGIN -->|LINE| LINE_AUTH[LINE Auth]
    LINE_AUTH --> EMAIL_CHK
    LOGIN -->|Google| GOOGLE[Google Auth]
    GOOGLE --> EMAIL_CHK
    EMAIL_CHK{"Email Already\\nRegistered?"}
    EMAIL_CHK -->|No| PROFILE_CHECK
    EMAIL_CHK -->|Same provider| PROFILE_CHECK
    EMAIL_CHK -->|Diff provider| LINK_DIALOG["Identity Linking Dialog\\nLink your accounts?"]
    LINK_DIALOG -->|Confirm| LINKED[Accounts Linked]
    LINKED --> PROFILE_CHECK
    LINK_DIALOG -->|Cancel| LOGIN
    PROFILE_CHECK{Profile in DB?}
    PROFILE_CHECK -->|Existing User| HOME
    PROFILE_CHECK -->|New User| PDPA
    PDPA[PDPA Consent Screen]
    PDPA --> BASIC["Basic Identity\\nName / Gender / DOB"]
    BASIC --> IS_SOCIAL{"Social Login\\nFirst Time?"}
    IS_SOCIAL -->|Yes| PHONE_VERIFY["Phone Verification\\nPhone + OTP"]
    PHONE_VERIFY --> INTERESTS
    IS_SOCIAL -->|No| INTERESTS
    INTERESTS["Interests Selection\\n1-3 Categories"]
    INTERESTS --> SAVE[(Save to DB)]
    SAVE --> HOME
    style HOME fill:#4CAF50,color:#fff
    style LOGIN fill:#FF6B35,color:#fff
    style SAVE fill:#2196F3,color:#fff
    style PDPA fill:#FF9800,color:#fff
    style LINKED fill:#8BC34A,color:#fff`;

const FLOW_PHONE = `flowchart TD
    S1(["Login Page"]) -->|"T1 · TC-001~005, 037"| S2["Phone Input Screen"]
    S2 --> S3{"Phone Format\\nValid? 10 digits"}
    S3 -->|"T2 · TC-002, 037"| S4["Error shown\\nOTP button disabled"]
    S4 -->|"T3"| S2
    S3 -->|"T4 · TC-001,003,004,005"| S5A["OTP button enabled\\nUser taps Send OTP"]
    S5A --> S5["OTP Screen + 60s timer"]
    S5 -->|"T6 · TC-006,007"| S8["Resend Available"]
    S8 -->|"T7 · TC-007"| S5
    S8 -->|"T8 · TC-008,034"| S9["Rate Limit Error"]
    S5 --> S6{OTP Correct?}
    S6 -->|"T9 · TC-009,010,038"| S7["OTP Error"]
    S7 --> S5
    S6 -->|"T10 · TC-001,005,009"| S10(["Profile Check"])
    style S10 fill:#4CAF50,color:#fff
    style S9 fill:#f44336,color:#fff
    style S4 fill:#e91e63,color:#fff`;

const FLOW_SOCIAL = `flowchart TD
    S11(["Login Page"]) --> S12B{"Which Social?"}
    S12B -->|"T11 · TC-011,012"| S12["Google OAuth"]
    S12B -->|"T12 · TC-013,014"| S13["LINE OAuth"]
    S12B -->|"T13 · TC-015~017,035"| S14["Apple OAuth"]
    S14 --> S15{"Hide My Email?"}
    S15 -->|"T14 · TC-016"| S16["Private Relay Email"]
    S15 -->|"T15 · TC-015"| S17["Real Email"]
    S16 --> S18
    S17 --> S18
    S12 --> S18
    S13 --> S18
    S18{"Email already\\nin system?"}
    S18 -->|"T16 · TC-011,013,015,016"| S21(["Profile Check"])
    S18 -->|"T17 · TC-012,014,017,039"| S21
    S18 -->|"T18 · TC-018,036"| S19["Identity Linking Dialog"]
    S19 -->|"T19 · TC-019"| S20["Accounts Merged"]
    S20 --> S21
    S19 -->|"T20 · TC-020"| S11
    style S21 fill:#4CAF50,color:#fff
    style S19 fill:#FF9800,color:#fff
    style S20 fill:#8BC34A,color:#fff`;

const FLOW_ONBOARDING = `flowchart TD
    S22(["New User Detected"]) -->|"T21"| S23["PDPA Consent Screen"]
    S23 -->|"T23 · TC-022"| S24(["Cannot Proceed"])
    S23 -->|"T22 · TC-021,022"| S25["Basic Identity Screen\\nName / Gender / DOB"]
    S25 --> S25B{"All fields valid?"}
    S25B -->|"T25 · TC-023~026,040,041"| S26["Inline Validation Error"]
    S26 --> S25
    S25B -->|"T24 · TC-027"| S27{"Login method\\nwas Social?"}
    S27 -->|"T26 · TC-027"| S28["Phone Verification\\nPhone + OTP"]
    S28 --> S28B{"OTP verified?"}
    S28B -->|"T29 ⚠ Missing TC"| S29["Error — retry"]
    S29 --> S28
    S28B -->|"T28 · TC-027"| S30
    S27 -->|"T27 · TC-028~030"| S30["Interests Selection\\n1-3 categories"]
    S30 --> S30B{"Min 1 selected?"}
    S30B -->|"T31 · TC-028"| S30
    S30B -->|"T30 · TC-029,030"| S31[("Save Profile to DB")]
    S31 -->|"T32 · TC-030"| S32(["Home Page"])
    style S32 fill:#4CAF50,color:#fff
    style S24 fill:#f44336,color:#fff
    style S29 fill:#FF9800,color:#fff`;

const FLOW_SESSION = `flowchart TD
    S33(["App Launch"]) --> S34["Read local token"]
    S34 --> S35{"Token exists?"}
    S35 -->|"T33 · TC-042"| S40(["Login Page"])
    S35 -->|Yes| S36{"Token valid and\\nnot expired?"}
    S36 -->|"T34 · TC-032"| S38["Clear token"]
    S38 --> S40
    S36 -->|"T35 · TC-043"| S37["Silent refresh"]
    S37 --> S39(["Home Page"])
    S36 -->|"T36 · TC-031"| S39
    style S39 fill:#4CAF50,color:#fff
    style S40 fill:#FF6B35,color:#fff
    style S37 fill:#2196F3,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Registration & Login',
  subtitle: 'End-to-end system overview',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-phone',
    num: '2',
    title: 'Sub-Flow 1 · Phone Login & OTP',
    subtitle: 'S1–S10 · T1–T10 · TC-001–010, 037–038',
    chart: FLOW_PHONE,
    states: [
      ['S1','Login Page'],['S2','Phone Input Screen'],['S3','Phone Format Valid?'],
      ['S4','Error shown + OTP button disabled'],['S5','OTP Screen (60s countdown active)'],
      ['S6','OTP Correct?'],['S7','OTP Error'],['S8','Resend Available'],
      ['S9','Rate Limit Reached'],['S10','Profile Check'],
    ],
    transitions: [
      ['T1','Tap Phone login'],['T2','Phone invalid — show error'],['T3','Error cleared — retry input'],
      ['T4','Phone valid — send OTP'],['T5','OTP screen loaded'],['T6','Timer expires — resend available'],
      ['T7','Resend under rate limit'],['T8','Resend over rate limit — blocked'],
      ['T9','OTP wrong — show error'],['T10','OTP correct — proceed'],
    ],
  },
  {
    sectionId: 'flow-social',
    num: '3',
    title: 'Sub-Flow 2 · Social Login & Identity Linking',
    subtitle: 'S11–S21 · T11–T20 · TC-011–020, 035, 036, 039',
    chart: FLOW_SOCIAL,
    states: [
      ['S11','Login Page'],['S12','Google OAuth'],['S13','LINE OAuth'],['S14','Apple OAuth'],
      ['S15','Apple — Hide My Email?'],['S16','Apple Private Relay Email used'],
      ['S17','Apple Real Email used'],['S18','Email Check (already registered?)'],
      ['S19','Identity Linking Dialog'],['S20','Accounts Merged'],['S21','Profile Check'],
    ],
    transitions: [
      ['T11','Tap Google'],['T12','Tap LINE'],['T13','Tap Apple'],
      ['T14','Apple — choose Hide My Email'],['T15','Apple — choose Real Email'],
      ['T16','Email not registered → Profile Check'],['T17','Registered, same provider → no dialog'],
      ['T18','Registered, diff provider → Linking'],['T19','Confirm link → Merge accounts'],
      ['T20','Cancel link → return to Login'],
    ],
  },
  {
    sectionId: 'flow-onboarding',
    num: '4',
    title: 'Sub-Flow 3 · New User Onboarding',
    subtitle: 'S22–S32 · T21–T32 · TC-021–030, 040–041',
    chart: FLOW_ONBOARDING,
    states: [
      ['S22','New User Detected'],['S23','PDPA Consent Screen'],['S24','Cannot Proceed (PDPA declined)'],
      ['S25','Basic Identity Screen'],['S26','Validation Error on Basic Identity'],
      ['S27','Login method was Social?'],['S28','Phone Verification Screen'],
      ['S29','OTP Error (onboarding) ⚠ Missing TC'],['S30','Interests Selection Screen'],
      ['S31','Save Profile to DB'],['S32','Home Page'],
    ],
    transitions: [
      ['T21','New user detected → PDPA'],['T22','PDPA accept → Basic Identity'],
      ['T23','PDPA decline / back → blocked'],['T24','Basic Identity valid → check login method'],
      ['T25','Basic Identity invalid — inline error'],['T26','Social login → Phone Verification'],
      ['T27','Phone login → skip to Interests'],['T28','Phone OTP verified → Interests'],
      ['T29','Phone OTP wrong → error ⚠ Missing TC'],['T30','Min 1 interest selected → Done'],
      ['T31','Done tapped with 0 interests — blocked'],['T32','Save complete → Home'],
    ],
  },
  {
    sectionId: 'flow-session',
    num: '5',
    title: 'Sub-Flow 4 · Session Persistence (Auto Login)',
    subtitle: 'S33–S40 · T33–T36 · TC-031, 032, 042, 043',
    chart: FLOW_SESSION,
    states: [
      ['S33','App Launch'],['S34','Read local token'],['S35','Token exists?'],
      ['S36','Token valid and not expired?'],['S37','Near expiry — silent refresh'],
      ['S38','Clear token'],['S39','Home Page'],['S40','Login Page'],
    ],
    transitions: [
      ['T33','No token → Login'],['T34','Token expired → clear → Login'],
      ['T35','Token near expiry → silent refresh → Home'],['T36','Token valid and fresh → Home'],
    ],
  },
  {
    sectionId: 'flow-user-api-otp',
    num: '6',
    title: 'Sub-Flow 5: User API — OTP Auth (PP-566 bypass)',
    subtitle: 'API layer · request-otp → verify-otp → profile / refresh',
    chart: `flowchart TD
    TPHONE["timestampPhone()\\nString(Date.now()).slice(-9)\\nUnique 9-digit per run"] --> REQ
    REQ["POST /api/v1/auth/request-otp\\n{ phone }"] --> REQ_OK{"200 OK?"}
    REQ_OK -->|"No — bad phone"| REQ400["400 Bad Request\\npattern ^[0-9]{9,10}$ violated"]
    REQ_OK -->|"Yes"| REQ_SUCC["{ success: true, expiredAt }\\nOTP sent to phone (STG: skipped)"]
    REQ_SUCC --> VER["POST /api/v1/auth/verify-otp\\n{ phone, otp: '123456' }"]
    VER --> VER_OK{"200 OK?"}
    VER_OK -->|"No — wrong otp"| VER401["401 Unauthorized\\notp not bypass & not real OTP"]
    VER_OK -->|"No — bad schema"| VER400["400 Bad Request\\nmissing field / bad format"]
    VER_OK -->|"Yes"| TOKEN["{ accessToken, refreshToken\\nexpiresIn, tokenType: Bearer }"]
    TOKEN --> USE1["GET /api/v1/user/profile\\nAuthorization: Bearer {accessToken}"]
    TOKEN --> USE2["POST /api/v1/auth/refresh-token\\n{ refreshToken }"]
    USE1 --> P200{"200 OK?"}
    P200 -->|"Yes"| PDATA["{ id, name, phone, ... }\\nnew user auto-created on first login"]
    P200 -->|"No"| P401["401 Unauthorized\\ntoken invalid or expired"]
    USE2 --> R200{"200 OK?"}
    R200 -->|"Yes"| RDATA["{ accessToken, expiresIn }\\ntoken rotated"]
    R200 -->|"No"| R401["401 Unauthorized\\nrefreshToken invalid or expired"]`,
    states: [
      ['S1', 'phone ready (timestampPhone)'],
      ['S2', 'OTP requested'],
      ['S3', 'OTP verified — tokens issued'],
      ['S4', 'profile fetched'],
      ['S5', 'token refreshed'],
    ],
    transitions: [
      ['T1', 'POST request-otp (valid phone) → 200'],
      ['T2', 'POST request-otp (bad phone) → 400'],
      ['T3', 'POST verify-otp otp=123456 → 200 (bypass)'],
      ['T4', 'POST verify-otp wrong otp → 401'],
      ['T5', 'GET profile with accessToken → 200'],
      ['T6', 'POST refresh-token → 200'],
    ],
  },
];
