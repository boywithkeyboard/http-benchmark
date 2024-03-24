import HyperExpress from 'hyper-express'

const app = new HyperExpress.Server()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000)
