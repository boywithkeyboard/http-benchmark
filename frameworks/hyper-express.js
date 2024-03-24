import HyperExpress from 'hyper-express'

const server = new HyperExpress.Server()

server.get('/', (req, res) => {
  res.send('Hello World')
})

server.listen(3000)
