import type { ClarifyItem } from '@/types';

export const CONFLICT_ITEMS: ClarifyItem[] = [
  {
    id: 'Q1',
    type: 'question',
    status: 'resolved',
    title: 'Minimum Age Threshold Not Specified',
    body: 'Minimum age threshold for user registration was not stated in the original requirements. Without this value, boundary test cases PP2-TC-040 and PP2-TC-041 could not be written.',
    resolution: 'User must be 18 years old at the registration date. DOB = today − 18 years → accepted; DOB = today − 18 years + 1 day → rejected. Confirmed by Sattawat.w.',
    affectedTc: 'PP2-TC-040, PP2-TC-041',
    date: '2026-04-29',
  },
];
