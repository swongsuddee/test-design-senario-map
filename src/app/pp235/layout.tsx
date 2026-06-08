import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';

export const metadata: Metadata = {
  title: 'PP-235 · Event Running Registered / Participants List (Web BO) — Test Design',
  description: 'Test design for POPPA Backoffice Organizer — Event Running Registered page: participant list display, search, filter by status, participant detail, and back navigation.',
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
      { href: '#master-flow', label: 'Master Flow' },
      { href: '#flow-list',   label: 'Sub-Flow 1: Participant List Display' },
      { href: '#flow-detail', label: 'Sub-Flow 2: Participant Detail' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-list-load',    label: 'List — Initial Load' },
      { href: '#tc-search-filter', label: 'Search & Filter' },
      { href: '#tc-error',        label: 'API Error State' },
      { href: '#tc-detail',       label: 'Participant Detail' },
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

export default function PP235Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-235</span>
        <h1>Event Running Registered / Participants List (Web BO) — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Web BO · Organizer Portal · Playwright TypeScript</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
