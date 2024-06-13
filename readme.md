## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76205` | `2938` | `85346` |
| **86%** | [Hyper Express](#hyper-express) | `65813` | `3306` | `74704` |
| **34%** | [Node (Default)](#node-default) | `26117` | `8534` | `81760` |
| **31%** | [Fastify](#fastify) | `23846` | `7082` | `36102` |
| **28%** | [Hono](#hono) | `21116` | `5858` | `30413` |
| **25%** | [Koa](#koa) | `19299` | `10425` | `88042` |
| **11%** | [Carbon](#carbon) | `8147` | `1387` | `10455` |
| **9%** | [Express](#express) | `6641` | `1075` | `8599` |


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
    Reqs/sec      8709.15    6264.12   82881.99
    Latency        5.73ms     4.18ms   363.59ms
    HTTP codes:
      1xx - 0, 2xx - 91375, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8625
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8625
    Throughput:     1.81MB/s
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
    Reqs/sec      7049.78    5081.71   64944.83
    Latency        7.08ms     3.74ms   344.90ms
    HTTP codes:
      1xx - 0, 2xx - 91977, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8023
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8023
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
    Reqs/sec     23833.57    7111.40   36907.50
    Latency        2.10ms     1.93ms   174.45ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.41MB/s
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
    Reqs/sec     21197.85    5833.09   30321.44
    Latency        2.36ms     2.00ms   178.26ms
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
    Reqs/sec     65483.47    3838.16   70784.90
    Latency      761.98us    72.60us     4.42ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.29MB/s
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
    Reqs/sec     18992.35    8463.99   81587.27
    Latency        2.63ms     2.36ms   206.84ms
    HTTP codes:
      1xx - 0, 2xx - 92277, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7723
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7723
    Throughput:     3.96MB/s
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
    Reqs/sec     26669.00    8259.44   61851.32
    Latency        1.87ms     1.85ms   158.18ms
    HTTP codes:
      1xx - 0, 2xx - 97580, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2420
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2420
    Throughput:     5.95MB/s
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
    Reqs/sec     75737.97    3958.37   84068.24
    Latency      656.71us   211.69us    11.88ms
    HTTP codes:
      1xx - 0, 2xx - 96150, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3850
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3850
    Throughput:    11.53MB/s
  ```


