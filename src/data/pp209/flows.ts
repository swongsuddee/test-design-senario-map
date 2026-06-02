import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    LOGIN([User logs in successfully]) --> HOME[Home Page loads]
    HOME --> SECTIONS[Render 9 sections\\nCI / Mood & Tone / Logo]

    SECTIONS --> SEARCH[Section 1: ค้นหาสถานที่ / ค้นหา]
    SECTIONS --> FEED[Section 2: สร้าง Post / Feed Post]
    SECTIONS --> INTEREST[Section 3: Interest Group]
    SECTIONS --> EVENTS[Section 4: Event List\\nbased on User Interests]
    SECTIONS --> BOTTOM[Section 5: Bottom Menu]

    EVENTS --> INTEREST_CHECK{User has\\nInterests set?}
    INTEREST_CHECK -->|Yes| PERSONALIZED([Event List filtered\\nby User Interests])
    INTEREST_CHECK -->|No| GENERIC([Default Event List\\nno filter])

    BOTTOM --> NAV{Bottom Menu\\nitem tapped}
    NAV -->|Home| HOME
    NAV -->|Search| SEARCH_PAGE([Search Page])
    NAV -->|Notifications| NOTIF_PAGE([Notifications Page])
    NAV -->|Profile| PROFILE_PAGE([Profile Page])

    style PERSONALIZED fill:#4CAF50,color:#fff
    style HOME fill:#2196F3,color:#fff
    style SEARCH_PAGE fill:#4CAF50,color:#fff
    style NOTIF_PAGE fill:#4CAF50,color:#fff
    style PROFILE_PAGE fill:#4CAF50,color:#fff`;

const FLOW_SECTIONS_DISPLAY = `flowchart TD
    S1([User authenticated]) -->|"T1 · PP209-TC-001"| S2[Home page loading]
    S2 -->|"T2 · PP209-TC-001"| S3[Home page fully rendered]
    S3 --> S4[Search bar visible]
    S3 --> S5[Feed Post section visible]
    S3 --> S6[Interest Group section visible]
    S3 --> S7[Event List section visible]
    S3 --> S8[Bottom Menu visible]
    S3 -->|"T3 · PP209-TC-001"| S9([UI matches CI / Mood & Tone\\nLogo correct])

    style S9 fill:#4CAF50,color:#fff
    style S3 fill:#2196F3,color:#fff`;

const FLOW_INTEREST = `flowchart TD
    S10([Home page open]) --> S10B{User Interests\\nconfigured?}
    S10B -->|"T4 · PP209-TC-002"| S11[Interests present\\ne.g. Running, Yoga]
    S11 -->|"T5 · PP209-TC-002"| S12[Discovery API called\\nwith interest filter]
    S12 --> S13([Event List shows\\nmatching events])

    S10B -->|"T6 · PP209-TC-003"| S14[No interests set]
    S14 -->|"T7 · PP209-TC-003"| S15[Discovery API called\\nno filter]
    S15 --> S16([Default Event List\\nshown])

    style S13 fill:#4CAF50,color:#fff
    style S16 fill:#4CAF50,color:#fff`;

const FLOW_BOTTOM_MENU = `flowchart TD
    S17([User on Home]) --> S18[Bottom Menu rendered\\nHome / Search / Notif / Profile]
    S18 -->|"T8 · PP209-TC-004"| S19[Home tab tapped]
    S19 --> S20([Home page — no change\\nor re-render])
    S18 -->|"T9 · PP209-TC-005"| S21[Search tab tapped]
    S21 --> S22([Search page opens])
    S18 -->|"T10 · PP209-TC-006"| S23[Notifications tab tapped]
    S23 --> S24([Notifications page opens])
    S18 -->|"T11 · PP209-TC-007"| S25[Profile tab tapped]
    S25 --> S26([Profile page opens])

    style S20 fill:#4CAF50,color:#fff
    style S22 fill:#4CAF50,color:#fff
    style S24 fill:#4CAF50,color:#fff
    style S26 fill:#4CAF50,color:#fff`;

