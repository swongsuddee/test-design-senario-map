import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    LAUNCH([App Launch]) --> FETCH[Fetch Firebase Remote Config\\nversionApp · isForceUpdate · storeUrl]
    FETCH --> FETCH_OK{Config fetched\\nsuccessfully?}
    FETCH_OK -->|No| FALLBACK[Use cached / default values]
    FETCH_OK -->|Yes| COMPARE
    FALLBACK --> COMPARE

    COMPARE{Current version\\nvs. versionApp} -->|Current ≥ versionApp| HOME([Navigate to Home])
    COMPARE -->|Current < versionApp| DIALOG{isForceUpdate?}

    DIALOG -->|true| FORCE[Force Update Dialog\\nOnly อัพเดท button]
    DIALOG -->|false| SOFT[Soft Update Dialog\\nข้าม + อัพเดท buttons]

    FORCE -->|Tap อัพเดท| STORE([Open App Store / Play Store\\nvia storeUrl])
    SOFT -->|Tap อัพเดท| STORE
    SOFT -->|Tap ข้าม| HOME

    style HOME fill:#4CAF50,color:#fff
    style STORE fill:#2196F3,color:#fff
    style FORCE fill:#f44336,color:#fff
    style SOFT fill:#FF9800,color:#fff`;

const FLOW_FETCH = `flowchart TD
    S1([App Initialises]) -->|"T1 · PP12-TC-001"| S2[Connecting to\\nFirebase Remote Config]
    S2 -->|"T2 · PP12-TC-001"| S3[Config fetched\\nsuccessfully]
    S2 -->|"T3 · PP12-TC-002"| S4[Fetch failed\\nUsing cached / default values]
    S3 -->|"T4 · PP12-TC-001"| S5([Keys available:\\nversionApp · isForceUpdate · storeUrl])
    S4 -->|"T4 · PP12-TC-002"| S5

    style S3 fill:#4CAF50,color:#fff
    style S4 fill:#FF9800,color:#fff
    style S5 fill:#2196F3,color:#fff`;

const FLOW_VERSION = `flowchart TD
    S6[Compare Current Version\\nvs. versionApp from Firebase] -->|"T5 · PP12-TC-003"| S7([Navigate to Home\\nNo update needed])
    S6 -->|"T6 · PP12-TC-004 PP12-TC-005 PP12-TC-006"| S8[Version outdated\\nProceed to show dialog]

    style S7 fill:#4CAF50,color:#fff
    style S8 fill:#FF9800,color:#fff`;

const FLOW_DIALOG = `flowchart TD
    S9{isForceUpdate?} -->|"T7 · PP12-TC-005"| S10[Force Update Dialog\\nOnly อัพเดท button visible\\nCannot be dismissed]
    S9 -->|"T8 · PP12-TC-004"| S11[Soft Update Dialog\\nข้าม + อัพเดท buttons]
    S11 -->|"T9 · PP12-TC-006"| S12([User skips → Navigate to Home])

    style S10 fill:#f44336,color:#fff
    style S11 fill:#FF9800,color:#fff
    style S12 fill:#4CAF50,color:#fff`;

const FLOW_STORE = `flowchart TD
    S13[User taps อัพเดท] -->|"T10 · PP12-TC-007 PP12-TC-008"| S14[Read storeUrl from Remote Config]
    S14 -->|"T11 · PP12-TC-007"| S15([App Store opened\\niOS])
    S14 -->|"T12 · PP12-TC-008"| S16([Play Store opened\\nAndroid])

    style S15 fill:#4CAF50,color:#fff
    style S16 fill:#4CAF50,color:#fff
    style S14 fill:#2196F3,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Remote Config',
  subtitle: 'End-to-end system overview',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-fetch',
    num: '2',
    title: 'Sub-Flow 1 · Firebase Remote Config Fetch',
    subtitle: 'S1–S5 · T1–T4 · TC-001–002',
    chart: FLOW_FETCH,
    states: [
      ['S1', 'App initialises'],
      ['S2', 'Connecting to Firebase Remote Config'],
      ['S3', 'Config fetched successfully'],
      ['S4', 'Fetch failed — using cached/default values'],
      ['S5', 'Key values available (versionApp, isForceUpdate, storeUrl)'],
    ],
    transitions: [
      ['T1', 'App startup triggers config fetch'],
      ['T2', 'Firebase connection established — fetch succeeds'],
      ['T3', 'Firebase connection fails / timeout'],
      ['T4', 'Keys extracted from fetched config'],
    ],
  },
  {
    sectionId: 'flow-version',
    num: '3',
    title: 'Sub-Flow 2 · Version Checking Logic',
    subtitle: 'S6–S8 · T5–T6 · TC-003–006',
    chart: FLOW_VERSION,
    states: [
      ['S6', 'Version check — compare current vs. versionApp'],
      ['S7', 'Version is up-to-date (current ≥ versionApp)'],
      ['S8', 'Version is outdated (current < versionApp)'],
    ],
    transitions: [
      ['T5', 'current version ≥ versionApp → skip update'],
      ['T6', 'current version < versionApp → show dialog'],
    ],
  },
  {
    sectionId: 'flow-dialog',
    num: '4',
    title: 'Sub-Flow 3 · Update Dialog Display',
    subtitle: 'S9–S12 · T7–T9 · TC-004–006',
    chart: FLOW_DIALOG,
    states: [
      ['S9',  'Evaluate isForceUpdate flag'],
      ['S10', 'Force Update Dialog displayed (only "อัพเดท" button)'],
      ['S11', 'Soft Update Dialog displayed ("ข้าม" + "อัพเดท" buttons)'],
      ['S12', 'User dismisses soft update'],
    ],
    transitions: [
      ['T7', 'isForceUpdate = true → Force Update dialog'],
      ['T8', 'isForceUpdate = false → Soft Update dialog'],
      ['T9', 'User taps "ข้าม" on Soft Update dialog'],
    ],
  },
  {
    sectionId: 'flow-store',
    num: '5',
    title: 'Sub-Flow 4 · Store Redirection',
    subtitle: 'S13–S16 · T10–T12 · TC-007–008',
    chart: FLOW_STORE,
    states: [
      ['S13', 'User taps "อัพเดท" button (Force or Soft dialog)'],
      ['S14', 'App opens store URL from Firebase'],
      ['S15', 'App Store opened (iOS)'],
      ['S16', 'Play Store opened (Android)'],
    ],
    transitions: [
      ['T10', 'Tap "อัพเดท" → read storeUrl'],
      ['T11', 'Platform = iOS → App Store'],
      ['T12', 'Platform = Android → Play Store'],
    ],
  },
];
