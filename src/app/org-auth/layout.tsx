import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';

export const metadata: Metadata = {
  title: 'ORG-AUTH · Organizer Auth API — Test Design',
  description: 'Test design for the POPPA Organizer Auth API (POST /api/v1/organizer/auth/login) — covering happy path token contract, auth failures (401), and schema validation (400).',
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
      { href: '#hero',      label: 'Summary' },
      { href: '#contract',  label: 'Endpoint Contract' },
      { href: '#techniques', label: 'Technique Selection' },
      { href: '#coverage',  label: 'Coverage Summary' },
    ],
  },
  {
    title: 'Diagrams',
    links: [
      { href: '#master-flow',      label: 'Master Flow' },
      { href: '#flow-happy',       label: 'Sub-Flow 1: Happy Path 200' },
      { href: '#flow-auth-fail',   label: 'Sub-Flow 2: Auth Failures 401' },
      { href: '#flow-validation',  label: 'Sub-Flow 3: Validation 400' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-happy',      label: 'Happy Path 200' },
      { href: '#tc-auth-fail',  label: 'Auth Failures 401' },
      { href: '#tc-validation', label: 'Validation 400' },
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
];

export default function OrgAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">ORG-AUTH</span>
        <h1>Organizer Auth API — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA API · Playwright APIRequestContext · TypeScript</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
