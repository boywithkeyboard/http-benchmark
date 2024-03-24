## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76429` | `4496` | `95381` |
| **86%** | [Hyper Express](#hyper-express) | `66067` | `4259` | `88295` |
| **33%** | [Node (Default)](#node-default) | `25551` | `8524` | `67169` |
| **32%** | [Fastify](#fastify) | `24187` | `7158` | `37264` |
| **28%** | [Hono](#hono) | `21561` | `6134` | `31375` |
| **25%** | [Koa](#koa) | `19180` | `10094` | `84776` |
| **9%** | [Carbon](#carbon) | `7112` | `1152` | `9025` |
| **8%** | [Express](#express) | `6443` | `1028` | `8420` |


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
    Reqs/sec      7676.45    5154.96   73183.15
    Latency        6.47ms     4.40ms   383.05ms
    HTTP codes:
      1xx - 0, 2xx - 92591, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7409
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7409
    Throughput:     1.62MB/s
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
    Reqs/sec      6368.40     952.66    8406.72
    Latency        7.85ms     3.48ms   335.02ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
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
    Reqs/sec     25186.05    7887.44   37381.93
    Latency        1.98ms     2.02ms   179.79ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.71MB/s
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
    Reqs/sec     21692.27    6539.48   31144.97
    Latency        2.30ms     1.97ms   173.77ms
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
    Reqs/sec     65561.17    3307.70   74341.87
    Latency      759.45us    58.45us     2.73ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.32MB/s
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
    Reqs/sec     18644.59    9165.69   84358.68
    Latency        2.68ms     2.28ms   199.05ms
    HTTP codes:
      1xx - 0, 2xx - 90864, 3xx - 0, 4xx - 0, 5xx - 0
      others - 9136
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 9136
    Throughput:     3.83MB/s
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
    Reqs/sec     26494.39    8833.94   82643.17
    Latency        1.88ms     1.84ms   159.90ms
    HTTP codes:
      1xx - 0, 2xx - 96784, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3216
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3216
    Throughput:     5.88MB/s
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
    Reqs/sec     76757.23    4420.32   82860.44
    Latency      648.71us   204.79us    10.43ms
    HTTP codes:
      1xx - 0, 2xx - 96598, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3402
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3402
    Throughput:    11.72MB/s
  ```