const FLOW_BRANDING = `flowchart TD
    S27([Home page rendered]) -->|"T12 · PP209-TC-001"| S28[POPPA Logo visible\\ncorrect position]
    S28 --> S29[Colour palette\\nmatches CI]
    S29 --> S30([Typography\\nmatches Mood & Tone])

    style S30 fill:#4CAF50,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Home Main Page',
  subtitle: 'End-to-end system overview',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-sections-display',
    num: '2',
    title: 'Sub-Flow 1 · Home Page Display — All Sections',
    subtitle: 'S1–S9 · T1–T3 · TC-001',
    chart: FLOW_SECTIONS_DISPLAY,
    states: [
      ['S1', 'User authenticated — navigates to Home'],
      ['S2', 'Home page loading'],
      ['S3', 'Home page fully rendered'],
      ['S4', 'Search bar / location search visible'],
      ['S5', 'Post / Feed Post section visible (IG Story style)'],
      ['S6', 'Interest Group section visible'],
      ['S7', 'Event List section visible'],
      ['S8', 'Bottom Menu visible with all items'],
      ['S9', 'UI matches CI / Mood & Tone / Logo specification'],
    ],
    transitions: [
      ['T1', 'Login success → navigate to Home'],
      ['T2', 'API calls complete — sections rendered'],
      ['T3', 'UI validated against Figma spec'],
    ],
  },
  {
    sectionId: 'flow-interest',
    num: '3',
    title: 'Sub-Flow 2 · Event List Personalised by Interest',
    subtitle: 'S10–S16 · T4–T7 · TC-002–003',
    chart: FLOW_INTEREST,
    states: [
      ['S10', 'Home page open'],
      ['S11', 'User has Interests configured'],
      ['S12', 'Event discovery API called with interest filter'],
      ['S13', 'Personalised Event List displayed'],
      ['S14', 'User has NO Interests configured'],
      ['S15', 'Event discovery API called — no filter'],
      ['S16', 'Default / generic Event List displayed'],
    ],
    transitions: [
      ['T4', 'User has interests — filter applied'],
      ['T5', 'Events matching interests returned'],
      ['T6', 'User has no interests — no filter'],
      ['T7', 'Default event list returned'],
    ],
  },
  {
    sectionId: 'flow-bottom-menu',
    num: '4',
    title: 'Sub-Flow 3 · Bottom Menu Navigation',
    subtitle: 'S17–S26 · T8–T11 · TC-004–007',
    chart: FLOW_BOTTOM_MENU,
    states: [
      ['S17', 'User on Home Page'],
      ['S18', 'Bottom Menu rendered'],
      ['S19', 'Home tab tapped'],
      ['S20', 'Stays on / returns to Home'],
      ['S21', 'Search tab tapped'],
      ['S22', 'Search page opens'],
      ['S23', 'Notifications tab tapped'],
      ['S24', 'Notifications page opens'],
      ['S25', 'Profile tab tapped'],
      ['S26', 'Profile page opens'],
    ],
    transitions: [
      ['T8',  'Home tab tap → stay on Home'],
      ['T9',  'Search tab tap → navigate to Search'],
      ['T10', 'Notifications tab tap → navigate to Notifications'],
      ['T11', 'Profile tab tap → navigate to Profile'],
    ],
  },
  {
    sectionId: 'flow-branding',
    num: '5',
    title: 'Sub-Flow 4 · CI / Branding Compliance',
    subtitle: 'S27–S30 · T12 · TC-001',
    chart: FLOW_BRANDING,
    states: [
      ['S27', 'Home page rendered'],
      ['S28', 'POPPA Logo shown correctly'],
      ['S29', 'Colour palette matches CI spec'],
      ['S30', 'Typography matches Mood & Tone spec'],
    ],
    transitions: [
      ['T12', 'Page render complete — assert visual elements'],
    ],
  },
];
