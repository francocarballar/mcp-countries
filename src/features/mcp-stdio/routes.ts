// Services
import { getAllCountries } from 'src/shared/lib/tools/getAllCountries'

// Utils
import { SERVER, TRANSPORT } from '../../shared/lib/utils/mcp'
import { createMcpLogger } from '../../shared/lib/utils/logger'

async function main () {
  getAllCountries(SERVER)
  await SERVER.connect(TRANSPORT)
}

main().catch(error => {
  const logger = createMcpLogger('[MCP-STDIO]')
  logger.error('Error in MCP stdio server:', error)
  process.exit(1)
})
