'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ALL_STORIES } from '@/data/stories';
import DagGraph from '@/components/DagGraph';
import type { DagNode, DagEdge } from '@/types';

type StageStatus = 'done' | 'pending' | 'blocked' | 'skip';

type Column =
  | 'user-mobile' | 'user-web'
  | 'org-web' | 'admin-web'
  | 'api-user' | 'api-org' | 'api-admin';

const UI_COLUMNS: { id: Column; label: string; sub: string }[] = [
  { id: 'user-mobile', label: 'User',      sub: 'Mobile · iOS / Android' },
  { id: 'user-web',    label: 'User',      sub: 'Web'                     },
  { id: 'org-web',     label: 'Organizer', sub: 'Web · Back-Office'       },
  { id: 'admin-web',   label: 'Admin',     sub: 'Web · Back-Office'       },
];

const API_COLUMNS: { id: Column; label: string; sub: string }[] = [
  { id: 'api-user',  label: 'User',      sub: 'User API'      },
  { id: 'api-org',   label: 'Organizer', sub: 'Organizer API' },
  { id: 'api-admin', label: 'Admin',     sub: 'Admin API'     },
];

const STORIES: {
  id: string; href: string; title: string; subtitle: string;
  column: Column; framework: string;
  stageStatus?: Partial<Record<string, StageStatus>>;
  qaTask?: string;
  stats: { label: string; value: string }[];
}[] = [
  // ── User Mobile ─────────────────────────────────────────────────────────────
  {
    id: 'PP-2', href: '/pp2', qaTask: 'PP-321', column: 'user-mobile', stageStatus: { smap: 'done' },
    title: 'Registration & Login',
    subtitle: 'Phone OTP, social login, identity linking, onboarding, session.',
    framework: 'WebdriverIO + Appium',
    stats: [{ label: 'TC', value: '43' }, { label: 'Coverage', value: '97%' }, { label: 'Auto', value: '26' }],
  },
  {
    id: 'PP-3', href: '/pp3', qaTask: 'PP-329', column: 'user-mobile', stageStatus: { smap: 'done' },
    title: 'User Profile & Account',
    subtitle: 'Profile view/edit, interest mgmt, account deletion, session expiry.',
    framework: 'WebdriverIO + Appium',
    stats: [{ label: 'TC', value: '35' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '30' }],
  },
  {
    id: 'PP-12', href: '/pp12', qaTask: 'PP-416', column: 'user-mobile', stageStatus: { smap: 'done' },
    title: 'Remote Config',
    subtitle: 'Firebase Remote Config, force/soft update dialogs, store redirect.',
    framework: 'WebdriverIO + Appium',
    stats: [{ label: 'TC', value: '8' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '6' }],
  },
  {
    id: 'PP-13', href: '/pp13', column: 'user-mobile', stageStatus: { smap: 'done' },
    title: 'Firebase Integration',
    subtitle: 'SDK install, multi-flavor, Crashlytics, Analytics.',
    framework: 'WebdriverIO + Appium',
    stats: [{ label: 'TC', value: '7' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '0' }],
  },
  {
    id: 'PP-20', href: '/pp20', column: 'user-mobile', stageStatus: { smap: 'done' },
    title: 'Manage Auth Token State',
    subtitle: 'Token storage, auto-refresh, force logout on 401, nav guard.',
    framework: 'WebdriverIO + Appium',
    stats: [{ label: 'TC', value: '6' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '5' }],
  },
  {
    id: 'PP-35', href: '/pp35', column: 'user-mobile', stageStatus: { smap: 'done' },
    title: 'App Visuals: Icon & Splash',
    subtitle: 'Multi-flavor AppIcon, native splash, multi-env build verification.',
    framework: 'WebdriverIO + Appium',
    stats: [{ label: 'TC', value: '10' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '0' }],
  },
  {
    id: 'PP-36', href: '/pp36', column: 'user-mobile', stageStatus: { smap: 'done' },
    title: 'POC Open Chat',
    subtitle: 'Open-source chat evaluation, integration feasibility, POC docs.',
    framework: 'WebdriverIO + Appium',
    stats: [{ label: 'TC', value: '6' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '0' }],
  },
  {
    id: 'PP-61', href: '/pp61', column: 'user-mobile', stageStatus: { smap: 'done' },
    title: 'User Profile Epic',
    subtitle: 'View/edit, avatar upload, delete account, organizer profile, history.',
    framework: 'WebdriverIO + Appium',
    stats: [{ label: 'TC', value: '18' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '17' }],
  },
  {
    id: 'PP-65', href: '/pp65', column: 'user-mobile', stageStatus: { smap: 'done' },
    title: 'Social Graph',
    subtitle: 'Follow/unfollow, followers/following lists, block user.',
    framework: 'WebdriverIO + Appium',
    stats: [{ label: 'TC', value: '10' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '9' }],
  },
  {
    id: 'PP-105', href: '/pp105', column: 'user-mobile', stageStatus: { smap: 'done' },
    title: 'Event Registration',
    subtitle: 'Join free events, buy tickets, My Events, leave, check-in QR.',
    framework: 'WebdriverIO + Appium',
    stats: [{ label: 'TC', value: '13' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '10' }],
  },
  {
    id: 'PP-122', href: '/pp122', column: 'user-mobile', stageStatus: { smap: 'done' },
    title: 'Push Notification UI',
    subtitle: 'Notification card layout, stacking, deep link, timestamp.',
    framework: 'WebdriverIO + Appium',
    stats: [{ label: 'TC', value: '15' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '0' }],
  },
  {
    id: 'PP-201', href: '/pp201', column: 'user-mobile', stageStatus: { smap: 'done' },
    title: 'Payment',
    subtitle: 'QR PromptPay, TrueMoney, mobile banking, webhook, refund, payout.',
    framework: 'WebdriverIO + Appium',
    stats: [{ label: 'TC', value: '14' }, { label: 'Coverage', value: '99%' }, { label: 'Auto', value: '12' }],
  },
  {
    id: 'PP-209', href: '/pp209', column: 'user-mobile', stageStatus: { smap: 'done' },
    title: 'Home Main Page',
    subtitle: 'Home sections, interest-based events, bottom nav, CI branding.',
    framework: 'WebdriverIO + Appium',
    stats: [{ label: 'TC', value: '7' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '6' }],
  },
  {
    id: 'PP-268', href: '/pp268', column: 'user-mobile', stageStatus: { smap: 'done' },
    title: 'Event Detail (Mobile)',
    subtitle: 'Event detail screen, CTA states, participant list, API error.',
    framework: 'WebdriverIO + Appium',
    stats: [{ label: 'TC', value: '12' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '10' }],
  },

  // ── Organizer Web ────────────────────────────────────────────────────────────
  {
    id: 'PP-4', href: '/pp4', qaTask: 'PP-384', column: 'org-web', stageStatus: { smap: 'done' },
    title: 'Register & Login',
    subtitle: 'Registration wizard, identity verification, document upload, login, RBAC.',
    framework: 'Playwright',
    stats: [{ label: 'TC', value: '44' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '37' }],
  },
  {
    id: 'PP-51', href: '/pp51', column: 'org-web', stageStatus: { smap: 'done' },
    title: 'Create Event Running',
    subtitle: 'Event creation wizard, ticket types, draft/publish, approval, cancellation.',
    framework: 'Playwright',
    stats: [{ label: 'TC', value: '14' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '14' }],
  },
  {
    id: 'PP-136', href: '/pp136', column: 'org-web', stageStatus: { smap: 'done' },
    title: 'Update Book Bank Account',
    subtitle: 'Upload field visibility, file validation, agency portal access control.',
    framework: 'Playwright',
    stats: [{ label: 'TC', value: '5' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '5' }],
  },
  {
    id: 'PP-171', href: '/pp171', column: 'org-web', stageStatus: { smap: 'done' },
    title: 'Permission Activation',
    subtitle: 'Access control gates, onboarding, corporate docs gate, RBAC, event approval.',
    framework: 'Playwright',
    stats: [{ label: 'TC', value: '13' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '10' }],
  },
  {
    id: 'PP-227', href: '/pp227', column: 'org-web', stageStatus: { smap: 'done' },
    title: 'Forgot Password',
    subtitle: 'Password reset link, token security, new password validation, redirect.',
    framework: 'Playwright',
    stats: [{ label: 'TC', value: '16' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '11' }],
  },
  {
    id: 'PP-228', href: '/pp228', column: 'org-web', stageStatus: { smap: 'done' },
    title: 'Resend Verification Email',
    subtitle: 'Timer/button control, email trigger, rate limiting, token invalidation.',
    framework: 'Playwright',
    stats: [{ label: 'TC', value: '9' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '7' }],
  },
  {
    id: 'PP-231', href: '/pp231', column: 'org-web', stageStatus: { smap: 'done' },
    title: 'Organizer Dashboard',
    subtitle: 'Metrics, pie chart, date range filter, data accuracy (CQRS).',
    framework: 'Playwright',
    stats: [{ label: 'TC', value: '9' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '7' }],
  },
  {
    id: 'PP-234', href: '/pp234', column: 'org-web', stageStatus: { smap: 'done' },
    title: 'Event Detail',
    subtitle: 'Event detail fields, ticket types, API error, ownership access control.',
    framework: 'Playwright',
    stats: [{ label: 'TC', value: '8' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '6' }],
  },
  {
    id: 'PP-235', href: '/pp235', column: 'org-web', stageStatus: { smap: 'done' },
    title: 'Event Participants List',
    subtitle: 'Participant list, search & filter, API error, participant detail view.',
    framework: 'Playwright',
    stats: [{ label: 'TC', value: '11' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '8' }],
  },
  {
    id: 'PP-236', href: '/pp236', column: 'org-web', stageStatus: { smap: 'done' },
    title: 'Transaction & Finance',
    subtitle: 'Finance list, fee calculation, error state, order detail.',
    framework: 'Playwright',
    stats: [{ label: 'TC', value: '12' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '9' }],
  },
  {
    id: 'PP-244', href: '/pp244', column: 'org-web', stageStatus: { smap: 'done' },
    title: 'Delete Account',
    subtitle: 'Confirmation dialog, cancellation, account deletion, force logout, API error.',
    framework: 'Playwright',
    stats: [{ label: 'TC', value: '7' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '5' }],
  },

  // ── Admin Web ────────────────────────────────────────────────────────────────
  {
    id: 'PP-5', href: '/pp5', qaTask: 'PP-399', column: 'admin-web', stageStatus: { smap: 'done' },
    title: 'Admin Login',
    subtitle: 'Admin portal login, role validation, session, error handling.',
    framework: 'Playwright',
    stats: [{ label: 'TC', value: '15' }, { label: 'Coverage', value: '78%' }, { label: 'Auto', value: '9' }],
  },
  {
    id: 'PP-104', href: '/pp104', column: 'admin-web', stageStatus: { smap: 'done' },
    title: 'Agency Verification Listing',
    subtitle: 'Verification dashboard, search, filter by status, review nav, RBAC.',
    framework: 'WebdriverIO',
    stats: [{ label: 'TC', value: '8' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '6' }],
  },
  {
    id: 'PP-170', href: '/pp170', column: 'admin-web', stageStatus: { smap: 'done' },
    title: 'Document Review & Approval',
    subtitle: 'Agency docs display, approve/reject workflow, audit log.',
    framework: 'WebdriverIO',
    stats: [{ label: 'TC', value: '6' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '5' }],
  },


  // ── API · User ────────────────────────────────────────────────────────────────
  {
    id: 'USER-AUTH', href: '/user-auth', qaTask: 'PP-569', column: 'api-user', stageStatus: { smap: 'done' },
    title: 'User Auth API (OTP)',
    subtitle: 'request-otp → verify-otp → profile · PP-566 bypass · timestamp phone.',
    framework: 'Playwright APIRequestContext',
    stats: [{ label: 'TC', value: '25' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '25' }],
  },
  {
    id: 'USER-PROFILE', href: '/user-profile', column: 'api-user', stageStatus: { smap: 'skip', imp: 'pending' },
    title: 'User Profile API',
    subtitle: 'GET/PATCH profile · PUT interests BVA (1–3) · DELETE account.',
    framework: 'Playwright APIRequestContext',
    stats: [{ label: 'TC', value: '30' }, { label: 'Coverage', value: '95%' }, { label: 'Auto', value: '30' }],
  },
  {
    id: 'USER-EVENTS', href: '/user-events', column: 'api-user', stageStatus: { smap: 'skip', imp: 'pending' },
    title: 'User Event API',
    subtitle: 'GET events (search, pagination) · POST events/{id}/save toggle.',
    framework: 'Playwright APIRequestContext',
    stats: [{ label: 'TC', value: '12' }, { label: 'Coverage', value: '90%' }, { label: 'Auto', value: '12' }],
  },

  // ── API · Organizer ──────────────────────────────────────────────────────────
  {
    id: 'ORG-AUTH', href: '/org-auth', column: 'api-org', stageStatus: { smap: 'skip' },
    title: 'Organizer Auth API',
    subtitle: 'POST /api/v1/organizer/auth/login — happy path, auth failures, validation.',
    framework: 'Playwright APIRequestContext',
    stats: [{ label: 'TC', value: '9' }, { label: 'Coverage', value: '100%' }, { label: 'Auto', value: '9' }],
  },
];

