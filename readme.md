## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `75689` | `5541` | `88674` |
| **86%** | [Hyper Express](#hyper-express) | `65073` | `3218` | `72899` |
| **36%** | [Node (Default)](#node-default) | `27235` | `8915` | `55034` |
| **34%** | [Fastify](#fastify) | `25875` | `8289` | `37462` |
| **28%** | [Hono](#hono) | `21206` | `6305` | `30773` |
| **25%** | [Koa](#koa) | `18620` | `9773` | `77855` |
| **11%** | [Carbon](#carbon) | `8027` | `1331` | `10369` |
| **9%** | [Express](#express) | `6532` | `1066` | `8503` |


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
    Reqs/sec      8656.28    6222.37   77888.14
    Latency        5.76ms     4.32ms   373.65ms
    HTTP codes:
      1xx - 0, 2xx - 91236, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8764
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8764
    Throughput:     1.79MB/s
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
    Reqs/sec      7160.00    6446.04   76721.34
    Latency        6.97ms     3.87ms   354.83ms
    HTTP codes:
      1xx - 0, 2xx - 88671, 3xx - 0, 4xx - 0, 5xx - 0
      others - 11329
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 11329
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
    Reqs/sec     24815.91    8254.71   38134.20
    Latency        2.01ms     1.99ms   179.92ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.62MB/s
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
    Reqs/sec     21284.52    6272.72   30785.93
    Latency        2.35ms     1.90ms   169.88ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.81MB/s
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
    Reqs/sec     65204.56    3696.13   70454.15
    Latency      764.34us    63.35us     3.78ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.26MB/s
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
    Reqs/sec     19199.26    9713.61   82604.01
    Latency        2.60ms     2.38ms   206.62ms
    HTTP codes:
      1xx - 0, 2xx - 89954, 3xx - 0, 4xx - 0, 5xx - 0
      others - 10046
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 10046
    Throughput:     3.91MB/s
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
    Reqs/sec     26385.27    7973.97   57529.24
    Latency        1.89ms     1.88ms   160.05ms
    HTTP codes:
      1xx - 0, 2xx - 97694, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2306
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2306
    Throughput:     5.90MB/s
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
    Reqs/sec     75696.83    4047.07   85872.31
    Latency      658.73us   249.65us    19.14ms
    HTTP codes:
      1xx - 0, 2xx - 97588, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2412
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2404
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 8
    Throughput:    11.68MB/s
  ```


