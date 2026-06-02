import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    START([POC Initiated]) --> EVAL[Evaluate Chat Solution\\nOptions for Platform]
    EVAL --> SELECT{Chat solution\\nselected?}
    SELECT -->|Yes| INTEGRATE[Integrate Chat SDK\\nor Custom Solution into App]
    SELECT -->|No| ASSESS([Document Findings\\n& Recommendations\\nfor Team])

    INTEGRATE --> OPEN_CHAT[Open Chat UI\\nRendered in App]
    OPEN_CHAT --> BASIC{Basic chat\\nfunctions work?}

    BASIC -->|Yes| SEND_MSG[User can send\\na message]
    BASIC -->|No| FAIL([POC Failed\\nDocument blockers])

    SEND_MSG --> RECV_MSG[Message received\\nby other participant]
    RECV_MSG --> RESULT([POC Successful\\nDocument conclusions\\n& feasibility report])

    style RESULT fill:#4CAF50,color:#fff
    style ASSESS fill:#FF9800,color:#fff
    style FAIL fill:#f44336,color:#fff
    style OPEN_CHAT fill:#2196F3,color:#fff`;

const FLOW_EVALUATION = `flowchart TD
    S1([POC scope defined]) -->|"T1 · PP36-TC-001"| S2[Chat solution\\ncandidates identified]
    S2 -->|"T2 · PP36-TC-001"| S3[Feasibility analysis\\nplatform compat · cost · SDK]
    S3 -->|"T3 · PP36-TC-001"| S4([Solution selected\\nfor integration])
    S3 -->|"T4 · PP36-TC-001"| S5([No suitable solution\\ndocumented for team])

    style S4 fill:#4CAF50,color:#fff
    style S5 fill:#FF9800,color:#fff
    style S3 fill:#2196F3,color:#fff`;

const FLOW_INTEGRATION = `flowchart TD
    S6[Chat SDK integrated\\nin Flutter app] -->|"T5 · PP36-TC-002"| S7[Chat UI screen\\naccessible in app]
    S7 -->|"T6 · PP36-TC-002"| S8[User opens\\nchat room]
    S8 -->|"T7 · PP36-TC-003"| S9[User sends\\ntext message]
    S9 -->|"T8 · PP36-TC-003"| S10[Message displayed\\nin chat bubble]
    S10 -->|"T9 · PP36-TC-004"| S11([Message received\\nby other participant])
    S6 -->|"T10 · PP36-TC-005"| S12([Integration fails\\nSDK error / UI crash])

    style S11 fill:#4CAF50,color:#fff
    style S12 fill:#f44336,color:#fff
    style S8 fill:#2196F3,color:#fff`;

const FLOW_OUTCOME = `flowchart TD
    S13([POC Testing\\ncompleted]) -->|"T11 · PP36-TC-006"| S14[Findings documented\\nfeasibility · limitations · risks]
    S14 -->|"T12 · PP36-TC-006"| S15[Recommendation report\\nshared with team]
    S15 -->|"T13 · PP36-TC-006"| S16([Team proceeds\\nwith solution])
    S15 -->|"T14 · PP36-TC-006"| S17([Team rejects\\nalternative required])

    style S16 fill:#4CAF50,color:#fff
    style S17 fill:#FF9800,color:#fff
    style S14 fill:#2196F3,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — POC Open Chat',
  subtitle: 'End-to-end POC lifecycle overview',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-evaluation',
    num: '2',
    title: 'Sub-Flow 1 · Chat Solution Evaluation',
    subtitle: 'S1–S5 · T1–T4 · TC-001',
    chart: FLOW_EVALUATION,
    states: [
      ['S1', 'POC scope defined'],
      ['S2', 'Chat solution candidates identified'],
      ['S3', 'Feasibility analysis performed (platform compat · cost · SDK support)'],
      ['S4', 'Solution selected for integration'],
      ['S5', 'No suitable solution — documented for team'],
    ],
    transitions: [
      ['T1', 'Identify candidate chat solutions'],
      ['T2', 'Evaluate each solution against platform requirements'],
      ['T3', 'Select best-fit solution'],
      ['T4', 'No solution meets criteria — stop and document'],
    ],
  },
  {
    sectionId: 'flow-integration',
    num: '3',
    title: 'Sub-Flow 2 · Open Chat Integration & UI',
    subtitle: 'S6–S12 · T5–T10 · TC-002–005',
    chart: FLOW_INTEGRATION,
    states: [
      ['S6',  'Chat SDK / solution integrated into Flutter app'],
      ['S7',  'Chat UI screen accessible in app'],
      ['S8',  'User can open a chat room / conversation'],
      ['S9',  'User sends a text message'],
      ['S10', 'Message delivered and displayed in chat'],
      ['S11', 'Other participant receives message'],
      ['S12', 'Integration fails — SDK error or UI crash'],
    ],
    transitions: [
      ['T5',  'SDK added to pubspec and configured'],
      ['T6',  'Navigate to Chat screen'],
      ['T7',  'Open a chat room'],
      ['T8',  'Send text message'],
      ['T9',  'Message delivered to recipient'],
      ['T10', 'SDK throws exception or UI crashes'],
    ],
  },
  {
    sectionId: 'flow-outcome',
    num: '4',
    title: 'Sub-Flow 3 · POC Outcome & Documentation',
    subtitle: 'S13–S17 · T11–T14 · TC-006',
    chart: FLOW_OUTCOME,
    states: [
      ['S13', 'POC testing completed'],
      ['S14', 'Findings documented (feasibility, limitations, risks)'],
      ['S15', 'Recommendation report shared with team'],
      ['S16', 'Team decides to proceed with solution'],
      ['S17', 'Team decides not to proceed — alternative required'],
    ],
    transitions: [
      ['T11', 'POC results evaluated'],
      ['T12', 'Feasibility report created'],
      ['T13', 'Team reviews and decides to adopt'],
      ['T14', 'Team reviews and decides to reject'],
    ],
  },
];
