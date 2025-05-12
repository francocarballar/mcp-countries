// Types and interfaces
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { ToolAnnotations } from '@modelcontextprotocol/sdk/types.js'

// Constants
import { API_ENDPOINTS, API_URL_WITH_VERSION } from '@/shared/config/constants/api'

// Utils
import { createMcpLogger } from '@/shared/lib/utils/logger'

// Validations
import {
  FieldsParamSchema,
  FlattenParamSchema,
  SortParamSchema
} from './validations'


// const openApiSpecComment = `
// /api/v1/all:
//     get:
//       summary: Get All Countries
//       description: Retrieves a list of all countries, with options for filtering, sorting, and flattening.
//       tags:
//         - Countries
//       parameters:
//         - $ref: '#/components/parameters/FieldsQueryParam'
//         - $ref: '#/components/parameters/SortQueryParam'
//         - $ref: '#/components/parameters/FlattenQueryParam'
//       responses:
//         '200':
//           description: An array of countries. Structure depends on query parameters.
//           content:
//             application/json:
//               schema:
//                 type: array
//                 items:
//                   oneOf: # Indicates response can be objects or primitives (if flattened)
//                     - type: object # Basic object structure
//                     - type: string
//                     - type: number
//                     - type: boolean
//               example: # Example of non-flattened, partial fields
//                 - name: { common: 'Spain' }
//                   population: 47351567
//                 - name: { common: 'France' }
//                   population: 65273511
//         '400':
//           $ref: '#/components/responses/BadRequest'
//         '500':
//           $ref: '#/components/responses/InternalServerError'
// `

// Simple, human-readable description for the tool
const description =
  'Retrieves a list of all countries from the REST Countries API, with optional filtering, sorting, and flattening.'

const paramsSchema = {
  fields: FieldsParamSchema,
  sort: SortParamSchema,
  flatten: FlattenParamSchema
}

const annotations: ToolAnnotations = {
  title: 'Get All Countries',
  readOnlyHint: true,
  idempotentHint: true,
  openWorldHint: true
}

export const getAllCountries = (server: McpServer) => {
  server.tool(
    'get-all-countries',
    description,
    paramsSchema,
    annotations,
    async args => {
      const logger = createMcpLogger('[GET-ALL-COUNTRIES]')
      
      try {
        const params = new URLSearchParams()
        Object.entries(args).forEach(([key, value]) => {
          if (value !== undefined) {
            params.set(key, String(value))
          }
        })

        const response = await fetch(
          `${API_URL_WITH_VERSION}${API_ENDPOINTS.ALL}?${params.toString()}`
        )
        const data = await response.json()
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data, null, 2)
            }
          ]
        }
      } catch (error: any) {
        logger.error('Error calling get-all-countries tool:', error)
        return {
          isError: true,
          content: [
            { type: 'text', text: `Error fetching countries: ${error.message}` }
          ]
        }
      }
    }
  )
}
