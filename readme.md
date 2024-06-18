## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `77233` | `5146` | `101606` |
| **83%** | [Hyper Express](#hyper-express) | `64201` | `2837` | `68724` |
| **32%** | [Node (Default)](#node-default) | `24989` | `7200` | `57734` |
| **32%** | [Fastify](#fastify) | `24765` | `7287` | `36634` |
| **26%** | [Hono](#hono) | `20224` | `5740` | `29772` |
| **24%** | [Koa](#koa) | `18641` | `10345` | `80032` |
| **11%** | [Carbon](#carbon) | `8155` | `1374` | `10424` |
| **9%** | [Express](#express) | `6579` | `1041` | `8465` |


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
    Reqs/sec      9042.62    7168.22   79480.52
    Latency        5.51ms     4.08ms   351.33ms
    HTTP codes:
      1xx - 0, 2xx - 89738, 3xx - 0, 4xx - 0, 5xx - 0
      others - 10262
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 10262
    Throughput:     1.84MB/s
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
    Reqs/sec      7127.94    6163.79   85997.34
    Latency        7.00ms     3.79ms   346.52ms
    HTTP codes:
      1xx - 0, 2xx - 89698, 3xx - 0, 4xx - 0, 5xx - 0
      others - 10302
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 10302
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
    Reqs/sec     24443.96    7703.99   36660.38
    Latency        2.04ms     1.88ms   170.67ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.55MB/s
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
    Reqs/sec     20880.10    5834.88   30638.20
    Latency        2.39ms     1.87ms   171.30ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.71MB/s
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
    Reqs/sec     64540.53    4017.06   78980.11
    Latency      772.91us    68.47us     3.60ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.16MB/s
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
    Reqs/sec     19250.47    9192.18   75390.10
    Latency        2.59ms     2.31ms   200.45ms
    HTTP codes:
      1xx - 0, 2xx - 90863, 3xx - 0, 4xx - 0, 5xx - 0
      others - 9137
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 9137
    Throughput:     3.96MB/s
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
    Reqs/sec     26343.94    7900.39   54439.48
    Latency        1.89ms     1.86ms   159.87ms
    HTTP codes:
      1xx - 0, 2xx - 97683, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2317
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2317
    Throughput:     5.90MB/s
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
    Reqs/sec     75838.99    3800.21   82488.78
    Latency      656.39us   227.08us    15.36ms
    HTTP codes:
      1xx - 0, 2xx - 96923, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3077
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3077
    Throughput:    11.64MB/s
  ```


