import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import type { NavSection } from '@/components/Sidebar';
import TabBar from '@/components/TabBar';
import { CONFLICT_ITEMS } from '@/data/pp51/conflicts';
const CONFLICT_COUNT = CONFLICT_ITEMS.filter(i => i.status === 'pending' || i.status === 'on-hold').length;

export const metadata: Metadata = {
  title: 'PP-51 · Create Event Running — Test Design',
  description: 'Test design for POPPA Backoffice Create Event Running — event information, ticket types & stock, draft auto-save, publish approval flow, and cancel event flow.',
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
      { href: '#flow-create-info',   label: 'Sub-Flow 1: Create Event Info' },
      { href: '#flow-ticket-types',  label: 'Sub-Flow 2: Ticket Types' },
      { href: '#flow-draft',         label: 'Sub-Flow 3: Event Draft' },
      { href: '#flow-publish',       label: 'Sub-Flow 4: Publish & Approval' },
      { href: '#flow-cancel',        label: 'Sub-Flow 5: Cancel Event' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-create-info',  label: 'Create Event Information' },
      { href: '#tc-ticket-types', label: 'Ticket Types & Stock' },
      { href: '#tc-draft',        label: 'Event Draft' },
      { href: '#tc-publish',      label: 'Publish / Approval' },
      { href: '#tc-cancel',       label: 'Cancel Event' },
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

export default function PP51Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-51</span>
        <h1>Create Event Running — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Backoffice · Web · Agency &amp; Admin Portal</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar conflictCount={CONFLICT_COUNT} />{children}</main>
    </>
  );
}
