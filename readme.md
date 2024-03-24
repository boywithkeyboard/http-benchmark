## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76938` | `4172` | `89221` |
| **86%** | [Hyper Express](#hyper-express) | `66276` | `3846` | `70583` |
| **34%** | [Node (Default)](#node-default) | `26212` | `8761` | `76802` |
| **32%** | [Fastify](#fastify) | `24673` | `7730` | `37413` |
| **29%** | [Hono](#hono) | `21958` | `6202` | `32164` |
| **26%** | [Koa](#koa) | `19692` | `8666` | `81933` |
| **9%** | [Carbon](#carbon) | `7301` | `1172` | `9206` |
| **8%** | [Express](#express) | `6479` | `1001` | `8426` |


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
    Reqs/sec      7839.69    5877.56   77352.92
    Latency        6.37ms     4.44ms   384.70ms
    HTTP codes:
      1xx - 0, 2xx - 91845, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8155
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8155
    Throughput:     1.64MB/s
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
    Reqs/sec      6625.75    1056.62    8434.48
    Latency        7.54ms     3.57ms   342.46ms
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
    Reqs/sec     24222.16    6926.54   36586.91
    Latency        2.06ms     1.87ms   169.35ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.49MB/s
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
    Reqs/sec     21853.36    6495.49   31744.99
    Latency        2.29ms     1.94ms   170.29ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.94MB/s
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
    Reqs/sec     66127.87    3950.62   74905.93
    Latency      753.93us    64.97us     3.48ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.39MB/s
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
    Reqs/sec     19598.03   10647.50   88735.69
    Latency        2.54ms     2.32ms   200.82ms
    HTTP codes:
      1xx - 0, 2xx - 88607, 3xx - 0, 4xx - 0, 5xx - 0
      others - 11393
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 11393
    Throughput:     3.93MB/s
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
    Reqs/sec     26340.43    8559.54   77226.57
    Latency        1.89ms     1.88ms   162.15ms
    HTTP codes:
      1xx - 0, 2xx - 96884, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3116
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3116
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
    Reqs/sec     77477.02    4117.50   87500.35
    Latency      641.82us   231.37us    20.68ms
    HTTP codes:
      1xx - 0, 2xx - 96060, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3940
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3940
    Throughput:    11.78MB/s
  ```


