## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `74297` | `6122` | `79670` |
| **86%** | [Hyper Express](#hyper-express) | `63629` | `4773` | `84085` |
| **34%** | [Node (Default)](#node-default) | `25552` | `8338` | `58090` |
| **34%** | [Fastify](#fastify) | `24944` | `8097` | `36353` |
| **28%** | [Hono](#hono) | `20697` | `5419` | `29629` |
| **24%** | [Koa](#koa) | `17894` | `5805` | `44652` |
| **11%** | [Carbon](#carbon) | `8217` | `1420` | `10348` |
| **9%** | [Express](#express) | `6705` | `1141` | `8555` |


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
    Reqs/sec      8676.28    4492.44   58149.38
    Latency        5.71ms     4.18ms   362.82ms
    HTTP codes:
      1xx - 0, 2xx - 92536, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7464
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7464
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
    Reqs/sec      6547.58    1079.82    8513.04
    Latency        7.63ms     3.61ms   345.85ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     1.87MB/s
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
    Reqs/sec     24645.28    7602.04   37458.23
    Latency        2.03ms     2.02ms   183.43ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.58MB/s
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
    Reqs/sec     21180.74    5783.15   29752.15
    Latency        2.36ms     2.01ms   182.06ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.78MB/s
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
    Reqs/sec     64019.78    4217.24   74661.47
    Latency      779.28us    76.10us     2.90ms
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
    Reqs/sec     17658.63    7056.26   58624.89
    Latency        2.83ms     2.42ms   214.51ms
    HTTP codes:
      1xx - 0, 2xx - 92063, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7937
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7937
    Throughput:     3.68MB/s
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
    Reqs/sec     25618.87    7570.62   54574.43
    Latency        1.95ms     1.93ms   168.00ms
    HTTP codes:
      1xx - 0, 2xx - 97454, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2546
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2546
    Throughput:     5.72MB/s
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
    Reqs/sec     74382.15    6454.49   85385.87
    Latency      670.45us   215.74us    10.80ms
    HTTP codes:
      1xx - 0, 2xx - 98052, 3xx - 0, 4xx - 0, 5xx - 0
      others - 1948
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 1948
    Throughput:    11.53MB/s
  ```


