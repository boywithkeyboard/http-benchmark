## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76897` | `3937` | `85373` |
| **83%** | [Hyper Express](#hyper-express) | `63793` | `3344` | `72408` |
| **34%** | [Node (Default)](#node-default) | `26024` | `8895` | `75749` |
| **30%** | [Fastify](#fastify) | `23214` | `7041` | `35754` |
| **29%** | [Hono](#hono) | `22311` | `6811` | `30419` |
| **24%** | [Koa](#koa) | `18382` | `8470` | `81308` |
| **10%** | [Carbon](#carbon) | `7902` | `1283` | `10134` |
| **8%** | [Express](#express) | `6376` | `1015` | `8429` |


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
    Reqs/sec      8870.01    7592.47   77821.55
    Latency        5.63ms     4.37ms   376.10ms
    HTTP codes:
      1xx - 0, 2xx - 88065, 3xx - 0, 4xx - 0, 5xx - 0
      others - 11935
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 11935
    Throughput:     1.77MB/s
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
    Reqs/sec      6424.84    1003.38    8452.13
    Latency        7.78ms     3.69ms   350.50ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
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
    Reqs/sec     25019.96    7920.02   36346.44
    Latency        2.00ms     2.08ms   190.45ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.68MB/s
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
    Reqs/sec     20556.96    5646.03   30145.13
    Latency        2.43ms     2.03ms   185.55ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.64MB/s
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
    Reqs/sec     63276.05    3847.70   69085.79
    Latency      788.12us    69.78us     2.78ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     8.99MB/s
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
    Reqs/sec     18562.69    7892.35   70513.04
    Latency        2.68ms     2.42ms   214.31ms
    HTTP codes:
      1xx - 0, 2xx - 91958, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8042
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8042
    Throughput:     3.86MB/s
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
    Reqs/sec     26326.72    8720.17   82312.92
    Latency        1.89ms     1.93ms   162.88ms
    HTTP codes:
      1xx - 0, 2xx - 96723, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3277
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3277
    Throughput:     5.84MB/s
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
    Reqs/sec     75300.99    4193.94   83518.63
    Latency      661.27us   179.31us    10.00ms
    HTTP codes:
      1xx - 0, 2xx - 96294, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3706
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3706
    Throughput:    11.48MB/s
  ```


