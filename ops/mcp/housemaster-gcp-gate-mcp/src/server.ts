#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { hmRepoStatus } from "./tools/repoStatus.js";
import { hmGateStatus } from "./tools/gateStatus.js";

// Read-only MCP server. Exposes hm_repo_status (HM-MCP-002) and
// hm_gate_status (HM-MCP-004). Must never execute infrastructure,
// secrets, database, deployment, or approval decisions — see
// ../HOUSEMASTER_GCP_GATE_MCP_CONCEPT.md.
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

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("housemaster-gcp-gate-mcp failed to start:", err);
  process.exit(1);
});
