## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `74552` | `5347` | `91589` |
| **85%** | [Hyper Express](#hyper-express) | `63520` | `4752` | `87187` |
| **36%** | [Node (Default)](#node-default) | `26644` | `8835` | `86118` |
| **31%** | [Fastify](#fastify) | `22987` | `6949` | `35828` |
| **28%** | [Hono](#hono) | `21067` | `5758` | `30051` |
| **25%** | [Koa](#koa) | `18392` | `8424` | `78909` |
| **11%** | [Carbon](#carbon) | `8014` | `1335` | `10255` |
| **9%** | [Express](#express) | `6469` | `1051` | `8506` |


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
    Reqs/sec      8746.56    6683.39   84630.01
    Latency        5.71ms     4.19ms   365.20ms
    HTTP codes:
      1xx - 0, 2xx - 90709, 3xx - 0, 4xx - 0, 5xx - 0
      others - 9291
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 9291
    Throughput:     1.80MB/s
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
    Reqs/sec      6579.02    1083.83    8554.82
    Latency        7.60ms     3.45ms   334.82ms
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
    Reqs/sec     24099.72    7032.04   35853.72
    Latency        2.07ms     1.96ms   176.14ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.46MB/s
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
    Reqs/sec     21016.83    6213.13   31493.30
    Latency        2.38ms     1.93ms   175.00ms
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
    Reqs/sec     62660.80    2359.26   67832.44
    Latency      795.59us    64.12us     3.02ms
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
    Reqs/sec     18096.46    8216.80   78558.36
    Latency        2.76ms     2.40ms   209.11ms
    HTTP codes:
      1xx - 0, 2xx - 92628, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7372
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7372
    Throughput:     3.79MB/s
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
    Reqs/sec     25266.31    8247.98   78193.73
    Latency        1.97ms     2.00ms   172.21ms
    HTTP codes:
      1xx - 0, 2xx - 96844, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3156
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3156
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
    Reqs/sec     75182.89    3695.78   84881.01
    Latency      662.78us   166.13us    13.99ms
    HTTP codes:
      1xx - 0, 2xx - 97302, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2698
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2698
    Throughput:    11.58MB/s
  ```


