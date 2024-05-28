## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `75278` | `3002` | `79434` |
| **85%** | [Hyper Express](#hyper-express) | `64264` | `4574` | `82248` |
| **35%** | [Node (Default)](#node-default) | `26459` | `8775` | `54769` |
| **31%** | [Fastify](#fastify) | `23602` | `7078` | `36587` |
| **26%** | [Hono](#hono) | `19859` | `5522` | `29471` |
| **25%** | [Koa](#koa) | `18538` | `8842` | `73502` |
| **11%** | [Carbon](#carbon) | `8152` | `1379` | `10154` |
| **9%** | [Express](#express) | `6478` | `1040` | `8360` |


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
    Reqs/sec      8622.41    5704.65   78235.54
    Latency        5.77ms     4.22ms   374.81ms
    HTTP codes:
      1xx - 0, 2xx - 92057, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7943
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7943
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
    Reqs/sec      7041.01    5389.21   65252.56
    Latency        7.07ms     3.86ms   353.61ms
    HTTP codes:
      1xx - 0, 2xx - 91013, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8987
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8987
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
    Reqs/sec     23462.86    7040.48   35280.04
    Latency        2.13ms     2.05ms   181.74ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.32MB/s
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
    Reqs/sec     20898.70    5891.14   28799.79
    Latency        2.39ms     1.92ms   174.87ms
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
    Reqs/sec     64569.09    3561.63   68639.40
    Latency      771.76us    62.54us     4.32ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.18MB/s
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
    Reqs/sec     18468.81    8787.62   77274.23
    Latency        2.70ms     2.40ms   209.08ms
    HTTP codes:
      1xx - 0, 2xx - 91289, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8711
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8711
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
    Reqs/sec     24648.97    7651.48   64713.95
    Latency        2.03ms     1.82ms   155.68ms
    HTTP codes:
      1xx - 0, 2xx - 97440, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2560
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2560
    Throughput:     5.49MB/s
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
    Reqs/sec     76370.70    3472.54   84206.69
    Latency      651.43us   240.06us    16.82ms
    HTTP codes:
      1xx - 0, 2xx - 96474, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3526
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3524
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 2
    Throughput:    11.66MB/s
  ```


