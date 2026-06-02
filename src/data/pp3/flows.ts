import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    HOME([Home Page]) --> PROFILE[Profile Page\\nAvatar / Name / Bio / Stats]
    PROFILE --> TAB_UP[Upcoming Tab]
    PROFILE --> TAB_HIS[History Tab]
    PROFILE --> TAB_SAV[Saved Tab]
    TAB_SAV --> SAVED_CHK{Events saved?}
    SAVED_CHK -->|Yes| SAVED_LIST[Event list\\nNewest First]
    SAVED_CHK -->|No| SAVED_EMPTY[Empty state\\nCTA to Search]
    SAVED_EMPTY -->|Tap CTA| SEARCH([Event Search Page])
    PROFILE --> EDIT_BTN[Tap Edit Profile]
    EDIT_BTN --> EDIT[Edit Profile Screen\\nName / Bio / Phone]
    EDIT --> VALIDATE{Fields valid?}
    VALIDATE -->|No| EDIT_ERR[Inline validation error]
    EDIT_ERR --> EDIT
    VALIDATE -->|Yes| PATCH[PATCH /v1/user/profile]
    PATCH --> NET_CHK{Network OK?}
    NET_CHK -->|No| TOAST[Error Toast\\nStay on Edit screen]
    TOAST --> EDIT
    NET_CHK -->|Yes| PROFILE_UPD[Profile updated\\nno pull-to-refresh needed]
    PROFILE_UPD --> PROFILE
    PROFILE --> INT_BTN[Tap Interests]
    INT_BTN --> INTERESTS[Interests Screen\\n1-3 categories]
    INTERESTS --> INT_SAVE[Save Interests]
    INT_SAVE --> INT_DB[(Update User_Interests DB)]
    INT_DB --> RECALC[Discovery feed re-calculated]
    RECALC --> PROFILE
    PROFILE --> SETTINGS[Settings Screen]
    SETTINGS --> LOGOUT[Logout]
    LOGOUT --> CLEAR_TOK[Clear local session/token]
    CLEAR_TOK --> LOGIN([Login Page])
    SETTINGS --> DEL_HIDDEN[Delete Account\\nhidden / de-emphasised]
    DEL_HIDDEN --> DEL_DLG[Confirmation Dialog\\nEnter reason max 500 chars]
    DEL_DLG --> DEL_ACT{User action?}
    DEL_ACT -->|Cancel| SETTINGS
    DEL_ACT -->|Confirm| DELETE[DELETE /v1/user/account]
    DELETE --> DEL_DB[(Status set to Deleted\\nSessions cleared)]
    DEL_DB --> LOGIN
    TOKEN_EXP{401 Unauthorized\\non any screen}
    TOKEN_EXP --> LOGIN
    style HOME fill:#4CAF50,color:#fff
    style LOGIN fill:#FF6B35,color:#fff
    style DEL_DB fill:#f44336,color:#fff
    style INT_DB fill:#2196F3,color:#fff
    style PATCH fill:#2196F3,color:#fff`;

const FLOW_PROFILE = `flowchart TD
    S1([Home Page]) -->|"T1"| S3[Loading profile data]
    S3 -->|"T2 · PP3-TC-001"| S4[Profile displayed\\nAvatar / Name / Bio / Stats]
    S3 -->|"T3 · PP3-TC-034"| S3E[Error state shown]
    S4 -->|"T4 · PP3-TC-002"| S5[Upcoming Tab\\nNewest First]
    S4 -->|"T5 · PP3-TC-003"| S6[History Tab\\nNewest First]
    S4 -->|"T6 · PP3-TC-004 PP3-TC-005"| S7[Saved Tab]
    S7 -->|"T7 · PP3-TC-004"| S8[Event list shown]
    S7 -->|"T8 · PP3-TC-005"| S9[Empty state + CTA button]
    S9 -->|"T9 · PP3-TC-005"| S10([Event Search Page])
    style S10 fill:#4CAF50,color:#fff
    style S3E fill:#f44336,color:#fff`;

