import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    START([Agency logs in to BO]) --> PROFILE[Open Profile / Documents Section]
    PROFILE --> TYPE{Agency Type?}

    TYPE -->|Individual| IND[Show Individual Documents\\n+ Book Bank Upload Field]
    TYPE -->|Corporate| CORP[Show Corporate Documents\\n+ Book Bank Upload Field]

    IND --> UPLOAD[Agency clicks Upload Book Bank]
    CORP --> UPLOAD

    UPLOAD --> SELECT[Select File from Device]
    SELECT --> VALID{File valid?\\nPDF/JPG/PNG ≤ 10 MB}

    VALID -->|Yes| SUCCESS([Upload Success\\nPreview / Status shown])
    VALID -->|No — wrong type| ERR_TYPE([Error: Unsupported file type])
    VALID -->|No — too large| ERR_SIZE([Error: File exceeds 10 MB])

    style SUCCESS fill:#4CAF50,color:#fff
    style ERR_TYPE fill:#f44336,color:#fff
    style ERR_SIZE fill:#f44336,color:#fff
    style UPLOAD fill:#2196F3,color:#fff`;

const FLOW_VISIBILITY = `flowchart TD
    S1([Agency authenticated]) -->|"T1 · PP136-TC-001 PP136-TC-002"| S2[Profile / Documents page loading]
    S2 --> S2B{Page loaded\\nsuccessfully?}
    S2B -->|"T2 · PP136-TC-001"| S3[Agency Type: Individual]
    S2B -->|"T3 · PP136-TC-002"| S4[Agency Type: Corporate]
    S3 -->|"T4 · PP136-TC-001"| S5([Book Bank Upload field\\nvisible — Individual])
    S4 -->|"T4 · PP136-TC-002"| S6([Book Bank Upload field\\nvisible — Corporate])

    style S5 fill:#4CAF50,color:#fff
    style S6 fill:#4CAF50,color:#fff`;

const FLOW_VALID_UPLOAD = `flowchart TD
    S7([Upload button clicked]) -->|"T5"| S8[File picker opens]
    S8 -->|"T6 · PP136-TC-003"| S9[File selected]
    S9 -->|"T7 · PP136-TC-003"| S10{File type\\nPDF/JPG/PNG?}
    S10 -->|Yes| S11{File size\\n≤ 10 MB?}
    S11 -->|"T8 · PP136-TC-003"| S12[Upload in progress\\nPOST /book-bank]
    S12 -->|"T9 · PP136-TC-003"| S13([Upload success\\nPreview / status shown])

    style S13 fill:#4CAF50,color:#fff
    style S12 fill:#2196F3,color:#fff`;

const FLOW_INVALID = `flowchart TD
    SEL([File selected]) --> FTYPE{File type\\nwhitelisted?}
    FTYPE -->|"T10 · PP136-TC-004"| S14[Invalid type\\ne.g. .exe .zip]
    S14 -->|"T11 · PP136-TC-004"| S15{Reject}
    S15 --> S16([Error: Unsupported file type\\nmessage shown])

    FTYPE -->|Valid type| FSIZE{File size\\n≤ 10 MB?}
    FSIZE -->|"T12 · PP136-TC-005"| S17[File > 10 MB]
    S17 -->|"T13 · PP136-TC-005"| S18{Reject}
    S18 --> S19([Error: File exceeds 10 MB\\nmessage shown])

    style S16 fill:#f44336,color:#fff
    style S19 fill:#f44336,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Update Book Bank Account',
  subtitle: 'End-to-end system overview',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-visibility',
    num: '2',
    title: 'Sub-Flow 1 · Book Bank Upload Field Visibility',
    subtitle: 'S1–S6 · T1–T4 · TC-001–002',
    chart: FLOW_VISIBILITY,
    states: [
      ['S1', 'Agency authenticated in BO'],
      ['S2', 'Profile / Documents page loaded'],
      ['S3', 'Agency type resolved: Individual'],
      ['S4', 'Agency type resolved: Corporate'],
      ['S5', 'Book Bank Upload field displayed (Individual)'],
      ['S6', 'Book Bank Upload field displayed (Corporate)'],
    ],
    transitions: [
      ['T1', 'Navigate to Profile / Documents section'],
      ['T2', 'Agency type = Individual'],
      ['T3', 'Agency type = Corporate'],
      ['T4', 'Page load success → field rendered'],
    ],
  },
  {
    sectionId: 'flow-valid-upload',
    num: '3',
    title: 'Sub-Flow 2 · Valid File Upload',
    subtitle: 'S7–S13 · T5–T9 · TC-003',
    chart: FLOW_VALID_UPLOAD,
    states: [
      ['S7',  'Agency clicks Upload Book Bank'],
      ['S8',  'File picker opened'],
      ['S9',  'File selected'],
      ['S10', 'File type validation'],
      ['S11', 'File size validation'],
      ['S12', 'Upload in progress'],
      ['S13', 'Upload success — preview/status shown'],
    ],
    transitions: [
      ['T5', 'Click Upload button'],
      ['T6', 'File selected by user'],
      ['T7', 'File type is PDF / JPG / PNG'],
      ['T8', 'File size ≤ 10 MB'],
      ['T9', 'API upload returns success'],
    ],
  },
  {
    sectionId: 'flow-invalid',
    num: '4',
    title: 'Sub-Flow 3 · Invalid File Rejection',
    subtitle: 'S14–S19 · T10–T13 · TC-004–005',
    chart: FLOW_INVALID,
    states: [
      ['S14', 'Invalid file type selected (.exe, .zip, etc.)'],
      ['S15', 'File type rejected by system'],
      ['S16', 'Error message shown — unsupported type'],
      ['S17', 'File exceeds 10 MB'],
      ['S18', 'File size rejected by system'],
      ['S19', 'Error message shown — file too large'],
    ],
    transitions: [
      ['T10', 'User selects unsupported file type'],
      ['T11', 'System rejects: type not in whitelist'],
      ['T12', 'User selects oversized file'],
      ['T13', 'System rejects: size > 10 MB'],
    ],
  },
];
