import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import type { NavSection } from '@/components/Sidebar';
import TabBar from '@/components/TabBar';
import { CONFLICT_ITEMS } from '@/data/pp35/conflicts';
const CONFLICT_COUNT = CONFLICT_ITEMS.filter(i => i.status === 'pending' || i.status === 'on-hold').length;

export const metadata: Metadata = {
  title: 'PP-35 · App Visuals: AppIcon & Native Splash — Test Design',
  description: 'End-to-end test design for POPPA Mobile App icon and splash screen: multi-flavor icon generation, native splash correctness, and cross-environment visual verification.',
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
      { href: '#master-flow',    label: 'Master Flow' },
      { href: '#flow-asset-prep', label: 'Sub-Flow 1: Asset Preparation' },
      { href: '#flow-app-icon',  label: 'Sub-Flow 2: AppIcon Multi-Flavor' },
      { href: '#flow-splash',    label: 'Sub-Flow 3: Native Splash' },
      { href: '#flow-multi-env', label: 'Sub-Flow 4: Multi-Environment' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-asset-prep', label: 'Asset Preparation' },
      { href: '#tc-app-icon',   label: 'AppIcon Multi-Flavor' },
      { href: '#tc-splash',     label: 'Native Splash' },
      { href: '#tc-negative',   label: 'Negative Cases' },
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

export default function PP35Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-35</span>
        <h1>App Visuals: AppIcon &amp; Native Splash — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Mobile · iOS / Android · WebdriverIO + Appium</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar conflictCount={CONFLICT_COUNT} />{children}</main>
    </>
  );
}
