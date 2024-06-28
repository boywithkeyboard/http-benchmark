## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `75209` | `6990` | `95644` |
| **84%** | [Hyper Express](#hyper-express) | `63300` | `3959` | `70488` |
| **35%** | [Node (Default)](#node-default) | `25958` | `7932` | `40582` |
| **32%** | [Fastify](#fastify) | `24056` | `7400` | `36236` |
| **26%** | [Hono](#hono) | `19473` | `5319` | `29036` |
| **24%** | [Koa](#koa) | `18120` | `6720` | `56391` |
| **11%** | [Carbon](#carbon) | `7992` | `1362` | `10138` |
| **8%** | [Express](#express) | `6316` | `930` | `8465` |


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
    Reqs/sec      8198.21    3797.74   56262.32
    Latency        6.09ms     4.30ms   373.69ms
    HTTP codes:
      1xx - 0, 2xx - 94673, 3xx - 0, 4xx - 0, 5xx - 0
      others - 5327
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 5327
    Throughput:     1.76MB/s
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
    Reqs/sec      6414.08    1026.45    8361.41
    Latency        7.79ms     3.75ms   355.73ms
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
    Reqs/sec     25935.64    8916.97   36798.12
    Latency        1.93ms     2.02ms   182.85ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.88MB/s
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
    Reqs/sec     20365.17    5463.24   29543.00
    Latency        2.45ms     1.99ms   178.90ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.60MB/s
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
    Reqs/sec     63410.12    3078.29   70350.78
    Latency      786.25us    66.41us     2.96ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.01MB/s
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
    Reqs/sec     17715.59    5710.55   42883.94
    Latency        2.81ms     2.31ms   202.86ms
    HTTP codes:
      1xx - 0, 2xx - 95556, 3xx - 0, 4xx - 0, 5xx - 0
      others - 4444
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 4444
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
    Reqs/sec     25393.74    7534.80   38366.02
    Latency        1.96ms     1.87ms   159.07ms
    HTTP codes:
      1xx - 0, 2xx - 98395, 3xx - 0, 4xx - 0, 5xx - 0
      others - 1605
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 1605
    Throughput:     5.72MB/s
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
    Reqs/sec     76113.36    6820.61   86547.26
    Latency      655.12us   182.10us    12.65ms
    HTTP codes:
      1xx - 0, 2xx - 98342, 3xx - 0, 4xx - 0, 5xx - 0
      others - 1658
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 1654
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 4
    Throughput:    11.84MB/s
  ```


