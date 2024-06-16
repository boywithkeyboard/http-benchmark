## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76415` | `3736` | `81582` |
| **86%** | [Hyper Express](#hyper-express) | `65855` | `6097` | `79317` |
| **34%** | [Node (Default)](#node-default) | `25681` | `8307` | `78533` |
| **30%** | [Fastify](#fastify) | `23177` | `6413` | `34893` |
| **27%** | [Hono](#hono) | `20482` | `5824` | `30747` |
| **24%** | [Koa](#koa) | `18029` | `6785` | `56325` |
| **11%** | [Carbon](#carbon) | `8199` | `1370` | `10380` |
| **8%** | [Express](#express) | `6454` | `986` | `8498` |


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
    Reqs/sec      8857.92    6316.47   87744.52
    Latency        5.63ms     4.18ms   363.12ms
    HTTP codes:
      1xx - 0, 2xx - 91302, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8698
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8698
    Throughput:     1.84MB/s
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
    Reqs/sec      6442.09     990.46    8511.88
    Latency        7.76ms     3.64ms   347.48ms
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
    Reqs/sec     23667.40    7419.24   36000.62
    Latency        2.11ms     1.86ms   169.38ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.38MB/s
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
    Reqs/sec     20461.26    5442.81   30153.55
    Latency        2.44ms     1.97ms   175.43ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.63MB/s
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
    Reqs/sec     63614.01    4529.43   68738.07
    Latency      784.26us    91.98us     3.42ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.03MB/s
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
    Reqs/sec     17820.77    7529.55   66199.17
    Latency        2.79ms     2.36ms   204.37ms
    HTTP codes:
      1xx - 0, 2xx - 93305, 3xx - 0, 4xx - 0, 5xx - 0
      others - 6695
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 6695
    Throughput:     3.76MB/s
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
    Reqs/sec     25922.48    8315.98   76966.80
    Latency        1.93ms     1.74ms   146.50ms
    HTTP codes:
      1xx - 0, 2xx - 96954, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3046
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3046
    Throughput:     5.75MB/s
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
    Reqs/sec     75309.29    3779.42   82150.84
    Latency      662.18us   203.10us    10.42ms
    HTTP codes:
      1xx - 0, 2xx - 96841, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3159
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3157
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 2
    Throughput:    11.52MB/s
  ```


