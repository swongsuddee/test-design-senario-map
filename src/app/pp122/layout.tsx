import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';
import { CONFLICT_ITEMS } from '@/data/pp122/conflicts';
const CONFLICT_COUNT = CONFLICT_ITEMS.filter(i => i.status === 'pending' || i.status === 'on-hold').length;

export const metadata: Metadata = {
  title: 'PP-122 · Push Notification UI — Test Design',
  description: 'End-to-end test design for POPPA iOS Push Notification UI: card layout rendering, icon badge, notification stacking, deep link routing, and timestamp display.',
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
      { href: '#flow-layout',    label: 'Sub-Flow 1: Card Layout' },
      { href: '#flow-stacking',  label: 'Sub-Flow 2: Stacking' },
      { href: '#flow-deeplink',  label: 'Sub-Flow 3: Deep Link' },
      { href: '#flow-timestamp', label: 'Sub-Flow 4: Timestamp' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-layout',    label: 'Card Layout & Badge' },
      { href: '#tc-stacking',  label: 'Notification Stacking' },
      { href: '#tc-deeplink',  label: 'Deep Link Interaction' },
      { href: '#tc-timestamp', label: 'Timestamp Display' },
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

export default function PP122Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-122</span>
        <h1>Push Notification UI — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Mobile · iOS · WebdriverIO + Appium</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar conflictCount={CONFLICT_COUNT} />{children}</main>
    </>
  );
}
