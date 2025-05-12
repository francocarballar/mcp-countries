// Types and interfaces
import type { Context } from 'hono'
import type { McpTransportManagerOptions, ProvisionResult } from '@/shared/types/lib/utils/mcpTransport'

// Modules and main functions
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { isInitializeRequest } from '@modelcontextprotocol/sdk/types.js'
import { randomUUID } from 'node:crypto'

// Utils
import { createMcpErrorResponse } from './errors'

/**
 * @function provisionMcpTransport
 * @description Manages MCP transport provisioning for new and existing sessions.
 * @param c Hono Context
 * @param sessionId Current MCP session ID from headers (if any)
 * @param body Parsed request body
 * @param options Configuration for the transport manager
 * @returns An object containing the transport or an error response.
 */
export async function provisionMcpTransport (
  c: Context,
  sessionId: string | undefined,
  body: Record<string, any>,
  options: McpTransportManagerOptions
): Promise<ProvisionResult> {
  const { transportsStore, mcpServerInstance, logger } = options
  const rpcRequestId = (body as any)?.id ?? null // Extract id for error reporting

  if (sessionId && transportsStore[sessionId]) {
    logger.log(`Reusing existing transport for session ID: ${sessionId}`)
    return { transport: transportsStore[sessionId], isNewSession: false }
  }

  if (!sessionId && isInitializeRequest(body)) {
    logger.log(
      'No session ID provided, and body is an InitializeRequest. Creating new transport.'
    )

    const newSessionIdGenerator = (): string => {
      const newId = randomUUID()
      logger.log(`Generated new MCP session ID: ${newId}`)
      return newId
    }

    const newTransport = new StreamableHTTPServerTransport({
      sessionIdGenerator: newSessionIdGenerator,
      onsessioninitialized: generatedSessionId => {
        transportsStore[generatedSessionId] = newTransport
        logger.log(
          `MCP Session Initialized by transport. Stored for session ID: ${generatedSessionId}`
        )
      }
    })

    try {
      logger.log(
        'Attempting to connect McpServer instance to the new transport.'
      )
      await mcpServerInstance.connect(newTransport)
      logger.log('McpServer instance connected to new transport successfully.')
      return { transport: newTransport, isNewSession: true }
    } catch (connectError: any) {
      logger.error(
        'Failed to connect McpServer to new transport.',
        connectError
      )
      return {
        response: createMcpErrorResponse(
          c,
          {
            code: -32003,
            message: 'Server error: Could not connect transport.'
          },
          rpcRequestId,
          500
        ),
        isNewSession: true
      }
    }
  }

  logger.error(
    'Invalid request: No session ID or not a valid initialize request.',
    { body: JSON.stringify(body, null, 2) }
  )
  return {
    response: createMcpErrorResponse(
      c,
      {
        code: -32000,
        message:
          'Bad Request: No valid session ID or invalid initialization request.'
      },
      rpcRequestId,
      400
    ),
    isNewSession: false
  }
}