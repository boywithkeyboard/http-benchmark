## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `77262` | `3970` | `86740` |
| **84%** | [Hyper Express](#hyper-express) | `65140` | `3619` | `68339` |
| **33%** | [Node (Default)](#node-default) | `25831` | `7646` | `57778` |
| **32%** | [Fastify](#fastify) | `24766` | `7797` | `36988` |
| **27%** | [Hono](#hono) | `20498` | `5744` | `30621` |
| **23%** | [Koa](#koa) | `17827` | `7395` | `67821` |
| **11%** | [Carbon](#carbon) | `8175` | `1324` | `10308` |
| **8%** | [Express](#express) | `6522` | `1040` | `8427` |


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
    Reqs/sec      8669.44    4948.83   63647.41
    Latency        5.75ms     4.09ms   355.22ms
    HTTP codes:
      1xx - 0, 2xx - 93963, 3xx - 0, 4xx - 0, 5xx - 0
      others - 6037
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 6037
    Throughput:     1.85MB/s
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
    Reqs/sec      6587.70    1064.38    8413.51
    Latency        7.59ms     3.63ms   349.16ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     1.88MB/s
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
    Reqs/sec     23079.26    6987.97   37035.82
    Latency        2.17ms     1.95ms   177.12ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.23MB/s
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
    Reqs/sec     21208.67    6213.48   31038.85
    Latency        2.36ms     1.90ms   171.40ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.79MB/s
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
    Reqs/sec     64620.19    4055.56   69672.89
    Latency      772.15us    67.93us     3.47ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.17MB/s
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
    Reqs/sec     19167.33    8570.76   81221.78
    Latency        2.60ms     2.35ms   202.83ms
    HTTP codes:
      1xx - 0, 2xx - 92306, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7694
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7694
    Throughput:     4.01MB/s
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
    Reqs/sec     26240.05    7670.50   47194.82
    Latency        1.90ms     1.84ms   158.53ms
    HTTP codes:
      1xx - 0, 2xx - 98158, 3xx - 0, 4xx - 0, 5xx - 0
      others - 1842
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 1842
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
    Reqs/sec     78180.39    6808.76  123147.72
    Latency      640.39us   282.71us    21.70ms
    HTTP codes:
      1xx - 0, 2xx - 96320, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3680
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3680
    Throughput:    11.84MB/s
  ```


