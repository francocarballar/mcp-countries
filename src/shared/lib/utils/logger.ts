import type { McpLogger } from '@/shared/types/lib/utils/logger'


/**
 * @function createMcpLogger
 * @description Creates a namespaced logger for MCP HTTP operations.
 * @param namespace Typically '[MCP-HTTP]'
 * @returns {McpLogger} Logger for MCP HTTP operations
 */
export function createMcpLogger (namespace: string): McpLogger {
  const logWithTimestamp = (
    level: 'log' | 'error',
    message: string,
    ...args: any[]
  ) => {
    const timestamp = new Date().toISOString()
    if (level === 'log') {
      console.log(`${namespace}[${timestamp}] ${message}`, ...args)
    } else {
      console.error(`${namespace}[${timestamp}] ${message}`, ...args)
    }
  }

  return {
    log: (message, details) => {
      if (details) logWithTimestamp('log', message, details)
      else logWithTimestamp('log', message)
    },
    error: (message, errorObj, details) => {
      const logArgs: any[] = []
      if (errorObj) logArgs.push(errorObj)
      if (details) logArgs.push(details)
      logWithTimestamp('error', message, ...logArgs)
    }
  }
}