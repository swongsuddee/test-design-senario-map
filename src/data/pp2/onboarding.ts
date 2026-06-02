import type { DagEdge, DagNode, Scenario } from '@/types';

export const OB_NODES: DagNode[] = [
  { id: 'S22', col: 0, row: 0, name: 'New User\nDetected',  type: 'action',   details: 'Auth succeeded; user not in DB → onboarding.' },
  { id: 'S23', col: 1, row: 0, name: 'PDPA\nConsent',       type: 'action',   details: 'Terms & Privacy screen. Must accept to proceed.' },
  { id: 'S24', col: 1, row: 1, name: 'Cannot\nProceed',     type: 'expect',   details: 'PDPA declined / skipped → blocked on consent screen.' },
  { id: 'S25', col: 2, row: 0, name: 'Basic\nIdentity',     type: 'action',   details: 'Name, DOB (AD, ≥18), Gender. All fields required.' },
  { id: 'S26', col: 2, row: 1, name: 'Validation\nError',   type: 'expect',   details: 'Invalid name / future DOB / no gender selected.' },
  { id: 'S27', col: 3, row: 0, name: 'Social\nLogin?',      type: 'decision', details: 'Was auth via social provider? Phone verify needed.' },
  { id: 'S28', col: 3, row: 1, name: 'Phone\nVerify',       type: 'action',   details: 'Social users must verify phone number via OTP.' },
  { id: 'S30', col: 4, row: 0, name: 'Interests',           type: 'action',   details: 'Select 1–3 interests. BVA: 0 blocked, 4+ blocked.' },
  { id: 'S31', col: 5, row: 0, name: 'Save\nProfile',       type: 'action',   details: 'Profile + interests written to DB.' },
  { id: 'S32', col: 6, row: 0, name: 'Home\nPage',          type: 'expect',   details: 'Onboarding complete. Session active.' },
];

export const OB_EDGES: DagEdge[] = [
  { from: 'S22', to: 'S23', label: '' },
  { from: 'S23', to: 'S25', label: 'Accept' },
  { from: 'S23', to: 'S24', label: 'Decline' },
  { from: 'S25', to: 'S26', label: 'Invalid' },
  { from: 'S26', to: 'S25', label: 'Fix' },
  { from: 'S25', to: 'S27', label: 'Valid' },
  { from: 'S27', to: 'S28', label: 'Yes' },
  { from: 'S27', to: 'S30', label: 'No' },
  { from: 'S28', to: 'S30', label: 'Verified' },
  { from: 'S30', to: 'S31', label: 'Done' },
  { from: 'S31', to: 'S32', label: '' },
];

