// Modules and main functions
import { Hono } from 'hono'

// MCP logic
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { handleMcpRequest, SERVER } from '@/shared/lib/utils/mcp'

// Utils
import { createMcpLogger } from '@/shared/lib/utils/logger'
import { parseMcpRequestBody } from '@/shared/lib/utils/parseMcpRequestBody'

// Tools
import { getAllCountries } from '@/shared/lib/tools/getAllCountries'


/**
 * @function countries
 * @description Creates and configures a Hono app for handling MCP HTTP requests
 * @returns A configured Hono instance with MCP routes
 */
export const countries = (): Hono => {
  const countriesApp = new Hono()
  const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {}
  const mcpLogger = createMcpLogger('[MCP-HTTP]')

  mcpLogger.log('Router initialized. Waiting for requests to /mcp...')

  // Register tools with SERVER once at startup
  try {
    mcpLogger.log(
      "Registering 'getAllCountries' tool with SERVER instance at application startup."
    )
    getAllCountries(SERVER)
  } catch (error: any) {
    mcpLogger.error(
      "CRITICAL: Failed to register 'getAllCountries' tool at startup.",
      error
    )
  }

  // POST handler - processes request body and may create new transports
  countriesApp.post('/mcp', async c => {
    // Parse the body first for POST requests
    const bodyOrError = await parseMcpRequestBody(c, mcpLogger)
    if (bodyOrError instanceof Response) {
      return bodyOrError // Return early if body parsing failed
    }
    
    // Handle the request with the unified handler
    return handleMcpRequest(c, 'POST', transports, mcpLogger, bodyOrError)
  })

  // GET handler - for SSE connections
  countriesApp.get('/mcp', async c => {
    return handleMcpRequest(c, 'GET', transports, mcpLogger)
  })

  // DELETE handler - for ending sessions
  countriesApp.delete('/mcp', async c => {
    return handleMcpRequest(c, 'DELETE', transports, mcpLogger)
  })

  return countriesApp
}
