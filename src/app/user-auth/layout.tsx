import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import type { NavSection } from '@/components/Sidebar';
import TabBar from '@/components/TabBar';

export const metadata: Metadata = {
  title: 'USER-AUTH · User Auth API (OTP) — Test Design',
  description: 'Test design for the POPPA User Auth API OTP endpoints — phone OTP login and registration with PP-566 bypass, token contract, and validation coverage.',
};

const NAV: NavSection[] = [
  {
    title: 'Overview',
    links: [
      { href: '#hero',       label: 'Summary'           },
      { href: '#contract',   label: 'Endpoint Contract'  },
      { href: '#techniques', label: 'Technique Selection' },
      { href: '#coverage',   label: 'Coverage Summary'   },
    ],
  },
  {
    title: 'Diagrams',
    links: [
      { href: '#master-flow',    label: 'Master Flow'                  },
      { href: '#flow-register',  label: 'Sub-Flow 1: Registration'     },
      { href: '#flow-login',     label: 'Sub-Flow 2: Login (verify-otp)' },
      { href: '#flow-refresh',   label: 'Sub-Flow 3: Token Refresh'    },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-login',    label: 'OTP Login'        },
      { href: '#tc-register', label: 'OTP Registration' },
    ],
  },
  {
    title: 'Scenario Maps',
    links: [
      { href: '#smap-main', label: 'User Auth OTP' },
    ],
  },
  {
    title: 'Analysis',
    links: [
      { href: '#coverage-map', label: 'Coverage Report'   },
      { href: '#automation',   label: 'Automation Notes'  },
      { href: '#testdata',     label: 'Test Data'         },
    ],
  },
  {
    title: 'See Also',
    links: [
      { href: '/pp2',          label: 'PP-2 Registration & Login (Mobile)' },
      { href: '/user-profile', label: 'User Profile API'                   },
      { href: '/user-events',  label: 'User Event API'                     },
    ],
  },
];

export default function UserAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">USER-AUTH</span>
        <h1>User Auth API (OTP) — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA API · Playwright APIRequestContext · TypeScript · PP-566</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
