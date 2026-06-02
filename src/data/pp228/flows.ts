import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    START([Organizer on Email\\nVerification Page]) --> TIMER[Start 60s Countdown Timer]
    TIMER --> COUNTING{Timer\\nRunning?}
    COUNTING -->|Yes| DISABLED[Resend Button Disabled\\nTimer shows seconds]
    COUNTING -->|No| ENABLED[Resend Button Enabled\\nTimer hidden]
    ENABLED --> PRESS{User presses\\nResend?}
    PRESS -->|No| WAIT([User waits for email])
    PRESS -->|Yes| RATE{Rate Limit\\n< 3-5 requests/hour?}
    RATE -->|Exceeded| BLOCKED[Button permanently disabled\\nShow rate limit error]
    RATE -->|OK| LOADING[Loading State\\nButton disabled]
    LOADING --> API[Call Resend API]
    API --> NET{Network &\\nServer OK?}
    NET -->|Error| APIERR[Show error toast\\nDo NOT reset timer]
    NET -->|Success| INVAL[Invalidate old token\\nGenerate new token]
    INVAL --> SENDEMAIL[Send new verification\\nemail to original address]
    SENDEMAIL --> SUCCESS[Show success toast\\nReset timer to 60s]
    SUCCESS --> TIMER2[Start new 60s Countdown]
    TIMER2 --> COUNTING

    WAIT --> ENTER[User enters OTP/code\\nfrom email]
    ENTER --> EXPCHECK{Token\\nExpired? > 15 min}
    EXPCHECK -->|Yes| EXPIRY([Show Expiry Error\\nPrompt to Resend])
    EXPCHECK -->|No| VALID([OTP Accepted\\nVerification Success])

    style VALID fill:#4CAF50,color:#fff
    style BLOCKED fill:#f44336,color:#fff
    style APIERR fill:#f44336,color:#fff
    style EXPIRY fill:#f44336,color:#fff
    style LOADING fill:#2196F3,color:#fff
    style INVAL fill:#2196F3,color:#fff
    style SUCCESS fill:#4CAF50,color:#fff`;

const FLOW_TIMER = `flowchart TD
    S1([Verification Page\\nLoaded]) -->|"T1 · PP228-TC-001"| S2[60s Countdown\\nRunning]
    S2 -->|"T2 · PP228-TC-001 PP228-TC-002"| S3[Resend Button\\nDisabled]
    S2 -->|"T3 · PP228-TC-003"| S4[Timer = 0]
    S4 --> S5[Resend Button\\nEnabled / Timer hidden]
    S5 -->|"T4 · PP228-TC-004"| S6[User presses Resend\\nTimer resets to 60s]
    S6 --> S2

    style S5 fill:#4CAF50,color:#fff
    style S3 fill:#FF9800,color:#fff
    style S6 fill:#2196F3,color:#fff`;

const FLOW_API = `flowchart TD
    S7([Resend Pressed\\nLoading State]) -->|"T5 · PP228-TC-004"| S8[API Call\\nIn-flight]
    S8 -->|"T6 · PP228-TC-004"| S9[Old Token\\nInvalidated]
    S8 -->|"T9 · PP228-TC-008"| S12[Error Toast\\nShown — timer unchanged]
    S9 -->|"T7 · PP228-TC-005"| S10[New Email\\nSent]
    S10 -->|"T8 · PP228-TC-004"| S11([Success Toast\\nShown])

    style S11 fill:#4CAF50,color:#fff
    style S12 fill:#f44336,color:#fff
    style S9 fill:#2196F3,color:#fff`;

const FLOW_RATE = `flowchart TD
    S13([Resend within\\nRate Limit]) -->|"T10 · PP228-TC-004 PP228-TC-006"| API2[API allowed]
    API2 --> S11B([Resend OK])
    S13 -->|"T11 · PP228-TC-007"| S14[Rate Limit\\nExceeded]
    S14 --> S15[Button disabled permanently\\nError: try again in 30 min]
    S15 -->|"T12 · PP228-TC-007"| S16[Block period\\nexpires — button re-enables]

    S17[Token submitted after\\n15 minutes] -->|"T13 · PP228-TC-009"| EXPIRY2([Expiry Error Shown\\nPrompt to Resend])

    style S11B fill:#4CAF50,color:#fff
    style S15 fill:#f44336,color:#fff
    style EXPIRY2 fill:#f44336,color:#fff
    style S16 fill:#FF9800,color:#fff`;

