import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';
import { CONFLICT_ITEMS } from '@/data/pp5/conflicts';
const CONFLICT_COUNT = CONFLICT_ITEMS.filter(i => i.status === 'pending' || i.status === 'on-hold').length;

export const metadata: Metadata = {
  title: 'PP-5 · Admin BO Register & Login — Test Design',
  description: 'Test design for POPPA Back-Office Admin portal — direct login form, session management, role validation, error handling, registration flow, and change password.',
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
      { href: '#flow-account-status',  label: 'Sub-Flow 1: Account Status Lifecycle' },
      { href: '#flow-direct-login',    label: 'Sub-Flow 2: Direct Login (STG)' },
      { href: '#flow-session-mgmt',    label: 'Sub-Flow 3: Session Management' },
      { href: '#flow-error-handling',  label: 'Sub-Flow 4: Error Handling' },
      { href: '#flow-registration',    label: 'Sub-Flow 5: Email Registration (PP-55)' },
      { href: '#flow-email-login-api', label: 'Sub-Flow 6: Direct Login API (PP-60)' },
      { href: '#flow-super-admin-create', label: 'Sub-Flow 7: Super Admin Creates Admin (PP-101)' },
      { href: '#flow-change-password', label: 'Sub-Flow 8: Change Password (PP-102)' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-login-flow',      label: 'Login Flow' },
      { href: '#tc-role-validation', label: 'Role Validation' },
      { href: '#tc-error-handling',  label: 'Error Handling' },
      { href: '#tc-session-mgmt',    label: 'Session Management' },
      { href: '#tc-forgot-password', label: 'Forgot Password' },
      { href: '#tc-ux',              label: 'Loading / UX' },
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

export default function PP5Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-5</span>
        <h1>Admin BO Register &amp; Login — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Back-Office · Web Desktop · Admin Portal</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar conflictCount={CONFLICT_COUNT} />{children}</main>
    </>
  );
}
