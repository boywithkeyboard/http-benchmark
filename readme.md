## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `74610` | `3757` | `79758` |
| **85%** | [Hyper Express](#hyper-express) | `63447` | `4397` | `81493` |
| **34%** | [Node (Default)](#node-default) | `25609` | `8608` | `79713` |
| **34%** | [Fastify](#fastify) | `25055` | `8090` | `36404` |
| **27%** | [Hono](#hono) | `20173` | `5632` | `30043` |
| **25%** | [Koa](#koa) | `18611` | `9744` | `81456` |
| **11%** | [Carbon](#carbon) | `8083` | `1431` | `10201` |
| **9%** | [Express](#express) | `6478` | `1079` | `8501` |


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
    Reqs/sec      8661.60    5356.87   77131.05
    Latency        5.76ms     4.31ms   378.08ms
    HTTP codes:
      1xx - 0, 2xx - 93020, 3xx - 0, 4xx - 0, 5xx - 0
      others - 6980
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 6980
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
    Reqs/sec      6386.88    1030.51    8405.03
    Latency        7.82ms     3.67ms   350.62ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
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
    Reqs/sec     23831.85    7317.60   35984.23
    Latency        2.10ms     1.98ms   176.31ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.40MB/s
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
    Reqs/sec     21664.22    6274.25   30748.48
    Latency        2.31ms     2.00ms   179.87ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.89MB/s
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
    Reqs/sec     62877.64    3676.69   67435.68
    Latency      793.36us    65.73us     3.02ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     8.93MB/s
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
    Reqs/sec     18947.84   10434.46   81608.71
    Latency        2.63ms     2.39ms   209.62ms
    HTTP codes:
      1xx - 0, 2xx - 88407, 3xx - 0, 4xx - 0, 5xx - 0
      others - 11593
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 11593
    Throughput:     3.79MB/s
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
    Reqs/sec     26048.03    8348.39   77440.90
    Latency        1.92ms     1.92ms   164.92ms
    HTTP codes:
      1xx - 0, 2xx - 96632, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3368
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3368
    Throughput:     5.76MB/s
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
    Reqs/sec     75903.75    3625.86   83124.94
    Latency      655.64us   197.55us    11.81ms
    HTTP codes:
      1xx - 0, 2xx - 96566, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3434
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3433
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 1
    Throughput:    11.59MB/s
  ```


