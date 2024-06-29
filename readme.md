## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76000` | `5727` | `84348` |
| **86%** | [Hyper Express](#hyper-express) | `65015` | `3752` | `72349` |
| **34%** | [Node (Default)](#node-default) | `25813` | `7757` | `41072` |
| **31%** | [Fastify](#fastify) | `23860` | `6994` | `36409` |
| **27%** | [Hono](#hono) | `20634` | `5463` | `30044` |
| **23%** | [Koa](#koa) | `17594` | `6928` | `59831` |
| **11%** | [Carbon](#carbon) | `8057` | `1350` | `10232` |
| **9%** | [Express](#express) | `6545` | `1050` | `8456` |


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
    Reqs/sec      8662.27    4399.96   53056.59
    Latency        5.76ms     4.17ms   357.49ms
    HTTP codes:
      1xx - 0, 2xx - 92949, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7051
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7051
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
    Reqs/sec      6515.41    1007.99    8526.84
    Latency        7.67ms     3.51ms   338.15ms
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
    Reqs/sec     24885.18    7789.01   36311.82
    Latency        2.01ms     1.95ms   177.64ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.65MB/s
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
    Reqs/sec     20827.02    5587.91   30388.37
    Latency        2.40ms     1.91ms   173.60ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.70MB/s
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
    Reqs/sec     63929.19    3331.05   67797.40
    Latency      780.66us    58.84us     2.76ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.07MB/s
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
    Reqs/sec     18270.08    6818.22   55585.67
    Latency        2.73ms     2.44ms   210.46ms
    HTTP codes:
      1xx - 0, 2xx - 93121, 3xx - 0, 4xx - 0, 5xx - 0
      others - 6879
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 6879
    Throughput:     3.85MB/s
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
    Reqs/sec     25192.38    7067.14   42732.34
    Latency        1.98ms     1.79ms   151.87ms
    HTTP codes:
      1xx - 0, 2xx - 98236, 3xx - 0, 4xx - 0, 5xx - 0
      others - 1764
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 1764
    Throughput:     5.67MB/s
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
    Reqs/sec     76036.87    6266.07   82251.42
    Latency      655.30us   160.89us     9.82ms
    HTTP codes:
      1xx - 0, 2xx - 97455, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2545
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2545
    Throughput:    11.72MB/s
  ```


