## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `77675` | `4042` | `93896` |
| **83%** | [Hyper Express](#hyper-express) | `64242` | `3315` | `70000` |
| **36%** | [Node (Default)](#node-default) | `27845` | `9275` | `57538` |
| **32%** | [Fastify](#fastify) | `24976` | `7522` | `36602` |
| **27%** | [Hono](#hono) | `20939` | `5870` | `29780` |
| **25%** | [Koa](#koa) | `19254` | `9924` | `84070` |
| **10%** | [Carbon](#carbon) | `7712` | `1282` | `10006` |
| **9%** | [Express](#express) | `6640` | `1063` | `8558` |


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
    Reqs/sec      8330.98    6572.81   82416.03
    Latency        5.99ms     4.30ms   374.80ms
    HTTP codes:
      1xx - 0, 2xx - 90519, 3xx - 0, 4xx - 0, 5xx - 0
      others - 9481
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 9481
    Throughput:     1.71MB/s
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
    Reqs/sec      6630.35    1069.44    8562.20
    Latency        7.54ms     3.56ms   339.50ms
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
    Reqs/sec     23333.75    6581.05   36343.02
    Latency        2.14ms     1.94ms   173.88ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.30MB/s
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
    Reqs/sec     21017.42    6016.11   30625.38
    Latency        2.38ms     1.94ms   174.48ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.75MB/s
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
    Reqs/sec     65510.61    4061.37   79274.98
    Latency      761.52us    66.81us     4.46ms
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
    Reqs/sec     18791.65    8670.38   76340.67
    Latency        2.65ms     2.40ms   205.82ms
    HTTP codes:
      1xx - 0, 2xx - 91808, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8192
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8192
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
    Reqs/sec     26501.85    9359.91   79864.93
    Latency        1.88ms     1.86ms   156.10ms
    HTTP codes:
      1xx - 0, 2xx - 96552, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3448
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3448
    Throughput:     5.86MB/s
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
    Reqs/sec     76566.63    3275.09   87580.46
    Latency      650.02us   214.14us    12.06ms
    HTTP codes:
      1xx - 0, 2xx - 96190, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3810
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3810
    Throughput:    11.65MB/s
  ```