const FLOW_EDIT = `flowchart TD
    S11[Profile Page] -->|"T10 · PP3-TC-006"| S12[Edit Profile Screen]
    S12 --> S13{Display Name\\nvalid?}
    S13 -->|"T11 · PP3-TC-007"| S14[Error: name required]
    S13 -->|"T12 · PP3-TC-009"| S15[Error: max 50 chars]
    S13 -->|"T13 · PP3-TC-010"| S16[Error: no digits allowed]
    S13 -->|"T14 · PP3-TC-012"| S17[Error: disallowed char]
    S14 --> S12
    S15 --> S12
    S16 --> S12
    S17 --> S12
    S13 -->|"T15 · PP3-TC-006 PP3-TC-008 PP3-TC-011 PP3-TC-013"| S18{Bio valid?}
    S18 -->|"T16 · PP3-TC-015"| S19[Error: max 250 chars]
    S19 --> S12
    S18 -->|"T17 · PP3-TC-014 PP3-TC-016"| S20{Phone valid?}
    S20 -->|"T18 · PP3-TC-018"| S21[Error: invalid phone]
    S21 --> S12
    S20 -->|"T19 · PP3-TC-017 PP3-TC-019"| S22[All fields valid]
    S22 -->|"T20"| S23[PATCH /v1/user/profile]
    S23 -->|"T21 · PP3-TC-020"| S24[Error Toast\\nstay on Edit screen]
    S24 --> S12
    S23 -->|"T22 · PP3-TC-019"| S25[Profile page updated\\nno pull-to-refresh]
    S25 --> S11
    style S25 fill:#4CAF50,color:#fff`;

const FLOW_INTERESTS = `flowchart TD
    S26[Profile Page] -->|"T23 · PP3-TC-021"| S27[Interests Screen\\ncurrent selection shown]
    S27 --> S27B{Selection count}
    S27B -->|"T24 · PP3-TC-023 zero selected"| S29[Save disabled\\nmin 1 required]
    S29 --> S27
    S27B -->|"T25 · PP3-TC-024 tap 4th interest"| S27C[4th blocked\\nmax 3 enforced]
    S27C --> S27
    S27B -->|"T26 · PP3-TC-021 PP3-TC-022"| S28[Valid 1-3 selected]
    S28 -->|"T27 · PP3-TC-021"| S30[Save Interests]
    S30 -->|"T28 · PP3-TC-021 PP3-TC-022"| S31[(User_Interests updated)]
    S31 --> S32[Discovery feed re-calculated]
    S32 --> S26
    style S26 fill:#4CAF50,color:#fff`;

const FLOW_DELETE = `flowchart TD
    S33[Settings Screen] -->|"T29 · PP3-TC-025 PP3-TC-026"| S34[Delete Account\\nhidden button found]
    S34 --> S35[Confirmation Dialog\\nEnter reason]
    S35 --> S35B{User action?}
    S35B -->|"T32 · PP3-TC-030"| S33
    S35B -->|"T30 · PP3-TC-029"| S37[Error: max 500 chars exceeded]
    S37 --> S35
    S35B -->|"T31 · PP3-TC-027 PP3-TC-028"| S36[Reason text valid]
    S36 -->|"T33 · PP3-TC-031"| S38[DELETE /v1/user/account]
    S38 -->|"T34 · PP3-TC-031"| S39[(Account Deleted\\nSessions cleared)]
    S39 --> S40([Login Page])
    style S40 fill:#FF6B35,color:#fff
    style S39 fill:#f44336,color:#fff`;

