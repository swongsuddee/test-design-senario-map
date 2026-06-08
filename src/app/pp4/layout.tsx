import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';
import { CONFLICT_ITEMS } from '@/data/pp4/conflicts';
const CONFLICT_COUNT = CONFLICT_ITEMS.filter(i => i.status === 'pending' || i.status === 'on-hold').length;

export const metadata: Metadata = {
  title: 'PP-4 · Organizer Register & Login — Test Design',
  description: 'Test design for POPPA Back-Office Organizer Portal — 3-step registration wizard, profile identity verification (Individual / Corporate), verification status lifecycle, login RBAC, and re-submission flow.',
};

const NAV: NavSection[] = [
  {
    title: 'Docs',
    links: [
      { href: '#requirements',   label: 'Requirement'         },
      { href: '#conflict-notes', label: 'Conflicts & Clarify' },
    ],
  },
  {
    title: 'Overview',
    links: [
      { href: '#hero',       label: 'Summary' },
      { href: '#techniques', label: 'Technique Selection' },
      { href: '#coverage',   label: 'Coverage Summary' },
    ],
  },
  {
    title: 'Diagrams',
    links: [
      { href: '#master-flow',         label: 'Master Flow' },
      { href: '#flow-stg-nav',        label: 'Sub-Flow 1: STG Navigation' },
      { href: '#flow-verification',   label: 'Sub-Flow 2: Verification Lifecycle' },
      { href: '#flow-registration',   label: 'Sub-Flow 3: Registration & Validation' },
      { href: '#flow-status-machine', label: 'Sub-Flow 4: Status State Machine' },
      { href: '#flow-login-rbac',     label: 'Sub-Flow 5: Login & RBAC' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-reg-step1',         label: 'Registration Step 1/3' },
      { href: '#tc-reg-step2',         label: 'Registration Step 2/3' },
      { href: '#tc-reg-step3',         label: 'Registration Step 3/3' },
      { href: '#tc-profile-type',      label: 'Profile Type Selection' },
      { href: '#tc-profile-individual', label: 'Profile Individual' },
      { href: '#tc-secure-storage',    label: 'Secure Storage' },
      { href: '#tc-profile-corporate', label: 'Profile Corporate' },
      { href: '#tc-login-rbac',        label: 'Login & RBAC' },
      { href: '#tc-resubmit-edge',     label: 'Re-submission & Edge Cases' },
    ],
  },
  {
    title: 'Analysis',
    links: [
      { href: '#coverage-map', label: 'Coverage Report' },
      { href: '#automation',   label: 'Automation Notes' },
      { href: '#testdata',     label: 'Test Data' },
    ],
  },
  {
    title: 'Scenario Maps',
    links: [
      { href: '#smap-main', label: 'Scenario Map' },
    ],
  },
];

export default function PP4Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-4</span>
        <h1>Organizer Back-Office Register &amp; Login — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Back-Office (Organizer) · Web · Playwright</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar conflictCount={CONFLICT_COUNT} />{children}</main>
    </>
  );
}
