## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `75286` | `3129` | `85032` |
| **84%** | [Hyper Express](#hyper-express) | `63327` | `3954` | `71651` |
| **35%** | [Node (Default)](#node-default) | `26572` | `9104` | `88407` |
| **31%** | [Fastify](#fastify) | `23051` | `6630` | `35837` |
| **27%** | [Hono](#hono) | `20133` | `5518` | `29380` |
| **25%** | [Koa](#koa) | `18694` | `8863` | `79326` |
| **11%** | [Carbon](#carbon) | `8083` | `1374` | `10228` |
| **9%** | [Express](#express) | `6547` | `1056` | `8436` |


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
    Reqs/sec      8699.34    5847.45   80756.20
    Latency        5.73ms     4.27ms   371.90ms
    HTTP codes:
      1xx - 0, 2xx - 91922, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8078
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8078
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
    Reqs/sec      7294.29    6233.84   76404.82
    Latency        6.84ms     3.89ms   359.95ms
    HTTP codes:
      1xx - 0, 2xx - 89190, 3xx - 0, 4xx - 0, 5xx - 0
      others - 10810
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 10810
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
    Reqs/sec     23799.63    7320.21   35294.32
    Latency        2.10ms     1.97ms   177.99ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.40MB/s
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
    Reqs/sec     20457.99    5568.66   29428.98
    Latency        2.44ms     1.88ms   168.83ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.63MB/s
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
    Reqs/sec     62524.30    3357.82   71345.09
    Latency      797.18us    68.32us     3.69ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     8.88MB/s
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
    Reqs/sec     18346.63    8805.67   84101.84
    Latency        2.72ms     2.42ms   209.56ms
    HTTP codes:
      1xx - 0, 2xx - 91486, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8514
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8514
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
    Reqs/sec     26423.27    8406.88   60430.60
    Latency        1.89ms     1.89ms   162.40ms
    HTTP codes:
      1xx - 0, 2xx - 97565, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2435
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2435
    Throughput:     5.91MB/s
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
    Reqs/sec     75081.32    4320.87   95104.38
    Latency      663.07us   158.51us     7.77ms
    HTTP codes:
      1xx - 0, 2xx - 97205, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2795
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2795
    Throughput:    11.55MB/s
  ```