// ── Journey DAG data ──────────────────────────────────────────────────────────

const USER_MOBILE_NODES: DagNode[] = [
  { id: 'PP-35',  name: 'Splash &\nIcon',      type: 'action', row: 0, col: 0 },
  { id: 'PP-2',   name: 'Login &\nRegister',   type: 'action', row: 0, col: 1 },
  { id: 'PP-13',  name: 'Firebase\nSDK',       type: 'action', row: 0, col: 2 },
  { id: 'PP-12',  name: 'Remote\nConfig',      type: 'action', row: 0, col: 3 },
  { id: 'PP-20',  name: 'Auth\nToken',         type: 'action', row: 1, col: 1 },
  { id: 'PP-3',   name: 'User\nProfile',       type: 'action', row: 2, col: 0 },
  { id: 'PP-209', name: 'Home\nMain Page',     type: 'action', row: 2, col: 1 },
  { id: 'PP-122', name: 'Push\nNotif UI',      type: 'action', row: 2, col: 2 },
  { id: 'PP-36',  name: 'POC\nChat',           type: 'action', row: 2, col: 3 },
  { id: 'PP-61',  name: 'Profile\nEpic',       type: 'action', row: 3, col: 0 },
  { id: 'PP-268', name: 'Event\nDetail',       type: 'action', row: 3, col: 1 },
  { id: 'PP-65',  name: 'Social\nGraph',       type: 'action', row: 4, col: 0 },
  { id: 'PP-105', name: 'Event\nReg',          type: 'action', row: 4, col: 1 },
  { id: 'PP-201', name: 'Payment',             type: 'expect', row: 5, col: 1 },
];
const USER_MOBILE_EDGES: DagEdge[] = [
  { from: 'PP-35',  to: 'PP-2'   },
  { from: 'PP-13',  to: 'PP-2'   },
  { from: 'PP-12',  to: 'PP-2'   },
  { from: 'PP-2',   to: 'PP-20'  },
  { from: 'PP-20',  to: 'PP-3'   },
  { from: 'PP-20',  to: 'PP-209' },
  { from: 'PP-209', to: 'PP-122' },
  { from: 'PP-209', to: 'PP-36'  },
  { from: 'PP-209', to: 'PP-268' },
  { from: 'PP-3',   to: 'PP-61'  },
  { from: 'PP-61',  to: 'PP-65'  },
  { from: 'PP-268', to: 'PP-105' },
  { from: 'PP-105', to: 'PP-201' },
];

