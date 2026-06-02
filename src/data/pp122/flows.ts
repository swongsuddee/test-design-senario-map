import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    PUSH([Push Notification Received\\nfrom Backend]) --> LOCK{Device on\\nLock Screen?}

    LOCK -->|Yes| CARD[Render Notification Card\\non Lock Screen]
    LOCK -->|No| BANNER[Show Banner\\nin Notification Center]

    CARD --> LAYOUT[Build Card Layout\\n──────────────────\\nLeading · Center · Trailing]

    LAYOUT --> HAS_IMG{Content\\nImage?}
    HAS_IMG -->|Yes| FULL[Full 3-column Layout\\nIcon │ Title+Body │ Image]
    HAS_IMG -->|No| NOIMG[2-column Layout\\nIcon │ Title+Body expanded]

    FULL --> STAMP[Show Timestamp\\ne.g. 2h ago]
    NOIMG --> STAMP

    STAMP --> SAME_APP{Same App has\\nexisting notification?}
    SAME_APP -->|No| SINGLE[Single Card]
    SAME_APP -->|Yes| STACK[Stacked Cards\\niOS style]

    SINGLE --> TAP{User Taps Card?}
    STACK --> TAP

    TAP -->|Yes| DEEP[Deep Link → Target\\nScreen inside App]
    TAP -->|No| IDLE([Notification stays\\non Lock Screen])

    DEEP --> APP([App opens to\\nrelevant screen])

    style APP fill:#4CAF50,color:#fff
    style DEEP fill:#2196F3,color:#fff
    style STACK fill:#FF9800,color:#fff
    style IDLE fill:#9E9E9E,color:#fff`;

const FLOW_LAYOUT = `flowchart TD
    S1([Push Received]) -->|"T1"| S2[Resolve Layout Params\\nTitle · Body · Image URL · Badge]

    S2 --> S7{Badge count > 0?}
    S7 -->|"T4 · PP122-TC-001"| S7A[App Icon + Badge number\\nin Leading position]
    S7 -->|"T5 · PP122-TC-002"| S7B[App Icon only\\nno badge]
    S7A --> S2B
    S7B --> S2B

    S2B[Apply Center content] --> S6[Title in Bold\\nBody/Subtitle in Regular weight]
    S6 --> S3{Content Image\\nURL present?}

    S3 -->|"T2 · PP122-TC-003 PP122-TC-005"| S4[Trailing: Square Image shown\\nBody text uses shared width]
    S3 -->|"T3 · PP122-TC-004 PP122-TC-006"| S5[Trailing hidden\\nBody text expands full width]

    S4 -->|"T6"| S8([Notification Card Ready])
    S5 -->|"T6"| S8

    style S8 fill:#4CAF50,color:#fff
    style S4 fill:#2196F3,color:#fff
    style S5 fill:#607D8B,color:#fff`;

const FLOW_STACKING = `flowchart TD
    S9([New notification\\nfrom Poppa App]) -->|"T7 · PP122-TC-007"| S10[Single Card\\non Lock Screen]
    S10 -->|"T8 · PP122-TC-008"| S11{Another notification\\nfrom same App?}
    S11 -->|Yes| S12[Stack View\\niOS style grouping]
    S11 -->|No| S10

    S12 -->|"T9 · PP122-TC-009"| S13[User taps stack\\nor pulls down]
    S13 -->|"T10"| S14[Individual cards\\nall visible]
    S14 --> S15{User taps a card?}
    S15 -->|Yes| DEEP([Deep Link])
    S15 -->|No| S14

    style DEEP fill:#2196F3,color:#fff
    style S12 fill:#FF9800,color:#fff`;

const FLOW_DEEPLINK = `flowchart TD
    S15([Notification Card\\non Lock Screen]) -->|"T11 · PP122-TC-010"| S16[User taps card]
    S16 --> S17[Device unlock prompt\\nFace ID / Touch ID / PIN]
    S17 -->|"T12"| S18[App receives\\ndeep link intent]
    S18 --> S18B{Route\\nresolved?}
    S18B -->|"T13 · PP122-TC-010 PP122-TC-011"| S19([Target screen\\ndisplayed correctly])
    S18B -->|"T14 · PP122-TC-012"| S20([Fallback: Home screen])

    style S19 fill:#4CAF50,color:#fff
    style S20 fill:#FF9800,color:#fff`;

