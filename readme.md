## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76051` | `4891` | `101975` |
| **82%** | [Hyper Express](#hyper-express) | `62044` | `3138` | `64917` |
| **34%** | [Node (Default)](#node-default) | `26165` | `9482` | `79639` |
| **31%** | [Fastify](#fastify) | `23280` | `6864` | `34584` |
| **27%** | [Hono](#hono) | `20206` | `5466` | `29141` |
| **24%** | [Koa](#koa) | `18044` | `8839` | `79180` |
| **10%** | [Carbon](#carbon) | `7890` | `1276` | `10192` |
| **8%** | [Express](#express) | `6304` | `949` | `8281` |


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
    Reqs/sec      8523.12    5789.46   83575.27
    Latency        5.86ms     4.15ms   362.76ms
    HTTP codes:
      1xx - 0, 2xx - 92375, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7625
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7625
    Throughput:     1.79MB/s
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
    Reqs/sec      6377.61     982.16    8358.04
    Latency        7.84ms     3.62ms   346.26ms
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
    Reqs/sec     22587.61    6774.29   34262.46
    Latency        2.21ms     2.03ms   181.74ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.13MB/s
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
    Reqs/sec     20143.26    5746.42   29586.65
    Latency        2.48ms     1.96ms   177.23ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.55MB/s
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
    Reqs/sec     62660.99    3236.51   68717.71
    Latency      795.43us    63.68us     4.39ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     8.90MB/s
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
    Reqs/sec     18471.19    9017.25   78050.35
    Latency        2.70ms     2.17ms   196.53ms
    HTTP codes:
      1xx - 0, 2xx - 90332, 3xx - 0, 4xx - 0, 5xx - 0
      others - 9668
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 9668
    Throughput:     3.77MB/s
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
    Reqs/sec     24304.81    7404.58   65609.80
    Latency        2.05ms     1.92ms   160.73ms
    HTTP codes:
      1xx - 0, 2xx - 96757, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3243
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3243
    Throughput:     5.38MB/s
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
    Reqs/sec     74670.99    4342.78   89406.81
    Latency      669.10us   206.74us    13.07ms
    HTTP codes:
      1xx - 0, 2xx - 97592, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2408
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2408
    Throughput:    11.51MB/s
  ```


