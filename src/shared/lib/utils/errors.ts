import type { Context } from 'hono';
import type { McpErrorDetails } from '@/shared/types/lib/utils/errors';

/**
 * @function createMcpErrorResponse 
 * @description Creates a Hono JSON response for MCP errors.
 * @param c Hono Context
 * @param errorDetails JSON-RPC error code and message
 * @param rpcId The JSON-RPC request ID (if available)
 * @param httpStatus HTTP status code to return
 */
export function createMcpErrorResponse (
  c: Context,
  errorDetails: McpErrorDetails,
  rpcId: string | number | null = null,
  httpStatus: number = 400
): Response {
  return c.json(
    {
      jsonrpc: '2.0',
      error: errorDetails,
      id: rpcId
    },
    httpStatus as any 
  )
}