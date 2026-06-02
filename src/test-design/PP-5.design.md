# PP-5 · [BO][Admin] Register & Login — Test Design

> Requirements → [PP-5_Admin_Register_Login.md](../requirements/PP-5_Admin_Register_Login.md)
> Flow Diagram → [PP-5.diagram.md](./PP-5.diagram.md)
> Jira → [PP-5](https://7-solutions.atlassian.net/browse/PP-5)

**Platform:** Web (Desktop, Chrome / Safari, 1280px+)
**Framework:** Playwright (TypeScript)
**App:** POPPA Back-Office (BO) — Admin Portal
**Version:** ▲1 — 2026-05-07 (updated to reflect actual STG: direct login form at `/login`; no Casdoor OAuth2)

---

## A. Technique Selection

| Module | Technique | Rationale |
|---|---|---|
| Login Flow (Direct Form) | State Transition | Linear flow; session check → form display → submit → result |
| Role Validation | Decision Table | Role = Admin / Agency / End-user × outcome = 3 rows |
| Error Handling | Error Guessing + State Transition | Wrong credentials, suspended account, server down — each a distinct state |
| Session Management | State Transition | Session lifecycle: active → idle → expired; logout path |
| Forgot Password | State Transition | Binary: click link → form → submit → email sent |
| Loading / UX | Checklist | Single observable state during submit |

---

## B. Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|---|---|---|---|---|
| Login Flow (Direct Form) | State Transition | PP5-TC-001, PP5-TC-002, PP5-TC-017, PP5-TC-018 | High | 98% |
| Role Validation | Decision Table | PP5-TC-004, PP5-TC-005 | High | 75% * |
| Error Handling | Error Guessing | PP5-TC-006, PP5-TC-007, PP5-TC-008 | High | 80% * |
| Session Management | State Transition | PP5-TC-012, PP5-TC-013, PP5-TC-014, PP5-TC-019 | High | 80% * |
| Forgot Password | State Transition | PP5-TC-015 | Medium | 50% * |
| Loading / UX | Checklist | PP5-TC-016 | Low | 90% |
| **Total (active)** | | **15** | | |
| **Obsolete** | | PP5-TC-003, PP5-TC-009, PP5-TC-010, PP5-TC-011 | | |

*Role/session/forgot-password behavior not fully confirmed on STG — requires test accounts or further exploration.

---

## Test Design Table

| Test Case ID | Automatable | Module | Summary | Objective | Preconditions | Priority | Labels | Test Type | Step # | Test Step | Expected Result | Automation Type | Remarked |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PP5-TC-001 | ⏳ Pending | Login Flow | Login — no session → /login redirect | Verify BO redirects to `/login` when no session exists | No active session; BO URL available | High | smoke, state-transition, web-ui | Functional | 1 | Navigate to BO root URL (`/`) | BO detects no active session; redirected to `/login` | web-ui | Updated — Casdoor redirect removed; redirect target is `/login` (direct Admin Login form confirmed in exploration); credential step extracted to TC-018 ▲1 |
| | | | | | | | | | 2 | Observe page at `/login` | "Admin Login" form visible; email + password fields present; Login button shown | | |
| PP5-TC-002 | ⏳ Pending | Login Flow | Login — valid session → Dashboard (no re-auth) | Verify BO skips `/login` form when session is already valid | Admin previously logged in; session still valid | High | smoke, state-transition, web-ui | Functional | 1 | Open BO URL with valid session active | BO reads existing session | web-ui | |
| | | | | | | | | | 2 | Observe navigation | Redirected to `/dashboard`; Admin Login form not shown | | |
| PP5-TC-003 | ~~⏳ Pending~~ | ~~Login Flow~~ | ~~No BO login form — only redirect button~~ | ~~Verify BO does not expose login form; only Casdoor redirect~~ | ~~No active session~~ | ~~Medium~~ | ~~web-ui~~ | ~~Functional~~ | ~~1~~ | ~~Open BO URL~~ | ~~Redirected to Casdoor Login Page~~ | ~~web-ui~~ | Obsolete ▲1 — Actual STG: BO has email+password form at `/login`; no Casdoor OAuth2 redirect observed |
| PP5-TC-004 | ⏳ Pending | Role Validation | Role — Agency account → access denied | Verify Agency account cannot access BO Dashboard | Valid Agency account in STG; no active session | High | negative, decision-table, web-ui | Negative | 1 | Navigate to `/login`; fill Agency email + password; click Login | Authentication attempted | web-ui, api | Updated — Casdoor steps removed; direct form login ▲1; requires Agency test account in STG |
| | | | | | | | | | 2 | Observe BO response | Access rejected; unauthorized error message shown | | |
| | | | | | | | | | 3 | Verify Dashboard not accessible | Dashboard and admin menu not reachable | | |
| PP5-TC-005 | ⏳ Pending | Role Validation | Role — End-user account → access denied | Verify End-user account cannot access BO Dashboard | Valid End-user account in STG; no active session | High | negative, decision-table, web-ui | Negative | 1 | Navigate to `/login`; fill End-user email + password; click Login | Authentication attempted | web-ui, api | Updated — Casdoor steps removed; direct form login ▲1; requires End-user test account in STG |
| | | | | | | | | | 2 | Observe BO response | Access rejected; unauthorized error message shown | | |
| PP5-TC-006 | ⏳ Pending | Error Handling | Login — wrong password → "Invalid email or password" toast | Verify BO shows error toast on incorrect password | Valid Admin account exists; on `/login` | High | negative, state-transition, web-ui | Negative | 1 | Navigate to `/login`; fill valid Admin email; fill wrong password; click Login | Auth request sent | web-ui | Updated — Casdoor removed; actual: "Invalid email or password" toast on BO confirmed in exploration ▲1 |
| | | | | | | | | | 2 | Observe BO | "Invalid email or password" toast shown at top-right; form stays on `/login`; email field retains value | | |
| PP5-TC-007 | ⏳ Pending | Error Handling | Login — suspended account → error shown | Verify suspended account is rejected at login | Admin account with suspended status in STG; on `/login` | High | negative, state-transition, web-ui | Negative | 1 | Navigate to `/login`; fill credentials of suspended account; click Login | Auth request sent | web-ui | Updated — Casdoor removed; exact error message unknown — requires suspended test account ▲1 |
| | | | | | | | | | 2 | Observe BO | Error shown; login rejected; form stays on `/login` | | |
| PP5-TC-008 | ❌ Manual | Error Handling | Server unavailable — connection error shown | Verify BO shows error when backend is unreachable | Backend service down or network blocked | Medium | negative, web-ui, manual | Negative | 1 | Navigate to `/login`; fill valid credentials; click Login (backend unreachable) | Login request sent; backend unreachable | — | Manual only — requires network/infra manipulation |
| | | | | | | | | | 2 | Observe BO | Server error message shown; user not logged in | | |
| PP5-TC-009 | ~~❌ Manual~~ | ~~Error Handling~~ | ~~Invalid authorization code — backend error~~ | ~~Verify backend rejects tampered OAuth code~~ | ~~Admin reaches BO callback URL; code altered~~ | ~~Medium~~ | ~~negative, manual~~ | ~~Negative~~ | ~~1~~ | ~~Intercept BO callback URL; tamper `code` parameter~~ | ~~Modified code sent to backend~~ | ~~—~~ | Obsolete ▲1 — No OAuth2 authorization code flow exists on STG; direct login form used |
| PP5-TC-010 | ~~⏳ Pending~~ | ~~Session Management~~ | ~~Remember Me — session persists after browser close~~ | ~~Verify persistent session survives browser close~~ | ~~Admin logged in with Remember Me checked~~ | ~~High~~ | ~~state-transition, web-ui~~ | ~~Functional~~ | ~~1~~ | ~~Login with Remember Me enabled~~ | ~~Dashboard shown~~ | ~~web-ui~~ | Obsolete ▲1 — No Remember Me checkbox found on STG `/login` page |
| PP5-TC-011 | ~~⏳ Pending~~ | ~~Session Management~~ | ~~No Remember Me — session ends on browser close~~ | ~~Verify temp session is cleared when browser closes~~ | ~~Admin logged in without Remember Me~~ | ~~High~~ | ~~state-transition, web-ui~~ | ~~Functional~~ | ~~1~~ | ~~Login without Remember Me~~ | ~~Dashboard shown~~ | ~~web-ui~~ | Obsolete ▲1 — No Remember Me checkbox found on STG `/login` page |
| PP5-TC-012 | ⏳ Pending | Session Management | Session — inactivity timeout → /login redirect | Verify session is invalidated after inactivity timeout | Admin logged in; session timeout threshold known | High | state-transition, web-ui | Functional | 1 | Log in; leave BO idle past inactivity timeout | Timeout elapses | web-ui | Updated — redirect target is `/login` ▲1; UI assertion automatable; requires STG short-TTL config or long wait |
| | | | | | | | | | 2 | Attempt any BO action | Session invalidated; redirected to `/login` | | |
| PP5-TC-013 | ⏳ Pending | Session Management | Session — active use keeps session alive | Verify session remains valid during continuous active use | Admin logged in; using BO within inactivity window | Medium | state-transition, web-ui | Functional | 1 | Log in; perform actions continuously within timeout window | Session remains active | web-ui | |
| | | | | | | | | | 2 | Observe BO | No unexpected logout or redirect to `/login` | | |
| PP5-TC-014 | ⏳ Pending | Session Management | Logout — click logout → /login redirect | Verify logout invalidates session and redirects to `/login` | Admin logged in; on Dashboard | High | smoke, state-transition, web-ui | Functional | 1 | Click logout arrow icon (→) at bottom-left sidebar | Logout request sent; session destroyed | web-ui | Updated — redirect target is `/login` (not Casdoor); logout via → icon confirmed in exploration; session-destroyed assertion extracted to TC-019 ▲1 |
| | | | | | | | | | 2 | Observe navigation | Redirected to `/login`; Admin Login form shown | | |
| PP5-TC-015 | ⏳ Pending | Forgot Password | Forgot password — link visible on /login | Verify "Forgot password?" link exists on `/login` and triggers reset flow | On `/login` | Medium | state-transition, web-ui | Functional | 1 | Navigate to `/login` | "Forgot password?" link visible above password field | web-ui | Updated — link confirmed in exploration; reset flow not yet explored on STG ▲1 |
| | | | | | | | | | 2 | Click "Forgot password?" | Reset flow triggered; page transition occurs (destination TBD) | | |
| PP5-TC-016 | ⏳ Pending | Loading / UX | Login — button shows "Logging in..." during submit | Verify Login button text changes to "Logging in..." during auth | On `/login`; valid credentials filled | Low | web-ui | Functional | 1 | Fill valid Admin email + password; click Login | Login request in progress | web-ui | Updated — spinner removed; actual: button text "Logging in..." confirmed in exploration; may require network throttle ▲1 |
| | | | | | | | | | 2 | Observe Login button immediately after click | Button text = "Logging in..."; button disabled during auth | | |
| PP5-TC-017 | ⏳ Pending | Login Flow | Session guard — direct protected URL → /login | Verify unauthenticated access to protected route redirects to `/login` | No active session | High | smoke, state-transition, web-ui | Functional | 1 | Navigate directly to `/dashboard/events` without session | RBAC guard intercepts | web-ui | Updated — redirect target confirmed as `/login` in exploration ▲1 |
| | | | | | | | | | 2 | Observe navigation | Redirected to `/login`; protected page not loaded | | |
| PP5-TC-018 | ⏳ Pending | Login Flow | Login — valid credentials → Dashboard shown | Verify correct email + password results in Dashboard access | Valid Admin account; on `/login` | High | smoke, state-transition, web-ui | Functional | 1 | Navigate to `/login`; fill valid Admin email and password | Form filled; no inline errors | web-ui | New TC — split from original TC-001 (credential submission step) ▲1 |
| | | | | | | | | | 2 | Click Login button | Authentication request sent; button shows "Logging in..." | | |
| | | | | | | | | | 3 | Observe navigation after auth | Redirected to `/dashboard`; admin nav items visible (Dashboard, Events, Users, Organizers, etc.) | | |
| PP5-TC-019 | ⏳ Pending | Session Management | Session destroyed after logout — protected URL → /login | Verify session is fully cleared after logout; no cached access | Admin has just completed logout (TC-014 precondition); on `/login` | High | state-transition, web-ui | Functional | 1 | After logout; navigate directly to `/dashboard/events` | RBAC guard checks session state | web-ui | New TC — split from original TC-014 step 3 ▲1 |
| | | | | | | | | | 2 | Observe navigation | Redirected to `/login`; no auto-login | | |

---

## C. Diagram Coverage Mapping

| Ref ID | Type | Label | Covered By TC | Status |
|---|---|---|---|---|
| S1 | State | BO URL Opened | PP5-TC-001, PP5-TC-002, PP5-TC-017 | Covered |
| S2 | State | Session Check | PP5-TC-001, PP5-TC-002, PP5-TC-017 | Covered |
| S3 | State | Valid Session — Dashboard | PP5-TC-002 | Covered |
| S4 | State | `/login` — Admin Login Form | PP5-TC-001, PP5-TC-006, PP5-TC-007, PP5-TC-015, PP5-TC-016, PP5-TC-017, PP5-TC-018 | Covered |
| S5 | State | Credentials Entered | PP5-TC-018, PP5-TC-006, PP5-TC-007 | Covered |
| S6 | State | Backend Authentication | PP5-TC-018, PP5-TC-006, PP5-TC-007 | Covered |
| S7 | State | Auth Failed — Error Toast | PP5-TC-006, PP5-TC-007 | Partial |
| S8 | State | Session Created | PP5-TC-018 | Covered |
| S9 | State | BO Dashboard | PP5-TC-018, PP5-TC-002, PP5-TC-013, PP5-TC-014 | Covered |
| S15 | State | ~~Remember Me Check~~ | ~~PP5-TC-010, PP5-TC-011~~ | Missing Coverage |
| S16 | State | ~~Persistent Session~~ | ~~PP5-TC-010~~ | Missing Coverage |
| S17 | State | ~~Temporary Session~~ | ~~PP5-TC-011~~ | Missing Coverage |
| S18 | State | BO Dashboard (active) | PP5-TC-013, PP5-TC-014, PP5-TC-019 | Covered |
| S19 | State | Inactivity Monitor | PP5-TC-012 | Covered |
| S20 | State | Session Invalidated | PP5-TC-012 | Covered |
| S21 | State | Login Page (re-auth after session event) | PP5-TC-012, PP5-TC-014, PP5-TC-019 | Covered |
| S22 | State | Logout | PP5-TC-014 | Covered |
| S24 | State | Auth Failed — Wrong Password | PP5-TC-006 | Covered |
| S25 | State | Auth Failed — Suspended Account | PP5-TC-007 | Covered |
| S26 | State | Server Unavailable | PP5-TC-008 | Covered |
| S27 | State | ~~Invalid Authorization Code~~ | ~~PP5-TC-009~~ | Missing Coverage |
| S28 | State | Unauthorized Role | PP5-TC-004, PP5-TC-005 | Covered |
| S29 | State | Forgot Password | PP5-TC-015 | Covered |
| S30 | State | Password Reset Email Sent | PP5-TC-015 | Partial |
| T1 | Transition | No session → redirect to `/login` | PP5-TC-001, PP5-TC-017 | Covered |
| T2 | Transition | Valid session → Dashboard | PP5-TC-002 | Covered |
| T3 | Transition | Fill credentials; click Login | PP5-TC-018, PP5-TC-006, PP5-TC-007 | Covered |
| T4 | Transition | Auth fails → error toast | PP5-TC-006, PP5-TC-007 | Covered |
| T5 | Transition | Error → retry (stay on `/login`) | PP5-TC-006 | Covered |
| T6 | Transition | Auth succeeds → session created | PP5-TC-018 | Covered |
| T7 | Transition | Navigate to Dashboard | PP5-TC-018 | Covered |
| T9 | Transition | Non-Admin role → reject | PP5-TC-004, PP5-TC-005 | Covered |
| T11 | Transition | ~~Remember Me = Yes~~ | ~~PP5-TC-010~~ | Missing Coverage |
| T12 | Transition | ~~Remember Me = No~~ | ~~PP5-TC-011~~ | Missing Coverage |
| T14 | Transition | Inactivity timeout → invalidate | PP5-TC-012 | Covered |
| T15 | Transition | Active → session continues | PP5-TC-013 | Covered |
| T16 | Transition | Admin clicks Logout | PP5-TC-014 | Covered |
| T22 | Transition | Click Forgot Password | PP5-TC-015 | Covered |
| T23 | Transition | Reset email dispatched | PP5-TC-015 | Partial |

### Coverage Report

```
Total active states:      21
Total active transitions: 16

Covered:            32  (78%)
Partial:             3  (7%)
Missing Coverage:    5  (12%) — all are Casdoor/Remember Me nodes not present on STG
```

Missing Coverage justification:
- S15, S16, S17, T11, T12 — no Remember Me checkbox on STG; TC-010 and TC-011 marked Obsolete
- S27 — no OAuth2 authorization code flow on STG; TC-009 marked Obsolete

---

## Test Data Requirements

| Data | Value / Source |
|------|----------------|
| Admin account — valid | STG Admin account; credentials via `ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars |
| Agency account — test | STG Agency account for role-rejection tests; `TEST_AGENCY_EMAIL` / `TEST_AGENCY_PASSWORD` |
| End-user account — test | STG End-user account for role-rejection tests; `TEST_USER_EMAIL` / `TEST_USER_PASSWORD` |
| Suspended Admin account | Pre-suspended in STG; `TEST_SUSPENDED_EMAIL` / `TEST_SUSPENDED_PASSWORD` |
| Session timeout threshold | Configured in STG backend; confirm value with developer |
| BO protected URL | `/dashboard/events` — used in PP5-TC-017, PP5-TC-019 |

---

## Automation Notes

- **Framework:** Playwright (TypeScript)
- **Scope:** Web (Desktop 1280px+, Chrome / Safari)
- **Ready to implement (⏳ Pending):** PP5-TC-001, PP5-TC-002, PP5-TC-006, PP5-TC-013, PP5-TC-014, PP5-TC-016, PP5-TC-017, PP5-TC-018, PP5-TC-019
- **Need test accounts:** PP5-TC-004, PP5-TC-005 (Agency/End-user), PP5-TC-007 (suspended account)
- **Need STG session control:** PP5-TC-012 (inactivity timeout — needs STG short-TTL config or long wait)
- **Manual only (❌):** PP5-TC-008 (server down — infra), PP5-TC-015 (email delivery verification)
- **Obsolete:** PP5-TC-003, PP5-TC-009, PP5-TC-010, PP5-TC-011
- **Confirmed locators (from exploration):**
  - Email: `input[name="email"]`
  - Password: `input[name="password"]`
  - Login button: `page.getByRole('button', { name: 'Login' })`
  - Error toast: `page.getByText('Invalid email or password')`
  - Logout: arrow icon (→) at bottom-left sidebar — exact selector TBD
  - Dashboard nav items: `page.getByRole('link', { name: 'Events' })` etc.
