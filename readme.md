## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `77075` | `3292` | `87207` |
| **83%** | [Hyper Express](#hyper-express) | `64313` | `3960` | `68666` |
| **34%** | [Node (Default)](#node-default) | `25894` | `8268` | `57083` |
| **32%** | [Fastify](#fastify) | `24574` | `7432` | `36129` |
| **26%** | [Hono](#hono) | `20399` | `5190` | `30131` |
| **23%** | [Koa](#koa) | `17889` | `9235` | `80510` |
| **11%** | [Carbon](#carbon) | `8205` | `1391` | `10377` |
| **8%** | [Express](#express) | `6432` | `970` | `8417` |


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
    Reqs/sec      9041.02    7734.66   87081.31
    Latency        5.52ms     4.20ms   362.00ms
    HTTP codes:
      1xx - 0, 2xx - 88391, 3xx - 0, 4xx - 0, 5xx - 0
      others - 11609
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 11609
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
    Reqs/sec      7063.82    5560.46   74607.17
    Latency        7.06ms     3.96ms   363.71ms
    HTTP codes:
      1xx - 0, 2xx - 90712, 3xx - 0, 4xx - 0, 5xx - 0
      others - 9288
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 9288
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
    Reqs/sec     23669.57    7179.47   35919.88
    Latency        2.11ms     1.93ms   173.63ms
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
    Reqs/sec     21556.85    6203.85   30378.78
    Latency        2.32ms     1.94ms   175.03ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.87MB/s
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
    Reqs/sec     63494.59    3017.39   67587.65
    Latency      785.08us    58.42us     2.75ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.02MB/s
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
    Reqs/sec     18388.25    8343.74   78528.02
    Latency        2.71ms     2.37ms   212.90ms
    HTTP codes:
      1xx - 0, 2xx - 91952, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8048
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8048
    Throughput:     3.83MB/s
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
    Reqs/sec     26146.94    8661.14   85230.74
    Latency        1.91ms     1.78ms   156.10ms
    HTTP codes:
      1xx - 0, 2xx - 96371, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3629
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3629
    Throughput:     5.77MB/s
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
    Reqs/sec     75267.29    3588.77   82903.38
    Latency      662.47us   253.25us    17.71ms
    HTTP codes:
      1xx - 0, 2xx - 97225, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2775
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2775
    Throughput:    11.58MB/s
  ```


