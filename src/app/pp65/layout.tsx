import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';
import { CONFLICT_ITEMS } from '@/data/pp65/conflicts';
const CONFLICT_COUNT = CONFLICT_ITEMS.filter(i => i.status === 'pending' || i.status === 'on-hold').length;

export const metadata: Metadata = {
  title: 'PP-65 · Social Graph — Test Design',
  description: 'Test design for POPPA Mobile App Social Graph — follow/unfollow user, notification on follow, followers/following lists, and block user with mutual visibility hide.',
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
      { href: '#master-flow',  label: 'Master Flow' },
      { href: '#flow-follow',  label: 'Sub-Flow 1: Follow User' },
      { href: '#flow-unfollow', label: 'Sub-Flow 2: Unfollow User' },
      { href: '#flow-lists',   label: 'Sub-Flow 3: Followers & Following Lists' },
      { href: '#flow-block',   label: 'Sub-Flow 4: Block User' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-follow',   label: 'Follow User' },
      { href: '#tc-unfollow', label: 'Unfollow User' },
      { href: '#tc-lists',    label: 'Followers & Following Lists' },
      { href: '#tc-block',    label: 'Block User' },
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

export default function PP65Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-65</span>
        <h1>Social Graph — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Mobile · iOS / Android · WebdriverIO + Appium</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar conflictCount={CONFLICT_COUNT} />{children}</main>
    </>
  );
}
