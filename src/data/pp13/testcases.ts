import type { TcSectionDef } from '@/types';

export const TC_SECTIONS: TcSectionDef[] = [
  {
    sectionId: 'tc-sdk',
    num: '4',
    title: 'Test Cases · Firebase SDK Installation & Init',
    subtitle: 'TC-001–002',
    cols: ['type', 'labels'],
    rows: [
      {
        id: 'PP13-TC-001',
        summary: 'Firebase SDK is correctly installed and initialised — build succeeds, initializeApp runs without error',
        type: 'Functional',
        priority: 'high',
        auto: 'manual',
        labels: [['smoke', 'Smoke'], ['ep', 'Spec']],
      },
      {
        id: 'PP13-TC-002',
        summary: 'App builds and runs on both iOS and Android without Firebase errors after SDK integration',
        type: 'Functional',
        priority: 'high',
        auto: 'manual',
        labels: [['smoke', 'Smoke'], ['ep', 'Spec']],
      },
    ],
  },
  {
    sectionId: 'tc-multiflavor',
    num: '5',
    title: 'Test Cases · Multi-Flavor Firebase Connection',
    subtitle: 'TC-003–006',
    cols: ['type', 'labels'],
    rows: [
      {
        id: 'PP13-TC-003',
        summary: 'Firebase connects to correct Dev project when Dev flavor is built (iOS & Android)',
        type: 'Functional',
        priority: 'high',
        auto: 'manual',
        labels: [['dt', 'DT']],
      },
      {
        id: 'PP13-TC-004',
        summary: 'Firebase connects to correct Staging project when Staging flavor is built (iOS & Android)',
        type: 'Functional',
        priority: 'high',
        auto: 'manual',
        labels: [['smoke', 'Smoke'], ['dt', 'DT']],
      },
      {
        id: 'PP13-TC-005',
        summary: 'Firebase connects to correct UAT project when UAT flavor is built (iOS & Android)',
        type: 'Functional',
        priority: 'medium',
        auto: 'manual',
        labels: [['dt', 'DT']],
      },
      {
        id: 'PP13-TC-006',
        summary: 'Firebase connects to correct Prod project when Prod flavor is built — no dev/staging data written',
        type: 'Functional',
        priority: 'high',
        auto: 'manual',
        labels: [['dt', 'DT']],
      },
    ],
  },
  {
    sectionId: 'tc-misconfig',
    num: '6',
    title: 'Test Cases · Misconfiguration Error Handling',
    subtitle: 'TC-007',
    cols: ['type', 'labels'],
    rows: [
      {
        id: 'PP13-TC-007',
        summary: 'App shows meaningful error when Firebase config file is missing or incorrect — no silent crash',
        type: 'Negative',
        priority: 'medium',
        auto: 'manual',
        labels: [['negative', 'Negative'], ['manual', 'EG']],
      },
    ],
  },
];
