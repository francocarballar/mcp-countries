// Modules and main functions
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

// Config
import { MCP_CONFIG, MCP_SERVER_OPTIONS } from '@/shared/config/mcp/config'

/**
 * @constant SERVER
 * @description Server for the MCP
 */
export const SERVER = new McpServer(MCP_CONFIG, MCP_SERVER_OPTIONS)

/**
 * @constant TRANSPORT
 * @description Transport for the MCP
 */
export const TRANSPORT = new StdioServerTransport()
