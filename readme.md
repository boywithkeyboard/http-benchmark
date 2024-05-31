## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76379` | `4226` | `85105` |
| **83%** | [Hyper Express](#hyper-express) | `63429` | `3766` | `71468` |
| **33%** | [Node (Default)](#node-default) | `25420` | `8587` | `78472` |
| **32%** | [Fastify](#fastify) | `24166` | `7316` | `36634` |
| **26%** | [Hono](#hono) | `19633` | `5594` | `30562` |
| **25%** | [Koa](#koa) | `19303` | `9808` | `82640` |
| **11%** | [Carbon](#carbon) | `8220` | `1415` | `10440` |
| **9%** | [Express](#express) | `6608` | `1073` | `8598` |


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
    Reqs/sec      9063.74    7417.32   86994.97
    Latency        5.50ms     4.23ms   363.26ms
    HTTP codes:
      1xx - 0, 2xx - 89156, 3xx - 0, 4xx - 0, 5xx - 0
      others - 10844
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 10844
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
    Reqs/sec      7180.04    5744.22   81472.31
    Latency        6.96ms     3.71ms   340.77ms
    HTTP codes:
      1xx - 0, 2xx - 90698, 3xx - 0, 4xx - 0, 5xx - 0
      others - 9302
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 9302
    Throughput:     1.86MB/s
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
    Reqs/sec     24226.32    7436.18   36270.12
    Latency        2.06ms     2.00ms   177.65ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.50MB/s
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
    Reqs/sec     20437.36    5879.80   30508.81
    Latency        2.45ms     1.94ms   176.35ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.62MB/s
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
    Reqs/sec     63097.35    3912.12   68308.98
    Latency      790.66us    68.43us     3.90ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     8.96MB/s
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
    Reqs/sec     18291.77    8413.19   77129.06
    Latency        2.72ms     2.41ms   205.74ms
    HTTP codes:
      1xx - 0, 2xx - 91760, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8240
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8240
    Throughput:     3.80MB/s
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
    Reqs/sec     25778.11    7756.79   60373.21
    Latency        1.94ms     1.91ms   170.46ms
    HTTP codes:
      1xx - 0, 2xx - 97684, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2316
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2316
    Throughput:     5.77MB/s
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
    Reqs/sec     75471.19    3813.86   84622.33
    Latency      658.44us   177.10us    14.69ms
    HTTP codes:
      1xx - 0, 2xx - 96425, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3575
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3564
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 11
    Throughput:    11.53MB/s
  ```


