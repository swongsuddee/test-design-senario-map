# Register Step 1 — State Diagram

> Inherits: [field-cursor-states.diagram.md](./field-cursor-states.diagram.md)

Route: `/register`

## Fields Found

| Field | Input Name | Type | Placeholder |
|---|---|---|---|
| Display Name | `displayName` | text | กรอกชื่อผู้ใช้งาน |
| First Name | `firstName` | text | กรอกชื่อ |
| Last Name | `lastName` | text | กรอกนามสกุล |
| Date of Birth | — | button (`-เลือก-`) | Custom dropdown |
| Phone | `phone` | text | กรอกเบอร์โทร |
| Next Button | — | submit | ถัดไป |

## States

| State | Description |
|---|---|
| Init | Form rendered. All text fields empty with placeholder. DOB button shows "-เลือก-". |
| Field — Focus | A text field clicked. Cursor active inside field. |
| Field — Filled | Value entered and focus moved away. Value retained. |
| Field — Error | Field left empty and form submitted. Red border and error message below field. |
| DOB — Init | Button displays "-เลือก-". No date selected. |
| DOB — Open | Button clicked. Dropdown opens showing selectable date options. |
| DOB — Selected | A date is chosen. Button text updates to show selected value. |
| Phone — Focus | Phone input clicked. Cursor active. |
| Phone — Filled | Phone number entered. Value retained on blur. |
| Phone — Error | Phone field empty on submit, or invalid format entered. |
| Next Button — Default | Button always enabled (no client-side disable based on filled state). Text "ถัดไป". |
| Next Button — Submitting | Button clicked. Brief loading state during validation/navigation. |

## Element Validate

| Scope | Scenario | Count |
|---|---|---|
| Cursor | displayName: Init → Focus → Filled | × 1 |
| Cursor | firstName: Init → Focus → Filled | × 1 |
| Cursor | lastName: Init → Focus → Filled | × 1 |
| Cursor | phone: Init → Focus → Filled | × 1 |
| Value | DOB: Init → Open → Selected | × 1 |
| Value | DOB: Closed without selection → stays "-เลือก-" | × 1 |
| Submission | Submit all empty → required field errors shown | × 1 |
| Submission | Submit with DOB missing → DOB required error | × 1 |
| Submission | Submit all valid → navigate to step 2 | × 1 |

## State Diagrams

### 1. Text Fields (displayName / firstName / lastName) — Cursor Scope

> Inherits base cursor behavior from [field-cursor-states.diagram.md](./field-cursor-states.diagram.md)

```mermaid
stateDiagram-v2
    [*] --> Init

    Init --> Focus : click field
    Focus --> Init : blur\n(field empty)
    Focus --> Filled : blur\n(field has value)
    Filled --> Focus : click field again
    Filled --> Error : form submitted\nwith invalid / empty value
    Error --> Focus : click field to correct
    Error --> Filled : corrected value\nand blur

    state Focus {
        [*] --> CursorActive
    }
```

### 2. DOB Picker — Value Scope

```mermaid
stateDiagram-v2
    [*] --> DOBInit

    DOBInit --> DOBOpen : click "-เลือก-" button
    DOBOpen --> DOBInit : press Escape or click outside\n(no selection)
    DOBOpen --> DOBSelected : user selects a date
    DOBSelected --> DOBOpen : click to re-open and change

    state DOBInit {
        [*] --> ShowingPlaceholder : label = "-เลือก-"
    }

    state DOBSelected {
        [*] --> ShowingDate : label = selected date text
    }
```

### 3. Phone Field — Cursor & Value Scope

> See also: [phone-field-states.diagram.md](./phone-field-states.diagram.md)

```mermaid
stateDiagram-v2
    [*] --> PhoneInit

    PhoneInit --> PhoneFocus : click field
    PhoneFocus --> PhoneInit : blur\n(empty)
    PhoneFocus --> PhoneFilled : blur\n(has value)
    PhoneFilled --> PhoneFocus : click field again
    PhoneFilled --> PhoneError : form submitted\nwith invalid phone
    PhoneError --> PhoneFocus : click to correct
```

### 4. Next Button — Lifecycle Scope

```mermaid
stateDiagram-v2
    [*] --> Enabled

    Enabled --> Submitting : click button
    Submitting --> ValidationError : required fields missing\n[client-side validation]
    Submitting --> [*] : all fields valid\n[navigate to /register/account]
    ValidationError --> Enabled : user fills fields
```

### 5. Full Form — Submission Scope

```mermaid
stateDiagram-v2
    [*] --> Idle

    Idle --> FieldErrors : submit with empty\nor invalid fields
    FieldErrors --> Idle : user corrects all errors
    Idle --> [*] : all fields valid\n[proceed to step 2]
```

## Screenshots Reference

| State | Screenshot |
|---|---|
| Form init | ![Form init](../../assets/capture/PP-4/elx3-register-step1-init.png) |
| displayName — focus | ![displayName focus](../../assets/capture/PP-4/elx3-register-step1-displayname-focus.png) |
| displayName — filled | ![displayName filled](../../assets/capture/PP-4/elx3-register-step1-displayname-filled.png) |
| firstName — focus | ![firstName focus](../../assets/capture/PP-4/elx3-register-step1-firstname-focus.png) |
| firstName — filled | ![firstName filled](../../assets/capture/PP-4/elx3-register-step1-firstname-filled.png) |
| lastName — focus | ![lastName focus](../../assets/capture/PP-4/elx3-register-step1-lastname-focus.png) |
| lastName — filled | ![lastName filled](../../assets/capture/PP-4/elx3-register-step1-lastname-filled.png) |
| DOB — dropdown open | ![DOB open](../../assets/capture/PP-4/elx3-register-step1-dob-open.png) |
| Phone — focus | ![Phone focus](../../assets/capture/PP-4/elx3-register-step1-phone-focus.png) |
| Phone — filled | ![Phone filled](../../assets/capture/PP-4/elx3-register-step1-phone-filled.png) |
| Next button — default | ![Next default](../../assets/capture/PP-4/elx3-register-step1-next-default.png) |
| Next button — hover | ![Next hover](../../assets/capture/PP-4/elx3-register-step1-next-hover.png) |
| Form — validation errors | ![Validation errors](../../assets/capture/PP-4/elx3-register-step1-validation-empty.png) |

## Notes

- **DOB picker**: Implemented as a custom `button[type="button"]` dropdown (label "-เลือก-"), not a native `input[type="date"]`. Only one dropdown was found — the DOB picker may be a single combined selector or may expand into day/month/year sub-dropdowns when opened.
- **Phone field**: Uses `input[type="text"]` not `input[type="tel"]`. No country code prefix visible in step 1 registration (unlike the standalone phone-field component described in phone-field-states.diagram.md).
- **No disabled state on Next button**: The Next button is always enabled regardless of field state. Validation occurs on submit.
- **DOB dropdown options**: When opened, no visible `[role="option"]` elements were found — the dropdown may render options in a portal or with a slight delay. Requires manual observation.
