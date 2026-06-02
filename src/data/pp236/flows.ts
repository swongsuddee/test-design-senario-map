import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    ORG([Organizer opens Event\\nFinance / Transaction Page]) --> FLOAD{Finance list\\nAPI responds?}
    FLOAD -->|Yes| FLIST[Display Finance List\\nOrder rows + Summary]
    FLOAD -->|Error| ERR[Show Error State]

    FLIST --> SUMMARY[Show Revenue Summary:\\nTotal Revenue · Platform Fee · Gateway Fee · Net Payout]
    SUMMARY --> ROWS[List of Order / Transaction Rows]

    ROWS --> TAP{Organizer taps\\nan Order row?}
    TAP -->|Yes| ODETAIL[Order Detail Page]
    TAP -->|No| ROWS

    ODETAIL --> OINFO[Show: Order ID · Buyer · Ticket Type\\nPrice · Status · Payment Date]
    OINFO --> BACK([Back to Finance List])

    style FLIST fill:#4CAF50,color:#fff
    style ODETAIL fill:#2196F3,color:#fff
    style ERR fill:#f44336,color:#fff
    style BACK fill:#4CAF50,color:#fff`;

const FLOW_LIST = `flowchart TD
    S1([Finance Page\\nOpened]) -->|"T1 · PP236-TC-001"| S2[Finance List API\\nRequest Sent]
    S2 -->|"T2 · PP236-TC-001 PP236-TC-002"| S3[Finance List Loaded]
    S2 -->|"T3 · PP236-TC-008"| S4[Error State]
    S3 -->|"T4 · PP236-TC-002 PP236-TC-003 PP236-TC-004"| S5[Revenue Summary\\nTotal Revenue · Platform Fee · Gateway Fee · Net Payout]
    S3 -->|"T5 · PP236-TC-001 PP236-TC-002"| S6([Order Rows\\nwith Statuses])

    style S3 fill:#4CAF50,color:#fff
    style S5 fill:#4CAF50,color:#fff
    style S4 fill:#f44336,color:#fff
    style S6 fill:#4CAF50,color:#fff`;

const FLOW_FEE = `flowchart TD
    S7([Total Revenue\\nKnown]) -->|"T6 · PP236-TC-003"| S8[Gateway Fee\\n= 2.5% × Revenue]
    S7 -->|"T7 · PP236-TC-004"| S9[Platform Fee\\n= 0.5% × Revenue]
    S8 -->|"T8 · PP236-TC-005"| S10[Net Payout\\n= Revenue − Gateway − Platform]
    S9 --> S10
    S10 -->|"T10 · PP236-TC-005"| S11([Values Match\\nExpected])
    S10 -->|"T11 · PP236-TC-006"| S12([Discrepancy Found])

    style S11 fill:#4CAF50,color:#fff
    style S12 fill:#f44336,color:#fff`;

const FLOW_DETAIL = `flowchart TD
    S13([Order Row\\nin Finance List]) -->|"T12 · PP236-TC-009"| S14[Order Row Tapped]
    S14 -->|"T13 · PP236-TC-009 PP236-TC-010"| S15[Order Detail\\nAPI Request]
    S15 --> S16[Order Detail\\nPage Loaded]
    S16 -->|"T14 · PP236-TC-010 PP236-TC-011"| S17[Fields: Order ID · Buyer · Ticket Type\\nPrice · Status · Payment Date]
    S17 -->|"T15 · PP236-TC-012"| S18([Back to Finance List])

    style S16 fill:#2196F3,color:#fff
    style S17 fill:#4CAF50,color:#fff
    style S18 fill:#4CAF50,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Finance / Transaction Page',
  subtitle: 'End-to-end organizer finance system overview',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-list',
    num: '2',
    title: 'Sub-Flow 1 · Finance List Display',
    subtitle: 'S1–S6 · T1–T5 · TC-001–TC-002, TC-008',
    chart: FLOW_LIST,
    states: [
      ['S1', 'Organizer navigates to Finance page'],
      ['S2', 'Finance list API request sent'],
      ['S3', 'Finance list loaded — order rows visible'],
      ['S4', 'Error state — API failure'],
      ['S5', 'Revenue summary rendered (Total Revenue, Fees, Net Payout)'],
      ['S6', 'Order rows with status labels displayed'],
    ],
    transitions: [
      ['T1', 'Navigate to finance page'],
      ['T2', 'API responds 200 with finance data'],
      ['T3', 'API error / timeout'],
      ['T4', 'Summary section rendered'],
      ['T5', 'Order rows rendered'],
    ],
  },
  {
    sectionId: 'flow-fee',
    num: '3',
    title: 'Sub-Flow 2 · Fee Calculation Verification',
    subtitle: 'S7–S12 · T6–T11 · TC-003–TC-006',
    chart: FLOW_FEE,
    states: [
      ['S7',  'Total Revenue known'],
      ['S8',  'Gateway Fee calculated (2.5% of Total Revenue)'],
      ['S9',  'Platform Fee calculated (0.5% of Total Revenue)'],
      ['S10', 'Net Payout calculated (Total Revenue − Gateway Fee − Platform Fee)'],
      ['S11', 'Displayed values match expected calculations'],
      ['S12', 'Displayed values do not match — discrepancy'],
    ],
    transitions: [
      ['T6',  'Revenue value confirmed from API'],
      ['T7',  'Gateway Fee = 2.5% × Revenue'],
      ['T8',  'Platform Fee = 0.5% × Revenue'],
      ['T9',  'Net Payout = Revenue − Gateway − Platform'],
      ['T10', 'UI values verified correct'],
      ['T11', 'UI values differ from expected — bug'],
    ],
  },
  {
    sectionId: 'flow-order-detail',
    num: '4',
    title: 'Sub-Flow 3 · Order Detail',
    subtitle: 'S13–S18 · T12–T15 · TC-009–TC-012',
    chart: FLOW_DETAIL,
    states: [
      ['S13', 'Order row visible in finance list'],
      ['S14', 'Organizer taps Order row'],
      ['S15', 'Order Detail API request sent'],
      ['S16', 'Order Detail page loaded'],
      ['S17', 'Order fields rendered: Order ID, Buyer, Ticket Type, Price, Status, Payment Date'],
      ['S18', 'Organizer navigates back to finance list'],
    ],
    transitions: [
      ['T12', 'Tap order row'],
      ['T13', 'Order Detail API responds'],
      ['T14', 'Fields verified'],
      ['T15', 'Back navigation'],
    ],
  },
];
