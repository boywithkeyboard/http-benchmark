## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76328` | `4811` | `91643` |
| **84%** | [Hyper Express](#hyper-express) | `63847` | `4116` | `71536` |
| **35%** | [Node (Default)](#node-default) | `26465` | `8421` | `76661` |
| **32%** | [Fastify](#fastify) | `24132` | `7483` | `36208` |
| **28%** | [Hono](#hono) | `21143` | `6021` | `30366` |
| **24%** | [Koa](#koa) | `18566` | `8210` | `74538` |
| **10%** | [Carbon](#carbon) | `8014` | `1310` | `10262` |
| **9%** | [Express](#express) | `6498` | `1013` | `8467` |


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
    Reqs/sec      8742.55    5811.24   78300.79
    Latency        5.71ms     4.18ms   362.16ms
    HTTP codes:
      1xx - 0, 2xx - 92371, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7629
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7629
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
    Reqs/sec      7178.23    6530.01   76716.76
    Latency        6.95ms     3.88ms   360.35ms
    HTTP codes:
      1xx - 0, 2xx - 88513, 3xx - 0, 4xx - 0, 5xx - 0
      others - 11487
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 11487
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
    Reqs/sec     23391.90    7053.16   35772.15
    Latency        2.14ms     1.97ms   181.30ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.30MB/s
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
    Reqs/sec     20498.42    5832.63   30054.21
    Latency        2.44ms     1.96ms   178.26ms
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
    Reqs/sec     63775.25    3981.00   72131.16
    Latency      782.23us    73.65us     3.80ms
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
    Reqs/sec     18757.97    8685.08   80327.69
    Latency        2.66ms     2.31ms   198.61ms
    HTTP codes:
      1xx - 0, 2xx - 92406, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7594
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7594
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
    Reqs/sec     25378.45    7970.06   68517.52
    Latency        1.96ms     1.99ms   160.41ms
    HTTP codes:
      1xx - 0, 2xx - 96928, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3072
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3072
    Throughput:     5.67MB/s
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
    Reqs/sec     76475.80    4231.00   80630.98
    Latency      650.52us   191.46us     9.19ms
    HTTP codes:
      1xx - 0, 2xx - 96275, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3725
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3725
    Throughput:    11.65MB/s
  ```


