# ORG-AUTH · Organizer Auth API — Test Design

> Endpoint source → [src/endpoints/organizer.endpoint.ts](../endpoints/organizer.endpoint.ts)
> Test file location → `src/test/api/ORG-AUTH.api.spec.ts`

**Scope:** `POST /api/v1/organizer/auth/login` only
**Framework:** Playwright `APIRequestContext` (TypeScript)
**Version:** ▲1 — 2026-05-07

---

## Endpoint Contract

### `POST /api/v1/organizer/auth/login`

**Request body** (required, `additionalProperties: false`):

| Field | Type | Constraint | Required |
|---|---|---|---|
| `email` | string | format: email | ✅ |
| `password` | string | minLength: 8 | ✅ |

**Responses:**

| Status | Fields | Required |
|---|---|---|
| 200 | `accessToken` (string), `refreshToken` (string), `expiresIn` (number), `tokenType` (enum: `"Bearer"`) | accessToken, refreshToken, expiresIn |
| 401 | `error` (string), `message` (string) | error, message |

> ⚠️ **Not specified in contract:** `400` response body shape — assumed standard `{ error, message }` based on `createEvent` pattern in same file.
> ⚠️ **Out of scope (not defined in organizer.endpoint.ts):** refresh token endpoint, logout endpoint.

---

## A. Technique Selection

| Module | Technique | Rationale |
|---|---|---|
| Login — valid credentials | Scenario Testing | Single happy path; verify full 200 response contract |
| Login — auth failures | Error Guessing + EP | Wrong password vs unregistered email — same 401, no enumeration leakage |
| Login — schema validation | EP + BVA | Required fields, email format, password minLength boundary |
| Login — extra fields | Error Guessing | `additionalProperties: false` constraint |

---

## B. Coverage Summary

| Group | Technique | TCs | Risk | Confidence |
|---|---|---|---|---|
| Happy path — 200 | Scenario | OA-TC-001 | High | 98% |
| Auth failures — 401 | EP + Error Guessing | OA-TC-002, OA-TC-003 | High | 95% |
| Schema validation — 400 | EP + BVA | OA-TC-004 – OA-TC-008 | High | 85% * |
| **Total** | | **10** | | |

*400 status not explicitly defined in endpoint contract — assumed standard validation behavior.

---

## Test Design Table

