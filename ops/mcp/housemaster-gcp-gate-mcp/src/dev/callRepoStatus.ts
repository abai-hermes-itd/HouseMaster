#!/usr/bin/env node
/**
 * HM-MCP-003 — one-shot end-to-end validation harness for hm_repo_status.
 *
 * Spawns the compiled server (dist/server.js) as a real MCP client would,
 * performs the standard initialize -> listTools -> callTool round-trip,
 * prints the result, and shuts the child process down explicitly.
 *
 * This is dev-only tooling. It does NOT register anything with Claude
 * Code's own MCP configuration — it is a fully self-contained client
 * that talks only to this package's own compiled server over stdio.
 *
 * Usage: pnpm validate   (requires `pnpm build` to have run first, since
 * this spawns the compiled dist/server.js, not the TS source directly)
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

// Multi-tool-safe: checks that each expected tool is present (by
// inclusion), not that the server has exactly one tool total — so this
// keeps working as more tools are registered.
const EXPECTED_TOOL_NAMES = [
  "hm_repo_status",
  "hm_gate_status",
  "hm_diff_summary",
  "hm_handoff_report",
];

// hm_diff_summary requires real input. These are explicit, deliberately
// safe, self-referential test files (this package's own README/manifest
// plus its own currently-modified server.ts — never anything
// secret-shaped) used only to exercise the tool end-to-end; not a
// general-purpose diff request. server.ts is included specifically so
// this run also exercises the diff_text/diff_stat-populated path, not
// only the "no changes -> null" path.
const TOOL_ARGUMENTS: Record<string, Record<string, unknown>> = {
  hm_repo_status: {},
  hm_gate_status: {},
  hm_diff_summary: {
    files: [
      "ops/mcp/housemaster-gcp-gate-mcp/README.md",
      "ops/mcp/housemaster-gcp-gate-mcp/package.json",
      "ops/mcp/housemaster-gcp-gate-mcp/src/server.ts",
    ],
  },
  hm_handoff_report: {
    next_safe_step: "HM-MCP-006 validation test run",
  },
};

async function main() {
  const transport = new StdioClientTransport({
    command: "node",
    args: ["dist/server.js"],
  });

  const client = new Client({
    name: "hm-mcp-003-validator",
    version: "0.1.0",
  });

  try {
    await client.connect(transport);

    const { tools } = await client.listTools();
    const toolNames = tools.map((t) => t.name);
    console.log("Registered tools:", JSON.stringify(toolNames));

    const missing = EXPECTED_TOOL_NAMES.filter((n) => !toolNames.includes(n));
    if (missing.length > 0) {
      throw new Error(
        `Expected tools missing from server: ${JSON.stringify(missing)}. Registered: ${JSON.stringify(toolNames)}`,
      );
    }

    for (const name of EXPECTED_TOOL_NAMES) {
      const result = await client.callTool({
        name,
        arguments: TOOL_ARGUMENTS[name] ?? {},
      });
      console.log(`\n${name} result:`);
      console.log(JSON.stringify(result, null, 2));
    }

    console.log("\nHM-MCP-003 validation: PASS");
  } finally {
    // Explicit, unconditional cleanup — always close the client (which
    // closes the stdio transport) so the spawned `node dist/server.js`
    // child process never survives this script.
    await client.close();
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("HM-MCP-003 validation: FAIL");
    console.error(err);
    process.exit(1);
  });
