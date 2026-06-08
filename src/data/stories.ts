export interface StoryMeta {
  id: string;
  href: string;
  title: string;
  pending?: number;
  group: string;
}

export const ALL_STORIES: StoryMeta[] = [
  // ── Auth ─────────────────────────────────────────────────────────────────
  { id: 'PP-2',    href: '/pp2',      title: 'Registration & Login',             group: 'Auth' },
  { id: 'PP-3',    href: '/pp3',      title: 'User Profile & Account',           group: 'Auth' },
  { id: 'PP-4',    href: '/pp4',      title: 'Organizer Register & Login',       group: 'Auth', pending: 9  },
  { id: 'PP-5',    href: '/pp5',      title: 'Admin Login',                      group: 'Auth', pending: 4  },
  { id: 'PP-20',   href: '/pp20',     title: 'Manage Auth Token State',          group: 'Auth', pending: 1  },
  { id: 'PP-61',   href: '/pp61',     title: 'User Profile Epic',                group: 'Auth', pending: 17 },
  { id: 'PP-90',   href: '/pp90',     title: 'Register Flow (Mobile Onboarding)', group: 'Auth' },

  // ── Events ───────────────────────────────────────────────────────────────
  { id: 'PP-51',   href: '/pp51',     title: 'Create Event Running',             group: 'Events', pending: 28 },
  { id: 'PP-105',  href: '/pp105',    title: 'Event Registration',               group: 'Events', pending: 26 },
  { id: 'PP-201',  href: '/pp201',    title: 'Payment',                          group: 'Events' },
  { id: 'PP-222',  href: '/pp222',    title: 'Button Status — Running Registration', group: 'Events' },
  { id: 'PP-226',  href: '/pp226',    title: 'Event Detail — Organizer Info',    group: 'Events' },
  { id: 'PP-235',  href: '/pp235',    title: 'Event Participants List',          group: 'Events' },
  { id: 'PP-237',  href: '/pp237',    title: 'Event Detail (excl. Comment)',     group: 'Events' },
  { id: 'PP-268',  href: '/pp268',    title: 'Event Detail (Mobile)',            group: 'Events' },
  { id: 'PP-296',  href: '/pp296',    title: "View Who's Registered",            group: 'Events' },
  { id: 'PP-492',  href: '/pp492',    title: 'Edit Running Event (BO)',          group: 'Events' },

  // ── Organizer ─────────────────────────────────────────────────────────────
  { id: 'PP-104',  href: '/pp104',    title: 'Agency Verification Listing',      group: 'Organizer', pending: 8  },
  { id: 'PP-136',  href: '/pp136',    title: 'Update Book Bank Account',         group: 'Organizer', pending: 7  },
  { id: 'PP-170',  href: '/pp170',    title: 'Document Review Approval',         group: 'Organizer', pending: 10 },
  { id: 'PP-227',  href: '/pp227',    title: 'Organizer Forgot Password',        group: 'Organizer' },
  { id: 'PP-228',  href: '/pp228',    title: 'Resend Verification Email',        group: 'Organizer' },
  { id: 'PP-231',  href: '/pp231',    title: 'Organizer Dashboard',             group: 'Organizer' },
  { id: 'PP-234',  href: '/pp234',    title: 'Organizer Event Detail',          group: 'Organizer' },
  { id: 'PP-236',  href: '/pp236',    title: 'Transaction & Finance',           group: 'Organizer' },
  { id: 'PP-244',  href: '/pp244',    title: 'Delete Organizer Account',        group: 'Organizer' },
  { id: 'PP-277',  href: '/pp277',    title: 'BO Report',                       group: 'Organizer' },

  // ── Social & Content ─────────────────────────────────────────────────────
  { id: 'PP-36',   href: '/pp36',     title: 'POC Open Chat',                    group: 'Social', pending: 5  },
  { id: 'PP-65',   href: '/pp65',     title: 'Social Graph',                     group: 'Social', pending: 18 },
  { id: 'PP-209',  href: '/pp209',    title: 'Home Main Page',                   group: 'Social' },
  { id: 'PP-210',  href: '/pp210',    title: 'Interest Statistic Search',        group: 'Social' },
  { id: 'PP-337',  href: '/pp337',    title: 'Explore Post (สร้างโพสต์)',        group: 'Social' },
  { id: 'PP-342',  href: '/pp342',    title: 'Story Poppa',                      group: 'Social' },
  { id: 'PP-350',  href: '/pp350',    title: 'Search Event',                     group: 'Social' },
  { id: 'PP-444',  href: '/pp444',    title: 'Report Comment',                   group: 'Social' },
  { id: 'PP-445',  href: '/pp445',    title: 'Comment on Running Event',         group: 'Social' },
  { id: 'PP-447',  href: '/pp447',    title: 'Explore Community',                group: 'Social' },
  { id: 'PP-448',  href: '/pp448',    title: 'Explore Post (M-App)',             group: 'Social' },
  { id: 'PP-449',  href: '/pp449',    title: 'Post Poppa',                       group: 'Social' },
  { id: 'PP-451',  href: '/pp451',    title: 'Feeds Poppa',                      group: 'Social' },

  // ── Platform ─────────────────────────────────────────────────────────────
  { id: 'PP-12',   href: '/pp12',     title: 'Remote Config',                    group: 'Platform' },
  { id: 'PP-13',   href: '/pp13',     title: 'Firebase Integration',             group: 'Platform', pending: 2  },
  { id: 'PP-35',   href: '/pp35',     title: 'App Visuals: Icon & Splash',       group: 'Platform', pending: 1  },
  { id: 'PP-122',  href: '/pp122',    title: 'Push Notification UI',             group: 'Platform', pending: 10 },
  { id: 'PP-171',  href: '/pp171',    title: 'Permission Activation',            group: 'Platform', pending: 11 },

  // ── Your Vibes ───────────────────────────────────────────────────────────
  { id: 'PP-302',  href: '/pp302',    title: 'Your Vibes — Core Quiz',           group: 'Your Vibes' },
  { id: 'PP-303',  href: '/pp303',    title: 'Your Vibes — Results',             group: 'Your Vibes' },
  { id: 'PP-304',  href: '/pp304',    title: 'Your Vibes — Profile',             group: 'Your Vibes' },
  { id: 'PP-317',  href: '/pp317',    title: 'Your Vibes — Scoring Engine',      group: 'Your Vibes' },
  { id: 'PP-318',  href: '/pp318',    title: 'Your Vibes — BO Management',       group: 'Your Vibes' },

  // ── API ───────────────────────────────────────────────────────────────────
  { id: 'ORG-AUTH',     href: '/org-auth',     title: 'Organizer Auth API',      group: 'API' },
  { id: 'USER-AUTH',    href: '/user-auth',    title: 'User Auth API (OTP)',      group: 'API' },
  { id: 'USER-PROFILE', href: '/user-profile', title: 'User Profile API',        group: 'API', pending: 1 },
  { id: 'USER-EVENTS',  href: '/user-events',  title: 'User Event API',          group: 'API', pending: 2 },
];
