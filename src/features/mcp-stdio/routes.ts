// Services
import { getAllCountries } from 'src/shared/lib/tools/getAllCountries'

// Utils
import { SERVER, TRANSPORT } from 'src/shared/lib/utils/mcp'
import { createMcpLogger } from 'src/shared/lib/utils/logger'

async function main () {
  getAllCountries(SERVER)
  await SERVER.connect(TRANSPORT)
}

main().catch(error => {
  const logger = createMcpLogger('[MCP-STDIO]')
  logger.error('Error in MCP stdio server:', error)
  process.exit(1)
})
