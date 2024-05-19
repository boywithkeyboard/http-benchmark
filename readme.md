## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `77027` | `4444` | `92519` |
| **82%** | [Hyper Express](#hyper-express) | `63480` | `2878` | `66924` |
| **33%** | [Node (Default)](#node-default) | `25035` | `7171` | `54859` |
| **31%** | [Fastify](#fastify) | `23937` | `6779` | `35360` |
| **27%** | [Hono](#hono) | `21144` | `5859` | `31007` |
| **24%** | [Koa](#koa) | `18414` | `7933` | `65787` |
| **10%** | [Carbon](#carbon) | `8088` | `1342` | `10356` |
| **9%** | [Express](#express) | `6572` | `1075` | `8619` |


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
    Reqs/sec      8590.01    5101.74   63721.16
    Latency        5.81ms     4.25ms   370.93ms
    HTTP codes:
      1xx - 0, 2xx - 93512, 3xx - 0, 4xx - 0, 5xx - 0
      others - 6488
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 6488
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
    Reqs/sec      6687.04    1092.64    8573.47
    Latency        7.47ms     3.56ms   341.09ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     1.91MB/s
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
    Reqs/sec     23503.36    6788.33   36451.17
    Latency        2.13ms     1.98ms   174.03ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.33MB/s
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
    Reqs/sec     20730.79    5402.66   30744.45
    Latency        2.41ms     2.00ms   180.62ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.68MB/s
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
    Reqs/sec     64099.09    2767.22   67674.27
    Latency      777.78us    56.60us     3.19ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.10MB/s
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
    Reqs/sec     18670.54    8694.84   78265.32
    Latency        2.67ms     2.30ms   203.01ms
    HTTP codes:
      1xx - 0, 2xx - 91307, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8693
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8693
    Throughput:     3.86MB/s
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
    Reqs/sec     26439.30    8931.64   87810.90
    Latency        1.89ms     1.82ms   153.52ms
    HTTP codes:
      1xx - 0, 2xx - 96450, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3550
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3550
    Throughput:     5.83MB/s
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
    Reqs/sec     76585.35    3860.47   88773.24
    Latency      649.90us   174.93us    12.98ms
    HTTP codes:
      1xx - 0, 2xx - 95760, 3xx - 0, 4xx - 0, 5xx - 0
      others - 4240
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 4207
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 33
    Throughput:    11.60MB/s
  ```


