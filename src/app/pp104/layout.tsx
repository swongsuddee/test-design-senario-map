import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import type { NavSection } from '@/components/Sidebar';
import TabBar from '@/components/TabBar';
import { CONFLICT_ITEMS } from '@/data/pp104/conflicts';
const CONFLICT_COUNT = CONFLICT_ITEMS.filter(i => i.status === 'pending' || i.status === 'on-hold').length;

export const metadata: Metadata = {
  title: 'PP-104 · Agency Verification Listing (Admin BO) — Test Design',
  description: 'Test design for POPPA Backoffice Admin Portal — Agency Verification Listing: table display, search, filter by status, review navigation, and RBAC guard.',
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
      { href: '#master-flow',    label: 'Master Flow' },
      { href: '#flow-dashboard', label: 'Sub-Flow 1: Dashboard List' },
      { href: '#flow-search',    label: 'Sub-Flow 2: Search by Name' },
      { href: '#flow-filter',    label: 'Sub-Flow 3: Filter by Status' },
      { href: '#flow-review',    label: 'Sub-Flow 4: Review Action' },
      { href: '#flow-rbac',      label: 'Sub-Flow 5: RBAC Guard' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-dashboard', label: 'Dashboard List' },
      { href: '#tc-search',    label: 'Search by Name' },
      { href: '#tc-filter',    label: 'Filter by Status' },
      { href: '#tc-review',    label: 'Review Navigation' },
      { href: '#tc-empty',     label: 'Empty State' },
      { href: '#tc-rbac',      label: 'RBAC Guard' },
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

export default function PP104Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-104</span>
        <h1>Agency Verification Listing (Admin BO) — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Backoffice · Web Admin Portal · WebdriverIO</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar conflictCount={CONFLICT_COUNT} />{children}</main>
    </>
  );
}
