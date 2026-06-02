import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    TOKEN["accessToken\\n(from POST verify-otp)"] --> GET_EV
    TOKEN --> SAVE_EV

    GET_EV["GET /api/v1/events\\n?q= &page= &limit="]
    GET_EV --> GE200["200 OK\\n{ data: Event[], meta: { total, page, limit } }"]
    GET_EV --> GE401["401 Unauthorized"]

    SAVE_EV["POST /api/v1/events/{eventId}/save\\npath param: eventId"]
    SAVE_EV --> SE200["200 OK\\n{ success: true, saved: boolean }"]
    SAVE_EV --> SE401["401 Unauthorized"]
    SAVE_EV --> SE404["404 Not Found\\n(non-existent eventId)"]

    style GE200 fill:#4CAF50,color:#fff
    style SE200 fill:#4CAF50,color:#fff
    style GE401 fill:#f44336,color:#fff
    style SE401 fill:#f44336,color:#fff
    style SE404 fill:#FF9800,color:#fff`;

const FLOW_GET_EVENTS = `flowchart TD
    S1(["valid accessToken"]) --> S2["GET /api/v1/events"]
    S2 --> S3{"200 OK?"}
    S3 -->|"UE-TC-001"| S4["data: Event[] + meta: { total, page, limit }"]
    S4 -->|"UE-TC-002"| S5["each event: id (required) + title (required)"]
    S2 -->|"?q=keyword · UE-TC-003"| S6["200 - filtered data array"]
    S2 -->|"?page=1&limit=5 · UE-TC-004"| S7["200 - meta.limit reflects param"]
    S2 -->|"?page=9999 · UE-TC-005"| S8["200 - empty data array"]
    S3 -->|"UE-TC-006"| S9["401 - no Authorization"]
    S3 -->|"UE-TC-007"| S10["401 - invalid token"]
    style S5 fill:#4CAF50,color:#fff
    style S6 fill:#4CAF50,color:#fff
    style S7 fill:#4CAF50,color:#fff
    style S8 fill:#4CAF50,color:#fff
    style S9 fill:#f44336,color:#fff
    style S10 fill:#f44336,color:#fff`;

const FLOW_SAVE_EVENT = `flowchart TD
    S1(["valid accessToken\\n+ known eventId"]) --> S2["POST /api/v1/events/{eventId}/save"]
    S2 --> S3{"200 OK?"}
    S3 -->|"UE-TC-008"| S4["{ success: true, saved: true }\\nfirst save"]
    S4 -->|"UE-TC-009"| S5["second POST same eventId\\n{ success: true, saved: boolean }\\ntoggle or idempotent"]
    S2 -->|"non-existent eventId · UE-TC-010"| S6["404 Not Found\\nor 200 with saved:false"]
    S3 -->|"UE-TC-011"| S7["401 - no Authorization"]
    S3 -->|"UE-TC-012"| S8["401 - invalid token"]
    style S4 fill:#4CAF50,color:#fff
    style S5 fill:#2196F3,color:#fff
    style S6 fill:#FF9800,color:#fff
    style S7 fill:#f44336,color:#fff
    style S8 fill:#f44336,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — User Event API',
  subtitle: 'GET /api/v1/events · POST /api/v1/events/{eventId}/save',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-get-events',
    num: '2',
    title: 'Sub-Flow 1 · GET /api/v1/events',
    subtitle: 'UE-TC-001–007 · list events · search · pagination · auth guard',
    chart: FLOW_GET_EVENTS,
    states: [
      ['S1', 'Valid accessToken'],
      ['S2', 'GET /api/v1/events'],
      ['S3', '200 OK response check'],
      ['S4', '200 — data + meta present'],
      ['S5', 'Each event has required id and title'],
      ['S6', '200 — filtered data with ?q= param'],
      ['S7', '200 — pagination reflected in meta'],
      ['S8', '200 — empty data array (page out of range)'],
      ['S9', '401 — no Authorization header'],
      ['S10', '401 — invalid token'],
    ],
    transitions: [
      ['T1', 'Default call → data array + meta'],
      ['T2', 'Response schema: id + title required on each event'],
      ['T3', 'Search query → filtered results'],
      ['T4', 'limit param respected in meta'],
      ['T5', 'Out-of-range page → empty data'],
      ['T6', 'No/bad token → 401'],
    ],
  },
  {
    sectionId: 'flow-save-event',
    num: '3',
    title: 'Sub-Flow 2 · POST /api/v1/events/{eventId}/save',
    subtitle: 'UE-TC-008–012 · save toggle · non-existent event · auth guard',
    chart: FLOW_SAVE_EVENT,
    states: [
      ['S1', 'Valid accessToken + known eventId'],
      ['S2', 'POST /api/v1/events/{eventId}/save'],
      ['S3', 'Response check'],
      ['S4', '200 — { success: true, saved: true } (first save)'],
      ['S5', '200 — second call (toggle or idempotent)'],
      ['S6', '404 or 200 — non-existent eventId'],
      ['S7', '401 — no Authorization'],
      ['S8', '401 — invalid token'],
    ],
    transitions: [
      ['T1', 'First save on valid eventId → saved:true'],
      ['T2', 'Second save → saved toggle (true/false TBD)'],
      ['T3', 'Non-existent eventId → 404 (unconfirmed)'],
      ['T4', 'No/bad token → 401'],
    ],
  },
];
