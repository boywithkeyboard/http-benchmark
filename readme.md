## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `75795` | `2969` | `87106` |
| **87%** | [Hyper Express](#hyper-express) | `65615` | `4133` | `78637` |
| **37%** | [Node (Default)](#node-default) | `27810` | `9449` | `87555` |
| **34%** | [Fastify](#fastify) | `25393` | `8264` | `36726` |
| **27%** | [Hono](#hono) | `20343` | `5853` | `30305` |
| **25%** | [Koa](#koa) | `18947` | `9378` | `85806` |
| **10%** | [Carbon](#carbon) | `7789` | `1317` | `9805` |
| **9%** | [Express](#express) | `6469` | `1029` | `8477` |


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
    Reqs/sec      8585.69    7467.70   80768.12
    Latency        5.81ms     4.26ms   371.23ms
    HTTP codes:
      1xx - 0, 2xx - 88376, 3xx - 0, 4xx - 0, 5xx - 0
      others - 11624
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 11624
    Throughput:     1.72MB/s
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
    Reqs/sec      7062.02    5414.39   73871.50
    Latency        7.07ms     3.81ms   349.76ms
    HTTP codes:
      1xx - 0, 2xx - 91338, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8662
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8662
    Throughput:     1.85MB/s
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
    Reqs/sec     24874.99    7703.22   36341.09
    Latency        2.01ms     1.99ms   180.22ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.64MB/s
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
    Reqs/sec     21007.84    6003.16   30116.01
    Latency        2.38ms     2.02ms   178.96ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.74MB/s
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
    Reqs/sec     64588.37    3946.48   75897.75
    Latency      772.20us    63.38us     2.92ms
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
    Reqs/sec     18899.56    9205.08   80814.45
    Latency        2.64ms     2.40ms   208.94ms
    HTTP codes:
      1xx - 0, 2xx - 90793, 3xx - 0, 4xx - 0, 5xx - 0
      others - 9207
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 9207
    Throughput:     3.89MB/s
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
    Reqs/sec     25191.43    9002.15   83307.71
    Latency        1.98ms     1.79ms   154.86ms
    HTTP codes:
      1xx - 0, 2xx - 95609, 3xx - 0, 4xx - 0, 5xx - 0
      others - 4391
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 4386
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 5
    Throughput:     5.52MB/s
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
    Reqs/sec     76666.64    3375.19   90414.59
    Latency      648.35us   214.22us    11.93ms
    HTTP codes:
      1xx - 0, 2xx - 95582, 3xx - 0, 4xx - 0, 5xx - 0
      others - 4418
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 4418
    Throughput:    11.61MB/s
  ```


