import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';

export const metadata: Metadata = {
  title: 'PP-236 · Transaction & Payment / Finance Page (Web BO) — Test Design',
  description: 'Test design for POPPA Back-Office Organizer Portal Finance page — covering finance list, fee calculation verification, order detail navigation, and API error handling.',
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
      { href: '#master-flow',        label: 'Master Flow' },
      { href: '#flow-list',          label: 'Sub-Flow 1: Finance List Display' },
      { href: '#flow-fee',           label: 'Sub-Flow 2: Fee Calculation' },
      { href: '#flow-order-detail',  label: 'Sub-Flow 3: Order Detail' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-finance-list',    label: 'Finance List' },
      { href: '#tc-fee-calculation', label: 'Fee Calculation' },
      { href: '#tc-error',           label: 'Error State' },
      { href: '#tc-order-detail',    label: 'Order Detail' },
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

export default function PP236Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-236</span>
        <h1>Transaction &amp; Payment / Finance Page (Web BO) — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Web Back-Office · Organizer Portal · Playwright TypeScript</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
