## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `75995` | `6317` | `91265` |
| **85%** | [Hyper Express](#hyper-express) | `64489` | `4203` | `89985` |
| **33%** | [Node (Default)](#node-default) | `24886` | `8276` | `81889` |
| **31%** | [Fastify](#fastify) | `23749` | `7119` | `35376` |
| **27%** | [Hono](#hono) | `20627` | `5706` | `30061` |
| **24%** | [Koa](#koa) | `18309` | `8688` | `81811` |
| **11%** | [Carbon](#carbon) | `8246` | `1418` | `10327` |
| **8%** | [Express](#express) | `6425` | `993` | `8417` |


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
    Reqs/sec      8520.22    4791.54   59248.19
    Latency        5.82ms     4.41ms   376.11ms
    HTTP codes:
      1xx - 0, 2xx - 92713, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7287
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7287
    Throughput:     1.81MB/s
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
    Reqs/sec      6473.01     986.57    8457.98
    Latency        7.72ms     3.45ms   335.06ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     1.85MB/s
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
    Reqs/sec     23810.83    6651.86   35705.88
    Latency        2.10ms     1.94ms   171.50ms
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
    Reqs/sec     20893.16    6270.29   30371.53
    Latency        2.39ms     1.91ms   175.51ms
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
    Reqs/sec     63661.95    3770.17   67695.87
    Latency      783.50us    63.66us     2.80ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.04MB/s
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
    Reqs/sec     18795.19    9342.94   74719.20
    Latency        2.65ms     2.33ms   204.42ms
    HTTP codes:
      1xx - 0, 2xx - 89917, 3xx - 0, 4xx - 0, 5xx - 0
      others - 10083
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 10083
    Throughput:     3.82MB/s
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
    Reqs/sec     25300.91    8063.63   63901.68
    Latency        1.97ms     1.84ms   154.56ms
    HTTP codes:
      1xx - 0, 2xx - 97483, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2517
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2516
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 1
    Throughput:     5.65MB/s
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
    Reqs/sec     77024.19    3870.28   91752.11
    Latency      647.08us   203.45us    16.89ms
    HTTP codes:
      1xx - 0, 2xx - 97345, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2655
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2650
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 5
    Throughput:    11.86MB/s
  ```


