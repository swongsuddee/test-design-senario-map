import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    START([User selects Ticket\\nand proceeds to Checkout]) --> SUMMARY[Order Summary\\nTicket details + Price]
    SUMMARY --> METHOD[Payment Method Selection\\nQR PromptPay / TrueMoney / Mobile Banking]

    METHOD -->|QR PromptPay| QR[Generate QR Code\\nTTL 15 min]
    METHOD -->|TrueMoney Wallet| TMW[Redirect to TrueMoney App]
    METHOD -->|Mobile Banking| MB[Redirect to Banking App\\nBBL/KBANK/SCB/KMA/KTB]

    QR --> PENDING([Payment Status: PENDING\\nWaiting for scan])
    TMW --> PENDING
    MB --> PENDING

    PENDING --> WEBHOOK{Webhook received\\nfrom Payginix?}
    WEBHOOK -->|Success| COMPLETED([Payment Status: COMPLETED\\nTicket confirmed])
    WEBHOOK -->|Failure| FAILED([Payment Status: FAILED\\nShow retry options])
    WEBHOOK -->|Timeout 15 min| EXPIRED([Payment Status: EXPIRED\\nQR code expired])

    COMPLETED --> HISTORY[Transaction recorded\\nin Payment History]
    COMPLETED --> PAYOUT[Organizer Payout\\nafter Event ends]

    PAYOUT --> FEE[Deduct Platform fee]
    FEE --> TRANSFER([Transfer net amount\\nto Organizer])

    COMPLETED --> REFUND_CHECK{Refund request?}
    REFUND_CHECK -->|Yes — before 7 days| FULL_REFUND([Refund 100%\\nto original method])
    REFUND_CHECK -->|Yes — before 3 days| HALF_REFUND([Refund 50%\\nto original method])
    REFUND_CHECK -->|No| HISTORY

    style COMPLETED fill:#4CAF50,color:#fff
    style FAILED fill:#f44336,color:#fff
    style EXPIRED fill:#f44336,color:#fff
    style PENDING fill:#FF9800,color:#fff
    style TRANSFER fill:#4CAF50,color:#fff
    style FULL_REFUND fill:#2196F3,color:#fff
    style HALF_REFUND fill:#2196F3,color:#fff`;

const FLOW_CHECKOUT = `flowchart TD
    S1([User selects Ticket]) -->|"T1 · PP201-TC-001"| S2[Order Summary\\nTicket + Price displayed]
    S2 -->|"T2 · PP201-TC-001"| S3[Payment Method Selection\\nQR / TrueMoney / Mobile Banking]
    S3 -->|"T3 · PP201-TC-002"| S4([QR PromptPay selected])
    S3 -->|"T4 · PP201-TC-007"| S5([TrueMoney Wallet selected])
    S3 -->|"T5 · PP201-TC-008"| S6([Mobile Banking selected])

    style S4 fill:#2196F3,color:#fff
    style S5 fill:#2196F3,color:#fff
    style S6 fill:#2196F3,color:#fff`;

const FLOW_QR = `flowchart TD
    S7([QR PromptPay selected]) -->|"T6 · PP201-TC-002"| S8[QR Code displayed\\nTTL countdown 15 min]
    S8 -->|"T7"| S9[Payment Status: PENDING\\nAwaiting scan & confirm]
    S9 -->|"T8 · PP201-TC-003"| S11{Webhook result?}
    S11 -->|Success| S12([Payment: COMPLETED\\nTicket confirmed])
    S11 -->|Failure| SFAIL([Payment: FAILED])
    S9 -->|"T9 · PP201-TC-004"| S13[QR expired after 15 min]
    S13 --> S14([Payment: EXPIRED\\nUser prompted to retry])

    style S12 fill:#4CAF50,color:#fff
    style SFAIL fill:#f44336,color:#fff
    style S14 fill:#f44336,color:#fff
    style S9 fill:#FF9800,color:#fff`;

const FLOW_POLLING = `flowchart TD
    S15([Payment initiated]) -->|"T10 · PP201-TC-005"| S16[App polls\\nGET /payments/status]
    S16 -->|"T11 · PP201-TC-005"| S17{Status?}
    S17 -->|PENDING| S16
    S17 -->|"T12 · PP201-TC-005"| S18([COMPLETED — navigate to\\nSuccess Screen])
    S17 -->|"T13 · PP201-TC-006"| S19([FAILED — show error\\nRetry option])
    S17 -->|"T14 · PP201-TC-004"| S20([EXPIRED — show message\\nNew QR option])

    style S18 fill:#4CAF50,color:#fff
    style S19 fill:#f44336,color:#fff
    style S20 fill:#f44336,color:#fff
    style S16 fill:#FF9800,color:#fff`;

