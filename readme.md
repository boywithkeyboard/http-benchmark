## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76009` | `3730` | `80094` |
| **84%** | [Hyper Express](#hyper-express) | `64138` | `4017` | `67710` |
| **35%** | [Node (Default)](#node-default) | `26233` | `8284` | `62783` |
| **34%** | [Fastify](#fastify) | `25610` | `8631` | `37463` |
| **27%** | [Hono](#hono) | `20671` | `6102` | `29741` |
| **26%** | [Koa](#koa) | `19387` | `9625` | `77186` |
| **10%** | [Carbon](#carbon) | `7693` | `1274` | `9964` |
| **8%** | [Express](#express) | `6350` | `966` | `8542` |


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
    Reqs/sec      7965.30    4825.08   65506.42
    Latency        6.25ms     4.32ms   379.65ms
    HTTP codes:
      1xx - 0, 2xx - 93692, 3xx - 0, 4xx - 0, 5xx - 0
      others - 6308
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 6308
    Throughput:     1.70MB/s
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
    Reqs/sec      6346.03    1038.42    8411.48
    Latency        7.87ms     3.73ms   356.13ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     1.82MB/s
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
    Reqs/sec     24065.10    7434.03   36055.60
    Latency        2.08ms     2.03ms   179.88ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.46MB/s
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
    Reqs/sec     20877.07    5741.74   29794.41
    Latency        2.39ms     2.07ms   186.87ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.72MB/s
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
    Reqs/sec     64749.52    4119.41   70258.41
    Latency      769.68us    74.83us     3.87ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.20MB/s
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
    Reqs/sec     19375.61   10221.55   80202.03
    Latency        2.57ms     2.43ms   209.81ms
    HTTP codes:
      1xx - 0, 2xx - 89461, 3xx - 0, 4xx - 0, 5xx - 0
      others - 10539
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 10539
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
    Reqs/sec     26336.89    8870.77   55574.96
    Latency        1.90ms     1.99ms   169.24ms
    HTTP codes:
      1xx - 0, 2xx - 97688, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2312
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2312
    Throughput:     5.89MB/s
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
    Reqs/sec     77239.51    4388.98   83713.50
    Latency      644.92us   154.69us    12.50ms
    HTTP codes:
      1xx - 0, 2xx - 97602, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2398
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2398
    Throughput:    11.93MB/s
  ```


