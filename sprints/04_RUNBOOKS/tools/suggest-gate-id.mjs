#!/usr/bin/env node
// Gate-ID numbering helper v0.1 for the HouseMaster approval-pack workflow.
//
// Scans the sprint doc set for existing gate-ID filenames (e.g.
// "HM-GCP-004X-3B_APP_LEVEL_DB_HEALTH_CHECK_GATE.md" -> id "HM-GCP-004X-3B")
// and either lists every ID it found, or — given a --prefix — suggests the
// next numeric suffix for that ID family.
//
// This tool only reads files and prints text. It never creates, renames, or
// writes any file, and it never picks a final ID on its own — the suggested
// next number still requires a human to confirm it (and to assign any
// letter/sub-level suffix), the same way every other output in this tools/
// directory is a draft for approval, not an executed action.
//
// Usage:
//   node suggest-gate-id.mjs --list [--dirs <dir1>,<dir2>,...]
//   node suggest-gate-id.mjs --prefix <ID_PREFIX> [--dirs <dir1>,<dir2>,...]
//
// Examples:
//   node suggest-gate-id.mjs --list
//   node suggest-gate-id.mjs --prefix HM-GCP-004X
//
// Default scan dirs (relative to the repo root): sprints/01_ACTIVE,
// sprints/02_COMPLETED — the two directories observed to hold gate/checklist
// docs with an ID in the filename. Pass --dirs to scan a different set.
//
// Exit codes:
//   0 = ran successfully (list printed, or a suggestion printed — including
//       the case where no existing IDs matched the given prefix).
//   2 = usage/refusal (neither --list nor --prefix given, or no scan
//       directory could be read).

import { readdirSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..", ".."); // sprints/04_RUNBOOKS/tools -> repo root
const DEFAULT_DIRS = ["sprints/01_ACTIVE", "sprints/02_COMPLETED"];

// Matches the ID segment at the start of a gate/checklist filename: a
// letter-led group, followed by one or more "-" or "." separated groups of
// letters/digits, ending right before the first underscore.
// e.g. "HM-GCP-004X-3B_APP_LEVEL..."      -> "HM-GCP-004X-3B"
//      "HM-CI-001_DEPLOY_IDENTITY..."     -> "HM-CI-001"
//      "HM-GCP-003E.2-B_SECRET_READINESS..." -> "HM-GCP-003E.2-B"
const ID_PATTERN = /^([A-Z]+(?:[-.][A-Z0-9]+)+)_/;

function usageAndExit(code) {
  console.error(
    "Usage: node suggest-gate-id.mjs --list [--dirs <dir1>,<dir2>,...]\n" +
      "       node suggest-gate-id.mjs --prefix <ID_PREFIX> [--dirs <dir1>,<dir2>,...]\n" +
      "Read-only: scans filenames for gate IDs and prints a list or a suggested next number. Creates nothing."
  );
  process.exit(code);
}

function parseArgs(argv) {
  const args = { dirs: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") usageAndExit(0);
    else if (a === "--list") args.list = true;
    else if (a === "--prefix") args.prefix = argv[++i];
    else if (a === "--dirs") args.dirs = argv[++i];
  }
  return args;
}

function scanDirs(dirs) {
  const found = []; // { id, file, dir }
  for (const relDir of dirs) {
    const absDir = join(REPO_ROOT, relDir);
    if (!existsSync(absDir) || !statSync(absDir).isDirectory()) {
      console.error(`Warning: scan directory not found, skipping: ${relDir}`);
      continue;
    }
    for (const file of readdirSync(absDir)) {
      const m = ID_PATTERN.exec(file);
      if (m) found.push({ id: m[1], file, dir: relDir });
    }
  }
  return found;
}

// Extracts the leading integer found anywhere in a string, e.g. "-3B" -> 3,
// "004X-4" -> 4 (last numeric group wins — the trailing counter is what a
// gate-ID suffix increments), "" -> null.
function trailingNumber(str) {
  const matches = [...str.matchAll(/\d+/g)];
  if (matches.length === 0) return null;
  return parseInt(matches[matches.length - 1][0], 10);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.list && !args.prefix) {
    console.error("Refused: specify --list or --prefix <ID_PREFIX>.");
    usageAndExit(2);
  }

  const dirs = args.dirs ? args.dirs.split(",").map((d) => d.trim()).filter(Boolean) : DEFAULT_DIRS;
  const found = scanDirs(dirs);

  if (found.length === 0) {
    console.error(`Refused: no gate-ID-pattern filenames found in: ${dirs.join(", ")}`);
    process.exit(2);
  }

  const ids = [...new Set(found.map((f) => f.id))].sort();

  if (args.list) {
    console.log(`Scanned: ${dirs.join(", ")}`);
    console.log(`Detected ${ids.length} distinct gate ID(s):`);
    console.log("");
    for (const f of found.sort((a, b) => a.id.localeCompare(b.id))) {
      console.log(`  ${f.id}  (${f.dir}/${f.file})`);
    }
    process.exit(0);
  }

  // --prefix mode
  const prefix = args.prefix;
  const matching = ids.filter((id) => id.startsWith(prefix));

  console.log(`Scanned: ${dirs.join(", ")}`);
  console.log(`Prefix: ${prefix}`);
  console.log("");

  if (matching.length === 0) {
    console.log(`No existing IDs found matching prefix "${prefix}".`);
    console.log(
      `Suggestion: this looks like a new family — pick a starting number by hand (e.g. "${prefix}-1" or "${prefix}A"), no existing sibling to increment from.`
    );
    process.exit(0);
  }

  console.log(`Existing IDs matching this prefix (${matching.length}):`);
  for (const id of matching) console.log(`  ${id}`);
  console.log("");

  const numbers = matching.map((id) => trailingNumber(id.slice(prefix.length))).filter((n) => n !== null);
  if (numbers.length === 0) {
    console.log(
      "Suggestion: could not find a numeric suffix on any matching ID — assign the next value by hand."
    );
    process.exit(0);
  }

  const maxNum = Math.max(...numbers);
  console.log(`Highest numeric suffix found: ${maxNum}`);
  console.log(
    `Suggested next number: ${maxNum + 1} (e.g. "${prefix}-${maxNum + 1}") — ` +
      `this is a suggestion only. Confirm it by hand, and assign any letter/sub-level ` +
      `suffix (A/B/.1/etc.) yourself; this tool does not infer that part.`
  );
}

main();
