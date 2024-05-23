## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76574` | `5238` | `101813` |
| **81%** | [Hyper Express](#hyper-express) | `62270` | `4113` | `72328` |
| **34%** | [Node (Default)](#node-default) | `25779` | `8166` | `61788` |
| **30%** | [Fastify](#fastify) | `23306` | `6848` | `35229` |
| **27%** | [Hono](#hono) | `20419` | `5974` | `29169` |
| **24%** | [Koa](#koa) | `18639` | `9619` | `80568` |
| **10%** | [Carbon](#carbon) | `7771` | `1288` | `9851` |
| **8%** | [Express](#express) | `6275` | `1006` | `8288` |


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
    Reqs/sec      8643.55    5939.72   78540.92
    Latency        5.77ms     4.27ms   370.54ms
    HTTP codes:
      1xx - 0, 2xx - 91602, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8398
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8398
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
    Reqs/sec      6179.68     952.57    8171.46
    Latency        8.09ms     3.60ms   348.52ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     1.77MB/s
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
    Reqs/sec     23262.05    6729.53   34288.40
    Latency        2.15ms     1.98ms   179.44ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.28MB/s
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
    Reqs/sec     21133.06    5813.46   29188.35
    Latency        2.36ms     2.04ms   185.18ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.77MB/s
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
    Reqs/sec     62634.89    3502.04   67196.64
    Latency      796.29us    72.66us     3.99ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     8.89MB/s
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
    Reqs/sec     18193.51    8722.97   77481.10
    Latency        2.74ms     2.40ms   207.50ms
    HTTP codes:
      1xx - 0, 2xx - 91023, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8977
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8977
    Throughput:     3.75MB/s
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
    Reqs/sec     26585.09    8756.12   59629.43
    Latency        1.88ms     1.97ms   177.79ms
    HTTP codes:
      1xx - 0, 2xx - 97782, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2218
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2218
    Throughput:     5.94MB/s
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
    Reqs/sec     74820.27    3029.63   83437.46
    Latency      664.38us   268.04us    19.00ms
    HTTP codes:
      1xx - 0, 2xx - 95517, 3xx - 0, 4xx - 0, 5xx - 0
      others - 4483
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 4481
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 2
    Throughput:    11.32MB/s
  ```


