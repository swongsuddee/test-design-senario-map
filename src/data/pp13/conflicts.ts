import type { ClarifyItem } from '@/types';

export const CONFLICT_ITEMS: ClarifyItem[] = [
  {
    id: 'Q1',
    type: 'question',
    status: 'pending',
    title: 'Firebase Services Scope — Which Services Are Included?',
    body: 'AC 1.1 only states "install and configure Firebase SDK" without listing which Firebase packages are required. It is unclear whether PP-13 covers only `firebase_core` or also includes Remote Config, Messaging, Analytics, and Crashlytics. The scope directly affects which packages TC-001 must verify.',
    affectedTc: 'PP13-TC-001–PP13-TC-006',
    date: '2026-05-16',
  },
  {
    id: 'Q2',
    type: 'question',
    status: 'pending',
    title: 'Exact Flutter Flavor Names',
    body: 'AC 1.2 and the test design reference flavors as dev/staging/uat/prod, but the actual names in `build.gradle` and Xcode schemes may differ (e.g. `development`, `stg`, `production`). A wrong flavor name causes `flutter run --flavor <name>` to fail with "Flavor not found", making TC-003–TC-006 unexecutable.',
    affectedTc: 'PP13-TC-003–PP13-TC-006',
    date: '2026-05-16',
  },
];
