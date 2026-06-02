# PP-2 · Registration & Login — Flow Diagram

> Requirements → [PP-2_Registration_Login.md](../requirements/PP-2_Registration_Login.md)
> Jira → [PP-2](https://7-solutions.atlassian.net/browse/PP-2)
> Figma → [App UI Design node 1691-5925](https://www.figma.com/design/PKyOOKQydjB98nVMOOyxy4/-PP--App-UI-Design?node-id=1691-5925)
> Test Design → [PP-2.design.md](./PP-2.design.md)

---

## Master Flow

```mermaid
flowchart TD
    START([App Launch]) --> TOKEN{JWT /\nRefresh Token\nValid?}
    TOKEN -->|Yes| HOME([Home Page])
    TOKEN -->|No| LOGIN[Login Page\n──────────────\nPhone No.\nApple ID\nLINE\nGoogle]

    LOGIN -->|Phone| PH1[Enter Phone Number]
    PH1 --> PH2{Format OK?\n10 digits}
    PH2 -->|No| PH3[Show Error\nDisable OTP Button]
    PH3 --> PH1
    PH2 -->|Yes| PH4[Send OTP via SMS]
    PH4 --> PH5[OTP Screen\n60s Countdown]
    PH5 -->|Timeout| PH6[Resend OTP\nmax 3x / 5 min]
    PH6 --> PH5
    PH5 --> PH7{OTP Correct?}
    PH7 -->|No| PH8[Show OTP Error]
    PH8 --> PH5
    PH7 -->|Yes| PROFILE_CHECK

    LOGIN -->|Apple ID| APPLE[Apple Auth]
    APPLE --> APPLE2{Hide My Email?}
    APPLE2 -->|Yes| APPLE3[Use Apple Private Email]
    APPLE2 -->|No| APPLE4[Use Real Email]
    APPLE3 --> EMAIL_CHK
    APPLE4 --> EMAIL_CHK

    LOGIN -->|LINE| LINE[LINE Auth]
    LINE --> EMAIL_CHK

    LOGIN -->|Google| GOOGLE[Google Auth]
    GOOGLE --> EMAIL_CHK

    EMAIL_CHK{Email Already\nRegistered?}
    EMAIL_CHK -->|No| PROFILE_CHECK
    EMAIL_CHK -->|Yes — same provider| PROFILE_CHECK
    EMAIL_CHK -->|Yes — diff provider| LINK_DIALOG[Identity Linking Dialog\nLink your accounts?]
    LINK_DIALOG -->|Confirm| LINKED[Accounts Linked]
    LINKED --> PROFILE_CHECK
    LINK_DIALOG -->|Cancel| LOGIN

    PROFILE_CHECK{Profile in DB?}
    PROFILE_CHECK -->|Existing User| HOME
    PROFILE_CHECK -->|New User| PDPA

    PDPA[PDPA Consent Screen]
    PDPA --> BASIC[Basic Identity\nDisplay Name / Gender / DOB]
    BASIC --> IS_SOCIAL{Social Login\nFirst Time?}
    IS_SOCIAL -->|Yes| PHONE_VERIFY[Phone Verification\nPhone + OTP]
    PHONE_VERIFY --> INTERESTS
    IS_SOCIAL -->|No| INTERESTS
    INTERESTS[Interests Selection\n1-3 Categories]
    INTERESTS --> SAVE[(Save to DB\nUsers + User_Interests)]
    SAVE --> HOME

    style HOME fill:#4CAF50,color:#fff
    style LOGIN fill:#FF6B35,color:#fff
    style SAVE fill:#2196F3,color:#fff
    style PDPA fill:#FF9800,color:#fff
    style LINKED fill:#8BC34A,color:#fff
```

---

## Sub-Flow 1: Phone Login & OTP

### State & Transition Reference

| Ref ID | Type | Label |
|--------|------|-------|
| S1 | State | Login Page |
| S2 | State | Phone Input Screen |
| S3 | State | Phone Format Valid? |
| S4 | State | Error shown + OTP button disabled |
| S5 | State | OTP Screen (60s countdown active) |
| S6 | State | OTP Correct? |
| S7 | State | OTP Error |
| S8 | State | Resend Available |
| S9 | State | Rate Limit Reached |
| S10 | State | Profile Check |
| T1 | Transition | Tap Phone login |
| T2 | Transition | Phone invalid — show error |
| T3 | Transition | Error cleared — retry input |
| T4 | Transition | Phone valid — send OTP |
| T5 | Transition | OTP screen loaded |
| T6 | Transition | Timer expires — resend available |
| T7 | Transition | Resend under rate limit |
| T8 | Transition | Resend over rate limit — blocked |
| T9 | Transition | OTP wrong — show error |
| T10 | Transition | OTP correct — proceed |

```mermaid
flowchart TD
    S1([Login Page]) -->|"T1 · PP2-TC-001 PP2-TC-002 PP2-TC-003 PP2-TC-004 PP2-TC-005 PP2-TC-037"| S2[Phone Input Screen]
    S2 --> S3{Phone Format\nValid? 10 digits}
    S3 -->|"T2 · PP2-TC-002 PP2-TC-037"| S4[Error shown\nOTP button disabled]
    S4 -->|"T3"| S2
    S3 -->|"T4 · PP2-TC-001 PP2-TC-003 PP2-TC-004 PP2-TC-005"| S5A[OTP button enabled\nUser taps Send OTP]
    S5A --> S5[OTP Screen + 60s timer]
    S5 -->|"T6 · PP2-TC-006 PP2-TC-007"| S8[Resend Available]
    S8 -->|"T7 · PP2-TC-007"| S5
    S8 -->|"T8 · PP2-TC-008 PP2-TC-034"| S9[Rate Limit Error]
    S5 --> S6{OTP Correct?}
    S6 -->|"T9 · PP2-TC-009 PP2-TC-010 PP2-TC-038"| S7[OTP Error]
    S7 --> S5
    S6 -->|"T10 · PP2-TC-001 PP2-TC-005 PP2-TC-009"| S10([Profile Check])

    style S10 fill:#4CAF50,color:#fff
    style S9 fill:#f44336,color:#fff
```

---

## Sub-Flow 2: Social Login & Identity Linking

### State & Transition Reference

| Ref ID | Type | Label |
|--------|------|-------|
| S11 | State | Login Page |
| S12 | State | Google OAuth |
| S13 | State | LINE OAuth |
| S14 | State | Apple OAuth |
| S15 | State | Apple — Hide My Email? |
| S16 | State | Apple Private Relay Email used |
| S17 | State | Apple Real Email used |
| S18 | State | Email Check (already registered?) |
| S19 | State | Identity Linking Dialog |
| S20 | State | Accounts Merged |
| S21 | State | Profile Check |
| T11 | Transition | Tap Google |
| T12 | Transition | Tap LINE |
| T13 | Transition | Tap Apple |
| T14 | Transition | Apple — choose Hide My Email |
| T15 | Transition | Apple — choose Real Email |
| T16 | Transition | Email not registered → Profile Check |
| T17 | Transition | Email registered — same provider → Profile Check (no dialog) |
| T18 | Transition | Email registered — different provider → Linking Dialog |
| T19 | Transition | Confirm link → Merge accounts |
| T20 | Transition | Cancel link → return to Login |

```mermaid
flowchart TD
    S11([Login Page]) --> S12B{Which Social?}
    S12B -->|"T11 · PP2-TC-011 PP2-TC-012"| S12[Google OAuth]
    S12B -->|"T12 · PP2-TC-013 PP2-TC-014"| S13[LINE OAuth]
    S12B -->|"T13 · PP2-TC-015 PP2-TC-016 PP2-TC-017 PP2-TC-035"| S14[Apple OAuth]

    S14 --> S15{Hide My Email?}
    S15 -->|"T14 · PP2-TC-016"| S16[Private Relay Email]
    S15 -->|"T15 · PP2-TC-015"| S17[Real Email]
    S16 --> S18
    S17 --> S18
    S12 --> S18
    S13 --> S18

    S18{Email already\nin system?}
    S18 -->|"T16 · PP2-TC-011 PP2-TC-013 PP2-TC-015 PP2-TC-016"| S21([Profile Check])
    S18 -->|"T17 · PP2-TC-012 PP2-TC-014 PP2-TC-017 PP2-TC-039"| S21
    S18 -->|"T18 · PP2-TC-018 PP2-TC-036"| S19[Identity Linking Dialog]
    S19 -->|"T19 · PP2-TC-019"| S20[Accounts Merged]
    S20 --> S21
    S19 -->|"T20 · PP2-TC-020"| S11

    style S21 fill:#4CAF50,color:#fff
```

---

## Sub-Flow 3: New User Onboarding

### State & Transition Reference

| Ref ID | Type | Label |
|--------|------|-------|
| S22 | State | New User Detected |
| S23 | State | PDPA Consent Screen |
| S24 | State | Cannot Proceed (PDPA declined) |
| S25 | State | Basic Identity Screen |
| S26 | State | Validation Error on Basic Identity |
| S27 | State | Login method was Social? |
| S28 | State | Phone Verification Screen |
| S29 | State | OTP Error (onboarding phone verify) |
| S30 | State | Interests Selection Screen |
| S31 | State | Save Profile to DB |
| S32 | State | Home Page |
| T21 | Transition | New user detected → PDPA |
| T22 | Transition | PDPA accept → Basic Identity |
| T23 | Transition | PDPA decline / back → blocked |
| T24 | Transition | Basic Identity valid → check login method |
| T25 | Transition | Basic Identity invalid — inline error |
| T26 | Transition | Social login → Phone Verification |
| T27 | Transition | Phone login → skip to Interests |
| T28 | Transition | Phone OTP verified → Interests |
| T29 | Transition | Phone OTP wrong → error → retry |
| T30 | Transition | Min 1 interest selected → Done |
| T31 | Transition | Done tapped with 0 interests — blocked |
| T32 | Transition | Save complete → Home |

```mermaid
flowchart TD
    S22([New User Detected]) -->|"T21"| S23[PDPA Consent Screen]
    S23 -->|"T23 · PP2-TC-022"| S24([Cannot Proceed])
    S23 -->|"T22 · PP2-TC-021 PP2-TC-022"| S25[Basic Identity Screen\nName / Gender / DOB]
    S25 --> S25B{All fields valid?}
    S25B -->|"T25 · PP2-TC-023 PP2-TC-024 PP2-TC-025 PP2-TC-026 PP2-TC-040 PP2-TC-041"| S26[Inline Validation Error]
    S26 --> S25
    S25B -->|"T24 · PP2-TC-027"| S27{Login method\nwas Social?}
    S27 -->|"T26 · PP2-TC-027"| S28[Phone Verification\nPhone + OTP]
    S28 --> S28B{OTP verified?}
    S28B -->|"T29"| S29[Error — retry]
    S29 --> S28
    S28B -->|"T28 · PP2-TC-027"| S30
    S27 -->|"T27 · PP2-TC-028 PP2-TC-029 PP2-TC-030"| S30[Interests Selection\n1-3 categories]
    S30 --> S30B{Min 1 selected?}
    S30B -->|"T31 · PP2-TC-028"| S30
    S30B -->|"T30 · PP2-TC-029 PP2-TC-030"| S31[(Save Profile to DB)]
    S31 -->|"T32 · PP2-TC-030"| S32([Home Page])

    style S32 fill:#4CAF50,color:#fff
    style S24 fill:#f44336,color:#fff
```

---

## Sub-Flow 4: Session Persistence (Auto Login)

### State & Transition Reference

| Ref ID | Type | Label |
|--------|------|-------|
| S33 | State | App Launch |
| S34 | State | Read local token |
| S35 | State | Token exists? |
| S36 | State | Token valid and not expired? |
| S37 | State | Near expiry — silent refresh |
| S38 | State | Clear token |
| S39 | State | Home Page |
| S40 | State | Login Page |
| T33 | Transition | No token → Login |
| T34 | Transition | Token expired → clear → Login |
| T35 | Transition | Token near expiry → silent refresh → Home |
| T36 | Transition | Token valid and fresh → Home |

```mermaid
flowchart TD
    S33([App Launch]) --> S34[Read local token]
    S34 --> S35{Token exists?}
    S35 -->|"T33 · PP2-TC-042"| S40([Login Page])
    S35 -->|Yes| S36{Token valid and\nnot expired?}
    S36 -->|"T34 · PP2-TC-032"| S38[Clear token]
    S38 --> S40
    S36 -->|"T35 · PP2-TC-043"| S37[Silent refresh]
    S37 --> S39([Home Page])
    S36 -->|"T36 · PP2-TC-031"| S39

    style S39 fill:#4CAF50,color:#fff
    style S40 fill:#FF6B35,color:#fff
```
