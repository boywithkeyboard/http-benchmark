## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `73869` | `6608` | `83086` |
| **87%** | [Hyper Express](#hyper-express) | `64317` | `4216` | `68500` |
| **34%** | [Node (Default)](#node-default) | `25398` | `8069` | `49768` |
| **33%** | [Fastify](#fastify) | `24236` | `7467` | `35471` |
| **28%** | [Hono](#hono) | `20455` | `6032` | `29181` |
| **25%** | [Koa](#koa) | `18825` | `7193` | `60608` |
| **11%** | [Carbon](#carbon) | `8005` | `1321` | `10154` |
| **8%** | [Express](#express) | `6268` | `967` | `8263` |


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
    Reqs/sec      8319.80    3994.07   48803.02
    Latency        6.00ms     4.39ms   378.78ms
    HTTP codes:
      1xx - 0, 2xx - 94016, 3xx - 0, 4xx - 0, 5xx - 0
      others - 5984
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 5984
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
    Reqs/sec      6298.59    1025.36    8304.23
    Latency        7.93ms     3.67ms   351.04ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     1.80MB/s
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
    Reqs/sec     23976.67    7745.16   36889.17
    Latency        2.08ms     2.00ms   181.18ms
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
    Reqs/sec     20661.50    6058.83   29966.06
    Latency        2.42ms     2.05ms   184.60ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.67MB/s
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
    Reqs/sec     65231.76    5460.63   73246.08
    Latency      764.23us    93.91us     5.10ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.27MB/s
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
    Reqs/sec     18261.08    6273.94   62484.31
    Latency        2.73ms     2.41ms   208.70ms
    HTTP codes:
      1xx - 0, 2xx - 94271, 3xx - 0, 4xx - 0, 5xx - 0
      others - 5729
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 5729
    Throughput:     3.90MB/s
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
    Reqs/sec     25856.89    7827.05   48077.34
    Latency        1.93ms     1.92ms   166.47ms
    HTTP codes:
      1xx - 0, 2xx - 98308, 3xx - 0, 4xx - 0, 5xx - 0
      others - 1692
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 1692
    Throughput:     5.82MB/s
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
    Reqs/sec     76647.97    6670.03   85943.55
    Latency      650.76us   202.26us    10.76ms
    HTTP codes:
      1xx - 0, 2xx - 98003, 3xx - 0, 4xx - 0, 5xx - 0
      others - 1997
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 1997
    Throughput:    11.88MB/s
  ```


