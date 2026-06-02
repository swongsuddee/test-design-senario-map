import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    START([Organizer logged in\\nto Backoffice]) --> LIST[Event List Page]
    LIST --> SEL[Select / tap Event]
    SEL --> API[GET /event/:id\\nAPI Call]
    API --> NET{API\\nResponse?}
    NET -->|Error 404| NOTFOUND([Error: Event Not Found])
    NET -->|Error 500| SERVERERR([Error: Server Error\\nRetry option])
    NET -->|Success| RENDER[Render Event Detail Page]
    RENDER --> TITLE[Event Name / Title]
    RENDER --> DATETIME[Date & Time Display]
    RENDER --> LOCATION[Location / Venue]
    RENDER --> IMAGES[Event Images]
    RENDER --> TICKETS[Ticket Types List]
    TITLE --> VIEW([Full Event Detail\\nDisplayed])
    DATETIME --> VIEW
    LOCATION --> VIEW
    IMAGES --> VIEW
    TICKETS --> VIEW

    style VIEW fill:#4CAF50,color:#fff
    style NOTFOUND fill:#f44336,color:#fff
    style SERVERERR fill:#f44336,color:#fff
    style RENDER fill:#2196F3,color:#fff`;

const FLOW_DETAIL = `flowchart TD
    S1([Event List\\nPage]) -->|"T1 · PP234-TC-001"| S2[Event Selected\\nAPI Call initiated]
    S2 -->|"T2 · PP234-TC-001"| S3[Event Detail\\nPage Loading]
    S3 -->|"T3 · PP234-TC-001"| S4[Event Name\\nDisplayed]
    S3 -->|"T3 · PP234-TC-001"| S5[Date & Time\\nDisplayed]
    S3 -->|"T3 · PP234-TC-001"| S6[Location / Venue\\nDisplayed]
    S3 -->|"T3 · PP234-TC-002"| S7[Event Images\\nDisplayed]
    S3 -->|"T3 · PP234-TC-003"| S8[Ticket Types\\nList Displayed]
    S4 -->|"T4 · PP234-TC-001"| S9([Full Event Detail\\nAll Fields Visible])
    S5 --> S9
    S6 --> S9
    S7 --> S9
    S8 --> S9

    style S9 fill:#4CAF50,color:#fff
    style S3 fill:#2196F3,color:#fff`;

const FLOW_API = `flowchart TD
    S10([GET event/:id\\nRequest Sent]) -->|"T5 · PP234-TC-001 PP234-TC-003"| S11[200 OK\\nEvent Data Received]
    S10 -->|"T6 · PP234-TC-006"| S12[404 Not Found]
    S10 -->|"T7 · PP234-TC-007"| S13[500 / Network Error]
    S11 -->|"T8 · PP234-TC-001"| S14[Data Bound\\nto UI Fields]
    S14 --> S9B([Event Detail\\nPage Ready])
    S12 --> S15([Error: Event\\nNot Found])
    S13 --> S16([Error: Server Error\\n+ Retry Option])

    style S9B fill:#4CAF50,color:#fff
    style S15 fill:#f44336,color:#fff
    style S16 fill:#f44336,color:#fff
    style S14 fill:#2196F3,color:#fff`;

const FLOW_CONTENT = `flowchart TD
    EVDATA([Event Data\\nReceived]) -->|"T9 · PP234-TC-002"| S17[Multiple Images\\nGallery shown]
    EVDATA -->|"T10 · PP234-TC-002"| S18[No Images\\nPlaceholder displayed]
    EVDATA -->|"T11 · PP234-TC-003"| S19[Multiple Ticket Types\\nFull list rendered]
    EVDATA -->|"T12 · PP234-TC-003"| S20[Single Ticket Type\\nOne row shown]
    EVDATA -->|"T13 · PP234-TC-005"| S21[No Ticket Types\\nEmpty state shown]

    style S17 fill:#4CAF50,color:#fff
    style S19 fill:#4CAF50,color:#fff
    style S18 fill:#FF9800,color:#fff
    style S21 fill:#FF9800,color:#fff`;

