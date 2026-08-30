#!/usr/bin/env node
// Hard-rule validator for the HouseMaster approval-pack gate templates.
//
// Checks that a gate request's "Forbidden:" section contains all the hard-rule
// lines required by its template type, before a human or agent acts on it.
//
// This targets a real failure mode observed in Sprint 4 (HM-GCP-004X-1B history):
// a truncated approval message silently dropped two forbidden-list lines
// ("do not change Cloud SQL password", "do not update database-url secret"),
// which — if acted on without noticing — would have authorized a materially
// different, more dangerous action than intended.
//
// Usage:
//   node validate-gate-request.mjs --template <template-id> <path-to-request.txt>
//   cat request.txt | node validate-gate-request.mjs --template <template-id>
//
// Template ids: docs-only | execution | secret-execution | endpoint-iam-retest
//               | commit | push | gate-closure
//
// Exit code: 0 if all required rules matched, 1 if any are missing,
// 2 on usage/config error.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

function usageAndExit(code) {
  console.error(
    "Usage: node validate-gate-request.mjs --template <template-id> [request-file]\n" +
      "       (reads stdin if no file is given)\n\n" +
      "Template ids: docs-only | execution | secret-execution | endpoint-iam-retest | commit | push | gate-closure"
  );
  process.exit(code);
}

function parseArgs(argv) {
  const args = { template: null, file: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--template" || argv[i] === "-t") {
      args.template = argv[++i];
    } else if (argv[i] === "--help" || argv[i] === "-h") {
      usageAndExit(0);
    } else if (!argv[i].startsWith("-")) {
      args.file = argv[i];
    }
  }
  return args;
}

function readStdin() {
  try {
    return readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

// Extracts the text of the "Forbidden:" section — from a line starting with
// "Forbidden" (optionally followed by ':') up to the next line starting with
// "Report" (or end of input if there is none).
function extractForbiddenSection(text) {
  const lines = text.split(/\r?\n/);
  let start = -1;
  let end = lines.length;
  for (let i = 0; i < lines.length; i++) {
    if (start === -1 && /^\s*forbidden\s*:?\s*$/i.test(lines[i].trim()) || (start === -1 && /^\s*forbidden\s*:/i.test(lines[i]))) {
      start = i;
      continue;
    }
    if (start !== -1 && /^\s*report\s*:?\s*$/i.test(lines[i].trim())) {
      end = i;
      break;
    }
  }
  if (start === -1) return null;
  return lines.slice(start, end).join("\n");
}

function loadRuleSet(templateId) {
  const configPath = join(__dirname, "hard-rules.json");
  const config = JSON.parse(readFileSync(configPath, "utf8"));
  const tpl = config.templates[templateId];
  if (!tpl) {
    console.error(
      `Unknown template id "${templateId}". Valid ids: ${Object.keys(config.templates).join(", ")}`
    );
    process.exit(2);
  }
  const rules = tpl.use === "shared_core_rules" ? config.shared_core_rules : tpl.rules;
  return { label: tpl.label, rules };
}

function main() {
  const { template, file } = parseArgs(process.argv.slice(2));
  if (!template) usageAndExit(2);

  const { label, rules } = loadRuleSet(template);

  const text = file ? readFileSync(file, "utf8") : readStdin();
  if (!text || !text.trim()) {
    console.error("No request text provided (empty file/stdin).");
    process.exit(2);
  }

  const forbiddenSection = extractForbiddenSection(text);

  console.log(`Template: ${label} (${template})`);
  console.log(
    forbiddenSection
      ? "Forbidden section: found"
      : "Forbidden section: NOT FOUND — treating as all rules missing"
  );
  console.log("");

  let allPass = true;
  const results = [];
  for (const rule of rules) {
    const haystack = forbiddenSection || "";
    const matched = rule.patterns.some((p) => new RegExp(p, "i").test(haystack));
    if (!matched) allPass = false;
    results.push({ id: rule.id, desc: rule.desc, matched });
  }

  const idWidth = Math.max(...results.map((r) => r.id.length));
  for (const r of results) {
    const status = r.matched ? "PASS" : "MISSING";
    console.log(`  [${status.padEnd(7)}] ${r.id.padEnd(idWidth)}  ${r.desc}`);
  }

  console.log("");
  console.log(allPass ? "Overall: PASS — all required hard rules present." : "Overall: FAIL — one or more required hard rules are missing. Do not act on this request as-is; ask for the missing rules in full before proceeding.");

  process.exit(allPass ? 0 : 1);
}

main();
