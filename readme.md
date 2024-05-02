## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `78648` | `3588` | `87627` |
| **82%** | [Hyper Express](#hyper-express) | `64777` | `4090` | `69337` |
| **33%** | [Node (Default)](#node-default) | `26030` | `7864` | `61412` |
| **31%** | [Fastify](#fastify) | `24698` | `8204` | `36553` |
| **25%** | [Hono](#hono) | `19994` | `5534` | `29487` |
| **23%** | [Koa](#koa) | `18054` | `8534` | `82737` |
| **10%** | [Carbon](#carbon) | `7488` | `1199` | `9706` |
| **8%** | [Express](#express) | `6458` | `1014` | `8397` |


### In Detail

- #### Carbon
  [NPM](https://npmjs.com/@sinclair/carbon) | [GitHub](https://github.com/sinclairzx81/carbon)
  ```js
  import { listen } from '@sinclair/carbon/http'

  listen({
    hostname: '127.0.0.1',
    port: 3000
  }, () => {
    return new Response('Hello World', {
      status: 200,
      headers: {
        'content-type': 'text/plain'
      }
    })
  })
  ```

  ```
  Statistics        Avg      Stdev        Max
    Reqs/sec      8162.31    5951.25   78022.88
    Latency        6.11ms     4.41ms   382.42ms
    HTTP codes:
      1xx - 0, 2xx - 91265, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8735
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8735
    Throughput:     1.69MB/s
  ```

- #### Express
  [NPM](https://npmjs.com/express) | [GitHub](https://github.com/expressjs/express)
  ```js
  import express from 'express'

  const app = express()

  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  app.listen(3000)
  ```

  ```
  Statistics        Avg      Stdev        Max
    Reqs/sec      6299.76     981.31    8555.68
    Latency        7.93ms     3.79ms   358.92ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     1.80MB/s
  ```

- #### Fastify
  [NPM](https://npmjs.com/fastify) | [GitHub](https://github.com/fastify/fastify)
  ```js
  import fastify from 'fastify'

  const app = fastify({
    logger: false
  })

  app.get('/', (req, res) => {
    res.send('Hello World')
  })

  app.listen({ port: 3000 }, (err) => {
    if (err) throw err
  })
  ```

  ```
  Statistics        Avg      Stdev        Max
    Reqs/sec     23946.32    7141.09   36321.10
    Latency        2.09ms     2.15ms   188.21ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.43MB/s
  ```

- #### Hono
  [NPM](https://npmjs.com/hono) | [GitHub](https://github.com/honojs/hono)
  ```js
  import { serve } from '@hono/node-server'
  import { Hono } from 'hono'

  const app = new Hono()

  app.get('/', (c) => c.text('Hello World'))

  serve(app)
  ```

  ```
  Statistics        Avg      Stdev        Max
    Reqs/sec     20695.94    5717.46   29974.47
    Latency        2.41ms     1.99ms   178.61ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.68MB/s
  ```

- #### Hyper Express
  [NPM](https://npmjs.com/hyper-express) | [GitHub](https://github.com/kartikk221/hyper-express)
  ```js
  import HyperExpress from 'hyper-express'

  const server = new HyperExpress.Server()

  server.get('/', (req, res) => {
    res.send('Hello World')
  })

  server.listen(3000)
  ```

  ```
  Statistics        Avg      Stdev        Max
    Reqs/sec     65846.85    3952.49   78665.76
    Latency      759.21us    65.58us     4.48ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.33MB/s
  ```

- #### Koa
  [NPM](https://npmjs.com/koa) | [GitHub](https://github.com/koajs/koa)
  ```js
  import Koa from 'koa'

  const app = new Koa()

  app.use(ctx => {
    ctx.body = 'Hello World'
  })

  app.listen(3000)
  ```

  ```
  Statistics        Avg      Stdev        Max
    Reqs/sec     18856.45    9622.84   83618.05
    Latency        2.65ms     2.46ms   215.66ms
    HTTP codes:
      1xx - 0, 2xx - 89985, 3xx - 0, 4xx - 0, 5xx - 0
      others - 10015
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 10015
    Throughput:     3.84MB/s
  ```

- #### Node (Default)
  [Website](https://nodejs.org/api/http.html)
  ```js
  import { createServer } from 'node:http'

  const server = createServer((req, res) => {
    res.writeHead(200, {
      'content-type': 'text/plain'
    })

    res.write('Hello World')

    res.end()
  })

  server.listen(3000, '127.0.0.1')
  ```

  ```
  Statistics        Avg      Stdev        Max
    Reqs/sec     25886.21    8427.80   73342.48
    Latency        1.92ms     1.99ms   169.51ms
    HTTP codes:
      1xx - 0, 2xx - 96690, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3310
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3310
    Throughput:     5.75MB/s
  ```

- #### uWS
  [GitHub](https://github.com/uNetworking/uWebSockets.js)
  ```js
  import { App } from 'uWebSockets.js'

  const app = App()

  app.get('/', (res, req) => {
    res.end('Hello World')
  })

  app.listen(3000, () => {})
  ```

  ```
  Statistics        Avg      Stdev        Max
    Reqs/sec     78038.17    3960.89   87745.73
    Latency      638.75us   212.79us    11.17ms
    HTTP codes:
      1xx - 0, 2xx - 96723, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3277
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3277
    Throughput:    11.92MB/s
  ```


