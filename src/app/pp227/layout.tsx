import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import type { NavSection } from '@/components/Sidebar';
import TabBar from '@/components/TabBar';

export const metadata: Metadata = {
  title: 'PP-227 · Organizer Forgot Password Flow (Web BO) — Test Design',
  description: 'Test design for POPPA Backoffice Organizer Portal Forgot Password flow — email request, token security, password reset validation, and post-success actions.',
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
      { href: '#flow-request',   label: 'Sub-Flow 1: Request Reset Link' },
      { href: '#flow-token',     label: 'Sub-Flow 2: Token Security' },
      { href: '#flow-reset',     label: 'Sub-Flow 3: Reset Password Logic' },
      { href: '#flow-post-reset', label: 'Sub-Flow 4: Post-Success Actions' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-email',         label: 'Email Request & Validation' },
      { href: '#tc-security-rate', label: 'Security & Rate Limit' },
      { href: '#tc-token',         label: 'Token Security' },
      { href: '#tc-password',      label: 'Password Validation' },
      { href: '#tc-post-reset',    label: 'Post-Reset Actions' },
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

export default function PP227Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-227</span>
        <h1>Organizer Forgot Password Flow (Web BO) — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Backoffice · Web · Organizer Portal</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
