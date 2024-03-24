import { App } from 'uWebSockets.js'

const app = App()

app.get('/', (res, req) => {
  res.end('Hello World')
})

app.listen(3000, () => {})
