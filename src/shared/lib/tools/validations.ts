import { z } from 'zod'

/**
 * @constant FieldsParamSchema
 * @description Esquema para filtrar los países
 */
export const FieldsParamSchema = z
  .string()
  .optional()
  .describe(
    'Comma-separated list of fields to include (e.g., `name,capital,population`). Supports dot notation for nested fields (e.g., `name.common`).'
  )

/**
 * @constant SortParamSchema
 * @description Esquema para ordenar los resultados de los países
 */
export const SortParamSchema = z
  .string()
  .optional()
  .describe(
    'Comma-separated list of fields to sort by. Prefix with `-` for descending order (e.g., `population`, `-area`, `region,name.official`).'
  )

/**
 * @constant FlattenParamSchema
 * @description Esquema para aplanar los resultados
 */
export const FlattenParamSchema = z
  .boolean()
  .optional()
  .describe(
    'If `true` AND `fields` specifies exactly one field, returns an array of values instead of objects.'
  )
