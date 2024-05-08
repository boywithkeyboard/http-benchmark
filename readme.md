## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `78218` | `4704` | `88211` |
| **83%** | [Hyper Express](#hyper-express) | `65133` | `3647` | `70761` |
| **34%** | [Node (Default)](#node-default) | `26869` | `8779` | `56939` |
| **31%** | [Fastify](#fastify) | `24404` | `7733` | `37027` |
| **27%** | [Hono](#hono) | `21103` | `6082` | `30535` |
| **24%** | [Koa](#koa) | `18484` | `6970` | `60757` |
| **10%** | [Carbon](#carbon) | `7779` | `1303` | `9854` |
| **8%** | [Express](#express) | `6455` | `1028` | `8504` |


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
    Reqs/sec      8173.91    5076.19   80766.12
    Latency        6.11ms     4.25ms   371.20ms
    HTTP codes:
      1xx - 0, 2xx - 93564, 3xx - 0, 4xx - 0, 5xx - 0
      others - 6436
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 6436
    Throughput:     1.74MB/s
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
    Reqs/sec      6625.19    1099.97    8524.39
    Latency        7.54ms     3.60ms   343.68ms
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
    Reqs/sec     23887.71    7270.66   36350.27
    Latency        2.09ms     2.02ms   180.97ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.42MB/s
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
    Reqs/sec     20924.02    5957.79   30745.71
    Latency        2.39ms     2.01ms   180.98ms
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
    Reqs/sec     65744.71    3497.89   76204.33
    Latency      759.19us    60.33us     2.73ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.33MB/s
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
    Reqs/sec     18652.13    8273.36   81141.00
    Latency        2.67ms     2.40ms   207.48ms
    HTTP codes:
      1xx - 0, 2xx - 92745, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7255
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7255
    Throughput:     3.91MB/s
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
    Reqs/sec     26198.99    7878.62   59354.47
    Latency        1.90ms     1.87ms   165.48ms
    HTTP codes:
      1xx - 0, 2xx - 97509, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2491
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2482
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 9
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
    Reqs/sec     78370.24    3724.83   82328.96
    Latency      634.92us   232.23us    11.54ms
    HTTP codes:
      1xx - 0, 2xx - 96457, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3543
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3543
    Throughput:    11.95MB/s
  ```


