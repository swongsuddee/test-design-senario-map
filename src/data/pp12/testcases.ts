import type { TcSectionDef } from '@/types';

export const TC_SECTIONS: TcSectionDef[] = [
  {
    sectionId: 'tc-fetch',
    num: '6',
    title: 'Test Cases · Firebase Config Fetch',
    subtitle: 'TC-001–002',
    cols: ['type', 'labels'],
    rows: [
      {
        id: 'PP12-TC-001',
        summary: 'App fetches all required Remote Config keys on launch',
        type: 'Functional',
        priority: 'high',
        auto: 'auto',
        labels: [['smoke', 'Smoke'], ['ep', 'Spec'], ['st', 'ST']],
      },
      {
        id: 'PP12-TC-002',
        summary: 'App falls back to cached/default values when fetch fails — no crash',
        type: 'Negative',
        priority: 'high',
        auto: 'auto',
        labels: [['manual', 'EG'], ['negative', 'Negative']],
      },
    ],
  },
  {
    sectionId: 'tc-version',
    num: '7',
    title: 'Test Cases · Version Checking',
    subtitle: 'TC-003–004',
    cols: ['type', 'labels'],
    rows: [
      {
        id: 'PP12-TC-003',
        summary: 'App navigates to Home when current version is up-to-date (no dialog)',
        type: 'Functional',
        priority: 'high',
        auto: 'auto',
        labels: [['smoke', 'Smoke'], ['dt', 'DT']],
      },
      {
        id: 'PP12-TC-004',
        summary: 'Soft Update dialog shown when version is outdated and isForceUpdate = false',
        type: 'Functional',
        priority: 'high',
        auto: 'auto',
        labels: [['dt', 'DT'], ['st', 'ST']],
      },
    ],
  },
  {
    sectionId: 'tc-force',
    num: '8',
    title: 'Test Cases · Force Update Dialog',
    subtitle: 'TC-005',
    cols: ['type', 'labels'],
    rows: [
      {
        id: 'PP12-TC-005',
        summary: 'Force Update dialog shows only "อัพเดท" and cannot be dismissed when isForceUpdate = true',
        type: 'Functional',
        priority: 'high',
        auto: 'auto',
        labels: [['smoke', 'Smoke'], ['dt', 'DT'], ['st', 'ST']],
      },
    ],
  },
  {
    sectionId: 'tc-soft',
    num: '9',
    title: 'Test Cases · Soft Update — Skip',
    subtitle: 'TC-006',
    cols: ['type', 'labels'],
    rows: [
      {
        id: 'PP12-TC-006',
        summary: 'Tapping "ข้าม" on Soft Update dialog navigates to Home without opening store',
        type: 'Functional',
        priority: 'medium',
        auto: 'auto',
        labels: [['st', 'ST']],
      },
    ],
  },
  {
    sectionId: 'tc-store',
    num: '10',
    title: 'Test Cases · Store Redirection',
    subtitle: 'TC-007–008',
    cols: ['type', 'labels'],
    rows: [
      {
        id: 'PP12-TC-007',
        summary: 'Tapping "อัพเดท" opens App Store on iOS device',
        type: 'Functional',
        priority: 'high',
        auto: 'partial',
        labels: [['smoke', 'Smoke'], ['dt', 'DT'], ['ios', 'iOS Only']],
      },
      {
        id: 'PP12-TC-008',
        summary: 'Tapping "อัพเดท" opens Play Store on Android device',
        type: 'Functional',
        priority: 'high',
        auto: 'partial',
        labels: [['smoke', 'Smoke'], ['dt', 'DT']],
      },
    ],
  },
];
