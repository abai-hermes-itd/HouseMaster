#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { hmRepoStatus } from "./tools/repoStatus.js";

// Read-only MCP server (HM-MCP-002 skeleton). Exposes exactly one tool.
// Must never execute infrastructure, secrets, database, deployment, or
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

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("housemaster-gcp-gate-mcp failed to start:", err);
  process.exit(1);
});
