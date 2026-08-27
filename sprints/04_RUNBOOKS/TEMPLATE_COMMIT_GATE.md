# Template — Commit Gate

**Maps to:** `HOUSEMASTER_GCP_GATE_AGENT_OPERATING_MODEL.md` §4 "Commit gate", §8 "Standard commit workflow"

**Use when:** staging and committing a change that was already made and approved by an earlier gate (usually a `TEMPLATE_DOCS_ONLY_GATE.md` or `TEMPLATE_GATE_CLOSURE_RECORD.md` result). Never bundles editing and committing in the same request — the edit must already exist in the working tree.

---

## Fill-in-the-blank request

```
Stage and commit <WHAT> only.

Target:
<TARGET_FILE>

Commit message:
<COMMIT_MESSAGE>

Allowed:
git add <TARGET_FILE>
git diff --cached --stat
git diff --cached -- <TARGET_FILE>
git commit -m "<COMMIT_MESSAGE>"
git status --short
git log --oneline --decorate -8

Forbidden:
no Secret Manager payload, no password, no Cloud SQL change, no secret update,
no endpoint call, no deploy, no terraform, no DB mutation/queries,
no <ANYTHING ELSE THIS COMMIT SHOULD NOT TOUCH>.

Report:
- staged files
- commit hash
- whether only <TARGET_FILE> was committed
- <ANY CONTENT-SPECIFIC CONFIRMATION — e.g. "exact finding recorded">
```

## Agent obligations while executing this template

1. `git add` **only** the named target — never `git add -A`, `git add .`, or a glob.
2. Run `git diff --cached --stat` first — if it shows any file other than `<TARGET_FILE>`, stop before committing and report the mismatch.
3. Run the **full** `git diff --cached -- <TARGET_FILE>` and actually read it before committing — confirm no secret-shaped string, no unrelated content, matches what the requesting gate said it would contain.
4. Do not push in this gate, even if it feels like the obvious next step — push is `TEMPLATE_PUSH_GATE.md`, a separate approval.
5. Commit message: use exactly what was given. Do not editorialize or expand it. A `Co-Authored-By`/session trailer is a harness-level convention, not part of the approved message text — do not treat its presence or absence as something this gate needs to ask about.

## Worked example (from this session)

```
Stage and commit HM-GCP-004X-3B credential-mismatch finding only.

Target file:
sprints/01_ACTIVE/HM-GCP-004X-3B_APP_LEVEL_DB_HEALTH_CHECK_GATE.md

Allowed:
git add sprints/01_ACTIVE/HM-GCP-004X-3B_APP_LEVEL_DB_HEALTH_CHECK_GATE.md
git diff --cached --stat
git diff --cached -- sprints/01_ACTIVE/HM-GCP-004X-3B_APP_LEVEL_DB_HEALTH_CHECK_GATE.md
git commit -m "docs(sprints): record DB health credential mismatch"
git status --short
git log --oneline --decorate -8

Forbidden:
- do not access Secret Manager payload
- do not print or request password
- do not change Cloud SQL password
- do not update database-url secret
- do not call /api/health/db
- do not deploy
- do not run terraform
- do not run DB queries
- do not proceed to HM-GCP-004X-4

Report:
- staged files
- commit hash
- whether only HM-GCP-004X-3B note was committed
- whether finding recorded as credential mismatch / Postgres 28P01
- next safe step
```
