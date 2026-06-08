import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';

export const metadata: Metadata = {
  title: 'PP-318 · Your Vibes — BO Management — Test Design',
  description: 'Test design for POPPA Your Vibes — BO Management.',
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

export default function PP318Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-318</span>
        <h1>Your Vibes — BO Management — Requirements</h1>
        <span className="platform">POPPA · Web UI</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
