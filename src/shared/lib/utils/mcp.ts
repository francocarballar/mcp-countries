// Types and interfaces
import type { Context } from 'hono'

// Modules and main functions
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { toFetchResponse, toReqRes } from 'fetch-to-node'

// Config
import { MCP_CONFIG, MCP_SERVER_OPTIONS } from '../../../shared/config/mcp/config'

// Utils
import { provisionMcpTransport } from '../../../shared/lib/utils/mcpTransport'
import { createMcpErrorResponse } from '../../../shared/lib/utils/errors'
import { createMcpLogger } from '../../../shared/lib/utils/logger'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'

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

/**
 * @function handleMcpRequest
 * @description Handles MCP requests based on the HTTP method
 * @param c - Hono context
 * @param method - HTTP method (POST, GET, DELETE)
 * @param transportsStore - Store of active transports
 * @param logger - Logger instance
 * @param parsedBody - Parsed request body
 * @returns Hono response
 */
export async function handleMcpRequest(
  c: Context,
  method: 'POST' | 'GET' | 'DELETE',
  transportsStore: { [sessionId: string]: StreamableHTTPServerTransport },
  logger: ReturnType<typeof createMcpLogger>,
  parsedBody?: Record<string, any>
) {
  logger.log(`${method} /mcp - Request received`, {
    url: c.req.url,
    headers: JSON.stringify(c.req.header(), null, 2)
  })

  const { req, res } = toReqRes(c.req.raw)
  const sessionId = req.headers['mcp-session-id'] as string | undefined
  logger.log(`Extracted MCP Session ID from headers: ${sessionId}`)

  // Get request ID for error responses (only available in POST with body)
  const rpcRequestId = parsedBody ? (parsedBody as any)?.id ?? null : null

  let transport: StreamableHTTPServerTransport | undefined
  let isNewSession = false

  // POST may create a new transport, GET/DELETE must use existing
  if (method === 'POST' && parsedBody) {
    // For POST, we might need to provision a new transport if it's an initialize request
    const provisionResult = await provisionMcpTransport(c, sessionId, parsedBody, {
      transportsStore,
      mcpServerInstance: SERVER,
      logger
    })

    if (provisionResult.response) {
      logger.log('Transport provisioning returned a direct response (error or invalid request).')
      return provisionResult.response
    }

    transport = provisionResult.transport
    isNewSession = provisionResult.isNewSession

    if (!transport) {
      logger.error('Critical: Transport not provisioned and no error response returned by provisionMcpTransport.')
      return createMcpErrorResponse(
        c,
        {
          code: -32004,
          message: 'Internal Server Error: Transport provisioning failed silently.'
        },
        rpcRequestId,
        500
      )
    }
  } else {
    // For GET/DELETE, we must use an existing transport
    if (!sessionId || !transportsStore[sessionId]) {
      logger.error(
        `Invalid request for ${method} /mcp: No valid session ID provided or transport not found.`,
        { sessionId }
      )
      return createMcpErrorResponse(
        c,
        { code: -32000, message: 'Bad Request: No valid session ID provided' },
        null,
        400
      )
    }

    transport = transportsStore[sessionId]
  }

  // Get effective session ID (for logging and error handling)
  const effectiveSessionId =
    sessionId ||
    (transport as any)._sessionId ||
    (transport as any).sessionId ||
    'unknown_session'

  logger.log(
    `Calling transport.handleRequest() for session ID: ${effectiveSessionId}. Is new session: ${isNewSession}`
  )

  try {
    // Pass body only for POST requests
    if (method === 'POST' && parsedBody) {
      await transport.handleRequest(req, res, parsedBody)
    } else {
      await transport.handleRequest(req, res)
    }
    
    logger.log(
      `transport.handleRequest() completed for ${method}. Response writableEnded: ${res.writableEnded}`
    )
  } catch (error: any) {
    logger.error(`Error during transport.handleRequest for ${method}`, error, {
      sessionId: effectiveSessionId
    })
    
    if (!res.writableEnded) {
      // Manual error response if stream not ended
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify({
          jsonrpc: '2.0',
          error: {
            code: -32603,
            message: 'Internal server error during request handling'
          },
          id: rpcRequestId
        })
      )
      logger.log(
        `Responded with 500 Internal Server Error after exception in handleRequest for ${method}.`
      )
    }
  }
  
  logger.log(`Returning response to Hono. ${method} /mcp request processing finished.`)
  return toFetchResponse(res)
}
