# HouseMaster GCP Gate MCP — Skeleton (HM-MCP-002)

**Status:** Skeleton — `hm_repo_status` only. Not installed, not built, not run.
**Concept:** [`../HOUSEMASTER_GCP_GATE_MCP_CONCEPT.md`](../HOUSEMASTER_GCP_GATE_MCP_CONCEPT.md) (HM-MCP-001, approved)

---

## What this is

A standalone, local, **read-only** MCP server that reports HouseMaster repo/gate state as structured JSON, per the HM-MCP-001 concept document. It exists to reduce manual screenshot/status handoff between Claude Code, ChatGPT, and future agents — it does not execute, approve, or mutate anything.

## Standalone package — not part of the pnpm workspace

This package deliberately lives **outside** the HouseMaster monorepo's `pnpm-workspace.yaml` scope (`apps/*`, `packages/*`). It has its own `package.json` and, once installed, its own `node_modules` — nothing here is linked into `apps/web` or any root workspace tooling (`turbo`, root scripts, etc.).

This is a structural decision (HM-MCP-002), not an oversight: the MCP server is operational tooling for the *session*, not application code for the product.

## Tools

### v0.1 (this skeleton)

- **`hm_repo_status`** — returns branch, HEAD, origin alignment, and working-tree status (staged/modified/untracked files) for the HouseMaster repo, plus `risk_flags` for secret-looking filenames (never file contents). Implemented via the same read-only `git` commands already validated safe in this project's GCP gate workflow: `git status --short`, `git branch --show-current`, `git rev-parse HEAD`, plus an upstream-comparison for origin alignment.

### Deferred (not in this skeleton)

- `hm_gate_status`, `hm_diff_summary`, `hm_handoff_report` — per the concept doc's §8/§9 roadmap. Each requires its own scoped, separately-approved scaffold pass.

## Forbidden (enforced by convention, not yet by code)

Per the concept doc §10/§21, this server must never run `terraform apply/destroy`, `gcloud secrets versions access`, `prisma migrate deploy`, `psql`, database mutations, or deployment commands; must never read `.env`, print secret payloads, auto-approve gates, or push/deploy automatically. A `hm_gate_policy_check` enforcement tool is future (v0.2) scope — v0.1 relies on `hm_repo_status` only ever shelling out to the fixed, hardcoded read-only git commands listed above.

## Running (not yet approved)

Dependencies have not been installed, and the server has not been built or run. Once separately approved:

```bash
cd ops/mcp/housemaster-gcp-gate-mcp
pnpm install   # or npm install — standalone, no workspace protocol deps
pnpm build
pnpm start
```

Exact dependency versions in `package.json` are unpinned placeholders and should be reviewed/confirmed before install.
