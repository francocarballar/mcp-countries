import type { Context } from 'hono'
import type { McpLogger } from '@/shared/types/lib/utils/logger'
import { createMcpErrorResponse } from './errors'

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