const FLOW_TRUEMONEY = `flowchart TD
    S21([TrueMoney selected]) -->|"T15 · PP201-TC-007"| S22[Redirect to TrueMoney App]
    S22 -->|"T16"| S23[User pays in TrueMoney]
    S23 -->|"T17 · PP201-TC-007"| S24[Return to POPPA App]
    S24 -->|"T18 · PP201-TC-007"| S25{Webhook status?}
    S25 -->|COMPLETED| S26([Payment COMPLETED\\nTicket confirmed])
    S25 -->|FAILED| S27([Payment FAILED])

    style S26 fill:#4CAF50,color:#fff
    style S27 fill:#f44336,color:#fff`;

const FLOW_WEBHOOK = `flowchart TD
    S28([Webhook from Payginix]) -->|"T19 · PP201-TC-009"| S29{Idempotency\\nkey seen before?}
    S29 -->|"T20 · PP201-TC-009"| S30[First occurrence\\nProcess webhook]
    S30 --> S31([Payment status updated\\nno duplicate record])
    S29 -->|"T21 T22 · PP201-TC-010"| S32([Duplicate ignored\\nreturn 200 OK])

    style S31 fill:#4CAF50,color:#fff
    style S32 fill:#FF9800,color:#fff`;

const FLOW_REFUND = `flowchart TD
    S33([Payment COMPLETED\\nRefund requested]) -->|"T23 · PP201-TC-011 PP201-TC-012 PP201-TC-013"| S34{Days before\\nevent?}
    S34 -->|"T24 · PP201-TC-011"| S35[> 7 days — 100% refund]
    S34 -->|"T25 · PP201-TC-012"| S36[3–7 days — 50% refund]
    S34 -->|"T26 · PP201-TC-013"| S37([< 3 days — no refund\\nPolicy enforced])
    S35 -->|"T27 · PP201-TC-011"| S38([100% refunded\\nto original method])
    S36 -->|"T27 · PP201-TC-012"| S38B([50% refunded\\nto original method])

    style S38 fill:#2196F3,color:#fff
    style S38B fill:#2196F3,color:#fff
    style S37 fill:#f44336,color:#fff`;

