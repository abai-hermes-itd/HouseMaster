#!/usr/bin/env node
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { hmRepoStatus } from "./tools/repoStatus.js";
import { hmGateStatus } from "./tools/gateStatus.js";
import { hmDiffSummary } from "./tools/diffSummary.js";
import { hmHandoffReport } from "./tools/handoffReport.js";
import { hmSecretScanSummary } from "./tools/secretScanSummary.js";
import { hmCommandResultWrapper } from "./tools/commandResultWrapper.js";
import { hmGatePolicyCheckBatch } from "./tools/gatePolicyCheck.js";

// Read-only MCP server. Exposes hm_repo_status (HM-MCP-002),
// hm_gate_status (HM-MCP-004), hm_diff_summary (HM-MCP-005),
// hm_handoff_report (HM-MCP-006), hm_secret_scan_summary (HM-MCP-007),
// hm_command_result_wrapper (HM-MCP-008), and hm_gate_policy_check
// (HM-MCP-009). Must never execute infrastructure, secrets, database,
// deployment, or approval decisions — see
// ../HOUSEMASTER_GCP_GATE_MCP_CONCEPT.md and ../HM_MCP_V0_2_CONCEPT.md.
const server = new McpServer({
  name: "housemaster-gcp-gate-mcp",
  version: "0.1.0",
});

server.registerTool(
  "hm_repo_status",
  {
    title: "HouseMaster repo status",
    description:
      "Read-only report of git branch, HEAD, origin alignment, and working-tree status for the HouseMaster repository. Never mutates state.",
    inputSchema: {},
  },
  async () => {
    const result = await hmRepoStatus();
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  },
);

server.registerTool(
  "hm_gate_status",
  {
    title: "HouseMaster gate status",
    description:
      "Read-only inventory of active and closed HouseMaster GCP gate documents (sprints/01_ACTIVE, sprints/02_COMPLETED), with best-effort status/blocked signals. Never reads .env or full file bodies; never mutates state.",
    inputSchema: {},
  },
  async () => {
    const result = await hmGateStatus();
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  },
);

const diffSummaryInputShape = {
  files: z
    .array(z.string())
    .describe("Relative file paths to diff, explicitly approved by the caller."),
};

// Confirmed (isolated single-tool test build): registering ANY tool
// with a non-empty Zod input shape triggers TS2589 "Type instantiation
// is excessively deep and possibly infinite" with this exact
// typescript@5.9.3 + @modelcontextprotocol/sdk@1.30.0 pairing — not
// caused by our shape's content (tested with and without .describe()),
// and not caused by cumulative complexity from multiple registerTool
// calls (fails even with this as the only registered tool). This is a
// type-checker-only limitation; the emitted JavaScript and runtime
// behavior are correct regardless. Narrowly cast `server` to `any` for
// this one call only, so TypeScript's generic overload resolution is
// bypassed here without weakening type-checking anywhere else in the
// file. The handler keeps an explicit, correct parameter type
// (`{ files: string[] }`) so real argument-shape mistakes still fail
// at compile time inside the handler body.
(server as any).registerTool(
  "hm_diff_summary",
  {
    title: "HouseMaster diff summary",
    description:
      "Read-only git diff for an explicit, caller-approved list of files only — never diffs the whole repo. Rejects paths that escape the repository root or look secret-shaped, even if explicitly requested. Diff text is withheld (secret_detected: true, action: stop_and_redact) if it appears to contain a secret-shaped value; the value itself is never printed.",
    inputSchema: diffSummaryInputShape,
  },
  async ({ files }: { files: string[] }) => {
    const result = await hmDiffSummary(files);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  },
);

const handoffReportInputShape = {
  next_safe_step: z
    .string()
    .optional()
    .describe(
      "Optional, caller-supplied next safe step. Never inferred by the tool itself.",
    ),
};

// Same confirmed TS2589 workaround as hm_diff_summary above — applied
// proactively here rather than re-discovered, since any non-empty Zod
// shape triggers it with this typescript@5.9.3 + SDK@1.30.0 pairing.
(server as any).registerTool(
  "hm_handoff_report",
  {
    title: "HouseMaster session handoff report",
    description:
      "Read-only markdown session handoff, composing hm_repo_status and hm_gate_status (branch, HEAD, origin alignment, tracked status, active/closed gates, open risks). Reports active gates as a full list rather than inventing a single 'current gate'. next_safe_step is caller-supplied only, never inferred.",
    inputSchema: handoffReportInputShape,
  },
  async ({ next_safe_step }: { next_safe_step?: string }) => {
    const markdown = await hmHandoffReport({ next_safe_step });
    return {
      content: [{ type: "text", text: markdown }],
    };
  },
);

const secretScanSummaryInputShape = {
  text: z
    .string()
    .describe(
      "Caller-supplied block of text to scan (e.g. command stdout, a pasted log, an already-read file's content). Never a file path — this tool does not read files itself.",
    ),
};

// Same confirmed TS2589 workaround as hm_diff_summary/hm_handoff_report
// above — any non-empty Zod input shape triggers it with this
// typescript@5.9.3 + SDK@1.30.0 pairing.
(server as any).registerTool(
  "hm_secret_scan_summary",
  {
    title: "HouseMaster secret scan summary",
    description:
      "Runs the same shared secret-pattern check hm_diff_summary uses against an explicit, caller-supplied text block. Never reads a file path itself, never reads .env, never returns the matched substring — only a secret_detected/secret_printed/action verdict.",
    inputSchema: secretScanSummaryInputShape,
  },
  async ({ text }: { text: string }) => {
    const result = hmSecretScanSummary(text);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  },
);

const commandResultWrapperInputShape = {
  command: z
    .string()
    .describe("Command string, for labeling only — this tool never executes it."),
  exit_code: z.number().describe("Exit code already captured by the caller."),
  stdout: z.string().describe("Stdout already captured by the caller."),
  run_secret_scan: z
    .boolean()
    .optional()
    .describe("Whether to run hm_secret_scan_summary against stdout. Defaults to false."),
};

(server as any).registerTool(
  "hm_command_result_wrapper",
  {
    title: "HouseMaster command result wrapper",
    description:
      "Reshapes a command result the caller already produced elsewhere (by hand, or via an already-approved execution gate) into one structured JSON shape. Never runs the labeled command itself.",
    inputSchema: commandResultWrapperInputShape,
  },
  async (input: {
    command: string;
    exit_code: number;
    stdout: string;
    run_secret_scan?: boolean;
  }) => {
    const result = hmCommandResultWrapper(input);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  },
);

const gatePolicyCheckInputShape = {
  commands: z
    .array(z.string())
    .describe(
      "One or more proposed command strings to classify against the embedded safe-allowlist/forbidden-list. Never executed by this tool.",
    ),
};

(server as any).registerTool(
  "hm_gate_policy_check",
  {
    title: "HouseMaster gate policy check",
    description:
      "Classifies each proposed command as allowed_readonly, requires_explicit_approval, or forbidden against an embedded minimal rule map consistent with Gate Safety Policy v0.1. Never executes the classified command. Fails closed to requires_explicit_approval on anything it cannot confidently match. A classification is never itself an authorization to run the command.",
    inputSchema: gatePolicyCheckInputShape,
  },
  async ({ commands }: { commands: string[] }) => {
    const result = hmGatePolicyCheckBatch(commands);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("housemaster-gcp-gate-mcp failed to start:", err);
  process.exit(1);
});
