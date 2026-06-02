# PP-4 · [BO][Organizer] Register & Login — Test Design

> Requirements → [PP-4_Agency_Register_Login.md](../requirements/PP-4_Agency_Register_Login.md)
> Flow Diagram → [PP-4.diagram.md](./PP-4.diagram.md)
> Jira → [PP-4](https://7-solutions.atlassian.net/browse/PP-4)

**Platform:** Web (Desktop, Chrome / Safari, 1280px+)
**Framework:** Playwright (TypeScript)
**App:** POPPA Back-Office (BO) — Organizer Portal
**Version:** ▲2 — 2026-05-07: Automation status updated (TC-001–019, TC-041 passing on STG)

---

## A. Technique Selection

| Module | Technique | Rationale |
|---|---|---|
| Registration Wizard (3 steps) | State Transition | Linear 3-step wizard; each step has discrete validation and navigation state |
| Register Step 1 — Field Validation | EP | Required fields: displayName, firstName, lastName, DOB, phone. One TC per required field. |
| Register Step 2 — Password Rules | EP + BVA | 3 independent password rules + BVA at length boundary. Each rule = one TC. |
| Profile — Type Selection | State Transition | /profile → select type → ถัดไป → /profile/individual or /profile/corporate |
| Profile — Identity Verification | State Transition | 4-section form → submit → PENDING_SUBMISSION lifecycle |
| Form Validation — National ID / Tax ID | EP + BVA | Valid 13-digit vs short/long/non-numeric. BVA at 12/13/14 digit boundaries. |
| File Upload | EP + BVA | Valid types (PDF/JPG/PNG) vs invalid. BVA on 10MB boundary. |
| Secure Storage | Checklist | Private Bucket must not expose public URL. |
| Verification Status | State Transition | Pending / Approved / Rejected with defined transitions. |
| Login & RBAC | Decision Table | Status × page access = 3 rows with distinct outcomes. |
| Re-submission | State Transition | Rejected → edit → Re-submit → Pending. |
| Edge Cases | Error Guessing | Double submission (idempotency), draft save. |

---

## B. Coverage Summary

| Module | Technique | TCs | Risk | Confidence |
|---|---|---|---|---|
| Registration — Step 1/3 happy path | State Transition | PP4-TC-001 | High | 95% |
| Registration — Step 1/3 required fields (×5) | EP | PP4-TC-002–006 | High | 97% |
| Registration — Step 1/3 phone format | EP | PP4-TC-007 | High | 97% |
| Registration — Step 2/3 happy path | State Transition | PP4-TC-008 | High | 95% |
| Registration — Step 2/3 email required | EP | PP4-TC-009 | High | 97% |
| Registration — Step 2/3 password rules (×3) + confirm mismatch + duplicate | EP + BVA | PP4-TC-010–014 | High | 97% |
| Registration — Step 3/3 page + resend | Checklist | PP4-TC-015–016 | Medium | 93% |
| Profile — type selection | State Transition | PP4-TC-017–019 | High | 95% |
| Profile — Individual happy path | State Transition | PP4-TC-020 | High | 90% |
| Profile — Individual form validation | EP + BVA | PP4-TC-021–023 | High | 97% |
| Profile — Individual file upload (valid: PDF, JPG, PNG, 10MB BVA) | EP + BVA | PP4-TC-024–027 | High | 97% |
| Profile — Individual file upload (invalid: oversized, .exe, .docx) | EP + BVA | PP4-TC-028–030 | High | 97% |
| Profile — Individual drag & drop + corrupted file | Error Guessing | PP4-TC-031–032 | Medium | 95% |
| Secure Storage — no public URL | Checklist | PP4-TC-033 | High | 97% |
| Profile — Corporate happy path | State Transition | PP4-TC-034 | High | 90% |
| Profile — Corporate Tax ID validation | EP + BVA | PP4-TC-035 | High | 97% |
| Profile — Corporate backend bypass | EP | PP4-TC-036 | High | 95% |
| Login — Approved / Pending / Rejected | Decision Table | PP4-TC-037–039 | High | 97% |
| RBAC — Pending + Unauthenticated direct URL | Decision Table | PP4-TC-040–041 | High | 97% |
| Re-submission after rejection | State Transition | PP4-TC-042 | High | 97% |
| Edge Cases — idempotency + draft | Error Guessing | PP4-TC-043–044 | Medium | 95% |
| **Total** | | **44** | | |

---

## Test Design Table

| Test Case ID | Automatable | Module | Summary | Objective | Preconditions | Priority | Labels | Test Type | Step # | Test Step | Expected Result | Automation Type | Remarked |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PP4-TC-001 | ✅ Automated | Registration — Step 1/3 | Registration — Step 1/3: happy path (all valid → ถัดไป → /register/account) | Verify Step 1 form accepts valid data and transitions to Step 2 | No existing account; `/register` open | High | smoke, state-transition, web-ui | Functional | 1 | Navigate to `/register` | Step 1 shown: displayName, firstName, lastName, DOB, phone fields; ถัดไป button visible | web-ui | Replaces old PP4-TC-001 step 1–3 ▲1 |
|  |  |  |  |  |  |  |  |  | 2 | Fill displayName = "QA Test Organizer"; firstName = "สมชาย"; lastName = "ทดสอบ"; select DOB (Thai month + BE year); phone = "0812345678" | All fields accepted; no validation errors shown |  |  |
|  |  |  |  |  |  |  |  |  | 3 | Click "ถัดไป" | URL = `/register/account`; Step 2 form shown (email, password, confirm password) |  |  |
| PP4-TC-002 | ✅ Automated | Registration — Step 1/3 | Registration — Step 1/3: displayName required | Verify displayName is a required field; clicking ถัดไป without it shows กรุณากรอกชื่อผู้ใช้งาน | `/register` open; all fields except displayName filled | High | negative, ep, web-ui | Negative | 1 | Leave displayName blank; fill firstName, lastName, DOB, phone | Other fields accepted | web-ui |  |
|  |  |  |  |  |  |  |  |  | 2 | Click "ถัดไป" | Form stays on Step 1; "กรุณากรอกชื่อผู้ใช้งาน" shown under displayName |  |  |
| PP4-TC-003 | ✅ Automated | Registration — Step 1/3 | Registration — Step 1/3: firstName required | Verify firstName is required | `/register` open; all fields except firstName filled | High | negative, ep, web-ui | Negative | 1 | Leave firstName blank; fill all other fields; click "ถัดไป" | "กรุณากรอกชื่อ" shown; form stays on Step 1 | web-ui |  |
| PP4-TC-004 | ✅ Automated | Registration — Step 1/3 | Registration — Step 1/3: lastName required | Verify lastName is required | `/register` open; all fields except lastName filled | High | negative, ep, web-ui | Negative | 1 | Leave lastName blank; fill all other fields; click "ถัดไป" | "กรุณากรอกนามสกุล" shown; form stays on Step 1 | web-ui |  |
| PP4-TC-005 | ✅ Automated | Registration — Step 1/3 | Registration — Step 1/3: DOB required | Verify DOB is required | `/register` open; all text fields filled; DOB not selected | High | negative, ep, web-ui | Negative | 1 | Fill displayName, firstName, lastName, phone; leave DOB unset; click "ถัดไป" | "กรุณาเลือกวันเดือนปีเกิด" shown; form stays on Step 1 | web-ui |  |
| PP4-TC-006 | ✅ Automated | Registration — Step 1/3 | Registration — Step 1/3: phone required | Verify phone is required | `/register` open; all fields except phone filled | High | negative, ep, web-ui | Negative | 1 | Leave phone blank; fill all other fields; click "ถัดไป" | "กรุณากรอกเบอร์โทร" shown; form stays on Step 1 | web-ui |  |
| PP4-TC-007 | ✅ Automated | Registration — Step 1/3 | Registration — Step 1/3: phone invalid format | Verify invalid phone format is rejected with inline error | `/register` open | High | negative, ep, web-ui | Negative | 1 | Enter invalid phone (e.g. "abc123" or wrong digit count) in Phone field | Inline validation error shown | web-ui |  |
|  |  |  |  |  |  |  |  |  | 2 | Correct to valid local phone number (e.g. "0812345678") | Error clears; field accepted |  |  |
| PP4-TC-008 | ✅ Automated | Registration — Step 2/3 | Registration — Step 2/3: happy path (valid email + password → ถัดไป → /register/verify) | Verify Step 2 accepts valid credentials and transitions to Step 3 | `/register/account` open (Step 2) | High | smoke, state-transition, web-ui | Functional | 1 | Enter unique valid email; enter password ≥8 chars with at least one letter and one digit; enter matching confirm password | Password requirement indicators all satisfied; confirm shows match | web-ui | Replaces old PP4-TC-001 step 4–5 ▲1; Step 1 traversal required in automation (backend session) |
|  |  |  |  |  |  |  |  |  | 2 | Click "ถัดไป" | URL = `/register/verify`; Step 3 shown |  |  |
| PP4-TC-009 | ✅ Automated | Registration — Step 2/3 | Registration — Step 2/3: email required | Verify email is required in Step 2 | `/register/account` open; password fields filled | High | negative, ep, web-ui | Negative | 1 | Leave email blank; fill valid password + confirm; click "ถัดไป" | Email required error shown; form stays on Step 2 | web-ui |  |
| PP4-TC-010 | ✅ Automated | Registration — Step 2/3 | Registration — Step 2/3: password too short (< 8 chars, BVA) | Verify 7-char password fails length rule; 8-char satisfies it | `/register/account` open; valid email entered | High | negative, ep, bva, web-ui | Boundary | 1 | Enter 7-character password | "อย่างน้อย 8 ตัวอักษร" requirement shown as unsatisfied | web-ui | Implemented as data-driven: TC-010a (7 chars → false), TC-010b (8 chars → true) |
|  |  |  |  |  |  |  |  |  | 2 | Add one more character (8 total) | Length requirement satisfied |  |  |
| PP4-TC-011 | ✅ Automated | Registration — Step 2/3 | Registration — Step 2/3: password no letter (rule 2 unmet) | Verify digits-only password fails letter requirement | `/register/account` open | High | negative, ep, web-ui | Negative | 1 | Enter digits-only password e.g. "12345678" | "ต้องมีตัวอักษร (a-z)" shown as unsatisfied | web-ui |  |
| PP4-TC-012 | ✅ Automated | Registration — Step 2/3 | Registration — Step 2/3: password no digit (rule 3 unmet) | Verify letters-only password fails digit requirement | `/register/account` open | High | negative, ep, web-ui | Negative | 1 | Enter letters-only password e.g. "abcdefgh" | "ต้องมีตัวเลข (0-9)" shown as unsatisfied | web-ui |  |
| PP4-TC-013 | ✅ Automated | Registration — Step 2/3 | Registration — Step 2/3: confirm password mismatch | Verify mismatch between password and confirm is rejected | `/register/account` open; valid password entered | High | negative, ep, web-ui | Negative | 1 | Enter different value in confirm password field | Mismatch error shown under confirm password | web-ui |  |
|  |  |  |  |  |  |  |  |  | 2 | Correct confirm to match password | Error clears; form can proceed |  |  |
| PP4-TC-014 | ✅ Automated | Registration — Step 2/3 | Registration — Step 2/3: duplicate email rejected | Verify already-registered email is rejected | `/register/account` open; target email already exists in DB | High | negative, ep, web-ui | Negative | 1 | Enter already-registered email + valid password + matching confirm; click "ถัดไป" | Error shown: email already registered; form stays on Step 2 | web-ui | Error message confirmed: "ลงทะเบียนไม่สำเร็จ"; Step 1 traversal required in automation |
| PP4-TC-015 | ✅ Automated | Registration — Step 3/3 | Registration — Step 3/3: verify page shown (URL + resend button visible) | Verify Step 3 page loads with correct URL and resend button | `/register/verify` open (after completing Step 2) | Medium | smoke, web-ui | Functional | 1 | Observe `/register/verify` page | URL = `/register/verify`; email confirmation message shown; "ส่งใหม่อีกครั้ง" button visible | web-ui |  |
| PP4-TC-016 | ✅ Automated | Registration — Step 3/3 | Registration — Step 3/3: resend email → feedback shown | Verify resend button triggers resend action with user feedback | `/register/verify` page shown | Medium | web-ui | Functional | 1 | Click "ส่งใหม่อีกครั้ง" | Button shows loading or success feedback; no error shown | web-ui |  |
| PP4-TC-017 | ✅ Automated | Profile — Type Selection | Profile — type selection page shown after login | Verify /profile shows the Individual / Corporate type selection | Logged-in account; navigate to `/profile` | High | smoke, web-ui | Functional | 1 | Navigate to `/profile` | Type selection shown: "บุคคลทั่วไป" and "องค์กร / บริษัท" radio cards; ถัดไป button visible | web-ui |  |
| PP4-TC-018 | ✅ Automated | Profile — Type Selection | Profile — select Individual → ถัดไป → /profile/individual shown | Verify selecting Individual and clicking ถัดไป navigates to Individual form | On `/profile` type selection | High | smoke, state-transition, web-ui | Functional | 1 | Click "บุคคลทั่วไป" radio card | Card highlighted / selected | web-ui | Replaces old PP4-TC-002 step 1–2 ▲1 |
|  |  |  |  |  |  |  |  |  | 2 | Click "ถัดไป" | URL = `/profile/individual`; 4-section form shown (ข้อมูลทั่วไป · ข้อมูลที่อยู่ · เอกสารสำคัญ · ข้อมูลบัญชีธนาคาร) |  |  |
| PP4-TC-019 | ✅ Automated | Profile — Type Selection | Profile — select Corporate → ถัดไป → /profile/organize shown | Verify selecting Corporate navigates to Corporate form | On `/profile` type selection | High | state-transition, web-ui | Functional | 1 | Click "องค์กร / บริษัท" radio card | Card selected | web-ui | Replaces old PP4-TC-036 step 1–2 ▲1; URL corrected to /profile/organize ▲2 |
|  |  |  |  |  |  |  |  |  | 2 | Click "ถัดไป" | URL = `/profile/organize`; Corporate form shown |  |  |
| PP4-TC-020 | ⏳ Pending | Profile — Individual | Profile Individual — happy path: fill all sections → submit → PENDING_SUBMISSION | Verify complete Individual profile submission changes status to PENDING_SUBMISSION | Logged in; on `/profile/individual`; account not yet submitted | High | smoke, state-transition, web-ui | Functional | 1 | Fill ข้อมูลทั่วไป: name, DOB, phone, valid 13-digit National ID | All fields accepted; no errors | web-ui | Replaces old PP4-TC-002 step 3–8 ▲1 |
|  |  |  |  |  |  |  |  |  | 2 | Fill ข้อมูลที่อยู่: address, province, district, sub-district, postal code | Fields accepted |  |  |
|  |  |  |  |  |  |  |  |  | 3 | Upload documents: ID card front, ID card back, photo with ID card, house registration (valid JPG/PDF ≤ 10MB each) via drag & drop | Files accepted; upload begins; progress shown |  |  |
|  |  |  |  |  |  |  |  |  | 4 | Fill ข้อมูลบัญชีธนาคาร: account name, account number, bank name, branch; upload bank book image | Fields accepted |  |  |
|  |  |  |  |  |  |  |  |  | 5 | Click Submit | Status = PENDING_SUBMISSION; verification banner on home page shows "รอยื่นเอกสาร" / "รอการตรวจสอบ" |  |  |
| PP4-TC-021 | ⏳ Pending | Profile — Individual | Profile Individual — National ID 12 digits rejected (BVA lower boundary) | Verify 12-digit National ID fails validation; adding one digit clears error | On `/profile/individual`; ข้อมูลทั่วไป section | High | negative, ep, bva, web-ui | Boundary | 1 | Enter 12-digit number in National ID field | Inline validation error shown | web-ui |  |
|  |  |  |  |  |  |  |  |  | 2 | Add one more digit (13 total) | Error clears; field accepted |  |  |
| PP4-TC-022 | ⏳ Pending | Profile — Individual | Profile Individual — National ID non-numeric rejected | Verify alphanumeric input in National ID field fails | On `/profile/individual`; ข้อมูลทั่วไป section | High | negative, ep, web-ui | Negative | 1 | Enter alphanumeric string e.g. "12345ABCD8901" in National ID field | Inline validation error shown | web-ui |  |
| PP4-TC-023 | ⏳ Pending | Profile — Individual | Profile Individual — required fields empty → submit blocked | Verify form cannot be submitted with blank required fields | On `/profile/individual`; all fields blank | High | negative, ep, web-ui | Negative | 1 | Leave all required fields blank; click Submit | Form blocked; required field errors shown | web-ui |  |
| PP4-TC-024 | ⏳ Pending | Profile — Individual | Profile Individual — valid PDF (5MB) upload accepted | Verify valid PDF within size limit is accepted | On `/profile/individual`; document upload section | High | ep, web-ui | Functional | 1 | Upload a 5MB PDF to document upload slot | File accepted; upload to Private Bucket begins | web-ui |  |
| PP4-TC-025 | ⏳ Pending | Profile — Individual | Profile Individual — valid JPG (3MB) upload accepted | Verify JPG file type is accepted | On `/profile/individual`; document upload section | High | ep, web-ui | Functional | 1 | Upload a 3MB JPG to document upload slot | File accepted and uploaded | web-ui |  |
| PP4-TC-026 | ⏳ Pending | Profile — Individual | Profile Individual — valid PNG (8MB) upload accepted | Verify PNG file type is accepted | On `/profile/individual`; document upload section | High | ep, web-ui | Functional | 1 | Upload an 8MB PNG to document upload slot | File accepted and uploaded | web-ui |  |
| PP4-TC-027 | ⏳ Pending | Profile — Individual | Profile Individual — file exactly 10MB accepted (BVA max boundary) | Verify 10MB is the valid upper boundary | On `/profile/individual`; document upload section | High | bva, boundary, web-ui | Boundary | 1 | Upload a file of exactly 10MB | File accepted; no size error | web-ui |  |
| PP4-TC-028 | ⏳ Pending | Profile — Individual | Profile Individual — file > 10MB rejected (BVA over boundary) | Verify file exceeding 10MB is rejected with size error | On `/profile/individual`; document upload section | High | negative, bva, boundary, web-ui | Boundary | 1 | Upload a 15MB PDF | Error shown: file too large (max 10MB); upload does not proceed | web-ui |  |
| PP4-TC-029 | ⏳ Pending | Profile — Individual | Profile Individual — .exe file type rejected | Verify executable file type is blocked | On `/profile/individual`; document upload section | High | negative, ep, web-ui | Negative | 1 | Attempt to upload a .exe file | Error shown: invalid file type; upload does not proceed | web-ui |  |
| PP4-TC-030 | ⏳ Pending | Profile — Individual | Profile Individual — .docx file type rejected | Verify Word document type is blocked | On `/profile/individual`; document upload section | High | negative, ep, web-ui | Negative | 1 | Attempt to upload a .docx file | Error shown: invalid file type | web-ui |  |
| PP4-TC-031 | ⏳ Pending | Profile — Individual | Profile Individual — drag & drop upload accepted | Verify drag & drop is the supported upload interaction | On `/profile/individual`; valid file ready | Medium | web-ui | Functional | 1 | Drag a valid PDF and drop it onto the upload drop zone | File accepted; upload begins | web-ui |  |
| PP4-TC-032 | ⏳ Pending | Profile — Individual | Profile Individual — corrupted file → backend returns 400 | Verify backend detects and rejects a corrupted file | On `/profile/individual`; corrupted PDF prepared in `assets/fixtures/upload/corrupted.pdf` | Medium | error-guessing, web-ui | Negative | 1 | Upload corrupted PDF | File passes frontend type + size check | web-ui, api | Frontend cannot detect corruption; verify via API response or UI error |
|  |  |  |  |  |  |  |  |  | 2 | Observe server response | Backend returns 400; UI shows upload error message |  |  |
| PP4-TC-033 | ❌ Manual | Secure Storage | Secure Storage — uploaded file not publicly accessible | Verify files in Private Bucket have no public HTTP access | Profile submission completed; file uploaded; storage URL retrieved | High | security, manual | Functional | 1 | Complete profile with valid file; retrieve the file's storage bucket URL | File stored in Private Bucket | — | Requires direct HTTP request to bucket URL; manual or via API |
|  |  |  |  |  |  |  |  |  | 2 | Attempt to access file via direct storage URL | HTTP 403 Forbidden or Access Denied — file not public |  |  |
| PP4-TC-034 | ⏳ Pending | Profile — Corporate | Profile Corporate — happy path: fill all sections → submit → PENDING_SUBMISSION | Verify Corporate profile submission changes status to PENDING_SUBMISSION | Logged in; on `/profile/corporate`; account not yet submitted | High | smoke, state-transition, web-ui | Functional | 1 | Fill ข้อมูลทั่วไป: company name, branch, valid 13-digit Tax ID, contact phone/email | Fields accepted; no errors | web-ui | Replaces old PP4-TC-036 step 3–8 ▲1 |
|  |  |  |  |  |  |  |  |  | 2 | Fill ข้อมูลที่อยู่: address, province, district, sub-district, postal code | Accepted |  |  |
|  |  |  |  |  |  |  |  |  | 3 | Upload documents: DBD certificate (PDF/JPG/PNG ≤ 10MB); contact ID card | Files accepted; upload begins |  |  |
|  |  |  |  |  |  |  |  |  | 4 | Fill ข้อมูลบัญชีธนาคาร: account name/number, bank name, branch; upload bank book | Accepted |  |  |
|  |  |  |  |  |  |  |  |  | 5 | Click Submit | Status = PENDING_SUBMISSION; verification banner shown |  |  |
| PP4-TC-035 | ⏳ Pending | Profile — Corporate | Profile Corporate — Tax ID invalid (< 13 digits) rejected | Verify < 13-digit Tax ID fails validation; correcting to 13 clears error | On `/profile/corporate`; ข้อมูลทั่วไป section | High | negative, ep, bva, web-ui | Boundary | 1 | Enter 10-digit number in Tax ID field | Inline validation error shown | web-ui |  |
|  |  |  |  |  |  |  |  |  | 2 | Correct to 13-digit Tax ID | Error clears; field accepted |  |  |
| PP4-TC-036 | ⏳ Pending | Profile — Corporate | Profile Corporate — backend Tax ID bypass → API 400 | Verify backend validates Tax ID even if frontend is bypassed | API accessible directly | High | negative, api | Negative | 1 | Send profile payload with invalid Tax ID directly to API (bypass frontend) | Backend returns 400 with field-level error | api | Direct API call; not automatable via UI alone |
| PP4-TC-037 | ⏳ Pending | Login & RBAC | Login — Approved Organizer → BO Dashboard shown | Verify Approved Organizer accesses Dashboard with full menu | Account with status = Approved | High | smoke, decision-table, web-ui | Functional | 1 | Login with valid credentials of Approved Organizer | Authentication succeeds; status = Approved | web-ui |  |
|  |  |  |  |  |  |  |  |  | 2 | Observe navigation | BO Dashboard shown; "Create Event" menu accessible |  |  |
| PP4-TC-038 | ⏳ Pending | Login & RBAC | Login — Pending Organizer → home + verification banner | Verify Pending Organizer sees verification banner; Create Event restricted | Account with status = Pending (PENDING_SUBMISSION) | High | decision-table, web-ui | Functional | 1 | Login with valid credentials of Pending Organizer | Authentication succeeds; status = Pending | web-ui |  |
|  |  |  |  |  |  |  |  |  | 2 | Observe navigation | Home shown; verification banner visible; Create Event restricted |  |  |
| PP4-TC-039 | ⏳ Pending | Login & RBAC | Login — Rejected Organizer → rejection reason + Re-submit visible | Verify Rejected Organizer sees rejection reason and Re-submit button | Account with status = Rejected; Admin rejection comment exists | High | decision-table, web-ui | Functional | 1 | Login with valid credentials of Rejected Organizer | Authentication succeeds; status = Rejected | web-ui |  |
|  |  |  |  |  |  |  |  |  | 2 | Observe page | Rejection reason (Admin comment) shown; Re-submit button visible |  |  |
| PP4-TC-040 | ⏳ Pending | RBAC Guard | RBAC — Pending Organizer direct `/event/create` → blocked | Verify RBAC guard prevents Pending Organizer from accessing protected route via direct URL | Logged in as Pending Organizer | High | decision-table, negative, web-ui | Negative | 1 | Manually navigate to `/event/create` | RBAC guard intercepts; page does not load | web-ui | `/dashboard` returns 404; use `/event/create` as confirmed protected route |
|  |  |  |  |  |  |  |  |  | 2 | Observe navigation | Redirected to login or home |  |  |
| PP4-TC-041 | ✅ Automated | RBAC Guard | RBAC — Unauthenticated direct `/event/create` → redirect to `/login` | Verify unauthenticated user cannot access protected route | Not logged in | High | decision-table, negative, web-ui | Negative | 1 | Navigate to `/event/create` without logging in | RBAC guard intercepts | web-ui |  |
|  |  |  |  |  |  |  |  |  | 2 | Observe navigation | Redirected to `/login` |  |  |
| PP4-TC-042 | ⏳ Pending | Re-submission | Re-submit after rejection → status returns to Pending | Verify Re-submit flow changes status from Rejected back to Pending | Account with status = Rejected; on Rejection page | High | smoke, state-transition, web-ui | Functional | 1 | Edit info or re-upload document; click Re-submit | Submission sent; status = Pending | web-ui |  |
|  |  |  |  |  |  |  |  |  | 2 | Observe verification banner | Banner updated to "รอการตรวจสอบ" |  |  |
| PP4-TC-043 | ⏳ Pending | Edge Cases | Double submit — idempotency guard prevents duplicate records | Verify rapid Submit clicks create only one record in DB | Profile form filled; large upload in progress | Medium | error-guessing, web-ui | Functional | 1 | Click Submit rapidly multiple times while large file uploads | Only one submission created; Submit button disabled after first click | web-ui, api | UI disable assertion automatable; DB duplicate check requires API call |
|  |  |  |  |  |  |  |  |  | 2 | Verify via API | Exactly one Organizer record exists for this submission |  |  |
| PP4-TC-044 | ❌ Manual | Edge Cases | Draft saved on browser close — data restored on return | Verify partially filled form is saved and restored after browser close | Registration form partially filled | Medium | error-guessing, manual | Functional | 1 | Fill partial registration form; close browser tab | Draft saved automatically | — | Confirmed: system saves draft (Ton, 2026-04-29); not automatable without deep session control |
|  |  |  |  |  |  |  |  |  | 2 | Reopen browser; navigate to `/register` | Previously entered data restored |  |  |

---

## C. Diagram Coverage Mapping

### Registration Wizard (Observed STG — from diagram 3.2)

| Ref ID | Type | Label | Covered By TC | Status |
|---|---|---|---|---|
| SR1 | State | `/register` Step 1 — User Info form | PP4-TC-001–007 | Covered |
| SR2 | State | Step 1 validation errors shown | PP4-TC-002–007 | Covered |
| SR3 | State | `/register/account` Step 2 — Account form | PP4-TC-008–014 | Covered |
| SR4 | State | Step 2 password requirements indicator | PP4-TC-010–012 | Covered |
| SR5 | State | Step 2 confirm mismatch error | PP4-TC-013 | Covered |
| SR6 | State | `/register/verify` Step 3 — Email verify | PP4-TC-015–016 | Covered |
| TR1 | Transition | Step 1 valid → Step 2 | PP4-TC-001 | Covered |
| TR2 | Transition | Step 1 invalid → stay + errors | PP4-TC-002–007 | Covered |
| TR3 | Transition | Step 2 back → Step 1 | — | Not covered (low risk; not in acceptance criteria) |
| TR4 | Transition | Step 2 valid → Step 3 | PP4-TC-008 | Covered |
| TR5 | Transition | Step 2 invalid → stay | PP4-TC-009–014 | Covered |
| TR6 | Transition | Step 3 resend → stay | PP4-TC-016 | Covered |

### Profile — Type Selection + Identity Verification

| Ref ID | Type | Label | Covered By TC | Status |
|---|---|---|---|---|
| SP0 | State | `/profile` type selection | PP4-TC-017–019 | Covered |
| SP1 | Transition | Select Individual → `/profile/individual` | PP4-TC-018 | Covered |
| SP2 | Transition | Select Corporate → `/profile/corporate` | PP4-TC-019 | Covered |
| SP3 | State | `/profile/individual` 4-section form | PP4-TC-020–032 | Covered |
| SP4 | State | `/profile/corporate` 4-section form | PP4-TC-034–036 | Covered |
| SP5 | State | VERIFICATION_STATUS_PENDING_SUBMISSION | PP4-TC-020, PP4-TC-034 | Covered |
| TP1 | Transition | Profile Individual submit valid → Pending | PP4-TC-020 | Covered |
| TP2 | Transition | Profile Corporate submit valid → Pending | PP4-TC-034 | Covered |
| TP3 | Transition | Profile submit invalid → stay + errors | PP4-TC-021–023, PP4-TC-035 | Covered |

### Verification Status & Login & RBAC

| Ref ID | Type | Label | Covered By TC | Status |
|---|---|---|---|---|
| S18 | State | Pending | PP4-TC-020, PP4-TC-038, PP4-TC-042 | Covered |
| S19 | State | Approved | PP4-TC-037 | Covered |
| S20 | State | Rejected (with comment) | PP4-TC-039 | Covered |
| S21 | State | Re-submit Form | PP4-TC-042 | Covered |
| T16 | Transition | Admin approves → Approved | PP4-TC-037 | Covered |
| T17 | Transition | Admin rejects → Rejected | PP4-TC-039 | Covered |
| T18 | Transition | Organizer re-submits → Pending | PP4-TC-042 | Covered |
| T19 | Transition | Login → status check | PP4-TC-037–039 | Covered |
| T20 | Transition | Pending → home + banner | PP4-TC-038, PP4-TC-040 | Covered |
| T21 | Transition | Rejected → rejection page | PP4-TC-039 | Covered |
| T22 | Transition | Approved → Dashboard | PP4-TC-037 | Covered |
| T23 | Transition | RBAC Pending — direct URL blocked | PP4-TC-040 | Covered |
| T24 | Transition | RBAC Unauthenticated — direct URL → /login | PP4-TC-041 | Covered |

### Coverage Report

```
Registration Wizard (SR1–SR6 + TR1–TR6):  all covered; one gap TR3 (Step 2 back — low risk)
Profile Type Selection + Forms (SP0–SP5, TP1–TP3):  all covered
Verification Status + Login + RBAC:  all covered

Total TCs:       44
Yes (automatable): 37
Partial:            4  (PP4-TC-032, PP4-TC-036, PP4-TC-043 + 1 shared)
Manual only:        2  (PP4-TC-033, PP4-TC-044)

Overall: 100% of requirement states and transitions covered.
One open gap: Step 2 back-navigation (TR3) — low risk, excluded from PP-4 acceptance criteria.
```

---

## Test Data Requirements

| Data | Value / Source |
|---|---|
| Organizer account — new (registration) | Unregistered unique email; use `qa+pp4-tc001-{timestamp}@7solutions.co.th` pattern |
| Organizer account — profile not yet submitted | Registered + email verified; no identity docs submitted; use `config.organizer.email` |
| Organizer account — Status = Approved | Pre-approved account in STG DB |
| Organizer account — Status = Pending | Pre-registered; docs submitted; awaiting admin approval |
| Organizer account — Status = Rejected | Pre-rejected account with Admin comment in STG DB |
| Organizer account — duplicate email | Existing registered email for PP4-TC-014 |
| Valid National ID (Individual) | Valid 13-digit Thai ID; set via `TEST_NATIONAL_ID_VALID` |
| Invalid National ID — 12 digits | `123456789012` |
| Invalid National ID — non-numeric | `12345ABCD8901` |
| Valid Tax ID (Corporate) | Valid 13-digit Thai Tax ID; set via `TEST_TAX_ID_VALID` |
| Valid test files | PDF 5MB, JPG 3MB, PNG 8MB, PDF exactly 10MB — stored in `assets/fixtures/upload/` |
| Oversized file | PDF > 10MB — stored in `assets/fixtures/upload/oversized.pdf` |
| Invalid type files | `sample.exe`, `sample.docx` — stored in `assets/fixtures/upload/` |
| Corrupted PDF | Truncated/broken PDF — stored in `assets/fixtures/upload/corrupted.pdf` |
| Admin rejection comment | Pre-seeded in STG DB for Rejected account: e.g. "เอกสารไม่ครบถ้วน กรุณาอัปโหลดใหม่" |
| Protected BO URL | `/event/create`, `/profile` — used in PP4-TC-040, PP4-TC-041 |

---

## Automation Notes

- **Framework:** Playwright (TypeScript)
- **Platform:** Web Desktop (1280px+, Chrome / Safari)
- **Spec file:** `src/test/web-ui-organizer/PP-4.organizer-register-login.spec.ts`
- **Fixtures:** `src/fixtures/organizer.ts` (loginPage, registerStep1–3, profileTypePage, profileIndividualPage, organizerConfig)
- **Page objects:** `src/page/web/organizer/` (LoginPage, RegisterStep1–3Page, ProfileTypePage, ProfileIndividualPage, ProfileCorporatePage)
- **Fully automatable:** PP4-TC-001–032, PP4-TC-034–035, PP4-TC-037–042
- **Partial (API assertion required):** PP4-TC-036 (backend bypass), PP4-TC-043 (DB duplicate check)
- **Partial (file fixture required):** PP4-TC-032 (corrupted file — `assets/fixtures/upload/corrupted.pdf`), PP4-TC-028 (oversized file fixture)
- **Manual only:** PP4-TC-033 (Private Bucket HTTP access — requires infra access), PP4-TC-044 (draft save — confirmed but not automatable without session control)
- **Admin-dependent (PP4-TC-037, PP4-TC-039, PP4-TC-042):** Require pre-seeded STG accounts; automate via API seed or STG admin console
- **STG note:** `/dashboard` returns 404 — use `/event/create` as the protected RBAC test route
