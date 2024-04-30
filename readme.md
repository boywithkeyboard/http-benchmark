## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `78148` | `4964` | `94287` |
| **83%** | [Hyper Express](#hyper-express) | `64794` | `3969` | `72573` |
| **34%** | [Node (Default)](#node-default) | `26850` | `8583` | `86253` |
| **31%** | [Fastify](#fastify) | `23946` | `7504` | `35338` |
| **26%** | [Hono](#hono) | `20544` | `5706` | `29636` |
| **24%** | [Koa](#koa) | `18710` | `8788` | `82284` |
| **10%** | [Carbon](#carbon) | `7745` | `1313` | `9852` |
| **8%** | [Express](#express) | `6372` | `1005` | `8423` |


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
    Reqs/sec      8433.55    5973.99   78409.97
    Latency        5.91ms     4.36ms   377.42ms
    HTTP codes:
      1xx - 0, 2xx - 91478, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8522
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8522
    Throughput:     1.75MB/s
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
    Reqs/sec      6491.05    1062.41    8509.39
    Latency        7.70ms     3.73ms   357.88ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     1.86MB/s
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
    Reqs/sec     23169.22    6405.48   34737.83
    Latency        2.16ms     2.05ms   181.27ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.25MB/s
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
    Reqs/sec     21223.86    6224.00   30257.94
    Latency        2.35ms     1.91ms   171.28ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.80MB/s
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
    Reqs/sec     65474.30    2957.98   72584.10
    Latency      761.50us    61.48us     2.74ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.30MB/s
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
    Reqs/sec     18376.22    8395.60   77917.55
    Latency        2.71ms     2.42ms   207.75ms
    HTTP codes:
      1xx - 0, 2xx - 92350, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7650
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7650
    Throughput:     3.84MB/s
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
    Reqs/sec     26260.57    8996.01   83926.46
    Latency        1.90ms     1.84ms   157.64ms
    HTTP codes:
      1xx - 0, 2xx - 96284, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3716
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3716
    Throughput:     5.78MB/s
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
    Reqs/sec     77460.41    5165.24   86645.43
    Latency      642.53us   202.15us     9.23ms
    HTTP codes:
      1xx - 0, 2xx - 95868, 3xx - 0, 4xx - 0, 5xx - 0
      others - 4132
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 4132
    Throughput:    11.75MB/s
  ```