| Test Case ID | Automatable | Module | Summary | Objective | Preconditions | Priority | Labels | Test Type | Step # | Test Step | Expected Result | Automation Type | Remarked |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| OA-TC-001 | ⏳ Pending | Login | POST login — valid credentials → 200 + token contract | Verify 200 response with complete token shape when credentials are correct | Valid organizer account in STG; `ORGANIZER_EMAIL` / `ORGANIZER_PASSWORD` set | High | smoke, api | API | 1 | Send `POST /api/v1/organizer/auth/login` with `{ email: "<valid>", password: "<valid>" }` | Response status 200 | api | |
| | | | | | | | | | 2 | Assert `accessToken` in response body | `accessToken` is a non-empty string | | |
| | | | | | | | | | 3 | Assert `refreshToken` in response body | `refreshToken` is a non-empty string | | |
| | | | | | | | | | 4 | Assert `expiresIn` and `tokenType` | `expiresIn` is a number > 0; `tokenType` = `"Bearer"` | | |
| OA-TC-002 | ⏳ Pending | Login | POST login — wrong password → 401 + error shape | Verify 401 is returned with `error` + `message` fields on incorrect password | Valid organizer account exists in STG | High | negative, api, regression | API | 1 | Send `POST /api/v1/organizer/auth/login` with correct email + wrong password (valid format, wrong value) | Response status 401 | api | |
| | | | | | | | | | 2 | Assert response body shape | Body contains `error` (string) and `message` (string) | | |
| OA-TC-003 | ⏳ Pending | Login | POST login — unregistered email → 401 (no enumeration) | Verify unregistered email returns same 401 shape as wrong password — no info leakage | Unregistered email not in STG DB | High | negative, api, regression | API | 1 | Send `POST /api/v1/organizer/auth/login` with `{ email: "notexist@test.com", password: "ValidPass1!" }` | Response status 401 | api | Same status + shape as TC-002 — confirms no email enumeration |
| | | | | | | | | | 2 | Assert response body matches TC-002 shape | Body contains `error` (string) and `message` (string); no field reveals whether email exists | | |
| OA-TC-004 | ⏳ Pending | Login — Validation | POST login — missing email → 400 | Verify `email` is enforced as required | None | High | negative, ep, api, regression | API | 1 | Send `POST /api/v1/organizer/auth/login` with `{ password: "ValidPass1!" }` (no email field) | Response status 400 | api | `[ASSUMED 400]` — not explicitly defined in endpoint contract; assumed standard validation response |
| | | | | | | | | | 2 | Assert response body | Body contains `error` and/or `message` | | |
| OA-TC-005 | ⏳ Pending | Login — Validation | POST login — missing password → 400 | Verify `password` is enforced as required | None | High | negative, ep, api, regression | API | 1 | Send `POST /api/v1/organizer/auth/login` with `{ email: "valid@test.com" }` (no password field) | Response status 400 | api | `[ASSUMED 400]` |
| | | | | | | | | | 2 | Assert response body | Body contains `error` and/or `message` | | |
| OA-TC-006 | ⏳ Pending | Login — Validation | POST login — empty body → 400 | Verify both required fields are enforced together | None | Medium | negative, ep, api | API | 1 | Send `POST /api/v1/organizer/auth/login` with `{}` (empty object) | Response status 400 | api | `[ASSUMED 400]` |
| | | | | | | | | | 2 | Assert response body | Body contains error info for both missing fields | | |
| OA-TC-007 | ⏳ Pending | Login — Validation | POST login — invalid email format → 400 | Verify `email` format constraint rejects non-email strings | None | High | negative, ep, api, regression | API | 1 | Send `POST /api/v1/organizer/auth/login` with `{ email: "notanemail", password: "ValidPass1!" }` | Response status 400 | api | `[ASSUMED 400]` — `format: email` constraint |
| | | | | | | | | | 2 | Assert response body | Body contains error referencing email format | | |
| OA-TC-008 | ⏳ Pending | Login — Validation | POST login — password length BVA (7 chars → 400; 8 chars → 401) | Verify `minLength: 8` boundary: 7 chars fails schema; 8 chars passes schema (auth decides outcome) | None for 7-char; valid account for 8-char | High | negative, bva, boundary, api, regression | API | 1 | Send with `{ email: "valid@test.com", password: "Short1!" }` (7 chars) | Response status 400 — schema violation | api | Data-driven BVA: TC-008a (7 chars → 400), TC-008b (8 chars wrong pw → 401). Boundary is `minLength: 8`. |
| | | | | | | | | | 2 | Send with `{ email: "<valid account>", password: "Short1!x" }` (8 chars, wrong password) | Response status 401 — schema passes; auth fails | | |
| OA-TC-009 | ⏳ Pending | Login — Validation | POST login — extra field in body → 400 | Verify `additionalProperties: false` rejects extra keys | None | Medium | negative, api | API | 1 | Send `POST /api/v1/organizer/auth/login` with `{ email: "valid@test.com", password: "ValidPass1!", role: "admin" }` | Response status 400 | api | `[ASSUMED 400]` — `additionalProperties: false` on request schema |
| | | | | | | | | | 2 | Assert response body | Body contains error referencing unexpected field | | |

---

## C. Coverage Report

| Endpoint | Method | Cases | Auth 200 | Auth 401 | Validation 400 | Coverage |
|---|---|---|---|---|---|---|
| `/api/v1/organizer/auth/login` | POST | OA-TC-001 – 009 | ✅ | ✅ | ✅ (assumed) | Full |
| Refresh token | — | — | — | — | — | ❌ Not specified |
| Logout | — | — | — | — | — | ❌ Not specified |

---

## Test Data Requirements

| Data | Value / Source |
|---|---|
| Valid organizer account | STG account; `ORGANIZER_EMAIL` / `ORGANIZER_PASSWORD` env vars |
| Unregistered email | Any email not in STG DB; e.g. `nonexistent-${Date.now()}@test.com` |
| Wrong password (valid format) | Any 8+ char string that is not the correct password |
| 7-char password string | e.g. `"Short1!"` — must have ≥ 1 letter + number to isolate length failure only |
| 8-char wrong password | e.g. `"Short1!x"` — valid schema, wrong credentials |

---

## Automation Notes

- **Framework:** Playwright `APIRequestContext` — `test('...', async ({ request }) => { ... })`
- **Base URL:** `config.organizer.apiBaseUrl` (from `playwright.config.ts` project `api`)
- **Auth header:** Not required for login endpoint (it IS the auth endpoint)
- **All cases:** ⏳ Pending — none implemented yet
- **BVA TC-008:** Implement as data-driven `for...of` with `[{ chars: 7, expected: 400 }, { chars: 8, expected: 401 }]`
- **TC-003 enumeration check:** Assert body shape only — do NOT assert that error message differs between wrong-password and unknown-email cases
- **Missing endpoint coverage:** Refresh token + logout for organizer are `[NOT SPECIFIED]` — flag for backend team confirmation before implementing
