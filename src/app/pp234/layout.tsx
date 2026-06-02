import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import type { NavSection } from '@/components/Sidebar';
import TabBar from '@/components/TabBar';

export const metadata: Metadata = {
  title: 'PP-234 · Organizer Event Detail (Web BO) — Test Design',
  description: 'Test design for POPPA Backoffice Organizer Event Detail page — field rendering, API integration, image/ticket variants, error handling, and access control.',
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
      { href: '#flow-detail',    label: 'Sub-Flow 1: Event Detail Display' },
      { href: '#flow-api',       label: 'Sub-Flow 2: API Integration' },
      { href: '#flow-content',   label: 'Sub-Flow 3: Field Content Validation' },
      { href: '#flow-ownership', label: 'Sub-Flow 4: Ownership / Access Control' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-core-fields',  label: 'Core Fields' },
      { href: '#tc-ticket-types', label: 'Ticket Types' },
      { href: '#tc-api-errors',   label: 'API Errors' },
      { href: '#tc-ownership',    label: 'Ownership' },
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

export default function PP234Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-234</span>
        <h1>Organizer Event Detail (Web BO) — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Web BO · Organizer Portal · Playwright TypeScript</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
