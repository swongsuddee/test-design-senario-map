# Register Step 2 — State Diagram

> Inherits: [field-cursor-states.diagram.md](./field-cursor-states.diagram.md)

Route: `/register/account`

## Fields Found

| Field | Input Name | Type | Placeholder |
|---|---|---|---|
| Email | `email` | email | กรอกอีเมล |
| Password | `password` | password | กรอกรหัสผ่าน |
| Confirm Password | `confirmPassword` | password | กรอกรหัสผ่านอีกครั้ง |
| Password Show/Hide Toggle (1) | — | button (icon) | For password field |
| Password Show/Hide Toggle (2) | — | button (icon) | For confirm password field |
| Back Button | — | button | ย้อนกลับ |
| Next Button | — | submit | ถัดไป |

## States

| State | Description |
|---|---|
| Email — Init | Field empty, placeholder "กรอกอีเมล" visible. |
| Email — Focus | Field clicked. Cursor active. |
| Email — Filled | Email typed and focus moved away. |
| Email — Error | Empty on submit or invalid email format. Red border + error message. |
| Password — Focus (empty) | Password field clicked. Requirements tooltip/popover appears above or beside field. |
| Password — Weak | Partial password entered. Requirements checklist shows unmet criteria (red X). |
| Password — Strong | All password requirements met. Requirements checklist shows all green checkmarks. |
| Password — Filled (valid) | Focus moved away after meeting all requirements. No error state. |
| Password — Filled (invalid) | Focus moved away with weak password. Error state shown. |
| Password — Visible | Show/hide toggle clicked. Characters unmasked. |
| Password — Hidden | Show/hide toggle clicked. Characters masked. |
| Confirm — Focus | Confirm password field clicked. |
| Confirm — Mismatch | Value differs from password field. Error: passwords do not match. |
| Confirm — Match | Value matches password field. No error. |
| Confirm — Visible | Show/hide toggle for confirm field clicked. Characters unmasked. |
| Back Button — Default | "ย้อนกลับ" button. Enabled. Navigates to step 1. |
| Back Button — Hover | Visual highlight on hover. |
| Next Button — Default | "ถัดไป" submit button. Enabled. |
| Next Button — Submitting | Brief loading state while navigating to step 3. |

## Element Validate

| Scope | Scenario | Count |
|---|---|---|
| Cursor | Email: Init → Focus → Filled | × 1 |
| Cursor | Password: Init → Focus (tooltip appears) → Filled | × 1 |
| Cursor | Confirm: Init → Focus → Filled | × 1 |
| Value | Password: weak (fails requirements) | × 1 |
| Value | Password: strong (passes all requirements) | × 1 |
| Value | Password: toggle show/hide (× 2 — password + confirm fields) | × 2 |
| Value | Confirm: mismatch (passwords differ) | × 1 |
| Value | Confirm: match (passwords identical) | × 1 |
| Submission | Submit all empty → field errors shown | × 1 |
| Submission | Submit with weak password → password error | × 1 |
| Submission | Submit with mismatched confirm → confirm error | × 1 |
| Submission | Submit with valid email + strong password + matching confirm → step 3 | × 1 |
| Navigation | Back button → navigate to step 1 | × 1 |

## State Diagrams

### 1. Email Field — Cursor Scope

> Inherits base cursor behavior from [field-cursor-states.diagram.md](./field-cursor-states.diagram.md)

```mermaid
stateDiagram-v2
    [*] --> Init

    Init --> Focus : click field
    Focus --> Init : blur\n(field empty)
    Focus --> Filled : blur\n(field has value)
    Filled --> Focus : click field again
    Filled --> Error : submit with\ninvalid/empty email
    Error --> Focus : click to correct

    state Focus {
        [*] --> CursorActive
    }
```

### 2. Password Field — Value & Requirements Scope

```mermaid
stateDiagram-v2
    [*] --> PasswordInit

    PasswordInit --> PasswordFocusEmpty : click field\n[requirements tooltip appears]
    PasswordFocusEmpty --> PasswordInit : blur\n(empty)
    PasswordFocusEmpty --> PasswordTypingWeak : type weak value\n[unmet requirements shown in red]
    PasswordTypingWeak --> PasswordTypingStrong : meet all requirements\n[all criteria turn green]
    PasswordTypingStrong --> PasswordTypingWeak : delete chars\n[requirements unmet again]
    PasswordTypingStrong --> PasswordFilledValid : blur\n(strong password)
    PasswordTypingWeak --> PasswordFilledInvalid : blur\n(weak password)
    PasswordFilledValid --> PasswordFocusEmpty : click field again
    PasswordFilledInvalid --> PasswordFocusEmpty : click field again
```

