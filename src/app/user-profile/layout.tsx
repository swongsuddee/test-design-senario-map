import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import type { NavSection } from '@/components/Sidebar';
import TabBar from '@/components/TabBar';

export const metadata: Metadata = {
  title: 'USER-PROFILE · User Profile API — Test Design',
  description: 'Test design for POPPA User Profile API endpoints: GET profile, PATCH profile, PUT interests, DELETE account.',
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
      { href: '#master-flow',         label: 'Master Flow'           },
      { href: '#flow-get-profile',    label: 'Sub-Flow 1: GET profile' },
      { href: '#flow-patch-profile',  label: 'Sub-Flow 2: PATCH profile' },
      { href: '#flow-interests',      label: 'Sub-Flow 3: PUT interests' },
      { href: '#flow-delete',         label: 'Sub-Flow 4: DELETE account' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-get-profile',    label: 'GET profile'     },
      { href: '#tc-patch-profile',  label: 'PATCH profile'   },
      { href: '#tc-interests',      label: 'PUT interests'   },
      { href: '#tc-delete-account', label: 'DELETE account'  },
    ],
  },
  {
    title: 'Analysis',
    links: [
      { href: '#conflict-notes', label: 'Conflicts & Clarify' },
      { href: '#coverage-map',   label: 'Coverage Report'     },
      { href: '#automation',     label: 'Automation Notes'    },
      { href: '#testdata',       label: 'Test Data'           },
    ],
  },
  {
    title: 'See Also',
    links: [
      { href: '/user-auth',   label: 'User Auth API (OTP)'    },
      { href: '/user-events', label: 'User Event API'         },
    ],
  },
];

export default function UserProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">USER-PROFILE</span>
        <h1>User Profile API — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA API · Playwright APIRequestContext · TypeScript · ProfileService</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
