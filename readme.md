## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `77382` | `2802` | `84556` |
| **85%** | [Hyper Express](#hyper-express) | `65996` | `4121` | `74732` |
| **34%** | [Node (Default)](#node-default) | `26680` | `9081` | `71144` |
| **30%** | [Fastify](#fastify) | `23319` | `7103` | `35504` |
| **27%** | [Hono](#hono) | `20605` | `5414` | `30326` |
| **24%** | [Koa](#koa) | `18929` | `8515` | `71496` |
| **10%** | [Carbon](#carbon) | `7617` | `1191` | `9783` |
| **9%** | [Express](#express) | `6725` | `1140` | `8531` |


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
    Reqs/sec      8472.66    5807.17   81207.58
    Latency        5.89ms     4.16ms   361.96ms
    HTTP codes:
      1xx - 0, 2xx - 92250, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7750
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7750
    Throughput:     1.78MB/s
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
    Reqs/sec      6561.93    1024.75    8575.36
    Latency        7.61ms     3.62ms   346.63ms
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
    Reqs/sec     24282.80    7723.93   36632.92
    Latency        2.06ms     1.98ms   177.62ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.51MB/s
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
    Reqs/sec     21285.42    5766.87   30622.00
    Latency        2.35ms     1.94ms   173.52ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.81MB/s
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
    Reqs/sec     66055.29    4211.22   74668.23
    Latency      754.80us    68.78us     5.29ms
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
    Reqs/sec     18565.76    8804.22   83548.71
    Latency        2.68ms     2.35ms   208.14ms
    HTTP codes:
      1xx - 0, 2xx - 92112, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7888
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7888
    Throughput:     3.87MB/s
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
    Reqs/sec     25700.18    8555.45   80116.35
    Latency        1.94ms     1.83ms   157.86ms
    HTTP codes:
      1xx - 0, 2xx - 96250, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3750
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3750
    Throughput:     5.66MB/s
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
    Reqs/sec     77897.64    4229.36   80981.27
    Latency      639.12us   309.73us    13.77ms
    HTTP codes:
      1xx - 0, 2xx - 96665, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3335
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3335
    Throughput:    11.93MB/s
  ```


