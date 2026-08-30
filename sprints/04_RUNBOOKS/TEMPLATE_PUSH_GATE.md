# Template — Push Gate

**Maps to:** `HOUSEMASTER_GCP_GATE_AGENT_OPERATING_MODEL.md` §4 "Push gate", §9 "Standard push workflow"

**Use when:** pushing an already-committed change to `origin`. Always a separate approval from the commit gate that produced it, even when they arrive back-to-back.

---

## Fill-in-the-blank request

```
Push <WHAT> commit.

Allowed:
git push
git status --short
git log --oneline --decorate -8

Report:
- pushed yes/no
- remote HEAD
- whether HEAD == origin
- latest commit
- next safe step

Forbidden:
no Secret Manager payload, no password, no Cloud SQL change, no secret update,
no endpoint call, no deploy, no terraform, no DB mutation/queries,
no <NEXT_GATE_ID> execution.
```

## Agent obligations while executing this template

1. `git push` with no flags — never `--force`, never `--force-with-lease`, never specify a different remote/branch than the current tracking branch, unless the request explicitly names one.
2. If the push is rejected (non-fast-forward, remote ahead), stop and report — do not `pull`/`rebase`/`merge` to resolve it without a fresh approval, since that changes history the requester hasn't seen.
3. After push, always verify with `git status --short` and `git log --oneline --decorate` — confirm `HEAD -> <branch>, origin/<branch>` point at the same commit in the log output, don't infer success from the push command's exit code alone.
4. If this exact request repeats and nothing has changed since the last push (HEAD already equals origin), say so plainly and re-report the unchanged state rather than silently no-op'ing without explanation — repetition in this pattern has usually meant "confirm this is still true," not "do it again."

## Worked example (from this session)

```
Push HM-GCP-004X-1B credential remediation checklist.

Allowed:
git push
git status --short
git log --oneline --decorate -8

Report:
- pushed yes/no
- remote HEAD
- whether HEAD == origin
- latest commit
- next safe step

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
```
