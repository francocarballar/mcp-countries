// Modules and main functions
import { Hono } from 'hono'
import { cache } from 'hono/cache'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'

const app = new Hono()

// Middlewares
app.use('*', prettyJSON())
app.use(
  '*',
  cors({
    origin: '*'
  })
)
app.use(
  '*',
  cache({
    cacheName: 'mcp-countries-cache',
    cacheControl: 'public, max-age=604800, s-maxage=604800',
    vary: ['Accept-Language']
  })
)

app.get('/', c => {
  return c.text('Hello Hono!')
})

export default app
