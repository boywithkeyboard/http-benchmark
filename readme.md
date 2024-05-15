## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76783` | `4267` | `87087` |
| **88%** | [Hyper Express](#hyper-express) | `67593` | `10274` | `80726` |
| **33%** | [Node (Default)](#node-default) | `25420` | `8639` | `76672` |
| **30%** | [Fastify](#fastify) | `23220` | `7123` | `36047` |
| **28%** | [Hono](#hono) | `21706` | `6026` | `29855` |
| **24%** | [Koa](#koa) | `18465` | `9512` | `77510` |
| **10%** | [Carbon](#carbon) | `7730` | `1322` | `9802` |
| **8%** | [Express](#express) | `6268` | `944` | `8405` |


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
    Reqs/sec      8479.95    7026.85   87230.71
    Latency        5.89ms     4.36ms   380.42ms
    HTTP codes:
      1xx - 0, 2xx - 89654, 3xx - 0, 4xx - 0, 5xx - 0
      others - 10346
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 10346
    Throughput:     1.72MB/s
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
    Reqs/sec      6354.99    1027.23    8484.36
    Latency        7.87ms     3.71ms   355.55ms
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
    Reqs/sec     23549.80    7210.08   35315.52
    Latency        2.12ms     1.95ms   177.65ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.34MB/s
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
    Reqs/sec     20235.33    5877.62   30180.99
    Latency        2.47ms     2.06ms   184.12ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.57MB/s
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
    Reqs/sec     64560.16    3563.25   71332.28
    Latency      772.04us    65.66us     2.81ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.17MB/s
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
    Reqs/sec     18610.95    8416.26   81650.26
    Latency        2.68ms     2.37ms   205.12ms
    HTTP codes:
      1xx - 0, 2xx - 92240, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7760
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7760
    Throughput:     3.89MB/s
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
    Reqs/sec     26624.21    8491.93   63776.99
    Latency        1.87ms     1.94ms   165.79ms
    HTTP codes:
      1xx - 0, 2xx - 97495, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2505
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2505
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
    Reqs/sec     78796.28    4163.93   97583.72
    Latency      631.01us   184.41us    10.35ms
    HTTP codes:
      1xx - 0, 2xx - 96462, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3538
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3538
    Throughput:    12.03MB/s
  ```


