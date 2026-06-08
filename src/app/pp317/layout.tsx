import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';

export const metadata: Metadata = {
  title: 'PP-317 · Your Vibes — Scoring Engine — Test Design',
  description: 'Test design for POPPA Your Vibes — Scoring Engine.',
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

export default function PP317Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-317</span>
        <h1>Your Vibes — Scoring Engine — Requirements</h1>
        <span className="platform">POPPA · API</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
