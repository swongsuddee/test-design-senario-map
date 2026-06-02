import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    START([Admin accesses BO]) --> PATH{Auth path}

    PATH -->|"Casdoor OAuth2\\n(BO Portal)"| CSDR[Casdoor Login Page]
    PATH -->|"Direct Email+Password\\n(API — PP-60)"| APILOGIN[Email-Password Login API]
    PATH -->|"Super Admin creates account\\n(API — PP-101)"| SADMIN[Super Admin Portal]

    CSDR --> CSDR_CRED[Enter credentials on Casdoor]
    CSDR_CRED --> CSDR_AUTH{Casdoor\\nAuthentication}
    CSDR_AUTH -->|Fail| CSDR_ERR[Error on Casdoor]
    CSDR_ERR --> CSDR_CRED
    CSDR_AUTH -->|Success| CALLBACK[BO Callback\\nAuthorization Code]
    CALLBACK --> EXCHANGE[Backend Token Exchange]
    EXCHANGE --> ROLE{Role check}
    ROLE -->|"Agency or End-user"| REJECT[Access Rejected\\nUnauthorized message]
    ROLE -->|Admin| SESSION[Session Created]
    SESSION --> DASHBOARD([BO Dashboard])

    APILOGIN --> STATUS{Account\\nstatus?}
    STATUS -->|"pending_verification"| ERR_VERIFY[Error: verify email first]
    STATUS -->|"pending_approval"| ERR_APPROVE[Error: pending approval]
    STATUS -->|rejected| ERR_REJECT[Error: account rejected]
    STATUS -->|active| PWCHECK{Password\\ncheck}
    PWCHECK -->|Fail| ERR_CRED[401 Invalid credentials]
    PWCHECK -->|Pass| JWT[Generate JWT\\nAccess+Refresh Token]
    JWT --> DASHBOARD

    SADMIN --> CREATE[Create Admin Form\\nname, email, password, role]
    CREATE --> ACCOUNT[Admin Account Created\\nstatus: pending_verification]
    ACCOUNT --> INVITE[Send Invite Email async]

    style DASHBOARD fill:#4CAF50,color:#fff
    style REJECT fill:#f44336,color:#fff
    style ERR_VERIFY fill:#FF9800,color:#fff
    style ERR_APPROVE fill:#FF9800,color:#fff
    style ERR_REJECT fill:#f44336,color:#fff
    style ERR_CRED fill:#f44336,color:#fff`;

const FLOW_ACCOUNT_STATUS = `flowchart TD
    REG([Register Email\\nor Super Admin Creates]) --> PV[pending_verification]
    PV -->|"Verify email token\\n(within 24h)"| PA[pending_approval]
    PV -->|"Token expired"| PV
    PA -->|"Super Admin approves"| ACTIVE[active]
    PA -->|"Super Admin rejects"| REJECTED[rejected]
    ACTIVE -->|"Change password\\nrevokes sessions"| ACTIVE
    ACTIVE -->|"Admin logs in\\n(JWT issued)"| ACTIVE

    style ACTIVE fill:#4CAF50,color:#fff
    style REJECTED fill:#f44336,color:#fff
    style PV fill:#FF9800,color:#fff
    style PA fill:#2196F3,color:#fff`;

const FLOW_DIRECT_LOGIN = `flowchart TD
    S1([BO URL Opened]) --> S2{Session Check}
    S2 -->|"T2 · PP5-TC-002"| S3([Valid Session — Dashboard])
    S2 -->|"T1 · PP5-TC-001 PP5-TC-017"| S4[/login — Admin Login Form\\nemail + password fields]
    S4 -->|"T3 · PP5-TC-001"| S5[Credentials Entered\\nbutton shows Logging in...]
    S5 --> S6{Backend\\nAuthentication}
    S6 -->|"T4 · PP5-TC-006"| S7[Auth Failed\\nInvalid email or password toast]
    S7 -->|"T5"| S4
    S6 -->|"T6 · PP5-TC-001"| S8[Session Created]
    S8 -->|"T7"| S9([BO Dashboard])

    style S3 fill:#4CAF50,color:#fff
    style S9 fill:#4CAF50,color:#fff
    style S7 fill:#f44336,color:#fff`;

