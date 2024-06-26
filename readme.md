## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `75548` | `4213` | `86542` |
| **86%** | [Hyper Express](#hyper-express) | `65174` | `4285` | `87282` |
| **34%** | [Node (Default)](#node-default) | `25753` | `7929` | `78748` |
| **31%** | [Fastify](#fastify) | `23420` | `6852` | `36616` |
| **29%** | [Hono](#hono) | `21566` | `6061` | `30832` |
| **25%** | [Koa](#koa) | `19019` | `9852` | `84163` |
| **11%** | [Carbon](#carbon) | `8221` | `1410` | `10386` |
| **9%** | [Express](#express) | `6528` | `1045` | `8509` |


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
    Reqs/sec      9073.18    7827.36   87396.17
    Latency        5.49ms     4.13ms   357.43ms
    HTTP codes:
      1xx - 0, 2xx - 88044, 3xx - 0, 4xx - 0, 5xx - 0
      others - 11956
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 11956
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
    Reqs/sec      7442.64    7135.04   78153.40
    Latency        6.70ms     3.84ms   354.44ms
    HTTP codes:
      1xx - 0, 2xx - 87264, 3xx - 0, 4xx - 0, 5xx - 0
      others - 12736
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 12736
    Throughput:     1.86MB/s
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
    Reqs/sec     25638.78    8381.69   37186.28
    Latency        1.95ms     2.00ms   179.60ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.81MB/s
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
    Reqs/sec     20817.75    5973.59   30541.63
    Latency        2.40ms     1.92ms   175.17ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.70MB/s
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
    Reqs/sec     64935.92    3551.71   74138.96
    Latency      767.78us    66.22us     4.63ms
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
    Reqs/sec     19375.92    8639.21   77618.08
    Latency        2.58ms     2.27ms   198.98ms
    HTTP codes:
      1xx - 0, 2xx - 91581, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8419
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8419
    Throughput:     4.01MB/s
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
    Reqs/sec     25673.86    8446.67   78881.57
    Latency        1.94ms     1.93ms   164.05ms
    HTTP codes:
      1xx - 0, 2xx - 96708, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3292
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3292
    Throughput:     5.69MB/s
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
    Reqs/sec     75655.20    5270.82   85602.42
    Latency      658.72us   356.76us    28.77ms
    HTTP codes:
      1xx - 0, 2xx - 97278, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2722
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2722
    Throughput:    11.64MB/s
  ```


