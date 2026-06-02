# PP-5 Admin Portal — Exploration Notes

**Date:** 2026-05-07
**Environment:** STG — https://stg-admin.poppa.com/
**Credentials:** admin@poppa.com / @7Solutions!

---

## Screen Inventory

| Screen | URL | Screenshot |
|---|---|---|
| Login page (unauthenticated) | `/login` | S01-bo-landing.png |
| Login page (after click) | `/login` | S02-casdoor-login.png |
| Credentials filled (before submit) | `/login` | S03-credentials-filled.png |
| After submit (loading state) | `/login` | S04a-after-submit.png |
| Dashboard (authenticated) | `/dashboard` | S04c-dashboard.png |
| Wrong password error | `/login` | S05-wrong-password-error.png |
| After logout | `/login` | S06b-after-logout.png |
| Direct URL without session | `/login` | S07-direct-url-unauthenticated.png |

---

## Key Observations

### Login Flow — ACTUAL vs DESIGN

| Expected (from PP-5 design) | Actual (STG) |
|---|---|
| BO redirects to Casdoor OAuth2 page | BO has its own login form at `/login` — no OAuth2 redirect |
| "เข้าสู่ระบบด้วย Poppa Account" button, no email/password on BO | "Admin Login" form with email + password directly on BO |
| Loading spinner "กำลังตรวจสอบสิทธิ์..." during OAuth callback | Submit button text changes to "Logging in..." during auth |
| Casdoor shows credential error | BO shows "Invalid email or password" toast on BO |
| Remember Me checkbox on Casdoor | No Remember Me checkbox found anywhere |

### Login Page (S01, S03)
- **Title:** "Admin Login"
- **Subtitle:** "Enter your email and password to access the admin panel"
- **Fields:**
  - Email: `input[name="email"]`, type=`email`, placeholder="Enter email"
  - Password: `input[name="password"]`, type=`password`, placeholder="Enter password"
- **Forgot password:** Link at top-right of password field label
- **Submit:** Orange "Login" button (`button[type="submit"]`)
- **Loading state:** Button text changes to "Logging in..." during submission
- **No Remember Me checkbox**
- **Left panel:** Runners image + "POPPA ADMIN" logo/branding

### Error State (S05)
- Error shown as **red toast** at top-right of page
- Error text: **"Invalid email or password"**
- Login form stays on `/login`; email field retains entered value

### Dashboard (S04c)
- **Left sidebar nav items:** Dashboard (active), Events, Users, Organizers, Payments, Notifications, Agencies, Reviews, Reports
- **Stats cards:** Total Users, Total Organizers, Total Events, Total Revenue
- **Quick Actions:** Pending Verifications, Pending Refunds, Flagged Reviews
- **User info (bottom-left):** "Platform Admin / Super Admin" with logout arrow icon (→)

### Logout (S06b)
- Logout: arrow icon (→) adjacent to user info at bottom-left sidebar
- After logout: redirected back to `/login`

### Protected Route Guard (S07)
- Navigating to `/dashboard/events` without session → redirected to `/login`

---

## Impact on PP-5 Design

| TC | Status | Finding |
|---|---|---|
| PP5-TC-001 | ⚠️ Update needed | Steps reference Casdoor redirect; actual flow is direct form at /login |
| PP5-TC-002 | ✅ Valid | Concept unchanged: valid session → Dashboard |
| PP5-TC-003 | ❌ Invalid | Design says "no form on BO" — ACTUAL: BO HAS email+password form |
| PP5-TC-004 | ❓ Unknown | Role validation still possible; need non-admin test account |
| PP5-TC-005 | ❓ Unknown | Same as TC-004 |
| PP5-TC-006 | ✅ Valid | Wrong password → error toast confirmed; message: "Invalid email or password" |
| PP5-TC-007 | ❓ Unknown | Suspended account behavior unknown without test account |
| PP5-TC-008 | ✅ Valid (manual) | Server-down scenario — still manual |
| PP5-TC-009 | N/A | No OAuth2 callback code to tamper — this TC is invalid for current implementation |
| PP5-TC-010 | ❌ Invalid | No "Remember Me" checkbox exists |
| PP5-TC-011 | ❌ Invalid | No "Remember Me" checkbox exists |
| PP5-TC-012 | ❓ Unknown | Session timeout — behavior unknown; needs investigation |
| PP5-TC-013 | ❓ Unknown | Active session — behavior unknown |
| PP5-TC-014 | ✅ Valid | Logout → /login confirmed; logout via arrow icon at bottom-left sidebar |
| PP5-TC-015 | ❓ Unknown | "Forgot password?" link exists on login page; flow not explored |
| PP5-TC-016 | ⚠️ Update needed | Loading: button text "Logging in..." (not a separate spinner); may be too brief to assert |
| PP5-TC-017 | ✅ Valid | Direct /dashboard/events → /login confirmed |

### Summary
- **Confirmed valid (no changes):** TC-002, TC-006, TC-014, TC-017
- **Need step updates:** TC-001, TC-016
- **Invalid / inapplicable:** TC-003, TC-009, TC-010, TC-011
- **Unknown (need further investigation or test accounts):** TC-004, TC-005, TC-007, TC-012, TC-013, TC-015

---

## Element Locators (Confirmed on STG)

| Element | Locator |
|---|---|
| Email input | `page.locator('input[name="email"]')` |
| Password input | `page.locator('input[name="password"]')` |
| Login button | `page.getByRole('button', { name: 'Login' })` |
| Forgot password link | `page.getByText('Forgot password?')` |
| Error toast | `page.getByText('Invalid email or password')` |
| Logout button | `page.locator('[class*="logout"], button').filter({ hasText: /logout/i })` or bottom-left arrow icon |
| Dashboard nav — Events | `page.getByRole('link', { name: 'Events' })` |
| Dashboard nav — Organizers | `page.getByRole('link', { name: 'Organizers' })` |