const ORG_WEB_NODES: DagNode[] = [
  { id: 'PP-4',   name: 'Register\n& Login',     type: 'action',   row: 0, col: 1 },
  { id: 'PP-227', name: 'Forgot\nPassword',       type: 'action',   row: 1, col: 0 },
  { id: 'PP-228', name: 'Resend\nVerif',          type: 'action',   row: 1, col: 2 },
  { id: 'PP-171', name: 'Permission\nActivation', type: 'decision', row: 2, col: 1 },
  { id: 'PP-231', name: 'Dashboard',              type: 'action',   row: 3, col: 1 },
  { id: 'PP-136', name: 'Book Bank\nAccount',     type: 'action',   row: 4, col: 0 },
  { id: 'PP-51',  name: 'Create\nEvent',          type: 'action',   row: 4, col: 1 },
  { id: 'PP-244', name: 'Delete\nAccount',        type: 'action',   row: 4, col: 2 },
  { id: 'PP-234', name: 'Event\nDetail',          type: 'action',   row: 5, col: 1 },
  { id: 'PP-235', name: 'Participants\nList',     type: 'action',   row: 6, col: 0 },
  { id: 'PP-236', name: 'Finance',                type: 'expect',   row: 6, col: 2 },
];
const ORG_WEB_EDGES: DagEdge[] = [
  { from: 'PP-4',   to: 'PP-227'              },
  { from: 'PP-4',   to: 'PP-228'              },
  { from: 'PP-4',   to: 'PP-171'              },
  { from: 'PP-227', to: 'PP-4',  label: 'reset'  },
  { from: 'PP-228', to: 'PP-4',  label: 'verify' },
  { from: 'PP-171', to: 'PP-231'              },
  { from: 'PP-231', to: 'PP-136'              },
  { from: 'PP-231', to: 'PP-51'               },
  { from: 'PP-231', to: 'PP-244'              },
  { from: 'PP-51',  to: 'PP-234'              },
  { from: 'PP-234', to: 'PP-235'              },
  { from: 'PP-234', to: 'PP-236'              },
];

