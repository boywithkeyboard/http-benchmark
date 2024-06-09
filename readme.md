## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76864` | `4626` | `93979` |
| **84%** | [Hyper Express](#hyper-express) | `64343` | `3848` | `67645` |
| **33%** | [Node (Default)](#node-default) | `25526` | `8339` | `69438` |
| **31%** | [Fastify](#fastify) | `23724` | `7004` | `36485` |
| **27%** | [Hono](#hono) | `20422` | `5462` | `29645` |
| **25%** | [Koa](#koa) | `19139` | `8296` | `76824` |
| **11%** | [Carbon](#carbon) | `8238` | `1373` | `10319` |
| **9%** | [Express](#express) | `6541` | `1039` | `8429` |


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
    Reqs/sec      9150.90    7904.24   79457.24
    Latency        5.44ms     4.11ms   355.47ms
    HTTP codes:
      1xx - 0, 2xx - 87733, 3xx - 0, 4xx - 0, 5xx - 0
      others - 12267
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 12267
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
    Reqs/sec      7155.45    6290.20   86363.40
    Latency        6.99ms     3.80ms   346.15ms
    HTTP codes:
      1xx - 0, 2xx - 89467, 3xx - 0, 4xx - 0, 5xx - 0
      others - 10533
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 10533
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
    Reqs/sec     24816.02    7735.31   36577.33
    Latency        2.01ms     1.89ms   171.00ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.63MB/s
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
    Reqs/sec     20772.19    5842.40   29466.31
    Latency        2.40ms     1.96ms   174.98ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.70MB/s
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
    Reqs/sec     65065.57    4060.44   79097.41
    Latency      768.19us    67.87us     4.80ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.22MB/s
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
    Reqs/sec     18052.80    8215.09   83116.16
    Latency        2.76ms     2.22ms   193.33ms
    HTTP codes:
      1xx - 0, 2xx - 92637, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7363
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7363
    Throughput:     3.78MB/s
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
    Reqs/sec     25807.47    8470.45   72718.96
    Latency        1.92ms     1.90ms   161.75ms
    HTTP codes:
      1xx - 0, 2xx - 96790, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3210
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3208
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 2
    Throughput:     5.75MB/s
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
    Reqs/sec     76102.45    4301.15   92434.96
    Latency      654.77us   244.74us    21.59ms
    HTTP codes:
      1xx - 0, 2xx - 97603, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2397
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2397
    Throughput:    11.76MB/s
  ```


