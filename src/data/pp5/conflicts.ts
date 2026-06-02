import type { ClarifyItem } from '@/types';

export const CONFLICT_ITEMS: ClarifyItem[] = [
  {
    id: 'C1',
    type: 'conflict',
    status: 'pending',
    title: '"No Self-Registration" vs Email Register Flow (PP-55)',
    body: 'PP-5 explicitly states Admin accounts are created by Super Admin via Casdoor Console or an invitation flow only — no self-registration. However, PP-55 (a closed BE subtask) implements a self-registration endpoint (POST /auth/admin/register) with email verification and a pending_approval gate.',
    date: '2026-05-06',
  },
  {
    id: 'Q1',
    type: 'question',
    status: 'pending',
    title: 'Session Timeout Values Not Specified',
    body: 'The requirement mentions an inactivity timeout ("Session ที่ไม่มีการใช้งานเกินเวลาที่กำหนดจะถูกตัดอัตโนมัติ") but does not specify the idle timeout duration, the absolute session duration, or whether values differ between Remember Me = Yes and Remember Me = No. PP5-TC-012 cannot be concretely implemented without these values.',
    affectedTc: 'PP5-TC-012',
    date: '2026-05-06',
  },
  {
    id: 'Q2',
    type: 'question',
    status: 'pending',
    title: 'Change Password UI Location Not Described',
    body: 'PP-102 describes the backend Change Password implementation in full detail, but neither PP-5 nor PP-102 specifies where the Change Password UI is located in the BO Admin Portal, the route/path to the form, or whether it is accessible from a Profile/Settings menu.',
    affectedTc: 'TC-CP01–TC-CP04',
    date: '2026-05-06',
  },
  {
    id: 'Q3',
    type: 'question',
    status: 'pending',
    title: 'full_name Field Constraints Not Specified',
    body: 'PP-55 lists full_name as a required registration field but does not specify maximum/minimum length, allowed character classes (letters only, special chars, Unicode), or whether it is a single field or split into first/last name. Boundary value analysis test cases for the registration form cannot be defined without these constraints.',
    affectedTc: 'TC-R01–TC-R03',
    date: '2026-05-06',
  },
];
