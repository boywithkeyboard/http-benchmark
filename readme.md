## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `77568` | `4392` | `87773` |
| **83%** | [Hyper Express](#hyper-express) | `64490` | `3419` | `78624` |
| **34%** | [Node (Default)](#node-default) | `26058` | `8549` | `55949` |
| **31%** | [Fastify](#fastify) | `24239` | `7194` | `35550` |
| **27%** | [Hono](#hono) | `20697` | `5572` | `29912` |
| **24%** | [Koa](#koa) | `18796` | `9968` | `83780` |
| **10%** | [Carbon](#carbon) | `8100` | `1348` | `10297` |
| **8%** | [Express](#express) | `6580` | `1070` | `8489` |


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
    Reqs/sec      8606.71    5223.28   72819.89
    Latency        5.78ms     4.11ms   358.85ms
    HTTP codes:
      1xx - 0, 2xx - 93068, 3xx - 0, 4xx - 0, 5xx - 0
      others - 6932
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 6932
    Throughput:     1.82MB/s
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
    Reqs/sec      6417.25     968.32    8349.18
    Latency        7.79ms     3.47ms   333.50ms
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
    Reqs/sec     23954.44    7019.46   35449.20
    Latency        2.08ms     1.87ms   170.35ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.44MB/s
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
    Reqs/sec     21202.31    5887.63   30127.45
    Latency        2.36ms     1.88ms   167.51ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.78MB/s
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
    Reqs/sec     64321.45    4992.20   70018.44
    Latency      775.50us    93.67us     3.67ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.13MB/s
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
    Reqs/sec     18780.28    8423.13   73628.83
    Latency        2.66ms     2.37ms   205.57ms
    HTTP codes:
      1xx - 0, 2xx - 92446, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7554
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7554
    Throughput:     3.92MB/s
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
    Reqs/sec     25544.13    8185.22   81681.27
    Latency        1.95ms     1.89ms   159.78ms
    HTTP codes:
      1xx - 0, 2xx - 96366, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3634
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3634
    Throughput:     5.64MB/s
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
    Reqs/sec     76571.17    3613.20   83400.54
    Latency      649.97us   114.88us     9.63ms
    HTTP codes:
      1xx - 0, 2xx - 97402, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2598
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2591
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 7
    Throughput:    11.80MB/s
  ```


