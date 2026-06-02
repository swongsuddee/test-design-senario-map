# PP-561 · [BE][Post-Service] Implement Kafka producers for post domain events

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-561        |
| **Type**     | Sub-task      |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | Pond-Siritep Tongdoung |
| **Parent**   | [PP-449](./PP-449_Post_Poppa.md) |

---

## User Story

> As a backend service, implement Kafka producers for post domain events so that downstream services can react to post lifecycle changes in a reliable and decoupled manner.

---

## 1. Description

Implements Kafka producer logic for the four post domain events: `post.created`, `post.updated`, `post.deleted`, and `post.reported`. Each event is published only after the corresponding main database write succeeds. Event payloads must contain all identifiers required by downstream consumers. No event is emitted when the state does not change.

---

## 2. Acceptance Criteria

### Scenario 1 — Event emitted after successful write

- **Given:** A post create, update, delete, or report write completes successfully
- **When:** The write transaction commits
- **Then:** The corresponding Kafka event (`post.created`, `post.updated`, `post.deleted`, or `post.reported`) is published with the correct payload

### Scenario 2 — No event emitted on no-op

- **Given:** A state change operation results in no actual data change
- **When:** The operation completes
- **Then:** No Kafka event is emitted

---

## 3. Definition of Done

- [ ] `post.created` Kafka producer implemented
- [ ] `post.updated` Kafka producer implemented
- [ ] `post.deleted` Kafka producer implemented
- [ ] `post.reported` Kafka producer implemented
- [ ] Each event published only after main DB write succeeds
- [ ] Event payloads contain identifiers needed by consumers
- [ ] No event emitted when state does not change
