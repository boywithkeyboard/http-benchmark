## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `78256` | `3585` | `87570` |
| **84%** | [Hyper Express](#hyper-express) | `65921` | `4072` | `71657` |
| **35%** | [Node (Default)](#node-default) | `27642` | `9611` | `83931` |
| **32%** | [Fastify](#fastify) | `25053` | `7748` | `37742` |
| **27%** | [Hono](#hono) | `21513` | `5829` | `31444` |
| **24%** | [Koa](#koa) | `18980` | `8434` | `78709` |
| **10%** | [Carbon](#carbon) | `7885` | `1248` | `10122` |
| **9%** | [Express](#express) | `6762` | `1112` | `8859` |


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
    Reqs/sec      8868.68    7277.43   81902.34
    Latency        5.62ms     4.14ms   360.34ms
    HTTP codes:
      1xx - 0, 2xx - 89293, 3xx - 0, 4xx - 0, 5xx - 0
      others - 10707
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 10707
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
    Reqs/sec      7235.65    6192.28   81796.93
    Latency        6.90ms     3.75ms   342.67ms
    HTTP codes:
      1xx - 0, 2xx - 89870, 3xx - 0, 4xx - 0, 5xx - 0
      others - 10130
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 10130
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
    Reqs/sec     24424.92    7183.66   38202.52
    Latency        2.05ms     1.92ms   174.97ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.54MB/s
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
    Reqs/sec     20410.06    5666.87   30686.57
    Latency        2.45ms     1.90ms   171.23ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.61MB/s
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
    Reqs/sec     66002.43    4117.22   74667.57
    Latency      755.25us    71.46us     3.48ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.38MB/s
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
    Reqs/sec     19025.92    7289.94   68842.06
    Latency        2.60ms     2.39ms   206.54ms
    HTTP codes:
      1xx - 0, 2xx - 93304, 3xx - 0, 4xx - 0, 5xx - 0
      others - 6696
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 6696
    Throughput:     4.04MB/s
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
    Reqs/sec     29083.86    9851.58   59147.74
    Latency        1.72ms     1.91ms   161.24ms
    HTTP codes:
      1xx - 0, 2xx - 97605, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2395
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2395
    Throughput:     6.50MB/s
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
    Reqs/sec     78238.06    4090.18   85791.76
    Latency      636.69us   188.27us    16.83ms
    HTTP codes:
      1xx - 0, 2xx - 97354, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2646
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2646
    Throughput:    12.05MB/s
  ```