const FLOW_SESSION_MGMT = `flowchart TD
    S14([Session Created]) --> S15{Remember Me?}
    S15 -->|"T11 · PP5-TC-010"| S16[Persistent Session\\nsurvives browser close]
    S15 -->|"T12 · PP5-TC-011"| S17[Temporary Session\\nends on browser close]
    S16 -->|"T13 · PP5-TC-010 PP5-TC-011"| S18[BO Dashboard]
    S17 --> S18

    S18 -->|"T15 · PP5-TC-013"| S18
    S18 -->|"T14 · PP5-TC-012"| S19[Inactivity Monitor\\ntimeout reached]
    S19 --> S20[Session Invalidated]
    S20 --> S21([Casdoor Login Page])

    S18 -->|"T16 · PP5-TC-014"| S22[Logout]
    S22 --> S21

    style S18 fill:#4CAF50,color:#fff
    style S21 fill:#FF6B35,color:#fff`;

const FLOW_ERROR_HANDLING = `flowchart TD
    S23([Casdoor Login Page]) -->|"T17 · PP5-TC-006"| S24[Auth Failed\\nWrong Password]
    S23 -->|"T18 · PP5-TC-007"| S25[Auth Failed\\nSuspended Account]
    S23 -->|"T19 · PP5-TC-008"| S26[Server Unavailable\\nError message shown]
    S23 -->|"T22 · PP5-TC-015"| S29[Forgot Password\\non Casdoor]
    S29 -->|"T23 · PP5-TC-015"| S30[Password Reset\\nEmail Sent]

    S24 --> S23
    S25 --> S23

    S27_ENTRY([BO Callback]) -->|"T20 · PP5-TC-009"| S27[Invalid Auth Code\\nBackend error]
    S9_ENTRY([Role Check]) -->|"T21 · PP5-TC-004 PP5-TC-005"| S28[Unauthorized Role\\nError message shown]

    style S26 fill:#f44336,color:#fff
    style S27 fill:#f44336,color:#fff
    style S28 fill:#f44336,color:#fff
    style S30 fill:#2196F3,color:#fff`;

const FLOW_REGISTRATION = `flowchart TD
    S31([Register Form\\nemail, password, full_name]) -->|"T24"| S32{Input\\nValidation}
    S32 -->|"T26 · TC-R02 TC-R03"| S34[Validation Failed\\nError message]
    S34 --> S31

    S32 -->|"T25"| S33{Email\\nDuplicate?}
    S33 -->|"T27 · (same response)"| S35
    S33 -->|"T28 · TC-R01"| S35[Account Created\\nstatus: pending_verification]

    S35 -->|"T29"| S36[Verification Email Sent\\nToken TTL 24h]

    S36 -->|"T30 · TC-R04"| S37[Verify Email Endpoint\\nToken valid]
    S36 -->|"T31 · TC-R06"| S38[Token Expired]
    S38 -->|"T34 · TC-R07"| S41[Resend Verification\\nRate limit: 1x per 5 min]
    S41 -->|"T29"| S36
    S38 -->|"T35 · TC-R08"| S38

    S37 -->|"T32 · TC-R04"| S39[Status: pending_approval]
    S39 -->|"T33"| S40([Super Admin Notified])

    style S35 fill:#2196F3,color:#fff
    style S39 fill:#FF9800,color:#fff
    style S34 fill:#f44336,color:#fff
    style S40 fill:#4CAF50,color:#fff`;

const FLOW_EMAIL_LOGIN_API = `flowchart TD
    S42([Login Request\\nemail, password]) -->|"T36"| S43{Email\\nLookup}
    S43 -->|"T37 · TC-L01"| S49[401 Invalid credentials\\nno email enumeration]

    S43 -->|"T38"| S44{Status Check}
    S44 -->|"T39 · TC-L03"| S45[403 Verify email first\\npending_verification]
    S44 -->|"T40 · TC-L04"| S46[403 Pending approval\\npending_approval]
    S44 -->|"T41 · TC-L05"| S47[403 Account rejected\\nrejected]
    S44 -->|"T42 · TC-L02"| S48{Password\\nCompare}

    S48 -->|"T43 · TC-L06"| S49
    S48 -->|"T44 · TC-L02"| S50[JWT Generated\\nAccess 15min + Refresh 7d]
    S50 -->|"T45"| S51[Refresh Token in Redis\\nrefresh admin key]

    S51 -->|"T46"| S52[Refresh Access Token]
    S52 -->|"T47"| S51

    S51 -->|"T48 · TC-L09"| S53[Refresh Token Revoked\\nLogout]

    style S50 fill:#4CAF50,color:#fff
    style S49 fill:#f44336,color:#fff
    style S45 fill:#FF9800,color:#fff
    style S46 fill:#FF9800,color:#fff
    style S47 fill:#f44336,color:#fff
    style S53 fill:#9E9E9E,color:#fff`;

