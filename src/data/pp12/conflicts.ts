import type { ClarifyItem } from '@/types';

export const CONFLICT_ITEMS: ClarifyItem[] = [
  {
    id: 'C1',
    type: 'conflict',
    status: 'resolved',
    title: 'storeUrl — Single Field vs. Platform-Specific Keys',
    body: 'AC4 specifies a single `storeUrl` Firebase key for both platforms, but PP-12.design.md Test Data lists two separate URLs for iOS and Android. Since App Store and Play Store URLs have entirely different formats, it was unclear whether one or two keys were needed, blocking test data authoring for TC-007 and TC-008.',
    resolution: 'Trust the requirement (AC4). A single `storeUrl` Remote Config key is used; the app performs platform detection client-side to open the correct store. Test data updated to use one `storeUrl` row covering both TC-007 (iOS) and TC-008 (Android).',
    affectedTc: 'PP12-TC-007, PP12-TC-008',
    date: '2026-05-16',
  },
  {
    id: 'Q1',
    type: 'question',
    status: 'resolved',
    title: 'Version Comparison — SemVer or Lexicographic String?',
    body: 'AC2 specifies a version comparison but does not define the method. String lexicographic comparison would produce incorrect results (e.g. "1.10.0" < "1.9.0"), causing users on newer versions to see a spurious update dialog. The correct algorithm was required to write valid BVA test data for TC-003–TC-006.',
    resolution: 'App uses SemVer comparison (major.minor.patch). `versionApp` in Firebase is stored as a SemVer string. BVA test data includes the minor-overflow boundary case (installed = 1.10.0, versionApp = 1.9.0) to verify SemVer is used.',
    affectedTc: 'PP12-TC-003–PP12-TC-006',
    date: '2026-05-16',
  },
  {
    id: 'Q2',
    type: 'question',
    status: 'resolved',
    title: 'Force Update — Return from Store Without Updating',
    body: 'AC3 states Force Update dialog cannot be dismissed, and AC4 opens the store on tap, but no behavior was defined for when a user returns from the store without installing the update. Without this, it was unclear whether TC-005 and TC-007 needed additional steps.',
    resolution: 'Option A applies: app immediately re-checks the version from Firebase Remote Config when the user returns and redisplays the Force Update dialog. TC-005 and TC-007 must include the step: tap Update → return without updating → verify dialog reappears.',
    affectedTc: 'PP12-TC-005, PP12-TC-007',
    date: '2026-05-16',
  },
];
