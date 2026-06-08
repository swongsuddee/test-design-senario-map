import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';
import { CONFLICT_ITEMS } from '@/data/pp171/conflicts';
const CONFLICT_COUNT = CONFLICT_ITEMS.filter(i => i.status === 'pending' || i.status === 'on-hold').length;

export const metadata: Metadata = {
  title: 'PP-171 · Permission Activation — Test Design',
  description: 'End-to-end test design for POPPA Permission Activation: Create Event access control by approval status, onboarding notification, corporate document gate, audit trail, RBAC enforcement, and Admin event approval flow.',
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
      { href: '#master-flow',          label: 'Master Flow' },
      { href: '#flow-access-control',  label: 'Sub-Flow 1: Access Control' },
      { href: '#flow-onboarding',      label: 'Sub-Flow 2: Onboarding Notification' },
      { href: '#flow-corp-docs',       label: 'Sub-Flow 3: Corporate Doc Gate' },
      { href: '#flow-audit',           label: 'Sub-Flow 4: Audit Trail' },
      { href: '#flow-rbac',            label: 'Sub-Flow 5: RBAC' },
      { href: '#flow-event-list',      label: 'Sub-Flow 6: Event List' },
      { href: '#flow-event-approve',   label: 'Sub-Flow 7: Event Approve/Reject' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-access-control', label: 'Access Control' },
      { href: '#tc-onboarding',     label: 'Onboarding Notification' },
      { href: '#tc-corp-docs',      label: 'Corporate Doc Gate' },
      { href: '#tc-audit',          label: 'Audit Trail' },
      { href: '#tc-rbac',           label: 'RBAC Enforcement' },
      { href: '#tc-event-list',     label: 'Event List' },
      { href: '#tc-event-approve',  label: 'Event Approve/Reject' },
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

export default function PP171Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-171</span>
        <h1>Permission Activation — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Admin BO + Agency BO · Web Back Office · WebdriverIO + Mocha</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar conflictCount={CONFLICT_COUNT} />{children}</main>
    </>
  );
}