export const OB_SCENARIOS: Scenario[] = [
  {
    id: 'PP2-TC-021', typeCls: 'smoke', type: 'Functional',
    name: 'PDPA is first screen after new user auth',
    steps: [
      { action: 'Complete auth as new user',  data: '—', expect: 'PDPA Consent screen is the first screen' },
      { action: 'Verify screen content',      data: '—', expect: 'Terms and Privacy text; Accept button present' },
    ],
    activePath:  ['S22','S23'],
    activeEdges: [['S22','S23']],
  },
  {
    id: 'PP2-TC-022', typeCls: 'high', type: 'Functional',
    name: 'Accepting PDPA navigates to Basic Identity; declining blocks',
    steps: [
      { action: 'Attempt to navigate past PDPA without accepting', data: '—', expect: 'Cannot proceed; PDPA screen remains' },
      { action: 'Tap Accept',                                      data: '—', expect: 'Navigates to Basic Identity screen' },
    ],
    activePath:  ['S23','S24','S25'],
    activeEdges: [['S23','S24'],['S23','S25']],
  },
  {
    id: 'PP2-TC-023', typeCls: 'high', type: 'Negative',
    name: 'Empty display name — inline error on Next tap',
    steps: [
      { action: 'Leave Display Name empty; tap Next', data: '—',       expect: 'Inline error shown on Name field' },
      { action: 'Enter valid display name',           data: 'Test User',expect: 'Error clears' },
    ],
    activePath:  ['S25','S26'],
    activeEdges: [['S25','S26']],
  },
  {
    id: 'PP2-TC-024', typeCls: 'high', type: 'Negative',
    name: 'Future DOB rejected; valid past date accepted',
    steps: [
      { action: 'Enter a future date as DOB',                    data: '01/01/2030', expect: 'Error: date of birth cannot be in the future' },
      { action: 'Enter a valid past date (DD/MM/YYYY AD)',       data: '01/01/1990', expect: 'Date accepted; error cleared' },
    ],
    activePath:  ['S25','S26'],
    activeEdges: [['S25','S26']],
  },
  {
    id: 'PP2-TC-025', typeCls: 'high', type: 'Functional',
    name: 'DOB uses AD year — not Buddhist Era',
    steps: [
      { action: 'Enter DOB with AD year',          data: '01/01/1990', expect: 'Year displayed as 1990 (not 2533)' },
      { action: 'Verify stored value via API',     data: '—',          expect: 'Year stored as AD integer (1990)' },
    ],
    activePath:  ['S25','S27'],
    activeEdges: [['S25','S27']],
  },
  {
    id: 'PP2-TC-026', typeCls: 'high', type: 'Negative',
    name: 'No gender selected — error on Next tap',
    steps: [
      { action: 'Fill name and DOB; tap Next without selecting gender', data: '—', expect: 'Inline error shown on gender field' },
      { action: 'Select any gender option',                             data: '—', expect: 'Error clears' },
    ],
    activePath:  ['S25','S26'],
    activeEdges: [['S25','S26']],
  },
  {
    id: 'PP2-TC-027', typeCls: 'high', type: 'Functional',
    name: 'Social login user — phone verification required before Interests',
    steps: [
      { action: 'Complete Basic Identity screen; tap Next',  data: '—', expect: 'Phone Verification screen appears (not Interests)' },
      { action: 'Enter phone number and complete OTP',       data: '—', expect: 'Phone verified' },
      { action: 'Observe next screen',                       data: '—', expect: 'Interests Selection screen appears' },
    ],
    activePath:  ['S25','S27','S28','S30'],
    activeEdges: [['S25','S27'],['S27','S28'],['S28','S30']],
  },
  {
    id: 'PP2-TC-028', typeCls: 'bva', type: 'Boundary',
    name: 'Done button disabled until at least 1 interest selected (BVA lower boundary)',
    steps: [
      { action: 'Observe Done button with 0 interests', data: '0 selected', expect: 'Done button disabled' },
      { action: 'Select 1 interest',                    data: '1 selected', expect: 'Done button becomes enabled' },
    ],
    activePath:  ['S30'],
    activeEdges: [],
  },
  {
    id: 'PP2-TC-029', typeCls: 'bva', type: 'Boundary',
    name: '4th interest blocked after 3 selected (BVA upper boundary)',
    steps: [
      { action: 'Select 3 different interests', data: '3 selected', expect: 'All 3 selected; count = 3' },
      { action: 'Tap a 4th interest',           data: '4th tap',    expect: 'Selection blocked; count remains 3' },
    ],
    activePath:  ['S30'],
    activeEdges: [],
  },
  {
    id: 'PP2-TC-030', typeCls: 'smoke', type: 'Functional',
    name: 'Complete onboarding — profile saved; Home shown',
    steps: [
      { action: 'Select 1–3 interests; tap Done', data: '1–3 selected', expect: 'Profile and interests saved to DB' },
      { action: 'Observe navigation',             data: '—',            expect: 'Home page displayed' },
      { action: 'Re-launch app',                  data: '—',            expect: 'Auto-login to Home; session active' },
    ],
    activePath:  ['S30','S31','S32'],
    activeEdges: [['S30','S31'],['S31','S32']],
  },
  {
    id: 'PP2-TC-040', typeCls: 'bva', type: 'Boundary',
    name: 'DOB = today — rejected (BVA; age = 0) ▲ New',
    steps: [
      { action: "Enter today's date as DOB", data: 'today', expect: 'Error: user must be at least 18 years old' },
    ],
    activePath:  ['S25','S26'],
    activeEdges: [['S25','S26']],
  },
  {
    id: 'PP2-TC-041', typeCls: 'bva', type: 'Boundary',
    name: 'DOB exactly 18 years ago today — accepted (BVA lower boundary) ▲ New',
    steps: [
      { action: 'Enter DOB = today minus exactly 18 years',  data: 'today − 18y',     expect: 'DOB accepted; no error shown' },
      { action: 'Enter DOB = today minus 18 years + 1 day', data: 'today − 18y + 1d', expect: 'Error: user must be at least 18 years old' },
    ],
    activePath:  ['S25','S27'],
    activeEdges: [['S25','S27']],
  },
];
