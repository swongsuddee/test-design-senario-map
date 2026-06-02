# QA Backlog Update Plan — 2026-06-01

**Total QA cards in backlog (To Do):** 142  
**Cards with test design to add:** 50 (map to existing `.design.md`)  
**Cards as draft (no design file yet):** 92 (new stories — requirements only)  
**Cards with nothing to update:** 0

> Source design files: `src/test-design/PP-2.design.md`, `PP-3.design.md`, `PP-4.design.md`, `PP-5.design.md`, `PP-122.design.md`  
> Draft stories (requirements only): PP-237, PP-296, PP-302, PP-303, PP-304, PP-317, PP-318, PP-226, PP-337, PP-342, PP-445, PP-449, PP-451, PP-492

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Automated / passing on STG |
| ⏳ | Automatable — not yet implemented |
| ❌ | Manual only |
| ~~strikethrough~~ | Obsolete TC |

---

## PP-125 — [QA] [BE] Push Notification UI on Lock Screen

**Jira:** [PP-125](https://7-solutions.atlassian.net/browse/PP-125) · Type: Task (parent QA task)  
**Story:** PP-122 Push Notification UI  
**Design file:** `PP-122.design.md` + `PP-122.diagram.md`  
**Platform:** Mobile (iOS only) · **Framework:** WebdriverIO + Appium  
**Total TCs:** 15 · All manual (Lock Screen is iOS system UI; not accessible via Appium)

### Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|--------|-----------|-----|------|------------|
| Card Layout — Icon + Badge | Decision Table | PP122-TC-001–002 | High | 95% |
| Card Layout — Image Presence | Decision Table | PP122-TC-003–006 | High | 97% |
| Notification Stacking | State Transition | PP122-TC-007–009 | High | 95% |
| Deep Link Routing | State Transition + DT | PP122-TC-010–012 | High | 95% |
| Timestamp Display | BVA | PP122-TC-013–015 | Medium | 97% |
| **Total** | | **15** | | |

### Test Cases

| TC ID | Module | Summary | Priority | Automatable | Automation Type |
|-------|--------|---------|----------|-------------|-----------------|
| PP122-TC-001 | Card Layout | App icon shown with badge when count > 0 | High | Partial | mobile-ui |
| PP122-TC-002 | Card Layout | App icon shown without badge when count = 0 | Medium | Partial | mobile-ui |
| PP122-TC-003 | Card Layout | Trailing image shown when content image URL present | High | Partial | mobile-ui |
| PP122-TC-004 | Card Layout | Trailing area hidden; body text expands when no image | High | Partial | mobile-ui |
| PP122-TC-005 | Card Layout — Font | Title Bold; body Regular — with image | High | No | — |
| PP122-TC-006 | Card Layout — Font | Title Bold; body Regular — without image | High | No | — |
| PP122-TC-007 | Stacking | Single notification shows as standalone card | High | No | — |
| PP122-TC-008 | Stacking | Two notifications from same app stack into iOS group | High | No | — |
| PP122-TC-009 | Stacking | Tapping stack expands to individual cards | Medium | No | — |
| PP122-TC-010 | Deep Link | Tapping notification deep links to correct in-app screen | High | No | — |
| PP122-TC-011 | Deep Link | Different deep link paths route to correct screens | High | No | — |
| PP122-TC-012 | Deep Link | Unknown route falls back to Home screen | Medium | No | — |
| PP122-TC-013 | Timestamp | Notification < 60 min shows "Xm ago" format | High | No | — |
| PP122-TC-014 | Timestamp | Notification 1–23h shows "Xh ago" format | Medium | No | — |
| PP122-TC-015 | Timestamp | Notification ≥ 24h shows absolute date format | Low | No | — |

---

## PP-321 — [QA] PP-2 Registration & Login

**Jira:** [PP-321](https://7-solutions.atlassian.net/browse/PP-321) · Type: Task (parent QA task)  
**Story:** PP-2 Registration & Login  
**Design file:** `PP-2.design.md` + `PP-2.diagram.md`  
**Platform:** Mobile (iOS / Android) · **Framework:** WebdriverIO + Appium  
**Total TCs:** 43

### Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|--------|-----------|-----|------|------------|
| Phone Input Validation | EP + BVA | PP2-TC-001–005, PP2-TC-037 | High | 97% |
| OTP Validation | State Transition + BVA | PP2-TC-006–010, PP2-TC-038 | High | 97% |
| Social Login — Google / LINE | State Transition | PP2-TC-011–014 | High | 97% |
| Apple Login | State Transition + Decision Table | PP2-TC-015–017, PP2-TC-035 | High | 97% |
| Identity Linking | Decision Table | PP2-TC-018–020, PP2-TC-039 | High | 95% |
| Onboarding — PDPA | State Transition | PP2-TC-021–022 | Medium | 97% |
| Onboarding — Basic Identity | EP + BVA | PP2-TC-023–027, PP2-TC-040–041 | Medium | 90% |
| Onboarding — Interests | BVA | PP2-TC-028–030 | Medium | 97% |
| Session Persistence | State Transition + DT | PP2-TC-031–032, PP2-TC-042–043 | Medium | 97% |
| Edge Cases | Error Guessing | PP2-TC-033–036 | Low | 97% |
| **Total** | | **43** | | |

### Test Cases

| TC ID | Module | Summary | Priority | Automatable | Automation Type |
|-------|--------|---------|----------|-------------|-----------------|
| PP2-TC-001 | Phone Login | Phone login happy path — new user lands on PDPA | High | Yes | mobile-ui |
| PP2-TC-002 | Phone Login | Phone too short (9 digits) — error + OTP disabled | High | Yes | mobile-ui |
| PP2-TC-003 | Phone Login | Phone with dashes auto-cleaned | Medium | Yes | mobile-ui |
| PP2-TC-004 | Phone Login | Phone stored in international format (+66) | Medium | Partial | mobile-ui, api |
| PP2-TC-005 | Phone Login | Phone login — existing user goes to Home | High | Yes | mobile-ui |
| PP2-TC-006 | OTP Flow | OTP countdown timer visible; Resend disabled initially | Medium | Yes | mobile-ui |
| PP2-TC-007 | OTP Flow | Resend OTP within rate limit — countdown resets | Medium | Yes | mobile-ui |
| PP2-TC-008 | OTP Flow | OTP rate limit exceeded — 4th request blocked | Medium | Partial | mobile-ui |
| PP2-TC-009 | OTP Flow | Wrong OTP shows error; correct OTP proceeds | High | Yes | mobile-ui |
| PP2-TC-010 | OTP Flow | OTP input cleared after wrong entry | Medium | Yes | mobile-ui |
| PP2-TC-011 | Google Login | Google login — new user lands on PDPA | High | No | — |
| PP2-TC-012 | Google Login | Google login — existing user goes to Home | High | No | — |
| PP2-TC-013 | LINE Login | LINE login — new user lands on PDPA | High | No | — |
| PP2-TC-014 | LINE Login | LINE login — existing user goes to Home | High | No | — |
| PP2-TC-015 | Apple Login | Apple login — new user; real email; PDPA shown | High | No | — |
| PP2-TC-016 | Apple Login | Apple login — new user; Hide My Email; PDPA shown | High | No | — |
| PP2-TC-017 | Apple Login | Apple login — existing user goes to Home | High | No | — |
| PP2-TC-018 | Identity Linking | Duplicate email (diff provider) triggers linking dialog | High | No | — |
| PP2-TC-019 | Identity Linking | Confirm linking — accounts merged; navigate to Home | High | No | — |
| PP2-TC-020 | Identity Linking | Cancel linking — returns to Login | Medium | No | — |
| PP2-TC-021 | Onboarding — PDPA | PDPA is first screen after new user auth | High | Yes | mobile-ui |
| PP2-TC-022 | Onboarding — PDPA | Accepting PDPA navigates to Basic Identity | High | Yes | mobile-ui |
| PP2-TC-023 | Onboarding — Identity | Empty display name — error on Next | High | Yes | mobile-ui |
| PP2-TC-024 | Onboarding — Identity | Future DOB rejected; valid past date accepted | High | Yes | mobile-ui |
| PP2-TC-025 | Onboarding — Identity | DOB uses AD year (not Buddhist Era) | Medium | Partial | mobile-ui, api |
| PP2-TC-026 | Onboarding — Identity | No gender selected — error on Next | Medium | Yes | mobile-ui |
| PP2-TC-027 | Onboarding — Identity | Social login — phone verification required before Interests | High | Yes | mobile-ui |
| PP2-TC-028 | Onboarding — Interests | Done disabled until ≥ 1 interest selected (BVA lower) | High | Yes | mobile-ui |
| PP2-TC-029 | Onboarding — Interests | 4th interest blocked after 3 selected (BVA upper) | Medium | Yes | mobile-ui |
| PP2-TC-030 | Onboarding — Interests | Complete onboarding — profile saved; Home shown | High | Yes | mobile-ui |
| PP2-TC-031 | Session Persistence | Valid token — reopen app skips Login → Home | High | Yes | mobile-ui |
| PP2-TC-032 | Session Persistence | Expired token — app redirects to Login | High | Yes | mobile-ui |
| PP2-TC-033 | Edge Cases | Spinner shown during auth on slow network | Medium | Partial | mobile-ui |
| PP2-TC-034 | Edge Cases | OTP rate limit persists after app restart | Medium | No | — |
| PP2-TC-035 | Apple Login | Subsequent Apple login skips email preference sheet | Medium | No | — |
| PP2-TC-036 | Edge Cases | Social login with phone matching existing account triggers linking | Medium | No | — |
| PP2-TC-037 | Phone Login | Phone 11 digits — error (BVA upper) | High | Yes | mobile-ui |
| PP2-TC-038 | OTP Flow | OTP 5 digits — does not auto-submit (BVA lower) | High | Yes | mobile-ui |
| PP2-TC-039 | Identity Linking | Same email + same provider — no linking dialog | High | No | — |
| PP2-TC-040 | Onboarding — Identity | DOB = today rejected (BVA; age = 0) | Medium | Yes | mobile-ui |
| PP2-TC-041 | Onboarding — Identity | DOB exactly 18 years ago today accepted (BVA lower) | Medium | Yes | mobile-ui |
| PP2-TC-042 | Session Persistence | No token (fresh install) — Login shown | High | Yes | mobile-ui |
| PP2-TC-043 | Session Persistence | Token near expiry — silent refresh; Home shown | Medium | Partial | mobile-ui |

---

## PP-323 — [QA][automate][Mobile (Android)] auth and onboarding automation

**Jira:** [PP-323](https://7-solutions.atlassian.net/browse/PP-323) · Type: Sub-task of PP-321  
**Design file:** `PP-2.design.md`  
**Scope:** Android-automatable TCs only (excludes ios-only, OAuth WebView, Apple Sign-In)

### Test Cases (Android Automation Scope)

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP2-TC-001 | Phone Login | Happy path — new user → PDPA | High | Yes |
| PP2-TC-002 | Phone Login | Phone too short (9 digits) — error | High | Yes |
| PP2-TC-003 | Phone Login | Phone with dashes auto-cleaned | Medium | Yes |
| PP2-TC-004 | Phone Login | Phone stored in +66 format | Medium | Partial |
| PP2-TC-005 | Phone Login | Existing user → Home | High | Yes |
| PP2-TC-006 | OTP Flow | Countdown visible; Resend disabled initially | Medium | Yes |
| PP2-TC-007 | OTP Flow | Resend within rate limit — reset | Medium | Yes |
| PP2-TC-008 | OTP Flow | Rate limit exceeded (4th request blocked) | Medium | Partial |
| PP2-TC-009 | OTP Flow | Wrong OTP error; correct OTP proceeds | High | Yes |
| PP2-TC-010 | OTP Flow | OTP cleared after wrong entry | Medium | Yes |
| PP2-TC-021 | Onboarding — PDPA | PDPA first screen after new user auth | High | Yes |
| PP2-TC-022 | Onboarding — PDPA | Accept PDPA → Basic Identity | High | Yes |
| PP2-TC-023 | Onboarding — Identity | Empty name → error | High | Yes |
| PP2-TC-024 | Onboarding — Identity | Future DOB rejected | High | Yes |
| PP2-TC-025 | Onboarding — Identity | DOB uses AD year | Medium | Partial |
| PP2-TC-026 | Onboarding — Identity | No gender → error | Medium | Yes |
| PP2-TC-027 | Onboarding — Identity | Social flow → phone verification | High | Yes |
| PP2-TC-028 | Onboarding — Interests | Done disabled with 0 interests | High | Yes |
| PP2-TC-029 | Onboarding — Interests | 4th interest blocked | Medium | Yes |
| PP2-TC-030 | Onboarding — Interests | Complete → Home | High | Yes |
| PP2-TC-031 | Session | Valid token → Home | High | Yes |
| PP2-TC-032 | Session | Expired token → Login | High | Yes |
| PP2-TC-037 | Phone Login | Phone 11 digits rejected (BVA upper) | High | Yes |
| PP2-TC-038 | OTP Flow | 5-digit OTP no auto-submit (BVA lower) | High | Yes |
| PP2-TC-040 | Onboarding — Identity | DOB = today rejected | Medium | Yes |
| PP2-TC-041 | Onboarding — Identity | DOB 18y ago accepted (BVA) | Medium | Yes |
| PP2-TC-042 | Session | No token (fresh install) → Login | High | Yes |
| PP2-TC-043 | Session | Near-expiry token — silent refresh | Medium | Partial |

---

## PP-329 — [QA] PP-3 User Profile & Account Settings

**Jira:** [PP-329](https://7-solutions.atlassian.net/browse/PP-329) · Type: Task (parent QA task)  
**Story:** PP-3 User Profile & Account Settings  
**Design file:** `PP-3.design.md` + `PP-3.diagram.md`  
**Platform:** Mobile (iOS / Android) · **Framework:** WebdriverIO + Appium  
**Total TCs:** 35

### Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|--------|-----------|-----|------|------------|
| View Profile & Activity Tabs | State Transition + EP | PP3-TC-001–005 | High | 97% |
| Edit Profile — Display Name | EP + BVA + Decision Table | PP3-TC-006–013 | High | 97% |
| Edit Profile — Bio | BVA | PP3-TC-014–016 | Medium | 97% |
| Edit Profile — Phone & Save | EP + State Transition | PP3-TC-017–020 | High | 97% |
| Update Interests | BVA + State Transition | PP3-TC-021–024 | High | 97% |
| Delete Account | Scenario + BVA | PP3-TC-025–032 | High | 97% |
| Session Expiry & Logout | State Transition | PP3-TC-033–035 | Medium | 97% |
| **Total** | | **35** | | |

### Test Cases

| TC ID | Module | Summary | Priority | Automatable | Automation Type |
|-------|--------|---------|----------|-------------|-----------------|
| PP3-TC-001 | View Profile | Profile page loads all data correctly | High | Yes | mobile-ui, api |
| PP3-TC-002 | View Profile | Upcoming tab shows events sorted newest first | Medium | Yes | mobile-ui |
| PP3-TC-003 | View Profile | History tab shows past events sorted newest first | Medium | Yes | mobile-ui |
| PP3-TC-004 | View Profile | Saved tab shows saved events | Medium | Yes | mobile-ui |
| PP3-TC-005 | View Profile | Saved tab empty state shows CTA deep link | Medium | Yes | mobile-ui |
| PP3-TC-006 | Edit Profile | Edit Profile screen opens from Profile | High | Yes | mobile-ui |
| PP3-TC-007 | Edit Profile — Name | Display name empty — error on Save | High | Yes | mobile-ui |
| PP3-TC-008 | Edit Profile — Name | Display name 50 chars accepted (BVA max) | High | Yes | mobile-ui |
| PP3-TC-009 | Edit Profile — Name | Display name 51 chars rejected (BVA over) | High | Yes | mobile-ui |
| PP3-TC-010 | Edit Profile — Name | Digits not allowed in display name | High | Yes | mobile-ui |
| PP3-TC-011 | Edit Profile — Name | Allowed special chars accepted (space, dot, hyphen, apostrophe) | High | Yes | mobile-ui |
| PP3-TC-012 | Edit Profile — Name | Disallowed special chars rejected (@, #, !, $, %) | High | Yes | mobile-ui |
| PP3-TC-013 | Edit Profile — Name | Thai + English mixed name accepted | Medium | Yes | mobile-ui |
| PP3-TC-014 | Edit Profile — Bio | Bio 250 chars accepted (BVA max) | Medium | Yes | mobile-ui |
| PP3-TC-015 | Edit Profile — Bio | Bio 251 chars rejected (BVA over) | Medium | Yes | mobile-ui |
| PP3-TC-016 | Edit Profile — Bio | Bio empty accepted (optional) | Low | Yes | mobile-ui |
| PP3-TC-017 | Edit Profile — Phone | Valid phone update accepted | High | Yes | mobile-ui |
| PP3-TC-018 | Edit Profile — Phone | Invalid phone format rejected | High | Yes | mobile-ui |
| PP3-TC-019 | Edit Profile — Save | Profile reflects changes immediately (no pull-to-refresh) | High | Yes | mobile-ui |
| PP3-TC-020 | Edit Profile — Save | Network failure → Error Toast; stay on Edit screen | High | Partial | mobile-ui |
| PP3-TC-021 | Update Interests | Change interests — saved and profile updated | High | Yes | mobile-ui |
| PP3-TC-022 | Update Interests | Discovery feed re-calculates after interest update | High | Partial | mobile-ui, api |
| PP3-TC-023 | Update Interests | Cannot save with 0 interests — Save disabled | High | Yes | mobile-ui |
| PP3-TC-024 | Update Interests | 4th interest blocked (BVA upper) | Medium | Yes | mobile-ui |
| PP3-TC-025 | Delete Account | Delete Account button is de-emphasised | Medium | Yes | mobile-ui |
| PP3-TC-026 | Delete Account | Tapping Delete Account opens Confirmation Dialog | High | Yes | mobile-ui |
| PP3-TC-027 | Delete Account | Confirmation dialog accepts reason text | High | Yes | mobile-ui |
| PP3-TC-028 | Delete Account | Reason text 500 chars accepted (BVA max) | High | Yes | mobile-ui |
| PP3-TC-029 | Delete Account | Reason text 501 chars rejected (BVA over) | High | Yes | mobile-ui |
| PP3-TC-030 | Delete Account | Cancel delete — returns to Settings; account intact | High | Yes | mobile-ui |
| PP3-TC-031 | Delete Account | Confirm delete — account deleted; redirect to Login | High | Yes | mobile-ui |
| PP3-TC-032 | Delete Account | Deleted account cannot log in | High | Partial | mobile-ui, api |
| PP3-TC-033 | Session | Token expiry (401) redirects gracefully to Login | High | Partial | mobile-ui |
| PP3-TC-034 | View Profile | Network error on profile load shows error state | Medium | Partial | mobile-ui |
| PP3-TC-035 | Session / Logout | Logout clears session and redirects to Login | High | Yes | mobile-ui |

---

## PP-331 — [QA][automate][Mobile (iOS)] profile view

**Jira:** [PP-331](https://7-solutions.atlassian.net/browse/PP-331) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md`  
**Scope:** Profile view module — iOS automation

### Test Cases

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP3-TC-001 | View Profile | Profile page loads all data correctly | High | Yes |
| PP3-TC-002 | View Profile | Upcoming tab shows events sorted newest first | Medium | Yes |
| PP3-TC-003 | View Profile | History tab shows past events sorted newest first | Medium | Yes |
| PP3-TC-004 | View Profile | Saved tab shows saved events | Medium | Yes |
| PP3-TC-005 | View Profile | Saved tab empty state shows CTA deep link | Medium | Yes |

---

## PP-332 — [QA][automate][Mobile (Android)] profile view

**Jira:** [PP-332](https://7-solutions.atlassian.net/browse/PP-332) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md`  
**Scope:** Profile view module — Android automation

### Test Cases

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP3-TC-001 | View Profile | Profile page loads all data correctly | High | Yes |
| PP3-TC-002 | View Profile | Upcoming tab shows events sorted newest first | Medium | Yes |
| PP3-TC-003 | View Profile | History tab shows past events sorted newest first | Medium | Yes |
| PP3-TC-004 | View Profile | Saved tab shows saved events | Medium | Yes |
| PP3-TC-005 | View Profile | Saved tab empty state shows CTA deep link | Medium | Yes |

---

## PP-333 — [QA][automate][API] profile view

**Jira:** [PP-333](https://7-solutions.atlassian.net/browse/PP-333) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md`  
**Scope:** API contract assertions for profile view (`GET /v1/user/profile`)

### Test Cases (API scope)

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP3-TC-001 | View Profile | GET /v1/user/profile returns Avatar, Display Name, Bio, stats | High | api |
| PP3-TC-034 | View Profile | Network error on profile load shows error state | Medium | api |

---

## PP-353 — [QA][Manual][Mobile (Android)] profile view regression

**Jira:** [PP-353](https://7-solutions.atlassian.net/browse/PP-353) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md`  
**Scope:** Manual regression for profile view on Android

### Test Cases

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP3-TC-001 | View Profile | Profile page loads all data correctly | High | Yes |
| PP3-TC-002 | View Profile | Upcoming tab sorted newest first | Medium | Yes |
| PP3-TC-003 | View Profile | History tab sorted newest first | Medium | Yes |
| PP3-TC-004 | View Profile | Saved tab shows saved events | Medium | Yes |
| PP3-TC-005 | View Profile | Empty Saved tab CTA | Medium | Yes |
| PP3-TC-034 | View Profile | Network error shows error state | Medium | Partial |

---

## PP-356 — [QA][automate][Mobile (Android)] profile edit

**Jira:** [PP-356](https://7-solutions.atlassian.net/browse/PP-356) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md`  
**Scope:** Edit Profile module — Android automation

### Test Cases

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP3-TC-006 | Edit Profile | Edit Profile screen opens from Profile | High | Yes |
| PP3-TC-007 | Edit Name | Empty name → error on Save | High | Yes |
| PP3-TC-008 | Edit Name | 50 chars accepted (BVA max) | High | Yes |
| PP3-TC-009 | Edit Name | 51 chars rejected (BVA over) | High | Yes |
| PP3-TC-010 | Edit Name | Digits rejected | High | Yes |
| PP3-TC-011 | Edit Name | Allowed specials accepted | High | Yes |
| PP3-TC-012 | Edit Name | Disallowed specials rejected | High | Yes |
| PP3-TC-013 | Edit Name | Thai + English mixed accepted | Medium | Yes |
| PP3-TC-014 | Edit Bio | 250 chars accepted (BVA max) | Medium | Yes |
| PP3-TC-015 | Edit Bio | 251 chars rejected (BVA over) | Medium | Yes |
| PP3-TC-016 | Edit Bio | Empty bio accepted | Low | Yes |
| PP3-TC-017 | Edit Phone | Valid phone update accepted | High | Yes |
| PP3-TC-018 | Edit Phone | Invalid phone rejected | High | Yes |
| PP3-TC-019 | Edit Save | Reflects changes immediately | High | Yes |
| PP3-TC-020 | Edit Save | Network failure → Error Toast | High | Partial |

---

## PP-357 — [QA][automate][API] profile edit

**Jira:** [PP-357](https://7-solutions.atlassian.net/browse/PP-357) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md`  
**Scope:** API assertions for PATCH /v1/user/profile

### Test Cases (API scope)

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP3-TC-017 | Edit Phone | Valid phone stored as +66XXXXXXXXX | High | api |
| PP3-TC-019 | Edit Save | PATCH success — profile updated | High | api |
| PP3-TC-020 | Edit Save | Network failure — PATCH fails | High | api |

---

## PP-359 — [QA][Manual][Mobile (Android)] profile edit regression

**Jira:** [PP-359](https://7-solutions.atlassian.net/browse/PP-359) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md`  
**Scope:** Manual regression for Edit Profile on Android

### Test Cases

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP3-TC-006 | Edit Profile | Screen opens with pre-filled values | High | Yes |
| PP3-TC-007–013 | Edit Name | All validation rules | High | Yes |
| PP3-TC-014–016 | Edit Bio | BVA boundaries + optional | Medium | Yes |
| PP3-TC-017–018 | Edit Phone | Valid/invalid phone | High | Yes |
| PP3-TC-019 | Edit Save | Immediate UI update | High | Yes |
| PP3-TC-020 | Edit Save | Network failure → Error Toast | High | Partial |

---

## PP-360 — [QA][test design & review][Mobile] interests

**Jira:** [PP-360](https://7-solutions.atlassian.net/browse/PP-360) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md`  
**Scope:** Review design for Update Interests module

### Test Cases (Design Review Scope)

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP3-TC-021 | Interests | Change interests — saved and profile updated | High | Yes |
| PP3-TC-022 | Interests | Discovery feed re-calculates | High | Partial |
| PP3-TC-023 | Interests | Cannot save with 0 interests (BVA lower) | High | Yes |
| PP3-TC-024 | Interests | 4th interest blocked (BVA upper) | Medium | Yes |

---

## PP-361 — [QA][automate][Mobile (iOS)] interests

**Jira:** [PP-361](https://7-solutions.atlassian.net/browse/PP-361) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md` · **Scope:** Interests — iOS automation

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP3-TC-021 | Interests | Change interests — saved | High | Yes |
| PP3-TC-022 | Interests | Feed re-calculates | High | Partial |
| PP3-TC-023 | Interests | Save disabled with 0 interests | High | Yes |
| PP3-TC-024 | Interests | 4th interest blocked | Medium | Yes |

---

## PP-362 — [QA][automate][Mobile (Android)] interests

**Jira:** [PP-362](https://7-solutions.atlassian.net/browse/PP-362) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md` · **Scope:** Interests — Android automation

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP3-TC-021 | Interests | Change interests — saved | High | Yes |
| PP3-TC-022 | Interests | Feed re-calculates | High | Partial |
| PP3-TC-023 | Interests | Save disabled with 0 interests | High | Yes |
| PP3-TC-024 | Interests | 4th interest blocked | Medium | Yes |

---

## PP-363 — [QA][automate][API] interests

**Jira:** [PP-363](https://7-solutions.atlassian.net/browse/PP-363) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md` · **Scope:** API assertions for interests update

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP3-TC-021 | Interests | PUT interests — User_Interests DB updated | High | api |
| PP3-TC-022 | Interests | Discovery feed re-calculates via GET /v1/discovery | High | api |

---

## PP-364 — [QA][Manual][Mobile (iOS)] interests regression

**Jira:** [PP-364](https://7-solutions.atlassian.net/browse/PP-364) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md` · **Scope:** Manual interests regression — iOS

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP3-TC-021 | Change interests | High |
| PP3-TC-022 | Feed re-calculates | High |
| PP3-TC-023 | 0 interests blocked | High |
| PP3-TC-024 | 4th interest blocked | Medium |

---

## PP-365 — [QA][Manual][Mobile (Android)] interests regression

**Jira:** [PP-365](https://7-solutions.atlassian.net/browse/PP-365) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md` · **Scope:** Manual interests regression — Android

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP3-TC-021 | Change interests | High |
| PP3-TC-022 | Feed re-calculates | High |
| PP3-TC-023 | 0 interests blocked | High |
| PP3-TC-024 | 4th interest blocked | Medium |

---

## PP-368 — [QA][automate][Mobile (Android)] delete account

**Jira:** [PP-368](https://7-solutions.atlassian.net/browse/PP-368) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md` · **Scope:** Delete Account — Android automation

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP3-TC-025 | Delete Account | Delete button de-emphasised | Medium | Yes |
| PP3-TC-026 | Delete Account | Tapping opens Confirmation Dialog | High | Yes |
| PP3-TC-027 | Delete Account | Dialog accepts reason text | High | Yes |
| PP3-TC-028 | Delete Account | Reason 500 chars accepted (BVA max) | High | Yes |
| PP3-TC-029 | Delete Account | Reason 501 chars rejected (BVA over) | High | Yes |
| PP3-TC-030 | Delete Account | Cancel — Settings; account intact | High | Yes |
| PP3-TC-031 | Delete Account | Confirm — deleted; redirect to Login | High | Yes |
| PP3-TC-032 | Delete Account | Deleted account cannot log in | High | Partial |

---

## PP-369 — [QA][automate][API] delete account

**Jira:** [PP-369](https://7-solutions.atlassian.net/browse/PP-369) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md` · **Scope:** API assertions for DELETE /v1/user/account

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP3-TC-031 | Delete Account | DELETE /v1/user/account — account removed; sessions cleared | High | api |
| PP3-TC-032 | Delete Account | Deleted account auth rejected | High | api |

---

## PP-371 — [QA][Manual][Mobile (Android)] delete account regression

**Jira:** [PP-371](https://7-solutions.atlassian.net/browse/PP-371) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md` · **Scope:** Manual delete account regression — Android

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP3-TC-025–032 | Full delete account flow | High |

---

## PP-374 — [QA][automate][Mobile (Android)] logout

**Jira:** [PP-374](https://7-solutions.atlassian.net/browse/PP-374) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md` · **Scope:** Logout — Android automation

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP3-TC-035 | Session / Logout | Logout clears session and redirects to Login | High | Yes |

---

## PP-375 — [QA][automate][API] logout (/logout)

**Jira:** [PP-375](https://7-solutions.atlassian.net/browse/PP-375) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md` · **Scope:** POST /logout API contract

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP3-TC-035 | Logout | POST /logout — tokens invalidated; session cleared | High | api |

---

## PP-376 — [QA][Manual][Mobile (iOS)] logout regression

**Jira:** [PP-376](https://7-solutions.atlassian.net/browse/PP-376) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md` · **Scope:** Manual logout regression — iOS

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP3-TC-035 | Logout clears session → Login | High |

---

## PP-377 — [QA][Manual][Mobile (Android)] logout regression

**Jira:** [PP-377](https://7-solutions.atlassian.net/browse/PP-377) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md` · **Scope:** Manual logout regression — Android

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP3-TC-035 | Logout clears session → Login | High |

---

## PP-378 — [QA][test design & review][Mobile] session expiry

**Jira:** [PP-378](https://7-solutions.atlassian.net/browse/PP-378) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md` · **Scope:** Design review for session expiry

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP3-TC-033 | Session | Token expiry (401) redirects gracefully to Login | High | Partial |

---

## PP-379 — [QA][automate][Mobile (iOS)] session expiry

**Jira:** [PP-379](https://7-solutions.atlassian.net/browse/PP-379) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md` · **Scope:** Session expiry — iOS automation

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP3-TC-033 | Session | 401 redirects gracefully to Login | High | Partial |

---

## PP-380 — [QA][automate][Mobile (Android)] session expiry

**Jira:** [PP-380](https://7-solutions.atlassian.net/browse/PP-380) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md` · **Scope:** Session expiry — Android automation

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP3-TC-033 | Session | 401 redirects gracefully to Login | High | Partial |

---

## PP-381 — [QA][automate][API] session expiry (/refresh-token)

**Jira:** [PP-381](https://7-solutions.atlassian.net/browse/PP-381) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md` · **Scope:** POST /refresh-token API contract

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP3-TC-033 | Session | JWT expired → 401 → redirect to Login | High | api |
| PP3-TC-034 | View Profile | Network error on profile load | Medium | api |

---

## PP-382 — [QA][Manual][Mobile (iOS)] session expiry regression

**Jira:** [PP-382](https://7-solutions.atlassian.net/browse/PP-382) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md` · **Scope:** Manual session expiry regression — iOS

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP3-TC-033 | 401 graceful redirect | High |

---

## PP-383 — [QA][Manual][Mobile (Android)] session expiry regression

**Jira:** [PP-383](https://7-solutions.atlassian.net/browse/PP-383) · Type: Sub-task of PP-329  
**Design file:** `PP-3.design.md` · **Scope:** Manual session expiry regression — Android

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP3-TC-033 | 401 graceful redirect | High |

---

## PP-384 — [QA] PP-4 Organizer Register & Login

**Jira:** [PP-384](https://7-solutions.atlassian.net/browse/PP-384) · Type: Task (parent QA task)  
**Story:** PP-4 [BO][Organizer] Register & Login  
**Design file:** `PP-4.design.md` + `PP-4.diagram.md`  
**Platform:** Web (Desktop, Chrome / Safari, 1280px+) · **Framework:** Playwright  
**Total TCs:** 44

### Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|--------|-----------|-----|------|------------|
| Registration Wizard Step 1 | State Transition + EP | PP4-TC-001–007 | High | 95–97% |
| Registration Wizard Step 2 | EP + BVA | PP4-TC-008–014 | High | 97% |
| Registration Wizard Step 3 | Checklist | PP4-TC-015–016 | Medium | 93% |
| Profile — Type Selection | State Transition | PP4-TC-017–019 | High | 95% |
| Profile — Individual | State Transition + EP + BVA | PP4-TC-020–033 | High | 90–97% |
| Profile — Corporate | State Transition + EP + BVA | PP4-TC-034–036 | High | 90–97% |
| Login & RBAC | Decision Table | PP4-TC-037–041 | High | 97% |
| Re-submission | State Transition | PP4-TC-042 | High | 97% |
| Edge Cases | Error Guessing | PP4-TC-043–044 | Medium | 95% |
| **Total** | | **44** | | |

### Test Cases

| TC ID | Automatable | Module | Summary | Priority |
|-------|-------------|--------|---------|----------|
| PP4-TC-001 | ✅ | Reg Step 1 | Happy path all valid → ถัดไป → Step 2 | High |
| PP4-TC-002 | ✅ | Reg Step 1 | displayName required | High |
| PP4-TC-003 | ✅ | Reg Step 1 | firstName required | High |
| PP4-TC-004 | ✅ | Reg Step 1 | lastName required | High |
| PP4-TC-005 | ✅ | Reg Step 1 | DOB required | High |
| PP4-TC-006 | ✅ | Reg Step 1 | phone required | High |
| PP4-TC-007 | ✅ | Reg Step 1 | phone invalid format | High |
| PP4-TC-008 | ✅ | Reg Step 2 | Happy path valid credentials → Step 3 | High |
| PP4-TC-009 | ✅ | Reg Step 2 | email required | High |
| PP4-TC-010 | ✅ | Reg Step 2 | password < 8 chars rejected (BVA) | High |
| PP4-TC-011 | ✅ | Reg Step 2 | password no letter (rule 2 unmet) | High |
| PP4-TC-012 | ✅ | Reg Step 2 | password no digit (rule 3 unmet) | High |
| PP4-TC-013 | ✅ | Reg Step 2 | confirm password mismatch | High |
| PP4-TC-014 | ✅ | Reg Step 2 | duplicate email rejected | High |
| PP4-TC-015 | ✅ | Reg Step 3 | Verify page shown (URL + resend button) | Medium |
| PP4-TC-016 | ✅ | Reg Step 3 | Resend email → feedback shown | Medium |
| PP4-TC-017 | ✅ | Profile Type | Type selection page shown after login | High |
| PP4-TC-018 | ✅ | Profile Type | Select Individual → /profile/individual | High |
| PP4-TC-019 | ✅ | Profile Type | Select Corporate → /profile/organize | High |
| PP4-TC-020 | ⏳ | Individual | Happy path → PENDING_SUBMISSION | High |
| PP4-TC-021 | ⏳ | Individual | National ID 12 digits rejected (BVA lower) | High |
| PP4-TC-022 | ⏳ | Individual | National ID non-numeric rejected | High |
| PP4-TC-023 | ⏳ | Individual | Required fields empty → submit blocked | High |
| PP4-TC-024 | ⏳ | Individual | Valid PDF 5MB upload accepted | High |
| PP4-TC-025 | ⏳ | Individual | Valid JPG 3MB accepted | High |
| PP4-TC-026 | ⏳ | Individual | Valid PNG 8MB accepted | High |
| PP4-TC-027 | ⏳ | Individual | File exactly 10MB accepted (BVA max) | High |
| PP4-TC-028 | ⏳ | Individual | File > 10MB rejected (BVA over) | High |
| PP4-TC-029 | ⏳ | Individual | .exe file type rejected | High |
| PP4-TC-030 | ⏳ | Individual | .docx file type rejected | High |
| PP4-TC-031 | ⏳ | Individual | Drag & drop upload accepted | Medium |
| PP4-TC-032 | ⏳ | Individual | Corrupted file → backend returns 400 | Medium |
| PP4-TC-033 | ❌ | Secure Storage | Uploaded file not publicly accessible | High |
| PP4-TC-034 | ⏳ | Corporate | Happy path → PENDING_SUBMISSION | High |
| PP4-TC-035 | ⏳ | Corporate | Tax ID < 13 digits rejected | High |
| PP4-TC-036 | ⏳ | Corporate | Backend Tax ID bypass → API 400 | High |
| PP4-TC-037 | ⏳ | Login RBAC | Approved → BO Dashboard | High |
| PP4-TC-038 | ⏳ | Login RBAC | Pending → home + verification banner | High |
| PP4-TC-039 | ⏳ | Login RBAC | Rejected → rejection reason + Re-submit | High |
| PP4-TC-040 | ⏳ | RBAC Guard | Pending + direct /event/create → blocked | High |
| PP4-TC-041 | ✅ | RBAC Guard | Unauthenticated direct /event/create → /login | High |
| PP4-TC-042 | ⏳ | Re-submission | Re-submit after rejection → Pending | High |
| PP4-TC-043 | ⏳ | Edge Cases | Double submit — idempotency guard | Medium |
| PP4-TC-044 | ❌ | Edge Cases | Draft saved on browser close — restored on return | Medium |

---

## PP-386 — [QA][automate][Web UI] registration wizard

**Jira:** [PP-386](https://7-solutions.atlassian.net/browse/PP-386) · Type: Sub-task of PP-384  
**Design file:** `PP-4.design.md` · **Scope:** Registration wizard (Steps 1–3) — Web UI automation

| TC ID | Automatable | Module | Summary | Priority |
|-------|-------------|--------|---------|----------|
| PP4-TC-001 | ✅ | Step 1 | Happy path → Step 2 | High |
| PP4-TC-002 | ✅ | Step 1 | displayName required | High |
| PP4-TC-003 | ✅ | Step 1 | firstName required | High |
| PP4-TC-004 | ✅ | Step 1 | lastName required | High |
| PP4-TC-005 | ✅ | Step 1 | DOB required | High |
| PP4-TC-006 | ✅ | Step 1 | phone required | High |
| PP4-TC-007 | ✅ | Step 1 | phone invalid format | High |
| PP4-TC-008 | ✅ | Step 2 | Happy path → Step 3 | High |
| PP4-TC-009 | ✅ | Step 2 | email required | High |
| PP4-TC-010 | ✅ | Step 2 | password < 8 chars (BVA) | High |
| PP4-TC-011 | ✅ | Step 2 | password no letter | High |
| PP4-TC-012 | ✅ | Step 2 | password no digit | High |
| PP4-TC-013 | ✅ | Step 2 | confirm mismatch | High |
| PP4-TC-014 | ✅ | Step 2 | duplicate email rejected | High |
| PP4-TC-015 | ✅ | Step 3 | Verify page shown | Medium |
| PP4-TC-016 | ✅ | Step 3 | Resend email feedback | Medium |

---

## PP-387 — [QA][automate][API] registration wizard

**Jira:** [PP-387](https://7-solutions.atlassian.net/browse/PP-387) · Type: Sub-task of PP-384  
**Design file:** `PP-4.design.md` · **Scope:** API contract for registration submission

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP4-TC-014 | Step 2 | Duplicate email → server returns error (API contract) | High | api |
| PP4-TC-036 | Corporate | Backend Tax ID bypass → API returns 400 | High | api |

---

## PP-390 — [QA][automate][Web UI] profile submission

**Jira:** [PP-390](https://7-solutions.atlassian.net/browse/PP-390) · Type: Sub-task of PP-384  
**Design file:** `PP-4.design.md` · **Scope:** Profile submission (Individual + Corporate)

| TC ID | Automatable | Module | Summary | Priority |
|-------|-------------|--------|---------|----------|
| PP4-TC-017 | ✅ | Type Selection | Type selection shown | High |
| PP4-TC-018 | ✅ | Type Selection | Individual → /profile/individual | High |
| PP4-TC-019 | ✅ | Type Selection | Corporate → /profile/organize | High |
| PP4-TC-020 | ⏳ | Individual | Happy path → PENDING_SUBMISSION | High |
| PP4-TC-021 | ⏳ | Individual | National ID 12 digits rejected | High |
| PP4-TC-022 | ⏳ | Individual | National ID non-numeric rejected | High |
| PP4-TC-023 | ⏳ | Individual | Required fields empty blocked | High |
| PP4-TC-024 | ⏳ | Individual | PDF 5MB accepted | High |
| PP4-TC-025 | ⏳ | Individual | JPG 3MB accepted | High |
| PP4-TC-026 | ⏳ | Individual | PNG 8MB accepted | High |
| PP4-TC-027 | ⏳ | Individual | 10MB accepted (BVA max) | High |
| PP4-TC-028 | ⏳ | Individual | > 10MB rejected (BVA over) | High |
| PP4-TC-029 | ⏳ | Individual | .exe rejected | High |
| PP4-TC-030 | ⏳ | Individual | .docx rejected | High |
| PP4-TC-031 | ⏳ | Individual | Drag & drop accepted | Medium |
| PP4-TC-032 | ⏳ | Individual | Corrupted file → 400 | Medium |
| PP4-TC-034 | ⏳ | Corporate | Happy path → PENDING_SUBMISSION | High |
| PP4-TC-035 | ⏳ | Corporate | Tax ID < 13 digits rejected | High |

---

## PP-391 — [QA][automate][API] profile submission

**Jira:** [PP-391](https://7-solutions.atlassian.net/browse/PP-391) · Type: Sub-task of PP-384  
**Design file:** `PP-4.design.md` · **Scope:** API assertions for profile data persistence + file upload

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP4-TC-032 | Individual | Corrupted file — backend 400 response | Medium | api |
| PP4-TC-036 | Corporate | Tax ID bypass → backend API 400 | High | api |
| PP4-TC-043 | Edge Cases | Double submit — DB duplicate check via API | Medium | api |

---

## PP-392 — [QA][Manual][Web UI] profile submission regression

**Jira:** [PP-392](https://7-solutions.atlassian.net/browse/PP-392) · Type: Sub-task of PP-384  
**Design file:** `PP-4.design.md` · **Scope:** Manual regression — Private Bucket + draft save

| TC ID | Automatable | Module | Summary | Priority |
|-------|-------------|--------|---------|----------|
| PP4-TC-033 | ❌ | Secure Storage | File not publicly accessible (Private Bucket) | High |
| PP4-TC-044 | ❌ | Edge Cases | Draft saved on browser close; restored on return | Medium |

---

## PP-393 — [QA][automate][Web UI] login and status-based page access (RBAC)

**Jira:** [PP-393](https://7-solutions.atlassian.net/browse/PP-393) · Type: Sub-task of PP-384  
**Design file:** `PP-4.design.md` · **Scope:** Login + RBAC Web UI automation

| TC ID | Automatable | Module | Summary | Priority |
|-------|-------------|--------|---------|----------|
| PP4-TC-037 | ⏳ | Login RBAC | Approved → Dashboard | High |
| PP4-TC-038 | ⏳ | Login RBAC | Pending → home + banner | High |
| PP4-TC-039 | ⏳ | Login RBAC | Rejected → rejection page | High |
| PP4-TC-040 | ⏳ | RBAC Guard | Pending + direct URL → blocked | High |
| PP4-TC-041 | ✅ | RBAC Guard | Unauthenticated → /login | High |

---

## PP-394 — [QA][automate][API] login and status-based page access (RBAC)

**Jira:** [PP-394](https://7-solutions.atlassian.net/browse/PP-394) · Type: Sub-task of PP-384  
**Design file:** `PP-4.design.md` · **Scope:** API assertions for auth token + role enforcement

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP4-TC-037 | Login RBAC | Auth token response + role check for Approved | High | api |
| PP4-TC-038 | Login RBAC | Auth token response for Pending Organizer | High | api |
| PP4-TC-039 | Login RBAC | Auth token response for Rejected Organizer | High | api |

---

## PP-395 — [QA][Manual][Web UI] login and status-based page access (RBAC) regression

**Jira:** [PP-395](https://7-solutions.atlassian.net/browse/PP-395) · Type: Sub-task of PP-384  
**Design file:** `PP-4.design.md` · **Scope:** Manual RBAC regression with real STG accounts

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP4-TC-037–041 | Full RBAC matrix manual verification | High |

---

## PP-396 — [QA][automate][Web UI] profile re-submission after rejection

**Jira:** [PP-396](https://7-solutions.atlassian.net/browse/PP-396) · Type: Sub-task of PP-384  
**Design file:** `PP-4.design.md` · **Scope:** Re-submission flow — Web UI automation

| TC ID | Automatable | Module | Summary | Priority |
|-------|-------------|--------|---------|----------|
| PP4-TC-042 | ⏳ | Re-submission | Rejected → edit → Re-submit → Pending | High |

---

## PP-397 — [QA][automate][API] profile re-submission after rejection

**Jira:** [PP-397](https://7-solutions.atlassian.net/browse/PP-397) · Type: Sub-task of PP-384  
**Design file:** `PP-4.design.md` · **Scope:** API idempotency + draft save contract

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP4-TC-043 | Edge Cases | Double submit — idempotency (DB check via API) | Medium | api |

---

## PP-398 — [QA][Manual][Web UI] profile re-submission after rejection regression

**Jira:** [PP-398](https://7-solutions.atlassian.net/browse/PP-398) · Type: Sub-task of PP-384  
**Design file:** `PP-4.design.md` · **Scope:** Manual regression — re-submission + draft

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP4-TC-042 | Re-submission full flow | High |
| PP4-TC-044 | Draft restore after browser close | Medium |

---

## PP-399 — [QA] PP-5 Admin Register & Login

**Jira:** [PP-399](https://7-solutions.atlassian.net/browse/PP-399) · Type: Task (parent QA task)  
**Story:** PP-5 [BO][Admin] Register & Login  
**Design file:** `PP-5.design.md` + `PP-5.diagram.md`  
**Platform:** Web (Desktop, Chrome / Safari, 1280px+) · **Framework:** Playwright  
**Total active TCs:** 15 (4 obsolete)

### Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|--------|-----------|-----|------|------------|
| Login Flow (Direct Form) | State Transition | PP5-TC-001, 002, 017, 018 | High | 98% |
| Role Validation | Decision Table | PP5-TC-004, 005 | High | 75% |
| Error Handling | Error Guessing | PP5-TC-006, 007, 008 | High | 80% |
| Session Management | State Transition | PP5-TC-012, 013, 014, 019 | High | 80% |
| Forgot Password | State Transition | PP5-TC-015 | Medium | 50% |
| Loading / UX | Checklist | PP5-TC-016 | Low | 90% |
| **Total (active)** | | **15** | | |
| **Obsolete** | | PP5-TC-003, 009, 010, 011 | | |

### Test Cases

| TC ID | Automatable | Module | Summary | Priority |
|-------|-------------|--------|---------|----------|
| PP5-TC-001 | ⏳ | Login Flow | No session → /login redirect | High |
| PP5-TC-002 | ⏳ | Login Flow | Valid session → Dashboard (no re-auth) | High |
| ~~PP5-TC-003~~ | ~~Obsolete~~ | ~~Login Flow~~ | ~~No BO login form — only redirect button~~ | ~~Medium~~ |
| PP5-TC-004 | ⏳ | Role Validation | Agency account → access denied | High |
| PP5-TC-005 | ⏳ | Role Validation | End-user account → access denied | High |
| PP5-TC-006 | ⏳ | Error Handling | Wrong password → "Invalid email or password" toast | High |
| PP5-TC-007 | ⏳ | Error Handling | Suspended account → error shown | High |
| PP5-TC-008 | ❌ | Error Handling | Server unavailable → connection error | Medium |
| ~~PP5-TC-009~~ | ~~Obsolete~~ | ~~Error Handling~~ | ~~Invalid authorization code~~ | ~~Medium~~ |
| ~~PP5-TC-010~~ | ~~Obsolete~~ | ~~Session Mgmt~~ | ~~Remember Me — session persists~~ | ~~High~~ |
| ~~PP5-TC-011~~ | ~~Obsolete~~ | ~~Session Mgmt~~ | ~~No Remember Me — session ends on close~~ | ~~High~~ |
| PP5-TC-012 | ⏳ | Session Mgmt | Inactivity timeout → /login redirect | High |
| PP5-TC-013 | ⏳ | Session Mgmt | Active use keeps session alive | Medium |
| PP5-TC-014 | ⏳ | Session Mgmt | Logout → /login redirect | High |
| PP5-TC-015 | ⏳ | Forgot Password | "Forgot password?" link visible on /login | Medium |
| PP5-TC-016 | ⏳ | Loading / UX | Login button shows "Logging in..." during submit | Low |
| PP5-TC-017 | ⏳ | Login Flow | Session guard — direct protected URL → /login | High |
| PP5-TC-018 | ⏳ | Login Flow | Valid credentials → Dashboard shown | High |
| PP5-TC-019 | ⏳ | Session Mgmt | Session destroyed after logout — protected URL → /login | High |

---

## PP-401 — [QA][automate][Web UI] login flow

**Jira:** [PP-401](https://7-solutions.atlassian.net/browse/PP-401) · Type: Sub-task of PP-399  
**Design file:** `PP-5.design.md` · **Scope:** Admin login flow — Web UI automation

| TC ID | Automatable | Module | Summary | Priority |
|-------|-------------|--------|---------|----------|
| PP5-TC-001 | ⏳ | Login Flow | No session → /login redirect | High |
| PP5-TC-002 | ⏳ | Login Flow | Valid session → Dashboard (no re-auth) | High |
| PP5-TC-017 | ⏳ | Login Flow | Direct protected URL → /login | High |
| PP5-TC-018 | ⏳ | Login Flow | Valid credentials → Dashboard | High |

---

## PP-402 — [QA][automate][API] login flow

**Jira:** [PP-402](https://7-solutions.atlassian.net/browse/PP-402) · Type: Sub-task of PP-399  
**Design file:** `PP-5.design.md` · **Scope:** API assertions for admin login endpoint

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP5-TC-018 | Login Flow | POST /auth/login — token response contract | High | api |
| PP5-TC-006 | Error Handling | POST /auth/login with wrong credentials — error contract | High | api |
| PP5-TC-007 | Error Handling | POST /auth/login for suspended account — error contract | High | api |

---

## PP-404 — [QA][automate][Web UI] role validation

**Jira:** [PP-404](https://7-solutions.atlassian.net/browse/PP-404) · Type: Sub-task of PP-399  
**Design file:** `PP-5.design.md` · **Scope:** Role-based access — Web UI automation

| TC ID | Automatable | Module | Summary | Priority |
|-------|-------------|--------|---------|----------|
| PP5-TC-004 | ⏳ | Role Validation | Agency account → access denied | High |
| PP5-TC-005 | ⏳ | Role Validation | End-user account → access denied | High |

---

## PP-405 — [QA][automate][API] role validation

**Jira:** [PP-405](https://7-solutions.atlassian.net/browse/PP-405) · Type: Sub-task of PP-399  
**Design file:** `PP-5.design.md` · **Scope:** API role enforcement contract

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP5-TC-004 | Role Validation | Agency login → authorization enforcement contract | High | api |
| PP5-TC-005 | Role Validation | End-user login → authorization enforcement contract | High | api |

---

## PP-406 — [QA][Manual][Web UI] role validation regression

**Jira:** [PP-406](https://7-solutions.atlassian.net/browse/PP-406) · Type: Sub-task of PP-399  
**Design file:** `PP-5.design.md` · **Scope:** Manual role validation with real STG test accounts

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP5-TC-004 | Agency access denied | High |
| PP5-TC-005 | End-user access denied | High |

---

## PP-407 — [QA][automate][Web UI] error handling

**Jira:** [PP-407](https://7-solutions.atlassian.net/browse/PP-407) · Type: Sub-task of PP-399  
**Design file:** `PP-5.design.md` · **Scope:** Error handling — Web UI automation

| TC ID | Automatable | Module | Summary | Priority |
|-------|-------------|--------|---------|----------|
| PP5-TC-006 | ⏳ | Error Handling | Wrong password → toast shown | High |
| PP5-TC-007 | ⏳ | Error Handling | Suspended account → error | High |
| PP5-TC-008 | ❌ | Error Handling | Server unavailable → connection error | Medium |

---

## PP-408 — [QA][automate][API] error handling

**Jira:** [PP-408](https://7-solutions.atlassian.net/browse/PP-408) · Type: Sub-task of PP-399  
**Design file:** `PP-5.design.md` · **Scope:** API error response contract for invalid credentials

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP5-TC-006 | Error Handling | POST /auth/login wrong password → error response body | High | api |
| PP5-TC-007 | Error Handling | POST /auth/login suspended account → error response | High | api |

---

---

## [DRAFT] PP-237 Parent — [QA] PP-237 Event Detail excluding comment

**Jira:** TBD · Type: Task (parent QA task)  
**Story:** PP-237 Event Detail excluding comment  
**Design file:** *(draft from requirements — no `.design.md` yet)*  
**Platform:** Mobile (iOS / Android) · **Framework:** WebdriverIO + Appium  
**Total TCs:** 10  

### Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|--------|-----------|-----|------|------------|
| Event Detail Display | EP + Checklist | PP237-TC-001–003 | High | 95% |
| No Comment Section | Checklist | PP237-TC-004 | High | 97% |
| Participants | EP + BVA | PP237-TC-005–007 | High | 95% |
| Gallery | Decision Table | PP237-TC-008–009 | Medium | 90% |
| API Contract | Contract | PP237-TC-010 | High | 95% |
| **Total** | | **10** | | |

### Test Cases

| TC ID | Module | Summary | Priority | Automatable | Automation Type |
|-------|--------|---------|----------|-------------|-----------------|
| PP237-TC-001 | Event Detail | Happy path — all fields displayed: name, date, location, description, price, banner image | High | Yes | mobile-ui, api |
| PP237-TC-002 | Event Detail | All rendered fields match API response data | High | Yes | mobile-ui, api |
| PP237-TC-003 | Event Detail | Loading state shown during fetch; error state on network failure | Medium | Partial | mobile-ui |
| PP237-TC-004 | No Comment | Comment section absent after full page scroll | High | Yes | mobile-ui |
| PP237-TC-005 | Participants | Participant list shows registered users with avatar and name | High | Yes | mobile-ui |
| PP237-TC-006 | Participants | Participant count matches total registrations from API | High | Yes | mobile-ui, api |
| PP237-TC-007 | Participants | Empty state shown when event has 0 registrations (no error) | High | Yes | mobile-ui |
| PP237-TC-008 | Gallery | Gallery section shows images when event has photos | Medium | Yes | mobile-ui |
| PP237-TC-009 | Gallery | Gallery section absent or shows empty state when no photos | Medium | Yes | mobile-ui |
| PP237-TC-010 | API Contract | Event Detail API returns: name, date, location, description, price, gallery[], participants[] | High | Yes | api |

---

## [DRAFT] PP-237 sub 1 — [QA][test desing & review][Mobile tesing] event detail and participants coverage

**Jira:** TBD · Sub-task of PP-237 parent · **Scope:** Design review all 10 TCs

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP237-TC-001–010 | Full design review — event detail fields, no-comment, participants, gallery, API | High |

---

## [DRAFT] PP-237 sub 2 — [QA][automate][Mobile (iOS) tesing] event detail and participants automation

**Jira:** TBD · Sub-task of PP-237 parent · **Scope:** iOS automation

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP237-TC-001 | Event Detail | All fields displayed | High | Yes |
| PP237-TC-002 | Event Detail | Fields match API data | High | Yes |
| PP237-TC-004 | No Comment | Comment section absent | High | Yes |
| PP237-TC-005 | Participants | List shows users | High | Yes |
| PP237-TC-006 | Participants | Count matches API | High | Yes |
| PP237-TC-007 | Participants | Empty state no error | High | Yes |
| PP237-TC-008 | Gallery | Gallery shown with photos | Medium | Yes |
| PP237-TC-009 | Gallery | Gallery absent/empty state | Medium | Yes |

---

## [DRAFT] PP-237 sub 3 — [QA][automate][Mobile (Android) tesing] event detail and participants automation

**Jira:** TBD · Sub-task of PP-237 parent · **Scope:** Android automation (same TC scope as iOS)

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP237-TC-001 | Event Detail | All fields displayed | High | Yes |
| PP237-TC-002 | Event Detail | Fields match API data | High | Yes |
| PP237-TC-004 | No Comment | Comment section absent | High | Yes |
| PP237-TC-005 | Participants | List shows users | High | Yes |
| PP237-TC-006 | Participants | Count matches API | High | Yes |
| PP237-TC-007 | Participants | Empty state no error | High | Yes |
| PP237-TC-008 | Gallery | Gallery shown with photos | Medium | Yes |
| PP237-TC-009 | Gallery | Gallery absent/empty state | Medium | Yes |

---

## [DRAFT] PP-237 sub 4 — [QA][automate][API tesing] event detail and participants contract automation

**Jira:** TBD · Sub-task of PP-237 parent · **Scope:** API contract assertions

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP237-TC-010 | API Contract | Event Detail response shape — name, date, location, price, gallery[], participants[] | High | api |
| PP237-TC-006 | Participants | Participant count accuracy from API | High | api |

---

## [DRAFT] PP-237 sub 5 — [QA][Manual tesing][Mobile (iOS) tesing] event detail regression

**Jira:** TBD · Sub-task of PP-237 parent · **Scope:** iOS manual — all High TCs with real STG data

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP237-TC-001–010 | Full event detail manual verification on STG | High |

---

## [DRAFT] PP-237 sub 6 — [QA][Manual tesing][Mobile (Android) tesing] event detail regression

**Jira:** TBD · Sub-task of PP-237 parent · **Scope:** Android manual

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP237-TC-001–010 | Full event detail manual verification on STG | High |

---

## [DRAFT] PP-296 Parent — [QA] PP-296 View Who's Registered Event

**Jira:** TBD · Type: Task (parent QA task)  
**Story:** PP-296 View Who's Registered Event  
**Design file:** *(draft from requirements — no `.design.md` yet)*  
**Platform:** Mobile (iOS / Android) · **Framework:** WebdriverIO + Appium  
**Total TCs:** 8  

### Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|--------|-----------|-----|------|------------|
| Wording Display | EP + Checklist | PP296-TC-001–002 | High | 95% |
| Count Accuracy | Decision Table | PP296-TC-003–004 | High | 95% |
| Zero State | BVA | PP296-TC-005 | High | 97% |
| Refresh | State Transition | PP296-TC-006 | Medium | 90% |
| API Contract | Contract | PP296-TC-007–008 | High | 95% |
| **Total** | | **8** | | |

### Test Cases

| TC ID | Module | Summary | Priority | Automatable | Automation Type |
|-------|--------|---------|----------|-------------|-----------------|
| PP296-TC-001 | Wording Display | "จาก Poppa X คน" wording shown in participant count section | High | Yes | mobile-ui |
| PP296-TC-002 | Wording Display | Full format "ผู้เข้าร่วมทั้งหมด X คน จาก Poppa Y คน" rendered correctly | High | Yes | mobile-ui |
| PP296-TC-003 | Count Accuracy | Poppa count matches number of Poppa-registered participants (seeded data) | High | Yes | mobile-ui, api |
| PP296-TC-004 | Count Accuracy | Total count includes non-Poppa registrations; Poppa count is a subset | High | Yes | mobile-ui, api |
| PP296-TC-005 | Zero State | "จาก Poppa 0 คน" shown when no Poppa registrations (no error, no crash) | High | Yes | mobile-ui |
| PP296-TC-006 | Refresh | Count updates to new value after pull-to-refresh when new registration added | Medium | Partial | mobile-ui, api |
| PP296-TC-007 | API Contract | Participation Amount API response includes poppa_count and total_count fields | High | Yes | api |
| PP296-TC-008 | API Contract | API returns poppa_count = 0 gracefully for event with no Poppa registrations | High | Yes | api |

---

## [DRAFT] PP-296 sub 1 — [QA][test desing & review][Mobile tesing] Poppa participant count coverage

**Jira:** TBD · Sub-task of PP-296 parent · **Scope:** Design review all 8 TCs

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP296-TC-001–008 | Full design review — wording format, count accuracy, zero state, refresh, API | High |

---

## [DRAFT] PP-296 sub 2 — [QA][automate][Mobile (iOS) tesing] Poppa participant count automation

**Jira:** TBD · Sub-task of PP-296 parent · **Scope:** iOS automation

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP296-TC-001 | Wording | "จาก Poppa X คน" shown | High | Yes |
| PP296-TC-002 | Wording | Full format rendered | High | Yes |
| PP296-TC-003 | Count | Poppa count accurate | High | Yes |
| PP296-TC-004 | Count | Total includes non-Poppa | High | Yes |
| PP296-TC-005 | Zero State | 0 Poppa shows correctly | High | Yes |

---

## [DRAFT] PP-296 sub 3 — [QA][automate][Mobile (Android) tesing] Poppa participant count automation

**Jira:** TBD · Sub-task of PP-296 parent · **Scope:** Android automation (same TCs as iOS)

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP296-TC-001 | Wording | "จาก Poppa X คน" shown | High | Yes |
| PP296-TC-002 | Wording | Full format rendered | High | Yes |
| PP296-TC-003 | Count | Poppa count accurate | High | Yes |
| PP296-TC-004 | Count | Total includes non-Poppa | High | Yes |
| PP296-TC-005 | Zero State | 0 Poppa shows correctly | High | Yes |

---

## [DRAFT] PP-296 sub 4 — [QA][automate][API tesing] participation amount API automation

**Jira:** TBD · Sub-task of PP-296 parent · **Scope:** API contract

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP296-TC-007 | API | Participation Amount API response shape: poppa_count, total_count | High | api |
| PP296-TC-008 | API | poppa_count = 0 graceful response | High | api |

---

## [DRAFT] PP-296 sub 5 — [QA][Manual tesing][Mobile (iOS) tesing] participant count regression

**Jira:** TBD · Sub-task of PP-296 parent · **Scope:** iOS manual — count accuracy and refresh with real STG data

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP296-TC-001–008 | Full Poppa count verification on STG | High |

---

## [DRAFT] PP-296 sub 6 — [QA][Manual tesing][Mobile (Android) tesing] participant count regression

**Jira:** TBD · Sub-task of PP-296 parent · **Scope:** Android manual

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP296-TC-001–008 | Full Poppa count verification on STG | High |


---

---

## [DRAFT] PP-302 Parent — [QA] PP-302 Your Vibes Core Quiz

**Jira:** TBD · Type: Task (parent QA task)  
**Story:** PP-302 Your Vibes - Core Mindset Assessment the 70% Quiz  
**Design file:** *(draft from requirements — no `.design.md` yet)*  
**Platform:** Mobile (iOS / Android) · **Framework:** WebdriverIO + Appium  
**Total TCs:** 10  

### Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|--------|-----------|-----|------|------------|
| Quiz Display | EP + Checklist | PP302-TC-001–002 | High | 95% |
| Progress Bar | BVA | PP302-TC-003–004 | Medium | 90% |
| Back / Edit | State Transition | PP302-TC-005–006 | High | 95% |
| Next Guard | Decision Table | PP302-TC-007–008 | High | 97% |
| Submit + Navigate | State Transition | PP302-TC-009 | High | 95% |
| API Contract | Contract | PP302-TC-010 | High | 95% |
| **Total** | | **10** | | |

### Test Cases

| TC ID | Module | Summary | Priority | Automatable | Automation Type |
|-------|--------|---------|----------|-------------|-----------------|
| PP302-TC-001 | Quiz Display | Q1 shown on entry; only 1 question visible at a time | High | Yes | mobile-ui |
| PP302-TC-002 | Quiz Display | All 7 questions accessible in sequence with correct content | High | Yes | mobile-ui |
| PP302-TC-003 | Progress Bar | Progress bar shows ~14% (1/7) on Q1 | Medium | Yes | mobile-ui |
| PP302-TC-004 | Progress Bar | Progress bar shows 100% (7/7) on Q7 after answering | Medium | Yes | mobile-ui |
| PP302-TC-005 | Back / Edit | Back on Q2+ returns to previous question with saved answer | High | Yes | mobile-ui |
| PP302-TC-006 | Back / Edit | Answer can be changed after Back; new answer is retained | High | Yes | mobile-ui |
| PP302-TC-007 | Next Guard | Next disabled when no answer selected (cannot proceed) | High | Yes | mobile-ui |
| PP302-TC-008 | Next Guard | Next enabled after answer selected | High | Yes | mobile-ui |
| PP302-TC-009 | Submit | Answering Q7 and pressing Next submits all 7 and navigates to Results | High | Yes | mobile-ui, api |
| PP302-TC-010 | API Contract | POST /v1/vibes/quiz/submit with 7-answer array returns success response | High | Yes | api |

---

## [DRAFT] PP-302 sub 1 — [QA][test desing & review][Mobile tesing] quiz flow coverage

**Jira:** TBD · Sub-task of PP-302 parent · **Scope:** Design review all 10 TCs

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP302-TC-001–010 | Quiz display, progress bar, back/edit, next guard, submit, API | High |

---

## [DRAFT] PP-302 sub 2 — [QA][automate][Mobile (iOS) tesing] quiz flow automation

**Jira:** TBD · Sub-task of PP-302 parent · **Scope:** iOS automation

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP302-TC-001 | Quiz Display | Q1 only shown | High | Yes |
| PP302-TC-002 | Quiz Display | All 7 questions accessible | High | Yes |
| PP302-TC-003 | Progress Bar | ~14% on Q1 | Medium | Yes |
| PP302-TC-004 | Progress Bar | 100% on Q7 | Medium | Yes |
| PP302-TC-005 | Back / Edit | Returns to prev question with saved answer | High | Yes |
| PP302-TC-006 | Back / Edit | Answer changeable after Back | High | Yes |
| PP302-TC-007 | Next Guard | Next disabled without answer | High | Yes |
| PP302-TC-008 | Next Guard | Next enabled after selection | High | Yes |
| PP302-TC-009 | Submit | Submits and navigates to Results | High | Yes |

---

## [DRAFT] PP-302 sub 3 — [QA][automate][Mobile (Android) tesing] quiz flow automation

**Jira:** TBD · Sub-task of PP-302 parent · **Scope:** Android automation (same TCs as iOS)

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP302-TC-001 | Quiz Display | Q1 only shown | High | Yes |
| PP302-TC-002 | Quiz Display | All 7 accessible | High | Yes |
| PP302-TC-005 | Back / Edit | Saved answer retained | High | Yes |
| PP302-TC-007 | Next Guard | Next disabled | High | Yes |
| PP302-TC-008 | Next Guard | Next enabled | High | Yes |
| PP302-TC-009 | Submit | Submits and navigates | High | Yes |

---

## [DRAFT] PP-302 sub 4 — [QA][automate][API tesing] quiz submit contract automation

**Jira:** TBD · Sub-task of PP-302 parent · **Scope:** POST /v1/vibes/quiz/submit contract

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP302-TC-010 | API | POST /v1/vibes/quiz/submit — 7-answer array, success response | High | api |

---

## [DRAFT] PP-302 sub 5 — [QA][Manual tesing][Mobile (iOS) tesing] quiz flow regression

**Jira:** TBD · Sub-task of PP-302 parent · **Scope:** iOS manual

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP302-TC-001–010 | Full quiz flow manual verification on STG | High |

---

## [DRAFT] PP-302 sub 6 — [QA][Manual tesing][Mobile (Android) tesing] quiz flow regression

**Jira:** TBD · Sub-task of PP-302 parent · **Scope:** Android manual

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP302-TC-001–010 | Full quiz flow manual verification on STG | High |

---

## [DRAFT] PP-303 Parent — [QA] PP-303 Your Vibes Results

**Jira:** TBD · Type: Task (parent QA task)  
**Story:** PP-303 Your Vibes - Results  
**Design file:** *(draft from requirements — no `.design.md` yet)*  
**Platform:** Mobile (iOS / Android) · **Framework:** WebdriverIO + Appium  
**Total TCs:** 12  

### Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|--------|-----------|-----|------|------------|
| Animal Display | EP + Checklist | PP303-TC-001–002 | High | 95% |
| Description | Checklist | PP303-TC-003 | High | 90% |
| Radar Chart | EP + Checklist | PP303-TC-004–005 | High | 90% |
| Recommended Activities | EP | PP303-TC-006–007 | High | 95% |
| Share | State Transition | PP303-TC-008–009 | High | Manual only |
| Done Navigation | State Transition | PP303-TC-010 | High | 95% |
| API Contract | Contract | PP303-TC-011–012 | High | 95% |
| **Total** | | **12** | | |

### Test Cases

| TC ID | Module | Summary | Priority | Automatable | Automation Type |
|-------|--------|---------|----------|-------------|-----------------|
| PP303-TC-001 | Animal Display | Animal name and cartoon image shown on Results page | High | Yes | mobile-ui |
| PP303-TC-002 | Animal Display | Animal type matches quiz answers submitted (data binding) | High | Yes | mobile-ui, api |
| PP303-TC-003 | Description | Personality description text displayed in full without truncation | High | Yes | mobile-ui |
| PP303-TC-004 | Radar Chart | Activity Preference Map (4-axis radar chart) visible | High | Yes | mobile-ui |
| PP303-TC-005 | Radar Chart | Chart shows 4 axes: Energy, Social, Structure, Exploration with correct score values | High | Yes | mobile-ui, api |
| PP303-TC-006 | Activities | "คุณน่าจะชอบอะไร" section shows activities in 4 categories: Active, Wellness, Creative, Social | High | Yes | mobile-ui |
| PP303-TC-007 | Activities | Each category contains at least 1 recommended activity | Medium | Yes | mobile-ui |
| PP303-TC-008 | Share | Share button generates result image and opens device share sheet | High | No | — |
| PP303-TC-009 | Share | Share sheet shows Instagram and Facebook as sharing options | High | No | — |
| PP303-TC-010 | Done | Done button navigates to next flow without error | High | Yes | mobile-ui |
| PP303-TC-011 | API Contract | GET /v1/vibes/result returns: animal_type, animal_name, image_key, description, scores, recommended_activities | High | Yes | api |
| PP303-TC-012 | API Contract | All 4 score fields present and within 0–100 range | High | Yes | api |

---

## [DRAFT] PP-303 sub 1 — [QA][test desing & review][Mobile tesing] vibes results coverage

**Jira:** TBD · Sub-task of PP-303 parent · **Scope:** Design review all 12 TCs

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP303-TC-001–012 | Animal, description, radar chart, activities, share, done, API | High |

---

## [DRAFT] PP-303 sub 2 — [QA][automate][Mobile (iOS) tesing] vibes results automation

**Jira:** TBD · Sub-task of PP-303 parent · **Scope:** iOS automation (excl. TC-008, 009 — manual share only)

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP303-TC-001 | Animal | Name and image shown | High | Yes |
| PP303-TC-002 | Animal | Type matches quiz answers | High | Yes |
| PP303-TC-003 | Description | Full text shown | High | Yes |
| PP303-TC-004 | Radar Chart | Chart visible | High | Yes |
| PP303-TC-005 | Radar Chart | 4 axes with correct scores | High | Yes |
| PP303-TC-006 | Activities | 4 categories shown | High | Yes |
| PP303-TC-007 | Activities | Each category has ≥ 1 item | Medium | Yes |
| PP303-TC-010 | Done | Navigates to next flow | High | Yes |

---

## [DRAFT] PP-303 sub 3 — [QA][automate][Mobile (Android) tesing] vibes results automation

**Jira:** TBD · Sub-task of PP-303 parent · **Scope:** Android automation (same TCs as iOS)

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP303-TC-001 | Animal | Name and image shown | High | Yes |
| PP303-TC-002 | Animal | Type matches quiz answers | High | Yes |
| PP303-TC-004 | Radar Chart | Chart visible | High | Yes |
| PP303-TC-005 | Radar Chart | 4 axes with scores | High | Yes |
| PP303-TC-006 | Activities | 4 categories shown | High | Yes |
| PP303-TC-010 | Done | Navigates to next flow | High | Yes |

---

## [DRAFT] PP-303 sub 4 — [QA][automate][API tesing] vibes result contract automation

**Jira:** TBD · Sub-task of PP-303 parent · **Scope:** GET /v1/vibes/result contract

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP303-TC-011 | API | GET /v1/vibes/result — full response shape | High | api |
| PP303-TC-012 | API | All 4 scores in 0–100 range | High | api |

---

## [DRAFT] PP-303 sub 5 — [QA][Manual tesing][Mobile (iOS) tesing] vibes results regression

**Jira:** TBD · Sub-task of PP-303 parent · **Scope:** iOS manual — share sheet + visual fidelity

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP303-TC-008 | Share generates image and opens share sheet | High |
| PP303-TC-009 | Instagram + Facebook shown in share sheet | High |
| PP303-TC-001–007, 010 | Full results visual verification on STG | High |

---

## [DRAFT] PP-303 sub 6 — [QA][Manual tesing][Mobile (Android) tesing] vibes results regression

**Jira:** TBD · Sub-task of PP-303 parent · **Scope:** Android manual

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP303-TC-001–012 | Full results regression on STG | High |

---

## [DRAFT] PP-304 Parent — [QA] PP-304 Your Vibes Profile

**Jira:** TBD · Type: Task (parent QA task)  
**Story:** PP-304 Your Vibes - Profile  
**Design file:** *(draft from requirements — no `.design.md` yet)*  
**Platform:** Mobile (iOS / Android) · **Framework:** WebdriverIO + Appium  
**Total TCs:** 8  

### Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|--------|-----------|-----|------|------------|
| Vibe Section in Profile | EP + Decision Table | PP304-TC-001–002 | High | 95% |
| No Quiz State | BVA + Decision Table | PP304-TC-003–004 | High | 97% |
| Share from Profile | State Transition | PP304-TC-005–006 | High | Manual only |
| API Contract | Contract | PP304-TC-007–008 | High | 95% |
| **Total** | | **8** | | |

### Test Cases

| TC ID | Module | Summary | Priority | Automatable | Automation Type |
|-------|--------|---------|----------|-------------|-----------------|
| PP304-TC-001 | Vibe in Profile | Profile shows Vibe Result section with animal image when quiz completed | High | Yes | mobile-ui, api |
| PP304-TC-002 | Vibe in Profile | Animal name and type displayed clearly in profile vibe section | High | Yes | mobile-ui |
| PP304-TC-003 | No Quiz State | Vibe Result section absent in profile when vibe_result = null | High | Yes | mobile-ui, api |
| PP304-TC-004 | No Quiz State | Empty vibe state shows prompt / CTA to take quiz (not an error) | Medium | Yes | mobile-ui |
| PP304-TC-005 | Share | Share button generates result image and opens share sheet | High | No | — |
| PP304-TC-006 | Share | Share sheet shows Facebook and Instagram options | High | No | — |
| PP304-TC-007 | API Contract | GET /v1/users/{userId}/profile includes vibe_result { animal_type, scores } when quiz done | High | Yes | api |
| PP304-TC-008 | API Contract | vibe_result is null in profile response when user has not completed quiz | High | Yes | api |

---

## [DRAFT] PP-304 sub 1 — [QA][test desing & review][Mobile tesing] vibes profile coverage

**Jira:** TBD · Sub-task of PP-304 parent · **Scope:** Design review all 8 TCs

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP304-TC-001–008 | Vibe section, no-quiz state, share, API contract | High |

---

## [DRAFT] PP-304 sub 2 — [QA][automate][Mobile (iOS) tesing] vibes profile automation

**Jira:** TBD · Sub-task of PP-304 parent · **Scope:** iOS automation (excl. TC-005, 006 — share manual)

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP304-TC-001 | Vibe Section | Vibe section shown when quiz done | High | Yes |
| PP304-TC-002 | Vibe Section | Animal name and type shown | High | Yes |
| PP304-TC-003 | No Quiz | Section absent when no result | High | Yes |
| PP304-TC-004 | No Quiz | CTA prompt shown | Medium | Yes |

---

## [DRAFT] PP-304 sub 3 — [QA][automate][Mobile (Android) tesing] vibes profile automation

**Jira:** TBD · Sub-task of PP-304 parent · **Scope:** Android automation (same TCs as iOS)

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP304-TC-001 | Vibe Section | Vibe section shown when quiz done | High | Yes |
| PP304-TC-002 | Vibe Section | Animal name and type shown | High | Yes |
| PP304-TC-003 | No Quiz | Section absent when no result | High | Yes |
| PP304-TC-004 | No Quiz | CTA prompt shown | Medium | Yes |

---

## [DRAFT] PP-304 sub 4 — [QA][automate][API tesing] profile vibe result contract automation

**Jira:** TBD · Sub-task of PP-304 parent · **Scope:** GET /v1/users/{userId}/profile contract

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP304-TC-007 | API | Profile includes vibe_result when quiz done | High | api |
| PP304-TC-008 | API | vibe_result = null when quiz not done | High | api |

---

## [DRAFT] PP-304 sub 5 — [QA][Manual tesing][Mobile (iOS) tesing] vibes profile regression

**Jira:** TBD · Sub-task of PP-304 parent · **Scope:** iOS manual — share + full profile verify

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP304-TC-005 | Share generates image and opens share sheet | High |
| PP304-TC-006 | FB + IG in share sheet | High |
| PP304-TC-001–004 | Full vibe section profile verify on STG | High |

---

## [DRAFT] PP-304 sub 6 — [QA][Manual tesing][Mobile (Android) tesing] vibes profile regression

**Jira:** TBD · Sub-task of PP-304 parent · **Scope:** Android manual

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP304-TC-001–008 | Full vibes profile regression on STG | High |


---

---

## [DRAFT] PP-318 Parent — [QA] PP-318 Your Vibes BO Management

**Jira:** TBD · Type: Task (parent QA task)  
**Story:** PP-318 Your Vibes - [BO] User Vibe Management  
**Design file:** *(draft from requirements — no `.design.md` yet)*  
**Platform:** Web (Desktop, Chrome / Safari, 1280px+) · **Framework:** Playwright  
**Total TCs:** 14  

### Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|--------|-----------|-----|------|------------|
| User List & Columns | EP + Checklist | PP318-TC-001–003 | High | 95% |
| Filter by Animal Type | State Transition | PP318-TC-004–005 | High | 95% |
| Filter by Score Range | EP + BVA | PP318-TC-006 | High | 90% |
| Search | EP | PP318-TC-007–008 | High | 95% |
| Side Panel | Checklist | PP318-TC-009–011 | High | 90% |
| Export | Checklist | PP318-TC-012 | High | Manual only |
| Dashboard | Checklist | PP318-TC-013 | High | 90% |
| RBAC | Decision Table | PP318-TC-014 | High | 97% |
| **Total** | | **14** | | |

### Test Cases

| TC ID | Module | Summary | Priority | Automatable | Automation Type |
|-------|--------|---------|----------|-------------|-----------------|
| PP318-TC-001 | User List | User list loads with all required columns: User ID, Display Name, Sex, Animal Type, Last Active, Date Joined | High | Yes | web-ui |
| PP318-TC-002 | User List | Users without quiz show "Not Tested" badge in Animal Type column | High | Yes | web-ui, api |
| PP318-TC-003 | User List | Pagination loads next page within 2 seconds | High | Yes | web-ui |
| PP318-TC-004 | Filter — Animal | Filter by Animal Type shows only matching users | High | Yes | web-ui |
| PP318-TC-005 | Filter — Animal | Clearing Animal Type filter restores full list | Medium | Yes | web-ui |
| PP318-TC-006 | Filter — Score | Score range filter for Energy dimension returns only users in range | High | Yes | web-ui |
| PP318-TC-007 | Search | Search by username returns matching users | High | Yes | web-ui |
| PP318-TC-008 | Search | Search with no match shows empty state | Medium | Yes | web-ui |
| PP318-TC-009 | Side Panel | Clicking a user opens side panel with personality summary | High | Yes | web-ui |
| PP318-TC-010 | Side Panel | Side panel shows Score Meter Chart with 4 dimension values | High | Yes | web-ui, api |
| PP318-TC-011 | Side Panel | Side panel shows "คุณน่าจะชอบอะไร" activity list | Medium | Yes | web-ui |
| PP318-TC-012 | Export | Export to CSV/Excel downloads file with correct data columns | High | No | — |
| PP318-TC-013 | Dashboard | Summary Dashboard shows Total User count and Animal Distribution chart | High | Yes | web-ui |
| PP318-TC-014 | RBAC | Non-admin user cannot access User Vibe Management page | High | Yes | web-ui, api |

---

## [DRAFT] PP-318 sub 1 — [QA][test desing & review][Web UI testing] admin vibe management coverage

**Jira:** TBD · Sub-task of PP-318 parent · **Scope:** Design review all 14 TCs

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP318-TC-001–014 | User list, filters, search, side panel, export, dashboard, RBAC | High |

---

## [DRAFT] PP-318 sub 2 — [QA][automate][Web UI testing] user vibe list and filters automation

**Jira:** TBD · Sub-task of PP-318 parent · **Scope:** User list, filters, search — Web UI automation

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP318-TC-001 | User List | All columns visible | High | Yes |
| PP318-TC-002 | User List | "Not Tested" badge | High | Yes |
| PP318-TC-003 | User List | Pagination ≤ 2s | High | Yes |
| PP318-TC-004 | Filter | Animal type filter works | High | Yes |
| PP318-TC-005 | Filter | Clear filter restores list | Medium | Yes |
| PP318-TC-006 | Filter | Score range filter works | High | Yes |
| PP318-TC-007 | Search | Username search works | High | Yes |
| PP318-TC-008 | Search | Empty search result state | Medium | Yes |

---

## [DRAFT] PP-318 sub 3 — [QA][automate][Web UI testing] side panel and dashboard automation

**Jira:** TBD · Sub-task of PP-318 parent · **Scope:** Side panel + dashboard Web UI automation

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP318-TC-009 | Side Panel | Opens on user click | High | Yes |
| PP318-TC-010 | Side Panel | Score Meter Chart 4 dimensions | High | Yes |
| PP318-TC-011 | Side Panel | Activity list shown | Medium | Yes |
| PP318-TC-013 | Dashboard | Total User count + Animal Distribution | High | Yes |
| PP318-TC-014 | RBAC | Non-admin blocked | High | Yes |

---

## [DRAFT] PP-318 sub 4 — [QA][automate][API tesing] admin vibe list data assertions

**Jira:** TBD · Sub-task of PP-318 parent · **Scope:** API assertions — list and filter accuracy

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP318-TC-002 | User List | "Not Tested" badge — API returns null vibe_result | High | api |
| PP318-TC-010 | Side Panel | Score values from API match displayed meter | High | api |
| PP318-TC-014 | RBAC | Non-admin authorization enforcement contract | High | api |

---

## [DRAFT] PP-318 sub 5 — [QA][Manual tesing][Web UI testing] admin vibe management regression

**Jira:** TBD · Sub-task of PP-318 parent · **Scope:** Manual — export + live data accuracy + pagination timing

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP318-TC-012 | Export CSV/Excel with real data | High |
| PP318-TC-003 | Pagination load time ≤ 2s on STG | High |
| PP318-TC-001–014 | Full admin vibe management regression | High |

---

## [DRAFT] PP-492 Parent — [QA] PP-492 Edit Running Event

**Jira:** TBD · Type: Task (parent QA task)  
**Story:** PP-492 Edit Running Event  
**Design file:** *(draft from requirements — no `.design.md` yet)*  
**Platform:** Web (Desktop, Chrome / Safari, 1280px+) · **Framework:** Playwright  
**Total TCs:** 10  

### Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|--------|-----------|-----|------|------------|
| Edit Published — UI | EP + Checklist | PP492-TC-001–002 | High | 95% |
| Edit Published — Save + API | State Transition | PP492-TC-003–004 | High | 95% |
| Edit Draft — UI | EP + Checklist | PP492-TC-005–006 | High | 95% |
| Edit Draft — Save + API | State Transition | PP492-TC-007–008 | High | 95% |
| API — Published | Contract | PP492-TC-009 | High | 95% |
| API — Draft | Contract | PP492-TC-010 | High | 95% |
| **Total** | | **10** | | |

### Test Cases

| TC ID | Module | Summary | Priority | Automatable | Automation Type |
|-------|--------|---------|----------|-------------|-----------------|
| PP492-TC-001 | Edit Published — UI | Edit button on Published Event opens form pre-filled with current data | High | Yes | web-ui |
| PP492-TC-002 | Edit Published — UI | Edit form allows modification of all permitted fields | High | Yes | web-ui |
| PP492-TC-003 | Edit Published — Save | Saving changes calls API and updates published event data | High | Yes | web-ui, api |
| PP492-TC-004 | Edit Published — Validation | Clearing required field → Save shows validation error; data not saved | High | Yes | web-ui |
| PP492-TC-005 | Edit Draft — UI | Edit Draft button on Draft Event opens form with draft data pre-filled | High | Yes | web-ui |
| PP492-TC-006 | Edit Draft — UI | Draft edit form allows modification of all fields | High | Yes | web-ui |
| PP492-TC-007 | Edit Draft — Save | Saving Draft calls API and persists draft update | High | Yes | web-ui, api |
| PP492-TC-008 | Edit Draft — Validation | Clearing required field in Draft → validation error; draft not saved | High | Yes | web-ui |
| PP492-TC-009 | API — Published | Edit Published Event API accepts field changes and returns updated event | High | Yes | api |
| PP492-TC-010 | API — Draft | Edit Draft Event API accepts changes and returns updated draft | High | Yes | api |

---

## [DRAFT] PP-492 sub 1 — [QA][test desing & review][Web UI testing] edit event coverage

**Jira:** TBD · Sub-task of PP-492 parent · **Scope:** Design review all 10 TCs

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP492-TC-001–010 | Edit published flow, edit draft flow, validation, API | High |

---

## [DRAFT] PP-492 sub 2 — [QA][automate][Web UI testing] edit event flow automation

**Jira:** TBD · Sub-task of PP-492 parent · **Scope:** Web UI automation — both published and draft flows

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP492-TC-001 | Published UI | Form pre-filled on open | High | Yes |
| PP492-TC-002 | Published UI | Field modification allowed | High | Yes |
| PP492-TC-003 | Published Save | API called on save | High | Yes |
| PP492-TC-004 | Published Validation | Required field error shown | High | Yes |
| PP492-TC-005 | Draft UI | Draft form pre-filled | High | Yes |
| PP492-TC-006 | Draft UI | All fields modifiable | High | Yes |
| PP492-TC-007 | Draft Save | API called on save | High | Yes |
| PP492-TC-008 | Draft Validation | Required field error shown | High | Yes |

---

## [DRAFT] PP-492 sub 3 — [QA][automate][API tesing] edit event API assertions

**Jira:** TBD · Sub-task of PP-492 parent · **Scope:** Edit Published + Edit Draft API contract

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP492-TC-009 | API — Published | Edit Published API — accepts changes, returns updated event | High | api |
| PP492-TC-010 | API — Draft | Edit Draft API — accepts changes, returns updated draft | High | api |

---

## [DRAFT] PP-492 sub 4 — [QA][Manual tesing][Web UI testing] edit event regression

**Jira:** TBD · Sub-task of PP-492 parent · **Scope:** Manual — published vs draft behavior, field-level edge cases

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP492-TC-001–010 | Full edit event regression on STG with real organizer accounts | High |


---

---

## [DRAFT] PP-342 Parent — [QA] PP-342 Story Poppa

**Jira:** TBD · Type: Task (parent QA task)  
**Story:** PP-342 Story Poppa (สตอรี่หน้าหลัก)  
**Design file:** *(draft from requirements — no `.design.md` yet)*  
**Platform:** Mobile (iOS / Android) · **Framework:** WebdriverIO + Appium  
**Total TCs:** 12  

### Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|--------|-----------|-----|------|------------|
| Story Creation | EP + State Transition | PP342-TC-001–003 | High | 90% |
| Story Viewing | State Transition | PP342-TC-004–005 | High | 90% |
| No Friends State | Decision Table | PP342-TC-006–007 | High | 95% |
| Story Expiry (24h) | BVA | PP342-TC-008 | High | Manual only |
| Story Archive | State Transition | PP342-TC-009–010 | High | 90% |
| API Contract | Contract | PP342-TC-011–012 | High | 95% |
| **Total** | | **12** | | |

### Test Cases

| TC ID | Module | Summary | Priority | Automatable | Automation Type |
|-------|--------|---------|----------|-------------|-----------------|
| PP342-TC-001 | Story Creation | Create → Story → Story Creation page opens with media upload UI | High | Yes | mobile-ui |
| PP342-TC-002 | Story Creation | Image media can be selected and uploaded to create a story | High | Partial | mobile-ui |
| PP342-TC-003 | Story Creation | Created story appears in user's own stories | High | Yes | mobile-ui, api |
| PP342-TC-004 | Story Viewing | Friends' stories appear in home feed in chronological order | High | Yes | mobile-ui |
| PP342-TC-005 | Story Viewing | Tapping a friend's story plays/displays it full-screen | High | Yes | mobile-ui |
| PP342-TC-006 | No Friends State | Follow Friend placeholder shown when user has 0 friends | High | Yes | mobile-ui |
| PP342-TC-007 | No Friends State | Follow Friend placeholder disappears after adding first friend | Medium | Partial | mobile-ui |
| PP342-TC-008 | Story Expiry | Story removed from home feed 24 hours after creation | High | No | — |
| PP342-TC-009 | Story Archive | Expired stories accessible from Story Archive | High | Yes | mobile-ui |
| PP342-TC-010 | Story Archive | Archive shows stories in reverse chronological order | Medium | Yes | mobile-ui |
| PP342-TC-011 | API Contract | Create Story API returns story_id and creation timestamp | High | Yes | api |
| PP342-TC-012 | API Contract | Get Story by ID response includes expiry_at = creation + 24h | High | Yes | api |

---

## [DRAFT] PP-342 sub 1 — [QA][test desing & review][Mobile tesing] story creation and lifecycle coverage

**Jira:** TBD · Sub-task of PP-342 parent · **Scope:** Design review all 12 TCs

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP342-TC-001–012 | Story creation, viewing, no-friends, expiry, archive, API | High |

---

## [DRAFT] PP-342 sub 2 — [QA][automate][Mobile (iOS) tesing] story creation and viewing automation

**Jira:** TBD · Sub-task of PP-342 parent · **Scope:** iOS automation (excl. TC-008 — 24h expiry manual)

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP342-TC-001 | Creation | Creation page opens | High | Yes |
| PP342-TC-003 | Creation | Story in own stories | High | Yes |
| PP342-TC-004 | Viewing | Friends' stories in feed | High | Yes |
| PP342-TC-005 | Viewing | Story plays on tap | High | Yes |
| PP342-TC-006 | No Friends | Follow Friend shown | High | Yes |
| PP342-TC-009 | Archive | Archive accessible | High | Yes |
| PP342-TC-010 | Archive | Reverse chronological | Medium | Yes |

---

## [DRAFT] PP-342 sub 3 — [QA][automate][Mobile (Android) tesing] story creation and viewing automation

**Jira:** TBD · Sub-task of PP-342 parent · **Scope:** Android automation (same TCs as iOS)

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP342-TC-001 | Creation | Creation page opens | High | Yes |
| PP342-TC-003 | Creation | Story in own stories | High | Yes |
| PP342-TC-004 | Viewing | Friends' stories in feed | High | Yes |
| PP342-TC-006 | No Friends | Follow Friend shown | High | Yes |
| PP342-TC-009 | Archive | Archive accessible | High | Yes |

---

## [DRAFT] PP-342 sub 4 — [QA][automate][API tesing] story API contract automation

**Jira:** TBD · Sub-task of PP-342 parent · **Scope:** Create Story + Get Story API contracts

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP342-TC-011 | API | Create Story — story_id and timestamp returned | High | api |
| PP342-TC-012 | API | Get Story by ID — expiry_at = created_at + 24h | High | api |

---

## [DRAFT] PP-342 sub 5 — [QA][Manual tesing][Mobile (iOS) tesing] story lifecycle regression

**Jira:** TBD · Sub-task of PP-342 parent · **Scope:** iOS manual — 24h expiry + full story lifecycle

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP342-TC-008 | Story absent from feed 24h after creation (timer) | High |
| PP342-TC-002 | Media selection and upload | High |
| PP342-TC-001–012 | Full story lifecycle regression on STG | High |

---

## [DRAFT] PP-342 sub 6 — [QA][Manual tesing][Mobile (Android) tesing] story lifecycle regression

**Jira:** TBD · Sub-task of PP-342 parent · **Scope:** Android manual

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP342-TC-001–012 | Full story lifecycle regression on STG | High |

---

## [DRAFT] PP-449 Parent — [QA] PP-449 Post Poppa

**Jira:** TBD · Type: Task (parent QA task)  
**Story:** PP-449 Post Poppa (สร้างและแชร์โพสต์)  
**Design file:** *(draft from requirements — no `.design.md` yet)*  
**Platform:** Mobile (iOS / Android) · **Framework:** WebdriverIO + Appium  
**Total TCs:** 14  

### Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|--------|-----------|-----|------|------------|
| Gallery Picker | EP | PP449-TC-001 | High | 90% |
| Camera Capture | EP | PP449-TC-002 | High | Manual/Partial |
| Media Edit | EP + Checklist | PP449-TC-003–004 | High | 90% |
| Video Trim | BVA | PP449-TC-005–006 | High | 90% |
| Caption & Mention | EP + State Transition | PP449-TC-007–009 | High | 90% |
| Resume Draft | State Transition | PP449-TC-010–011 | High | 95% |
| Submit | State Transition | PP449-TC-012–013 | High | 90% |
| API Contract | Contract | PP449-TC-014 | High | 95% |
| **Total** | | **14** | | |

### Test Cases

| TC ID | Module | Summary | Priority | Automatable | Automation Type |
|-------|--------|---------|----------|-------------|-----------------|
| PP449-TC-001 | Gallery Picker | Create Post → Gallery Picker shows device gallery images and videos | High | Yes | mobile-ui |
| PP449-TC-002 | Camera Capture | Create Post → Camera option opens camera for photo/video capture | High | Partial | mobile-ui |
| PP449-TC-003 | Media Edit — Crop | Crop and Aspect Ratio tool modifies media as expected | High | Yes | mobile-ui |
| PP449-TC-004 | Media Edit — Zoom | Zoom and Resize tool modifies media dimensions | Medium | Yes | mobile-ui |
| PP449-TC-005 | Video Trim | Short video trim restricts clip to ≤ 15 seconds (BVA) | High | Yes | mobile-ui |
| PP449-TC-006 | Video Trim | Long video trim allows selection of any duration segment | Medium | Yes | mobile-ui |
| PP449-TC-007 | Caption | Caption input accepts text including Thai characters | High | Yes | mobile-ui |
| PP449-TC-008 | Caption — Mention | Typing "@" shows mention typeahead suggestions | High | Yes | mobile-ui |
| PP449-TC-009 | Caption — Mention | Selecting mention inserts correct @username into caption | High | Yes | mobile-ui |
| PP449-TC-010 | Resume Draft | Leaving Create Post mid-flow then returning shows Resume Draft dialog | High | Yes | mobile-ui |
| PP449-TC-011 | Resume Draft | Choosing Resume restores previous media selection and caption | High | Yes | mobile-ui |
| PP449-TC-012 | Submit | Submitting shows Loading state during upload | High | Yes | mobile-ui |
| PP449-TC-013 | Submit | Successful submit shows Success state; post appears in feed | High | Yes | mobile-ui, api |
| PP449-TC-014 | API Contract | Create Post API accepts media_url, caption, mentions[]; returns post_id | High | Yes | api |

---

## [DRAFT] PP-449 sub 1 — [QA][test desing & review][Mobile tesing] post creation and media coverage

**Jira:** TBD · Sub-task of PP-449 parent · **Scope:** Design review all 14 TCs

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP449-TC-001–014 | Gallery, camera, crop, zoom, trim, caption, mention, draft, submit, API | High |

---

## [DRAFT] PP-449 sub 2 — [QA][automate][Mobile (iOS) tesing] post creation automation

**Jira:** TBD · Sub-task of PP-449 parent · **Scope:** iOS automation (excl. TC-002 partial — camera)

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP449-TC-001 | Gallery | Gallery picker opens | High | Yes |
| PP449-TC-003 | Crop | Crop tool works | High | Yes |
| PP449-TC-004 | Zoom | Zoom tool works | Medium | Yes |
| PP449-TC-005 | Video Trim | Short ≤ 15s enforced | High | Yes |
| PP449-TC-007 | Caption | Text input works | High | Yes |
| PP449-TC-008 | Mention | @-typeahead shown | High | Yes |
| PP449-TC-009 | Mention | Correct username inserted | High | Yes |
| PP449-TC-010 | Draft | Resume dialog shown | High | Yes |
| PP449-TC-011 | Draft | Restores media + caption | High | Yes |
| PP449-TC-012 | Submit | Loading state shown | High | Yes |
| PP449-TC-013 | Submit | Success + post in feed | High | Yes |

---

## [DRAFT] PP-449 sub 3 — [QA][automate][Mobile (Android) tesing] post creation automation

**Jira:** TBD · Sub-task of PP-449 parent · **Scope:** Android automation (same key TCs as iOS)

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP449-TC-001 | Gallery | Gallery picker opens | High | Yes |
| PP449-TC-005 | Video Trim | Short ≤ 15s enforced | High | Yes |
| PP449-TC-007 | Caption | Text input works | High | Yes |
| PP449-TC-008 | Mention | @-typeahead shown | High | Yes |
| PP449-TC-010 | Draft | Resume dialog shown | High | Yes |
| PP449-TC-013 | Submit | Success + post in feed | High | Yes |

---

## [DRAFT] PP-449 sub 4 — [QA][automate][API tesing] create post contract automation

**Jira:** TBD · Sub-task of PP-449 parent · **Scope:** Create Post API contract

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP449-TC-014 | API | Create Post API — media_url, caption, mentions[]; post_id returned | High | api |

---

## [DRAFT] PP-449 sub 5 — [QA][Manual tesing][Mobile (iOS) tesing] post creation regression

**Jira:** TBD · Sub-task of PP-449 parent · **Scope:** iOS manual — camera, video trim precision, feed visibility

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP449-TC-002 | Camera capture opens | High |
| PP449-TC-006 | Long video trim segment | Medium |
| PP449-TC-001–014 | Full post creation regression on STG | High |

---

## [DRAFT] PP-449 sub 6 — [QA][Manual tesing][Mobile (Android) tesing] post creation regression

**Jira:** TBD · Sub-task of PP-449 parent · **Scope:** Android manual

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP449-TC-001–014 | Full post creation regression on STG | High |

---

## [DRAFT] PP-451 Parent — [QA] PP-451 Feeds Poppa

**Jira:** TBD · Type: Task (parent QA task)  
**Story:** PP-451 Feeds Poppa (หน้าฟีดหลัก)  
**Design file:** *(draft from requirements — no `.design.md` yet)*  
**Platform:** Mobile (iOS / Android) · **Framework:** WebdriverIO + Appium  
**Total TCs:** 10  

### Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|--------|-----------|-----|------|------------|
| Feed Display | EP + State Transition | PP451-TC-001–003 | High | 90% |
| Feed API | Contract | PP451-TC-004 | High | 95% |
| Post Detail | EP + Checklist | PP451-TC-005 | High | 90% |
| Post Detail API | Contract | PP451-TC-006 | High | 95% |
| Report — UI | State Transition | PP451-TC-007–008 | Medium | 90% |
| Report — API | Contract | PP451-TC-009–010 | High | 95% |
| **Total** | | **10** | | |

### Test Cases

| TC ID | Module | Summary | Priority | Automatable | Automation Type |
|-------|--------|---------|----------|-------------|-----------------|
| PP451-TC-001 | Feed Display | Feed shows posts from followed users in newest-first chronological order | High | Yes | mobile-ui |
| PP451-TC-002 | Feed Display | Feed loads more posts on scroll (infinite scroll / pagination) | Medium | Yes | mobile-ui |
| PP451-TC-003 | Feed Display | Empty feed state shown when user follows no one with posts | Medium | Yes | mobile-ui |
| PP451-TC-004 | Feed API | Feed API returns post list with media, caption, like_count, comment_count | High | Yes | api |
| PP451-TC-005 | Post Detail | Tapping post opens Post Detail with caption, media, likes, comments | High | Yes | mobile-ui |
| PP451-TC-006 | Post Detail API | Post Detail API returns full data: caption, media_url, like_count, comments | High | Yes | api |
| PP451-TC-007 | Report — UI | Three-dot menu on post shows Report option | Medium | Yes | mobile-ui |
| PP451-TC-008 | Report — UI | Tapping Report opens dialog with reason selection options | High | Yes | mobile-ui |
| PP451-TC-009 | Report — API | Submitting report with reason calls API and shows success confirmation | High | Yes | mobile-ui, api |
| PP451-TC-010 | Report — API | Report API accepts post_id and reason; returns 200 OK | High | Yes | api |

---

## [DRAFT] PP-451 sub 1 — [QA][test desing & review][Mobile tesing] feeds and post detail coverage

**Jira:** TBD · Sub-task of PP-451 parent · **Scope:** Design review all 10 TCs

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP451-TC-001–010 | Chronological feed, post detail, report UI and API | High |

---

## [DRAFT] PP-451 sub 2 — [QA][automate][Mobile (iOS) tesing] feeds automation

**Jira:** TBD · Sub-task of PP-451 parent · **Scope:** iOS automation

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP451-TC-001 | Feed | Chronological order | High | Yes |
| PP451-TC-002 | Feed | Pagination on scroll | Medium | Yes |
| PP451-TC-003 | Feed | Empty state | Medium | Yes |
| PP451-TC-005 | Post Detail | Opens on tap | High | Yes |
| PP451-TC-007 | Report | 3-dot menu shows Report | Medium | Yes |
| PP451-TC-008 | Report | Dialog with reasons | High | Yes |
| PP451-TC-009 | Report | Submit shows confirmation | High | Yes |

---

## [DRAFT] PP-451 sub 3 — [QA][automate][Mobile (Android) tesing] feeds automation

**Jira:** TBD · Sub-task of PP-451 parent · **Scope:** Android automation

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP451-TC-001 | Feed | Chronological order | High | Yes |
| PP451-TC-002 | Feed | Pagination on scroll | Medium | Yes |
| PP451-TC-005 | Post Detail | Opens on tap | High | Yes |
| PP451-TC-008 | Report | Dialog with reasons | High | Yes |
| PP451-TC-009 | Report | Submit shows confirmation | High | Yes |

---

## [DRAFT] PP-451 sub 4 — [QA][automate][API tesing] feeds and post API contract automation

**Jira:** TBD · Sub-task of PP-451 parent · **Scope:** Feed API + Post Detail API + Report API

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP451-TC-004 | Feed API | Feed list response shape | High | api |
| PP451-TC-006 | Post Detail API | Full post detail response shape | High | api |
| PP451-TC-010 | Report API | Report API — post_id + reason → 200 OK | High | api |

---

## [DRAFT] PP-451 sub 5 — [QA][Manual tesing][Mobile (iOS) tesing] feeds regression

**Jira:** TBD · Sub-task of PP-451 parent · **Scope:** iOS manual — chronological ordering with real following data

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP451-TC-001–010 | Full feeds regression on STG with real following + posts | High |

---

## [DRAFT] PP-451 sub 6 — [QA][Manual tesing][Mobile (Android) tesing] feeds regression

**Jira:** TBD · Sub-task of PP-451 parent · **Scope:** Android manual

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP451-TC-001–010 | Full feeds regression on STG | High |


---

---

## [DRAFT] PP-317 Parent — [QA] PP-317 Your Vibes Scoring Engine

**Jira:** TBD · Type: Task (parent QA task)  
**Story:** PP-317 Your Vibes - Vibe Scoring Engine  
**Design file:** *(draft from requirements — no `.design.md` yet)*  
**Platform:** Backend (API / Unit) · **Framework:** API assertions + unit tests  
**Total TCs:** 8  

### Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|--------|-----------|-----|------|------------|
| Scoring Formula | EP + BVA | PP317-TC-001–004 | High | 97% |
| Input Validation | BVA + EP | PP317-TC-005–006 | High | 97% |
| Animal Type Mapping | Decision Table | PP317-TC-007 | High | 95% |
| Profile Persistence | State Transition | PP317-TC-008 | High | 95% |
| **Total** | | **8** | | |

### Test Cases

| TC ID | Module | Summary | Priority | Automatable | Automation Type |
|-------|--------|---------|----------|-------------|-----------------|
| PP317-TC-001 | Scoring Formula | Valid 7-answer input (int 1-5 each) produces 4 dimension scores in range 0–100 | High | Yes | api |
| PP317-TC-002 | Scoring — BVA Max | All answers = 5 → all 4 dimension scores = 100 | High | Yes | api |
| PP317-TC-003 | Scoring — BVA Min | All answers = 1 → all 4 dimension scores = 20 | High | Yes | api |
| PP317-TC-004 | Scoring Formula | Mixed answers produce expected normalized scores (raw × 0.7, normalized 0–100) | High | Yes | api |
| PP317-TC-005 | Validation | Submit with fewer than 7 answers → validation error | High | Yes | api |
| PP317-TC-006 | Validation | Submit with answer value outside 1–5 range → validation error | High | Yes | api |
| PP317-TC-007 | Animal Mapping | Known score combinations map to expected animal type from preset lookup table | High | Yes | api |
| PP317-TC-008 | Profile Persistence | vibe_result { animal_type, scores, completed_at } upserted to user profile after submit | High | Yes | api |

---

## [DRAFT] PP-317 sub 1 — [QA][test desing & review][API tesing] scoring engine coverage

**Jira:** TBD · Sub-task of PP-317 parent · **Scope:** Design review all 8 TCs

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP317-TC-001–008 | Formula, BVA boundaries, validation, animal mapping, profile persistence | High |

---

## [DRAFT] PP-317 sub 2 — [QA][automate][API tesing] scoring formula and animal mapping automation

**Jira:** TBD · Sub-task of PP-317 parent · **Scope:** All 8 TCs — API/unit automation

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP317-TC-001 | Formula | Valid 7-answer → scores 0–100 | High | api |
| PP317-TC-002 | Formula BVA | All-5 → 100 | High | api |
| PP317-TC-003 | Formula BVA | All-1 → 20 | High | api |
| PP317-TC-004 | Formula | Mixed answers normalized correctly | High | api |
| PP317-TC-005 | Validation | < 7 answers → error | High | api |
| PP317-TC-006 | Validation | Answer outside 1–5 → error | High | api |
| PP317-TC-007 | Animal Mapping | Score combo → correct animal type | High | api |
| PP317-TC-008 | Persistence | vibe_result upserted to profile | High | api |

---

## [DRAFT] PP-317 sub 3 — [QA][Manual tesing][API tesing] scoring engine boundary verification

**Jira:** TBD · Sub-task of PP-317 parent · **Scope:** Manual spot-check on STG

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP317-TC-002 | All-5 answers → 100 on STG | High |
| PP317-TC-003 | All-1 answers → 20 on STG | High |
| PP317-TC-007 | Spot-check 3+ known score combos → correct animal | High |

---

## [DRAFT] PP-226 Parent — [QA] PP-226 Event Detail Organizer Information

**Jira:** TBD · Type: Task (parent QA task)  
**Story:** PP-226 Event Detail - Organizer Information  
**Design file:** *(draft from requirements — no `.design.md` yet)*  
**Platform:** Mobile (iOS / Android) · **Framework:** WebdriverIO + Appium  
**Total TCs:** 8  

### Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|--------|-----------|-----|------|------------|
| Host + Org Display | EP + Checklist | PP226-TC-001 | High | 90% |
| Same Entity | Decision Table | PP226-TC-002 | High | 90% |
| Hybrid Display | Decision Table | PP226-TC-003 | High | 90% |
| Brand Mode | Decision Table | PP226-TC-004 | Medium | 90% |
| Agency Mode | Decision Table | PP226-TC-005 | Medium | 90% |
| No Snapshot | BVA | PP226-TC-006 | High | 95% |
| API Contract | Contract | PP226-TC-007–008 | High | 95% |
| **Total** | | **8** | | |

### Test Cases

| TC ID | Module | Summary | Priority | Automatable | Automation Type |
|-------|--------|---------|----------|-------------|-----------------|
| PP226-TC-001 | Host + Org Display | Event Detail shows both "เจ้าภาพ" and "ผู้จัดงาน" sections | High | Yes | mobile-ui |
| PP226-TC-002 | Same Entity | When Host = Organizer, display is consolidated without duplicating the name | High | Yes | mobile-ui, api |
| PP226-TC-003 | Hybrid Display | When Host ≠ Organizer, both names shown separately | High | Yes | mobile-ui, api |
| PP226-TC-004 | Brand Mode | Only Host data present → Host name displayed prominently | Medium | Yes | mobile-ui |
| PP226-TC-005 | Agency Mode | Only Organizer data present → Organizer name displayed | Medium | Yes | mobile-ui |
| PP226-TC-006 | No Snapshot | Missing Host or Organizer shows placeholder "-" (no error) | High | Yes | mobile-ui |
| PP226-TC-007 | API Contract | Event Detail API includes host_snapshot and organizer_snapshot fields | High | Yes | api |
| PP226-TC-008 | API Contract | Null host_snapshot or organizer_snapshot handled gracefully (no 500) | High | Yes | api |

---

## [DRAFT] PP-226 sub 1 — [QA][test desing & review][Mobile tesing] organizer info display coverage

**Jira:** TBD · Sub-task of PP-226 parent · **Scope:** Design review all 8 TCs

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP226-TC-001–008 | Host+org display, same entity, hybrid, modes, placeholder, API | High |

---

## [DRAFT] PP-226 sub 2 — [QA][automate][Mobile (iOS) tesing] organizer info display automation

**Jira:** TBD · Sub-task of PP-226 parent · **Scope:** iOS automation

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP226-TC-001 | Display | Both sections shown | High | Yes |
| PP226-TC-002 | Same Entity | No duplication | High | Yes |
| PP226-TC-003 | Hybrid | Both names separate | High | Yes |
| PP226-TC-006 | No Snapshot | Placeholder shown | High | Yes |

---

## [DRAFT] PP-226 sub 3 — [QA][automate][Mobile (Android) tesing] organizer info display automation

**Jira:** TBD · Sub-task of PP-226 parent · **Scope:** Android automation (same TCs as iOS)

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP226-TC-001 | Display | Both sections shown | High | Yes |
| PP226-TC-002 | Same Entity | No duplication | High | Yes |
| PP226-TC-003 | Hybrid | Both names separate | High | Yes |
| PP226-TC-006 | No Snapshot | Placeholder shown | High | Yes |

---

## [DRAFT] PP-226 sub 4 — [QA][automate][API tesing] organizer info snapshot contract automation

**Jira:** TBD · Sub-task of PP-226 parent · **Scope:** host_snapshot + organizer_snapshot contract

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP226-TC-007 | API | host_snapshot and organizer_snapshot present in response | High | api |
| PP226-TC-008 | API | Null snapshot handled gracefully | High | api |

---

## [DRAFT] PP-226 sub 5 — [QA][Manual tesing][Mobile (iOS) tesing] organizer info regression

**Jira:** TBD · Sub-task of PP-226 parent · **Scope:** iOS manual — all 3 display modes with real event data

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP226-TC-001–008 | Full organizer info regression on STG | High |

---

## [DRAFT] PP-226 sub 6 — [QA][Manual tesing][Mobile (Android) tesing] organizer info regression

**Jira:** TBD · Sub-task of PP-226 parent · **Scope:** Android manual

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP226-TC-001–008 | Full organizer info regression on STG | High |

---

## [DRAFT] PP-337 Parent — [QA] PP-337 Poppa Explore Post

**Jira:** TBD · Type: Task (parent QA task)  
**Story:** PP-337 Poppa Explore Post  
**Design file:** *(draft from requirements — no `.design.md` yet)*  
**Platform:** Mobile (iOS / Android) · **Framework:** WebdriverIO + Appium  
**Total TCs:** 12  

### Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|--------|-----------|-----|------|------------|
| Create Post — Image | EP + State Transition | PP337-TC-001–002 | High | 90% |
| Create Post — Video | EP + State Transition | PP337-TC-003–004 | High | 90% |
| Like / Unlike | State Transition | PP337-TC-005–006 | High | 90% |
| Comment | EP + State Transition | PP337-TC-007–008 | High | 90% |
| Report / Moderation | State Transition | PP337-TC-009–010 | Medium | 90% |
| API Contract | Contract | PP337-TC-011–012 | High | 95% |
| **Total** | | **12** | | |

### Test Cases

| TC ID | Module | Summary | Priority | Automatable | Automation Type |
|-------|--------|---------|----------|-------------|-----------------|
| PP337-TC-001 | Create Image | Create Post → Image → upload → caption → publish successfully | High | Partial | mobile-ui |
| PP337-TC-002 | Create Image | Image post appears in Explore feed after publishing | High | Yes | mobile-ui, api |
| PP337-TC-003 | Create Video | Create Post → Video → upload short video → caption → publish | High | Partial | mobile-ui |
| PP337-TC-004 | Create Video | Video post appears in feed and plays on tap | High | Yes | mobile-ui, api |
| PP337-TC-005 | Like | Tapping Like increments like count in real-time | High | Yes | mobile-ui |
| PP337-TC-006 | Unlike | Tapping Like again decrements like count | Medium | Yes | mobile-ui |
| PP337-TC-007 | Comment | Comment input opens; submitted comment appears in list | High | Yes | mobile-ui |
| PP337-TC-008 | Comment | Comment count updates after submission | Medium | Yes | mobile-ui |
| PP337-TC-009 | Report | Three-dot menu shows Report option on posts | Medium | Yes | mobile-ui |
| PP337-TC-010 | Report | Submitting report shows moderation confirmation | High | Yes | mobile-ui |
| PP337-TC-011 | API Contract | Create Post API — media_url, caption → post_id returned | High | Yes | api |
| PP337-TC-012 | API Contract | Like/Unlike API updates count; Comment API creates comment | High | Yes | api |

---

## [DRAFT] PP-337 sub 1 — [QA][test desing & review][Mobile tesing] explore post creation and engagement coverage

**Jira:** TBD · Sub-task of PP-337 parent · **Scope:** Design review all 12 TCs

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP337-TC-001–012 | Image/video create, like, comment, report, API | High |

---

## [DRAFT] PP-337 sub 2 — [QA][automate][Mobile (iOS) tesing] explore post creation automation

**Jira:** TBD · Sub-task of PP-337 parent · **Scope:** iOS automation (excl. TC-001, 003 partial — media upload)

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP337-TC-002 | Image Post | Post in feed after publish | High | Yes |
| PP337-TC-004 | Video Post | Video in feed and plays | High | Yes |
| PP337-TC-005 | Like | Count increments | High | Yes |
| PP337-TC-006 | Unlike | Count decrements | Medium | Yes |
| PP337-TC-007 | Comment | Comment appears in list | High | Yes |
| PP337-TC-009 | Report | Report option in menu | Medium | Yes |
| PP337-TC-010 | Report | Confirmation shown | High | Yes |

---

## [DRAFT] PP-337 sub 3 — [QA][automate][Mobile (Android) tesing] explore post creation automation

**Jira:** TBD · Sub-task of PP-337 parent · **Scope:** Android automation (same key TCs as iOS)

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP337-TC-002 | Image Post | Post in feed | High | Yes |
| PP337-TC-005 | Like | Count increments | High | Yes |
| PP337-TC-007 | Comment | Comment in list | High | Yes |
| PP337-TC-010 | Report | Confirmation shown | High | Yes |

---

## [DRAFT] PP-337 sub 4 — [QA][automate][API tesing] explore post and engagement contract automation

**Jira:** TBD · Sub-task of PP-337 parent · **Scope:** Create post + like + comment API contracts

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP337-TC-011 | API | Create Post API — media_url, caption, post_id | High | api |
| PP337-TC-012 | API | Like/Unlike count update; Comment create | High | api |

---

## [DRAFT] PP-337 sub 5 — [QA][Manual tesing][Mobile (iOS) tesing] explore post regression

**Jira:** TBD · Sub-task of PP-337 parent · **Scope:** iOS manual — media upload and real-time interactions

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP337-TC-001 | Image creation from gallery | High |
| PP337-TC-003 | Video creation from gallery | High |
| PP337-TC-001–012 | Full explore post regression on STG | High |

---

## [DRAFT] PP-337 sub 6 — [QA][Manual tesing][Mobile (Android) tesing] explore post regression

**Jira:** TBD · Sub-task of PP-337 parent · **Scope:** Android manual

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP337-TC-001–012 | Full explore post regression on STG | High |

---

## [DRAFT] PP-445 Parent — [QA] PP-445 Comment on Running Event

**Jira:** TBD · Type: Task (parent QA task)  
**Story:** PP-445 Comment - on Running Event  
**Design file:** *(draft from requirements — QA test scenarios exist in PP-489)*  
**Platform:** Mobile (iOS / Android) · **Framework:** WebdriverIO + Appium  
**Total TCs:** 18  

### Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|--------|-----------|-----|------|------------|
| Comment Layout | Checklist | PP445-TC-001 | High | 90% |
| Persistent Input Bar | Checklist | PP445-TC-002–003 | High | 90% |
| Text Wrapping | Checklist | PP445-TC-004–005 | Medium | 90% |
| Sort + Pagination | State Transition + BVA | PP445-TC-006–007 | High | 90% |
| Optimistic Update | State Transition | PP445-TC-008–009 | High | 90% |
| Thai Relative Time | BVA | PP445-TC-010–012 | High | Manual only |
| Thread Reply | State Transition | PP445-TC-013–014 | High | 90% |
| Organizer Tag | Checklist | PP445-TC-015 | High | Manual only |
| Edit / Delete | Decision Table | PP445-TC-016–017 | High | 90% |
| API Contract | Contract | PP445-TC-018 | High | 95% |
| **Total** | | **18** | | |

### Test Cases

| TC ID | Module | Summary | Priority | Automatable | Automation Type |
|-------|--------|---------|----------|-------------|-----------------|
| PP445-TC-001 | Layout | Comment section shows Avatar, username, text, and timestamp per comment | High | Yes | mobile-ui |
| PP445-TC-002 | Persistent Input | Input bar fixed at bottom while scrolling | High | Yes | mobile-ui |
| PP445-TC-003 | Persistent Input | Input bar shows current user's avatar | Medium | Yes | mobile-ui |
| PP445-TC-004 | Text Wrapping | Long text auto-wraps to new lines | Medium | Yes | mobile-ui |
| PP445-TC-005 | Text Wrapping | Enter key creates new line (multi-line input) | Medium | Yes | mobile-ui |
| PP445-TC-006 | Sort + Pagination | Comments sorted newest-first; most recent at top | High | Yes | mobile-ui, api |
| PP445-TC-007 | Pagination | Scrolling to bottom lazy-loads next 10–15 comments | High | Yes | mobile-ui |
| PP445-TC-008 | Optimistic Update | New comment appears at top immediately after Send | High | Yes | mobile-ui |
| PP445-TC-009 | Double-submit Guard | Tapping Send multiple times does not create duplicate comments | High | Yes | mobile-ui, api |
| PP445-TC-010 | Thai Relative Time | Comment < 1 min shows "เมื่อครู่" | High | No | — |
| PP445-TC-011 | Thai Relative Time | Comment 1–59 min shows "X นาทีที่แล้ว" | High | No | — |
| PP445-TC-012 | Thai Relative Time | Comment 1–23h shows "X ชม." | Medium | No | — |
| PP445-TC-013 | Thread Reply | Reply to Tier-1 creates Tier-2 with indentation and thread line | High | Yes | mobile-ui |
| PP445-TC-014 | Thread Reply | Tier-2 reply auto-inserts @mention of parent comment author | High | Yes | mobile-ui |
| PP445-TC-015 | Organizer Tag | Organizer's comments show orange tag (#FF5900) | High | No | — |
| PP445-TC-016 | Edit / Delete | 3-dot menu on own comment shows Edit and Delete (not on others') | High | Yes | mobile-ui |
| PP445-TC-017 | Edit / Delete | Edit updates text; Delete removes comment from list | High | Yes | mobile-ui, api |
| PP445-TC-018 | API Contract | Create / list / reply / edit / delete comment APIs return correct shapes | High | Yes | api |

---

## [DRAFT] PP-445 sub 1 — [QA][test desing & review][Mobile tesing] comment system and thread coverage

**Jira:** TBD · Sub-task of PP-445 parent · **Scope:** Design review all 18 TCs (reference PP-489 for existing QA scenarios)

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP445-TC-001–018 | Layout, persistent input, pagination, optimistic update, Thai time, thread, organizer tag, edit/delete, API | High |

---

## [DRAFT] PP-445 sub 2 — [QA][automate][Mobile (iOS) tesing] comment system automation

**Jira:** TBD · Sub-task of PP-445 parent · **Scope:** iOS automation (excl. TC-010–012, 015 — manual only)

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP445-TC-001 | Layout | Avatar, name, text, timestamp shown | High | Yes |
| PP445-TC-002 | Input Bar | Fixed at bottom | High | Yes |
| PP445-TC-004 | Text Wrap | Auto-wrap | Medium | Yes |
| PP445-TC-006 | Sort | Newest first | High | Yes |
| PP445-TC-007 | Pagination | Lazy load 10–15 | High | Yes |
| PP445-TC-008 | Optimistic | Comment appears immediately | High | Yes |
| PP445-TC-009 | Double-submit | No duplicates | High | Yes |
| PP445-TC-013 | Thread | Tier-2 with indentation | High | Yes |
| PP445-TC-014 | Thread | @mention auto-inserted | High | Yes |
| PP445-TC-016 | Edit/Delete | Own comment menu only | High | Yes |
| PP445-TC-017 | Edit/Delete | Edit updates; Delete removes | High | Yes |

---

## [DRAFT] PP-445 sub 3 — [QA][automate][Mobile (Android) tesing] comment system automation

**Jira:** TBD · Sub-task of PP-445 parent · **Scope:** Android automation (same key TCs as iOS)

| TC ID | Module | Summary | Priority | Automatable |
|-------|--------|---------|----------|-------------|
| PP445-TC-001 | Layout | Comment layout | High | Yes |
| PP445-TC-002 | Input Bar | Fixed at bottom | High | Yes |
| PP445-TC-006 | Sort | Newest first | High | Yes |
| PP445-TC-007 | Pagination | Lazy load | High | Yes |
| PP445-TC-008 | Optimistic | Immediate appearance | High | Yes |
| PP445-TC-013 | Thread | Tier-2 reply | High | Yes |
| PP445-TC-016 | Edit/Delete | Own comment menu | High | Yes |
| PP445-TC-017 | Edit/Delete | Edit/Delete works | High | Yes |

---

## [DRAFT] PP-445 sub 4 — [QA][automate][API tesing] comment API contract automation

**Jira:** TBD · Sub-task of PP-445 parent · **Scope:** Full comment API contract

| TC ID | Module | Summary | Priority | Automation Type |
|-------|--------|---------|----------|-----------------|
| PP445-TC-018 | API | Create / list / reply / edit / delete comment endpoint shapes | High | api |
| PP445-TC-009 | Double-submit | Idempotency guard — no duplicate via API | High | api |

---

## [DRAFT] PP-445 sub 5 — [QA][Manual tesing][Mobile (iOS) tesing] comment system regression

**Jira:** TBD · Sub-task of PP-445 parent · **Scope:** iOS manual — Thai relative time, organizer tag, full comment UX

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP445-TC-010 | "เมื่อครู่" timestamp | High |
| PP445-TC-011 | "X นาทีที่แล้ว" timestamp | High |
| PP445-TC-012 | "X ชม." timestamp | Medium |
| PP445-TC-015 | Organizer tag color #FF5900 | High |
| PP445-TC-001–018 | Full comment system regression on STG | High |

---

## [DRAFT] PP-445 sub 6 — [QA][Manual tesing][Mobile (Android) tesing] comment system regression

**Jira:** TBD · Sub-task of PP-445 parent · **Scope:** Android manual — threading, typeahead, @mention auto-insert

| TC ID | Summary | Priority |
|-------|---------|----------|
| PP445-TC-010–012 | Thai relative time | High |
| PP445-TC-014 | @mention typeahead + auto-insert on reply | High |
| PP445-TC-001–018 | Full comment system regression on STG | High |


---

## Summary Table — All 142 Cards

| # | Jira Key | Title (short) | Parent Story | Design File | TCs In Scope | Has Update |
|---|----------|---------------|--------------|-------------|-------------|------------|
| 1 | PP-125 | [QA] Push Notification UI (parent) | PP-122 | PP-122.design.md | 15 | ✅ |
| 2 | PP-321 | [QA] PP-2 Registration & Login (parent) | PP-2 | PP-2.design.md | 43 | ✅ |
| 3 | PP-323 | automate Android auth & onboarding | PP-2 | PP-2.design.md | 28 | ✅ |
| 4 | PP-329 | [QA] PP-3 User Profile (parent) | PP-3 | PP-3.design.md | 35 | ✅ |
| 5 | PP-331 | automate iOS profile view | PP-3 | PP-3.design.md | 5 | ✅ |
| 6 | PP-332 | automate Android profile view | PP-3 | PP-3.design.md | 5 | ✅ |
| 7 | PP-333 | automate API profile view | PP-3 | PP-3.design.md | 2 | ✅ |
| 8 | PP-353 | manual Android profile view regression | PP-3 | PP-3.design.md | 6 | ✅ |
| 9 | PP-356 | automate Android profile edit | PP-3 | PP-3.design.md | 15 | ✅ |
| 10 | PP-357 | automate API profile edit | PP-3 | PP-3.design.md | 3 | ✅ |
| 11 | PP-359 | manual Android profile edit regression | PP-3 | PP-3.design.md | 15 | ✅ |
| 12 | PP-360 | test design & review interests | PP-3 | PP-3.design.md | 4 | ✅ |
| 13 | PP-361 | automate iOS interests | PP-3 | PP-3.design.md | 4 | ✅ |
| 14 | PP-362 | automate Android interests | PP-3 | PP-3.design.md | 4 | ✅ |
| 15 | PP-363 | automate API interests | PP-3 | PP-3.design.md | 2 | ✅ |
| 16 | PP-364 | manual iOS interests regression | PP-3 | PP-3.design.md | 4 | ✅ |
| 17 | PP-365 | manual Android interests regression | PP-3 | PP-3.design.md | 4 | ✅ |
| 18 | PP-368 | automate Android delete account | PP-3 | PP-3.design.md | 8 | ✅ |
| 19 | PP-369 | automate API delete account | PP-3 | PP-3.design.md | 2 | ✅ |
| 20 | PP-371 | manual Android delete account regression | PP-3 | PP-3.design.md | 8 | ✅ |
| 21 | PP-374 | automate Android logout | PP-3 | PP-3.design.md | 1 | ✅ |
| 22 | PP-375 | automate API logout (/logout) | PP-3 | PP-3.design.md | 1 | ✅ |
| 23 | PP-376 | manual iOS logout regression | PP-3 | PP-3.design.md | 1 | ✅ |
| 24 | PP-377 | manual Android logout regression | PP-3 | PP-3.design.md | 1 | ✅ |
| 25 | PP-378 | test design & review session expiry | PP-3 | PP-3.design.md | 1 | ✅ |
| 26 | PP-379 | automate iOS session expiry | PP-3 | PP-3.design.md | 1 | ✅ |
| 27 | PP-380 | automate Android session expiry | PP-3 | PP-3.design.md | 1 | ✅ |
| 28 | PP-381 | automate API session expiry (/refresh-token) | PP-3 | PP-3.design.md | 2 | ✅ |
| 29 | PP-382 | manual iOS session expiry regression | PP-3 | PP-3.design.md | 1 | ✅ |
| 30 | PP-383 | manual Android session expiry regression | PP-3 | PP-3.design.md | 1 | ✅ |
| 31 | PP-384 | [QA] PP-4 Organizer Register & Login (parent) | PP-4 | PP-4.design.md | 44 | ✅ |
| 32 | PP-386 | automate Web UI registration wizard | PP-4 | PP-4.design.md | 16 | ✅ |
| 33 | PP-387 | automate API registration wizard | PP-4 | PP-4.design.md | 2 | ✅ |
| 34 | PP-390 | automate Web UI profile submission | PP-4 | PP-4.design.md | 18 | ✅ |
| 35 | PP-391 | automate API profile submission | PP-4 | PP-4.design.md | 3 | ✅ |
| 36 | PP-392 | manual Web UI profile submission regression | PP-4 | PP-4.design.md | 2 | ✅ |
| 37 | PP-393 | automate Web UI RBAC | PP-4 | PP-4.design.md | 5 | ✅ |
| 38 | PP-394 | automate API RBAC | PP-4 | PP-4.design.md | 3 | ✅ |
| 39 | PP-395 | manual Web UI RBAC regression | PP-4 | PP-4.design.md | 5 | ✅ |
| 40 | PP-396 | automate Web UI re-submission | PP-4 | PP-4.design.md | 1 | ✅ |
| 41 | PP-397 | automate API re-submission | PP-4 | PP-4.design.md | 1 | ✅ |
| 42 | PP-398 | manual Web UI re-submission regression | PP-4 | PP-4.design.md | 2 | ✅ |
| 43 | PP-399 | [QA] PP-5 Admin Register & Login (parent) | PP-5 | PP-5.design.md | 15 active | ✅ |
| 44 | PP-401 | automate Web UI login flow | PP-5 | PP-5.design.md | 4 | ✅ |
| 45 | PP-402 | automate API login flow | PP-5 | PP-5.design.md | 3 | ✅ |
| 46 | PP-404 | automate Web UI role validation | PP-5 | PP-5.design.md | 2 | ✅ |
| 47 | PP-405 | automate API role validation | PP-5 | PP-5.design.md | 2 | ✅ |
| 48 | PP-406 | manual Web UI role validation regression | PP-5 | PP-5.design.md | 2 | ✅ |
| 49 | PP-407 | automate Web UI error handling | PP-5 | PP-5.design.md | 3 | ✅ |
| 50 | PP-408 | automate API error handling | PP-5 | PP-5.design.md | 2 | ✅ |
| 51 | TBD | [QA] PP-237 Event Detail (parent) | PP-237 | PP-237.design.md (draft) | 15 | 🔄 |
| 52 | TBD | test design & review event detail | PP-237 | PP-237.design.md (draft) | 1 | 🔄 |
| 53 | TBD | automate iOS event detail | PP-237 | PP-237.design.md (draft) | 8 | 🔄 |
| 54 | TBD | automate Android event detail | PP-237 | PP-237.design.md (draft) | 8 | 🔄 |
| 55 | TBD | automate API event detail contract | PP-237 | PP-237.design.md (draft) | 2 | 🔄 |
| 56 | TBD | manual iOS event detail regression | PP-237 | PP-237.design.md (draft) | 1 | 🔄 |
| 57 | TBD | manual Android event detail regression | PP-237 | PP-237.design.md (draft) | 1 | 🔄 |
| 58 | TBD | [QA] PP-296 View Who's Registered (parent) | PP-296 | PP-296.design.md (draft) | 13 | 🔄 |
| 59 | TBD | test design & review participant count | PP-296 | PP-296.design.md (draft) | 1 | 🔄 |
| 60 | TBD | automate iOS participant count | PP-296 | PP-296.design.md (draft) | 5 | 🔄 |
| 61 | TBD | automate Android participant count | PP-296 | PP-296.design.md (draft) | 5 | 🔄 |
| 62 | TBD | automate API participation amount | PP-296 | PP-296.design.md (draft) | 2 | 🔄 |
| 63 | TBD | manual iOS participant count regression | PP-296 | PP-296.design.md (draft) | 1 | 🔄 |
| 64 | TBD | manual Android participant count regression | PP-296 | PP-296.design.md (draft) | 1 | 🔄 |
| 65 | TBD | [QA] PP-302 Your Vibes Core Quiz (parent) | PP-302 | PP-302.design.md (draft) | 16 | 🔄 |
| 66 | TBD | test design & review quiz flow | PP-302 | PP-302.design.md (draft) | 1 | 🔄 |
| 67 | TBD | automate iOS quiz flow | PP-302 | PP-302.design.md (draft) | 9 | 🔄 |
| 68 | TBD | automate Android quiz flow | PP-302 | PP-302.design.md (draft) | 6 | 🔄 |
| 69 | TBD | automate API quiz submit contract | PP-302 | PP-302.design.md (draft) | 1 | 🔄 |
| 70 | TBD | manual iOS quiz flow regression | PP-302 | PP-302.design.md (draft) | 1 | 🔄 |
| 71 | TBD | manual Android quiz flow regression | PP-302 | PP-302.design.md (draft) | 1 | 🔄 |
| 72 | TBD | [QA] PP-303 Your Vibes Results (parent) | PP-303 | PP-303.design.md (draft) | 19 | 🔄 |
| 73 | TBD | test design & review vibes results | PP-303 | PP-303.design.md (draft) | 1 | 🔄 |
| 74 | TBD | automate iOS vibes results | PP-303 | PP-303.design.md (draft) | 8 | 🔄 |
| 75 | TBD | automate Android vibes results | PP-303 | PP-303.design.md (draft) | 6 | 🔄 |
| 76 | TBD | automate API vibes result contract | PP-303 | PP-303.design.md (draft) | 2 | 🔄 |
| 77 | TBD | manual iOS vibes results regression | PP-303 | PP-303.design.md (draft) | 3 | 🔄 |
| 78 | TBD | manual Android vibes results regression | PP-303 | PP-303.design.md (draft) | 1 | 🔄 |
| 79 | TBD | [QA] PP-304 Your Vibes Profile (parent) | PP-304 | PP-304.design.md (draft) | 12 | 🔄 |
| 80 | TBD | test design & review vibes profile | PP-304 | PP-304.design.md (draft) | 1 | 🔄 |
| 81 | TBD | automate iOS vibes profile | PP-304 | PP-304.design.md (draft) | 4 | 🔄 |
| 82 | TBD | automate Android vibes profile | PP-304 | PP-304.design.md (draft) | 4 | 🔄 |
| 83 | TBD | automate API vibes profile contract | PP-304 | PP-304.design.md (draft) | 2 | 🔄 |
| 84 | TBD | manual iOS vibes profile regression | PP-304 | PP-304.design.md (draft) | 3 | 🔄 |
| 85 | TBD | manual Android vibes profile regression | PP-304 | PP-304.design.md (draft) | 1 | 🔄 |
| 86 | TBD | [QA] PP-318 Your Vibes BO Management (parent) | PP-318 | PP-318.design.md (draft) | 22 | 🔄 |
| 87 | TBD | test design & review admin vibe mgmt | PP-318 | PP-318.design.md (draft) | 1 | 🔄 |
| 88 | TBD | automate Web UI vibe list and filters | PP-318 | PP-318.design.md (draft) | 8 | 🔄 |
| 89 | TBD | automate Web UI side panel and dashboard | PP-318 | PP-318.design.md (draft) | 5 | 🔄 |
| 90 | TBD | automate API admin vibe list assertions | PP-318 | PP-318.design.md (draft) | 3 | 🔄 |
| 91 | TBD | manual Web UI admin vibe mgmt regression | PP-318 | PP-318.design.md (draft) | 3 | 🔄 |
| 92 | TBD | [QA] PP-492 Edit Running Event (parent) | PP-492 | PP-492.design.md (draft) | 16 | 🔄 |
| 93 | TBD | test design & review edit event | PP-492 | PP-492.design.md (draft) | 1 | 🔄 |
| 94 | TBD | automate Web UI edit event flow | PP-492 | PP-492.design.md (draft) | 8 | 🔄 |
| 95 | TBD | automate API edit event assertions | PP-492 | PP-492.design.md (draft) | 2 | 🔄 |
| 96 | TBD | manual Web UI edit event regression | PP-492 | PP-492.design.md (draft) | 1 | 🔄 |
| 97 | TBD | [QA] PP-342 Story Poppa (parent) | PP-342 | PP-342.design.md (draft) | 18 | 🔄 |
| 98 | TBD | test design & review story lifecycle | PP-342 | PP-342.design.md (draft) | 1 | 🔄 |
| 99 | TBD | automate iOS story creation and viewing | PP-342 | PP-342.design.md (draft) | 7 | 🔄 |
| 100 | TBD | automate Android story creation and viewing | PP-342 | PP-342.design.md (draft) | 5 | 🔄 |
| 101 | TBD | automate API story contract | PP-342 | PP-342.design.md (draft) | 2 | 🔄 |
| 102 | TBD | manual iOS story lifecycle regression | PP-342 | PP-342.design.md (draft) | 3 | 🔄 |
| 103 | TBD | manual Android story lifecycle regression | PP-342 | PP-342.design.md (draft) | 1 | 🔄 |
| 104 | TBD | [QA] PP-449 Post Poppa (parent) | PP-449 | PP-449.design.md (draft) | 22 | 🔄 |
| 105 | TBD | test design & review post creation | PP-449 | PP-449.design.md (draft) | 1 | 🔄 |
| 106 | TBD | automate iOS post creation | PP-449 | PP-449.design.md (draft) | 11 | 🔄 |
| 107 | TBD | automate Android post creation | PP-449 | PP-449.design.md (draft) | 6 | 🔄 |
| 108 | TBD | automate API create post contract | PP-449 | PP-449.design.md (draft) | 1 | 🔄 |
| 109 | TBD | manual iOS post creation regression | PP-449 | PP-449.design.md (draft) | 3 | 🔄 |
| 110 | TBD | manual Android post creation regression | PP-449 | PP-449.design.md (draft) | 1 | 🔄 |
| 111 | TBD | [QA] PP-451 Feeds Poppa (parent) | PP-451 | PP-451.design.md (draft) | 16 | 🔄 |
| 112 | TBD | test design & review feeds and post detail | PP-451 | PP-451.design.md (draft) | 1 | 🔄 |
| 113 | TBD | automate iOS feeds | PP-451 | PP-451.design.md (draft) | 7 | 🔄 |
| 114 | TBD | automate Android feeds | PP-451 | PP-451.design.md (draft) | 5 | 🔄 |
| 115 | TBD | automate API feeds and post contract | PP-451 | PP-451.design.md (draft) | 3 | 🔄 |
| 116 | TBD | manual iOS feeds regression | PP-451 | PP-451.design.md (draft) | 1 | 🔄 |
| 117 | TBD | manual Android feeds regression | PP-451 | PP-451.design.md (draft) | 1 | 🔄 |
| 118 | TBD | [QA] PP-317 Vibes Scoring Engine (parent) | PP-317 | PP-317.design.md (draft) | 12 | 🔄 |
| 119 | TBD | test design & review scoring engine | PP-317 | PP-317.design.md (draft) | 1 | 🔄 |
| 120 | TBD | automate API scoring formula and mapping | PP-317 | PP-317.design.md (draft) | 8 | 🔄 |
| 121 | TBD | manual API scoring engine boundary | PP-317 | PP-317.design.md (draft) | 3 | 🔄 |
| 122 | TBD | [QA] PP-226 Organizer Information (parent) | PP-226 | PP-226.design.md (draft) | 15 | 🔄 |
| 123 | TBD | test design & review organizer info display | PP-226 | PP-226.design.md (draft) | 1 | 🔄 |
| 124 | TBD | automate iOS organizer info display | PP-226 | PP-226.design.md (draft) | 4 | 🔄 |
| 125 | TBD | automate Android organizer info display | PP-226 | PP-226.design.md (draft) | 4 | 🔄 |
| 126 | TBD | automate API organizer info snapshot | PP-226 | PP-226.design.md (draft) | 2 | 🔄 |
| 127 | TBD | manual iOS organizer info regression | PP-226 | PP-226.design.md (draft) | 1 | 🔄 |
| 128 | TBD | manual Android organizer info regression | PP-226 | PP-226.design.md (draft) | 1 | 🔄 |
| 129 | TBD | [QA] PP-337 Poppa Explore Post (parent) | PP-337 | PP-337.design.md (draft) | 18 | 🔄 |
| 130 | TBD | test design & review explore post creation | PP-337 | PP-337.design.md (draft) | 1 | 🔄 |
| 131 | TBD | automate iOS explore post creation | PP-337 | PP-337.design.md (draft) | 7 | 🔄 |
| 132 | TBD | automate Android explore post creation | PP-337 | PP-337.design.md (draft) | 4 | 🔄 |
| 133 | TBD | automate API explore post contract | PP-337 | PP-337.design.md (draft) | 2 | 🔄 |
| 134 | TBD | manual iOS explore post regression | PP-337 | PP-337.design.md (draft) | 3 | 🔄 |
| 135 | TBD | manual Android explore post regression | PP-337 | PP-337.design.md (draft) | 1 | 🔄 |
| 136 | TBD | [QA] PP-445 Comment on Running Event (parent) | PP-445 | PP-445.design.md (draft) | 28 | 🔄 |
| 137 | TBD | test design & review comment system | PP-445 | PP-445.design.md (draft) | 1 | 🔄 |
| 138 | TBD | automate iOS comment system | PP-445 | PP-445.design.md (draft) | 11 | 🔄 |
| 139 | TBD | automate Android comment system | PP-445 | PP-445.design.md (draft) | 8 | 🔄 |
| 140 | TBD | automate API comment contract | PP-445 | PP-445.design.md (draft) | 2 | 🔄 |
| 141 | TBD | manual iOS comment system regression | PP-445 | PP-445.design.md (draft) | 5 | 🔄 |
| 142 | TBD | manual Android comment system regression | PP-445 | PP-445.design.md (draft) | 3 | 🔄 |
