#!/usr/bin/env node
// Template-fill helper v0.1 for the HouseMaster approval-pack gate templates.
//
// Fills an existing TEMPLATE_*.md "Fill-in-the-blank request" block from CLI
// flags and prints the generated approval request to stdout. It does not
// execute anything the generated request describes — it only produces text
// for a human (or agent) to review and then explicitly approve separately.
//
// Supported templates: COMMIT_GATE, PUSH_GATE (see fill-rules.json for the
// exact source file and required flags per template).
//
// Usage:
//   node fill-gate-template.mjs --template COMMIT_GATE --what "<description>" \
//       --target <path> --commit-message "<message>"
//   node fill-gate-template.mjs --template PUSH_GATE --what "<description>"
//
// Exit codes:
//   0 = filled request printed to stdout.
//   2 = refused (unknown template, missing source file, or missing required
//       input) — nothing is printed to stdout; the reason goes to stderr.

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const RUNBOOKS_DIR = join(__dirname, ".."); // sprints/04_RUNBOOKS
const RULES_PATH = join(__dirname, "fill-rules.json");

const DISCLAIMER =
  "This is a generated approval request. It must still be explicitly approved by the user before execution.";

function usageAndExit(code) {
  console.error(
    "Usage: node fill-gate-template.mjs --template <COMMIT_GATE|PUSH_GATE> --what \"<description>\" [--target <path>] [--commit-message \"<message>\"]\n" +
      "Prints a filled approval-pack request to stdout. Does not execute anything."
  );
  process.exit(code);
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") usageAndExit(0);
    if (a.startsWith("--")) {
      const key = a.slice(2);
      args[key] = argv[i + 1];
      i++;
    }
  }
  return args;
}

function loadRules() {
  const config = JSON.parse(readFileSync(RULES_PATH, "utf8"));
  return config.templates;
}

// Extracts the body of the fenced code block under the "## Fill-in-the-blank
// request" heading in a template markdown file. Returns null if either the
// heading or a following fenced block cannot be found.
function extractFillBlock(mdText) {
  const heading = "## Fill-in-the-blank request";
  const hIdx = mdText.indexOf(heading);
  if (hIdx === -1) return null;
  const afterHeading = mdText.slice(hIdx);
  const fenceStart = afterHeading.indexOf("```");
  if (fenceStart === -1) return null;
  const rest = afterHeading.slice(fenceStart + 3);
  const fenceEnd = rest.indexOf("```");
  if (fenceEnd === -1) return null;
  return rest.slice(0, fenceEnd).replace(/^\n/, "").replace(/\n$/, "");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const templateId = args.template ? String(args.template).toUpperCase() : null;

  if (!templateId) {
    console.error("Refused: --template is required (COMMIT_GATE | PUSH_GATE).");
    usageAndExit(2);
  }

  const rules = loadRules();
  const rule = rules[templateId];
  if (!rule) {
    console.error(
      `Refused: unknown template "${templateId}". Supported: ${Object.keys(rules).join(", ")}`
    );
    process.exit(2);
  }

  const sourcePath = join(RUNBOOKS_DIR, rule.sourceFile);
  if (!existsSync(sourcePath)) {
    console.error(`Refused: source template file not found: ${sourcePath}`);
    process.exit(2);
  }

  const missing = (rule.requiredFlags || []).filter(
    (f) => args[f] === undefined || String(args[f]).trim() === ""
  );
  if (missing.length > 0) {
    console.error(
      `Refused: missing required input(s) for ${templateId}: ${missing.map((f) => "--" + f).join(", ")}`
    );
    process.exit(2);
  }

  const mdText = readFileSync(sourcePath, "utf8");
  const block = extractFillBlock(mdText);
  if (!block) {
    console.error(
      `Refused: could not locate a "Fill-in-the-blank request" code block in ${sourcePath}`
    );
    process.exit(2);
  }

  let filled = block;
  for (const [placeholder, flag] of Object.entries(rule.placeholders || {})) {
    filled = filled.split(placeholder).join(args[flag]);
  }

  console.log(DISCLAIMER);
  console.log("");
  console.log(filled);
}

main();
