## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `77573` | `3838` | `86143` |
| **82%** | [Hyper Express](#hyper-express) | `63892` | `3736` | `68321` |
| **34%** | [Node (Default)](#node-default) | `26684` | `9047` | `79802` |
| **32%** | [Fastify](#fastify) | `24541` | `8402` | `37350` |
| **27%** | [Hono](#hono) | `21000` | `5708` | `30654` |
| **24%** | [Koa](#koa) | `18635` | `8535` | `79830` |
| **10%** | [Carbon](#carbon) | `8038` | `1371` | `10278` |
| **9%** | [Express](#express) | `6726` | `1079` | `8597` |


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
    Reqs/sec      8743.62    6165.76   84638.33
    Latency        5.70ms     4.16ms   357.26ms
    HTTP codes:
      1xx - 0, 2xx - 91929, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8071
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8071
    Throughput:     1.83MB/s
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
    Reqs/sec      7465.47    6500.30   79086.28
    Latency        6.68ms     3.85ms   349.87ms
    HTTP codes:
      1xx - 0, 2xx - 88767, 3xx - 0, 4xx - 0, 5xx - 0
      others - 11233
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 11233
    Throughput:     1.90MB/s
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
    Reqs/sec     23188.69    6659.12   35639.62
    Latency        2.16ms     1.96ms   174.98ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.26MB/s
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
    Reqs/sec     20262.15    5648.16   29767.41
    Latency        2.47ms     2.00ms   179.29ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.57MB/s
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
    Reqs/sec     64618.57    3974.19   69892.29
    Latency      772.31us    74.37us     2.97ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.17MB/s
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
    Reqs/sec     18819.98    8660.13   86876.70
    Latency        2.65ms     2.25ms   201.52ms
    HTTP codes:
      1xx - 0, 2xx - 92115, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7885
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7885
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
    Reqs/sec     25707.63    7618.34   60769.47
    Latency        1.94ms     1.88ms   162.39ms
    HTTP codes:
      1xx - 0, 2xx - 97594, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2406
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2406
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
    Reqs/sec     77778.18    3788.93   85086.02
    Latency      639.79us   134.45us    11.02ms
    HTTP codes:
      1xx - 0, 2xx - 97347, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2653
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2645
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 8
    Throughput:    11.98MB/s
  ```


