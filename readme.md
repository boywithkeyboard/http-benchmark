## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `75661` | `3078` | `85023` |
| **84%** | [Hyper Express](#hyper-express) | `63253` | `4015` | `75169` |
| **35%** | [Node (Default)](#node-default) | `26237` | `8689` | `79203` |
| **32%** | [Fastify](#fastify) | `24055` | `7029` | `35360` |
| **27%** | [Hono](#hono) | `20588` | `5870` | `30029` |
| **25%** | [Koa](#koa) | `19133` | `8870` | `83162` |
| **11%** | [Carbon](#carbon) | `8294` | `1446` | `10516` |
| **9%** | [Express](#express) | `6652` | `1052` | `8508` |


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
    Reqs/sec      8893.41    6908.31   86806.56
    Latency        5.59ms     4.35ms   376.35ms
    HTTP codes:
      1xx - 0, 2xx - 90100, 3xx - 0, 4xx - 0, 5xx - 0
      others - 9900
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 9900
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
    Reqs/sec      7094.20    5972.95   78031.85
    Latency        7.03ms     3.85ms   349.15ms
    HTTP codes:
      1xx - 0, 2xx - 90052, 3xx - 0, 4xx - 0, 5xx - 0
      others - 9948
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 9948
    Throughput:     1.83MB/s
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
    Reqs/sec     23473.91    6751.74   34828.12
    Latency        2.13ms     1.93ms   171.92ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.33MB/s
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
    Reqs/sec     21322.63    6203.15   30055.24
    Latency        2.34ms     1.99ms   178.31ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.81MB/s
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
    Reqs/sec     63144.75    3872.91   75207.87
    Latency      790.30us    70.22us     3.04ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     8.96MB/s
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
    Reqs/sec     18834.01    9513.23   82297.85
    Latency        2.65ms     2.39ms   209.80ms
    HTTP codes:
      1xx - 0, 2xx - 89667, 3xx - 0, 4xx - 0, 5xx - 0
      others - 10333
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 10333
    Throughput:     3.82MB/s
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
    Reqs/sec     26633.91    8903.37   76406.91
    Latency        1.87ms     1.89ms   160.71ms
    HTTP codes:
      1xx - 0, 2xx - 95968, 3xx - 0, 4xx - 0, 5xx - 0
      others - 4032
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 4032
    Throughput:     5.87MB/s
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
    Reqs/sec     75661.18    3172.72   85390.44
    Latency      657.25us   202.92us    17.26ms
    HTTP codes:
      1xx - 0, 2xx - 95563, 3xx - 0, 4xx - 0, 5xx - 0
      others - 4437
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 4424
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 13
    Throughput:    11.44MB/s
  ```


