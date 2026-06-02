import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import type { NavSection } from '@/components/Sidebar';
import TabBar from '@/components/TabBar';
import { CONFLICT_ITEMS } from '@/data/pp136/conflicts';
const CONFLICT_COUNT = CONFLICT_ITEMS.filter(i => i.status === 'pending' || i.status === 'on-hold').length;

export const metadata: Metadata = {
  title: 'PP-136 · Update Book Bank Account — Test Design',
  description: 'End-to-end test design for POPPA Back Office Agency Portal: Book Bank account document upload field visibility and file validation for Individual and Corporate Agency profiles.',
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
      { href: '#flow-visibility',  label: 'Sub-Flow 1: Field Visibility' },
      { href: '#flow-valid-upload', label: 'Sub-Flow 2: Valid Upload' },
      { href: '#flow-invalid',     label: 'Sub-Flow 3: Invalid Rejection' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-visibility', label: 'Field Visibility' },
      { href: '#tc-upload',     label: 'File Upload Validation' },
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

export default function PP136Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-136</span>
        <h1>Update Book Bank Account — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Back Office · Web · WebdriverIO</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar conflictCount={CONFLICT_COUNT} />{children}</main>
    </>
  );
}
