import fastify from 'fastify'

const app = fastify({
  logger: false
})

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
})
