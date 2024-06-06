## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76389` | `4068` | `87025` |
| **82%** | [Hyper Express](#hyper-express) | `62572` | `3265` | `65446` |
| **32%** | [Node (Default)](#node-default) | `24697` | `7475` | `60731` |
| **31%** | [Fastify](#fastify) | `23692` | `7156` | `35247` |
| **26%** | [Hono](#hono) | `19652` | `5180` | `29671` |
| **24%** | [Koa](#koa) | `18072` | `7402` | `64203` |
| **11%** | [Carbon](#carbon) | `8150` | `1437` | `10792` |
| **8%** | [Express](#express) | `6364` | `981` | `8582` |


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
    Reqs/sec      8700.56    5790.18   71556.52
    Latency        5.72ms     4.22ms   366.38ms
    HTTP codes:
      1xx - 0, 2xx - 91711, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8289
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8289
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
    Reqs/sec      6454.21    1046.68    8653.97
    Latency        7.75ms     3.52ms   338.45ms
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
    Reqs/sec     23448.81    7130.79   36820.42
    Latency        2.13ms     1.97ms   178.26ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.31MB/s
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
    Reqs/sec     21083.77    6245.39   30377.34
    Latency        2.37ms     1.93ms   171.18ms
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
    Reqs/sec     62419.60    3519.87   68835.98
    Latency      799.63us    65.91us     2.98ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     8.86MB/s
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
    Reqs/sec     18620.17    8670.22   76728.37
    Latency        2.68ms     2.38ms   206.35ms
    HTTP codes:
      1xx - 0, 2xx - 91385, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8615
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8615
    Throughput:     3.85MB/s
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
    Reqs/sec     25277.84    7849.57   73710.95
    Latency        1.97ms     1.86ms   158.90ms
    HTTP codes:
      1xx - 0, 2xx - 97253, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2747
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2747
    Throughput:     5.63MB/s
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
    Reqs/sec     76081.75    5675.32  102452.15
    Latency      656.64us   240.33us    17.29ms
    HTTP codes:
      1xx - 0, 2xx - 96711, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3289
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3289
    Throughput:    11.59MB/s
  ```