const FLOW_PAYOUT = `flowchart TD
    S39([Event ends]) -->|"T28 · PP201-TC-014"| S40[Payout calculation\\ngross revenue sum]
    S40 -->|"T29 · PP201-TC-014"| S41[Platform fee deducted\\nfrom gross]
    S41 -->|"T30 · PP201-TC-014"| S42([Net amount\\ntransferred to Organizer])
    S42 -->|"T31 · PP201-TC-014"| S43([Payout report\\ngenerated — admin view])

    style S42 fill:#4CAF50,color:#fff
    style S43 fill:#2196F3,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Payment',
  subtitle: 'End-to-end payment system overview',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-checkout',
    num: '2',
    title: 'Sub-Flow 1 · Checkout & Payment Method Selection',
    subtitle: 'S1–S6 · T1–T5 · TC-001, TC-007–008',
    chart: FLOW_CHECKOUT,
    states: [
      ['S1', 'User selects Ticket'],
      ['S2', 'Order Summary screen displayed'],
      ['S3', 'Payment Method Selection screen'],
      ['S4', 'QR PromptPay selected'],
      ['S5', 'TrueMoney Wallet selected'],
      ['S6', 'Mobile Banking selected'],
    ],
    transitions: [
      ['T1', 'User proceeds to checkout'],
      ['T2', 'Price confirmed — navigate to method selection'],
      ['T3', 'User selects QR PromptPay'],
      ['T4', 'User selects TrueMoney Wallet'],
      ['T5', 'User selects Mobile Banking'],
    ],
  },
  {
    sectionId: 'flow-qr',
    num: '3',
    title: 'Sub-Flow 2 · QR PromptPay Payment',
    subtitle: 'S7–S14 · T6–T9 · TC-002–004',
    chart: FLOW_QR,
    states: [
      ['S7',  'QR PromptPay selected'],
      ['S8',  'QR Code generated (TTL 15 min)'],
      ['S9',  'Payment Status: PENDING'],
      ['S10', 'User scans QR and pays'],
      ['S11', 'Webhook received — SUCCESS'],
      ['S12', 'Payment Status: COMPLETED'],
      ['S13', 'QR Code expired (15 min elapsed)'],
      ['S14', 'Payment Status: EXPIRED'],
    ],
    transitions: [
      ['T6', 'System calls Payginix — QR generated'],
      ['T7', 'User scans QR code'],
      ['T8', 'Webhook: payment SUCCESS'],
      ['T9', '15-minute TTL elapsed — QR expired'],
    ],
  },
  {
    sectionId: 'flow-polling',
    num: '4',
    title: 'Sub-Flow 3 · Payment Status Polling',
    subtitle: 'S15–S20 · T10–T14 · TC-004–006',
    chart: FLOW_POLLING,
    states: [
      ['S15', 'Payment initiated — Pending status UI shown'],
      ['S16', 'App polls GET /payments/status'],
      ['S17', 'Status = PENDING (still waiting)'],
      ['S18', 'Status = COMPLETED'],
      ['S19', 'Status = FAILED'],
      ['S20', 'Status = EXPIRED'],
    ],
    transitions: [
      ['T10', 'App calls GET /payments/status'],
      ['T11', 'Status remains PENDING — continue polling'],
      ['T12', 'Status changes to COMPLETED'],
      ['T13', 'Status changes to FAILED'],
      ['T14', 'Status changes to EXPIRED'],
    ],
  },
  {
    sectionId: 'flow-truemoney',
    num: '5',
    title: 'Sub-Flow 4 · TrueMoney Wallet Payment',
    subtitle: 'S21–S27 · T15–T18 · TC-007',
    chart: FLOW_TRUEMONEY,
    states: [
      ['S21', 'TrueMoney selected'],
      ['S22', 'Redirect to TrueMoney App'],
      ['S23', 'User completes payment in TrueMoney'],
      ['S24', 'Return to POPPA App with payment status'],
      ['S25', 'Webhook status resolved'],
      ['S26', 'TrueMoney — COMPLETED'],
      ['S27', 'TrueMoney — FAILED'],
    ],
    transitions: [
      ['T15', 'App initiates TrueMoney redirect'],
      ['T16', 'User pays in TrueMoney'],
      ['T17', 'Deep link return to POPPA'],
      ['T18', 'Webhook confirms status'],
    ],
  },
  {
    sectionId: 'flow-webhook',
    num: '6',
    title: 'Sub-Flow 5 · Webhook Handling — Idempotency',
    subtitle: 'S28–S32 · T19–T22 · TC-009–010',
    chart: FLOW_WEBHOOK,
    states: [
      ['S28', 'Webhook received from Payginix'],
      ['S29', 'Idempotency check: payment ID seen before?'],
      ['S30', 'First occurrence — process webhook'],
      ['S31', 'Payment status updated'],
      ['S32', 'Duplicate webhook — ignored'],
    ],
    transitions: [
      ['T19', 'Webhook arrives first time'],
      ['T20', 'Idempotency key not found — process'],
      ['T21', 'Webhook arrives again (retry)'],
      ['T22', 'Idempotency key found — skip duplicate'],
    ],
  },
  {
    sectionId: 'flow-refund',
    num: '7',
    title: 'Sub-Flow 6 · Refund Flow',
    subtitle: 'S33–S38B · T23–T27 · TC-011–013',
    chart: FLOW_REFUND,
    states: [
      ['S33',  'Payment COMPLETED — refund requested'],
      ['S34',  'Refund policy check: days before event'],
      ['S35',  'Before 7 days → 100% refund'],
      ['S36',  'Before 3 days → 50% refund'],
      ['S37',  'After 3 days → no refund'],
      ['S38',  'Refund processed to original payment method (100%)'],
      ['S38B', 'Refund processed to original payment method (50%)'],
    ],
    transitions: [
      ['T23', 'User/system initiates refund'],
      ['T24', 'Days remaining > 7 → 100%'],
      ['T25', 'Days remaining 3–7 → 50%'],
      ['T26', 'Days remaining < 3 → refund denied'],
      ['T27', 'Refund amount sent to original channel'],
    ],
  },
  {
    sectionId: 'flow-payout',
    num: '8',
    title: 'Sub-Flow 7 · Organizer Payout',
    subtitle: 'S39–S43 · T28–T31 · TC-014',
    chart: FLOW_PAYOUT,
    states: [
      ['S39', 'Event ends'],
      ['S40', 'Payout calculation'],
      ['S41', 'Platform fee deducted'],
      ['S42', 'Net amount transferred to Organizer'],
      ['S43', 'Payout report generated'],
    ],
    transitions: [
      ['T28', 'Event end date reached'],
      ['T29', 'System calculates gross revenue'],
      ['T30', 'Platform fee deducted'],
      ['T31', 'Net amount sent to Organizer bank'],
    ],
  },
];
