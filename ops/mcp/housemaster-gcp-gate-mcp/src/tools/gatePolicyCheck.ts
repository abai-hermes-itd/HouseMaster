export type GatePolicyClassification =
  | "allowed_readonly"
  | "requires_explicit_approval"
  | "forbidden";

export interface GatePolicyCheckResult {
  command: string;
  classification: GatePolicyClassification;
  reason: string;
  requires_human_approval: boolean;
}

interface RuleEntry {
  pattern: RegExp;
  reason: string;
}

// Embedded minimal rule map — deliberately NOT read from
// GATE_SAFETY_POLICY_V0.md or any other file, at build time or call
// time (per the P6 decision gate, 2026-08-29, recorded in
// HM_MCP_V0_2_CONCEPT.md §8). Mirrors that policy's §5 safe allowlist
// and §5/operating-model strict-forbidden list by hand. Trade-off
// accepted: this map needs manual upkeep if the policy text changes —
// the same trade-off hard-rules.json already carries for the
// draft-only CLI tools.
const FORBIDDEN_RULES: RuleEntry[] = [
  { pattern: /terraform\s+(apply|destroy)\b/i, reason: "matches strict-forbidden pattern: terraform apply/destroy" },
  { pattern: /gcloud\s+secrets\s+versions\s+access\b/i, reason: "matches strict-forbidden pattern: gcloud secrets versions access" },
  { pattern: /prisma\s+(migrate\s+deploy|db\s+push|db\s+pull)\b/i, reason: "matches strict-forbidden pattern: prisma migrate deploy / db push / db pull" },
  { pattern: /\bpsql\b/i, reason: "matches strict-forbidden pattern: psql" },
  { pattern: /gcloud\s+run\s+deploy\b|gcloud\s+builds\s+submit\b|cloudbuild/i, reason: "matches strict-forbidden pattern: deployment command" },
  { pattern: /^git\s+(add|commit|push)\b/i, reason: "matches strict-forbidden pattern: git add/commit/push outside its own dedicated gate" },
  { pattern: /\.env\b/i, reason: "matches strict-forbidden pattern: reads/references a .env file" },
];

const ALLOWED_READONLY_RULES: RuleEntry[] = [
  { pattern: /^git status --short$/, reason: "matches safe allowlist: git status --short" },
  { pattern: /^git branch --show-current$/, reason: "matches safe allowlist: git branch --show-current" },
  { pattern: /^git rev-parse HEAD$/, reason: "matches safe allowlist: git rev-parse HEAD" },
  { pattern: /^git log --oneline --decorate(\s+-\d+)?$/, reason: "matches safe allowlist: git log --oneline --decorate" },
  { pattern: /^git diff --stat$/, reason: "matches safe allowlist: git diff --stat" },
  { pattern: /^git diff --\s+\S+/, reason: "matches safe allowlist: git diff -- <explicit-approved-files-only>" },
];

/**
 * hm_gate_policy_check (HM-MCP-009) — classifies a single proposed
 * command string against the embedded allowlist/forbidden-list above.
 * Never executes the command it classifies. Fails closed to
 * "requires_explicit_approval" on anything it cannot confidently match
 * to either list — there is no "auto-approved" classification value.
 */
export function hmGatePolicyCheck(command: string): GatePolicyCheckResult {
  const trimmed = command.trim();

  for (const rule of FORBIDDEN_RULES) {
    if (rule.pattern.test(trimmed)) {
      return {
        command: trimmed,
        classification: "forbidden",
        reason: rule.reason,
        requires_human_approval: true,
      };
    }
  }

  for (const rule of ALLOWED_READONLY_RULES) {
    if (rule.pattern.test(trimmed)) {
      return {
        command: trimmed,
        classification: "allowed_readonly",
        reason: rule.reason,
        requires_human_approval: false,
      };
    }
  }

  return {
    command: trimmed,
    classification: "requires_explicit_approval",
    reason: "no confident match to the embedded allowlist or forbidden-list; failing closed",
    requires_human_approval: true,
  };
}

/** Classifies a short list of proposed commands, one result per input. */
export function hmGatePolicyCheckBatch(
  commands: string[],
): GatePolicyCheckResult[] {
  return commands.map(hmGatePolicyCheck);
}
