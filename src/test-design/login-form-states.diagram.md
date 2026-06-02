# Login Form — State Diagram

> Inherits: [field-cursor-states.diagram.md](./field-cursor-states.diagram.md)

## States

| State | Description |
|---|---|
| Init | Form rendered with empty email and password fields. Placeholder text visible. |
| Email — Focus | Email field clicked. Cursor active inside field. |
| Email — Filled | Email value typed and focus moved away. Value retained. |
| Email — Error | Email field has validation error (empty on submit, or invalid format). Red border + error message below. |
| Password — Focus | Password field clicked. Cursor active, characters masked as dots. |
| Password — Filled | Password value typed and focus moved away. Value masked. |
| Password — Visible | Show/hide toggle clicked. Password characters shown as plain text (input type changes to `text`). |
| Password — Hidden | Show/hide toggle clicked again. Password characters masked again (input type reverts to `password`). |
| Password — Error | Password field has validation error (empty on submit). Red border + error message below. |
| Submit — Default | Submit button rendered. Active/enabled. Text "เข้าสู่ระบบ". |
| Submit — Loading | API request in-flight after click. Button may show spinner / disabled state during request. |
| Submit — Error (API) | Login failed — invalid credentials. Error message displayed on page (e.g., wrong email/password). |
| Register Link — Default | "สมัครที่นี่" link visible below login form. |
| Register Link — Hover | Link underlined or color changes on hover. |

## Element Validate

| Scope | Scenario | Count |
|---|---|---|
| Cursor | Email: Init → Focus (click) | × 1 |
| Cursor | Email: Focus → Filled (blur with value) | × 1 |
| Cursor | Email: Filled → Focus (click again) | × 1 |
| Cursor | Password: Init → Focus (click) | × 1 |
| Cursor | Password: Focus → Filled (blur with value) | × 1 |
| Value | Password: masked → visible (toggle click) | × 1 |
| Value | Password: visible → masked (toggle click again) | × 1 |
| Submission | Submit empty form → both fields show error | × 1 |
| Submission | Submit valid credentials → loading → success (redirect) | × 1 |
| Submission | Submit invalid credentials → API error shown | × 1 |

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

    state Focus {
        [*] --> CursorActive
    }
```

### 2. Password Field — Value & Visibility Scope

```mermaid
stateDiagram-v2
    [*] --> PasswordInit

    PasswordInit --> PasswordFocus : click field
    PasswordFocus --> PasswordFilled : blur\n(field has value)
    PasswordFilled --> PasswordFocus : click field again

    state PasswordFilled {
        [*] --> Masked
        Masked --> Visible : click show/hide toggle
        Visible --> Masked : click show/hide toggle
    }
```

### 3. Submit Button — Lifecycle Scope

```mermaid
stateDiagram-v2
    [*] --> Enabled

    Enabled --> Loading : user submits form
    Loading --> Error : API returns auth failure\n(invalid credentials)
    Loading --> [*] : API returns success\n(redirect to home)
    Error --> Enabled : user edits fields
```

### 4. Full Form — Submission Scope

```mermaid
stateDiagram-v2
    [*] --> Idle

    Idle --> ValidationError : submit with empty fields\n[client-side validation]
    ValidationError --> Idle : user fills required fields
    Idle --> Submitting : submit with credentials\n[all fields filled]
    Submitting --> APIError : authentication failed\n[wrong credentials]
    Submitting --> [*] : authentication success\n[redirect to /]
    APIError --> Idle : user edits form
```

## Screenshots Reference

| State | Screenshot |
|---|---|
| Login form — init | ![elx-login-email-init](../../assets/capture/PP-4/elx-login-email-init.png) |
| Email field — focus (empty) | ![elx-login-email-focus-empty](../../assets/capture/PP-4/elx-login-email-focus-empty.png) |
| Email field — focus (filled) | ![elx-login-email-focus-filled](../../assets/capture/PP-4/elx-login-email-focus-filled.png) |
| Email field — blur (filled) | ![elx-login-email-blur-filled](../../assets/capture/PP-4/elx-login-email-blur-filled.png) |
| Password field — focus (empty) | ![elx-login-password-focus-empty](../../assets/capture/PP-4/elx-login-password-focus-empty.png) |
| Password field — focus (filled) | ![elx-login-password-focus-filled](../../assets/capture/PP-4/elx-login-password-focus-filled.png) |
| Password — visible (show) | ![elx-login-password-visible](../../assets/capture/PP-4/elx-login-password-visible.png) |
| Password — hidden (hide) | ![elx-login-password-hidden](../../assets/capture/PP-4/elx-login-password-hidden.png) |
| Submit — validation empty | ![elx-login-submit-validation-empty](../../assets/capture/PP-4/elx-login-submit-validation-empty.png) |
| Submit — invalid credentials error | ![elx-login-invalid-credentials-error](../../assets/capture/PP-4/elx-login-invalid-credentials-error.png) |

## Notes

- **Show/hide toggle**: `button[type="button"]` with SVG icon, positioned `absolute right-3 top-1/2`. Clicking toggles the `input[name="password"]` type between `password` and `text`.
- **Submit loading state**: The button shows a loading/spinner state during the API call. It was captured briefly; the loading state is short-lived (< 1s on fast connections).
- **Register link**: `a[href="/register"]` with text "สมัครที่นี่". Hover state changes color.
- **No forgot password link**: No forgot-password link was found on the login page in the current staging environment.
