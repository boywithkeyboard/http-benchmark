## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `75212` | `3608` | `80923` |
| **84%** | [Hyper Express](#hyper-express) | `63442` | `3379` | `66154` |
| **35%** | [Node (Default)](#node-default) | `26480` | `8867` | `84521` |
| **32%** | [Fastify](#fastify) | `23965` | `7001` | `36403` |
| **27%** | [Hono](#hono) | `20296` | `5262` | `30047` |
| **24%** | [Koa](#koa) | `18268` | `7929` | `73920` |
| **11%** | [Carbon](#carbon) | `8205` | `1390` | `10306` |
| **9%** | [Express](#express) | `6489` | `970` | `8536` |


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
    Reqs/sec      8805.53    6249.94   80290.27
    Latency        5.67ms     4.27ms   373.20ms
    HTTP codes:
      1xx - 0, 2xx - 91346, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8654
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8654
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
    Reqs/sec      7076.68    5836.55   78943.00
    Latency        7.06ms     3.77ms   344.70ms
    HTTP codes:
      1xx - 0, 2xx - 90457, 3xx - 0, 4xx - 0, 5xx - 0
      others - 9543
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 9543
    Throughput:     1.83MB/s
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
    Reqs/sec     23399.48    6939.95   34757.87
    Latency        2.14ms     1.90ms   171.88ms
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
    Reqs/sec     20640.49    6007.14   30776.16
    Latency        2.42ms     2.03ms   181.55ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.66MB/s
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
    Reqs/sec     63396.08    3941.03   70657.66
    Latency      786.53us    73.09us     3.90ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.01MB/s
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
    Reqs/sec     17987.17    8618.68   78859.20
    Latency        2.77ms     2.26ms   198.64ms
    HTTP codes:
      1xx - 0, 2xx - 91629, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8371
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8371
    Throughput:     3.73MB/s
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
    Reqs/sec     25455.89    8547.98   89240.23
    Latency        1.96ms     1.90ms   160.94ms
    HTTP codes:
      1xx - 0, 2xx - 96198, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3802
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3802
    Throughput:     5.60MB/s
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
    Reqs/sec     75180.98    3779.00   93203.50
    Latency      661.36us   208.65us    13.30ms
    HTTP codes:
      1xx - 0, 2xx - 95676, 3xx - 0, 4xx - 0, 5xx - 0
      others - 4324
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 4323
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 1
    Throughput:    11.39MB/s
  ```


