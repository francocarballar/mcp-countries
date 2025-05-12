/**
 * @interface McpErrorDetails
 * @description Details of the error
 * @property {number} code - The code of the error
 * @property {string} message - The message of the error
 */
export interface McpErrorDetails {
  code: number
  message: string
}

/**
 * @interface McpErrorDetails
 * @description Details of the error
 * @property {number} code - The code of the error
 * @property {string} message - The message of the error
 * @property {any} data - Additional data associated with the error
 */
export interface McpErrorDetails {
  code: number;
  message: string;
  data?: any;
}

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