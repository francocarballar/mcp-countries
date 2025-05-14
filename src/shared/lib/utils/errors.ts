import { Context } from 'hono';
import type { McpErrorDetails } from '../../../shared/types/lib/utils/errors';

/**
 * @enum McpErrorCode
 * @description Common JSON-RPC error codes according to the specification
 */
export enum McpErrorCode {
  PARSE_ERROR = -32700,
  INVALID_REQUEST = -32600,
  METHOD_NOT_FOUND = -32601,
  INVALID_PARAMS = -32602, 
  INTERNAL_ERROR = -32603,
  SERVER_ERROR_START = -32000,
  SERVER_ERROR_END = -32099,
  // Custom error codes can be defined here
  TRANSPORT_ERROR = -32050,
  SESSION_NOT_FOUND = -32051,
  TOOL_REGISTRATION_ERROR = -32052
}

/**
 * Creates a standardized error response for MCP HTTP requests
 * 
 * @param c Hono context
 * @param errorDetails Error details object with code and message
 * @param rpcId JSON-RPC request ID (if available)
 * @param httpStatus HTTP status code to use (defaults to 400)
 * @returns Formatted Response object
 */
export function createMcpErrorResponse(
  c: Context,
  errorDetails: McpErrorDetails,
  rpcId: string | number | null = null,
  httpStatus: number = 400
): Response {
  return c.json(
    {
      jsonrpc: '2.0',
      error: errorDetails,
      id: rpcId,
    },
    httpStatus as any 
  );
}

/**
 * @function createSessionNotFoundError
 * @description Creates a standard error response for when a session is not found
 * @param c - Hono context
 * @param sessionId - Optional session ID
 * @returns {Response} Response object
 */
export function createSessionNotFoundError(
  c: Context,
  sessionId?: string
): Response {
  return createMcpErrorResponse(
    c,
    {
      code: McpErrorCode.SESSION_NOT_FOUND,
      message: 'Session not found or invalid session ID',
      data: { sessionId }
    },
    null,
    404
  );
}

/**
 * @function createInternalServerError
 * @description Creates a standard error response for internal server errors
 * @param c - Hono context
 * @param rpcId - Optional JSON-RPC request ID
 * @param details - Additional details about the error
 * @returns {Response} Response object
 */
export function createInternalServerError(
  c: Context,
  rpcId: string | number | null = null,
  details?: any
): Response {
  return createMcpErrorResponse(
    c,
    {
      code: McpErrorCode.INTERNAL_ERROR,
      message: 'Internal server error',
      data: details
    },
    rpcId,
    500
  );
}