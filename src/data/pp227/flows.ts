import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    START([Organizer on Login Page]) --> FP[Click Forgot Password]
    FP --> REQ[Request Reset Link Page\\nEnter Email]
    REQ --> VAL{Email Format\\nValid?}
    VAL -->|No| VALERR[Show Format Error\\nKeep on page]
    VAL -->|Yes| RATE{Rate Limit\\nExceeded?}
    RATE -->|Yes| RATERR[Button Disabled\\nShow cooldown message]
    RATE -->|No| SEND[Submit Email]
    SEND --> GENERIC[Show Generic Message\\n'หากอีเมลนี้มีอยู่ในระบบ...' always]
    GENERIC --> EMAIL_CHECK{Email exists\\nin system?}
    EMAIL_CHECK -->|No| IDLE([User receives generic message\\nno token sent])
    EMAIL_CHECK -->|Yes| TOKEN[Generate Unique Token\\nInvalidate old tokens\\nSend Reset Email]
    TOKEN --> LINK[User clicks Reset Link\\nin Email]
    LINK --> TOKVAL{Token Valid?\\nNot expired & not used?}
    TOKVAL -->|Expired| TOKERR([Show Error Page\\nToken Expired])
    TOKVAL -->|Already used| USEDERR([Show Error Page\\nLink already used])
    TOKVAL -->|Valid| RESET[Show Reset Password Page\\nNew Password + Confirm]
    RESET --> STRENGTH{Password Strength\\nValid?}
    STRENGTH -->|No| STRERR[Show inline error\\nremain on page]
    STRENGTH -->|Yes| MATCH{Passwords\\nMatch?}
    MATCH -->|No| MATCHERR[Disable Confirm button\\nShow mismatch error]
    MATCH -->|Yes| SAME{Same as\\nold password?}
    SAME -->|Yes| SAMEERR[Show error\\n'Password must be different']
    SAME -->|No| CONFIRM[Confirm Reset]
    CONFIRM --> FORCE[Force Logout all sessions]
    FORCE --> NOTIFY[Send Confirmation Email\\n'Password changed']
    NOTIFY --> LOGIN([Redirect to Login Page\\nShow Success Toast])

    style LOGIN fill:#4CAF50,color:#fff
    style IDLE fill:#9E9E9E,color:#fff
    style TOKERR fill:#f44336,color:#fff
    style USEDERR fill:#f44336,color:#fff
    style VALERR fill:#f44336,color:#fff
    style RATERR fill:#FF9800,color:#fff
    style STRERR fill:#f44336,color:#fff
    style MATCHERR fill:#f44336,color:#fff
    style SAMEERR fill:#f44336,color:#fff
    style TOKEN fill:#2196F3,color:#fff
    style CONFIRM fill:#2196F3,color:#fff`;

const FLOW_REQUEST = `flowchart TD
    S1([Forgot Password\\nPage]) -->|"T1"| S2[Email Input Field\\nactive]
    S2 -->|"T2 · PP227-TC-001"| S3[Format OK\\nEnable Send button]
    S2 -->|"T3 · PP227-TC-002 PP227-TC-003"| S4[Format Error shown\\nSend button disabled]
    S3 -->|"T4 · PP227-TC-001 PP227-TC-004"| S5[Rate Limit OK]
    S3 -->|"T5 · PP227-TC-005"| S6[Rate Limit Exceeded\\nButton Disabled + Timer]
    S5 -->|"T6 · PP227-TC-001"| S7[Generic Response\\nMessage shown]
    S5 -->|"T7 · PP227-TC-004"| S7
    S7 --> S8[Reset Token generated\\nEmail sent]

    style S8 fill:#4CAF50,color:#fff
    style S4 fill:#f44336,color:#fff
    style S6 fill:#FF9800,color:#fff
    style S7 fill:#2196F3,color:#fff`;

const FLOW_TOKEN = `flowchart TD
    S9([User clicks\\nreset link]) -->|"T8 · PP227-TC-006"| S10[Reset Password\\nPage shown]
    S9 -->|"T9 · PP227-TC-007"| S11([Error: Token\\nExpired])
    S9 -->|"T10 · PP227-TC-008"| S12([Error: Link\\nAlready Used])
    S9 -->|"T11 · PP227-TC-009"| S13[Old token invalidated\\nNew token active]
    S13 --> S10

    style S10 fill:#2196F3,color:#fff
    style S11 fill:#f44336,color:#fff
    style S12 fill:#f44336,color:#fff
    style S13 fill:#FF9800,color:#fff`;

