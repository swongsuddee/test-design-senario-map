import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';

export const metadata: Metadata = {
  title: 'PP-12 · Remote Config — Test Design',
  description: 'End-to-end test design for POPPA Mobile App Firebase Remote Config integration — version checking, force/soft update dialogs, and store redirection.',
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
      { href: '#flow-fetch',  label: 'Sub-Flow 1: Config Fetch' },
      { href: '#flow-version', label: 'Sub-Flow 2: Version Checking' },
      { href: '#flow-dialog', label: 'Sub-Flow 3: Update Dialog' },
      { href: '#flow-store',  label: 'Sub-Flow 4: Store Redirection' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-fetch',   label: 'Config Fetch' },
      { href: '#tc-version', label: 'Version Checking' },
      { href: '#tc-force',   label: 'Force Update Dialog' },
      { href: '#tc-soft',    label: 'Soft Update — Skip' },
      { href: '#tc-store',   label: 'Store Redirection' },
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

export default function PP12Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-12</span>
        <h1>Remote Config — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Mobile · iOS / Android · WebdriverIO + Appium</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
