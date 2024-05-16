## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `75790` | `4245` | `90447` |
| **85%** | [Hyper Express](#hyper-express) | `64127` | `3479` | `67112` |
| **34%** | [Node (Default)](#node-default) | `26021` | `8870` | `83990` |
| **31%** | [Fastify](#fastify) | `23833` | `7378` | `36458` |
| **27%** | [Hono](#hono) | `20183` | `5505` | `29947` |
| **25%** | [Koa](#koa) | `18772` | `10154` | `85009` |
| **11%** | [Carbon](#carbon) | `8001` | `1351` | `10094` |
| **9%** | [Express](#express) | `6539` | `1060` | `8481` |


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
    Reqs/sec      8724.46    5976.42   82581.06
    Latency        5.72ms     4.09ms   353.55ms
    HTTP codes:
      1xx - 0, 2xx - 92156, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7844
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7844
    Throughput:     1.83MB/s
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
    Reqs/sec      6455.75    1035.28    8390.51
    Latency        7.74ms     3.69ms   347.92ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     1.85MB/s
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
    Reqs/sec     24118.17    7124.71   35682.21
    Latency        2.07ms     1.97ms   177.38ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.47MB/s
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
    Reqs/sec     20937.37    5854.22   30175.29
    Latency        2.39ms     1.96ms   175.47ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.72MB/s
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
    Reqs/sec     63757.23    3769.50   67906.95
    Latency      782.64us    68.53us     3.57ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.05MB/s
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
    Reqs/sec     19795.82   10402.37   81284.27
    Latency        2.51ms     2.35ms   204.41ms
    HTTP codes:
      1xx - 0, 2xx - 88453, 3xx - 0, 4xx - 0, 5xx - 0
      others - 11547
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 11547
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
    Reqs/sec     25901.51    8536.24   74108.81
    Latency        1.93ms     1.99ms   170.15ms
    HTTP codes:
      1xx - 0, 2xx - 96859, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3141
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3141
    Throughput:     5.74MB/s
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
    Reqs/sec     77427.80    6072.14  116342.02
    Latency      648.11us   169.46us     8.73ms
    HTTP codes:
      1xx - 0, 2xx - 97322, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2678
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2677
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 1
    Throughput:    11.84MB/s
  ```


