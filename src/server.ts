import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'
import { transactionRoutes } from './routes/transactions'

const app = fastify()
app.register(transactionRoutes, {
    prefix: 'transactions'
})

app.listen({
    port: Number(env.PORT),
}).then(() => console.log('HTTP Server Running!' + env.PORT))