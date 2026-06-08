import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';

export const metadata: Metadata = {
  title: 'PP-342 · Story Poppa — Test Design',
  description: 'Test design for POPPA Story Poppa.',
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

export default function PP342Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-342</span>
        <h1>Story Poppa — Requirements</h1>
        <span className="platform">POPPA · Mobile</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
