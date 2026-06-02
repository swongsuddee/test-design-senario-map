import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    ORG([Organizer opens Event\\nRunning Detail]) --> PLIST[Participant List Page]
    PLIST --> LOAD{API returns\\nparticipant data?}
    LOAD -->|Yes| SHOW[Display Participant List\\nwith Status badges]
    LOAD -->|No / Error| ERR[Show Error State]

    SHOW --> FILTER{Apply Search\\nor Filter?}
    FILTER -->|Search by name| SRCH[Filtered List by Name]
    FILTER -->|Filter by Status| FSTAT[Filtered List by Status]
    FILTER -->|No filter| FULL[Full List Displayed]

    SRCH --> ROW[Participant Row]
    FSTAT --> ROW
    FULL --> ROW

    ROW --> TAP{Organizer taps\\nparticipant row?}
    TAP -->|Yes| DETAIL[Participant Detail Page]
    TAP -->|No| PLIST

    DETAIL --> INFO[Show: Name, Ticket Type,\\nPayment Status, Check-in Status]
    INFO --> BACK([Back to Participant List])

    style SHOW fill:#4CAF50,color:#fff
    style DETAIL fill:#2196F3,color:#fff
    style ERR fill:#f44336,color:#fff
    style BACK fill:#4CAF50,color:#fff`;

const FLOW_LIST = `flowchart TD
    S1([Event Running Registered\\nPage Opened]) -->|"T1 · PP235-TC-001"| S2[API Request\\nfor Participant List]
    S2 -->|"T2 · PP235-TC-001 PP235-TC-002"| S3[Participant List\\nLoaded]
    S2 -->|"T3 · PP235-TC-007"| S4[Error / Empty State]

    S3 --> S5[Full List Displayed\\nregistered · confirmed · checked-in · cancelled]

    S5 -->|"T4 · PP235-TC-003"| S6[Search by Name]
    S5 -->|"T5 · PP235-TC-004 PP235-TC-005"| S7[Filter by Status]
    S5 -->|"T6 · PP235-TC-006"| S5

    S6 --> S8([Filtered List Shown])
    S7 --> S8

    style S3 fill:#4CAF50,color:#fff
    style S4 fill:#f44336,color:#fff
    style S8 fill:#4CAF50,color:#fff`;

const FLOW_DETAIL = `flowchart TD
    S9([Participant Row\\nin List]) -->|"T7 · PP235-TC-008"| S10[Participant Row Tapped]
    S10 -->|"T8 · PP235-TC-008 PP235-TC-009"| S11[Detail API Request]
    S11 -->|"T8 · PP235-TC-008"| S12[Participant Detail\\nPage Loaded]
    S12 -->|"T9 · PP235-TC-009 PP235-TC-010"| S13[Fields Shown:\\nName · Ticket Type · Payment Status · Check-in Status]
    S13 -->|"T10 · PP235-TC-011"| S14([Back to Participant List])

    style S12 fill:#2196F3,color:#fff
    style S13 fill:#4CAF50,color:#fff
    style S14 fill:#4CAF50,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Event Running Registered / Participants List',
  subtitle: 'End-to-end overview: load list → search/filter → tap row → detail → back',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-list',
    num: '2',
    title: 'Sub-Flow 1 · Participant List Display (AC1.1 / AC1.2)',
    subtitle: 'S1–S8 · T1–T6 · TC-001–007',
    chart: FLOW_LIST,
    states: [
      ['S1', 'Organizer navigates to Event Running Registered page'],
      ['S2', 'API request sent for participant list'],
      ['S3', 'Participant list loaded successfully'],
      ['S4', 'Error state — API failure / empty data'],
      ['S5', 'Full participant list displayed (all statuses)'],
      ['S6', 'Search input active'],
      ['S7', 'Filter by Status active'],
      ['S8', 'Filtered participant list displayed'],
    ],
    transitions: [
      ['T1', 'Page navigated to'],
      ['T2', 'API responds 200 with participant data'],
      ['T3', 'API error or no data returned'],
      ['T4', 'Organizer types search keyword'],
      ['T5', 'Organizer selects status filter'],
      ['T6', 'Filter / search cleared — full list restored'],
    ],
  },
  {
    sectionId: 'flow-detail',
    num: '3',
    title: 'Sub-Flow 2 · Participant Detail (AC2.1 / AC2.2)',
    subtitle: 'S9–S14 · T7–T10 · TC-008–011',
    chart: FLOW_DETAIL,
    states: [
      ['S9',  'Participant row visible in list'],
      ['S10', 'Organizer taps participant row'],
      ['S11', 'Participant Detail API request sent'],
      ['S12', 'Participant Detail page loaded'],
      ['S13', 'Detail fields rendered: Name, Ticket Type, Payment Status, Check-in Status'],
      ['S14', 'Organizer navigates back to participant list'],
    ],
    transitions: [
      ['T7',  'Tap participant row'],
      ['T8',  'Detail API responds with participant data'],
      ['T9',  'Detail fields verified'],
      ['T10', 'Back navigation'],
    ],
  },
];
