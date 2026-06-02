import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    LOGIN([User Logs In]) --> STORE[Store Access Token\\n+ Refresh Token securely\\nin Secure Storage]
    STORE --> AUTHED[Authenticated State]

    AUTHED --> API_CALL[Make API Call\\nwith Access Token]
    API_CALL --> TOKEN_OK{Access Token\\nvalid?}
    TOKEN_OK -->|Yes| API_SUCCESS([API Response\\nSuccess])
    TOKEN_OK -->|No — 401| REFRESH[Auto-Refresh:\\nCall /refresh-token\\nwith Refresh Token]

    REFRESH --> REFRESH_OK{Refresh Token\\nvalid?}
    REFRESH_OK -->|Yes| NEW_TOKEN[Store new Access Token\\n+ Refresh Token]
    NEW_TOKEN --> API_CALL
    REFRESH_OK -->|No — expired/invalid| FORCE_LOGOUT[Force Logout\\nClear all tokens]
    FORCE_LOGOUT --> LOGIN_PAGE([Redirect to Login Screen])

    AUTHED --> NAV_GUARD[Navigate to Protected Screen]
    NAV_GUARD --> AUTH_CHECK{Auth state\\nauthenticated?}
    AUTH_CHECK -->|Yes| PROTECTED([Show Protected Screen])
    AUTH_CHECK -->|No| LOGIN_PAGE

    style API_SUCCESS fill:#4CAF50,color:#fff
    style PROTECTED fill:#4CAF50,color:#fff
    style LOGIN_PAGE fill:#f44336,color:#fff
    style FORCE_LOGOUT fill:#f44336,color:#fff
    style NEW_TOKEN fill:#2196F3,color:#fff
    style REFRESH fill:#FF9800,color:#fff`;

const FLOW_STORAGE = `flowchart TD
    S1([Login Success]) -->|"T1 · PP20-TC-001"| S2[Access Token\\nstored in Secure Storage]
    S1 -->|"T1 · PP20-TC-001"| S3[Refresh Token\\nstored in Secure Storage]
    S2 -->|"T2 · PP20-TC-001"| S4([Tokens readable\\nfor API calls])
    S3 -->|"T2 · PP20-TC-001"| S4

    style S4 fill:#4CAF50,color:#fff
    style S2 fill:#2196F3,color:#fff
    style S3 fill:#2196F3,color:#fff`;

const FLOW_REFRESH = `flowchart TD
    S5[API Call with\\nAccess Token] -->|"T3 · PP20-TC-002"| S6([API Success\\nToken valid])
    S5 -->|"T4 · PP20-TC-003"| S7[401 Received\\nAccess Token expired]
    S7 -->|"T5 · PP20-TC-003"| S8[Call /refresh-token\\nwith Refresh Token]
    S8 -->|"T5 · PP20-TC-003"| S9[New Access Token\\nstored silently]
    S9 -->|"T6 · PP20-TC-003"| S10[Retry original\\nAPI call]
    S10 -->|"T7 · PP20-TC-003"| S11([API call succeeds\\nUser not logged out])

    style S6 fill:#4CAF50,color:#fff
    style S11 fill:#4CAF50,color:#fff
    style S7 fill:#FF9800,color:#fff
    style S9 fill:#2196F3,color:#fff`;

const FLOW_FORCE_LOGOUT = `flowchart TD
    S12[Refresh Token\\nexpired / invalid] -->|"T8 · PP20-TC-004"| S13[Refresh call\\nreturns 401 / 403]
    S13 -->|"T9 · PP20-TC-004"| S14[All tokens cleared\\nfrom Secure Storage]
    S14 -->|"T10 · PP20-TC-004"| S15([Redirect to\\nLogin Screen])

    style S15 fill:#f44336,color:#fff
    style S13 fill:#f44336,color:#fff
    style S14 fill:#FF9800,color:#fff`;

