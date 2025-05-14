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

