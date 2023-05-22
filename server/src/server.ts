import 'dotenv/config'
import fastify from 'fastify'
import { memoriesRouter } from './routes/memories'
import cors from '@fastify/cors'
import { authRouter } from './routes/auth'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { uploadRouter } from './routes/upload'
import { resolve } from 'path'

const app = fastify()

app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'spacetimebgv hfnyufjt guhyhygujtbnhgbytvjnuf',
})

app.register(uploadRouter)
app.register(authRouter)
app.register(memoriesRouter)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })
