# QA Testing Plan

Source baseline: `automate-e2e-poppa/src/test-design/*.design.md`

## Overview

- Total stories reviewed: `43`
- Total designed test cases: `538`
- Scope mix:
  - `16` Web UI stories / `201` test cases
  - `25` Mobile-related stories / `319` test cases
  - `5` API-related stories / included in mixed or API-only stories
- Planning assumption:
  - One parent QA task per story
  - Sub-tasks split by deliverable and execution scope
  - `test implement` is omitted for manual-only stories unless the design explicitly supports automation

## Jira Naming Rules

- Parent task: `[QA] {story} - {topic}`
- Sub-task: `[QA][{feature}][{scope}] {topic}`
- Allowed `{feature}` values:
  - `test desing & review`
  - `test implement`
  - `Manual tesing`
- Allowed `{scope}` values:
  - `API tesing`
  - `Mobile tesing` — used by `test desing & review` (platform not separated at design stage)
  - `Mobile (iOS) tesing` — used by `automate` and `Manual tesing`
  - `Mobile (Android) tesing` — used by `automate` and `Manual tesing`
  - `Web UI testing`

## Recommended Waves

1. Wave 1: Auth, session, and platform foundations
   Stories: `PP-2`, `PP-4`, `PP-5`, `PP-12`, `PP-13`, `PP-20`, `ORG-AUTH`
2. Wave 2: Core end-user mobile journeys
   Stories: `PP-3`, `PP-35`, `PP-36`, `PP-61`, `PP-65`, `PP-105`, `PP-122`, `PP-201`, `PP-209`, `PP-237`, `PP-268`, `PP-296`, `PP-302`, `PP-303`, `PP-304`, `PP-342`, `PP-449`, `PP-451`
3. Wave 3: Organizer and admin back-office flows
   Stories: `PP-51`, `PP-104`, `PP-136`, `PP-170`, `PP-171`, `PP-227`, `PP-228`, `PP-231`, `PP-234`, `PP-235`, `PP-236`, `PP-244`, `PP-318`, `PP-492`
4. Wave 4: Full regression and manual-heavy release signoff
   Focus: `PP-13`, `PP-35`, `PP-36`, `PP-122`, plus cross-story regression from Waves 1-3
5. Wave 5: Future and in-development features (To Do sprint stories)
   Stories: `PP-226`, `PP-317`, `PP-337`, `PP-445`

## Jira Issue Draft

Each sub-task is listed on its own row with a short detail so the table can be copied into Jira or converted to CSV later.

Status baseline:

- `Reviewed`: confirmed by your review note for `PP-2`, `PP-3`, `PP-4` design files
- `Partially Implemented`: implementation file exists, but coverage is incomplete or partly skipped
- `Not Started`: no implementation found yet, or manual execution has not been evidenced
- `Planned`: not reviewed for status in this pass
- `In Progress`: story has review done and some implementation evidence

| Story | Jira Ref | TCs | Issue Type | Title | Short Detail | Status | QA Issue | Notes |
|---|---|---:|---|---|---|---|---|---|
| ORG-AUTH · Organizer Auth API | — | 10 | Parent task | `[QA] ORG-AUTH Organizer Auth API - login contract coverage` | Cover happy path, auth failures, and request-schema validation for organizer login API. | Planned | — | API-only story |
|  |  |  | Sub-task | `[QA][test desing & review][API tesing] organizer login contract coverage` | Review endpoint contract, validation assumptions, test data, and expected response shape. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] organizer login contract automation` | Implement automated API checks for 200, 401, and assumed 400 contract behavior. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][API tesing] organizer login contract verification` | Manually verify real STG responses and confirm no unexpected error-body deviations. | Planned | — |  |
| PP-2 · Registration & Login | `PP-10` | 43 | Parent task | `[QA] PP-2 Registration & Login - auth and onboarding coverage` | Cover phone login, OTP, social login, Apple login, identity linking, and onboarding. | In Progress | [PP-321](https://7-solutions.atlassian.net/browse/PP-321) | Apple login slice remains manual on iOS |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] auth and onboarding coverage` | Review coverage for auth entry points, onboarding path, OTP, social auth, and device-only Apple flow. | Reviewed | [PP-325](https://7-solutions.atlassian.net/browse/PP-325) |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] auth and onboarding automation` | Automate iOS flows excluding Apple system-sheet cases that remain manual. | Partially Implemented | [PP-322](https://7-solutions.atlassian.net/browse/PP-322) |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] auth and onboarding automation` | Automate Android auth and onboarding happy, negative, and boundary flows. | Partially Implemented | [PP-323](https://7-solutions.atlassian.net/browse/PP-323) |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] auth and onboarding contract automation` | Add API assertions for login, OTP, social auth, token response shape, and error contract validation. | Planned | [PP-324](https://7-solutions.atlassian.net/browse/PP-324) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] auth and onboarding regression` | Execute device-only Apple login and high-risk end-to-end auth regression on iOS. | Not Started | [PP-327](https://7-solutions.atlassian.net/browse/PP-327) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] auth and onboarding regression` | Run Android exploratory regression for OTP, login recovery, and onboarding behavior. | Not Started | [PP-328](https://7-solutions.atlassian.net/browse/PP-328) |  |
| PP-3 · User Profile & Account Settings | `PP-11` | 35 | Parent task | `[QA] PP-3 User Profile & Account Settings - profile and account coverage` | Cover profile view, edit, interests, delete account, logout, and session expiry. | Reviewed | [PP-329](https://7-solutions.atlassian.net/browse/PP-329) | Mostly automatable with some API-assisted setup |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] profile view` | Review profile view fields, data display, and state coverage. | Reviewed | [PP-330](https://7-solutions.atlassian.net/browse/PP-330) |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] profile view` | Automate iOS profile view rendering and data binding assertions. | Not Started | [PP-331](https://7-solutions.atlassian.net/browse/PP-331) |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] profile view` | Automate Android profile view layout and field display checks. | Not Started | [PP-332](https://7-solutions.atlassian.net/browse/PP-332) |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] profile view` | Add API assertions for profile fetch response shape and field contract. | Not Started | [PP-333](https://7-solutions.atlassian.net/browse/PP-333) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] profile view regression` | Manually verify iOS profile view visual fidelity with real-user data. | Not Started | [PP-334](https://7-solutions.atlassian.net/browse/PP-334) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] profile view regression` | Manually verify Android profile view display and edge states. | Not Started | [PP-353](https://7-solutions.atlassian.net/browse/PP-353) |  |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] profile edit` | Review edit field validation, save flow, and error feedback coverage. | Reviewed | [PP-354](https://7-solutions.atlassian.net/browse/PP-354) |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] profile edit` | Automate iOS profile edit flow, validation, and save confirmation. | Not Started | [PP-355](https://7-solutions.atlassian.net/browse/PP-355) |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] profile edit` | Automate Android edit field checks and save behavior. | Not Started | [PP-356](https://7-solutions.atlassian.net/browse/PP-356) |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] profile edit` | Add API assertions for profile update payload and response contract. | Not Started | [PP-357](https://7-solutions.atlassian.net/browse/PP-357) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] profile edit regression` | Manually verify iOS multi-field edits and server-side persistence. | Not Started | [PP-358](https://7-solutions.atlassian.net/browse/PP-358) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] profile edit regression` | Manually verify Android edit UX and save reliability. | Not Started | [PP-359](https://7-solutions.atlassian.net/browse/PP-359) |  |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] interests` | Review interest selection, deselection, persistence, and limit rules. | Reviewed | [PP-360](https://7-solutions.atlassian.net/browse/PP-360) |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] interests` | Automate iOS interest selection and update flow assertions. | Not Started | [PP-361](https://7-solutions.atlassian.net/browse/PP-361) |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] interests` | Automate Android interest selection and persistence checks. | Not Started | [PP-362](https://7-solutions.atlassian.net/browse/PP-362) |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] interests` | Add API assertions for interest update payload and stored state. | Not Started | [PP-363](https://7-solutions.atlassian.net/browse/PP-363) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] interests regression` | Manually verify iOS interest edge cases and selection limits. | Not Started | [PP-364](https://7-solutions.atlassian.net/browse/PP-364) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] interests regression` | Manually verify Android interest persistence and state sync. | Not Started | [PP-365](https://7-solutions.atlassian.net/browse/PP-365) |  |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] delete account` | Review delete confirmation flow, post-delete state, and re-login prevention. | Reviewed | [PP-366](https://7-solutions.atlassian.net/browse/PP-366) |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] delete account` | Automate iOS delete account confirmation and redirect behavior. | Not Started | [PP-367](https://7-solutions.atlassian.net/browse/PP-367) |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] delete account` | Automate Android delete flow and post-delete state assertions. | Not Started | [PP-368](https://7-solutions.atlassian.net/browse/PP-368) |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] delete account` | Add API assertions for account deletion state and blocked re-login contract. | Not Started | [PP-369](https://7-solutions.atlassian.net/browse/PP-369) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] delete account regression` | Manually verify iOS account deletion outcome and session cleanup. | Not Started | [PP-370](https://7-solutions.atlassian.net/browse/PP-370) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] delete account regression` | Manually verify Android deletion and account recovery prevention. | Not Started | [PP-371](https://7-solutions.atlassian.net/browse/PP-371) |  |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] logout` | Review logout trigger, session cleanup, and redirect-to-login behavior. | Reviewed | [PP-372](https://7-solutions.atlassian.net/browse/PP-372) |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] logout` | Automate iOS logout flow and session-clearing assertions. | Not Started | [PP-373](https://7-solutions.atlassian.net/browse/PP-373) |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] logout` | Automate Android logout and post-logout navigation guard. | Not Started | [PP-374](https://7-solutions.atlassian.net/browse/PP-374) |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] logout (/logout)` | Add API assertions for /logout response and token invalidation contract. | Not Started | [PP-375](https://7-solutions.atlassian.net/browse/PP-375) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] logout regression` | Manually verify iOS logout with active and background session states. | Not Started | [PP-376](https://7-solutions.atlassian.net/browse/PP-376) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] logout regression` | Manually verify Android logout persistence and notification cleanup. | Not Started | [PP-377](https://7-solutions.atlassian.net/browse/PP-377) |  |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] session expiry` | Review expiry detection, silent refresh path, and forced logout flow. | Reviewed | [PP-378](https://7-solutions.atlassian.net/browse/PP-378) |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] session expiry` | Automate iOS expiry detection, refresh trigger, and force-logout redirect. | Not Started | [PP-379](https://7-solutions.atlassian.net/browse/PP-379) |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] session expiry` | Automate Android expired-session flow and /refresh-token retry behavior. | Not Started | [PP-380](https://7-solutions.atlassian.net/browse/PP-380) |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] session expiry (/refresh-token)` | Add API assertions for /refresh-token rotation, expiry response, and forced logout contract. | Not Started | [PP-381](https://7-solutions.atlassian.net/browse/PP-381) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] session expiry regression` | Manually verify iOS real-device expiry timing and re-auth flow. | Not Started | [PP-382](https://7-solutions.atlassian.net/browse/PP-382) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] session expiry regression` | Manually verify Android token-expiry edge cases and rotation side effects. | Not Started | [PP-383](https://7-solutions.atlassian.net/browse/PP-383) |  |
| PP-4 · [BO][Organizer] Register & Login | `PP-4` | 44 | Parent task | `[QA] PP-4 Organizer Register & Login - registration and verification coverage` | Cover organizer registration wizard, profile submission, RBAC, and re-submission flow. | In Progress | [PP-384](https://7-solutions.atlassian.net/browse/PP-384) | Some automation already passing on STG; manual-only checks still exist |
|  |  |  | Sub-task | `[QA][test desing & review][Web UI testing] organizer registration and verification coverage` | Review web wizard, field validation, upload rules, and status transitions. | Reviewed | [PP-385](https://7-solutions.atlassian.net/browse/PP-385) |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] registration wizard` | Automate 3-step registration wizard: personal info, credentials, and verify email transitions. | Partially Implemented | [PP-386](https://7-solutions.atlassian.net/browse/PP-386) |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] registration wizard` | Add API assertions for registration submission, field validation, and duplicate account contract. | Not Started | [PP-387](https://7-solutions.atlassian.net/browse/PP-387) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] registration wizard regression` | Manually verify end-to-end registration wizard with real email delivery and edge input cases. | Not Started | [PP-389](https://7-solutions.atlassian.net/browse/PP-389) |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] profile submission` | Automate profile type selection, individual/corporate form, file upload, and submission flow. | Partially Implemented | [PP-390](https://7-solutions.atlassian.net/browse/PP-390) |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] profile submission` | Add API assertions for profile data persistence, file upload validation, and secure storage contract. | Not Started | [PP-391](https://7-solutions.atlassian.net/browse/PP-391) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] profile submission regression` | Manually verify private-bucket access, drag & drop upload, and profile submission edge cases. | Not Started | [PP-392](https://7-solutions.atlassian.net/browse/PP-392) |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] login and status-based page access (RBAC)` | Automate login status matrix: approved/pending/rejected access and unauthenticated redirect behavior. | Partially Implemented | [PP-393](https://7-solutions.atlassian.net/browse/PP-393) |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] login and status-based page access (RBAC)` | Add API assertions for auth token, role enforcement, and access control contract. | Not Started | [PP-394](https://7-solutions.atlassian.net/browse/PP-394) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] login and status-based page access (RBAC) regression` | Manually verify role-based page access and session-guard behavior on STG. | Not Started | [PP-395](https://7-solutions.atlassian.net/browse/PP-395) |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] profile re-submission after rejection` | Automate rejected → edit → re-submit → pending state transition flow. | Not Started | [PP-396](https://7-solutions.atlassian.net/browse/PP-396) |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] profile re-submission after rejection` | Add API assertions for idempotency, draft save, and re-submission state contract. | Not Started | [PP-397](https://7-solutions.atlassian.net/browse/PP-397) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] profile re-submission after rejection regression` | Manually verify re-submission outcome, draft restoration, and double-submit prevention. | Not Started | [PP-398](https://7-solutions.atlassian.net/browse/PP-398) |  |
| PP-5 · [BO][Admin] Register & Login | `PP-5` | 15 | Parent task | `[QA] PP-5 Admin Register & Login - admin auth and session coverage` | Cover direct login form, role restrictions, session guard, timeout, and logout. | Planned | [PP-399](https://7-solutions.atlassian.net/browse/PP-399) | Coverage updated to direct `/login` behavior |
|  |  |  | Sub-task | `[QA][test desing & review][Web UI testing] admin auth and session coverage` | Review login flow, role validation, error handling, session management, and forgot-password entry. | Planned | [PP-400](https://7-solutions.atlassian.net/browse/PP-400) |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] login flow` | Automate no-session redirect, valid-session skip, credential submit, and session guard for protected URLs. | Planned | [PP-401](https://7-solutions.atlassian.net/browse/PP-401) |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] login flow` | Add API assertions for login endpoint contract, token response, and session creation. | Planned | [PP-402](https://7-solutions.atlassian.net/browse/PP-402) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] login flow regression` | Manually verify end-to-end login on STG with real Admin credentials and browser state. | Planned | [PP-403](https://7-solutions.atlassian.net/browse/PP-403) |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] role validation` | Automate Agency and End-user login attempts to verify BO access denial for non-admin roles. | Planned | [PP-404](https://7-solutions.atlassian.net/browse/PP-404) |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] role validation` | Add API assertions for role-based rejection response and authorization enforcement contract. | Planned | [PP-405](https://7-solutions.atlassian.net/browse/PP-405) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] role validation regression` | Manually verify role rejection behavior using real STG test accounts for Agency and End-user. | Planned | [PP-406](https://7-solutions.atlassian.net/browse/PP-406) |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] error handling` | Automate wrong-password error toast and loading button state during failed auth. | Planned | [PP-407](https://7-solutions.atlassian.net/browse/PP-407) |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] error handling` | Add API assertions for error response contract on invalid credentials and suspended account. | Planned | [PP-408](https://7-solutions.atlassian.net/browse/PP-408) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] error handling regression` | Manually verify suspended-account rejection and server-unavailable error on STG. | Planned | [PP-409](https://7-solutions.atlassian.net/browse/PP-409) |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] session management` | Automate timeout redirect, active-session keep-alive, logout redirect, and post-logout guard. | Planned | [PP-410](https://7-solutions.atlassian.net/browse/PP-410) |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] session management` | Add API assertions for session token invalidation on logout and timeout expiry contract. | Planned | [PP-411](https://7-solutions.atlassian.net/browse/PP-411) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] session management regression` | Manually verify inactivity timeout behavior using STG short-TTL config. | Planned | [PP-412](https://7-solutions.atlassian.net/browse/PP-412) |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] forgot password` | Automate "Forgot password?" link visibility and reset-flow page transition on /login. | Planned | [PP-413](https://7-solutions.atlassian.net/browse/PP-413) |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] forgot password` | Add API assertions for password-reset request endpoint and email dispatch contract. | Planned | [PP-414](https://7-solutions.atlassian.net/browse/PP-414) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] forgot password regression` | Manually verify password reset email delivery and reset link functionality on STG. | Planned | [PP-415](https://7-solutions.atlassian.net/browse/PP-415) |  |
| PP-12 · Remote Config | `PP-12` | 8 | Parent task | `[QA] PP-12 Remote Config - update decision flow coverage` | Cover remote-config fetch, version comparison, update dialog behavior, and store redirect. | Planned | [PP-416](https://7-solutions.atlassian.net/browse/PP-416) | Store deep-link destination needs manual verification |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] remote config update flow coverage` | Review force-update, soft-update, fallback, version-compare, and config-failure handling scenarios. | Planned | [PP-417](https://7-solutions.atlassian.net/browse/PP-417) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] remote config update flow` | Manually verify iOS version check, soft-update dialog dismiss, force-update block, and App Store redirect. | Planned | [PP-418](https://7-solutions.atlassian.net/browse/PP-418) |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] remote config update flow` | Manually verify Android version check, soft-update dialog dismiss, force-update block, and Play Store redirect. | Planned | [PP-419](https://7-solutions.atlassian.net/browse/PP-419) |  |
| PP-13 · Integrate Firebase In App | `PP-13` | 7 | Parent task | `[QA] PP-13 Integrate Firebase In App - flavor integration coverage` | Cover Firebase SDK setup, multi-flavor connection, and misconfiguration handling. | Planned | — | Manual-heavy infra story; UI automation not applicable |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] firebase flavor integration coverage` | Review flavor mapping, config placement, startup initialization, and build/runtime checkpoints. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] firebase flavor build verification` | Manually verify iOS builds connect to the correct Firebase project per flavor. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] firebase flavor build verification` | Manually verify Android builds connect to the correct Firebase project per flavor. | Planned | — |  |
| PP-20 · Manage Auth Token State | `PP-20` | 6 | Parent task | `[QA] PP-20 Manage Auth Token State - token lifecycle coverage` | Cover secure storage, silent refresh, forced logout, and guarded navigation behavior. | Planned | — | Mixed UI and auth-state setup |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] token lifecycle coverage` | Review token refresh, session expiry, logout risk, storage expectations, and guard transitions. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] token lifecycle automation` | Automate iOS token refresh, expired-session redirect, and logout flows. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] token lifecycle automation` | Automate Android token state transitions and navigation-guard checks. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] token lifecycle regression` | Run manual iOS regression for edge timing, stale token, and logout persistence cases. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] token lifecycle regression` | Run manual Android regression for timing-sensitive and storage-sensitive auth cases. | Planned | — |  |
| PP-35 · App Visuals: AppIcon & Native Splash | `PP-35` | 10 | Parent task | `[QA] PP-35 App Visuals - icon and splash verification` | Cover icon assets and splash rendering across platform and flavor combinations. | Planned | — | Manual-only visual story |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] icon and splash coverage` | Review visual checklist for icon variants, splash alignment, launcher icon, and flavor correctness. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] icon and splash visual verification` | Manually verify icon and splash presentation on iOS physical devices. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] icon and splash visual verification` | Manually verify icon and splash presentation on Android devices and emulators. | Planned | — |  |
| PP-36 · POC Open Chat | `PP-36` | 6 | Parent task | `[QA] PP-36 POC Open Chat - feasibility and chat flow coverage` | Cover POC chat feasibility, baseline messaging flow, and integration behavior. | Planned | — | POC stage; automation deferred |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] chat feasibility coverage` | Review POC chat assumptions, supported scenarios, blockers, and platform risks. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] chat feasibility verification` | Manually validate basic iOS chat behavior and document feasibility findings. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] chat feasibility verification` | Manually validate basic Android chat behavior and document feasibility findings. | Planned | — |  |
| PP-51 · Create Event Running | `PP-51` | 14 | Parent task | `[QA] PP-51 Create Event Running - event creation flow coverage` | Cover event creation, ticket setup, draft, publish, and cancel flow in BO. | Planned | — | Web UI with API validation support |
|  |  |  | Sub-task | `[QA][test desing & review][Web UI testing] event creation flow coverage` | Review create-event steps, validations, draft handling, and publish state transitions. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] event creation flow automation` | Implement UI automation for create, edit, draft, publish, and cancel paths. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] event creation flow regression` | Run manual regression for visual correctness and multi-step organizer behavior. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] event creation data assertions` | Add backend assertions for saved state, publish status, and persisted event data. | Planned | — |  |
| PP-61 · Epic 2 User Profile | `PP-61` | 18 | Parent task | `[QA] PP-61 User Profile Epic - profile management coverage` | Cover mobile profile features plus API-backed profile and account behaviors. | Planned | — | Cross-surface story |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] profile management coverage` | Review user-profile journeys, editing, validation, account management, and state transitions. | Planned | — |  |
|  |  |  | Sub-task | `[QA][test desing & review][API tesing] profile contract coverage` | Review API dependencies, payload expectations, and backend validation coverage. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] profile management automation` | Automate iOS profile management flows and key UI validations. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] profile management automation` | Automate Android profile management scenarios and negative checks. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] profile contract automation` | Implement API assertions for profile fetch, update, and account-state contracts. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] profile management regression` | Manually verify high-risk iOS profile flows and end-to-end account behavior. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] profile management regression` | Manually verify Android high-risk profile and settings scenarios. | Planned | — |  |
| PP-65 · Epic 3 Social Graph | `PP-65` | 10 | Parent task | `[QA] PP-65 Social Graph - follow and block coverage` | Cover follow, unfollow, list views, mutual block behavior, and notification integration. | Planned | — | Includes Kafka notification verification |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] social graph coverage` | Review follow/unfollow, block, list-state, and user-state transition coverage. | Planned | — |  |
|  |  |  | Sub-task | `[QA][test desing & review][API tesing] social graph contract coverage` | Review API and event-driven dependencies such as follow notification emission. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] social graph automation` | Automate iOS follow/block flows and related list assertions. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] social graph automation` | Automate Android social graph flows and negative behavior. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] social graph contract automation` | Add API and event assertions for follow state and notification side effects. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] social graph regression` | Manually verify iOS edge cases around block interactions and state sync. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] social graph regression` | Manually verify Android social edge cases and synchronization behavior. | Planned | — |  |
| PP-104 · Agency Verification Listing | `PP-104` | 8 | Parent task | `[QA] PP-104 Agency Verification Listing - list and filter coverage` | Cover listing visibility, search, status filter, review navigation, and RBAC guard. | Planned | — | Admin portal web flow |
|  |  |  | Sub-task | `[QA][test desing & review][Web UI testing] agency verification list coverage` | Review list rendering, filter criteria, navigation flow, and role restrictions. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] agency verification list automation` | Implement web automation for listing, search, filter, and review-entry scenarios. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] agency verification list regression` | Run manual admin regression for real data sorting, filtering, and access checks. | Planned | — |  |
| PP-105 · Event Registration (Join Event) | `PP-105` | 13 | Parent task | `[QA] PP-105 Event Registration - join and check-in coverage` | Cover free join, paid registration, my events, leave event, and QR check-in. | Planned | — | Mobile flow with API-backed assertions |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] event registration coverage` | Review event registration, ticketing, leave, check-in, and post-registration behavior coverage. | Planned | — |  |
|  |  |  | Sub-task | `[QA][test desing & review][API tesing] event registration contract coverage` | Review APIs supporting join, payment handoff, my-events, and QR validation. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] event registration automation` | Automate iOS join, leave, and my-events flows with seeded test data. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] event registration automation` | Automate Android registration and check-in behaviors across major states. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] event registration contract automation` | Add API assertions for participant state, registration result, and check-in response. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] join and check-in regression` | Manually verify real QR scanning, device interaction, and payment-linked states on iOS. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] join and check-in regression` | Manually verify Android QR scan, leave behavior, and ticket-linked states. | Planned | — |  |
| PP-122 · Push Notification UI | `PP-125` | 15 | Parent task | `[QA] PP-122 Push Notification UI - lock screen notification coverage` | Cover lock-screen card layout, stacking, deep link routing, and timestamp display. | Planned | — | Manual-first iOS story; UI automation not practical |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile (iOS) tesing] lock screen notification coverage` | Review iOS-only lock-screen cases, payload variants, and manual observation points. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] lock screen notification regression` | Manually verify lock-screen rendering, grouping, deep linking, and timestamp behavior. | Planned | — |  |
| PP-136 · Update Book Bank Acc | `PP-136` | 5 | Parent task | `[QA] PP-136 Update Book Bank Acc - upload validation coverage` | Cover bank-book document visibility, upload validation, and profile-type differences. | Planned | — | Agency portal web flow |
|  |  |  | Sub-task | `[QA][test desing & review][Web UI testing] bank account upload coverage` | Review file rules, visibility conditions, and profile-type-specific requirements. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] bank account upload automation` | Implement UI checks for visible fields, valid files, and invalid upload rejection. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] bank account upload regression` | Manually verify real-file behavior and profile-type switching in STG. | Planned | — |  |
| PP-170 · Document Review & Approval Logic | `PP-170` | 6 | Parent task | `[QA] PP-170 Document Review & Approval Logic - approval workflow coverage` | Cover admin approval, rejection, reason validation, and audit-log behavior. | Planned | — | Admin review flow with audit checks |
|  |  |  | Sub-task | `[QA][test desing & review][Web UI testing] document approval workflow coverage` | Review review-page states, reason rules, and audit visibility expectations. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] document approval workflow automation` | Implement UI automation for approve, reject, validation, and status transitions. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] document approval workflow regression` | Manually verify audit trail accuracy and admin workflow with realistic data. | Planned | — |  |
| PP-171 · Permission Activation | `PP-171` | 13 | Parent task | `[QA] PP-171 Permission Activation - access control coverage` | Cover approval-driven access, onboarding notice, audit trail, and admin actions. | Planned | — | Cross admin and agency web portals |
|  |  |  | Sub-task | `[QA][test desing & review][Web UI testing] permission activation coverage` | Review locked/unlocked access states, notification points, and admin action flow. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] permission activation automation` | Implement web automation for access control transitions and approval effects. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] permission activation regression` | Manually verify portal-to-portal behavior, audit data, and role-based restrictions. | Planned | — |  |
| PP-201 · Payment | `PP-201` | 14 | Parent task | `[QA] PP-201 Payment - checkout and payment state coverage` | Cover checkout, payment methods, status polling, expiry, refund, and payout behavior. | Planned | — | Strong API assertion need for webhook and idempotency |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] payment state coverage` | Review payment-state model, checkout flows, error/expiry handling, and method-specific state transitions. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] payment state automation` | Automate iOS checkout, pending, success, failed, and expiry user flows. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] payment state automation` | Automate Android payment flows and major state-change assertions. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] payment webhook and status automation` | Add backend assertions for webhook idempotency, status sync, refund, and payout logic. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] payment flow regression` | Manually verify iOS real-device payment behavior and provider handoff edge cases. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] payment flow regression` | Manually verify Android provider handoff, polling, and failure recovery states. | Planned | — |  |
| PP-209 · Home (Main Page) | `PP-213` | 7 | Parent task | `[QA] PP-209 Home Main Page - home feed coverage` | Cover home section rendering, personalization, menu navigation, and branding checks. | Planned | — | Includes branding compliance checks |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] home feed coverage` | Review home layout, section rendering, personalized content, and bottom-menu navigation coverage. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] home feed automation` | Automate iOS home rendering and navigation checks with seeded preference data. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] home feed automation` | Automate Android feed rendering and bottom-menu state coverage. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] home feed regression` | Manually verify iOS branding, mood-and-tone, and personalized list presentation. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] home feed regression` | Manually verify Android branding and production-like content presentation. | Planned | — |  |
| PP-227 · [Organizer] Forgot Password Flow | `PP-245` | 16 | Parent task | `[QA] PP-227 Organizer Forgot Password Flow - recovery flow coverage` | Cover request link, token validity, reset validation, and recovery completion behavior. | Planned | — | Good automation subset in current design |
|  |  |  | Sub-task | `[QA][test desing & review][Web UI testing] organizer password recovery coverage` | Review forgot-password entry, email token flow, validation, and success outcomes. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] organizer password recovery automation` | Implement web automation for request, reset, validation, and success flows. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] organizer password recovery regression` | Manually verify email delivery, expired token behavior, and realistic cross-page flow. | Planned | — |  |
| PP-228 · [Organizer] Register Flow - Resend Verification Email | `PP-280` | 9 | Parent task | `[QA] PP-228 Resend Verification Email - resend timer coverage` | Cover resend timer, button state, token replacement, rate limit, and feedback toast. | Planned | — | Timer and rate-limit behavior are automatable |
|  |  |  | Sub-task | `[QA][test desing & review][Web UI testing] resend verification coverage` | Review resend rules, cooldown timing, and token/feedback expectations. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] resend verification automation` | Implement web automation for countdown, enablement, and resend result handling. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] resend verification regression` | Manually verify real email receipt, timing realism, and rate-limit behavior on STG. | Planned | — |  |
| PP-231 · [BO][Organizer] Organizer Dashboard | `PP-155` | 9 | Parent task | `[QA] PP-231 Organizer Dashboard - metrics and filter coverage` | Cover dashboard metrics, filters, data accuracy, and confirmed-payment-only logic. | Planned | — | CQRS and confirmed-payment checks need API/data setup |
|  |  |  | Sub-task | `[QA][test desing & review][Web UI testing] organizer dashboard coverage` | Review widgets, date filters, and metric-display coverage for organizer dashboard. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] organizer dashboard automation` | Implement web automation for metric visibility, filters, and basic data binding. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] organizer dashboard data assertions` | Add backend or seed-data assertions for CQRS correctness and confirmed-payment counts. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] organizer dashboard regression` | Manually verify live data interpretation, chart correctness, and seeded edge states. | Planned | — |  |
| PP-234 · [BO][Organizer] Organizer Event Detail | `PP-157` | 8 | Parent task | `[QA] PP-234 Organizer Event Detail - detail rendering coverage` | Cover event info rendering, asset visibility, ticket detail, and API-backed correctness. | Planned | — | Mostly UI visibility and content assertions |
|  |  |  | Sub-task | `[QA][test desing & review][Web UI testing] organizer event detail coverage` | Review event-detail fields, ticket blocks, image rendering, and data dependencies. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] organizer event detail automation` | Implement UI automation for event-detail rendering and content assertions. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] organizer event detail regression` | Manually verify content fidelity and realistic event data presentation on STG. | Planned | — |  |
| PP-235 · [BO][Organizer] Event Running Registered | `PP-235` | 11 | Parent task | `[QA] PP-235 Event Running Registered - participant list coverage` | Cover participant listing, search, filter, and detail drill-in for running events. | Planned | — | Broad automatable subset with API pre-seeding |
|  |  |  | Sub-task | `[QA][test desing & review][Web UI testing] participant list coverage` | Review participant list states, filters, search behavior, and detail navigation. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] participant list automation` | Implement UI automation for list rendering, search, filters, and drill-in. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] participant list data assertions` | Add backend assertions and seed-data checks for participant counts and filter results. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] participant list regression` | Manually verify real organizer data, sorting, and edge filter combinations. | Planned | — |  |
| PP-236 · [BO][Organizer] Transaction & Payment (Finance Page) | `PP-236` | 12 | Parent task | `[QA] PP-236 Finance Page - transaction and fee coverage` | Cover finance listing, fee calculation, order detail, and completed-event payment data. | Planned | — | Fee math and order detail checks need API support |
|  |  |  | Sub-task | `[QA][test desing & review][Web UI testing] finance page coverage` | Review finance columns, calculations, filters, and order-detail expectations. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] finance page automation` | Implement web automation for finance page rendering and navigation behavior. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] finance calculation assertions` | Add backend assertions for gateway fee, platform fee, and payout math correctness. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] finance page regression` | Manually verify real-number calculations and completed-event finance presentation. | Planned | — |  |
| PP-244 · [BO][Organizer] Delete Organizer Account | `PP-244` | 7 | Parent task | `[QA] PP-244 Delete Organizer Account - deletion flow coverage` | Cover delete confirmation, soft delete, forced logout, redirect, and re-login prevention. | Planned | — | Web flow with API-backed state validation |
|  |  |  | Sub-task | `[QA][test desing & review][Web UI testing] organizer deletion coverage` | Review delete-account flow, confirmation rules, and expected post-delete behavior. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] organizer deletion automation` | Implement UI automation for delete confirmation, logout, and redirect checks. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] organizer deletion state assertions` | Add backend assertions to confirm soft-delete state and blocked re-login behavior. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] organizer deletion regression` | Manually verify realistic deletion outcome, session cleanup, and account lockout. | Planned | — |  |
| PP-268 · [M-App][End-User] Event Detail (Mobile App) | `PP-268` | 12 | Parent task | `[QA] PP-268 Event Detail Mobile App - event detail and CTA coverage` | Cover event-detail rendering, CTA logic, and participant display by registration state. | Planned | — | Good automation subset with API pre-seeding |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] event detail coverage` | Review event-detail fields, CTA logic, participant state, and rendering expectations across platforms. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] event detail automation` | Automate iOS event-detail rendering and CTA behavior with seeded event data. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] event detail automation` | Automate Android event-detail rendering and registration-state CTA checks. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] event detail regression` | Manually verify iOS event content fidelity and high-risk CTA edge behavior. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] event detail regression` | Manually verify Android event presentation and CTA behavior with real data. | Planned | — |  |

| PP-237 · Event Detail excluding comment | PP-237 | 10 | Parent task | `[QA] PP-237 Event Detail excluding comment - event detail and participants coverage` | Cover event-detail rendering, no-comment layout verification, participant list, gallery display, and empty participant state. | Planned | — | URGENT: Ready To Test STG; all subtasks PP-238–PP-243 also Ready To Test STG |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] event detail and participants coverage` | Review event-detail fields, no-comment layout, participant rendering, gallery display, and empty-state scenarios. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] event detail and participants automation` | Automate iOS event-detail display, participant list, gallery presence, and no-comment section absence. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] event detail and participants automation` | Automate Android event-detail rendering, participant state, and empty-state assertions. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] event detail and participants contract automation` | Add API assertions for event-detail response shape, participant count contract, and gallery data fields. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] event detail regression` | Manually verify iOS event content fidelity, participant list with real data, and gallery rendering on STG. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] event detail regression` | Manually verify Android event display, participant state, and empty-state presentation with real STG data. | Planned | — |  |
| PP-296 · View Who's Registered Event | PP-296 | 8 | Parent task | `[QA] PP-296 View Who's Registered Event - Poppa participant count coverage` | Cover "จาก Poppa X คน" wording display, count accuracy, zero state, and real-time refresh after new registrations. | Planned | — | URGENT: Ready To Test STG; count data from Participation Amount API (PP-336) |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] Poppa participant count coverage` | Review wording format, count accuracy rules, zero-state behavior, and refresh update requirements. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] Poppa participant count automation` | Automate iOS wording display, accurate count binding, and zero-state rendering with seeded participant data. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] Poppa participant count automation` | Automate Android participant count display, zero-state, and refresh behavior assertions. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] participation amount API automation` | Add API assertions for Participation Amount API response shape, Poppa-registered count, and zero-count contract. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] participant count regression` | Manually verify iOS count accuracy with real registered users and refresh timing on STG. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] participant count regression` | Manually verify Android count display and zero-state with real STG data. | Planned | — |  |
| PP-302 · Your Vibes Core Quiz | PP-302 | 10 | Parent task | `[QA] PP-302 Your Vibes Core Quiz - 7-question quiz flow coverage` | Cover one-at-a-time question display, progress bar accuracy, back/edit answer, next-blocked guard, and submit to API. | Planned | — | Mobile + API story; BE POST /v1/vibes/quiz/submit ready-to-deploy STG |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] quiz flow coverage` | Review question sequence, progress bar accuracy, back-to-edit flow, next-button block, and API submit behavior. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] quiz flow automation` | Automate iOS question-by-question flow, progress bar updates, back/edit cycle, and submit navigation. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] quiz flow automation` | Automate Android quiz flow, next-disabled guard enforcement, and submit response navigation. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] quiz submit contract automation` | Add API assertions for POST /v1/vibes/quiz/submit payload validation, answer-count check, and response shape. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] quiz flow regression` | Manually verify iOS quiz sequence, back-navigation answer retention, and API submit with real data. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] quiz flow regression` | Manually verify Android quiz edge cases and submit reliability. | Planned | — |  |
| PP-303 · Your Vibes Results | PP-303 | 12 | Parent task | `[QA] PP-303 Your Vibes Results - animal result and radar chart coverage` | Cover animal name and image display, description, 4-axis radar chart with scores, activity categories, share, and done navigation. | Planned | — | Mobile + API story; BE GET /v1/vibes/result ready-to-deploy STG |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] vibes results coverage` | Review animal display fields, description rendering, radar chart axes, activity section categories, share flow, and done navigation. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] vibes results automation` | Automate iOS animal result rendering, radar chart presence, activity category list, and done navigation. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] vibes results automation` | Automate Android vibes result rendering, score axis binding, and activity list display assertions. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] vibes result contract automation` | Add API assertions for GET /v1/vibes/result response shape, score object fields, and recommended activities structure. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] vibes results regression` | Manually verify iOS share sheet image generation, social-app sharing, and result visual fidelity. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] vibes results regression` | Manually verify Android result presentation, share behavior, and real-data binding on STG. | Planned | — |  |
| PP-304 · Your Vibes Profile | PP-304 | 8 | Parent task | `[QA] PP-304 Your Vibes Profile - animal result in user profile coverage` | Cover vibe result section in profile, share from profile, and null vibe_result empty/prompt state. | Planned | — | Mobile + API story; BE GET /v1/users/{userId}/profile extension ready-to-deploy STG |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] vibes profile coverage` | Review vibe-result section display in profile, share flow, and null-vibe_result empty-state/prompt behavior. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] vibes profile automation` | Automate iOS vibe section rendering in profile, share sheet trigger, and no-quiz prompt display. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] vibes profile automation` | Automate Android vibe section display and null vibe_result empty-state assertions. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] profile vibe result contract automation` | Add API assertions for GET /v1/users/{userId}/profile vibe_result field shape and null case handling. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] vibes profile regression` | Manually verify iOS profile vibe section accuracy with real completed-quiz data and share behavior on STG. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] vibes profile regression` | Manually verify Android profile vibe result visual and null-state prompt handling. | Planned | — |  |
| PP-318 · Your Vibes BO Management | PP-318 | 14 | Parent task | `[QA] PP-318 Your Vibes BO Management - admin user vibe list and analytics coverage` | Cover user list with animal type and scores, filter by animal/score range, search, side-panel detail, CSV export, and summary dashboard. | Planned | — | Web BO admin story; Animal Type must be 100% consistent with mobile app results |
|  |  |  | Sub-task | `[QA][test desing & review][Web UI testing] admin vibe management coverage` | Review user list columns (User ID, Display Name, Sex, Animal Type, Last Active, Date Joined), filter rules, search, side-panel, export format, and dashboard widgets. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] user vibe list and filters automation` | Implement web automation for user list rendering, animal-type filter, score-range filter, and search by username. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] side panel and export automation` | Automate side-panel open/close, vibe detail display (score meter, activity list), and CSV/Excel export trigger. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] admin vibe list data assertions` | Add API assertions for user list response shape, filter result accuracy, and vibe score data consistency with mobile. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] admin vibe management regression` | Manually verify live data accuracy, dashboard statistics, pagination performance (≤2s), and RBAC enforcement on STG. | Planned | — |  |
| PP-342 · Story Poppa | PP-342 | 12 | Parent task | `[QA] PP-342 Story Poppa - story creation and viewing coverage` | Cover story creation with media upload, viewing from friends, no-friends follow state, 24h expiry, and story archive. | Planned | — | Mobile + BE story; infrastructure PP-455 Done; Create Story API in progress |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] story creation and lifecycle coverage` | Review story creation upload flow, friend story viewing, no-friends placeholder, 24h expiry rule, and archive access. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] story creation and viewing automation` | Automate iOS story creation, friend story feed display, no-friends state, and archive navigation. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] story creation and viewing automation` | Automate Android story creation flow and viewing feed behavior assertions. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] story API contract automation` | Add API assertions for create story, get story by ID, and story state lifecycle contract. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] story lifecycle regression` | Manually verify iOS story creation with text/sticker tools, 24h expiry behavior, and archive on STG. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] story lifecycle regression` | Manually verify Android story creation, feed ordering, and expiry behavior with real test accounts. | Planned | — |  |
| PP-449 · Post Poppa | PP-449 | 14 | Parent task | `[QA] PP-449 Post Poppa - post creation and media editing coverage` | Cover gallery picker, camera capture, crop/zoom/resize, video trim, caption with @mention, draft resume, and submit flow. | Planned | — | Mobile + BE story; gallery, camera, crop, video trim UI tasks in Review Code |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] post creation and media coverage` | Review gallery picker, camera capture, crop/aspect ratio, zoom/resize, video trim, caption, mention, draft resume, and submit state. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] post creation automation` | Automate iOS gallery selection, media edit tools, caption input with @mention, draft resume dialog, and submit with loading/success state. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] post creation automation` | Automate Android post creation flow, media editing tools, and submit state assertions. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] create post contract automation` | Add API assertions for Create Post API payload validation, response shape, and error contract. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] post creation regression` | Manually verify iOS video trim accuracy, @mention tagging, draft restoration, and post submission visibility on STG. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] post creation regression` | Manually verify Android media tools, caption flow, and submit success state with real accounts. | Planned | — |  |
| PP-451 · Feeds Poppa | PP-451 | 10 | Parent task | `[QA] PP-451 Feeds Poppa - chronological feed and post detail coverage` | Cover chronological feed rendering, Feed API integration, post detail display, detail API, and report post dialog + API. | Planned | — | Mobile + BE story; Post Feed UI in Review Code; Feed RFC in progress |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] feeds and post detail coverage` | Review chronological feed order, post detail fields (caption, media, likes, comments), report dialog reason options, and API integration points. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] feeds automation` | Automate iOS feed rendering in chronological order, post detail navigation, and report dialog flow. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] feeds automation` | Automate Android feed display, post detail layout, and report submission assertions. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] feeds and post API contract automation` | Add API assertions for Feed API list response, Post Detail response shape, and Report Post API contract. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] feeds regression` | Manually verify iOS feed ordering with real following data, post detail accuracy, and report confirmation on STG. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] feeds regression` | Manually verify Android feed rendering, post interaction edge cases, and chronological sort with real data. | Planned | — |  |
| PP-492 · Edit Running Event | PP-492 | 10 | Parent task | `[QA] PP-492 Edit Running Event - edit published and draft event coverage` | Cover edit published event UI and API, edit draft event UI and API, and required-field validation error display. | Planned | — | Web BO organizer story; Edit Published UI/API in Review Code; Edit Draft in progress |
|  |  |  | Sub-task | `[QA][test desing & review][Web UI testing] edit event coverage` | Review edit-published flow, edit-draft flow, required-field validation rules, and API integration expectations for both paths. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Web UI testing] edit event flow automation` | Implement web automation for opening edit form, modifying fields, saving, and validation error display on required fields. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] edit event API assertions` | Add API assertions for edit-published and edit-draft endpoints, field constraints, and successful update response. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Web UI testing] edit event regression` | Manually verify organizer edit flows for published vs draft, field-level validation behavior, and state persistence on STG. | Planned | — |  |
| PP-226 · Event Detail Organizer Information | PP-226 | 8 | Parent task | `[QA] PP-226 Event Detail Organizer Information - host and organizer display coverage` | Cover host/organizer display, same-entity consolidated display, hybrid split display, and no-snapshot placeholder. | Planned | — | Mobile story; all subtasks To Do; depends on schema PP-233 and BE snapshot API PP-500 |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] organizer info display coverage` | Review host vs organizer field rendering, same-entity consolidation logic, hybrid display, and placeholder behavior when data is absent. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] organizer info display automation` | Automate iOS host+organizer display for same-entity, different-entity, and missing-snapshot cases. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] organizer info display automation` | Automate Android event-detail host and organizer rendering and placeholder state assertions. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] organizer info snapshot contract automation` | Add API assertions for host and organizer snapshot fields in event-detail response contract. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] organizer info regression` | Manually verify iOS all 3 display modes (Brand, Agency, Hybrid) with real event data on STG. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] organizer info regression` | Manually verify Android organizer info display and placeholder edge state behavior. | Planned | — |  |
| PP-317 · Your Vibes Scoring Engine | PP-317 | 8 | Parent task | `[QA] PP-317 Your Vibes Scoring Engine - score calculation and animal mapping coverage` | Cover 4-dimension calculation formula, normalization boundaries (min 20, max 100), animal type lookup, and vibe_result upsert to user profile. | Planned | — | Backend-only story; precise math boundaries; unit test coverage required |
|  |  |  | Sub-task | `[QA][test desing & review][API tesing] scoring engine coverage` | Review scoring formula correctness, normalization range 0-100, boundary values, lookup table mapping logic, and profile persistence contract. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] scoring formula and animal mapping automation` | Add API/unit assertions for formula math (raw × 0.7 normalized), min boundary (all-1 → 20), max boundary (all-5 → 100), and lookup table animal mapping. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][API tesing] scoring engine boundary verification` | Manually verify boundary cases and lookup table spot-checks by submitting known answer sets and confirming expected animal type on STG. | Planned | — |  |
| PP-337 · Poppa Explore Post | PP-337 | 12 | Parent task | `[QA] PP-337 Poppa Explore Post - post creation and content interaction coverage` | Cover image post creation, video post creation, like/comment real-time interactions, and content report moderation. | Planned | — | Mobile + API story; all subtasks To Do; future wave |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] explore post creation and engagement coverage` | Review image/video creation flows, interaction (like/comment real-time update) behavior, and report/moderation paths. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] explore post creation automation` | Automate iOS image post creation flow, video post creation, and post submission assertions. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] explore post creation automation` | Automate Android post creation flow and media upload behavior checks. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] explore post and engagement contract automation` | Add API assertions for create post, like/unlike, comment submit, and report endpoint response contract. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] explore post regression` | Manually verify iOS post creation, engagement actions (like/comment count update), and moderation report flow on STG. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] explore post regression` | Manually verify Android post creation, interactions, and real-time like/comment count behavior. | Planned | — |  |
| PP-445 · Comment on Running Event | PP-445 | 18 | Parent task | `[QA] PP-445 Comment on Running Event - comment system and thread coverage` | Cover comment layout, persistent input bar, newest-first pagination, optimistic update, Thai relative time, Tier-1/2 thread reply, and edit/delete own comment. | Planned | — | Mobile + BE story; all subtasks To Do; QA test scenarios drafted in PP-489 |
|  |  |  | Sub-task | `[QA][test desing & review][Mobile tesing] comment system and thread coverage` | Review comment layout elements, input bar stickiness, pagination lazy load, optimistic prepend, Thai time format, tier-1/2 thread, and edit/delete menu. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (iOS) tesing] comment system automation` | Automate iOS comment layout, persistent input bar behavior, newest-first sort, pagination, and optimistic-prepend flow. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][Mobile (Android) tesing] comment system automation` | Automate Android comment input, sort order, lazy load pagination, and double-submit guard assertions. | Planned | — |  |
|  |  |  | Sub-task | `[QA][automate][API tesing] comment API contract automation` | Add API assertions for create/list/reply/edit/delete comment endpoints, Tier-2 reply depth limit, and owner-only edit/delete contract. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (iOS) tesing] comment system regression` | Manually verify iOS thread indentation, organizer tag color (#FF5900), Thai relative time precision, and edit/delete menu behavior. | Planned | — |  |
|  |  |  | Sub-task | `[QA][Manual tesing][Mobile (Android) tesing] comment system regression` | Manually verify Android threading, @mention typeahead picker, and auto-mention insertion on reply. | Planned | — |  |

## Execution Notes

- Parent QA tasks should be created for all `43` stories first so scope and ownership are visible early.
- Manual-only or manual-heavy stories to schedule late in the cycle with physical device availability:
  - `PP-13`
  - `PP-35`
  - `PP-36`
  - `PP-122`
- Stories that benefit from API-assisted assertions or seed data should reserve backend test-data support up front:
  - `ORG-AUTH`
  - `PP-4`
  - `PP-51`
  - `PP-61`
  - `PP-65`
  - `PP-105`
  - `PP-201`
  - `PP-231`
  - `PP-235`
  - `PP-236`
  - `PP-237`
  - `PP-244`
  - `PP-296`
  - `PP-302`
  - `PP-303`
  - `PP-304`
  - `PP-317`
  - `PP-318`
  - `PP-342`
  - `PP-445`
- URGENT stories with no QA coverage but already Ready To Test STG — prioritize immediately:
  - `PP-237`: Event Detail excluding comment (all subtasks PP-238–PP-243 Ready To Test STG)
  - `PP-296`: View Who's Registered Event (subtasks PP-335–PP-336 Ready To Test STG)
- New stories with BE APIs already deployed to STG — unblock after design review:
  - `PP-302`, `PP-303`, `PP-304`: Your Vibes Quiz/Results/Profile (BE ready-to-deploy STG)
  - `PP-317`: Vibe Scoring Engine (BE Review Code)
- New stories with significant scope that need early test-data seeding:
  - `PP-342`: Story Poppa — needs friend relationships and 24h-expiry clock manipulation
  - `PP-449`: Post Poppa — needs gallery/video media and draft state seeding
  - `PP-445`: Comment on Running Event — needs threaded comment data and organizer accounts
- `PP-317` (Vibe Scoring Engine) is backend-only; QA sub-tasks are API/unit assertions without mobile automation
- `PP-337` and `PP-445` are Wave 5 future stories; do not schedule until Wave 4 regression is underway
- Existing design-to-Jira mapping is not always one-to-one:
  - `PP-2.design.md` maps to Jira `PP-10`
  - `PP-3.design.md` maps to Jira `PP-11`
  - `PP-122.design.md` maps to Jira `PP-125`
  - `PP-209.design.md` maps to Jira `PP-213`
  - `PP-227.design.md` maps to Jira `PP-245`
  - `PP-228.design.md` maps to Jira `PP-280`
  - `PP-231.design.md` maps to Jira `PP-155`
  - `PP-234.design.md` maps to Jira `PP-157`
