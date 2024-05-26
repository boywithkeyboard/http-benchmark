## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `74566` | `3633` | `82908` |
| **85%** | [Hyper Express](#hyper-express) | `63276` | `3742` | `74448` |
| **34%** | [Node (Default)](#node-default) | `25363` | `7849` | `59721` |
| **32%** | [Fastify](#fastify) | `23776` | `7386` | `35506` |
| **28%** | [Hono](#hono) | `20912` | `5412` | `29912` |
| **25%** | [Koa](#koa) | `18857` | `8854` | `87137` |
| **11%** | [Carbon](#carbon) | `8033` | `1371` | `10232` |
| **9%** | [Express](#express) | `6449` | `1056` | `8453` |


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
    Reqs/sec      8847.50    6405.11   86440.14
    Latency        5.65ms     4.35ms   373.91ms
    HTTP codes:
      1xx - 0, 2xx - 91184, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8816
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8816
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
    Reqs/sec      7051.26    6111.39   82022.21
    Latency        7.09ms     3.92ms   356.30ms
    HTTP codes:
      1xx - 0, 2xx - 89736, 3xx - 0, 4xx - 0, 5xx - 0
      others - 10264
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 10264
    Throughput:     1.81MB/s
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
    Reqs/sec     23426.83    7057.61   35786.81
    Latency        2.13ms     2.04ms   180.71ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.31MB/s
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
    Reqs/sec     21075.52    5675.30   30126.79
    Latency        2.37ms     1.90ms   172.98ms
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
    Reqs/sec     64301.18    4114.40   74036.44
    Latency      775.37us    71.42us     4.12ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.14MB/s
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
    Reqs/sec     19079.42   10602.68   81595.05
    Latency        2.62ms     2.33ms   204.05ms
    HTTP codes:
      1xx - 0, 2xx - 88299, 3xx - 0, 4xx - 0, 5xx - 0
      others - 11701
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 11701
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
    Reqs/sec     25889.53    8239.57   78609.20
    Latency        1.93ms     2.02ms   174.45ms
    HTTP codes:
      1xx - 0, 2xx - 96717, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3283
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3283
    Throughput:     5.73MB/s
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
    Reqs/sec     74538.30    2723.72   84283.84
    Latency      668.67us   220.69us    13.30ms
    HTTP codes:
      1xx - 0, 2xx - 95360, 3xx - 0, 4xx - 0, 5xx - 0
      others - 4640
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 4640
    Throughput:    11.23MB/s
  ```


