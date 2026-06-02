import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import type { NavSection } from '@/components/Sidebar';
import TabBar from '@/components/TabBar';

export const metadata: Metadata = {
  title: 'PP-244 · Delete Organizer Account (Web BO) — Test Design',
  description: 'Test design for POPPA Back-Office Organizer Portal account deletion — covering confirmation dialog, soft-delete, force logout, landing page redirect, and re-login prevention.',
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
      { href: '#master-flow',  label: 'Master Flow' },
      { href: '#flow-dialog',  label: 'Sub-Flow 1: Confirmation Dialog' },
      { href: '#flow-deletion', label: 'Sub-Flow 2: Deletion & Force Logout' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-button-dialog', label: 'Delete Button & Dialog' },
      { href: '#tc-cancel',        label: 'Cancel Flow' },
      { href: '#tc-deletion',      label: 'Deletion & Force Logout' },
      { href: '#tc-relogin-error', label: 'Re-login Prevention & API Error' },
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

export default function PP244Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-244</span>
        <h1>Delete Organizer Account (Web BO) — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Web Back-Office · Organizer Portal · Playwright TypeScript</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
