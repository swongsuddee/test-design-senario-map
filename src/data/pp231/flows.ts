import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    START([Organizer logs in\\nto Backoffice]) --> EVSEL[Selects an Event\\nfrom Event List]
    EVSEL --> DASH[Organizer Dashboard\\nPage Loaded]
    DASH --> API[Fetch Event Summary\\nfrom Read Model API]
    API --> NET{API\\nResponse?}
    NET -->|Error| APIERR([Dashboard Error State\\nRetry option])
    NET -->|Success| RENDER[Render Dashboard\\nComponents]
    RENDER --> PIE[Pie Chart: Ticket Type\\nSales Distribution]
    RENDER --> METRICS[Summary Metrics:\\nTotal Revenue · Tickets Sold\\n· Total Participants]
    RENDER --> TABLE[Ticket Metrics Table:\\nPer Ticket Type breakdown]
    PIE --> FILTER[Date Range Filter\\navailable]
    METRICS --> FILTER
    TABLE --> FILTER
    FILTER --> SEL{Organizer selects\\nDate Range?}
    SEL -->|Yes| REFETCH[Re-fetch API\\nwith date filter params]
    REFETCH --> NET
    SEL -->|No| VIEW([Dashboard displayed\\nwith default range])

    style VIEW fill:#4CAF50,color:#fff
    style APIERR fill:#f44336,color:#fff
    style RENDER fill:#2196F3,color:#fff
    style REFETCH fill:#FF9800,color:#fff`;

const FLOW_METRICS = `flowchart TD
    S1([Dashboard Page\\nLoading]) -->|"T1 · PP231-TC-001"| S2[Event Summary\\nAPI Called]
    S2 -->|"T2 · PP231-TC-001 PP231-TC-002"| S3[Pie Chart\\nRendered]
    S2 -->|"T2 · PP231-TC-001 PP231-TC-003"| S4[Summary Metrics\\nRendered]
    S2 -->|"T3 · PP231-TC-001 PP231-TC-004"| S5[Ticket Metrics Table\\nRendered]
    S2 -->|"T4 · PP231-TC-009"| S6([API Error\\nDashboard not loaded])

    style S3 fill:#2196F3,color:#fff
    style S4 fill:#2196F3,color:#fff
    style S5 fill:#2196F3,color:#fff
    style S6 fill:#f44336,color:#fff`;

const FLOW_PIE = `flowchart TD
    PIE_IN([Event Summary\\nData Received]) -->|"T5 · PP231-TC-002"| S7[Pie Chart\\nMultiple slices proportional\\nto sales per ticket type]
    PIE_IN -->|"T6 · PP231-TC-002"| S8[Pie Chart\\nSingle slice = 100%]
    PIE_IN -->|"T7 · PP231-TC-002"| S9[Pie Chart\\nEmpty / zero state]

    style S7 fill:#4CAF50,color:#fff
    style S8 fill:#2196F3,color:#fff
    style S9 fill:#FF9800,color:#fff`;

const FLOW_FILTER = `flowchart TD
    S10([Dashboard with\\nDefault Date Range]) -->|"T8 · PP231-TC-005"| S11[Date Range\\nPicker Open]
    S11 -->|"T9 · PP231-TC-005"| S12[Custom Range\\nSelected]
    S12 -->|"T10 · PP231-TC-005 PP231-TC-006"| S13[Dashboard Updated\\nfor Selected Range]
    S11 -->|"T11 · PP231-TC-007"| S14[Invalid Range\\nError — filter not applied]

    style S13 fill:#4CAF50,color:#fff
    style S14 fill:#f44336,color:#fff
    style S12 fill:#2196F3,color:#fff`;

const FLOW_CQRS = `flowchart TD
    DATA([Ticket & Payment\\nEvents]) -->|"T14 · PP231-TC-008"| S18[Read Model\\nQueried via CQRS]
    S18 -->|"T12 · PP231-TC-003 PP231-TC-008"| S15[Only Confirmed Payments\\nCounted in Metrics]
    S18 -->|"T13 · PP231-TC-008"| S16[Pending Payments\\nExcluded]
    S18 -->|"T13 · PP231-TC-008"| S17[Failed Payments\\nExcluded]

    style S15 fill:#4CAF50,color:#fff
    style S16 fill:#FF9800,color:#fff
    style S17 fill:#f44336,color:#fff
    style S18 fill:#2196F3,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Organizer Event Detail Dashboard',
  subtitle: 'End-to-end system overview',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-metrics',
    num: '2',
    title: 'Sub-Flow 1 · Dashboard Metrics Display',
    subtitle: 'S1–S6 · T1–T4 · TC-001–004, TC-009',
    chart: FLOW_METRICS,
    states: [
      ['S1', 'Dashboard page loading'],
      ['S2', 'Event Summary API call in-flight'],
      ['S3', 'Pie Chart rendered — ticket type distribution'],
      ['S4', 'Summary metrics rendered (Revenue, Sold, Participants)'],
      ['S5', 'Ticket Metrics table rendered (per ticket type)'],
      ['S6', 'API error — dashboard not loaded'],
    ],
    transitions: [
      ['T1', 'Organizer navigates to dashboard'],
      ['T2', 'API returns event summary data'],
      ['T3', 'API returns ticket metrics data'],
      ['T4', 'API fails — error state'],
    ],
  },
  {
    sectionId: 'flow-pie',
    num: '3',
    title: 'Sub-Flow 2 · Pie Chart — Ticket Type Distribution',
    subtitle: 'S7–S9 · T5–T7 · TC-002',
    chart: FLOW_PIE,
    states: [
      ['S7', 'Pie Chart with multiple ticket types'],
      ['S8', 'Pie Chart with single ticket type (100% slice)'],
      ['S9', 'Pie Chart with no sold tickets (empty state)'],
    ],
    transitions: [
      ['T5', 'Multiple ticket types sold — proportional slices'],
      ['T6', 'Only one ticket type sold'],
      ['T7', 'No tickets sold — empty chart'],
    ],
  },
  {
    sectionId: 'flow-filter',
    num: '4',
    title: 'Sub-Flow 3 · Filtering & Date Range',
    subtitle: 'S10–S14 · T8–T11 · TC-005–007',
    chart: FLOW_FILTER,
    states: [
      ['S10', 'Default date range displayed (all time / event period)'],
      ['S11', 'Date range picker open'],
      ['S12', 'Custom date range selected'],
      ['S13', 'Dashboard data refreshed for selected range'],
      ['S14', 'Invalid date range selected (end before start)'],
    ],
    transitions: [
      ['T8',  'Organizer opens date range filter'],
      ['T9',  'Valid date range confirmed'],
      ['T10', 'Dashboard data re-fetched and updated'],
      ['T11', 'Invalid date range — filter rejected'],
    ],
  },
  {
    sectionId: 'flow-cqrs',
    num: '5',
    title: 'Sub-Flow 4 · Data Accuracy & CQRS',
    subtitle: 'S15–S18 · T12–T14 · TC-003, TC-008',
    chart: FLOW_CQRS,
    states: [
      ['S15', 'Dashboard shows only confirmed-payment tickets'],
      ['S16', 'Pending payment tickets excluded from metrics'],
      ['S17', 'Failed payment tickets excluded from metrics'],
      ['S18', 'Read Model queried (CQRS — separate from write path)'],
    ],
    transitions: [
      ['T12', 'Only payment_status = confirmed counted in metrics'],
      ['T13', 'Pending/failed payments not reflected in revenue or sold count'],
      ['T14', 'Metrics served from Read Model (event-sourced projection)'],
    ],
  },
];
