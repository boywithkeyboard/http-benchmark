## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `77267` | `4192` | `84906` |
| **86%** | [Hyper Express](#hyper-express) | `66195` | `4212` | `76060` |
| **35%** | [Node (Default)](#node-default) | `26693` | `9076` | `74895` |
| **33%** | [Fastify](#fastify) | `25552` | `8389` | `37869` |
| **28%** | [Hono](#hono) | `21564` | `6256` | `31068` |
| **25%** | [Koa](#koa) | `19094` | `7821` | `66479` |
| **10%** | [Carbon](#carbon) | `7998` | `1371` | `10080` |
| **9%** | [Express](#express) | `6681` | `1110` | `8668` |


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
    Reqs/sec      8325.22    6425.12   85051.70
    Latency        5.95ms     4.27ms   370.44ms
    HTTP codes:
      1xx - 0, 2xx - 90759, 3xx - 0, 4xx - 0, 5xx - 0
      others - 9241
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 9241
    Throughput:     1.73MB/s
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
    Reqs/sec      6609.65    1086.05    8732.14
    Latency        7.56ms     3.56ms   341.28ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     1.89MB/s
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
    Reqs/sec     23680.37    7573.99   37259.15
    Latency        2.11ms     2.03ms   180.47ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.36MB/s
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
    Reqs/sec     21491.59    5926.37   31145.47
    Latency        2.32ms     1.87ms   168.73ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.86MB/s
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
    Reqs/sec     65792.42    3030.93   74677.00
    Latency      757.79us    65.73us     2.65ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.35MB/s
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
    Reqs/sec     18727.38    8232.61   80531.17
    Latency        2.66ms     2.25ms   196.58ms
    HTTP codes:
      1xx - 0, 2xx - 92553, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7447
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7447
    Throughput:     3.92MB/s
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
    Reqs/sec     25570.01    8535.51   75230.98
    Latency        1.94ms     1.96ms   164.02ms
    HTTP codes:
      1xx - 0, 2xx - 96927, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3073
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3073
    Throughput:     5.72MB/s
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
    Reqs/sec     77948.89    4451.76   88158.93
    Latency      639.97us   194.03us     9.71ms
    HTTP codes:
      1xx - 0, 2xx - 97489, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2511
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2511
    Throughput:    12.01MB/s
  ```


