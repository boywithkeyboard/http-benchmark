## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `77555` | `4844` | `88565` |
| **85%** | [Hyper Express](#hyper-express) | `66231` | `3247` | `73507` |
| **33%** | [Node (Default)](#node-default) | `25920` | `8505` | `63193` |
| **31%** | [Fastify](#fastify) | `24404` | `7603` | `36031` |
| **27%** | [Hono](#hono) | `21019` | `6161` | `29908` |
| **23%** | [Koa](#koa) | `17739` | `8511` | `87253` |
| **10%** | [Carbon](#carbon) | `8009` | `1303` | `10361` |
| **8%** | [Express](#express) | `6554` | `1051` | `8503` |


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
    Reqs/sec      8813.75    6467.98   82331.30
    Latency        5.66ms     4.18ms   362.56ms
    HTTP codes:
      1xx - 0, 2xx - 90911, 3xx - 0, 4xx - 0, 5xx - 0
      others - 9089
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 9089
    Throughput:     1.82MB/s
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
    Reqs/sec      6433.72    1034.44    8415.71
    Latency        7.77ms     3.54ms   340.50ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     1.84MB/s
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
    Reqs/sec     24875.13    7971.70   36906.69
    Latency        2.01ms     2.04ms   183.83ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.64MB/s
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
    Reqs/sec     20670.56    6025.63   29313.27
    Latency        2.42ms     2.03ms   182.60ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.67MB/s
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
    Reqs/sec     64926.26    3321.90   67289.92
    Latency      767.99us    59.40us     2.72ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.22MB/s
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
    Reqs/sec     19153.81    8634.67   70879.62
    Latency        2.60ms     2.43ms   210.01ms
    HTTP codes:
      1xx - 0, 2xx - 92171, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7829
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7829
    Throughput:     3.99MB/s
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
    Reqs/sec     27004.38    9045.70   69921.31
    Latency        1.85ms     1.79ms   153.76ms
    HTTP codes:
      1xx - 0, 2xx - 96385, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3615
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3615
    Throughput:     5.96MB/s
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
    Reqs/sec     76970.56    3993.42   79672.35
    Latency      647.19us   179.33us    10.19ms
    HTTP codes:
      1xx - 0, 2xx - 97267, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2733
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2733
    Throughput:    11.85MB/s
  ```


