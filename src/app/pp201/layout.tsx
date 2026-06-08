import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';

export const metadata: Metadata = {
  title: 'PP-201 · Payment (Mobile App) — Test Design',
  description: 'Test design for POPPA Mobile App Payment flow — Checkout, QR PromptPay, TrueMoney, Mobile Banking, Webhook idempotency, Refund policy, and Organizer Payout.',
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
      { href: '#flow-checkout',  label: 'Sub-Flow 1: Checkout & Method' },
      { href: '#flow-qr',        label: 'Sub-Flow 2: QR PromptPay' },
      { href: '#flow-polling',   label: 'Sub-Flow 3: Status Polling' },
      { href: '#flow-truemoney', label: 'Sub-Flow 4: TrueMoney' },
      { href: '#flow-webhook',   label: 'Sub-Flow 5: Webhook Idempotency' },
      { href: '#flow-refund',    label: 'Sub-Flow 6: Refund Flow' },
      { href: '#flow-payout',    label: 'Sub-Flow 7: Organizer Payout' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-checkout',      label: 'Checkout — Order Summary' },
      { href: '#tc-qr',            label: 'QR PromptPay' },
      { href: '#tc-polling',       label: 'Status Polling' },
      { href: '#tc-other-methods', label: 'TrueMoney & Mobile Banking' },
      { href: '#tc-webhook',       label: 'Webhook Idempotency' },
      { href: '#tc-refund',        label: 'Refund Policy' },
      { href: '#tc-payout',        label: 'Organizer Payout' },
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

export default function PP201Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">PP-201</span>
        <h1>Payment (Mobile App) — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA Mobile · iOS / Android · End-User</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
