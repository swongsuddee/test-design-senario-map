import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';

export const metadata: Metadata = {
  title: 'PP-209 · Home Main Page (Mobile) — Test Design',
  description: 'Test design for POPPA Mobile App Home Main Page — section rendering, personalised Event List by User Interests, Bottom Menu navigation, and CI/Branding compliance.',
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
      { href: '#master-flow',          label: 'Master Flow' },
      { href: '#flow-sections-display', label: 'Sub-Flow 1: Home Page Display' },
      { href: '#flow-interest',         label: 'Sub-Flow 2: Interest-based Events' },
      { href: '#flow-bottom-menu',      label: 'Sub-Flow 3: Bottom Menu Navigation' },
      { href: '#flow-branding',         label: 'Sub-Flow 4: CI / Branding' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-sections',    label: 'Home Page Sections' },
      { href: '#tc-interest',    label: 'Event List — Interests' },
      { href: '#tc-bottom-menu', label: 'Bottom Menu Navigation' },
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

export default function PP209Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-209</span>
        <h1>Home Main Page (Mobile App) — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Mobile · iOS / Android · End-User</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
