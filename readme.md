## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76724` | `3415` | `86340` |
| **85%** | [Hyper Express](#hyper-express) | `65191` | `3456` | `75252` |
| **33%** | [Node (Default)](#node-default) | `25618` | `8651` | `82013` |
| **32%** | [Fastify](#fastify) | `24325` | `7232` | `37520` |
| **27%** | [Hono](#hono) | `20461` | `5428` | `30662` |
| **25%** | [Koa](#koa) | `18839` | `9857` | `85675` |
| **10%** | [Carbon](#carbon) | `7686` | `1251` | `9909` |
| **9%** | [Express](#express) | `6600` | `1069` | `8629` |


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
    Reqs/sec      8430.24    6173.95   86032.30
    Latency        5.92ms     4.24ms   369.00ms
    HTTP codes:
      1xx - 0, 2xx - 91709, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8291
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8291
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
    Reqs/sec      6627.01    1092.15    8578.26
    Latency        7.54ms     3.53ms   339.17ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     1.90MB/s
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
    Reqs/sec     24023.01    6860.20   38262.53
    Latency        2.08ms     1.95ms   174.75ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.45MB/s
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
    Reqs/sec     21111.50    6271.15   31219.55
    Latency        2.37ms     1.88ms   164.99ms
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
    Reqs/sec     66035.39    3769.24   69458.31
    Latency      755.32us    65.50us     3.58ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.38MB/s
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
    Reqs/sec     17459.61    8596.41   80500.02
    Latency        2.84ms     2.28ms   197.13ms
    HTTP codes:
      1xx - 0, 2xx - 91204, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8796
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8796
    Throughput:     3.62MB/s
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
    Reqs/sec     25371.57    8072.29   73463.77
    Latency        1.97ms     1.97ms   165.22ms
    HTTP codes:
      1xx - 0, 2xx - 96940, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3060
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3060
    Throughput:     5.62MB/s
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
    Reqs/sec     77506.74    3645.03   84781.73
    Latency      641.68us   251.99us    11.79ms
    HTTP codes:
      1xx - 0, 2xx - 96258, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3742
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3735
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 7
    Throughput:    11.81MB/s
  ```


