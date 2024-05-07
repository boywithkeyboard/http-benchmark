## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `77105` | `4485` | `95819` |
| **84%** | [Hyper Express](#hyper-express) | `64588` | `3847` | `73084` |
| **34%** | [Node (Default)](#node-default) | `26340` | `9353` | `72784` |
| **32%** | [Fastify](#fastify) | `24590` | `7532` | `36886` |
| **26%** | [Hono](#hono) | `19972` | `5437` | `29957` |
| **24%** | [Koa](#koa) | `18363` | `8697` | `81633` |
| **10%** | [Carbon](#carbon) | `7870` | `1346` | `10009` |
| **8%** | [Express](#express) | `6536` | `1075` | `8581` |


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
    Reqs/sec      8557.94    7199.61   79453.74
    Latency        5.83ms     4.27ms   368.95ms
    HTTP codes:
      1xx - 0, 2xx - 89235, 3xx - 0, 4xx - 0, 5xx - 0
      others - 10765
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 10765
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
    Reqs/sec      6507.95    1037.55    8518.31
    Latency        7.68ms     3.53ms   339.76ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
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
    Reqs/sec     23230.25    6784.82   37079.40
    Latency        2.15ms     1.89ms   173.44ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.27MB/s
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
    Reqs/sec     20187.26    5670.58   29405.42
    Latency        2.48ms     2.01ms   178.34ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.56MB/s
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
    Reqs/sec     64751.46    4109.77   68494.37
    Latency      768.72us    64.95us     2.91ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.21MB/s
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
    Reqs/sec     18206.04    8415.48   82383.20
    Latency        2.73ms     2.44ms   210.74ms
    HTTP codes:
      1xx - 0, 2xx - 92025, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7975
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7975
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
    Reqs/sec     25364.31    8808.11   71899.05
    Latency        1.97ms     1.94ms   166.50ms
    HTTP codes:
      1xx - 0, 2xx - 96748, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3252
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3252
    Throughput:     5.61MB/s
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
    Reqs/sec     76469.95    3268.55   82532.27
    Latency      650.70us   260.75us    14.24ms
    HTTP codes:
      1xx - 0, 2xx - 96712, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3288
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3286
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 2
    Throughput:    11.71MB/s
  ```


