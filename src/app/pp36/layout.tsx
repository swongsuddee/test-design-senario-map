import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';
import { CONFLICT_ITEMS } from '@/data/pp36/conflicts';
const CONFLICT_COUNT = CONFLICT_ITEMS.filter(i => i.status === 'pending' || i.status === 'on-hold').length;

export const metadata: Metadata = {
  title: 'PP-36 · POC Open Chat — Test Design',
  description: 'Test design for POPPA Mobile App POC Open Chat — chat solution evaluation, SDK integration, basic chat UI, message delivery, failure handling, and POC documentation.',
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
      { href: '#master-flow',     label: 'Master Flow' },
      { href: '#flow-evaluation', label: 'Sub-Flow 1: Solution Evaluation' },
      { href: '#flow-integration',label: 'Sub-Flow 2: Integration & UI' },
      { href: '#flow-outcome',    label: 'Sub-Flow 3: Outcome & Docs' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-evaluation',   label: 'Solution Evaluation' },
      { href: '#tc-integration',  label: 'SDK Integration & Chat UI' },
      { href: '#tc-failure',      label: 'Failure Handling' },
      { href: '#tc-documentation',label: 'POC Documentation' },
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

export default function PP36Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-36</span>
        <h1>POC Open Chat — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Mobile · iOS / Android · WebdriverIO + Appium</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar conflictCount={CONFLICT_COUNT} />{children}</main>
    </>
  );
}
