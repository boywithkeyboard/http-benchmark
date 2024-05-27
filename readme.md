## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `75742` | `5374` | `86297` |
| **84%** | [Hyper Express](#hyper-express) | `63680` | `3027` | `68073` |
| **34%** | [Node (Default)](#node-default) | `25769` | `8085` | `65167` |
| **31%** | [Fastify](#fastify) | `23521` | `6869` | `36665` |
| **28%** | [Hono](#hono) | `21387` | `5985` | `31057` |
| **25%** | [Koa](#koa) | `18844` | `8518` | `90062` |
| **11%** | [Carbon](#carbon) | `8159` | `1361` | `10298` |
| **9%** | [Express](#express) | `6677` | `1113` | `8562` |


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
    Reqs/sec      8605.51    5851.20   81784.81
    Latency        5.80ms     4.20ms   361.47ms
    HTTP codes:
      1xx - 0, 2xx - 92109, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7891
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7891
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
    Reqs/sec      6632.10    1089.68    8533.18
    Latency        7.54ms     3.62ms   344.98ms
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
    Reqs/sec     23863.91    7369.58   35790.24
    Latency        2.09ms     2.03ms   181.04ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.42MB/s
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
    Reqs/sec     20938.72    5916.22   29498.22
    Latency        2.39ms     1.94ms   174.91ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.73MB/s
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
    Reqs/sec     64441.11    4096.23   70006.20
    Latency      773.72us    65.89us     2.95ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.15MB/s
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
    Reqs/sec     19244.44    9265.64   80754.90
    Latency        2.59ms     2.39ms   214.30ms
    HTTP codes:
      1xx - 0, 2xx - 91176, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8824
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8824
    Throughput:     3.97MB/s
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
    Reqs/sec     26937.14    8509.05   66572.48
    Latency        1.85ms     1.89ms   161.10ms
    HTTP codes:
      1xx - 0, 2xx - 97269, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2731
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2731
    Throughput:     6.00MB/s
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
    Reqs/sec     76062.31    3106.16   81044.06
    Latency      654.89us   174.97us    12.19ms
    HTTP codes:
      1xx - 0, 2xx - 97324, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2676
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2662
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 14
    Throughput:    11.72MB/s
  ```


