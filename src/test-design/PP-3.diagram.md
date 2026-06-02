# PP-3 · User Profile & Account Settings — Flow Diagram

> Requirements → [PP-3_User_Profile_Account_Settings.md](../requirements/PP-3_User_Profile_Account_Settings.md)
> Jira → [PP-3](https://7-solutions.atlassian.net/browse/PP-3)
> Figma → [App UI Design node 1691-6015](https://www.figma.com/design/PKyOOKQydjB98nVMOOyxy4/-PP--App-UI-Design?node-id=1691-6015)
> Test Design → [PP-3.design.md](./PP-3.design.md)

---

## Master Flow

```mermaid
flowchart TD
    HOME([Home Page]) --> PROFILE[Profile Page\nAvatar / Name / Bio / Stats]

    PROFILE --> TAB_UP[Upcoming Tab]
    PROFILE --> TAB_HIS[History Tab]
    PROFILE --> TAB_SAV[Saved Tab]
    TAB_SAV --> SAVED_CHK{Events saved?}
    SAVED_CHK -->|Yes| SAVED_LIST[Event list\nNewest First]
    SAVED_CHK -->|No| SAVED_EMPTY[Empty state\nCTA to Search]
    SAVED_EMPTY -->|Tap CTA| SEARCH([Event Search Page])

    PROFILE --> EDIT_BTN[Tap Edit Profile]
    EDIT_BTN --> EDIT[Edit Profile Screen\nName / Bio / Phone]
    EDIT --> VALIDATE{Fields valid?}
    VALIDATE -->|No| EDIT_ERR[Inline validation error]
    EDIT_ERR --> EDIT
    VALIDATE -->|Yes| PATCH[PATCH /v1/user/profile]
    PATCH --> NET_CHK{Network OK?}
    NET_CHK -->|No| TOAST[Error Toast\nStay on Edit screen]
    TOAST --> EDIT
    NET_CHK -->|Yes| PROFILE_UPD[Profile updated\nno pull-to-refresh needed]
    PROFILE_UPD --> PROFILE

    PROFILE --> INT_BTN[Tap Interests]
    INT_BTN --> INTERESTS[Interests Screen\n1-3 categories]
    INTERESTS --> INT_SAVE[Save Interests]
    INT_SAVE --> INT_DB[(Update User_Interests DB)]
    INT_DB --> RECALC[Discovery feed re-calculated]
    RECALC --> PROFILE

    PROFILE --> SETTINGS[Settings Screen]
    SETTINGS --> LOGOUT[Logout]
    LOGOUT --> CLEAR_TOK[Clear local session/token]
    CLEAR_TOK --> LOGIN([Login Page])

    SETTINGS --> DEL_HIDDEN[Delete Account\nhidden / de-emphasised]
    DEL_HIDDEN --> DEL_DLG[Confirmation Dialog\nEnter reason max 500 chars]
    DEL_DLG --> DEL_ACT{User action?}
    DEL_ACT -->|Cancel| SETTINGS
    DEL_ACT -->|Confirm| DELETE[DELETE /v1/user/account]
    DELETE --> DEL_DB[(Status set to Deleted\nSessions cleared)]
    DEL_DB --> LOGIN

    TOKEN_EXP{401 Unauthorized\non any screen}
    TOKEN_EXP --> LOGIN

    style HOME fill:#4CAF50,color:#fff
    style LOGIN fill:#FF6B35,color:#fff
    style DEL_DB fill:#f44336,color:#fff
    style INT_DB fill:#2196F3,color:#fff
    style PATCH fill:#2196F3,color:#fff
```

---

## Sub-Flow 1: View Profile & Activity Tabs

### State & Transition Reference

| Ref ID | Type | Label |
|---|---|---|
| S1 | State | Home Page |
| S2 | State | Profile Page (GET /v1/user/profile) |
| S3 | State | API loading |
| S4 | State | Profile data displayed (Avatar, Name, Bio, Stats) |
| S5 | State | Upcoming Tab |
| S6 | State | History Tab |
| S7 | State | Saved Tab |
| S8 | State | Saved tab — events exist |
| S9 | State | Saved tab — empty state with CTA |
| S10 | State | Event Search Page |
| T1 | Transition | Navigate to Profile |
| T2 | Transition | API returns data |
| T3 | Transition | API returns error / network fail |
| T4 | Transition | Tap Upcoming tab |
| T5 | Transition | Tap History tab |
| T6 | Transition | Tap Saved tab |
| T7 | Transition | Saved has events |
| T8 | Transition | Saved is empty |
| T9 | Transition | Tap CTA in empty Saved |

```mermaid
flowchart TD
    S1([Home Page]) -->|"T1"| S3[Loading profile data]
    S3 -->|"T2 · PP3-TC-001"| S4[Profile displayed\nAvatar / Name / Bio / Stats]
    S3 -->|"T3 · PP3-TC-034"| S3E[Error state shown]
    S4 -->|"T4 · PP3-TC-002"| S5[Upcoming Tab\nNewest First]
    S4 -->|"T5 · PP3-TC-003"| S6[History Tab\nNewest First]
    S4 -->|"T6 · PP3-TC-004 PP3-TC-005"| S7[Saved Tab]
    S7 -->|"T7 · PP3-TC-004"| S8[Event list shown]
    S7 -->|"T8 · PP3-TC-005"| S9[Empty state + CTA button]
    S9 -->|"T9 · PP3-TC-005"| S10([Event Search Page])

    style S10 fill:#4CAF50,color:#fff
    style S3E fill:#f44336,color:#fff
```

---

## Sub-Flow 2: Edit Profile

### State & Transition Reference

| Ref ID | Type | Label |
|---|---|---|
| S11 | State | Profile Page |
| S12 | State | Edit Profile Screen |
| S13 | State | Display Name validation |
| S14 | State | Name error — empty |
| S15 | State | Name error — exceeds 50 chars |
| S16 | State | Name error — contains digits |
| S17 | State | Name error — disallowed special char |
| S18 | State | Bio validation |
| S19 | State | Bio error — exceeds 250 chars |
| S20 | State | Phone validation |
| S21 | State | Phone error — invalid format |
| S22 | State | All fields valid |
| S23 | State | PATCH /v1/user/profile |
| S24 | State | Network error — Error Toast |
| S25 | State | Profile updated (no pull-to-refresh) |
| T10 | Transition | Tap Edit Profile |
| T11 | Transition | Name empty — error |
| T12 | Transition | Name over 50 chars — error |
| T13 | Transition | Name contains digit — error |
| T14 | Transition | Name has disallowed special char — error |
| T15 | Transition | Name valid |
| T16 | Transition | Bio over 250 chars — error |
| T17 | Transition | Bio valid |
| T18 | Transition | Phone invalid — error |
| T19 | Transition | Phone valid |
| T20 | Transition | Tap Save — all valid |
| T21 | Transition | Network failure during PATCH |
| T22 | Transition | PATCH success |

```mermaid
flowchart TD
    S11[Profile Page] -->|"T10 · PP3-TC-006"| S12[Edit Profile Screen]

    S12 --> S13{Display Name\nvalid?}
    S13 -->|"T11 · PP3-TC-007"| S14[Error: name required]
    S13 -->|"T12 · PP3-TC-009"| S15[Error: max 50 chars]
    S13 -->|"T13 · PP3-TC-010"| S16[Error: no digits allowed]
    S13 -->|"T14 · PP3-TC-012"| S17[Error: disallowed char]
    S14 --> S12
    S15 --> S12
    S16 --> S12
    S17 --> S12
    S13 -->|"T15 · PP3-TC-006 PP3-TC-008 PP3-TC-011 PP3-TC-013"| S18{Bio valid?}

    S18 -->|"T16 · PP3-TC-015"| S19[Error: max 250 chars]
    S19 --> S12
    S18 -->|"T17 · PP3-TC-014 PP3-TC-016"| S20{Phone valid?}

    S20 -->|"T18 · PP3-TC-018"| S21[Error: invalid phone]
    S21 --> S12
    S20 -->|"T19 · PP3-TC-017 PP3-TC-019"| S22[All fields valid]

    S22 -->|"T20"| S23[PATCH /v1/user/profile]
    S23 -->|"T21 · PP3-TC-020"| S24[Error Toast\nstay on Edit screen]
    S24 --> S12
    S23 -->|"T22 · PP3-TC-019"| S25[Profile page updated\nno pull-to-refresh]
    S25 --> S11

    style S25 fill:#4CAF50,color:#fff
```

---

## Sub-Flow 3: Update Interests

### State & Transition Reference

| Ref ID | Type | Label |
|---|---|---|
| S26 | State | Profile Page |
| S27 | State | Interests Screen |
| S28 | State | Selection valid (1–3 interests) |
| S29 | State | Selection invalid (0 interests) |
| S30 | State | Save Interests |
| S31 | State | User_Interests DB updated |
| S32 | State | Discovery feed re-calculated |
| T23 | Transition | Tap Interests |
| T24 | Transition | Deselect all — below minimum |
| T25 | Transition | Select 4th interest — blocked |
| T26 | Transition | Valid selection (1–3) |
| T27 | Transition | Tap Save |
| T28 | Transition | DB update + feed re-calculation |

```mermaid
flowchart TD
    S26[Profile Page] -->|"T23 · PP3-TC-021"| S27[Interests Screen\ncurrent selection shown]

    S27 --> S27B{Selection count}
    S27B -->|"T24 · PP3-TC-023 zero selected"| S29[Save disabled\nmin 1 required]
    S29 --> S27
    S27B -->|"T25 · PP3-TC-024 tap 4th interest"| S27C[4th blocked\nmax 3 enforced]
    S27C --> S27
    S27B -->|"T26 · PP3-TC-021 PP3-TC-022"| S28[Valid 1-3 selected]

    S28 -->|"T27 · PP3-TC-021"| S30[Save Interests]
    S30 -->|"T28 · PP3-TC-021 PP3-TC-022"| S31[(User_Interests updated)]
    S31 --> S32[Discovery feed re-calculated]
    S32 --> S26

    style S26 fill:#4CAF50,color:#fff
```

---

## Sub-Flow 4: Delete Account

### State & Transition Reference

| Ref ID | Type | Label |
|---|---|---|
| S33 | State | Settings Screen |
| S34 | State | Delete Account button (hidden) |
| S35 | State | Confirmation Dialog |
| S36 | State | Reason text valid (1–500 chars) |
| S37 | State | Reason text error (over 500 chars) |
| S38 | State | DELETE /v1/user/account |
| S39 | State | Account deleted — sessions cleared |
| S40 | State | Login Page |
| T29 | Transition | Tap Delete Account (hidden button) |
| T30 | Transition | Enter reason — over 500 chars |
| T31 | Transition | Enter reason — within limit |
| T32 | Transition | Cancel — return to Settings |
| T33 | Transition | Confirm — send DELETE request |
| T34 | Transition | DELETE success — clear sessions |

```mermaid
flowchart TD
    S33[Settings Screen] -->|"T29 · PP3-TC-025 PP3-TC-026"| S34[Delete Account\nhidden button found]
    S34 --> S35[Confirmation Dialog\nEnter reason]

    S35 --> S35B{User action?}
    S35B -->|"T32 · PP3-TC-030"| S33

    S35B -->|"T30 · PP3-TC-029"| S37[Error: max 500 chars exceeded]
    S37 --> S35

    S35B -->|"T31 · PP3-TC-027 PP3-TC-028"| S36[Reason text valid]
    S36 -->|"T33 · PP3-TC-031"| S38[DELETE /v1/user/account]
    S38 -->|"T34 · PP3-TC-031"| S39[(Account Deleted\nSessions cleared)]
    S39 --> S40([Login Page])

    style S40 fill:#FF6B35,color:#fff
    style S39 fill:#f44336,color:#fff
```

---

## Sub-Flow 5: Session Expiry & Logout

```mermaid
flowchart TD
    ANY([Any Profile Screen]) -->|"401 Unauthorized · PP3-TC-033"| HANDLE[Handle 401 gracefully]
    HANDLE --> LOGIN([Login Page])

    SETTINGS[Settings Screen] -->|"Tap Logout · PP3-TC-035"| CLEAR[Clear local session and token]
    CLEAR --> LOGIN

    style LOGIN fill:#FF6B35,color:#fff
```