const FLOW_SUPER_ADMIN_CREATE = `flowchart TD
    S54([Super Admin\\nAuthenticated]) --> S55[Create Admin Form\\nname, email, password, role, permissions]
    S55 -->|"T50"| S56{Email\\nDuplicate?}
    S56 -->|"T51 · TC-CA02"| S57[Validation Failed\\nEmail already exists]
    S57 --> S55

    S56 -->|"T52 · TC-CA01"| S58[Admin Account Created\\nrole: admin or moderator]
    S58 -->|"T53"| S59[Kafka Event\\nadmin.admin.created]
    S58 -->|"T54"| S60([Invite Email Sent\\nasync])

    NOAUTH([Non-super_admin]) -->|"T49 · TC-CA04"| FORBIDDEN[403 Forbidden]
    SUPADMIN_ROLE([Create super_admin via API]) -->|"T55 · TC-CA05"| BLOCKED[Rejected\\nsuper_admin via seed only]

    style S58 fill:#4CAF50,color:#fff
    style S60 fill:#2196F3,color:#fff
    style FORBIDDEN fill:#f44336,color:#fff
    style BLOCKED fill:#f44336,color:#fff`;

const FLOW_CHANGE_PASSWORD = `flowchart TD
    S61([Change Password Form\\ncurrentPassword, newPassword]) -->|"T56"| S62{Current Password\\nVerify}
    S62 -->|"T57 · TC-CP02"| S63[Verify Failed\\nWrong current password]
    S63 --> S61

    S62 -->|"T58"| S64{New Password\\nValidation}
    S64 -->|"T59 · TC-CP03"| S65[Rejected\\nSame as current password]
    S64 -->|"T60 · TC-CP04"| S66[Rejected\\nToo short — min 8 chars]
    S64 -->|"T61 · TC-CP01"| S67[New Password Hashed\\nbcrypt]
    S67 -->|"T62"| S68[Password Updated\\nin DB]
    S68 -->|"T63"| S69[All Sessions Revoked\\nRedis refresh tokens]
    S69 -->|"T64"| S70[Kafka Event\\nadmin.admin.passwordChanged]
    S70 --> S71([Force Re-login\\nAll Devices])

    style S67 fill:#2196F3,color:#fff
    style S68 fill:#4CAF50,color:#fff
    style S71 fill:#FF6B35,color:#fff
    style S63 fill:#f44336,color:#fff
    style S65 fill:#f44336,color:#fff
    style S66 fill:#f44336,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — BO Register & Login',
  subtitle: 'End-to-end system overview: Casdoor OAuth2, Direct Login API, Super Admin creation',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-account-status',
    num: '2',
    title: 'Sub-Flow 1 · Admin Account Status Lifecycle',
    subtitle: 'pending_verification → pending_approval → active / rejected',
    chart: FLOW_ACCOUNT_STATUS,
    states: [
      ['pending_verification', 'Registered; email not yet verified'],
      ['pending_approval',     'Email verified; awaiting Super Admin approval'],
      ['active',               'Fully approved; login allowed'],
      ['rejected',             'Super Admin rejected the registration'],
    ],
    transitions: [
      ['Verify email token (within 24h)', 'pending_verification → pending_approval'],
      ['Token expired',                   'pending_verification stays; resend required'],
      ['Super Admin approves',            'pending_approval → active'],
      ['Super Admin rejects',             'pending_approval → rejected'],
      ['Admin logs in / changes password','active → active (sessions updated)'],
    ],
  },
  {
    sectionId: 'flow-direct-login',
    num: '3',
    title: 'Sub-Flow 2 · Direct Login (Observed on STG)',
    subtitle: 'S1–S9 · T1–T7 · TC-001–002, TC-006, TC-017, TC-018',
    chart: FLOW_DIRECT_LOGIN,
    states: [
      ['S1', 'BO URL opened'],
      ['S2', 'Session check'],
      ['S3', 'Valid session — redirect to Dashboard'],
      ['S4', '/login — Admin Login form (email + password)'],
      ['S5', 'Credentials entered; button shows "Logging in..."'],
      ['S6', 'Backend authentication in progress'],
      ['S7', 'Auth failed — "Invalid email or password" toast'],
      ['S8', 'Session created'],
      ['S9', 'BO Dashboard'],
    ],
    transitions: [
      ['T1', 'No session → redirect to /login (PP5-TC-001, PP5-TC-017)'],
      ['T2', 'Valid session → Dashboard (PP5-TC-002)'],
      ['T3', 'Fill email + password; click Login (PP5-TC-001)'],
      ['T4', 'Auth fails → error toast (PP5-TC-006)'],
      ['T5', 'Error → retry (stay on /login)'],
      ['T6', 'Auth succeeds → session created (PP5-TC-001)'],
      ['T7', 'Navigate to Dashboard'],
    ],
  },
  {
    sectionId: 'flow-session-mgmt',
    num: '4',
    title: 'Sub-Flow 3 · Session Management',
    subtitle: 'S14–S22 · T11–T16 · TC-010–014',
    chart: FLOW_SESSION_MGMT,
    states: [
      ['S14', 'Session created'],
      ['S15', 'Remember Me check (not present on STG — TC-010/TC-011 obsolete)'],
      ['S16', 'Persistent session — survives browser close'],
      ['S17', 'Temporary session — ends on browser close'],
      ['S18', 'BO Dashboard (active)'],
      ['S19', 'Inactivity monitor — timeout reached'],
      ['S20', 'Session invalidated'],
      ['S21', 'Login page (re-auth after session event)'],
      ['S22', 'Logout'],
    ],
    transitions: [
      ['T11', 'Remember Me = Yes → persistent session (TC-010)'],
      ['T12', 'Remember Me = No → temporary session (TC-011)'],
      ['T13', 'Proceed to Dashboard'],
      ['T14', 'Inactivity timeout → invalidate session (TC-012)'],
      ['T15', 'Active use within timeout → session continues (TC-013)'],
      ['T16', 'Admin clicks logout → session cleared (TC-014)'],
    ],
  },
  {
    sectionId: 'flow-error-handling',
    num: '5',
    title: 'Sub-Flow 4 · Error Handling & Forgot Password',
    subtitle: 'S23–S30 · T17–T23 · TC-004–009, TC-015',
    chart: FLOW_ERROR_HANDLING,
    states: [
      ['S23', 'Casdoor Login Page / BO Login Form'],
      ['S24', 'Auth failed — wrong password'],
      ['S25', 'Auth failed — suspended account'],
      ['S26', 'Server unavailable — connection error shown'],
      ['S27', 'Invalid authorization code — backend error'],
      ['S28', 'Unauthorized role — error message shown'],
      ['S29', 'Forgot Password page'],
      ['S30', 'Password reset email sent'],
    ],
    transitions: [
      ['T17', 'Wrong credentials → error (TC-006)'],
      ['T18', 'Account suspended → error (TC-007)'],
      ['T19', 'Server unreachable → connection error (TC-008)'],
      ['T20', 'Invalid/tampered code → backend rejects (TC-009)'],
      ['T21', 'Non-Admin role → unauthorized error (TC-004, TC-005)'],
      ['T22', 'Click Forgot Password (TC-015)'],
      ['T23', 'Reset email dispatched (TC-015)'],
    ],
  },
  {
    sectionId: 'flow-registration',
    num: '6',
    title: 'Sub-Flow 5 · Admin Email Registration (PP-55)',
    subtitle: 'S31–S41 · T24–T35 · TC-R01–R08',
    chart: FLOW_REGISTRATION,
    states: [
      ['S31', 'Register form — email, password, full_name'],
      ['S32', 'Input validation'],
      ['S33', 'Email duplicate check'],
      ['S34', 'Validation failed — error message'],
      ['S35', 'Account created (status: pending_verification)'],
      ['S36', 'Verification email sent (TTL 24h)'],
      ['S37', 'Verify email endpoint hit — token valid'],
      ['S38', 'Token expired'],
      ['S39', 'Status: pending_approval'],
      ['S40', 'Super Admin notified'],
      ['S41', 'Resend verification (rate limit: 1x per 5 min)'],
    ],
    transitions: [
      ['T24', 'Submit register form'],
      ['T25', 'Validation passes → check email duplicate'],
      ['T26', 'Validation fails (TC-R02, TC-R03)'],
      ['T27', 'Email duplicate (same response — prevent enumeration)'],
      ['T28', 'Email unique → create account (TC-R01)'],
      ['T29', 'Verification email dispatched'],
      ['T30', 'Admin clicks verify link within 24h (TC-R04)'],
      ['T31', 'Token expired → prompt resend (TC-R06)'],
      ['T32', 'Email verified → status pending_approval (TC-R04)'],
      ['T33', 'Super Admin notified'],
      ['T34', 'Request resend within rate limit (TC-R07)'],
      ['T35', 'Resend rate limit exceeded (TC-R08)'],
    ],
  },
  {
    sectionId: 'flow-email-login-api',
    num: '7',
    title: 'Sub-Flow 6 · Email/Password Direct Login API (PP-60)',
    subtitle: 'S42–S53 · T36–T48 · TC-L01–L09',
    chart: FLOW_EMAIL_LOGIN_API,
    states: [
      ['S42', 'Login request (email, password)'],
      ['S43', 'Email lookup'],
      ['S44', 'Account status check'],
      ['S45', 'Status: pending_verification — 403'],
      ['S46', 'Status: pending_approval — 403'],
      ['S47', 'Status: rejected — 403'],
      ['S48', 'Password compare (bcrypt)'],
      ['S49', 'Login failed — 401 Invalid credentials (no email enumeration)'],
      ['S50', 'JWT generated (Access 15 min + Refresh 7d)'],
      ['S51', 'Refresh token stored in Redis'],
      ['S52', 'Access token refreshed'],
      ['S53', 'Refresh token revoked (logout)'],
    ],
    transitions: [
      ['T36', 'Submit login request'],
      ['T37', 'Email not found → generic 401 (TC-L01)'],
      ['T38', 'Email found → check status'],
      ['T39', 'Status pending_verification → 403 (TC-L03)'],
      ['T40', 'Status pending_approval → 403 (TC-L04)'],
      ['T41', 'Status rejected → 403 (TC-L05)'],
      ['T42', 'Status active → compare password (TC-L02)'],
      ['T43', 'Password mismatch → 401 (TC-L06)'],
      ['T44', 'Password match → generate JWT (TC-L02)'],
      ['T45', 'Store refresh token in Redis'],
      ['T46', 'Access token expires → use refresh token'],
      ['T47', 'Refresh token valid → new access token'],
      ['T48', 'Admin calls logout → revoke refresh token (TC-L09)'],
    ],
  },
  {
    sectionId: 'flow-super-admin-create',
    num: '8',
    title: 'Sub-Flow 7 · Super Admin Creates Admin Account (PP-101)',
    subtitle: 'S54–S60 · T49–T55 · TC-CA01–CA05',
    chart: FLOW_SUPER_ADMIN_CREATE,
    states: [
      ['S54', 'Super Admin authenticated'],
      ['S55', 'Create Admin form — name, email, password, role, permissions'],
      ['S56', 'Email duplicate check'],
      ['S57', 'Validation failed — email already exists'],
      ['S58', 'Admin account created (role: admin or moderator)'],
      ['S59', 'Kafka event: admin.admin.created'],
      ['S60', 'Invite email sent (async)'],
    ],
    transitions: [
      ['T49', 'Non-super_admin attempts creation → 403 (TC-CA04)'],
      ['T50', 'Submit create admin form'],
      ['T51', 'Validation fails — duplicate email (TC-CA02)'],
      ['T52', 'Validation passes → create account (TC-CA01)'],
      ['T53', 'Account created → publish Kafka event'],
      ['T54', 'Send invite email async'],
      ['T55', 'Attempt to set role super_admin via API → rejected (TC-CA05)'],
    ],
  },
  {
    sectionId: 'flow-change-password',
    num: '9',
    title: 'Sub-Flow 8 · Change Password (PP-102)',
    subtitle: 'S61–S71 · T56–T64 · TC-CP01–CP04',
    chart: FLOW_CHANGE_PASSWORD,
    states: [
      ['S61', 'Change Password form (currentPassword, newPassword)'],
      ['S62', 'Current password verify (bcrypt)'],
      ['S63', 'Verify failed — wrong current password'],
      ['S64', 'New password validation'],
      ['S65', 'Rejected — new password same as current'],
      ['S66', 'Rejected — new password too short (min 8 chars)'],
      ['S67', 'New password hashed (bcrypt)'],
      ['S68', 'Password updated in DB'],
      ['S69', 'All sessions revoked (Redis refresh tokens cleared)'],
      ['S70', 'Kafka event: admin.admin.passwordChanged'],
      ['S71', 'Force re-login — all devices'],
    ],
    transitions: [
      ['T56', 'Submit change password'],
      ['T57', 'Current password fails bcrypt compare (TC-CP02)'],
      ['T58', 'Current password matches'],
      ['T59', 'New password same as current → reject (TC-CP03)'],
      ['T60', 'New password too short → reject (TC-CP04)'],
      ['T61', 'Validation passes → hash new password (TC-CP01)'],
      ['T62', 'Update password in DB'],
      ['T63', 'Revoke all sessions'],
      ['T64', 'Publish Kafka event'],
    ],
  },
];
