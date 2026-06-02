# Profile Type Selection — State Diagram

Route: `/profile`

## Elements Found

| Element | Tag | Text |
|---|---|---|
| Corporate Card | `label` | "องค์กร / บริษัท — เหมาะสำหรับบริษัทหรือทีมที่ต้องการจัดการอีเวนท์" |
| Individual Card | `label` | "บุคคลทั่วไป — สำหรับผู้ใช้งานทั่วไปที่อยากสร้างอีเวนท์ของตัวเอง" |

Note: Both cards are implemented as `<label>` elements wrapping a radio input or similar input control. Clicking either label selects the corresponding type.

## States

| State | Description |
|---|---|
| Init | Both cards rendered. Neither selected (or default selected). |
| Card — Default | Card rendered in neutral state. Not selected. |
| Card — Hover | Mouse over card. Visual highlight (border change, shadow, or background). |
| Card — Selected | Card clicked. Visual indicator shows selected state (e.g., colored border, checkmark, ring). |
| Corporate — Selected | "องค์กร / บริษัท" card selected. Individual card returns to default. |
| Individual — Selected | "บุคคลทั่วไป" card selected. Corporate card returns to default. |
| Submit — (observed) | After clicking either label, page stays on `/profile`. Navigation to individual/corporate profile form requires a separate confirm/next action. |

## Element Validate

| Scope | Scenario | Count |
|---|---|---|
| Selection | Corporate card: Default → Hover → Selected | × 1 |
| Selection | Individual card: Default → Hover → Selected | × 1 |
| Selection | Corporate → Individual (switch selection) | × 1 |
| Selection | Individual → Corporate (switch selection) | × 1 |

## State Diagrams

### 1. Type Selection Cards — Selection Scope

```mermaid
stateDiagram-v2
    [*] --> BothUnselected

    BothUnselected --> CorporateSelected : click "องค์กร / บริษัท"
    BothUnselected --> IndividualSelected : click "บุคคลทั่วไป"

    CorporateSelected --> IndividualSelected : click "บุคคลทั่วไป"
    IndividualSelected --> CorporateSelected : click "องค์กร / บริษัท"

    state CorporateSelected {
        [*] --> HighlightedCorporate : corporate card shows\nselected visual indicator
    }

    state IndividualSelected {
        [*] --> HighlightedIndividual : individual card shows\nselected visual indicator
    }
```

### 2. Individual Card — Hover & Selection Scope

```mermaid
stateDiagram-v2
    [*] --> Unselected

    Unselected --> Hover : mouse over card
    Hover --> Unselected : mouse leaves
    Hover --> Selected : click
    Unselected --> Selected : click
    Selected --> Unselected : other card selected

    state Selected {
        [*] --> VisuallyActive : ring/border/color\nchanges to indicate selection
    }
```

### 3. Corporate Card — Hover & Selection Scope

```mermaid
stateDiagram-v2
    [*] --> Unselected

    Unselected --> Hover : mouse over card
    Hover --> Unselected : mouse leaves
    Hover --> Selected : click
    Unselected --> Selected : click
    Selected --> Unselected : other card selected
```

## Screenshots Reference

| State | Screenshot |
|---|---|
| Profile type — init | ![elx5-profile-type-init](../../assets/capture/PP-4/elx5-profile-type-init.png) |
| Corporate card — hover | ![elx5-profile-corporate-label-hover](../../assets/capture/PP-4/elx5-profile-corporate-label-hover.png) |
| Corporate card — selected | ![elx5-profile-corporate-label-selected](../../assets/capture/PP-4/elx5-profile-corporate-label-selected.png) |
| Individual card — hover | ![elx5-profile-individual-label-hover](../../assets/capture/PP-4/elx5-profile-individual-label-hover.png) |
| Individual card — selected | ![elx5-profile-individual-label-selected](../../assets/capture/PP-4/elx5-profile-individual-label-selected.png) |

## Notes

- **Navigation behavior**: After clicking either label, the page URL stays at `/profile`. The selection does NOT immediately navigate to `/profile/individual` or `/profile/corporate`. A separate "Next" or confirm action must trigger navigation. This behavior may differ from requirements — see req-clarify notes.
- **Label implementation**: Cards are `<label>` elements, not `<button>` or `<a>` elements. The underlying radio input determines selection state.
- **Mutual exclusion**: Selecting one card deselects the other — standard radio button behavior.
- **Disabled state**: Neither card showed a disabled state during exploration.
