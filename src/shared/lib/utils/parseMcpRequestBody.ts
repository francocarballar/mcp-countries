import { Context } from 'hono'
import { McpLogger } from '../../../shared/types/lib/utils/logger'
import { createMcpErrorResponse } from '../../../shared/lib/utils/errors'

/**
 * @function parseMcpRequestBody
 * @description Parses the JSON request body from a Hono Context.
 * @param c Hono Context
 * @param logger McpLogger instance
 * @returns The parsed body or a Hono Response object if parsing fails.
 */
export async function parseMcpRequestBody (
  c: Context,
  logger: McpLogger
): Promise<Record<string, any> | Response> {
  try {
    const body = await c.req.json()
    logger.log('Request body parsed successfully.', {
      body: JSON.stringify(body, null, 2)
    })
    return body as Record<string, any>
  } catch (e: any) {
    logger.error('Parse error for request body.', e)
    return createMcpErrorResponse(
      c,
      { code: -32700, message: 'Parse error' },
      null,
      400
    )
  }
}

/**
 * @function isInitializeRequest
 * @description Checks if the request body is an MCP initialization request
 * @param body The parsed request body
 * @returns True if this is an initialization request
 */
export function isInitializeRequest(body: Record<string, any>): boolean {
  return (
    body && 
    body.method === 'initialize' && 
    body.params && 
    typeof body.params === 'object' &&
    body.jsonrpc === '2.0'
  );
}

/**
 * @function extractRequestId
 * @description Extracts the JSON-RPC request ID from a request body
 * @param body The parsed request body
 * @returns The request ID or null if not found
 */
export function extractRequestId(body: Record<string, any>): string | number | null {
  return body && 'id' in body ? body.id : null;
}