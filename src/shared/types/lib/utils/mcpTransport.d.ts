/**
 * @interface McpTransportManagerOptions
 * @description Options for the McpTransportManager
 * @property {Object} transportsStore - A store of transports by session ID
 * @property {any} mcpServerInstance - The McpServer instance
 * @property {McpLogger} logger - The logger instance
 */
export interface McpTransportManagerOptions {
  transportsStore: { [sessionId: string]: StreamableHTTPServerTransport }
  mcpServerInstance: any
  logger: McpLogger
}

/**
 * @interface ProvisionResult
 * @description The result of provisioning a transport
 * @property {StreamableHTTPServerTransport} transport - The transport instance
 * @property {Response} response - A Hono Response to send directly if something fails
 * @property {boolean} isNewSession - Whether the session is new
 */
export interface ProvisionResult {
  transport?: StreamableHTTPServerTransport
  response?: Response 
  isNewSession: boolean
}