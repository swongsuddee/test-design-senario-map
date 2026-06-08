import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';
import { CONFLICT_ITEMS } from '@/data/pp170/conflicts';
const CONFLICT_COUNT = CONFLICT_ITEMS.filter(i => i.status === 'pending' || i.status === 'on-hold').length;

export const metadata: Metadata = {
  title: 'PP-170 · Document Review & Approval Logic — Test Design',
  description: 'End-to-end test design for POPPA Admin BO document review and approval logic: Agency type document display, Approve/Reject actions with reason validation, and internal audit log.',
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
      { href: '#master-flow',      label: 'Master Flow' },
      { href: '#flow-doc-display', label: 'Sub-Flow 1: Document Display' },
      { href: '#flow-approve',     label: 'Sub-Flow 2: Approve Agency' },
      { href: '#flow-reject',      label: 'Sub-Flow 3: Reject Agency' },
      { href: '#flow-log',         label: 'Sub-Flow 4: Audit Log' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-doc-display', label: 'Document Display' },
      { href: '#tc-approve',     label: 'Approve Agency' },
      { href: '#tc-reject',      label: 'Reject Agency' },
      { href: '#tc-log',         label: 'Audit Log' },
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

export default function PP170Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-170</span>
        <h1>Document Review &amp; Approval Logic — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Admin BO · Web Back Office · WebdriverIO + Mocha</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar conflictCount={CONFLICT_COUNT} />{children}</main>
    </>
  );
}
