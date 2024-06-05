## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `77240` | `3557` | `86109` |
| **80%** | [Hyper Express](#hyper-express) | `61999` | `10246` | `76431` |
| **32%** | [Node (Default)](#node-default) | `25014` | `7801` | `60646` |
| **32%** | [Fastify](#fastify) | `24588` | `7729` | `36059` |
| **26%** | [Hono](#hono) | `20344` | `5870` | `30032` |
| **24%** | [Koa](#koa) | `18695` | `8470` | `74428` |
| **11%** | [Carbon](#carbon) | `8253` | `1445` | `10452` |
| **9%** | [Express](#express) | `6640` | `1103` | `8543` |


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
    Reqs/sec      8877.18    6288.69   75985.88
    Latency        5.62ms     4.13ms   356.86ms
    HTTP codes:
      1xx - 0, 2xx - 91403, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8597
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8597
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
    Reqs/sec      6484.75     997.92    8532.27
    Latency        7.71ms     3.55ms   341.20ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
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
    Reqs/sec     23947.48    7494.29   36409.79
    Latency        2.09ms     1.96ms   177.85ms
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
    Reqs/sec     21101.27    5853.36   29822.54
    Latency        2.37ms     1.99ms   175.31ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.76MB/s
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
    Reqs/sec     63749.58    4022.83   74147.79
    Latency      781.76us    66.17us     3.62ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.06MB/s
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
    Reqs/sec     19210.95   10929.15   84135.01
    Latency        2.60ms     2.31ms   209.32ms
    HTTP codes:
      1xx - 0, 2xx - 87305, 3xx - 0, 4xx - 0, 5xx - 0
      others - 12695
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 12695
    Throughput:     3.79MB/s
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
    Reqs/sec     24988.78    7735.59   77088.45
    Latency        2.00ms     1.82ms   156.54ms
    HTTP codes:
      1xx - 0, 2xx - 96847, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3153
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3153
    Throughput:     5.54MB/s
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
    Reqs/sec     75970.09    4092.70   84843.06
    Latency      653.96us   277.32us    13.00ms
    HTTP codes:
      1xx - 0, 2xx - 96705, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3295
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3295
    Throughput:    11.64MB/s
  ```


