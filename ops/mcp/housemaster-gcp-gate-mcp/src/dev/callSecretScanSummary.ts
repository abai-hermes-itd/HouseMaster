#!/usr/bin/env node
/**
 * HM-MCP-007 — local function-invocation self-test for
 * hm_secret_scan_summary. Imports and calls hmSecretScanSummary
 * directly (no MCP client/server round-trip, no process spawn) since
 * this tool is a pure function over caller-supplied text only.
 *
 * Usage: node_modules/.bin/tsx src/dev/callSecretScanSummary.ts
 */
import { hmSecretScanSummary } from "../tools/secretScanSummary.js";

const cases: { label: string; text: string; expectDetected: boolean }[] = [
  {
    label: "plain git status output",
    text: "?? foo.txt\n M bar.txt",
    expectDetected: false,
  },
  {
    label: "DATABASE_URL assignment",
    text: "DATABASE_URL=postgresql://user:pass@host:5432/db",
    expectDetected: true,
  },
  {
    label: "postgres connection string inline",
    text: "connecting to postgresql://housemaster:hunter2@10.0.0.1:5432/hm",
    expectDetected: true,
  },
  {
    label: "generic password assignment",
    text: 'password: "supersecret123"',
    expectDetected: true,
  },
  {
    label: "PEM private key block",
    text: "-----BEGIN RSA PRIVATE KEY-----\nMIIB...\n-----END RSA PRIVATE KEY-----",
    expectDetected: true,
  },
];

let failures = 0;
for (const c of cases) {
  const result = hmSecretScanSummary(c.text);
  console.log(`${c.label}:`, JSON.stringify(result));

  if (result.secret_detected !== c.expectDetected) {
    failures++;
    console.error(`  MISMATCH: expected secret_detected=${c.expectDetected}`);
  }
  if (result.secret_printed !== false) {
    failures++;
    console.error("  MISMATCH: secret_printed must always be false");
  }
}

if (failures > 0) {
  console.error(`\nHM-MCP-007 self-test: FAIL (${failures} mismatch(es))`);
  process.exit(1);
}
console.log("\nHM-MCP-007 self-test: PASS");
