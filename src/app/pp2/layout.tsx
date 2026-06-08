import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';

export const metadata: Metadata = {
  title: 'PP-2 · Registration & Login — Test Design',
  description: 'End-to-end test design for POPPA Mobile App authentication: phone, OTP, social login, identity linking, onboarding, session persistence.',
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
      { href: '#master-flow',      label: 'Master Flow' },
      { href: '#flow-phone',       label: 'Sub-Flow 1: Phone & OTP' },
      { href: '#flow-social',      label: 'Sub-Flow 2: Social Login' },
      { href: '#flow-onboarding',  label: 'Sub-Flow 3: Onboarding' },
      { href: '#flow-session',        label: 'Sub-Flow 4: Session' },
      { href: '#flow-user-api-otp',   label: 'Sub-Flow 5: User API OTP (PP-566)' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-phone',              label: 'Phone Login' },
      { href: '#tc-otp',                label: 'OTP Flow' },
      { href: '#tc-social',             label: 'Social Login' },
      { href: '#tc-linking',            label: 'Identity Linking' },
      { href: '#tc-pdpa',               label: 'Onboarding — PDPA' },
      { href: '#tc-basic',              label: 'Onboarding — Basic Identity' },
      { href: '#tc-interests',          label: 'Onboarding — Interests' },
      { href: '#tc-session',            label: 'Session Persistence' },
      { href: '#tc-edge',               label: 'Edge Cases' },
      { href: '#tc-user-api-login',     label: 'API — OTP Login (PP-566)' },
      { href: '#tc-user-api-register',  label: 'API — OTP Registration' },
    ],
  },
  {
    title: 'See Also',
    links: [
      { href: '/user-auth', label: 'User Auth API (dedicated page)' },
    ],
  },
  {
    title: 'Analysis',
    links: [
      { href: '#coverage-map', label: 'Coverage Mapping' },
      { href: '#automation',   label: 'Automation Notes' },
      { href: '#testdata',     label: 'Test Data' },
    ],
  },
  {
    title: 'Scenario Maps',
    links: [
      { href: '#smap-phone',      label: 'Phone Login Paths' },
      { href: '#smap-otp',        label: 'OTP Flow Paths' },
      { href: '#smap-social',     label: 'Social Login Paths' },
      { href: '#smap-linking',    label: 'Identity Linking' },
      { href: '#smap-onboarding', label: 'Onboarding Paths' },
      { href: '#smap-session',    label: 'Session Persistence' },
      { href: '#smap-edge',       label: 'Edge Cases' },
    ],
  },
];

export default function PP2Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-2</span>
        <h1>Registration &amp; Login — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Mobile · iOS / Android · WebdriverIO + Appium</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
