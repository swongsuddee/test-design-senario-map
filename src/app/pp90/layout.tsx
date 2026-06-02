import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import type { NavSection } from '@/components/Sidebar';
import TabBar from '@/components/TabBar';

export const metadata: Metadata = {
  title: 'PP-90 · Register Flow (Mobile Onboarding) — Test Design',
  description: 'Test design for POPPA Register Flow (Mobile Onboarding).',
};

const NAV: NavSection[] = [
  {
    title: 'Docs',
    links: [
      { href: '#requirements', label: 'Requirement' },
    ],
  },
  {
    title: 'Overview',
    links: [
      { href: '#hero', label: 'Summary' },
    ],
  },
];

export default function PP90Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-90</span>
        <h1>Register Flow (Mobile Onboarding) — Requirements</h1>
        <span className="platform">POPPA · Mobile</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