const FLOW_SESSION = `flowchart TD
    ANY([Any Profile Screen]) -->|"401 Unauthorized · PP3-TC-033"| HANDLE[Handle 401 gracefully]
    HANDLE --> LOGIN([Login Page])
    SETTINGS[Settings Screen] -->|"Tap Logout · PP3-TC-035"| CLEAR[Clear local session and token]
    CLEAR --> LOGIN
    style LOGIN fill:#FF6B35,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — User Profile & Account Settings',
  subtitle: 'End-to-end system overview',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-profile',
    num: '2',
    title: 'Sub-Flow 1 · View Profile & Activity Tabs',
    subtitle: 'S1–S10 · T1–T9 · TC-001–005, 034',
    chart: FLOW_PROFILE,
    states: [
      ['S1', 'Home Page'],
      ['S2', 'Profile Page'],
      ['S3', 'API loading'],
      ['S4', 'Profile data displayed'],
      ['S5', 'Upcoming Tab'],
      ['S6', 'History Tab'],
      ['S7', 'Saved Tab'],
      ['S8', 'Saved tab — events exist'],
      ['S9', 'Saved tab — empty state with CTA'],
      ['S10', 'Event Search Page'],
    ],
    transitions: [
      ['T1', 'Navigate to Profile'],
      ['T2', 'API returns data'],
      ['T3', 'API error / network fail'],
      ['T4', 'Tap Upcoming tab'],
      ['T5', 'Tap History tab'],
      ['T6', 'Tap Saved tab'],
      ['T7', 'Saved has events'],
      ['T8', 'Saved is empty'],
      ['T9', 'Tap CTA in empty Saved'],
    ],
  },
  {
    sectionId: 'flow-edit',
    num: '3',
    title: 'Sub-Flow 2 · Edit Profile',
    subtitle: 'S11–S25 · T10–T22 · TC-006–020',
    chart: FLOW_EDIT,
    states: [
      ['S11', 'Profile Page'],
      ['S12', 'Edit Profile Screen'],
      ['S13', 'Display Name validation'],
      ['S14', 'Name error — empty'],
      ['S15', 'Name error — exceeds 50'],
      ['S16', 'Name error — digits'],
      ['S17', 'Name error — disallowed char'],
      ['S18', 'Bio validation'],
      ['S19', 'Bio error — exceeds 250'],
      ['S20', 'Phone validation'],
      ['S21', 'Phone error — invalid'],
      ['S22', 'All fields valid'],
      ['S23', 'PATCH endpoint'],
      ['S24', 'Network error Toast'],
      ['S25', 'Profile updated'],
    ],
    transitions: [
      ['T10', 'Tap Edit Profile'],
      ['T11', 'Name empty error'],
      ['T12', 'Name over 50'],
      ['T13', 'Name digit'],
      ['T14', 'Name disallowed char'],
      ['T15', 'Name valid'],
      ['T16', 'Bio over 250'],
      ['T17', 'Bio valid'],
      ['T18', 'Phone invalid'],
      ['T19', 'Phone valid'],
      ['T20', 'Tap Save — all valid'],
      ['T21', 'Network failure PATCH'],
      ['T22', 'PATCH success'],
    ],
  },
  {
    sectionId: 'flow-interests',
    num: '4',
    title: 'Sub-Flow 3 · Update Interests',
    subtitle: 'S26–S32 · T23–T28 · TC-021–024',
    chart: FLOW_INTERESTS,
    states: [
      ['S26', 'Profile Page'],
      ['S27', 'Interests Screen'],
      ['S28', 'Selection valid 1–3'],
      ['S29', 'Selection invalid — 0'],
      ['S30', 'Save Interests'],
      ['S31', 'User_Interests DB updated'],
      ['S32', 'Discovery feed re-calculated'],
    ],
    transitions: [
      ['T23', 'Tap Interests'],
      ['T24', 'Deselect all — below minimum'],
      ['T25', 'Select 4th — blocked'],
      ['T26', 'Valid 1–3 selected'],
      ['T27', 'Tap Save'],
      ['T28', 'DB update + feed re-calc'],
    ],
  },
  {
    sectionId: 'flow-delete',
    num: '5',
    title: 'Sub-Flow 4 · Delete Account',
    subtitle: 'S33–S40 · T29–T34 · TC-025–032',
    chart: FLOW_DELETE,
    states: [
      ['S33', 'Settings Screen'],
      ['S34', 'Delete Account button — hidden'],
      ['S35', 'Confirmation Dialog'],
      ['S36', 'Reason text valid'],
      ['S37', 'Reason text error — over 500'],
      ['S38', 'DELETE endpoint'],
      ['S39', 'Account deleted — sessions cleared'],
      ['S40', 'Login Page'],
    ],
    transitions: [
      ['T29', 'Tap Delete Account'],
      ['T30', 'Reason over 500'],
      ['T31', 'Reason within limit'],
      ['T32', 'Cancel'],
      ['T33', 'Confirm DELETE'],
      ['T34', 'DELETE success — clear sessions'],
    ],
  },
  {
    sectionId: 'flow-session',
    num: '6',
    title: 'Sub-Flow 5 · Session Expiry & Logout',
    subtitle: 'TC-033, 035',
    chart: FLOW_SESSION,
  },
];