const FLOW_NAV_GUARD = `flowchart TD
    S18[User attempts navigation\\nto protected screen] --> S19{Navigation Guard:\\nAuth state?}
    S19 -->|"T11 · PP20-TC-005"| S16[Auth = authenticated]
    S19 -->|"T12 · PP20-TC-006"| S17[Auth = unauthenticated]
    S16 -->|"T13 · PP20-TC-005"| S20([Protected Screen\\ndisplayed])
    S17 -->|"T14 · PP20-TC-006"| S21([Redirect to\\nLogin Screen])

    style S20 fill:#4CAF50,color:#fff
    style S21 fill:#f44336,color:#fff
    style S16 fill:#2196F3,color:#fff
    style S17 fill:#FF9800,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Auth Token State',
  subtitle: 'End-to-end auth token lifecycle overview',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-storage',
    num: '2',
    title: 'Sub-Flow 1 · Token Storage & Secure Storage',
    subtitle: 'S1–S4 · T1–T2 · TC-001',
    chart: FLOW_STORAGE,
    states: [
      ['S1', 'User successfully authenticated'],
      ['S2', 'Access Token stored in Secure Storage'],
      ['S3', 'Refresh Token stored in Secure Storage'],
      ['S4', 'Tokens readable from Secure Storage'],
    ],
    transitions: [
      ['T1', 'Login success → store tokens'],
      ['T2', 'Read tokens from Secure Storage for API calls'],
    ],
  },
  {
    sectionId: 'flow-refresh',
    num: '3',
    title: 'Sub-Flow 2 · Auto Token Refresh',
    subtitle: 'S5–S11 · T3–T7 · TC-002–003',
    chart: FLOW_REFRESH,
    states: [
      ['S5',  'API call made with Access Token'],
      ['S6',  'Access Token valid — API succeeds'],
      ['S7',  'Access Token expired — 401 received'],
      ['S8',  'Refresh token call in-flight'],
      ['S9',  'New Access Token received — stored'],
      ['S10', 'Original API call retried automatically'],
      ['S11', 'API call succeeds after refresh'],
    ],
    transitions: [
      ['T3', 'Access Token valid → API success'],
      ['T4', '401 response → trigger refresh'],
      ['T5', 'Refresh call succeeds — new token issued'],
      ['T6', 'Retry original API call with new token'],
      ['T7', 'Retried call succeeds'],
    ],
  },
  {
    sectionId: 'flow-force-logout',
    num: '4',
    title: 'Sub-Flow 3 · Force Logout on Refresh Token Expiry',
    subtitle: 'S12–S15 · T8–T10 · TC-004',
    chart: FLOW_FORCE_LOGOUT,
    states: [
      ['S12', 'Refresh Token expired or invalid'],
      ['S13', 'Refresh call returns 401/403'],
      ['S14', 'All tokens cleared from Secure Storage'],
      ['S15', 'User forced to Login screen'],
    ],
    transitions: [
      ['T8',  'Refresh Token expired → refresh call fails'],
      ['T9',  'Clear all tokens (logout)'],
      ['T10', 'Redirect to Login screen'],
    ],
  },
  {
    sectionId: 'flow-nav-guard',
    num: '5',
    title: 'Sub-Flow 4 · Auth State Management & Navigation Guard',
    subtitle: 'S16–S21 · T11–T14 · TC-005–006',
    chart: FLOW_NAV_GUARD,
    states: [
      ['S16', 'App state = authenticated'],
      ['S17', 'App state = unauthenticated'],
      ['S18', 'User navigates to protected screen'],
      ['S19', 'Navigation guard evaluates auth state'],
      ['S20', 'Protected screen displayed'],
      ['S21', 'Redirected to Login screen'],
    ],
    transitions: [
      ['T11', 'Auth state = authenticated → allow navigation'],
      ['T12', 'Auth state = unauthenticated → block navigation'],
      ['T13', 'Guard allows → show protected screen'],
      ['T14', 'Guard blocks → redirect to login'],
    ],
  },
];
