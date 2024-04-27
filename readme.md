## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76818` | `3737` | `86636` |
| **82%** | [Hyper Express](#hyper-express) | `62615` | `5236` | `68350` |
| **34%** | [Node (Default)](#node-default) | `26158` | `7418` | `57876` |
| **31%** | [Fastify](#fastify) | `23858` | `7197` | `36732` |
| **28%** | [Hono](#hono) | `21651` | `5910` | `31054` |
| **27%** | [Koa](#koa) | `20425` | `9366` | `72410` |
| **10%** | [Carbon](#carbon) | `7769` | `1261` | `9949` |
| **8%** | [Express](#express) | `6500` | `995` | `8539` |


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
    Reqs/sec      8589.77    7693.36   92844.67
    Latency        5.81ms     4.27ms   373.00ms
    HTTP codes:
      1xx - 0, 2xx - 88448, 3xx - 0, 4xx - 0, 5xx - 0
      others - 11552
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 11552
    Throughput:     1.73MB/s
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
    Reqs/sec      7259.10    6745.55   95886.14
    Latency        6.90ms     3.84ms   350.91ms
    HTTP codes:
      1xx - 0, 2xx - 88896, 3xx - 0, 4xx - 0, 5xx - 0
      others - 11104
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 11104
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
    Reqs/sec     24088.45    7125.35   37333.77
    Latency        2.07ms     1.94ms   177.46ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.47MB/s
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
    Reqs/sec     21626.37    6316.96   31265.51
    Latency        2.31ms     1.91ms   173.94ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.89MB/s
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
    Reqs/sec     64684.02    2703.62   68713.36
    Latency      770.25us    62.73us     4.33ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.19MB/s
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
    Reqs/sec     18648.22    9487.56   82916.26
    Latency        2.67ms     2.42ms   207.78ms
    HTTP codes:
      1xx - 0, 2xx - 90594, 3xx - 0, 4xx - 0, 5xx - 0
      others - 9406
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 9406
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
    Reqs/sec     26182.86    8310.40   64724.53
    Latency        1.91ms     1.90ms   168.77ms
    HTTP codes:
      1xx - 0, 2xx - 97543, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2457
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2457
    Throughput:     5.85MB/s
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
    Reqs/sec     77668.97    2883.02   85836.88
    Latency      639.78us   207.41us    13.88ms
    HTTP codes:
      1xx - 0, 2xx - 95660, 3xx - 0, 4xx - 0, 5xx - 0
      others - 4340
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 4339
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 1
    Throughput:    11.77MB/s
  ```


