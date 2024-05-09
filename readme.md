## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `80478` | `4288` | `93974` |
| **82%** | [Hyper Express](#hyper-express) | `65946` | `3781` | `69930` |
| **33%** | [Node (Default)](#node-default) | `26576` | `9153` | `77415` |
| **29%** | [Fastify](#fastify) | `23583` | `7593` | `36973` |
| **27%** | [Hono](#hono) | `21446` | `5960` | `30511` |
| **25%** | [Koa](#koa) | `19952` | `10405` | `87225` |
| **10%** | [Carbon](#carbon) | `8028` | `1355` | `10190` |
| **8%** | [Express](#express) | `6640` | `1065` | `8610` |


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
    Reqs/sec      8418.33    5883.19   88270.65
    Latency        5.93ms     4.18ms   366.75ms
    HTTP codes:
      1xx - 0, 2xx - 92052, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7948
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7948
    Throughput:     1.76MB/s
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
    Reqs/sec      6665.22    1084.53    8677.18
    Latency        7.50ms     3.57ms   342.50ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     1.91MB/s
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
    Reqs/sec     24471.13    7356.09   36730.50
    Latency        2.04ms     2.03ms   178.90ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.56MB/s
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
    Reqs/sec     20898.40    5976.05   30005.46
    Latency        2.39ms     1.88ms   169.76ms
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
    Reqs/sec     66379.20    4067.34   71446.20
    Latency      751.73us    65.60us     2.87ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.42MB/s
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
    Reqs/sec     19181.34    8067.15   73002.90
    Latency        2.60ms     2.34ms   204.98ms
    HTTP codes:
      1xx - 0, 2xx - 92796, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7204
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7204
    Throughput:     4.03MB/s
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
    Reqs/sec     26576.87    9325.41   83385.50
    Latency        1.88ms     1.92ms   167.59ms
    HTTP codes:
      1xx - 0, 2xx - 96689, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3311
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3311
    Throughput:     5.88MB/s
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
    Reqs/sec     78132.09    3253.82   90146.90
    Latency      637.29us   182.89us    10.72ms
    HTTP codes:
      1xx - 0, 2xx - 96789, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3211
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3176
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 35
    Throughput:    11.97MB/s
  ```


