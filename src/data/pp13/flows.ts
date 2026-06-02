import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    START([Flutter Project]) --> INSTALL[Install Firebase SDK\\ngoogle-services.json / GoogleService-Info.plist]
    INSTALL --> CONFIG[Configure Firebase per Flavor\\nDev / Staging / UAT / Prod]
    CONFIG --> BUILD{Build on platform?}
    BUILD -->|iOS| IOS_BUILD[Build iOS]
    BUILD -->|Android| AND_BUILD[Build Android]
    IOS_BUILD --> IOS_CONNECT{Firebase connection\\non iOS?}
    AND_BUILD --> AND_CONNECT{Firebase connection\\non Android?}
    IOS_CONNECT -->|Success| IOS_OK([Firebase connected\\niOS — All Flavors])
    IOS_CONNECT -->|Failure| IOS_ERR([Build / Runtime Error\\niOS])
    AND_CONNECT -->|Success| AND_OK([Firebase connected\\nAndroid — All Flavors])
    AND_CONNECT -->|Failure| AND_ERR([Build / Runtime Error\\nAndroid])

    style IOS_OK fill:#4CAF50,color:#fff
    style AND_OK fill:#4CAF50,color:#fff
    style IOS_ERR fill:#f44336,color:#fff
    style AND_ERR fill:#f44336,color:#fff`;

const FLOW_SDK = `flowchart TD
    S1([Flutter Project\\nno Firebase]) -->|"T1 · PP13-TC-001"| S2[Firebase SDK packages\\nadded to pubspec.yaml]
    S2 -->|"T2 · PP13-TC-001"| S3[google-services.json\\n& GoogleService-Info.plist\\nin correct directories]
    S3 -->|"T3 · PP13-TC-001"| S4[Firebase.initializeApp\\ncalled at app startup]
    S4 -->|"T4 · PP13-TC-001 PP13-TC-002"| S5([Build succeeds\\nno SDK errors])

    style S5 fill:#4CAF50,color:#fff
    style S2 fill:#2196F3,color:#fff`;

const FLOW_MULTIFLAVOR = `flowchart TD
    FLAVOR{Select Flavor} -->|"T5 · PP13-TC-003"| S6[Dev Flavor]
    FLAVOR -->|"T6 · PP13-TC-004"| S7[Staging Flavor]
    FLAVOR -->|"T7 · PP13-TC-005"| S8[UAT Flavor]
    FLAVOR -->|"T8 · PP13-TC-006"| S9[Prod Flavor]

    S6 --> PLAT{Platform}
    S7 --> PLAT
    S8 --> PLAT
    S9 --> PLAT

    PLAT -->|"T9 · PP13-TC-003 PP13-TC-004 PP13-TC-005 PP13-TC-006"| S10[Firebase connected\\niOS]
    PLAT -->|"T10 · PP13-TC-003 PP13-TC-004 PP13-TC-005 PP13-TC-006"| S11[Firebase connected\\nAndroid]

    PLAT -->|"T11 · PP13-TC-007"| S12([Error — misconfiguration\\nor missing config file])

    style S10 fill:#4CAF50,color:#fff
    style S11 fill:#4CAF50,color:#fff
    style S12 fill:#f44336,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Firebase Integration',
  subtitle: 'End-to-end system overview',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-sdk',
    num: '2',
    title: 'Sub-Flow 1 · Firebase SDK Installation & Config',
    subtitle: 'S1–S5 · T1–T4 · TC-001–002',
    chart: FLOW_SDK,
    states: [
      ['S1', 'Flutter project without Firebase'],
      ['S2', 'Firebase SDK packages added to pubspec.yaml'],
      ['S3', 'google-services.json & GoogleService-Info.plist in correct directories'],
      ['S4', 'Firebase.initializeApp called at app startup'],
      ['S5', 'Build succeeds — no SDK errors'],
    ],
    transitions: [
      ['T1', 'Add firebase_core and required packages'],
      ['T2', 'Place platform config files in correct directories'],
      ['T3', 'Call Firebase.initializeApp() at startup'],
      ['T4', 'Build completes without error'],
    ],
  },
  {
    sectionId: 'flow-multiflavor',
    num: '3',
    title: 'Sub-Flow 2 · Multi-Flavor Firebase Connection',
    subtitle: 'S6–S12 · T5–T11 · TC-003–007',
    chart: FLOW_MULTIFLAVOR,
    states: [
      ['S6',  'Flavor = Dev — Firebase project configured'],
      ['S7',  'Flavor = Staging — Firebase project configured'],
      ['S8',  'Flavor = UAT — Firebase project configured'],
      ['S9',  'Flavor = Prod — Firebase project configured'],
      ['S10', 'Firebase connection verified on iOS'],
      ['S11', 'Firebase connection verified on Android'],
      ['S12', 'Connection failure — misconfiguration detected'],
    ],
    transitions: [
      ['T5',  'Build Dev flavor → connect to Dev Firebase project'],
      ['T6',  'Build Staging flavor → connect to STG Firebase project'],
      ['T7',  'Build UAT flavor → connect to UAT Firebase project'],
      ['T8',  'Build Prod flavor → connect to Prod Firebase project'],
      ['T9',  'iOS build runs and Firebase initialises'],
      ['T10', 'Android build runs and Firebase initialises'],
      ['T11', 'Config file mismatch or missing → error'],
    ],
  },
];
