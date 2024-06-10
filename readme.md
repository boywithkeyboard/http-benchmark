## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `78348` | `22785` | `258999` |
| **82%** | [Hyper Express](#hyper-express) | `64464` | `3981` | `69718` |
| **35%** | [Node (Default)](#node-default) | `27078` | `8625` | `65055` |
| **31%** | [Fastify](#fastify) | `24059` | `7419` | `36461` |
| **26%** | [Hono](#hono) | `20247` | `5009` | `29693` |
| **24%** | [Koa](#koa) | `18578` | `9067` | `84226` |
| **10%** | [Carbon](#carbon) | `8079` | `1330` | `10328` |
| **8%** | [Express](#express) | `6530` | `1036` | `8521` |


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
    Reqs/sec      8691.14    5786.83   76508.34
    Latency        5.74ms     4.13ms   359.16ms
    HTTP codes:
      1xx - 0, 2xx - 92414, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7586
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7586
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
    Reqs/sec      7162.42    6189.46   80084.34
    Latency        6.97ms     3.80ms   349.14ms
    HTTP codes:
      1xx - 0, 2xx - 89509, 3xx - 0, 4xx - 0, 5xx - 0
      others - 10491
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 10491
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
    Reqs/sec     24401.85    7429.44   34718.88
    Latency        2.05ms     1.96ms   175.14ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.54MB/s
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
    Reqs/sec     21478.29    6119.93   30012.50
    Latency        2.32ms     1.95ms   174.57ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.86MB/s
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
    Reqs/sec     64120.30    3930.91   69719.42
    Latency      777.88us    91.80us     6.37ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.11MB/s
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
    Reqs/sec     18124.93    8208.12   74109.69
    Latency        2.73ms     2.35ms   200.36ms
    HTTP codes:
      1xx - 0, 2xx - 91810, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8190
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8190
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
    Reqs/sec     24656.38    7320.87   67129.66
    Latency        2.02ms     1.92ms   166.11ms
    HTTP codes:
      1xx - 0, 2xx - 97155, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2845
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2845
    Throughput:     5.50MB/s
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
    Reqs/sec     75538.06    3000.09   80736.17
    Latency      657.75us   176.79us    13.20ms
    HTTP codes:
      1xx - 0, 2xx - 95243, 3xx - 0, 4xx - 0, 5xx - 0
      others - 4757
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 4757
    Throughput:    11.39MB/s
  ```


