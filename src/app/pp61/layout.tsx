import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';
import { CONFLICT_ITEMS } from '@/data/pp61/conflicts';
const CONFLICT_COUNT = CONFLICT_ITEMS.filter(i => i.status === 'pending' || i.status === 'on-hold').length;

export const metadata: Metadata = {
  title: 'PP-61 · User Profile Epic — Test Design',
  description: 'Test design for POPPA Mobile App User Profile Epic — view/edit profile, avatar upload, delete account, account settings, organizer profile, and admin user history.',
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
      { href: '#flow-view-edit',    label: 'Sub-Flow 1: View & Edit Profile' },
      { href: '#flow-avatar',       label: 'Sub-Flow 2: Avatar Upload' },
      { href: '#flow-delete',       label: 'Sub-Flow 3: Delete Account' },
      { href: '#flow-settings',     label: 'Sub-Flow 4: Account Settings' },
      { href: '#flow-organizer',    label: 'Sub-Flow 5: Organizer Profile' },
      { href: '#flow-admin-history', label: 'Sub-Flow 6: Admin User History' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-view-profile',   label: 'View Profile' },
      { href: '#tc-edit-profile',   label: 'Edit Profile' },
      { href: '#tc-avatar',         label: 'Avatar Upload' },
      { href: '#tc-delete',         label: 'Delete Account' },
      { href: '#tc-settings',       label: 'Account Settings' },
      { href: '#tc-organizer',      label: 'Organizer Profile' },
      { href: '#tc-admin-history',  label: 'Admin User History' },
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

export default function PP61Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-61</span>
        <h1>User Profile Epic — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Mobile · iOS / Android · WebdriverIO + Appium</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar conflictCount={CONFLICT_COUNT} />{children}</main>
    </>
  );
}
