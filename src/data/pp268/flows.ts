import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    USER([User opens Event\\nfrom Home / Search]) --> DLOAD{Event Detail\\nAPI responds?}
    DLOAD -->|Yes| DPAGE[Event Detail Page Rendered]
    DLOAD -->|Error| DERR[Error State Shown]
    DPAGE --> FIELDS[Display: Name · Date/Time · Location\\nImage · Description · Ticket Types]
    FIELDS --> TYPE{Event Type?}
    TYPE -->|Free| JOINCTA[Show Join Button]
    TYPE -->|Paid| BUYCTA[Show Buy Ticket Button]
    JOINCTA --> TAPJOIN{User taps Join?}
    BUYCTA --> TAPBUY{User taps Buy Ticket?}
    TAPJOIN -->|Yes| JOINFLOW([Registration Flow])
    TAPJOIN -->|No| SCROLL[User scrolls page]
    TAPBUY -->|Yes| BUYFLOW([Payment / Checkout Flow])
    TAPBUY -->|No| SCROLL
    SCROLL --> PLIST{Participant\\nList section?}
    PLIST -->|Yes| SHOWPART[Display Confirmed Participants]
    PLIST -->|No| DPAGE
    style DPAGE fill:#4CAF50,color:#fff
    style JOINFLOW fill:#2196F3,color:#fff
    style BUYFLOW fill:#2196F3,color:#fff
    style DERR fill:#f44336,color:#fff
    style SHOWPART fill:#4CAF50,color:#fff`;

const FLOW_DETAIL = `flowchart TD
    S1([User Navigates\\nto Event]) -->|"T1 · PP268-TC-001"| S2[Event Detail\\nAPI Request]
    S2 -->|"T2 · PP268-TC-001 PP268-TC-002"| S3[Event Data\\nLoaded]
    S2 -->|"T3 · PP268-TC-009"| S4[Error State]
    S3 -->|"T4 · PP268-TC-003 PP268-TC-005"| S5[All Info Fields\\nVisible]
    S5 -->|"T4 · PP268-TC-005"| S6[Join Button\\nFree Event]
    S5 -->|"T5 · PP268-TC-006"| S7[Buy Ticket Button\\nPaid Event]
    style S3 fill:#4CAF50,color:#fff
    style S4 fill:#f44336,color:#fff
    style S6 fill:#2196F3,color:#fff
    style S7 fill:#2196F3,color:#fff`;

const FLOW_CTA = `flowchart TD
    S8([Free Event\\nJoin Button]) -->|"T6 · PP268-TC-005"| S8A{User already\\nregistered?}
    S8A -->|No| S8B[Join Button Enabled]
    S8A -->|"T7 · PP268-TC-007"| S10[CTA shows Registered\\nor is disabled]
    S8B -->|"T9 · PP268-TC-005"| S12([Registration Flow])
    S9([Paid Event\\nBuy Ticket Button]) -->|"T6 · PP268-TC-006"| S9A{Slots\\navailable?}
    S9A -->|Yes| S9B[Buy Ticket Button Enabled]
    S9A -->|"T8 · PP268-TC-008"| S11[Sold Out\\nCTA Disabled]
    S9B -->|"T10 · PP268-TC-006"| S13([Checkout Flow])
    style S12 fill:#2196F3,color:#fff
    style S13 fill:#2196F3,color:#fff
    style S10 fill:#FF9800,color:#fff
    style S11 fill:#FF9800,color:#fff`;

const FLOW_PARTICIPANTS = `flowchart TD
    S14([User scrolls to\\nParticipant Section]) -->|"T11 · PP268-TC-010"| S15[Participant\\nAPI Request]
    S15 -->|"T12 · PP268-TC-010 PP268-TC-011"| S16[Confirmed Participants\\nLoaded]
    S15 -->|"T13 · PP268-TC-012"| S18[Empty State\\nNo confirmed participants]
    S16 -->|"T14 · PP268-TC-010 PP268-TC-011"| S17([Participant Rows\\nDisplayed])
    style S16 fill:#4CAF50,color:#fff
    style S17 fill:#4CAF50,color:#fff
    style S18 fill:#FF9800,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Event Detail',
  subtitle: 'End-to-end system overview',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-detail',
    num: '2',
    title: 'Sub-Flow 1 · Event Detail Display',
    subtitle: 'S1–S7 · T1–T5 · TC-001–003, TC-005–006, TC-009',
    chart: FLOW_DETAIL,
    states: [
      ['S1', 'User navigates to Event Detail'],
      ['S2', 'Event Detail API request sent'],
      ['S3', 'Event data loaded, page rendered'],
      ['S4', 'API error — event detail cannot load'],
      ['S5', 'All event info fields visible'],
      ['S6', 'Join button shown — Free event'],
      ['S7', 'Buy Ticket button shown — Paid event'],
    ],
    transitions: [
      ['T1', 'Navigate to event'],
      ['T2', 'API responds 200 with event data'],
      ['T3', 'API error / timeout'],
      ['T4', 'Free event — Join CTA'],
      ['T5', 'Paid event — Buy Ticket CTA'],
    ],
  },
  {
    sectionId: 'flow-cta',
    num: '3',
    title: 'Sub-Flow 2 · CTA Button States',
    subtitle: 'S8–S13 · T6–T10 · TC-005–008',
    chart: FLOW_CTA,
    states: [
      ['S8',  'Free event — Join button state'],
      ['S9',  'Paid event — Buy Ticket button state'],
      ['S10', 'CTA shows Registered / disabled — already registered'],
      ['S11', 'Sold out — CTA disabled'],
      ['S12', 'Registration flow starts'],
      ['S13', 'Checkout flow starts'],
    ],
    transitions: [
      ['T6',  'Slots available — CTA enabled'],
      ['T7',  'User already registered — CTA changes'],
      ['T8',  'Event full — CTA disabled'],
      ['T9',  'Tap Join button'],
      ['T10', 'Tap Buy Ticket button'],
    ],
  },
  {
    sectionId: 'flow-participants',
    num: '4',
    title: 'Sub-Flow 3 · Participant List',
    subtitle: 'S14–S18 · T11–T14 · TC-010–012',
    chart: FLOW_PARTICIPANTS,
    states: [
      ['S14', 'User scrolls to participant section'],
      ['S15', 'Participant API request sent'],
      ['S16', 'Confirmed participants loaded'],
      ['S17', 'Participant rows displayed'],
      ['S18', 'Empty state — no confirmed participants'],
    ],
    transitions: [
      ['T11', 'User scrolls to participant section'],
      ['T12', 'Participant API responds — confirmed'],
      ['T13', 'No confirmed participants — empty state'],
      ['T14', 'Rows rendered for each participant'],
    ],
  },
];
