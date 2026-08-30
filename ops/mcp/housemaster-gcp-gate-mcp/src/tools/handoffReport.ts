import { hmRepoStatus } from "./repoStatus.js";
import { hmGateStatus } from "./gateStatus.js";

export interface HandoffReportInput {
  /**
   * Optional, caller-supplied. This tool never infers or fabricates a
   * "next safe step" from repo/gate state alone — that is a judgment
   * call belonging to the session, not something derivable from
   * structured data. If omitted, the report says so explicitly.
   */
  next_safe_step?: string;
}

// Static per the concept doc §10/§21 — this list does not change based
// on repo state, so it is not derived, just echoed for the reader.
const FORBIDDEN_ACTIONS = [
  "terraform apply / destroy",
  "gcloud secrets versions access",
  "prisma migrate deploy",
  "psql / database mutation queries",
  "deployment commands",
  "reading .env",
  "printing secret payloads (DATABASE_URL, passwords, service account keys)",
  "auto-approving gates",
  "pushing or deploying automatically",
];

/**
 * hm_handoff_report — composes hm_repo_status and hm_gate_status (called
 * in-process, not via a nested MCP round-trip) into one markdown session
 * handoff document, per the concept doc's §12 template.
 *
 * Two deliberate departures from the doc's literal template, both to
 * avoid fabricating data the tool has no basis for:
 *  - "Current gate" (singular) is reported as "Active gates" (plural,
 *    full list) — the real gate corpus has many simultaneously active
 *    gates; picking one as "current" would be an invented judgment call.
 *  - "Next safe step" is caller-supplied only, never inferred.
 */
export async function hmHandoffReport(
  input: HandoffReportInput = {},
): Promise<string> {
  const repo = await hmRepoStatus();
  const gates = await hmGateStatus();

  const trackedStatus = repo.tracked_clean
    ? "clean"
    : `modified: ${repo.modified_files.length}, staged: ${repo.staged_files.length}, untracked: ${repo.untracked_files.length}`;

  const originText = repo.origin_aligned
    ? "aligned"
    : "not aligned (or no upstream configured)";

  // gate `title` (when present) already comes from the file's own "#"
  // heading, which already starts with the gate id (e.g. "HM-GCP-004A —
  // DATABASE_URL Socket Format Decision") — so print title alone rather
  // than prefixing g.id again, which duplicated it (confirmed via
  // HM-MCP-006 validation run). Fall back to the bare id when no title
  // was found (matches hm_gate_status's own null-title handling).
  const activeGatesLines = gates.active_gates.length
    ? gates.active_gates
        .map(
          (g) => `- ${g.title ?? g.id}${g.blocked ? " (blocked)" : ""}`,
        )
        .join("\n")
    : "(none)";

  const closedGatesLines = gates.closed_gates.length
    ? gates.closed_gates.map((g) => `- ${g.id}`).join("\n")
    : "(none)";

  const openRisks: string[] = [
    ...repo.risk_flags,
    ...gates.risk_flags,
    ...gates.active_gates
      .filter((g) => g.blocked)
      .map((g) => `${g.id}: ${g.blocked_reason ?? "blocked"}`),
  ];
  const openRisksLines = openRisks.length
    ? openRisks.map((r) => `- ${r}`).join("\n")
    : "(none)";

  const nextSafeStep = input.next_safe_step?.trim() || "(not provided)";

  const forbiddenActionsLines = FORBIDDEN_ACTIONS.map((f) => `- ${f}`).join(
    "\n",
  );

  return `# HOUSEMASTER GCP SESSION HANDOFF

Branch: ${repo.branch}
HEAD: ${repo.head}
Origin: ${originText}
Tracked status: ${trackedStatus}

Active gates:
${activeGatesLines}

Closed gates:
${closedGatesLines}

Open risks:
${openRisksLines}

Next safe step: ${nextSafeStep}

Forbidden actions:
${forbiddenActionsLines}
`;
}
