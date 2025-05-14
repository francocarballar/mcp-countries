// Types and interfaces
import type { McpTransportManagerOptions, ProvisionResult } from '../../../shared/types/lib/utils/mcpTransport'

// Modules and main functions
import { Context } from 'hono'
import { randomUUID } from 'crypto'

// MCP
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'

// Utils
import { isInitializeRequest } from '../../../shared/lib/utils/parseMcpRequestBody'
import { createMcpErrorResponse } from '../../../shared/lib/utils/errors'




/**
 * @function provisionMcpTransport
 * @description Provisions or retrieves a transport for an MCP session.
 * 
 * This function handles:
 * 1. Retrieving existing transports for established sessions
 * 2. Creating new transports for initialize requests
 * 3. Validating session IDs and request bodies
 * 4. Generating and storing new session IDs
 * 
 * @param c Hono context
 * @param sessionId Session ID from headers, if any
 * @param body Parsed request body
 * @param options Configuration options
 * @returns Result object with transport and/or response
 */
export async function provisionMcpTransport(
  c: Context,
  sessionId: string | undefined,
  body: Record<string, any>,
  options: McpTransportManagerOptions
): Promise<ProvisionResult> {
  const { transportsStore, mcpServerInstance, logger } = options;
  
  // Case 1: Session ID provided and exists in store
  if (sessionId && transportsStore[sessionId]) {
    logger.log(`Reusing existing transport for session ID: ${sessionId}`);
    return {
      transport: transportsStore[sessionId],
      isNewSession: false
    };
  }
  
  // Case 2: Session ID provided but not found in store
  if (sessionId) {
    logger.error(`Session ID provided but not found in transports store: ${sessionId}`);
    return {
      isNewSession: false,
      response: createMcpErrorResponse(
        c,
        { code: -32000, message: 'Invalid session ID' },
        (body as any)?.id ?? null,
        404
      )
    };
  }
  
  // Case 3: No session ID, but this is an initialize request
  if (!sessionId && isInitializeRequest(body)) {
    logger.log('No session ID provided, and body is an InitializeRequest. Creating new transport.');
    
    try {
      // Create a new transport with session management
      const newSessionId = randomUUID();
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => {
          logger.log(`Generated new session ID: ${newSessionId}`);
          return newSessionId;
        }
      });
      
      // Connect the MCP server to this transport
      logger.log('Attempting to connect MCP server to the new transport.');
      await mcpServerInstance.connect(transport);
      logger.log('MCP server connected to new transport successfully.');
      
      // Store the transport with the new session ID
      transportsStore[newSessionId] = transport;
      logger.log(`MCP Session Initialized. Transport stored for session ID: ${newSessionId}`);
      
      // Attach the session ID to the transport for internal reference
      (transport as any)._sessionId = newSessionId;
      
      return {
        transport,
        isNewSession: true
      };
    } catch (error: any) {
      logger.error('Failed to create or connect transport', error);
      return {
        isNewSession: true,
        response: createMcpErrorResponse(
          c,
          { 
            code: -32003, 
            message: 'Error creating transport for new session',
            data: { error: error.message }
          },
          (body as any)?.id ?? null,
          500
        )
      };
    }
  }
  
  // Case 4: No session ID and not an initialize request
  logger.error('No session ID provided and not an initialize request. Request is invalid.');
  return {
    isNewSession: false,
    response: createMcpErrorResponse(
      c,
      { 
        code: -32600, 
        message: 'Invalid Request: Missing session ID and not an initialize request' 
      },
      (body as any)?.id ?? null,
      400
    )
  };
} 