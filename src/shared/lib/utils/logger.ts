import { McpLogger } from 'src/shared/types/lib/utils/logger';

/**
 * @function createMcpLogger
 * @description Creates a namespaced logger for MCP HTTP operations.
 * @param namespace Typically '[MCP-HTTP]'
 * @returns A logger instance with log and error methods
 */
export function createMcpLogger(namespace: string): McpLogger {
  const logWithTimestamp = (level: 'log' | 'error', message: string, ...args: any[]) => {
    const timestamp = new Date().toISOString();
    if (level === 'log') {
      console.log(`${namespace}[${timestamp}] ${message}`, ...args);
    } else {
      console.error(`${namespace}[${timestamp}] ${message}`, ...args);
    }
  };

  return {
    log: (message: string, details?: Record<string, any>) => {
      if (details) {
        logWithTimestamp('log', message, details);
      } else {
        logWithTimestamp('log', message);
      }
    },
    error: (message: string, error?: any, details?: Record<string, any>) => {
      if (error && details) {
        logWithTimestamp('error', message, error, details);
      } else if (error) {
        logWithTimestamp('error', message, error);
      } else {
        logWithTimestamp('error', message);
      }
    }
  };
}