import type { TcSectionDef } from '@/types';

export const TC_SECTIONS: TcSectionDef[] = [
  {
    sectionId: 'tc-evaluation',
    num: '5',
    title: 'Test Cases · Chat Solution Evaluation',
    subtitle: 'TC-001',
    cols: ['module', 'type', 'labels'],
    rows: [
      {
        id: 'PP36-TC-001',
        module: 'Evaluation',
        summary: 'Chat solution candidates are evaluated and a recommendation is made',
        type: 'Functional',
        priority: 'medium',
        auto: 'manual',
        labels: [['spec', 'Spec'], ['manual', 'Manual']],
      },
    ],
  },
  {
    sectionId: 'tc-integration',
    num: '6',
    title: 'Test Cases · SDK Integration & Basic Chat UI',
    subtitle: 'TC-002–004',
    cols: ['module', 'type', 'labels'],
    rows: [
      {
        id: 'PP36-TC-002',
        module: 'Integration',
        summary: 'Chat UI screen is accessible in the app after SDK integration',
        type: 'Functional',
        priority: 'high',
        auto: 'manual',
        labels: [['smoke', 'Smoke'], ['spec', 'Spec'], ['manual', 'Manual']],
      },
      {
        id: 'PP36-TC-003',
        module: 'Send Message',
        summary: 'User can type and send a text message in the chat',
        type: 'Functional',
        priority: 'high',
        auto: 'manual',
        labels: [['smoke', 'Smoke'], ['st', 'ST'], ['manual', 'Manual']],
      },
      {
        id: 'PP36-TC-004',
        module: 'Message Delivery',
        summary: 'Message sent by one user is received and displayed for another user',
        type: 'Functional',
        priority: 'high',
        auto: 'manual',
        labels: [['st', 'ST'], ['manual', 'Manual']],
      },
    ],
  },
  {
    sectionId: 'tc-failure',
    num: '7',
    title: 'Test Cases · Failure Handling',
    subtitle: 'TC-005',
    cols: ['module', 'type', 'labels'],
    rows: [
      {
        id: 'PP36-TC-005',
        module: 'Failure Handling',
        summary: 'App handles chat SDK error gracefully without crashing',
        type: 'Negative',
        priority: 'medium',
        auto: 'manual',
        labels: [['manual', 'EG'], ['negative', 'Negative']],
      },
    ],
  },
  {
    sectionId: 'tc-documentation',
    num: '8',
    title: 'Test Cases · POC Documentation',
    subtitle: 'TC-006',
    cols: ['module', 'type', 'labels'],
    rows: [
      {
        id: 'PP36-TC-006',
        module: 'POC Documentation',
        summary: 'POC conclusion report is complete and shared with team',
        type: 'Functional',
        priority: 'medium',
        auto: 'manual',
        labels: [['spec', 'Spec'], ['manual', 'Manual']],
      },
    ],
  },
];
