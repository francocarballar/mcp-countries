/**
 * @interface McpLogger
 * @description Logger for MCP HTTP operations
 */
export interface McpLogger {
  log: (message: string, details?: Record<string, any>) => void
  error: (message: string, error?: any, details?: Record<string, any>) => void
}