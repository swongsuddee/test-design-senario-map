import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';
import { CONFLICT_ITEMS } from '@/data/pp105/conflicts';
const CONFLICT_COUNT = CONFLICT_ITEMS.filter(i => i.status === 'pending' || i.status === 'on-hold').length;

export const metadata: Metadata = {
  title: 'PP-105 · Event Registration / Join Event (Mobile) — Test Design',
  description: 'Test design for POPPA Mobile App Event Registration — Join Free Event, Buy Ticket (Paid), My Events, Leave Event, and Check-in via QR Code.',
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
      { href: '#flow-join-free',   label: 'Sub-Flow 1: Join Free Event' },
      { href: '#flow-buy-ticket',  label: 'Sub-Flow 2: Buy Ticket (Paid)' },
      { href: '#flow-my-events',   label: 'Sub-Flow 3: My Events' },
      { href: '#flow-leave',       label: 'Sub-Flow 4: Leave Event' },
      { href: '#flow-checkin',     label: 'Sub-Flow 5: Check-in QR' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-join-free',   label: 'Join Free Event' },
      { href: '#tc-buy-ticket',  label: 'Buy Ticket (Paid)' },
      { href: '#tc-my-events',   label: 'My Events' },
      { href: '#tc-leave',       label: 'Leave Event' },
      { href: '#tc-checkin',     label: 'Check-in QR' },
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

export default function PP105Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-105</span>
        <h1>Event Registration / Join Event (Mobile App) — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Mobile · iOS / Android · WebdriverIO + Appium</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar conflictCount={CONFLICT_COUNT} />{children}</main>
    </>
  );
}
