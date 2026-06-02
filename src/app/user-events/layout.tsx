import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import type { NavSection } from '@/components/Sidebar';
import TabBar from '@/components/TabBar';

export const metadata: Metadata = {
  title: 'USER-EVENTS · User Event API — Test Design',
  description: 'Test design for POPPA User Event API endpoints: GET /events (list, search, pagination) and POST /events/{eventId}/save (save toggle).',
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
      { href: '#master-flow',      label: 'Master Flow'                       },
      { href: '#flow-get-events',  label: 'Sub-Flow 1: GET events'            },
      { href: '#flow-save-event',  label: 'Sub-Flow 2: POST events/{id}/save' },
    ],
  },
  {
    title: 'Test Cases',
    links: [
      { href: '#tc-get-events',  label: 'GET events'        },
      { href: '#tc-save-event',  label: 'POST events save'  },
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
      { href: '/user-auth',    label: 'User Auth API (OTP)'     },
      { href: '/user-profile', label: 'User Profile API'        },
    ],
  },
];

export default function UserEventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <span className="badge-jira">USER-EVENTS</span>
        <h1>User Event API — Test Design &amp; Flow Diagram</h1>
        <span className="platform">POPPA API · Playwright APIRequestContext · TypeScript · EventService</span>
      </div>
      <Sidebar nav={NAV} />
      <main className="main"><TabBar />{children}</main>
    </>
  );
}
