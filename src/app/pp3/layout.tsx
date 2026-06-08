import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';

export const metadata: Metadata = {
  title: 'PP-3 · User Profile & Account Settings — Test Design',
  description: 'End-to-end test design for POPPA Mobile App user profile and account settings: view profile, edit profile, update interests, delete account, session expiry and logout.',
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
      { href: '#flow-profile',   label: 'Sub-Flow 1: View Profile' },
      { href: '#flow-edit',      label: 'Sub-Flow 2: Edit Profile' },
      { href: '#flow-interests', label: 'Sub-Flow 3: Update Interests' },
      { href: '#flow-delete',    label: 'Sub-Flow 4: Delete Account' },
      { href: '#flow-session',   label: 'Sub-Flow 5: Session & Logout' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-profile',   label: 'View Profile' },
      { href: '#tc-name',      label: 'Edit Name' },
      { href: '#tc-bio',       label: 'Edit Bio' },
      { href: '#tc-phone',     label: 'Edit Phone & Save' },
      { href: '#tc-interests', label: 'Update Interests' },
      { href: '#tc-delete',    label: 'Delete Account' },
      { href: '#tc-session',   label: 'Session & Logout' },
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

export default function PP3Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-3</span>
        <h1>User Profile &amp; Account Settings — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Mobile · iOS / Android · WebdriverIO + Appium</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
