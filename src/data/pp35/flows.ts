import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    ASSET([Asset Preparation\\nIcon ≥1024×1024 px · Logo · Background Color]) --> FLAVOR{Select Flavor}
    FLAVOR -->|Dev| DEV_BUILD[Build Dev]
    FLAVOR -->|Staging| STG_BUILD[Build Staging]
    FLAVOR -->|UAT| UAT_BUILD[Build UAT]
    FLAVOR -->|Prod| PROD_BUILD[Build Prod]

    DEV_BUILD --> PLATFORM{Platform?}
    STG_BUILD --> PLATFORM
    UAT_BUILD --> PLATFORM
    PROD_BUILD --> PLATFORM

    PLATFORM -->|iOS| IOS[iOS Build]
    PLATFORM -->|Android| AND[Android Build]

    IOS --> ICON_IOS{App Icon\\ncorrect for flavor?}
    AND --> ICON_AND{App Icon\\ncorrect for flavor?}

    ICON_IOS -->|Yes| SPLASH_IOS{Splash Screen\\ndisplays correctly?}
    ICON_IOS -->|No| ICON_ERR_IOS([Icon Error — iOS\\nwrong icon / missing])
    ICON_AND -->|Yes| SPLASH_AND{Splash Screen\\ndisplays correctly?}
    ICON_AND -->|No| ICON_ERR_AND([Icon Error — Android\\nwrong icon / missing])

    SPLASH_IOS -->|Yes| OK_IOS([Pass — iOS])
    SPLASH_IOS -->|No| SPLASH_ERR_IOS([Splash Error — iOS\\nflicker / wrong ratio / stuck])
    SPLASH_AND -->|Yes| OK_AND([Pass — Android])
    SPLASH_AND -->|No| SPLASH_ERR_AND([Splash Error — Android\\nflicker / wrong ratio / stuck])

    style OK_IOS fill:#4CAF50,color:#fff
    style OK_AND fill:#4CAF50,color:#fff
    style ICON_ERR_IOS fill:#f44336,color:#fff
    style ICON_ERR_AND fill:#f44336,color:#fff
    style SPLASH_ERR_IOS fill:#f44336,color:#fff
    style SPLASH_ERR_AND fill:#f44336,color:#fff`;

const FLOW_ASSET_PREP = `flowchart TD
    START([Asset Design]) -->|"T1 · PP35-TC-001"| S1[App Icon asset\\n≥ 1024×1024 px · 1:1 ratio]
    START -->|"T2 · PP35-TC-001"| S2[Splash logo +\\nBackground color defined]
    S1 --> S3([Assets ready for\\nflutter_launcher_icons\\n& flutter_native_splash])
    S2 --> S3

    style S3 fill:#4CAF50,color:#fff
    style S1 fill:#2196F3,color:#fff
    style S2 fill:#2196F3,color:#fff`;

const FLOW_APP_ICON = `flowchart TD
    S4[flutter_launcher_icons\\nconfigured per Flavor] -->|"T3 · PP35-TC-002"| S7[Dev Icon\\nlabeled Dev]
    S4 -->|"T4 · PP35-TC-003"| S8[Staging Icon\\nlabeled Staging]
    S4 -->|"T5 · PP35-TC-004"| S9[UAT Icon\\nlabeled UAT]
    S4 -->|"T6 · PP35-TC-005"| S10[Prod Icon\\nstandard brand]

    S7 --> PLAT_CHECK{Platform?}
    S8 --> PLAT_CHECK
    S9 --> PLAT_CHECK
    S10 --> PLAT_CHECK

    PLAT_CHECK -->|"T7 · PP35-TC-002 PP35-TC-003 PP35-TC-004 PP35-TC-005"| S5[Android Adaptive Icons\\nForeground + Background]
    PLAT_CHECK -->|"T8 · PP35-TC-002 PP35-TC-003 PP35-TC-004 PP35-TC-005"| S6[iOS Icon Set\\nAll sizes correct]
    PLAT_CHECK -->|"T9 · PP35-TC-009"| S11([Icon error\\nmissing / wrong flavor])

    style S5 fill:#4CAF50,color:#fff
    style S6 fill:#4CAF50,color:#fff
    style S11 fill:#f44336,color:#fff`;

const FLOW_SPLASH = `flowchart TD
    S12[flutter_native_splash\\nconfigured] -->|"T10 · PP35-TC-006 PP35-TC-007"| S13[App launched]
    S13 --> S14[Splash Screen displayed]
    S14 -->|"T11 · PP35-TC-006"| S15A[Splash correct — iOS\\ncentered · no flicker · correct ratio]
    S14 -->|"T12 · PP35-TC-007"| S15B[Splash correct — Android\\ncentered · no flicker · correct ratio]
    S14 -->|"T14 · PP35-TC-010"| S17([Splash error\\nflicker / wrong ratio / stuck])
    S15A -->|"T13 · PP35-TC-006"| S16([App loads\\nnext screen])
    S15B -->|"T13 · PP35-TC-007"| S16

    style S16 fill:#4CAF50,color:#fff
    style S15A fill:#4CAF50,color:#fff
    style S15B fill:#4CAF50,color:#fff
    style S17 fill:#f44336,color:#fff`;

