## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `75829` | `6695` | `81963` |
| **84%** | [Hyper Express](#hyper-express) | `63950` | `3972` | `68790` |
| **34%** | [Node (Default)](#node-default) | `25479` | `7446` | `49391` |
| **31%** | [Fastify](#fastify) | `23648` | `6932` | `36196` |
| **27%** | [Hono](#hono) | `20808` | `5090` | `29379` |
| **24%** | [Koa](#koa) | `18370` | `6212` | `50276` |
| **11%** | [Carbon](#carbon) | `8264` | `1393` | `10386` |
| **9%** | [Express](#express) | `6527` | `1016` | `8458` |


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
    Reqs/sec      8661.53    4351.47   54980.54
    Latency        5.76ms     4.15ms   356.70ms
    HTTP codes:
      1xx - 0, 2xx - 93910, 3xx - 0, 4xx - 0, 5xx - 0
      others - 6090
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 6090
    Throughput:     1.85MB/s
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
    Reqs/sec      6397.15     986.33    8426.75
    Latency        7.81ms     3.52ms   341.10ms
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
    Reqs/sec     24359.91    7397.10   36660.19
    Latency        2.05ms     1.88ms   170.50ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.53MB/s
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
    Reqs/sec     20651.66    5596.72   29569.93
    Latency        2.42ms     1.99ms   179.18ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.66MB/s
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
    Reqs/sec     63883.00    4083.90   74126.17
    Latency      779.23us    66.58us     3.07ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.09MB/s
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
    Reqs/sec     17874.66    6003.23   46548.53
    Latency        2.79ms     2.26ms   198.64ms
    HTTP codes:
      1xx - 0, 2xx - 95397, 3xx - 0, 4xx - 0, 5xx - 0
      others - 4603
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 4603
    Throughput:     3.85MB/s
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
    Reqs/sec     24920.59    7288.48   38681.76
    Latency        2.00ms     1.78ms   151.21ms
    HTTP codes:
      1xx - 0, 2xx - 98532, 3xx - 0, 4xx - 0, 5xx - 0
      others - 1468
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 1468
    Throughput:     5.62MB/s
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
    Reqs/sec     74727.84    5831.80   78821.13
    Latency      667.16us   224.98us    16.26ms
    HTTP codes:
      1xx - 0, 2xx - 97625, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2375
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2375
    Throughput:    11.54MB/s
  ```


