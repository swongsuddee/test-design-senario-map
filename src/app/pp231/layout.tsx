import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import type { NavSection } from '@/components/Sidebar';
import TabBar from '@/components/TabBar';

export const metadata: Metadata = {
  title: 'PP-231 · Organizer Dashboard / Event Detail Dashboard (Web BO) — Test Design',
  description: 'Test design for POPPA Backoffice Organizer Event Detail Dashboard — metrics display (Pie Chart, Revenue, Tickets Sold, Participants, Ticket Metrics table), date range filtering, data accuracy, and CQRS read model correctness.',
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
      { href: '#master-flow',   label: 'Master Flow' },
      { href: '#flow-metrics',  label: 'Sub-Flow 1: Dashboard Metrics Display' },
      { href: '#flow-pie',      label: 'Sub-Flow 2: Pie Chart Distribution' },
      { href: '#flow-filter',   label: 'Sub-Flow 3: Date Range Filter' },
      { href: '#flow-cqrs',     label: 'Sub-Flow 4: Data Accuracy & CQRS' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-dashboard-load', label: 'Dashboard Load' },
      { href: '#tc-pie-chart',      label: 'Pie Chart' },
      { href: '#tc-metrics',        label: 'Summary Metrics & Ticket Table' },
      { href: '#tc-date-filter',    label: 'Date Range Filter' },
      { href: '#tc-data-accuracy',  label: 'Data Accuracy & API Error' },
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

export default function PP231Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-231</span>
        <h1>Organizer Dashboard / Event Detail Dashboard (Web BO) — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Backoffice · Web BO · Organizer</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
