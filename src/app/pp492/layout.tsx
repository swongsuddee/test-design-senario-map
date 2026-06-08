import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';

export const metadata: Metadata = {
  title: 'PP-492 · Edit Running Event (BO) — Test Design',
  description: 'Test design for POPPA Edit Running Event (BO).',
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

export default function PP492Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-492</span>
        <h1>Edit Running Event (BO) — Requirements</h1>
        <span className="platform">POPPA · Web UI</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