const FLOW_MULTI_ENV = `flowchart TD
    ALL_FLAVORS[All Flavors\\nDev · STG · UAT · Prod] -->|"T15 · PP35-TC-002 PP35-TC-003 PP35-TC-004 PP35-TC-005"| S18[Emulator / Simulator]
    ALL_FLAVORS -->|"T16 · PP35-TC-006 PP35-TC-007 PP35-TC-008"| S19[Physical Device]
    S18 -->|"T17"| S20([All pass\\nIcon + Splash correct])
    S19 -->|"T17"| S20
    S18 -->|"T18 · PP35-TC-009 PP35-TC-010"| S21([Verification failure\\ndefect found])
    S19 -->|"T18 · PP35-TC-009 PP35-TC-010"| S21

    style S20 fill:#4CAF50,color:#fff
    style S21 fill:#f44336,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — AppIcon & Native Splash',
  subtitle: 'End-to-end multi-flavor visual verification overview',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-asset-prep',
    num: '2',
    title: 'Sub-Flow 1 · Asset Preparation',
    subtitle: 'S1–S3 · T1–T2 · TC-001',
    chart: FLOW_ASSET_PREP,
    states: [
      ['S1', 'App Icon source asset prepared (≥ 1024×1024 px, 1:1 ratio)'],
      ['S2', 'Splash Screen logo and background color defined'],
      ['S3', 'Assets ready for flutter_launcher_icons and flutter_native_splash'],
    ],
    transitions: [
      ['T1', 'Designer provides icon asset meeting spec'],
      ['T2', 'Splash logo and background color confirmed'],
    ],
  },
  {
    sectionId: 'flow-app-icon',
    num: '3',
    title: 'Sub-Flow 2 · AppIcon Implementation — Multi-Flavor',
    subtitle: 'S4–S11 · T3–T9 · TC-002–005, TC-009',
    chart: FLOW_APP_ICON,
    states: [
      ['S4',  'flutter_launcher_icons configured per Flavor'],
      ['S5',  'Android Adaptive Icons generated (foreground + background)'],
      ['S6',  'iOS icon set generated (all required sizes)'],
      ['S7',  'Dev flavor icon — labeled "Dev"'],
      ['S8',  'Staging flavor icon — labeled "Staging"'],
      ['S9',  'UAT flavor icon — labeled "UAT"'],
      ['S10', 'Prod flavor icon — standard brand icon'],
      ['S11', 'Icon incorrect or missing for a flavor'],
    ],
    transitions: [
      ['T3', 'Run flutter_launcher_icons for Dev'],
      ['T4', 'Run flutter_launcher_icons for Staging'],
      ['T5', 'Run flutter_launcher_icons for UAT'],
      ['T6', 'Run flutter_launcher_icons for Prod'],
      ['T7', 'Android adaptive icon assets generated correctly'],
      ['T8', 'iOS icon sizes generated correctly'],
      ['T9', 'Icon generation fails or produces incorrect output'],
    ],
  },
  {
    sectionId: 'flow-splash',
    num: '4',
    title: 'Sub-Flow 3 · Native Splash Implementation',
    subtitle: 'S12–S17 · T10–T14 · TC-006–007, TC-010',
    chart: FLOW_SPLASH,
    states: [
      ['S12', 'flutter_native_splash configured (duration, resize, background color)'],
      ['S13', 'App launched'],
      ['S14', 'Splash Screen displayed'],
      ['S15', 'Splash renders correctly (centered logo, correct background, no flicker)'],
      ['S16', 'Splash dismissed → app loads'],
      ['S17', 'Splash error (flicker / wrong ratio / screen stuck)'],
    ],
    transitions: [
      ['T10', 'App launch triggers native splash'],
      ['T11', 'Splash renders correctly on iOS'],
      ['T12', 'Splash renders correctly on Android'],
      ['T13', 'Splash completes → navigate to next screen'],
      ['T14', 'Splash renders incorrectly'],
    ],
  },
  {
    sectionId: 'flow-multi-env',
    num: '5',
    title: 'Sub-Flow 4 · Multi-Environment Verification',
    subtitle: 'S18–S21 · T15–T18 · TC-002–010',
    chart: FLOW_MULTI_ENV,
    states: [
      ['S18', 'Build on Emulator / Simulator'],
      ['S19', 'Build on Physical Device'],
      ['S20', 'All flavors verified — icons and splash correct'],
      ['S21', 'Verification failure — icon missing or splash wrong'],
    ],
    transitions: [
      ['T15', 'Run all flavors on Emulator / Simulator'],
      ['T16', 'Run all flavors on physical device'],
      ['T17', 'All checks pass'],
      ['T18', 'Check fails — defect found'],
    ],
  },
];
