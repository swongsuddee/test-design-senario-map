# PP-2 · Registration & Login — Test Design

> Requirements → [PP-2_Registration_Login.md](../requirements/PP-2_Registration_Login.md)
> Flow Diagram → [PP-2.diagram.md](./PP-2.diagram.md)
> Jira subtask → [PP-10](https://7-solutions.atlassian.net/browse/PP-10)

**Platform:** Mobile (iOS / Android)
**Framework:** WebdriverIO + Appium + Mocha (TypeScript)
**App:** POPPA Flutter App
**Redesign:** ▲1 — Technique-based redesign. Format 14-column Zephyr flat-row. IDs PP2-TC-001–PP2-TC-036 preserved. PP2-TC-037–PP2-TC-043 added for coverage gaps. ▲2 — Added Automatable and Automation Type columns.

---

## A. Technique Selection

| Module | Technique | Rationale |
|---|---|---|
| Phone Input Validation | EP + BVA | 10-digit rule creates clear BVA boundaries at 9 / 10 / 11. Auto-clean dashes/spaces is a separate EP valid class. |
| OTP Validation | State Transition + BVA | OTP screen has distinct states (waiting, error, resend-ready, rate-limited). BVA on digit count: 5 under / 6 exact. |
| Social Login — Google / LINE | State Transition | Linear OAuth → email check → profile check. Two exit states per provider. |
| Apple Login | State Transition + Decision Table | Two conditions: Hide Email (Yes/No) × User type (New/Existing) = 4 combinations. |
| Identity Linking | Decision Table | Email in system (Yes/No) × Same provider (Yes/No) → 3 meaningful outcomes. |
| Onboarding — PDPA | State Transition | Binary gate: Accept → proceed / Decline → blocked. |
| Onboarding — Basic Identity | EP + BVA | Name (empty/valid), DOB (future/today-boundary/valid-past/min-age boundary), Gender (none/selected). |
| Onboarding — Interests | BVA | Count boundaries: 0 blocked / 1 min valid / 3 max valid / 4 blocked. |
| Session Persistence | State Transition + Decision Table | Token exists × valid × near-expiry → 4 distinct outcomes. |

---

## B. Coverage Summary

| Module | Technique | Existing TCs | New TCs | Risk | Confidence |
|---|---|---|---|---|---|
| Phone Input Validation | EP + BVA | PP2-TC-001–PP2-TC-005 | PP2-TC-037 | High | 97% |
| OTP Validation | State Transition + BVA | PP2-TC-006–PP2-TC-010 | PP2-TC-038 | High | 97% |
| Social Login — Google / LINE | State Transition | PP2-TC-011–PP2-TC-014 | — | High | 97% |
| Apple Login | State Transition + Decision Table | PP2-TC-015–PP2-TC-017, PP2-TC-035 | — | High | 97% |
| Identity Linking | Decision Table | PP2-TC-018–PP2-TC-020 | PP2-TC-039 | High | 95% |
| Onboarding — PDPA | State Transition | PP2-TC-021–PP2-TC-022 | — | Medium | 97% |
| Onboarding — Basic Identity | EP + BVA | PP2-TC-023–PP2-TC-027 | PP2-TC-040, PP2-TC-041 | Medium | 90% |
| Onboarding — Interests | BVA | PP2-TC-028–PP2-TC-030 | — | Medium | 97% |
| Session Persistence | State Transition + DT | PP2-TC-031–PP2-TC-032 | PP2-TC-042, PP2-TC-043 | Medium | 97% |
| Edge Cases | Error Guessing | PP2-TC-033–PP2-TC-036 | — | Low | 97% |
| **Total** | | **36** | **7** | | **43** |

---

## Test Design Table

| Test Case ID | Module | Summary | Objective | Preconditions | Priority | Labels | Test Type | Step # | Test Step | Expected Result | Automatable | Automation Type | Remarked |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PP2-TC-001 | Phone Login | Phone login happy path — new user lands on PDPA | Verify a new unregistered phone completes OTP and enters onboarding | Phone not in system; app on Login screen | High | smoke, ep, state-transition, mobile, automation-candidate | Functional | 1 | Tap Phone Number login option | Phone Input screen appears | Yes | mobile-ui | |
| | | | | | | | | 2 | Enter valid 10-digit number e.g. 0812345678 | Input accepted; no error; OTP button enabled | | | |
| | | | | | | | | 3 | Tap Send OTP button | OTP screen appears; 60-second countdown starts | | | |
| | | | | | | | | 4 | Enter correct 6-digit OTP | OTP accepted | | | |
| | | | | | | | | 5 | Observe navigation | PDPA Consent screen appears | | | |
| PP2-TC-002 | Phone Login | Phone too short — error shown; OTP button disabled | Verify 9-digit input triggers inline error and disables Send OTP | App on Phone Input screen | High | negative, bva, mobile, automation-candidate | Negative | 1 | Enter 9-digit number e.g. 081234567 | Inline error message shown immediately; OTP button disabled | Yes | mobile-ui | |
| | | | | | | | | 2 | Add one more digit to reach 10 digits | Error clears; OTP button becomes enabled | | | |
| PP2-TC-003 | Phone Login | Phone with dashes auto-cleaned — field shows digits only | Verify non-numeric separators are stripped automatically | App on Phone Input screen | Medium | ep, mobile, automation-candidate | Functional | 1 | Enter 081-234-5678 (with dashes) | Dashes stripped; field displays 0812345678 | Yes | mobile-ui | |
| | | | | | | | | 2 | Verify displayed value | 10-digit numeric string shown | | | |
| PP2-TC-004 | Phone Login | Phone stored in international format | Verify leading-zero number is stored as +66 in backend | Phone not in system; app on Phone Input screen | Medium | ep, mobile, automation-candidate | Functional | 1 | Enter 0812345678 and complete OTP | OTP verified; user proceeds | Partial | mobile-ui, api | UI steps automated; DB/API check requires a separate API assertion |
| | | | | | | | | 2 | Check stored phone via API or DB | Stored as +66812345678 | | | |
| PP2-TC-005 | Phone Login | Phone login happy path — existing user goes to Home | Verify registered phone skips onboarding and lands on Home | Phone already registered; profile in DB | High | smoke, state-transition, mobile, automation-candidate | Functional | 1 | Enter registered phone number | Input accepted | Yes | mobile-ui | |
| | | | | | | | | 2 | Enter correct OTP | OTP verified | | | |
| | | | | | | | | 3 | Observe navigation | Home page displayed; no PDPA or onboarding | | | |
| PP2-TC-006 | OTP Flow | OTP countdown timer visible; Resend disabled initially | Verify 60s countdown starts and Resend is disabled until it expires | OTP screen visible after Send OTP | Medium | state-transition, mobile, automation-candidate | Functional | 1 | Observe OTP screen immediately after sending | Countdown timer visible starting at 60 seconds | Yes | mobile-ui | |
| | | | | | | | | 2 | Verify Resend button state | Resend button is disabled | | | |
| | | | | | | | | 3 | Wait 60 seconds | Timer reaches 0 | | | |
| | | | | | | | | 4 | Observe Resend button | Resend button becomes enabled | | | |
| PP2-TC-007 | OTP Flow | Resend OTP within rate limit — countdown resets | Verify resend is allowed up to 3 times per 5-min window | OTP screen; first OTP sent | Medium | state-transition, mobile, automation-candidate | Functional | 1 | Wait 60s for countdown to expire | Resend button enabled | Yes | mobile-ui | |
| | | | | | | | | 2 | Tap Resend (1st resend — total 2 OTPs sent) | New OTP sent; countdown resets to 60s | | | |
| | | | | | | | | 3 | Wait 60s; tap Resend again (2nd resend — total 3 OTPs) | New OTP sent; rate limit not yet reached | | | |
| PP2-TC-008 | OTP Flow | OTP rate limit exceeded — 4th request blocked | Verify 4th OTP request within 5 min window is blocked server-side | 3 OTP requests already sent within 5 minutes | Medium | negative, bva, state-transition, mobile, manual | Negative | 1 | Attempt 4th Resend within the 5-minute window | Request blocked; error or rate-limit message shown | Partial | mobile-ui | UI assertion automatable; precondition (3 prior OTPs in window) requires STG reset API or manual setup |
| PP2-TC-009 | OTP Flow | Wrong OTP shows error; correct OTP proceeds | Verify error on invalid OTP and success on valid OTP | OTP screen; valid OTP sent to device | High | negative, state-transition, mobile, automation-candidate | Negative | 1 | Enter wrong 6-digit OTP | Error message shown; user remains on OTP screen | Yes | mobile-ui | |
| | | | | | | | | 2 | Enter correct 6-digit OTP | OTP accepted; navigate to next step | | | |
| PP2-TC-010 | OTP Flow | OTP input cleared after wrong entry | Verify OTP fields are reset after an invalid submission | OTP screen | Medium | state-transition, mobile, automation-candidate | Functional | 1 | Enter wrong OTP | Error shown | Yes | mobile-ui | |
| | | | | | | | | 2 | Observe OTP input fields | Fields cleared and ready for re-entry | | | |
| PP2-TC-011 | Google Login | Google login — new user lands on PDPA | Verify new Google account enters onboarding | Google email not in system | High | state-transition, mobile, manual | Functional | 1 | Tap Google on Login page | Google OAuth sheet or webview appears | No | — | OAuth WebView requires pre-authenticated session; cannot automate reliably |
| | | | | | | | | 2 | Select / confirm Google account | OAuth completes; email not in system | | | |
| | | | | | | | | 3 | Observe navigation | PDPA Consent screen appears | | | |
| PP2-TC-012 | Google Login | Google login — existing user goes to Home | Verify existing Google account skips onboarding | Google email already registered via Google | High | state-transition, mobile, manual | Functional | 1 | Tap Google; complete OAuth | Email matched; same provider; profile found | No | — | OAuth WebView; same constraint as PP2-TC-011 |
| | | | | | | | | 2 | Observe navigation | Home page displayed | | | |
| PP2-TC-013 | LINE Login | LINE login — new user lands on PDPA | Verify new LINE account enters onboarding | LINE email not in system | High | state-transition, mobile, manual | Functional | 1 | Tap LINE on Login page | LINE OAuth webview appears | No | — | LINE OAuth WebView; cannot automate reliably |
| | | | | | | | | 2 | Complete LINE authentication | Email not in system | | | |
| | | | | | | | | 3 | Observe navigation | PDPA Consent screen appears | | | |
| PP2-TC-014 | LINE Login | LINE login — existing user goes to Home | Verify existing LINE account skips onboarding | LINE email registered via LINE | High | state-transition, mobile, manual | Functional | 1 | Tap LINE; complete OAuth | Profile found via same provider | No | — | LINE OAuth WebView; same constraint as PP2-TC-013 |
| | | | | | | | | 2 | Observe navigation | Home page displayed | | | |
| PP2-TC-015 | Apple Login | Apple login — new user; real email; lands on PDPA | Verify Apple new user with shared real email enters onboarding | Apple ID not registered; user shares real email | High | state-transition, decision-table, mobile, ios-only, device-only, manual | Functional | 1 | Tap Apple ID on Login page | Apple Sign In sheet appears | No | — | Apple Sign In sheet is a system UI; cannot be automated even on device |
| | | | | | | | | 2 | Authenticate; choose Share My Email | OAuth completes with real email | | | |
| | | | | | | | | 3 | Observe navigation | PDPA Consent screen appears | | | |
| PP2-TC-016 | Apple Login | Apple login — new user; Hide My Email; PDPA shown | Verify Apple private relay email is accepted for new user | Apple ID not registered; user hides email | High | state-transition, decision-table, mobile, ios-only, device-only, manual | Functional | 1 | Tap Apple ID; authenticate; choose Hide My Email | Apple-generated private relay email used | No | — | Apple Sign In system sheet; cannot be automated |
| | | | | | | | | 2 | Observe navigation | PDPA Consent screen appears | | | |
| | | | | | | | | 3 | Verify stored email via API | Private relay address stored (not real email) | | | |
| PP2-TC-017 | Apple Login | Apple login — existing user goes to Home | Verify existing Apple account skips onboarding | Apple ID already registered | High | state-transition, decision-table, mobile, ios-only, device-only, manual | Functional | 1 | Tap Apple ID; complete auth | Profile found | No | — | Apple Sign In system sheet; cannot be automated |
| | | | | | | | | 2 | Observe navigation | Home page displayed; no onboarding | | | |
| PP2-TC-018 | Identity Linking | Duplicate email (diff provider) triggers linking dialog | Verify email conflict between Google and LINE triggers the dialog | test@gmail.com registered via Google; user attempts LINE login with same email | High | decision-table, state-transition, mobile, manual | Functional | 1 | Tap LINE; authenticate with account using test@gmail.com | Email conflict detected | No | — | Requires LINE OAuth WebView with a specific pre-seeded account |
| | | | | | | | | 2 | Observe UI | Identity Linking dialog appears with both providers shown | | | |
| PP2-TC-019 | Identity Linking | Confirm linking — accounts merged; navigate to Home | Verify confirming link merges accounts and proceeds | Identity Linking dialog visible (PP2-TC-018 setup) | High | decision-table, state-transition, mobile, manual | Functional | 1 | Tap Confirm / Link Account | Accounts merged | No | — | Depends on OAuth precondition from PP2-TC-018 |
| | | | | | | | | 2 | Observe navigation | Proceeds to profile check; existing user → Home | | | |
| | | | | | | | | 3 | Verify either provider can log in | Google and LINE both authenticate the same account | | | |
| PP2-TC-020 | Identity Linking | Cancel linking — returns to Login page | Verify cancelling the dialog returns to Login without changes | Identity Linking dialog visible | Medium | decision-table, state-transition, mobile, manual | Functional | 1 | Tap Cancel on Identity Linking dialog | Dialog dismissed | No | — | Depends on OAuth precondition from PP2-TC-018 |
| | | | | | | | | 2 | Observe navigation | Login page displayed; no accounts merged | | | |
| PP2-TC-021 | Onboarding — PDPA | PDPA is first screen after new user auth | Verify PDPA is shown immediately after any new-user auth succeeds | New user completed auth via any provider | High | smoke, state-transition, mobile, automation-candidate | Functional | 1 | Complete auth as new user | PDPA Consent screen is the first screen | Yes | mobile-ui | |
| | | | | | | | | 2 | Verify screen content | Terms and Privacy text visible; Accept button present | | | |
| PP2-TC-022 | Onboarding — PDPA | Accepting PDPA navigates to Basic Identity | Verify PDPA must be accepted to proceed; Accept leads to Basic Identity screen | PDPA screen visible | High | state-transition, mobile, automation-candidate | Functional | 1 | Attempt to navigate past PDPA without accepting | Cannot proceed; PDPA remains shown | Yes | mobile-ui | |
| | | | | | | | | 2 | Tap Accept | Navigates to Basic Identity screen | | | |
| PP2-TC-023 | Onboarding — Basic Identity | Empty display name — inline error on Next tap | Verify name field is required | Basic Identity screen; PDPA accepted | High | ep, negative, mobile, automation-candidate | Negative | 1 | Leave Display Name empty; tap Next | Inline error shown on Name field | Yes | mobile-ui | |
| | | | | | | | | 2 | Enter valid display name | Error clears | | | |
| PP2-TC-024 | Onboarding — Basic Identity | Future DOB rejected; valid past date accepted | Verify DOB cannot be in the future | Basic Identity screen | High | ep, bva, negative, mobile, automation-candidate | Negative | 1 | Enter a future date as DOB | Error shown: date of birth cannot be in the future | Yes | mobile-ui | |
| | | | | | | | | 2 | Enter a valid past date in DD/MM/YYYY AD format | Date accepted; error cleared | | | |
| PP2-TC-025 | Onboarding — Basic Identity | DOB uses AD year — not Buddhist Era | Verify year display and storage is Gregorian (ค.ศ.) | Basic Identity screen | Medium | ep, mobile, automation-candidate | Functional | 1 | Enter DOB with AD year e.g. 01/01/1990 | Year displayed as 1990 not 2533 | Partial | mobile-ui, api | UI check automated; stored value verification requires API assertion |
| | | | | | | | | 2 | Verify stored value via API | Year stored as AD integer | | | |
| PP2-TC-026 | Onboarding — Basic Identity | No gender selected — error on Next tap | Verify gender selection is required | Basic Identity screen | Medium | ep, negative, mobile, automation-candidate | Negative | 1 | Fill name and DOB; tap Next without selecting gender | Inline error shown on gender field | Yes | mobile-ui | |
| | | | | | | | | 2 | Select any gender option | Error clears | | | |
| PP2-TC-027 | Onboarding — Basic Identity | Social login user — phone verification required before Interests | Verify social-login onboarding flow includes phone verification step | New social login user; PDPA accepted; Basic Identity completed | High | state-transition, mobile, automation-candidate | Functional | 1 | Complete Basic Identity screen; tap Next | Phone Verification screen appears (not Interests) | Yes | mobile-ui | |
| | | | | | | | | 2 | Enter phone number and complete OTP | Phone verified | | | |
| | | | | | | | | 3 | Observe next screen | Interests Selection screen appears | | | |
| PP2-TC-028 | Onboarding — Interests | Done button disabled until at least 1 interest selected | Verify minimum 1 interest required (BVA lower boundary) | Interests Selection screen | High | bva, mobile, automation-candidate | Boundary | 1 | Observe Done button with 0 interests selected | Done button disabled | Yes | mobile-ui | |
| | | | | | | | | 2 | Select 1 interest | Done button becomes enabled | | | |
| PP2-TC-029 | Onboarding — Interests | 4th interest blocked after 3 selected (BVA upper boundary) | Verify maximum 3 interests enforced | Interests Selection screen | Medium | bva, mobile, automation-candidate | Boundary | 1 | Select 3 different interests | All 3 selected; selected count = 3 | Yes | mobile-ui | |
| | | | | | | | | 2 | Tap a 4th interest | Selection blocked; count remains 3 | | | |
| PP2-TC-030 | Onboarding — Interests | Complete onboarding — profile saved; Home shown | Verify full onboarding saves profile and navigates to Home | All onboarding steps ready to complete | High | smoke, state-transition, mobile, automation-candidate | Functional | 1 | Select 1–3 interests; tap Done | Profile and interests saved to DB | Yes | mobile-ui | |
| | | | | | | | | 2 | Observe navigation | Home page displayed | | | |
| | | | | | | | | 3 | Re-launch app | Auto-login to Home; session active | | | |
| PP2-TC-031 | Session Persistence | Valid token — reopen app skips Login and shows Home | Verify app auto-logs in when JWT/refresh token is valid and fresh | User previously logged in; token not expired; app closed | High | smoke, state-transition, mobile, automation-candidate | Functional | 1 | Re-open the app | App reads local token | Yes | mobile-ui | |
| | | | | | | | | 2 | Observe navigation | Login page skipped; Home page appears directly | | | |
| PP2-TC-032 | Session Persistence | Expired token — app redirects to Login | Verify app shows Login when both JWT and refresh token are expired | JWT and refresh token expired; app closed | High | state-transition, mobile, automation-candidate | Functional | 1 | Open app with expired tokens | Token validation fails; token cleared | Yes | mobile-ui | Requires STG token-expiry control or keychain/shared-prefs clear |
| | | | | | | | | 2 | Observe navigation | Login page displayed | | | |
| PP2-TC-033 | Edge Cases | Spinner shown during auth on slow network | Verify loading indicator appears during auth on throttled network | Network throttled via Charles Proxy or emulator network throttle | Medium | mobile, manual | Functional | 1 | Initiate login on slow network | Shimmer or spinner appears immediately | Partial | mobile-ui | UI assertion automatable; network throttle setup is manual (Charles Proxy) |
| | | | | | | | | 2 | Auth completes | Spinner disappears; navigates correctly | | | |
| PP2-TC-034 | Edge Cases | OTP rate limit persists after app restart | Verify rate limit is enforced server-side and survives app restart | 3 OTP requests sent within 5-minute window; app closed and reopened | Medium | negative, state-transition, mobile, manual | Negative | 1 | Reopen app within the 5-min window; attempt OTP again for same phone | Rate limit still enforced (server-side check) | No | — | Rate-limit window is server-side; no reliable way to control timing in automation |
| PP2-TC-035 | Apple Login | Subsequent Apple login skips email preference sheet | Verify Apple does not re-ask for email preference on returning login | User previously signed in with Apple; email preference already set | Medium | state-transition, mobile, ios-only, device-only, manual | Functional | 1 | Sign out; attempt Apple login again | Apple sign-in sheet appears without email preference prompt | No | — | Apple system sheet; requires physical device; not automatable |
| | | | | | | | | 2 | Auth completes | System recognises returning Apple user; navigates per profile state | | | |
| PP2-TC-036 | Edge Cases | Social login with phone matching existing phone-auth account triggers linking | Verify phone-based conflict also triggers Identity Linking dialog | User registered via Phone; social login account has same verified phone | Medium | decision-table, mobile, manual | Functional | 1 | Login via social whose verified phone matches existing phone-auth account | System detects conflict | No | — | Requires OAuth WebView and specific pre-seeded account |
| | | | | | | | | 2 | Observe UI | Identity Linking dialog appears | | | |
| PP2-TC-037 | Phone Login | Phone 11 digits — error shown (BVA upper boundary) | Verify that 11 digits is treated as invalid — error shown and OTP blocked | App on Phone Input screen | High | bva, negative, mobile, automation-candidate | Boundary | 1 | Enter 11-digit number e.g. 08123456789 | Inline error shown; OTP button remains disabled | Yes | mobile-ui | New ▲1 |
| | | | | | | | | 2 | Remove last digit to restore 10 digits | Error clears; OTP button enabled | | | |
| PP2-TC-038 | OTP Flow | OTP 5 digits — does not auto-submit (BVA lower boundary) | Verify partial OTP entry (5 of 6 digits) does not trigger submission | OTP screen; valid OTP sent | High | bva, negative, mobile, automation-candidate | Boundary | 1 | Enter exactly 5 digits in OTP field | No auto-submit; no success navigation | Yes | mobile-ui | New ▲1 |
| | | | | | | | | 2 | Enter 6th digit | OTP submission triggered automatically | | | |
| PP2-TC-039 | Identity Linking | Same email — same provider — no linking dialog shown | Verify that returning same-provider login skips the Identity Linking dialog | Email already registered via Google; user logs in again via Google | High | decision-table, state-transition, mobile, manual | Functional | 1 | Tap Google; authenticate with the already-registered Google account | Email found in system; provider matches | No | — | Requires Google OAuth WebView | New ▲1 |
| | | | | | | | | 2 | Observe UI | No Identity Linking dialog appears | | | |
| | | | | | | | | 3 | Observe navigation | Profile check proceeds; existing user → Home | | | |
| PP2-TC-040 | Onboarding — Basic Identity | DOB = today — rejected (BVA; age = 0) | Verify that today's date is rejected as DOB (user age = 0, below 18) | Basic Identity screen | Medium | bva, boundary, mobile, automation-candidate | Boundary | 1 | Enter today's date as DOB | Error shown: user must be at least 18 years old | Yes | mobile-ui | New ▲1 |
| PP2-TC-041 | Onboarding — Basic Identity | DOB exactly 18 years ago today — accepted (BVA lower boundary) | Verify that a user who turns 18 on the registration date is accepted | Basic Identity screen | Medium | bva, boundary, mobile, automation-candidate | Boundary | 1 | Enter DOB = today minus exactly 18 years | DOB accepted; no error shown | Yes | mobile-ui | New ▲1; minimum age confirmed: 18 years old at registration date |
| | | | | | | | | 2 | Enter DOB = today minus 18 years plus 1 day (one day short) | Error shown: user must be at least 18 years old | | | |
| PP2-TC-042 | Session Persistence | No token (fresh install) — Login page shown | Verify app shows Login when no local token exists (T33 path) | Fresh install or all app data cleared; no stored token | High | state-transition, smoke, mobile, automation-candidate | Functional | 1 | Launch app with no stored token | App reads token storage; nothing found | Yes | mobile-ui | New ▲1 |
| | | | | | | | | 2 | Observe navigation | Login page displayed directly | | | |
| PP2-TC-043 | Session Persistence | Token near expiry — silent refresh runs; Home shown | Verify app silently refreshes a near-expiry token and proceeds to Home (T35 path) | User logged in; JWT near expiry but refresh token valid; app reopened | Medium | state-transition, regression, mobile, manual | Functional | 1 | Reopen app when JWT is within the refresh window | Silent token refresh triggered | Partial | mobile-ui | New ▲1; UI assertion automatable but requires STG token-expiry control API to set up state |
| | | | | | | | | 2 | Observe navigation | Home page shown; no redirect to Login | | | |

---

## C. Diagram Coverage Mapping

| Ref ID | Type | Label | Covered By TC | Status |
|---|---|---|---|---|
| S1 | State | Login Page | PP2-TC-001–PP2-TC-005 PP2-TC-011–PP2-TC-020 PP2-TC-033–PP2-TC-036 | Covered |
| S2 | State | Phone Input Screen | PP2-TC-001–PP2-TC-005 PP2-TC-037 | Covered |
| S3 | State | Phone Format Valid? | PP2-TC-001–PP2-TC-005 PP2-TC-037 | Covered |
| S4 | State | Error + OTP disabled | PP2-TC-002 PP2-TC-037 | Covered |
| S5 | State | OTP Screen (60s countdown) | PP2-TC-001 PP2-TC-005–PP2-TC-010 PP2-TC-038 | Covered |
| S6 | State | OTP Correct? | PP2-TC-001 PP2-TC-005 PP2-TC-009 | Covered |
| S7 | State | OTP Error | PP2-TC-009 PP2-TC-010 PP2-TC-038 | Covered |
| S8 | State | Resend Available | PP2-TC-006 PP2-TC-007 | Covered |
| S9 | State | Rate Limit Reached | PP2-TC-008 PP2-TC-034 | Covered |
| S10 | State | Profile Check (from Phone) | PP2-TC-001 PP2-TC-005 | Covered |
| S11 | State | Login Page (Social entry) | PP2-TC-011–PP2-TC-020 PP2-TC-036 | Covered |
| S12 | State | Google OAuth | PP2-TC-011 PP2-TC-012 PP2-TC-039 | Covered |
| S13 | State | LINE OAuth | PP2-TC-013 PP2-TC-014 | Covered |
| S14 | State | Apple OAuth | PP2-TC-015–PP2-TC-017 PP2-TC-035 | Covered |
| S15 | State | Apple — Hide My Email? | PP2-TC-015 PP2-TC-016 | Covered |
| S16 | State | Apple Private Relay used | PP2-TC-016 | Covered |
| S17 | State | Apple Real Email used | PP2-TC-015 | Covered |
| S18 | State | Email Check (registered?) | PP2-TC-011–PP2-TC-020 PP2-TC-039 | Covered |
| S19 | State | Identity Linking Dialog | PP2-TC-018–PP2-TC-020 PP2-TC-036 | Covered |
| S20 | State | Accounts Merged | PP2-TC-019 | Covered |
| S21 | State | Profile Check (from Social) | PP2-TC-011–PP2-TC-020 PP2-TC-039 | Covered |
| S22 | State | New User Detected | PP2-TC-001 PP2-TC-011 PP2-TC-013 PP2-TC-015 PP2-TC-016 | Covered |
| S23 | State | PDPA Consent Screen | PP2-TC-021 PP2-TC-022 | Covered |
| S24 | State | Cannot Proceed (PDPA declined) | PP2-TC-022 | Covered |
| S25 | State | Basic Identity Screen | PP2-TC-023–PP2-TC-027 PP2-TC-040 PP2-TC-041 | Covered |
| S26 | State | Validation Error on Basic Identity | PP2-TC-023 PP2-TC-024 PP2-TC-026 PP2-TC-040 PP2-TC-041 | Covered |
| S27 | State | Login method was Social? | PP2-TC-027 | Covered |
| S28 | State | Phone Verification Screen (onboarding) | PP2-TC-027 | Covered |
| S29 | State | OTP Error (onboarding phone verify) | — | Missing Coverage |
| S30 | State | Interests Selection Screen | PP2-TC-028–PP2-TC-030 | Covered |
| S31 | State | Save Profile to DB | PP2-TC-030 | Covered |
| S32 | State | Home Page (end of onboarding) | PP2-TC-030 | Covered |
| S33 | State | App Launch | PP2-TC-031 PP2-TC-032 PP2-TC-042 PP2-TC-043 | Covered |
| S34 | State | Read local token | PP2-TC-031 PP2-TC-032 PP2-TC-042 PP2-TC-043 | Covered |
| S35 | State | Token exists? | PP2-TC-031 PP2-TC-032 PP2-TC-042 PP2-TC-043 | Covered |
| S36 | State | Token valid and not expired? | PP2-TC-031 PP2-TC-032 PP2-TC-043 | Covered |
| S37 | State | Near expiry — silent refresh | PP2-TC-043 | Covered |
| S38 | State | Clear token | PP2-TC-032 | Covered |
| S39 | State | Home Page (session) | PP2-TC-030 PP2-TC-031 PP2-TC-043 | Covered |
| S40 | State | Login Page (session redirect) | PP2-TC-032 PP2-TC-042 | Covered |
| T1 | Transition | Tap Phone login | PP2-TC-001–PP2-TC-005 PP2-TC-037 | Covered |
| T2 | Transition | Phone invalid — error | PP2-TC-002 PP2-TC-037 | Covered |
| T3 | Transition | Error cleared — retry | PP2-TC-002 PP2-TC-037 | Covered |
| T4 | Transition | Phone valid — send OTP | PP2-TC-001 PP2-TC-003–PP2-TC-005 | Covered |
| T5 | Transition | OTP screen loaded | PP2-TC-001 PP2-TC-005–PP2-TC-010 | Covered |
| T6 | Transition | Timer expires — resend available | PP2-TC-006 PP2-TC-007 | Covered |
| T7 | Transition | Resend under rate limit | PP2-TC-007 | Covered |
| T8 | Transition | Resend over rate limit — blocked | PP2-TC-008 PP2-TC-034 | Covered |
| T9 | Transition | OTP wrong — error | PP2-TC-009 PP2-TC-010 PP2-TC-038 | Covered |
| T10 | Transition | OTP correct — proceed | PP2-TC-001 PP2-TC-005 PP2-TC-009 | Covered |
| T11 | Transition | Tap Google | PP2-TC-011 PP2-TC-012 PP2-TC-039 | Covered |
| T12 | Transition | Tap LINE | PP2-TC-013 PP2-TC-014 | Covered |
| T13 | Transition | Tap Apple | PP2-TC-015–PP2-TC-017 PP2-TC-035 | Covered |
| T14 | Transition | Apple hide email | PP2-TC-016 | Covered |
| T15 | Transition | Apple real email | PP2-TC-015 | Covered |
| T16 | Transition | Email not registered → Profile Check | PP2-TC-011 PP2-TC-013 PP2-TC-015 PP2-TC-016 | Covered |
| T17 | Transition | Email registered — same provider → no dialog | PP2-TC-012 PP2-TC-014 PP2-TC-017 PP2-TC-039 | Covered |
| T18 | Transition | Email registered — diff provider → Linking Dialog | PP2-TC-018 PP2-TC-036 | Covered |
| T19 | Transition | Confirm link → merge | PP2-TC-019 | Covered |
| T20 | Transition | Cancel link → Login | PP2-TC-020 | Covered |
| T21 | Transition | New user → PDPA | PP2-TC-001 PP2-TC-021 | Covered |
| T22 | Transition | PDPA accept → Basic Identity | PP2-TC-021 PP2-TC-022 | Covered |
| T23 | Transition | PDPA decline / back → blocked | PP2-TC-022 | Covered |
| T24 | Transition | Basic Identity valid → login method check | PP2-TC-027 | Covered |
| T25 | Transition | Basic Identity invalid — inline error | PP2-TC-023 PP2-TC-024 PP2-TC-026 PP2-TC-040 PP2-TC-041 | Covered |
| T26 | Transition | Social login → Phone Verification | PP2-TC-027 | Covered |
| T27 | Transition | Phone login → skip to Interests | PP2-TC-028–PP2-TC-030 | Covered |
| T28 | Transition | Phone OTP verified → Interests | PP2-TC-027 | Covered |
| T29 | Transition | Phone OTP wrong in onboarding → error | — | Missing Coverage |
| T30 | Transition | Min 1 interest → Done → Save | PP2-TC-028–PP2-TC-030 | Covered |
| T31 | Transition | Done with 0 interests — blocked | PP2-TC-028 | Covered |
| T32 | Transition | Save complete → Home | PP2-TC-030 | Covered |
| T33 | Transition | No token → Login | PP2-TC-042 | Covered |
| T34 | Transition | Token expired → clear → Login | PP2-TC-032 | Covered |
| T35 | Transition | Token near expiry → silent refresh → Home | PP2-TC-043 | Covered |
| T36 | Transition | Token valid and fresh → Home | PP2-TC-031 | Covered |

### Coverage Report

```
Total states:       40
Total transitions:  36

Covered:            74  (97.4%)
Partial:             0   (0%)
Missing Coverage:    2   (2.6%)

Missing:
  S29 · OTP Error during onboarding phone verification
  T29 · Phone OTP wrong in onboarding — error path and retry
  → Recommend adding a test case for this path in the next round if
    onboarding phone OTP error handling is implemented.
```

---

## Test Data Requirements

| Data | Value / Source |
|------|----------------|
| Test phone — new user | Unregistered Thai mobile number in `+66XXXXXXXXX` format; set via `TEST_PHONE_NEW` env var |
| Test phone — existing user | Pre-registered phone in STG DB; set via `TEST_PHONE_EXISTING` env var |
| Test OTP — valid | Fixed STG OTP or SMS intercept; set via `TEST_OTP` env var |
| Test OTP — invalid | Any 6-digit value that does not match; set via `TEST_OTP_WRONG` env var |
| Google email — new | Unregistered Gmail address for OAuth new-user tests |
| Google email — existing (linking) | Pre-seeded in STG DB as Google account e.g. `test+link@gmail.com` |
| LINE email — new | Unregistered LINE account |
| Apple test account | Apple Developer test account (physical device only) |
| OTP source (PP2-TC-034, PP2-TC-008) | ThaiBulkSMS STG credentials or STG reset API for rate-limit window |
| Minimum age (PP2-TC-040, PP2-TC-041) | User must be officially 18 years old at registration date; DOB = today − 18 years is accepted, DOB = today − 18 years + 1 day is rejected |
| Near-expiry token (PP2-TC-043) | STG token-expiry control API or time-travel mechanism |
| DOB — valid past | `01/01/1990` (AD) |
| DOB — future | `01/01/2050` |
| DOB — today | Dynamically computed at test runtime |
| Profile display name | `Test User QA` |
| Interests | `['sport', 'lifestyle', 'travel']` |

---

## Automation Notes

- **Framework:** WebdriverIO + Appium + Mocha (TypeScript)
- **Spec file:** `src/test/mobile/auth/PP-2.registration-login.mobile.ts`
- **Page objects:** `src/page/mobile/auth/` and `src/page/mobile/onboarding/`
- **Apple login (PP2-TC-015–PP2-TC-017, PP2-TC-035):** Physical iOS device only — cannot run on Simulator; not automatable
- **Social OAuth (PP2-TC-011–PP2-TC-014, PP2-TC-018–PP2-TC-020, PP2-TC-036, PP2-TC-039):** Require pre-authenticated WebView sessions — manual or device-farm
- **OTP interception (PP2-TC-001, PP2-TC-005–PP2-TC-010, PP2-TC-038):** Fixed OTP in STG env or SMS intercept on test SIM
- **Rate limit (PP2-TC-008, PP2-TC-034):** Requires STG reset endpoint or waiting the 5-min window between runs
- **Near-expiry session (PP2-TC-043):** Requires STG API to set short token TTL
- **New cases PP2-TC-037, PP2-TC-038, PP2-TC-042:** Ready to implement in `PP-2.registration-login.mobile.ts`
- **New cases PP2-TC-040, PP2-TC-041:** Ready to implement; minimum age confirmed as 18 years old at registration date
- **New cases PP2-TC-039, PP2-TC-043:** Manual until OAuth setup or STG token control is available
