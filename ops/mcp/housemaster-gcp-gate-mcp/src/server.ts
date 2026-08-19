#!/usr/bin/env node
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { hmRepoStatus } from "./tools/repoStatus.js";
import { hmGateStatus } from "./tools/gateStatus.js";
import { hmDiffSummary } from "./tools/diffSummary.js";

// Read-only MCP server. Exposes hm_repo_status (HM-MCP-002),
// hm_gate_status (HM-MCP-004), and hm_diff_summary (HM-MCP-005). Must
// never execute infrastructure, secrets, database, deployment, or
// approval decisions — see ../HOUSEMASTER_GCP_GATE_MCP_CONCEPT.md.
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

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("housemaster-gcp-gate-mcp failed to start:", err);
  process.exit(1);
});
