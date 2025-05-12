import type { ServerOptions } from '@modelcontextprotocol/sdk/server/index.js'
import type { Implementation } from '@modelcontextprotocol/sdk/types.js'

/**
 * @constant MCP_CONFIG
 * @description Configuration for the MCP server
 */
export const MCP_CONFIG: Implementation = {
  name: 'mcp-countries',
  description: 'A server that provides information about countries',
  version: '1.0.0',
  author: 'Franco Carballar',
  repository: 'https://github.com/francocarballar/mcp-countries.git',
  homepage: 'https://restcountries.francocarballar.com/'
}

/**
 * @constant MCP_SERVER_OPTIONS
 * @description Options for the MCP server
 */
export const MCP_SERVER_OPTIONS: ServerOptions = {
  capabilities: {
    logging: {}
  },
  instructions:
    'You are a helpful assistant that can answer questions about the countries in the world.'
}
