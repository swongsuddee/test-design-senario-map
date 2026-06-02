import type { TcSectionDef } from '@/types';

export const TC_SECTIONS: TcSectionDef[] = [
  {
    sectionId: 'tc-storage',
    num: '6',
    title: 'Test Cases · Token Storage',
    subtitle: 'TC-001',
    cols: ['type', 'labels'],
    rows: [
      {
        id: 'PP20-TC-001',
        summary: 'Access Token and Refresh Token are stored in Secure Storage after login',
        type: 'Functional',
        priority: 'high',
        auto: 'partial',
        labels: [['smoke', 'Smoke'], ['ep', 'Spec'], ['st', 'ST']],
      },
    ],
  },
  {
    sectionId: 'tc-refresh',
    num: '7',
    title: 'Test Cases · Auto Token Refresh',
    subtitle: 'TC-002–003',
    cols: ['type', 'labels'],
    rows: [
      {
        id: 'PP20-TC-002',
        summary: 'API call succeeds when Access Token is still valid — no refresh triggered',
        type: 'Functional',
        priority: 'high',
        auto: 'auto',
        labels: [['smoke', 'Smoke'], ['st', 'ST']],
      },
      {
        id: 'PP20-TC-003',
        summary: 'App silently refreshes token and retries on 401 without logging user out',
        type: 'Functional',
        priority: 'high',
        auto: 'auto',
        labels: [['smoke', 'Smoke'], ['st', 'ST']],
      },
    ],
  },
  {
    sectionId: 'tc-force-logout',
    num: '8',
    title: 'Test Cases · Force Logout',
    subtitle: 'TC-004',
    cols: ['type', 'labels'],
    rows: [
      {
        id: 'PP20-TC-004',
        summary: 'App forces logout and redirects to Login when Refresh Token is expired',
        type: 'Negative',
        priority: 'high',
        auto: 'auto',
        labels: [['smoke', 'Smoke'], ['st', 'ST'], ['manual', 'EG']],
      },
    ],
  },
  {
    sectionId: 'tc-nav-guard',
    num: '9',
    title: 'Test Cases · Navigation Guard',
    subtitle: 'TC-005–006',
    cols: ['type', 'labels'],
    rows: [
      {
        id: 'PP20-TC-005',
        summary: 'Authenticated user can navigate to protected screens without redirection',
        type: 'Functional',
        priority: 'high',
        auto: 'auto',
        labels: [['smoke', 'Smoke'], ['dt', 'DT'], ['st', 'ST']],
      },
      {
        id: 'PP20-TC-006',
        summary: 'Unauthenticated user is redirected to Login when accessing protected screens',
        type: 'Negative',
        priority: 'high',
        auto: 'auto',
        labels: [['smoke', 'Smoke'], ['dt', 'DT'], ['st', 'ST']],
      },
    ],
  },
];