### 3. Password Visibility — Toggle Scope

```mermaid
stateDiagram-v2
    [*] --> Masked

    Masked --> Visible : click show/hide toggle\n[input type → "text"]
    Visible --> Masked : click show/hide toggle\n[input type → "password"]

    note right of Masked : Characters shown as ••••••
    note right of Visible : Characters shown as plain text
```

### 4. Confirm Password — Value Scope

```mermaid
stateDiagram-v2
    [*] --> ConfirmInit

    ConfirmInit --> ConfirmFocus : click field
    ConfirmFocus --> ConfirmInit : blur\n(empty)
    ConfirmFocus --> ConfirmMismatch : blur\n(differs from password)
    ConfirmFocus --> ConfirmMatch : blur\n(matches password)
    ConfirmMismatch --> ConfirmFocus : click to correct
    ConfirmMatch --> ConfirmFocus : click to edit
```

### 5. Back Button — Lifecycle Scope

```mermaid
stateDiagram-v2
    [*] --> Enabled

    Enabled --> [*] : click\n[navigate back to /register]
```

### 6. Next Button — Submission Scope

```mermaid
stateDiagram-v2
    [*] --> Enabled

    Enabled --> Submitting : click
    Submitting --> ValidationError : required fields missing\nor password requirements unmet\nor passwords mismatch
    Submitting --> [*] : all valid\n[navigate to /register/verify]
    ValidationError --> Enabled : user corrects errors
```

## Screenshots Reference

| State | Screenshot |
|---|---|
| Form init | ![elx3-register-step2-init](../../assets/capture/PP-4/elx3-register-step2-init.png) |
| Email — focus | ![elx3-register-step2-email-focus](../../assets/capture/PP-4/elx3-register-step2-email-focus.png) |
| Email — filled | ![elx3-register-step2-email-filled](../../assets/capture/PP-4/elx3-register-step2-email-filled.png) |
| Password — focus + requirements | ![elx3-register-step2-password-focus-requirements](../../assets/capture/PP-4/elx3-register-step2-password-focus-requirements.png) |
| Password — weak | ![elx3-register-step2-password-weak](../../assets/capture/PP-4/elx3-register-step2-password-weak.png) |
| Password — strong | ![elx3-register-step2-password-strong](../../assets/capture/PP-4/elx3-register-step2-password-strong.png) |
| Password — toggle on (visible) | ![elx3-register-step2-toggle0-on](../../assets/capture/PP-4/elx3-register-step2-toggle0-on.png) |
| Password — toggle off (hidden) | ![elx3-register-step2-toggle0-off](../../assets/capture/PP-4/elx3-register-step2-toggle0-off.png) |
| Confirm — mismatch | ![elx3-register-step2-confirm-mismatch](../../assets/capture/PP-4/elx3-register-step2-confirm-mismatch.png) |
| Confirm — match | ![elx3-register-step2-confirm-match](../../assets/capture/PP-4/elx3-register-step2-confirm-match.png) |
| Back button — hover | ![elx3-register-step2-back-hover](../../assets/capture/PP-4/elx3-register-step2-back-hover.png) |
| Form — validation empty | ![elx3-register-step2-validation-empty](../../assets/capture/PP-4/elx3-register-step2-validation-empty.png) |

## Notes

- **Password requirements tooltip**: Appears on focus of the password field. Shows a checklist of criteria (e.g., min 8 chars, uppercase, number, special character). Criteria are shown as red/unmet and green/met as the user types.
- **Two show/hide toggles**: Both password and confirm password fields each have their own `button[type="button"]` toggle (SVG icon, `absolute right-3 top-1/2` positioned). They operate independently.
- **No email duplication check at this step**: Duplicate email validation (if any) happens server-side after step 3 (email verify). Frontend only validates format.
- **Back button**: Navigates to `/register` (step 1). No data loss — form state appears to be preserved during step navigation.