const FLOW_FEEDBACK = `flowchart TD
    S18([API responds\\nSuccess]) -->|"T14 · PP228-TC-004"| S19[Success Toast:\\n'ส่งรหัสยืนยันใหม่สำเร็จแล้ว\\nกรุณาเช็คที่ Inbox']
    S18B([API responds\\nError]) -->|"T15 · PP228-TC-008"| S20[Mail Server / Network Error]
    S20 --> S21[Error Toast:\\n'เกิดข้อผิดพลาด กรุณาลองใหม่'\\nTimer NOT reset]

    style S19 fill:#4CAF50,color:#fff
    style S21 fill:#f44336,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Resend Verification Email',
  subtitle: 'End-to-end system overview',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-timer',
    num: '2',
    title: 'Sub-Flow 1 · Countdown Timer & Button Control',
    subtitle: 'S1–S6 · T1–T4 · TC-001–004',
    chart: FLOW_TIMER,
    states: [
      ['S1', 'Verification page entered — timer starts'],
      ['S2', 'Countdown active (1–60 seconds remaining)'],
      ['S3', 'Resend button disabled during countdown'],
      ['S4', 'Timer reaches zero'],
      ['S5', 'Resend button enabled — countdown hidden'],
      ['S6', 'User presses Resend — timer resets to 60s'],
    ],
    transitions: [
      ['T1', 'Page load triggers 60s countdown'],
      ['T2', 'Timer ticking — button remains disabled'],
      ['T3', 'Timer reaches 0 — button enabled'],
      ['T4', 'User presses Resend — timer resets'],
    ],
  },
  {
    sectionId: 'flow-api',
    num: '3',
    title: 'Sub-Flow 2 · API & Email Trigger',
    subtitle: 'S7–S12 · T5–T9 · TC-004–005, TC-008',
    chart: FLOW_API,
    states: [
      ['S7',  'Resend pressed — Loading state active'],
      ['S8',  'API call in-flight'],
      ['S9',  'API success — old token invalidated'],
      ['S10', 'New verification email sent'],
      ['S11', 'Success toast shown'],
      ['S12', 'API error — error toast shown, timer unchanged'],
    ],
    transitions: [
      ['T5', 'Press Resend → enter loading state'],
      ['T6', 'API responds success'],
      ['T7', 'Old OTP/link invalidated'],
      ['T8', 'New email dispatched'],
      ['T9', 'API responds with error (network/server)'],
    ],
  },
  {
    sectionId: 'flow-rate',
    num: '4',
    title: 'Sub-Flow 3 · Rate Limiting & Security',
    subtitle: 'S13–S17 · T10–T13 · TC-006–007, TC-009',
    chart: FLOW_RATE,
    states: [
      ['S13', 'Rate limit threshold not reached (< 3-5/hour)'],
      ['S14', 'Rate limit exceeded'],
      ['S15', 'Button permanently disabled + error message shown'],
      ['S16', 'Rate limit window expires (30 min / 1 hour later)'],
      ['S17', 'Token expired (> 15 min) — expiry error shown'],
    ],
    transitions: [
      ['T10', 'Resend count within allowed limit'],
      ['T11', 'Resend count exceeds limit'],
      ['T12', 'Rate limit block period expires'],
      ['T13', 'User submits token after 15-minute expiry'],
    ],
  },
  {
    sectionId: 'flow-feedback',
    num: '5',
    title: 'Sub-Flow 4 · Feedback & Notification',
    subtitle: 'S18–S21 · T14–T15 · TC-004, TC-008',
    chart: FLOW_FEEDBACK,
    states: [
      ['S18', 'Email sent successfully'],
      ['S19', 'Success toast visible'],
      ['S20', 'Mail server error'],
      ['S21', 'Error toast shown — timer not reset'],
    ],
    transitions: [
      ['T14', 'Email dispatch succeeds'],
      ['T15', 'Mail server fails / network error'],
    ],
  },
];
