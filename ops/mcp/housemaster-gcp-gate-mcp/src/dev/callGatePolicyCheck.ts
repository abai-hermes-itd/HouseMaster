#!/usr/bin/env node
/**
 * HM-MCP-009 — local function-invocation self-test for
 * hm_gate_policy_check. Imports and calls hmGatePolicyCheck directly.
 * This tool never executes any of the commands it classifies, and
 * neither does this script.
 *
 * Usage: node_modules/.bin/tsx src/dev/callGatePolicyCheck.ts
 */
import { hmGatePolicyCheck } from "../tools/gatePolicyCheck.js";

const cases: {
  command: string;
  expectClassification: "allowed_readonly" | "requires_explicit_approval" | "forbidden";
}[] = [
  { command: "git status --short", expectClassification: "allowed_readonly" },
  { command: "git rev-parse HEAD", expectClassification: "allowed_readonly" },
  { command: "git diff -- sprints/04_RUNBOOKS/GATE_SAFETY_POLICY_V0.md", expectClassification: "allowed_readonly" },
  { command: "terraform apply", expectClassification: "forbidden" },
  { command: "gcloud secrets versions access latest --secret=database-url", expectClassification: "forbidden" },
  { command: "prisma migrate deploy", expectClassification: "forbidden" },
  { command: "git push", expectClassification: "forbidden" },
  { command: "cat .env", expectClassification: "forbidden" },
  { command: "pnpm build", expectClassification: "requires_explicit_approval" },
];

let failures = 0;
for (const c of cases) {
  const result = hmGatePolicyCheck(c.command);
  console.log(`${c.command} ->`, JSON.stringify(result));

  if (result.classification !== c.expectClassification) {
    failures++;
    console.error(
      `  MISMATCH: expected classification=${c.expectClassification}, got ${result.classification}`,
    );
  }
}

// Never a fourth "auto-approved" value, regardless of input.
const knownValues = ["allowed_readonly", "requires_explicit_approval", "forbidden"];
for (const c of cases) {
  const result = hmGatePolicyCheck(c.command);
  if (!knownValues.includes(result.classification)) {
    failures++;
    console.error(`  MISMATCH: unexpected classification value "${result.classification}"`);
  }
}

if (failures > 0) {
  console.error(`\nHM-MCP-009 self-test: FAIL (${failures} mismatch(es))`);
  process.exit(1);
}
console.log("\nHM-MCP-009 self-test: PASS");