const FLOW_OWNERSHIP = `flowchart TD
    S22([Organizer accesses\\nEvent Detail]) -->|"T14 · PP234-TC-001 PP234-TC-004"| S23([Event detail shown\\nOwn event])
    S22 -->|"T15 · PP234-TC-008"| S24[Access to\\nanother's event attempted]
    S24 --> S25([Access Denied\\n403 or not in list])

    style S23 fill:#4CAF50,color:#fff
    style S25 fill:#f44336,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Organizer Event Detail',
  subtitle: 'End-to-end system overview: navigate → API call → render fields or error',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-detail',
    num: '2',
    title: 'Sub-Flow 1 · Event Detail Information Display (AC1.1)',
    subtitle: 'S1–S9 · T1–T4 · TC-001–003',
    chart: FLOW_DETAIL,
    states: [
      ['S1', 'Organizer on Event List page'],
      ['S2', 'Event selected — API call initiated'],
      ['S3', 'Event Detail page loading'],
      ['S4', 'Event Name displayed'],
      ['S5', 'Date & Time displayed'],
      ['S6', 'Location / Venue displayed'],
      ['S7', 'Event images displayed'],
      ['S8', 'Ticket Types list displayed'],
      ['S9', 'All event detail information visible'],
    ],
    transitions: [
      ['T1', 'Organizer selects event from list'],
      ['T2', 'API call initiated'],
      ['T3', 'API returns event data — page renders'],
      ['T4', 'All detail components mounted'],
    ],
  },
  {
    sectionId: 'flow-api',
    num: '3',
    title: 'Sub-Flow 2 · API Integration (AC1.2)',
    subtitle: 'S10–S16 · T5–T8 · TC-001, TC-003, TC-006, TC-007',
    chart: FLOW_API,
    states: [
      ['S10', 'GET /event/:id request sent'],
      ['S11', 'Response 200 — event data received'],
      ['S12', 'Response 404 — event not found'],
      ['S13', 'Response 500 / network error'],
      ['S14', 'Event data bound to UI fields'],
      ['S15', 'Error page shown — event not found'],
      ['S16', 'Error page shown — server error with retry'],
    ],
    transitions: [
      ['T5', 'Valid event ID → 200 OK'],
      ['T6', 'Invalid or deleted event ID → 404'],
      ['T7', 'Server error → 500 or network timeout'],
      ['T8', 'Bind API response data to UI'],
    ],
  },
  {
    sectionId: 'flow-content',
    num: '4',
    title: 'Sub-Flow 3 · Field-by-Field Content Validation',
    subtitle: 'S17–S21 · T9–T13 · TC-002, TC-003, TC-005',
    chart: FLOW_CONTENT,
    states: [
      ['S17', 'Event has multiple images — gallery shown'],
      ['S18', 'Event has no images — placeholder shown'],
      ['S19', 'Event has multiple ticket types — full list rendered'],
      ['S20', 'Event has a single ticket type — one row'],
      ['S21', 'Event has no ticket types — empty state'],
    ],
    transitions: [
      ['T9',  'Event images exist → gallery rendered'],
      ['T10', 'No images → placeholder / fallback shown'],
      ['T11', 'Multiple ticket types → full list rendered'],
      ['T12', 'Single ticket type → single row'],
      ['T13', 'No ticket types → empty state shown'],
    ],
  },
  {
    sectionId: 'flow-ownership',
    num: '5',
    title: 'Sub-Flow 4 · Data Freshness — Organizer Sees Own Event Only',
    subtitle: 'S22–S25 · T14–T15 · TC-001, TC-004, TC-008',
    chart: FLOW_OWNERSHIP,
    states: [
      ['S22', 'Organizer accesses their own event'],
      ['S23', 'Correct event data displayed (ownership validated)'],
      ['S24', 'Organizer attempts to access another organizer\'s event'],
      ['S25', 'Access denied / 403 or not visible in list'],
    ],
    transitions: [
      ['T14', 'Event belongs to authenticated Organizer'],
      ['T15', 'Event belongs to another Organizer'],
    ],
  },
];
