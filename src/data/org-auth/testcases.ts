import type { TcSectionDef } from '@/types';

export const TC_SECTIONS: TcSectionDef[] = [
  {
    sectionId: 'tc-happy',
    num: '5',
    title: 'Test Cases · Happy Path — 200',
    subtitle: 'OA-TC-001 · POST /api/v1/auth/login',
    cols: ['module', 'type', 'labels'],
    rows: [
      { id: 'OA-TC-001', module: 'Login', summary: 'POST login — valid credentials → 200 + full token contract (accessToken, refreshToken, expiresIn, tokenType)', type: 'Functional', priority: 'high', auto: 'auto', labels: [['smoke','Smoke'],['api','API'],['ep','EP']] },
    ],
  },
  {
    sectionId: 'tc-auth-fail',
    num: '6',
    title: 'Test Cases · Auth Failures — 401',
    subtitle: 'OA-TC-002–003 · wrong password · unregistered email',
    cols: ['module', 'type', 'labels'],
    rows: [
      { id: 'OA-TC-002', module: 'Login', summary: 'POST login — wrong password → 401 + error + message fields', type: 'Negative', priority: 'high', auto: 'auto', labels: [['negative','Negative'],['api','API'],['regression','Regression']] },
      { id: 'OA-TC-003', module: 'Login', summary: 'POST login — unregistered email → 401 (no email enumeration — same shape as TC-002)', type: 'Negative', priority: 'high', auto: 'auto', labels: [['negative','Negative'],['api','API'],['regression','Regression']] },
    ],
  },
  {
    sectionId: 'tc-validation',
    num: '7',
    title: 'Test Cases · Schema Validation — 400',
    subtitle: 'OA-TC-004–009 · missing fields · format · BVA · additionalProperties',
    cols: ['module', 'type', 'labels'],
    rows: [
      { id: 'OA-TC-004', module: 'Login — Validation', summary: 'POST login — missing email → 400 (email is required)', type: 'Negative', priority: 'high', auto: 'auto', labels: [['negative','Negative'],['api','API'],['ep','EP'],['regression','Regression']] },
      { id: 'OA-TC-005', module: 'Login — Validation', summary: 'POST login — missing password → 400 (password is required)', type: 'Negative', priority: 'high', auto: 'auto', labels: [['negative','Negative'],['api','API'],['ep','EP'],['regression','Regression']] },
      { id: 'OA-TC-006', module: 'Login — Validation', summary: 'POST login — empty body → 400 (both required fields missing)', type: 'Negative', priority: 'medium', auto: 'auto', labels: [['negative','Negative'],['api','API'],['ep','EP']] },
      { id: 'OA-TC-007', module: 'Login — Validation', summary: 'POST login — invalid email format → 400 (format: email constraint)', type: 'Negative', priority: 'high', auto: 'auto', labels: [['negative','Negative'],['api','API'],['ep','EP'],['regression','Regression']] },
      { id: 'OA-TC-008', module: 'Login — Validation', summary: 'POST login — password BVA: 7 chars → 400 (minLength violation); 8 chars → 401 (schema passes, auth fails)', type: 'Boundary', priority: 'high', auto: 'auto', labels: [['bva','BVA'],['api','API'],['boundary','Boundary'],['regression','Regression']] },
      { id: 'OA-TC-009', module: 'Login — Validation', summary: 'POST login — extra field in body → 400 (additionalProperties: false)', type: 'Negative', priority: 'medium', auto: 'auto', labels: [['negative','Negative'],['api','API'],['ep','EP']] },
    ],
  },
];
