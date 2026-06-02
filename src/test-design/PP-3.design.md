# PP-3 · User Profile & Account Settings — Test Design

> Requirements → [PP-3_User_Profile_Account_Settings.md](../requirements/PP-3_User_Profile_Account_Settings.md)
> Flow Diagram → [PP-3.diagram.md](./PP-3.diagram.md)
> Jira subtask → [PP-11](https://7-solutions.atlassian.net/browse/PP-11)

**Platform:** Mobile (iOS / Android)
**Framework:** WebdriverIO + Appium + Mocha (TypeScript)
**App:** POPPA Flutter App

---

## A. Technique Selection

| Module | Technique | Rationale |
|---|---|---|
| View Profile | State Transition + EP | API response drives 3 tab states; empty vs. populated Saved tab is an EP class |
| Edit Profile — Display Name | EP + BVA + Decision Table | Complex char-class rules (Thai/EN, no digits, allowed specials). BVA on length boundary (49/50/51). Decision Table maps allowed vs disallowed char classes. |
| Edit Profile — Bio | BVA | Simple length boundary: 249/250/251 chars |
| Edit Profile — Phone | EP | Reuses PP-2 phone validation rules |
| Edit Profile — Save behaviour | State Transition | Happy path, network failure, real-time update (no pull-to-refresh) |
| Update Interests | BVA + State Transition | Count boundaries: 0/1/3/4 (same rules as PP-2 onboarding). State: current → updated → feed re-calc. |
| Delete Account | Scenario + BVA | Multi-step confirmation flow. BVA on reason text length (499/500/501). |
| Session / Logout | State Transition | 401 graceful redirect and explicit logout path |

---

## B. Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|---|---|---|---|---|
| View Profile & Activity Tabs | State Transition + EP | PP3-TC-001–PP3-TC-005 | High | 97% |
| Edit Profile — Display Name | EP + BVA + Decision Table | PP3-TC-006–PP3-TC-013 | High | 97% |
| Edit Profile — Bio | BVA | PP3-TC-014–PP3-TC-016 | Medium | 97% |
| Edit Profile — Phone & Save | EP + State Transition | PP3-TC-017–PP3-TC-020 | High | 97% |
| Update Interests | BVA + State Transition | PP3-TC-021–PP3-TC-024 | High | 97% |
| Delete Account | Scenario + BVA | PP3-TC-025–PP3-TC-032 | High | 97% |
| Session Expiry & Logout | State Transition | PP3-TC-033–PP3-TC-035 | Medium | 97% |
| **Total** | | **35** | | |

---

## Test Design Table

| Test Case ID | Module | Summary | Objective | Preconditions | Priority | Labels | Test Type | Step # | Test Step | Expected Result | Automatable | Automation Type | Remarked |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PP3-TC-001 | View Profile | Profile page loads all data correctly | Verify GET /v1/user/profile returns Avatar, Display Name, Bio and stats | User logged in; valid profile in DB | High | smoke, state-transition, mobile, automation-candidate | Functional | 1 | Navigate to Profile page | App calls GET /v1/user/profile | Yes | mobile-ui, api | |
| | | | | | | | | 2 | Observe profile page | Avatar, Display Name, Bio, and activity stats displayed correctly | | | |
| PP3-TC-002 | View Profile | Upcoming tab shows events sorted newest first | Verify Upcoming tab content and sort order | User has upcoming events; on Profile page | Medium | state-transition, mobile, automation-candidate | Functional | 1 | Tap Upcoming tab | Upcoming events list appears | Yes | mobile-ui | |
| | | | | | | | | 2 | Verify sort order | Events sorted by date — newest first | | | |
| PP3-TC-003 | View Profile | History tab shows past events sorted newest first | Verify History tab content and sort order | User has attended events; on Profile page | Medium | state-transition, mobile, automation-candidate | Functional | 1 | Tap History tab | Past events list appears | Yes | mobile-ui | |
| | | | | | | | | 2 | Verify sort order | Events sorted by date — newest first | | | |
| PP3-TC-004 | View Profile | Saved tab shows saved events | Verify Saved tab displays bookmarked events | User has saved events; on Profile page | Medium | state-transition, mobile, automation-candidate | Functional | 1 | Tap Saved tab | Saved events list appears with content | Yes | mobile-ui | |
| PP3-TC-005 | View Profile | Saved tab empty state shows CTA deep link | Verify empty Saved tab displays CTA and navigates to event search | User has no saved events; on Profile page | Medium | ep, state-transition, mobile, automation-candidate | Functional | 1 | Tap Saved tab with no saved events | Empty state shown with CTA button | Yes | mobile-ui | |
| | | | | | | | | 2 | Tap CTA button | Navigates to Event Search page | | | |
| PP3-TC-006 | Edit Profile | Edit Profile screen opens from Profile | Verify Edit Profile screen is accessible | User on Profile page | High | smoke, state-transition, mobile, automation-candidate | Functional | 1 | Tap Edit Profile button | Edit Profile screen opens with current values pre-filled | Yes | mobile-ui | |
| PP3-TC-007 | Edit Profile — Name | Display name empty — error on Save | Verify Display Name is required | Edit Profile screen open | High | ep, negative, mobile, automation-candidate | Negative | 1 | Clear Display Name field; tap Save | Inline error shown: Display Name is required | Yes | mobile-ui | |
| | | | | | | | | 2 | Enter any valid name | Error clears | | | |
| PP3-TC-008 | Edit Profile — Name | Display name exactly 50 chars — accepted (BVA max boundary) | Verify 50-char name is the valid upper boundary | Edit Profile screen open | High | bva, boundary, mobile, automation-candidate | Boundary | 1 | Enter a 50-character display name | Name accepted; no error | Yes | mobile-ui | |
| | | | | | | | | 2 | Tap Save | Save proceeds successfully | | | |
| PP3-TC-009 | Edit Profile — Name | Display name 51 chars — rejected (BVA over boundary) | Verify 51-char name is rejected | Edit Profile screen open | High | bva, boundary, negative, mobile, automation-candidate | Boundary | 1 | Enter a 51-character display name | Input blocked at 50 chars or inline error shown | Yes | mobile-ui | |
| PP3-TC-010 | Edit Profile — Name | Display name with digits — rejected | Verify digits are not allowed in Display Name | Edit Profile screen open | High | ep, negative, mobile, automation-candidate | Negative | 1 | Enter name containing a digit e.g. John1 | Inline error: digits not allowed | Yes | mobile-ui | |
| | | | | | | | | 2 | Remove the digit | Error clears | | | |
| PP3-TC-011 | Edit Profile — Name | Display name with all allowed special chars — accepted | Verify space, dot, hyphen, apostrophe are accepted | Edit Profile screen open | High | ep, decision-table, mobile, automation-candidate | Functional | 1 | Enter name with space e.g. สมชาย ใจดี | Accepted; no error | Yes | mobile-ui | |
| | | | | | | | | 2 | Enter name with dot e.g. ดร.สมชาย | Accepted; no error | | | |
| | | | | | | | | 3 | Enter name with hyphen e.g. แมรี่-เจน | Accepted; no error | | | |
| | | | | | | | | 4 | Enter name with apostrophe e.g. O'Brien | Accepted; no error | | | |
| PP3-TC-012 | Edit Profile — Name | Display name with disallowed special chars — rejected | Verify @, #, !, $, % and similar chars are rejected | Edit Profile screen open | High | ep, decision-table, negative, mobile, automation-candidate | Negative | 1 | Enter name containing @ e.g. john@doe | Inline error: special character not allowed | Yes | mobile-ui | |
| | | | | | | | | 2 | Enter name containing ! e.g. Hello! | Inline error: special character not allowed | | | |
| PP3-TC-013 | Edit Profile — Name | Display name Thai and English mixed — accepted | Verify bilingual names are accepted | Edit Profile screen open | Medium | ep, mobile, automation-candidate | Functional | 1 | Enter mixed Thai-English name e.g. สมชาย Smith | Accepted; no error | Yes | mobile-ui | |
| PP3-TC-014 | Edit Profile — Bio | Bio 250 chars — accepted (BVA max boundary) | Verify 250-char bio is the valid upper boundary | Edit Profile screen open | Medium | bva, boundary, mobile, automation-candidate | Boundary | 1 | Enter exactly 250 characters in Bio field | Bio accepted; char counter shows 250/250 or no error | Yes | mobile-ui | |
| PP3-TC-015 | Edit Profile — Bio | Bio 251 chars — rejected (BVA over boundary) | Verify 251-char bio is rejected | Edit Profile screen open | Medium | bva, boundary, negative, mobile, automation-candidate | Boundary | 1 | Enter 251 characters in Bio field | Input blocked at 250 or inline error shown | Yes | mobile-ui | |
| PP3-TC-016 | Edit Profile — Bio | Bio empty — accepted (optional field) | Verify Bio is optional — empty is valid | Edit Profile screen open | Low | ep, mobile, automation-candidate | Functional | 1 | Clear Bio field; tap Save | Save succeeds; Bio shown as empty on Profile page | Yes | mobile-ui | |
| PP3-TC-017 | Edit Profile — Phone | Valid phone number update — accepted | Verify valid phone format is saved | Edit Profile screen; user changes phone | High | ep, mobile, automation-candidate | Functional | 1 | Enter valid 10-digit phone e.g. 0812345678 | Accepted; PATCH sent | Yes | mobile-ui | |
| | | | | | | | | 2 | Tap Save | Profile updated; phone stored as +66812345678 | | | |
| PP3-TC-018 | Edit Profile — Phone | Invalid phone format — rejected | Verify invalid phone triggers inline error | Edit Profile screen open | High | ep, negative, mobile, automation-candidate | Negative | 1 | Enter invalid phone e.g. 123 | Inline error: invalid phone format | Yes | mobile-ui | |
| PP3-TC-019 | Edit Profile — Save | Profile page reflects changes immediately — no pull-to-refresh | Verify state management updates profile without manual refresh | Edit Profile screen; valid data ready | High | state-transition, regression, mobile, automation-candidate | Functional | 1 | Change Display Name to a new value; tap Save | PATCH succeeds | Yes | mobile-ui | |
| | | | | | | | | 2 | Observe Profile page after returning | New Display Name shown immediately without pulling to refresh | | | |
| PP3-TC-020 | Edit Profile — Save | Network failure during Save — Error Toast shown; stay on Edit screen | Verify edit screen does not close on network error | Edit Profile screen; network throttled to offline | High | state-transition, negative, mobile, manual | Negative | 1 | Enter valid changes; tap Save with network off | PATCH fails | Partial | mobile-ui | UI assertion automatable; network cutoff requires manual or Charles Proxy setup |
| | | | | | | | | 2 | Observe UI | Error Toast shown; Edit Profile screen remains open | | | |
| PP3-TC-021 | Update Interests | Change interests — saved and profile updated | Verify interests can be changed and saved post-onboarding | User on Profile page; current interests set | High | state-transition, smoke, mobile, automation-candidate | Functional | 1 | Tap Interests from Profile | Interests screen shows current selections | Yes | mobile-ui | |
| | | | | | | | | 2 | Change selection to different categories; tap Save | Interests saved; User_Interests DB updated | | | |
| | | | | | | | | 3 | Navigate to Home/Discovery | Feed reflects new interests | | | |
| PP3-TC-022 | Update Interests | Discovery feed re-calculates after interest update | Verify Home/Discovery content changes to match new interests | User has changed interests (PP3-TC-021 setup) | High | state-transition, regression, mobile, automation-candidate | Functional | 1 | Save new interests | Update succeeds | Partial | mobile-ui, api | Feed re-calculation is backend side-effect; verify via API or observable content change |
| | | | | | | | | 2 | Open Home/Discovery feed | Events shown match the updated interest categories | | | |
| PP3-TC-023 | Update Interests | Cannot save with 0 interests — Save disabled | Verify minimum 1 interest required (BVA lower boundary) | Interests screen; all current interests deselected | High | bva, negative, mobile, automation-candidate | Boundary | 1 | Deselect all currently selected interests | Save button becomes disabled | Yes | mobile-ui | |
| | | | | | | | | 2 | Select 1 interest | Save button becomes enabled | | | |
| PP3-TC-024 | Update Interests | 4th interest blocked — max 3 enforced (BVA upper boundary) | Verify maximum 3 interests enforced on update screen | Interests screen; 3 interests already selected | Medium | bva, boundary, mobile, automation-candidate | Boundary | 1 | Attempt to select a 4th interest | Selection blocked; count remains at 3 | Yes | mobile-ui | |
| PP3-TC-025 | Delete Account | Delete Account button is de-emphasised and not prominent | Verify Delete Account is intentionally hard to discover | Settings screen | Medium | ep, mobile, automation-candidate | Functional | 1 | Navigate to Settings screen | Delete Account button is present but visually de-emphasised (small, low contrast, or at bottom) | Yes | mobile-ui | |
| PP3-TC-026 | Delete Account | Tapping Delete Account opens Confirmation Dialog | Verify the confirmation dialog appears | Settings screen; Delete Account button visible | High | state-transition, mobile, automation-candidate | Functional | 1 | Tap Delete Account button | Confirmation Dialog appears with reason text input | Yes | mobile-ui | |
| PP3-TC-027 | Delete Account | Confirmation dialog accepts reason text | Verify reason text field accepts input | Confirmation Dialog open | High | ep, mobile, automation-candidate | Functional | 1 | Enter reason text in the dialog field | Text appears in input field | Yes | mobile-ui | |
| PP3-TC-028 | Delete Account | Reason text 500 chars — accepted (BVA max boundary) | Verify 500-char reason is the valid upper boundary | Confirmation Dialog open | High | bva, boundary, mobile, automation-candidate | Boundary | 1 | Enter exactly 500 characters as reason | Text accepted; no error; Confirm button enabled | Yes | mobile-ui | |
| PP3-TC-029 | Delete Account | Reason text 501 chars — rejected (BVA over boundary) | Verify 501-char reason is blocked | Confirmation Dialog open | High | bva, boundary, negative, mobile, automation-candidate | Boundary | 1 | Attempt to enter 501 characters | Input blocked at 500 chars or inline error shown | Yes | mobile-ui | |
| PP3-TC-030 | Delete Account | Cancel delete — returns to Settings; account intact | Verify Cancel dismisses dialog without deleting | Confirmation Dialog open | High | state-transition, mobile, automation-candidate | Functional | 1 | Tap Cancel on Confirmation Dialog | Dialog dismissed; returns to Settings screen | Yes | mobile-ui | |
| | | | | | | | | 2 | Attempt to log in again | Login succeeds; account not deleted | | | |
| PP3-TC-031 | Delete Account | Confirm delete — account deleted; sessions cleared; redirected to Login | Verify full delete account flow end-to-end | Confirmation Dialog open; valid reason text entered | High | smoke, state-transition, mobile, automation-candidate | Functional | 1 | Tap Confirm in Confirmation Dialog | DELETE /v1/user/account sent | Yes | mobile-ui | |
| | | | | | | | | 2 | Observe navigation | App redirects to Login page | | | |
| | | | | | | | | 3 | Attempt to log in with same credentials | Login fails or account-deleted message shown | | | |
| PP3-TC-032 | Delete Account | Deleted account cannot log in | Verify deleted account is inaccessible after deletion | Account deleted via PP3-TC-031 | High | regression, negative, mobile, automation-candidate | Negative | 1 | Attempt login with deleted account credentials | Auth rejected; appropriate error or message displayed | Partial | mobile-ui, api | UI assertion automatable; requires PP3-TC-031 to run first as prerequisite |
| PP3-TC-033 | Session / Logout | Token expiry (401) redirects gracefully to Login | Verify 401 on any profile action is handled without crash | User on Profile page; JWT forcibly expired | High | state-transition, mobile, manual | Functional | 1 | Trigger any profile action after JWT is expired | App receives 401 Unauthorized | Partial | mobile-ui | Navigation assertion automatable; token expiry setup requires STG API |
| | | | | | | | | 2 | Observe navigation | App redirects to Login page gracefully; no crash or stuck state | | | |
| PP3-TC-034 | View Profile | Network error on profile load shows error state | Verify app handles API failure on profile page load | No network connection; navigate to Profile | Medium | negative, state-transition, mobile, automation-candidate | Negative | 1 | Navigate to Profile with network off | API call fails | Partial | mobile-ui | UI assertion automatable; network cutoff requires manual or Charles Proxy |
| | | | | | | | | 2 | Observe UI | Error state or retry prompt shown; app does not crash | | | |
| PP3-TC-035 | Session / Logout | Logout clears session and redirects to Login | Verify Logout removes local tokens and navigates to Login | User logged in; on Settings screen | High | smoke, state-transition, mobile, automation-candidate | Functional | 1 | Tap Logout | Local session and tokens cleared | Yes | mobile-ui | |
| | | | | | | | | 2 | Observe navigation | Login page displayed | | | |
| | | | | | | | | 3 | Reopen app | Login page shown; auto-login does not occur | | | |

---

## C. Diagram Coverage Mapping

| Ref ID | Type | Label | Covered By TC | Status |
|---|---|---|---|---|
| S1 | State | Home Page | PP3-TC-001 | Covered |
| S2 | State | Profile Page | PP3-TC-001–PP3-TC-006 PP3-TC-021 PP3-TC-025 PP3-TC-033 | Covered |
| S3 | State | API loading | PP3-TC-001 PP3-TC-034 | Covered |
| S4 | State | Profile data displayed | PP3-TC-001 | Covered |
| S5 | State | Upcoming Tab | PP3-TC-002 | Covered |
| S6 | State | History Tab | PP3-TC-003 | Covered |
| S7 | State | Saved Tab | PP3-TC-004 PP3-TC-005 | Covered |
| S8 | State | Saved tab — events exist | PP3-TC-004 | Covered |
| S9 | State | Saved tab — empty state with CTA | PP3-TC-005 | Covered |
| S10 | State | Event Search Page | PP3-TC-005 | Covered |
| S11 | State | Profile Page (Edit entry) | PP3-TC-006 | Covered |
| S12 | State | Edit Profile Screen | PP3-TC-006–PP3-TC-020 | Covered |
| S13 | State | Display Name validation | PP3-TC-007–PP3-TC-013 | Covered |
| S14 | State | Name error — empty | PP3-TC-007 | Covered |
| S15 | State | Name error — exceeds 50 chars | PP3-TC-009 | Covered |
| S16 | State | Name error — contains digits | PP3-TC-010 | Covered |
| S17 | State | Name error — disallowed special char | PP3-TC-012 | Covered |
| S18 | State | Bio validation | PP3-TC-014–PP3-TC-016 | Covered |
| S19 | State | Bio error — exceeds 250 chars | PP3-TC-015 | Covered |
| S20 | State | Phone validation | PP3-TC-017 PP3-TC-018 | Covered |
| S21 | State | Phone error — invalid format | PP3-TC-018 | Covered |
| S22 | State | All fields valid | PP3-TC-006 PP3-TC-008 PP3-TC-011 PP3-TC-013 PP3-TC-014 PP3-TC-017 | Covered |
| S23 | State | PATCH /v1/user/profile | PP3-TC-017 PP3-TC-019 PP3-TC-020 | Covered |
| S24 | State | Network error — Error Toast | PP3-TC-020 | Covered |
| S25 | State | Profile updated | PP3-TC-019 | Covered |
| S26 | State | Profile Page (Interests entry) | PP3-TC-021 | Covered |
| S27 | State | Interests Screen | PP3-TC-021–PP3-TC-024 | Covered |
| S28 | State | Valid selection 1–3 | PP3-TC-021 PP3-TC-022 | Covered |
| S29 | State | Selection invalid — 0 interests | PP3-TC-023 | Covered |
| S30 | State | Save Interests | PP3-TC-021 | Covered |
| S31 | State | User_Interests DB updated | PP3-TC-021 PP3-TC-022 | Covered |
| S32 | State | Discovery feed re-calculated | PP3-TC-022 | Covered |
| S33 | State | Settings Screen | PP3-TC-025 PP3-TC-026 PP3-TC-035 | Covered |
| S34 | State | Delete Account button (hidden) | PP3-TC-025 PP3-TC-026 | Covered |
| S35 | State | Confirmation Dialog | PP3-TC-026–PP3-TC-031 | Covered |
| S36 | State | Reason text valid | PP3-TC-027 PP3-TC-028 | Covered |
| S37 | State | Reason text error over 500 | PP3-TC-029 | Covered |
| S38 | State | DELETE /v1/user/account | PP3-TC-031 | Covered |
| S39 | State | Account deleted; sessions cleared | PP3-TC-031 PP3-TC-032 | Covered |
| S40 | State | Login Page | PP3-TC-031 PP3-TC-033 PP3-TC-035 | Covered |
| T1 | Transition | Navigate to Profile | PP3-TC-001 | Covered |
| T2 | Transition | API returns data | PP3-TC-001 | Covered |
| T3 | Transition | API error / network fail | PP3-TC-034 | Covered |
| T4 | Transition | Tap Upcoming tab | PP3-TC-002 | Covered |
| T5 | Transition | Tap History tab | PP3-TC-003 | Covered |
| T6 | Transition | Tap Saved tab | PP3-TC-004 PP3-TC-005 | Covered |
| T7 | Transition | Saved has events | PP3-TC-004 | Covered |
| T8 | Transition | Saved is empty | PP3-TC-005 | Covered |
| T9 | Transition | Tap CTA in empty Saved | PP3-TC-005 | Covered |
| T10 | Transition | Tap Edit Profile | PP3-TC-006 | Covered |
| T11 | Transition | Name empty — error | PP3-TC-007 | Covered |
| T12 | Transition | Name over 50 chars | PP3-TC-009 | Covered |
| T13 | Transition | Name contains digit | PP3-TC-010 | Covered |
| T14 | Transition | Name disallowed char | PP3-TC-012 | Covered |
| T15 | Transition | Name valid | PP3-TC-006 PP3-TC-008 PP3-TC-011 PP3-TC-013 | Covered |
| T16 | Transition | Bio over 250 | PP3-TC-015 | Covered |
| T17 | Transition | Bio valid | PP3-TC-014 PP3-TC-016 | Covered |
| T18 | Transition | Phone invalid | PP3-TC-018 | Covered |
| T19 | Transition | Phone valid | PP3-TC-017 PP3-TC-019 | Covered |
| T20 | Transition | Tap Save — all valid | PP3-TC-019 | Covered |
| T21 | Transition | Network failure during PATCH | PP3-TC-020 | Covered |
| T22 | Transition | PATCH success | PP3-TC-019 | Covered |
| T23 | Transition | Tap Interests | PP3-TC-021 | Covered |
| T24 | Transition | 0 selected — Save disabled | PP3-TC-023 | Covered |
| T25 | Transition | 4th interest blocked | PP3-TC-024 | Covered |
| T26 | Transition | Valid 1–3 selected | PP3-TC-021 PP3-TC-022 | Covered |
| T27 | Transition | Tap Save (interests) | PP3-TC-021 | Covered |
| T28 | Transition | DB update + feed re-calc | PP3-TC-021 PP3-TC-022 | Covered |
| T29 | Transition | Tap Delete Account | PP3-TC-025 PP3-TC-026 | Covered |
| T30 | Transition | Reason over 500 chars | PP3-TC-029 | Covered |
| T31 | Transition | Reason within limit | PP3-TC-027 PP3-TC-028 | Covered |
| T32 | Transition | Cancel delete | PP3-TC-030 | Covered |
| T33 | Transition | Confirm delete | PP3-TC-031 | Covered |
| T34 | Transition | DELETE success — clear sessions | PP3-TC-031 | Covered |

### Coverage Report

```
Total states:       40
Total transitions:  34

Covered:            74  (100%)
Partial:             0   (0%)
Missing Coverage:    0   (0%)

Full coverage achieved across all identified states and transitions.
```

---

## Test Data Requirements

| Data | Value / Source |
|------|----------------|
| Valid user account | Pre-logged-in user with complete profile in STG DB |
| Test display name — 50 chars | 50-character string using Thai or English |
| Test display name — 51 chars | 51-character string (over limit) |
| Test bio — 250 chars | 250-character free text |
| Test bio — 251 chars | 251-character string (over limit) |
| Test phone — valid | `0812345678` |
| Test phone — invalid | `123` |
| Delete reason — 500 chars | 500-character Thai text |
| Delete reason — 501 chars | 501-character Thai text (over limit) |
| User with saved events | Pre-seeded account with bookmarked events in STG |
| User with no saved events | Account with empty Saved tab |
| User with upcoming events | Account with future-dated event registrations |
| JWT near-expiry token | Requires STG token TTL control API |
| Interest categories | At least 4 available category options in STG |

---

## Automation Notes

- **Framework:** WebdriverIO + Appium + Mocha (TypeScript)
- **Spec file (to create):** `src/test/mobile/profile/PP-3.profile-settings.mobile.ts`
- **Page objects (to create):** `src/page/mobile/profile/ProfilePage.ts`, `EditProfilePage.ts`, `InterestsPage.ts`, `SettingsPage.ts`, `DeleteAccountPage.ts`
- **PP3-TC-020, PP3-TC-034:** Network failure tests require Charles Proxy or Android emulator network throttle — manual setup; UI assertion automatable
- **PP3-TC-022:** Discovery feed re-calculation is a backend side-effect; automate via API assertion (`GET /v1/discovery` or equivalent) after interests save
- **PP3-TC-032:** Requires PP3-TC-031 as a prerequisite; run in sequential order in the same suite
- **PP3-TC-033:** JWT expiry requires STG token control API; partial automation
- **PP3-TC-025 (discoverability):** Visual/positional assertion — verify Delete Account button has low visual weight (small font or specific color class)
