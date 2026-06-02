import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import type { NavSection } from '@/components/Sidebar';
import TabBar from '@/components/TabBar';

export const metadata: Metadata = {
  title: 'PP-228 · Organizer Resend Verification Email (Web BO) — Test Design',
  description: 'Test design for POPPA Backoffice Organizer Resend Verification Email — countdown timer, button states, token invalidation, rate limiting, token expiry, and feedback toasts.',
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
      { href: '#master-flow',   label: 'Master Flow' },
      { href: '#flow-timer',    label: 'Sub-Flow 1: Timer & Button Control' },
      { href: '#flow-api',      label: 'Sub-Flow 2: API & Email Trigger' },
      { href: '#flow-rate',     label: 'Sub-Flow 3: Rate Limiting & Security' },
      { href: '#flow-feedback', label: 'Sub-Flow 4: Feedback & Notification' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-timer',      label: 'Timer & Button States' },
      { href: '#tc-happy-path', label: 'Resend Happy Path' },
      { href: '#tc-token',      label: 'Token Invalidation & Expiry' },
      { href: '#tc-rate-limit', label: 'Rate Limiting' },
      { href: '#tc-api-error',  label: 'API Error Handling' },
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

export default function PP228Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-228</span>
        <h1>Organizer Resend Verification Email (Web BO) — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Backoffice · Web BO · Organizer</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