const ADMIN_WEB_NODES: DagNode[] = [
  { id: 'PP-5',   name: 'Admin\nLogin',           type: 'action', row: 0, col: 0 },
  { id: 'PP-104', name: 'Agency\nVerif List',     type: 'action', row: 1, col: 0 },
  { id: 'PP-170', name: 'Doc Review\n& Approval', type: 'expect', row: 2, col: 0 },
];
const ADMIN_WEB_EDGES: DagEdge[] = [
  { from: 'PP-5',   to: 'PP-104' },
  { from: 'PP-104', to: 'PP-170' },
];

export default function HomeContent() {
  const [tab, setTab] = useState<'ui' | 'api' | 'overview'>('ui');

  const columns = tab === 'ui' ? UI_COLUMNS : API_COLUMNS;
  const pendingMap  = new Map(ALL_STORIES.map(s => [s.id, s.pending ?? 0]));
  const totalTC     = STORIES.reduce((n, s) => n + parseInt(s.stats[0].value), 0);
  const totalAuto   = STORIES.reduce((n, s) => n + parseInt(s.stats[2].value), 0);
  const totalPending = ALL_STORIES.reduce((n, s) => n + (s.pending ?? 0), 0);
  const byColumn    = (col: Column) => STORIES.filter(s => s.column === col);

  return (
    <div className="home-root">
      <div className="home-topbar">
        <span className="home-topbar-brand">POPPA</span>
        <span className="home-topbar-sep">/</span>
        <span className="home-topbar-sub">Test Design Documents</span>
      </div>

      <div className="home-hero">
        <div className="home-hero-label">QA · Test Design</div>
        <h1 className="home-hero-title">POPPA — Test Design Index</h1>
        <div className="home-hero-stats">
          <span className="home-hero-stat"><strong>{STORIES.length}</strong> Stories</span>
          <span className="home-hero-dot">·</span>
          <span className="home-hero-stat"><strong>{totalTC}</strong> Test Cases</span>
          <span className="home-hero-dot">·</span>
          <span className="home-hero-stat"><strong>{totalAuto}</strong> Automatable</span>
          {totalPending > 0 && <>
            <span className="home-hero-dot">·</span>
            <span className="home-hero-stat home-hero-stat-warn"><strong>{totalPending}</strong> Open Questions</span>
          </>}
        </div>
      </div>

      <div className="home-tabs">
        <button className={`home-tab${tab === 'overview' ? ' active' : ''}`} onClick={() => setTab('overview')}>
          Overview
        </button>
        <button className={`home-tab${tab === 'ui'  ? ' active' : ''}`} onClick={() => setTab('ui')}>
          UI Test
        </button>
        <button className={`home-tab${tab === 'api' ? ' active' : ''}`} onClick={() => setTab('api')}>
          API Test
        </button>
      </div>

      {tab === 'overview' && (() => {
        const rows     = STORIES.map(s => {
          const total  = parseInt(s.stats[0].value);
          const auto   = parseInt(s.stats[2].value);
          const cov    = s.stats[1].value;
          const covPct = Math.min(1, parseFloat(cov) / 100) || 1;
          const grand  = Math.max(total, Math.round(total / covPct));
          return { total, auto, design: total - auto, explore: Math.max(0, grand - total) };
        });
        const sumImpl  = rows.reduce((n, r) => n + r.auto,    0);
        const sumDes   = rows.reduce((n, r) => n + r.design,  0);
        const sumExp   = rows.reduce((n, r) => n + r.explore, 0);
        const sumTotal = rows.reduce((n, r) => n + r.total,   0);
        const journeys: Array<{ id: Column; label: string; sub: string; nodes: DagNode[] | null; edges: DagEdge[] | null }> = [
          { id: 'user-mobile', label: 'User Mobile',   sub: 'iOS / Android', nodes: USER_MOBILE_NODES, edges: USER_MOBILE_EDGES },
          { id: 'org-web',     label: 'Organizer Web', sub: 'Back-Office',   nodes: ORG_WEB_NODES,     edges: ORG_WEB_EDGES     },
          { id: 'admin-web',   label: 'Admin Web',     sub: 'Back-Office',   nodes: ADMIN_WEB_NODES,   edges: ADMIN_WEB_EDGES   },
          { id: 'user-web',    label: 'User Web',      sub: 'Web',           nodes: null,              edges: null              },
        ];
        return (
          <div className="ov-wrap">
            <div className="ov-summary">
              {[
                { dot: '#4CAF50', val: sumImpl,  lbl: 'Implemented' },
                { dot: '#FF9800', val: sumDes,   lbl: 'Designed' },
                { dot: '#3a3f5c', val: sumExp,   lbl: 'Explored' },
                { dot: '#4a4f6a', val: sumTotal, lbl: 'Total TC' },
              ].map(({ dot, val, lbl }) => (
                <div key={lbl} className="ov-summary-item">
                  <span className="ov-summary-dot" style={{ background: dot }} />
                  <span className="ov-summary-val" style={{ color: dot }}>{val}</span>
                  <span className="ov-summary-lbl">{lbl}</span>
                </div>
              ))}
            </div>
            <div className="ov-journeys">
              {journeys.map(j => (
                <div key={j.id} className="ov-journey-card">
                  <div className="ov-journey-card-head">
                    <span className="ov-journey-card-title">{j.label}</span>
                    <span className="ov-journey-card-sub">{j.sub}</span>
                    <span className="ov-journey-card-count">{byColumn(j.id).length} stories</span>
                  </div>
                  {j.nodes && j.edges ? (
                    <div className="ov-journey-dag">
                      <DagGraph
                        nodes={j.nodes} edges={j.edges}
                        activeNodes={j.nodes.map(n => n.id)}
                        activeEdges={j.edges.map(e => [e.from, e.to] as [string, string])}
                      />
                    </div>
                  ) : (
                    <div className="ov-journey-empty">No stories yet</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {tab !== 'overview' && <div className="home-columns-wrap">
        <div className={`home-columns home-columns-${tab === 'ui' ? '4' : '3'}`}>
          {columns.map(col => {
            const stories = byColumn(col.id);
            return (
              <div key={col.id} className="home-column">
                <div className="home-col-header">
                  <div className="home-col-title">{col.label}</div>
                  <div className="home-col-sub">{col.sub}</div>
                  <div className="home-col-count">
                    {stories.length} {stories.length === 1 ? 'story' : 'stories'}
                  </div>
                </div>

                <div className="home-col-cards">
                  {stories.length === 0 ? (
                    <div className="story-card-empty">No stories yet</div>
                  ) : stories.map(s => {
                    const pending = pendingMap.get(s.id) ?? 0;
                    const tc      = parseInt(s.stats[0].value);
                    const cov     = s.stats[1].value;
                    const autoN   = parseInt(s.stats[2].value);
                    const stageStatus = (key: string, derived: boolean): StageStatus =>
                      s.stageStatus?.[key] ?? (derived ? 'done' : 'pending');

                    const priorStages = [
                      { key: 'req',  label: 'Requirement',  status: stageStatus('req',  true) },
                      { key: 'cla',  label: 'Clarify',      status: stageStatus('cla',  pending === 0) },
                      { key: 'dia',  label: 'Diagram',      status: stageStatus('dia',  tc > 0) },
                      { key: 'smap', label: 'Scenario Map', status: stageStatus('smap', false) },
                      { key: 'des',  label: 'Test Design',  status: stageStatus('des',  tc > 0) },
                      { key: 'imp',  label: 'Implement',    status: stageStatus('imp',  autoN > 0) },
                    ];
                    const allPriorDone = priorStages.every(st => st.status === 'done');
                    const stages = [
                      ...priorStages,
                      { key: 'done', label: 'Done', status: stageStatus('done', allPriorDone) },
                    ];

                    const statusClass: Record<StageStatus, string> = {
                      done:    'story-step-done',
                      pending: 'story-step-future',
                      blocked: 'story-step-blocked',
                      skip:    'story-step-skip',
                    };

                    return (
                      <Link key={s.id} href={s.href} className="story-card">
                        <div className="story-card-head">
                          <span className="story-card-badge">{s.id}</span>
                          {s.qaTask && (
                            <>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-secondary)', flexShrink: 0 }}>
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                              </svg>
                              <span className="story-card-qa-badge">{s.qaTask}</span>
                            </>
                          )}
                        </div>

                        <div className="story-card-body">
                          <div className="story-card-info">
                            <div className="story-card-title">{s.title}</div>
                            <div className="story-card-subtitle">{s.subtitle}</div>
                          </div>
                          <div className="story-pipeline">
                            {stages.map(st => (
                              <div key={st.key} className={`story-step ${statusClass[st.status]}`}>
                                <span className="story-step-dot" />
                                <span className="story-step-label">{st.label}</span>
                                {st.key === 'cla' && pending > 0 && (
                                  <span className="story-step-pending">{pending} ?</span>
                                )}
                                {st.status === 'blocked' && (
                                  <span className="story-step-chip story-step-chip-blocked">blocked</span>
                                )}
                                {st.status === 'skip' && (
                                  <span className="story-step-chip story-step-chip-skip">n/a</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="story-card-footer">
                          <span className="story-meta-val">{tc} TC · {cov}</span>
                          <span className="story-card-cta">View →</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>}
    </div>
  );
}
