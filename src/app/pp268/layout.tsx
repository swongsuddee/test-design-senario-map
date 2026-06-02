import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import type { NavSection } from '@/components/Sidebar';
import TabBar from '@/components/TabBar';

export const metadata: Metadata = {
  title: 'PP-268 · Event Detail (Mobile) — Test Design',
  description: 'Test design for POPPA Mobile App Event Detail screen — field rendering, CTA button states, participant list, and API error handling.',
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
      { href: '#master-flow',       label: 'Master Flow' },
      { href: '#flow-detail',       label: 'Sub-Flow 1: Event Detail Display' },
      { href: '#flow-cta',          label: 'Sub-Flow 2: CTA Button States' },
      { href: '#flow-participants', label: 'Sub-Flow 3: Participant List' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-detail',       label: 'Event Detail Load' },
      { href: '#tc-cta',          label: 'CTA Buttons' },
      { href: '#tc-error',        label: 'API Error' },
      { href: '#tc-participants', label: 'Participant List' },
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

export default function PP268Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-268</span>
        <h1>Event Detail (Mobile App) — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Mobile · iOS / Android · End-User</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
