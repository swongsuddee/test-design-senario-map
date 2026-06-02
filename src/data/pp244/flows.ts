import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    ORG([Organizer logged in\\nAccount Settings]) --> BTN[Tap Delete Account button]
    BTN --> DIALOG[Confirmation Dialog shown]

    DIALOG --> CHOICE{User action\\non dialog?}
    CHOICE -->|Confirm / Yes| DEL[Delete Account API called]
    CHOICE -->|Cancel / No| CANCEL([Stay on Account Settings\\nNo action taken])

    DEL --> DELRES{API response?}
    DELRES -->|Success| LOGOUT[Force Logout executed]
    DELRES -->|Failure| DELERR[Error message shown\\nAccount NOT deleted]

    LOGOUT --> LAND([Redirected to Landing Page\\nSession cleared])

    style LAND fill:#4CAF50,color:#fff
    style CANCEL fill:#FF9800,color:#fff
    style DELERR fill:#f44336,color:#fff
    style LOGOUT fill:#2196F3,color:#fff`;

const FLOW_DIALOG = `flowchart TD
    S1([Account Settings\\nPage]) -->|"T1 · PP244-TC-001"| S2[Delete Account\\nButton Visible]
    S2 -->|"T2 · PP244-TC-001 PP244-TC-002"| S3[Confirmation Dialog\\nDisplayed]
    S3 -->|"T3 · PP244-TC-003"| S4([Cancel — Dialog Dismissed\\nNo change])
    S3 -->|"T4 · PP244-TC-004 PP244-TC-005"| S5[User Confirms\\nDeletion]

    style S4 fill:#FF9800,color:#fff
    style S5 fill:#2196F3,color:#fff`;

const FLOW_DELETION = `flowchart TD
    S6([Delete Account\\nAPI Called]) -->|"T6 · PP244-TC-004"| S7[API Success]
    S6 -->|"T7 · PP244-TC-007"| S8[API Error]
    S7 -->|"T8 · PP244-TC-004 PP244-TC-005"| S9[Force Logout\\nSession Cleared]
    S9 -->|"T9 · PP244-TC-004 PP244-TC-005"| S10([Landing Page\\nDisplayed])
    S8 -->|"T7 · PP244-TC-007"| S11([Error Message\\nShown])
    S10 --> S12{Attempt re-login\\nwith deleted account?}
    S12 -->|"T10 · PP244-TC-006"| S13([Login Rejected\\nAccount Not Found])

    style S10 fill:#4CAF50,color:#fff
    style S11 fill:#f44336,color:#fff
    style S13 fill:#f44336,color:#fff
    style S9 fill:#2196F3,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Delete Organizer Account',
  subtitle: 'End-to-end account deletion system overview',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-dialog',
    num: '2',
    title: 'Sub-Flow 1 · Delete Account Confirmation Dialog',
    subtitle: 'S1–S5 · T1–T4 · TC-001–TC-003',
    chart: FLOW_DIALOG,
    states: [
      ['S1', 'Organizer is on Account Settings page'],
      ['S2', 'Delete Account button visible'],
      ['S3', 'Confirmation Dialog displayed'],
      ['S4', 'User cancels — dialog dismissed, no change'],
      ['S5', 'User confirms — deletion initiated'],
    ],
    transitions: [
      ['T1', 'Tap Delete Account button'],
      ['T2', 'Confirmation dialog appears'],
      ['T3', 'User taps Cancel / No'],
      ['T4', 'User taps Confirm / Yes'],
    ],
  },
  {
    sectionId: 'flow-deletion',
    num: '3',
    title: 'Sub-Flow 2 · Account Deletion and Force Logout',
    subtitle: 'S6–S13 · T5–T11 · TC-004–TC-007',
    chart: FLOW_DELETION,
    states: [
      ['S6',  'Delete Account API request sent'],
      ['S7',  'API responds with success'],
      ['S8',  'API responds with error'],
      ['S9',  'Force logout executed — session cleared'],
      ['S10', 'Redirected to Landing Page'],
      ['S11', 'Error message displayed — account not deleted'],
      ['S12', 'Re-login attempt after deletion'],
      ['S13', 'Re-login rejected — account does not exist'],
    ],
    transitions: [
      ['T5',  'Deletion API called (after confirmation)'],
      ['T6',  'API returns 200 / success'],
      ['T7',  'API returns error (4xx / 5xx)'],
      ['T8',  'Force logout clears local session'],
      ['T9',  'Redirect to landing page'],
      ['T10', 'Attempt login with deleted account credentials'],
      ['T11', 'Login fails — account not found'],
    ],
  },
];
