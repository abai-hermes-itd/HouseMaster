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

const EXPECTED_TOOL_NAME = "hm_repo_status";

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

    if (toolNames.length !== 1 || toolNames[0] !== EXPECTED_TOOL_NAME) {
      throw new Error(
        `Expected exactly one tool named "${EXPECTED_TOOL_NAME}", got: ${JSON.stringify(toolNames)}`,
      );
    }

    const result = await client.callTool({
      name: EXPECTED_TOOL_NAME,
      arguments: {},
    });

    console.log(`\n${EXPECTED_TOOL_NAME} result:`);
    console.log(JSON.stringify(result, null, 2));

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
