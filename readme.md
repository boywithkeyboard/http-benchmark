## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `77222` | `4729` | `88902` |
| **86%** | [Hyper Express](#hyper-express) | `66212` | `5353` | `98499` |
| **35%** | [Node (Default)](#node-default) | `26958` | `8811` | `84127` |
| **31%** | [Fastify](#fastify) | `24223` | `7871` | `37574` |
| **28%** | [Hono](#hono) | `21410` | `6112` | `30827` |
| **24%** | [Koa](#koa) | `18875` | `8582` | `84540` |
| **10%** | [Carbon](#carbon) | `7806` | `1264` | `10054` |
| **9%** | [Express](#express) | `6615` | `1070` | `8547` |


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
    Reqs/sec      8289.80    5442.78   77817.38
    Latency        6.02ms     4.23ms   366.08ms
    HTTP codes:
      1xx - 0, 2xx - 92973, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7027
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7027
    Throughput:     1.75MB/s
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
    Reqs/sec      6664.78    1094.53    8568.14
    Latency        7.50ms     3.55ms   336.58ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
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
    Reqs/sec     24538.61    7760.02   36835.44
    Latency        2.04ms     1.90ms   176.55ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.56MB/s
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
    Reqs/sec     22119.19    6603.92   31720.51
    Latency        2.26ms     2.04ms   186.06ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.99MB/s
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
    Reqs/sec     66097.21    4032.55   69722.00
    Latency      754.62us    67.63us     3.49ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.39MB/s
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
    Reqs/sec     19548.23   10551.82   89158.13
    Latency        2.55ms     2.31ms   201.62ms
    HTTP codes:
      1xx - 0, 2xx - 89022, 3xx - 0, 4xx - 0, 5xx - 0
      others - 10978
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 10978
    Throughput:     3.93MB/s
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
    Reqs/sec     26742.30    9111.07   86423.97
    Latency        1.86ms     1.85ms   156.17ms
    HTTP codes:
      1xx - 0, 2xx - 96542, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3458
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3458
    Throughput:     5.92MB/s
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
    Reqs/sec     77590.34    4472.37   92125.95
    Latency      641.61us   249.80us    10.76ms
    HTTP codes:
      1xx - 0, 2xx - 96531, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3469
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3469
    Throughput:    11.85MB/s
  ```


