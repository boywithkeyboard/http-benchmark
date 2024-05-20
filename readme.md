## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76426` | `3894` | `86404` |
| **82%** | [Hyper Express](#hyper-express) | `62741` | `4290` | `67258` |
| **33%** | [Node (Default)](#node-default) | `25074` | `8173` | `91287` |
| **30%** | [Fastify](#fastify) | `22915` | `6872` | `35966` |
| **28%** | [Hono](#hono) | `21541` | `6077` | `30585` |
| **23%** | [Koa](#koa) | `17726` | `7957` | `70177` |
| **11%** | [Carbon](#carbon) | `8176` | `1396` | `10276` |
| **9%** | [Express](#express) | `6565` | `1054` | `8538` |


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
    Reqs/sec      8722.26    5944.11   70811.33
    Latency        5.72ms     4.21ms   363.82ms
    HTTP codes:
      1xx - 0, 2xx - 91623, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8377
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8377
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
    Reqs/sec      6398.50     959.32    8457.62
    Latency        7.81ms     3.54ms   341.26ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     1.83MB/s
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
    Reqs/sec     23068.95    6410.42   36057.62
    Latency        2.17ms     1.97ms   176.31ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.23MB/s
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
    Reqs/sec     20412.54    5692.95   29822.94
    Latency        2.45ms     2.00ms   181.51ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.61MB/s
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
    Reqs/sec     62957.79    4263.57   71110.92
    Latency      791.44us    81.53us     4.57ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     8.95MB/s
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
    Reqs/sec     18471.47    8088.40   80102.09
    Latency        2.70ms     2.29ms   200.26ms
    HTTP codes:
      1xx - 0, 2xx - 92720, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7280
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7280
    Throughput:     3.87MB/s
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
    Reqs/sec     25938.40    9222.70   90725.75
    Latency        1.93ms     1.92ms   165.19ms
    HTTP codes:
      1xx - 0, 2xx - 96255, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3745
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3745
    Throughput:     5.71MB/s
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
    Reqs/sec     76636.62    4594.01   93587.71
    Latency      649.66us   256.07us    11.45ms
    HTTP codes:
      1xx - 0, 2xx - 96630, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3370
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3370
    Throughput:    11.71MB/s
  ```


