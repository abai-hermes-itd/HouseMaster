import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

// Fixed, hardcoded repo root and gate directories — never taken from
// caller input, never expanded into an arbitrary path. Only these two
// directories, and only .md files inside them, are ever read.
const REPO_ROOT = "C:\\Abay-Germes\\HouseMaster";
const ACTIVE_DIR = path.join(REPO_ROOT, "sprints", "01_ACTIVE");
const COMPLETED_DIR = path.join(REPO_ROOT, "sprints", "02_COMPLETED");

const STATUS_LINE = /^\*\*Status:\*\*\s*(.+)$/m;
const TITLE_LINE = /^#\s+(.+)$/m;
const BLOCKED_LINE = /^.*\bblocked\b.*$/im;

export interface GateInfo {
  id: string;
  file: string;
  title: string | null;
  status_text: string | null;
  blocked: boolean;
  blocked_reason: string | null;
}

export interface GateStatusResult {
  active_gates: GateInfo[];
  closed_gates: GateInfo[];
  risk_flags: string[];
}

function gateIdFromFilename(filename: string): string {
  // "HM-GCP-004X-3B_APP_LEVEL_DB_HEALTH_CHECK_GATE.md" -> "HM-GCP-004X-3B"
  return filename.split("_")[0];
}

async function readGateInfo(
  dir: string,
  filename: string,
  scanBlocked: boolean,
): Promise<GateInfo> {
  // Only ever reads a .md file inside one of the two hardcoded dirs above.
  const text = await readFile(path.join(dir, filename), "utf-8");

  const titleMatch = TITLE_LINE.exec(text);
  const statusMatch = STATUS_LINE.exec(text);
  // The "blocked" keyword scan is only meaningful for active gates. For
  // closed gates it produced false positives in practice: a Completed
  // gate's execution history/postmortem text can mention a past blocker
  // (e.g. "apply failed — blocked by Organization Policy") that has
  // nothing to do with the gate's current (closed) state. Confirmed via
  // HM-MCP-004 validation run against HM-GCP-003E.2-C. So this scan is
  // suppressed entirely for closed_gates rather than risk misreporting.
  const blockedMatch = scanBlocked ? BLOCKED_LINE.exec(text) : null;

  return {
    id: gateIdFromFilename(filename),
    file: path
      .relative(REPO_ROOT, path.join(dir, filename))
      .replace(/\\/g, "/"),
    // Only short, targeted single-line excerpts are ever lifted from the
    // file (a heading, a Status: line, a line containing "blocked").
    // The full file body is never included in the result.
    title: titleMatch ? titleMatch[1].trim() : null,
    status_text: statusMatch ? statusMatch[1].trim() : null,
    blocked: blockedMatch !== null,
    blocked_reason: blockedMatch ? blockedMatch[0].trim() : null,
  };
}

async function listMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".md"))
    .map((e) => e.name);
}

/**
 * hm_gate_status — read-only inventory of active and closed HouseMaster
 * gate documents, classified primarily by folder location
 * (sprints/01_ACTIVE vs sprints/02_COMPLETED — the only fully reliable
 * signal found across the existing corpus), with a best-effort raw
 * `**Status:**` line and a "blocked" keyword scan as secondary,
 * non-authoritative fields. Never reads or returns full file bodies,
 * never touches .env or any file outside the two hardcoded gate dirs.
 */
export async function hmGateStatus(): Promise<GateStatusResult> {
  const risk_flags: string[] = [];

  const activeFiles = await listMarkdownFiles(ACTIVE_DIR).catch(() => {
    risk_flags.push(`could not read ${ACTIVE_DIR}`);
    return [] as string[];
  });
  const completedFiles = await listMarkdownFiles(COMPLETED_DIR).catch(() => {
    risk_flags.push(`could not read ${COMPLETED_DIR}`);
    return [] as string[];
  });

  const active_gates = await Promise.all(
    activeFiles.map((f) => readGateInfo(ACTIVE_DIR, f, /* scanBlocked */ true)),
  );
  const closed_gates = await Promise.all(
    completedFiles.map((f) =>
      readGateInfo(COMPLETED_DIR, f, /* scanBlocked */ false),
    ),
  );

  return { active_gates, closed_gates, risk_flags };
}
