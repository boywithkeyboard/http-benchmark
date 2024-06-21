## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `78866` | `4744` | `87564` |
| **85%** | [Hyper Express](#hyper-express) | `66970` | `5007` | `83280` |
| **35%** | [Node (Default)](#node-default) | `27989` | `9740` | `90786` |
| **31%** | [Fastify](#fastify) | `24744` | `7061` | `39112` |
| **28%** | [Hono](#hono) | `21781` | `6200` | `32430` |
| **24%** | [Koa](#koa) | `18868` | `8975` | `87223` |
| **11%** | [Carbon](#carbon) | `8469` | `1448` | `11107` |
| **9%** | [Express](#express) | `6716` | `1107` | `8948` |


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
    Reqs/sec      8848.57    4630.68   63282.27
    Latency        5.63ms     4.08ms   358.36ms
    HTTP codes:
      1xx - 0, 2xx - 94361, 3xx - 0, 4xx - 0, 5xx - 0
      others - 5639
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 5639
    Throughput:     1.90MB/s
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
    Reqs/sec      7284.80    5344.12   65710.64
    Latency        6.85ms     3.80ms   346.87ms
    HTTP codes:
      1xx - 0, 2xx - 91739, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8261
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8261
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
    Reqs/sec     24456.45    6998.44   38287.11
    Latency        2.04ms     1.83ms   162.48ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.55MB/s
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
    Reqs/sec     21720.43    5868.25   31976.58
    Latency        2.30ms     1.79ms   165.42ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.90MB/s
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
    Reqs/sec     65870.98    3903.03   71128.50
    Latency      756.98us    61.07us     2.57ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.36MB/s
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
    Reqs/sec     20024.19    9570.00   82032.78
    Latency        2.49ms     2.19ms   192.97ms
    HTTP codes:
      1xx - 0, 2xx - 91302, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8698
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8698
    Throughput:     4.14MB/s
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
    Reqs/sec     27776.20    8945.73   85732.28
    Latency        1.80ms     1.71ms   147.19ms
    HTTP codes:
      1xx - 0, 2xx - 96633, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3367
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3367
    Throughput:     6.15MB/s
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
    Reqs/sec     79430.19    5219.21   89179.20
    Latency      626.69us   230.93us    14.26ms
    HTTP codes:
      1xx - 0, 2xx - 96096, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3904
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3899
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 5
    Throughput:    12.08MB/s
  ```


