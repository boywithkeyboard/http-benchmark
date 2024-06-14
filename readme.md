## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `75883` | `4661` | `87665` |
| **83%** | [Hyper Express](#hyper-express) | `62813` | `3744` | `69593` |
| **33%** | [Node (Default)](#node-default) | `25240` | `8217` | `80908` |
| **32%** | [Fastify](#fastify) | `24298` | `7496` | `35631` |
| **27%** | [Hono](#hono) | `20632` | `5394` | `29993` |
| **24%** | [Koa](#koa) | `18206` | `8040` | `82958` |
| **11%** | [Carbon](#carbon) | `8086` | `1356` | `10249` |
| **8%** | [Express](#express) | `6388` | `954` | `8349` |


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
    Reqs/sec      8933.93    6526.59   76475.79
    Latency        5.58ms     4.21ms   362.49ms
    HTTP codes:
      1xx - 0, 2xx - 90781, 3xx - 0, 4xx - 0, 5xx - 0
      others - 9219
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 9219
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
    Reqs/sec      7209.95    5966.02   83589.85
    Latency        6.92ms     3.83ms   349.15ms
    HTTP codes:
      1xx - 0, 2xx - 90156, 3xx - 0, 4xx - 0, 5xx - 0
      others - 9844
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 9844
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
    Reqs/sec     24287.75    7262.70   34973.83
    Latency        2.06ms     1.86ms   167.66ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.51MB/s
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
    Reqs/sec     19228.35    4762.95   29628.92
    Latency        2.60ms     1.95ms   177.28ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.34MB/s
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
    Reqs/sec     62456.33    3864.19   70354.03
    Latency      799.34us    68.63us     3.30ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     8.86MB/s
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
    Reqs/sec     18936.29    9653.12   82105.20
    Latency        2.64ms     2.28ms   199.17ms
    HTTP codes:
      1xx - 0, 2xx - 89624, 3xx - 0, 4xx - 0, 5xx - 0
      others - 10376
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 10376
    Throughput:     3.84MB/s
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
    Reqs/sec     25849.32    9017.55   90741.48
    Latency        1.93ms     1.85ms   155.25ms
    HTTP codes:
      1xx - 0, 2xx - 96232, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3768
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3768
    Throughput:     5.69MB/s
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
    Reqs/sec     76374.80    4380.37   93986.05
    Latency      652.15us   197.02us    11.75ms
    HTTP codes:
      1xx - 0, 2xx - 96599, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3401
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3385
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 16
    Throughput:    11.66MB/s
  ```


