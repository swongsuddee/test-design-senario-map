import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import type { NavSection } from '@/components/Sidebar';
import TabBar from '@/components/TabBar';
import { CONFLICT_ITEMS } from '@/data/pp20/conflicts';
const CONFLICT_COUNT = CONFLICT_ITEMS.filter(i => i.status === 'pending' || i.status === 'on-hold').length;

export const metadata: Metadata = {
  title: 'PP-20 · Manage Auth Token State — Test Design',
  description: 'End-to-end test design for POPPA Mobile App auth token lifecycle: secure storage, silent refresh, force logout, and navigation guard.',
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
      { href: '#flow-storage',     label: 'Sub-Flow 1: Token Storage' },
      { href: '#flow-refresh',     label: 'Sub-Flow 2: Auto Refresh' },
      { href: '#flow-force-logout', label: 'Sub-Flow 3: Force Logout' },
      { href: '#flow-nav-guard',   label: 'Sub-Flow 4: Navigation Guard' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-storage',      label: 'Token Storage' },
      { href: '#tc-refresh',      label: 'Auto Token Refresh' },
      { href: '#tc-force-logout', label: 'Force Logout' },
      { href: '#tc-nav-guard',    label: 'Navigation Guard' },
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

export default function PP20Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-20</span>
        <h1>Manage Auth Token State — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Mobile · iOS / Android · WebdriverIO + Appium</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar conflictCount={CONFLICT_COUNT} />{children}</main>
    </>
  );
}