const FLOW_TIMESTAMP = `flowchart TD
    S21([Card Rendered]) --> S22[Calculate notification age\\nfrom received_at timestamp]
    S22 --> S22B{Age}
    S22B -->|"T15 · PP122-TC-013 · < 60 min"| S23["Xm ago\\ne.g. 5m ago"]
    S22B -->|"T16 · PP122-TC-014 · 1–23h"| S24["Xh ago\\ne.g. 2h ago"]
    S22B -->|"T17 · PP122-TC-015 · ≥ 24h"| S25["Absolute date\\ne.g. May 14"]

    style S23 fill:#4CAF50,color:#fff
    style S24 fill:#4CAF50,color:#fff
    style S25 fill:#607D8B,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Push Notification UI',
  subtitle: 'End-to-end system overview',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-layout',
    num: '2',
    title: 'Sub-Flow 1 · Notification Card Layout Rendering',
    subtitle: 'S1–S8 · T1–T6 · TC-001–006',
    chart: FLOW_LAYOUT,
    states: [
      ['S1', 'Push Notification arrives'],
      ['S2', 'Resolve layout parameters'],
      ['S3', 'Content image URL present?'],
      ['S4', 'Full layout — Icon + Title + Body + Image'],
      ['S5', 'Compact layout — Icon + Title + Body (expanded)'],
      ['S6', 'Apply font hierarchy'],
      ['S7', 'App Icon with Badge count'],
      ['S8', 'Notification Card ready'],
    ],
    transitions: [
      ['T1', 'Notification payload received'],
      ['T2', 'Image URL valid → full layout'],
      ['T3', 'Image URL absent/empty → compact layout'],
      ['T4', 'Badge count > 0 — show number'],
      ['T5', 'Badge count = 0 — hide badge'],
      ['T6', 'Layout rendered'],
    ],
  },
  {
    sectionId: 'flow-stacking',
    num: '3',
    title: 'Sub-Flow 2 · Notification Stacking',
    subtitle: 'S9–S14 · T7–T10 · TC-007–009',
    chart: FLOW_STACKING,
    states: [
      ['S9',  'First notification from App'],
      ['S10', 'Single card displayed'],
      ['S11', 'Second+ notification from same App arrives'],
      ['S12', 'Stack view formed (iOS style)'],
      ['S13', 'Stack expanded by user'],
      ['S14', 'Individual cards visible'],
    ],
    transitions: [
      ['T7',  'First notification — render single card'],
      ['T8',  'Additional notification from same app'],
      ['T9',  'Tap stack to expand'],
      ['T10', 'Cards visible individually'],
    ],
  },
  {
    sectionId: 'flow-deeplink',
    num: '4',
    title: 'Sub-Flow 3 · Deep Link Interaction',
    subtitle: 'S15–S20 · T11–T14 · TC-010–012',
    chart: FLOW_DEEPLINK,
    states: [
      ['S15', 'Notification card on Lock Screen'],
      ['S16', 'User taps card'],
      ['S17', 'Device unlocks (biometric / PIN)'],
      ['S18', 'App receives deep link intent'],
      ['S19', 'Correct target screen shown'],
      ['S20', 'Fallback: Home screen (no matching route)'],
    ],
    transitions: [
      ['T11', 'Tap notification card'],
      ['T12', 'Device authenticates user'],
      ['T13', 'Deep link route matched'],
      ['T14', 'Deep link route not found — fallback'],
    ],
  },
  {
    sectionId: 'flow-timestamp',
    num: '5',
    title: 'Sub-Flow 4 · Timestamp Display',
    subtitle: 'S21–S25 · T15–T17 · TC-013–015',
    chart: FLOW_TIMESTAMP,
    states: [
      ['S21', 'Notification card rendered'],
      ['S22', 'Timestamp calculated'],
      ['S23', 'Relative time shown (< 1h)'],
      ['S24', 'Relative time shown (≥ 1h, < 24h)'],
      ['S25', 'Absolute time shown (≥ 24h)'],
    ],
    transitions: [
      ['T15', 'Notification age < 60 minutes'],
      ['T16', 'Notification age ≥ 60 minutes and < 24h'],
      ['T17', 'Notification age ≥ 24 hours'],
    ],
  },
];