const FLOW_RESET = `flowchart TD
    S14([Reset Password\\nForm]) -->|"T12 · PP227-TC-010"| S15[Strength Valid]
    S14 -->|"T13 · PP227-TC-011 PP227-TC-012"| S16[Inline Error\\nStrength too weak]
    S15 -->|"T14 · PP227-TC-010"| S17[Passwords Match]
    S15 -->|"T15 · PP227-TC-013"| S18[Mismatch Error\\nConfirm Disabled]
    S17 -->|"T16 · PP227-TC-014"| S19[Error: Same as\\nold password]
    S17 --> S21[Confirm Enabled]
    S14 -->|"T17 · PP227-TC-015"| S20[Password chars\\nvisible / hidden]

    style S21 fill:#2196F3,color:#fff
    style S16 fill:#f44336,color:#fff
    style S18 fill:#f44336,color:#fff
    style S19 fill:#f44336,color:#fff
    style S20 fill:#FF9800,color:#fff`;

const FLOW_POST_RESET = `flowchart TD
    S22([Password Reset\\nSubmitted]) -->|"T18 · PP227-TC-016"| S23[Force Logout\\nAll Sessions]
    S23 -->|"T19 · PP227-TC-016"| S24[Send Notification\\nEmail Dispatched]
    S24 -->|"T20 · PP227-TC-016"| S25([Login Page\\n+ Success Toast])

    style S25 fill:#4CAF50,color:#fff
    style S22 fill:#2196F3,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Organizer Forgot Password',
  subtitle: 'End-to-end system overview',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-request',
    num: '2',
    title: 'Sub-Flow 1 · Request Reset Link',
    subtitle: 'S1–S8 · T1–T7 · TC-001–005',
    chart: FLOW_REQUEST,
    states: [
      ['S1', 'Forgot Password page loaded'],
      ['S2', 'Email entered'],
      ['S3', 'Format validation passed'],
      ['S4', 'Format validation failed — error shown'],
      ['S5', 'Rate limit check passed'],
      ['S6', 'Rate limit exceeded — button disabled'],
      ['S7', 'Generic response shown (always)'],
      ['S8', 'Reset email sent with unique token'],
    ],
    transitions: [
      ['T1', 'User opens Forgot Password page'],
      ['T2', 'Valid email format'],
      ['T3', 'Invalid email format'],
      ['T4', 'Rate limit not exceeded'],
      ['T5', 'Rate limit exceeded (> 1 request in 60s)'],
      ['T6', 'Email found in system — token generated'],
      ['T7', 'Email not found — no token, generic reply'],
    ],
  },
  {
    sectionId: 'flow-token',
    num: '3',
    title: 'Sub-Flow 2 · Token Security',
    subtitle: 'S9–S13 · T8–T11 · TC-006–009',
    chart: FLOW_TOKEN,
    states: [
      ['S9',  'User clicks reset link in email'],
      ['S10', 'Token valid — Reset Password page shown'],
      ['S11', 'Token expired — Error page'],
      ['S12', 'Token already used — Error page'],
      ['S13', 'New link requested — old token invalidated'],
    ],
    transitions: [
      ['T8',  'Token exists, not expired, not used'],
      ['T9',  'Token has expired (> 30 min)'],
      ['T10', 'Token was already used once'],
      ['T11', 'User requests a new link (old invalidated)'],
    ],
  },
  {
    sectionId: 'flow-reset',
    num: '4',
    title: 'Sub-Flow 3 · Reset Password Logic',
    subtitle: 'S14–S21 · T12–T17 · TC-010–015',
    chart: FLOW_RESET,
    states: [
      ['S14', 'Reset Password form active'],
      ['S15', 'Password strength valid'],
      ['S16', 'Password strength invalid — inline error'],
      ['S17', 'Passwords match'],
      ['S18', 'Passwords do not match — confirm disabled'],
      ['S19', 'New password same as old — error shown'],
      ['S20', 'Show/Hide password toggled'],
      ['S21', 'Confirm button enabled — ready to submit'],
    ],
    transitions: [
      ['T12', 'Password meets strength policy (8+ chars, upper, lower, digit)'],
      ['T13', 'Password does not meet strength policy'],
      ['T14', 'Confirm password matches new password'],
      ['T15', 'Confirm password does not match'],
      ['T16', 'New password same as old password'],
      ['T17', 'Toggle show/hide password eye icon'],
    ],
  },
  {
    sectionId: 'flow-post-reset',
    num: '5',
    title: 'Sub-Flow 4 · Post-Success Actions',
    subtitle: 'S22–S25 · T18–T21 · TC-016',
    chart: FLOW_POST_RESET,
    states: [
      ['S22', 'Password reset confirmed'],
      ['S23', 'All sessions force-logged out'],
      ['S24', 'Confirmation email sent'],
      ['S25', 'Redirected to Login with success toast'],
    ],
    transitions: [
      ['T18', 'Password update API succeeds'],
      ['T19', 'Force logout all sessions'],
      ['T20', 'Notification email dispatched'],
      ['T21', 'Redirect to Login page'],
    ],
  },
];
