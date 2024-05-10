## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `78187` | `4341` | `88728` |
| **84%** | [Hyper Express](#hyper-express) | `65440` | `4653` | `81487` |
| **34%** | [Node (Default)](#node-default) | `26845` | `9226` | `89561` |
| **31%** | [Fastify](#fastify) | `24475` | `7212` | `36994` |
| **26%** | [Hono](#hono) | `20314` | `5303` | `30444` |
| **24%** | [Koa](#koa) | `19111` | `7989` | `74068` |
| **10%** | [Carbon](#carbon) | `7920` | `1320` | `9910` |
| **9%** | [Express](#express) | `6682` | `1113` | `8669` |


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
    Reqs/sec      8633.15    5662.86   81932.49
    Latency        5.78ms     4.22ms   368.17ms
    HTTP codes:
      1xx - 0, 2xx - 92742, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7258
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7258
    Throughput:     1.82MB/s
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
    Reqs/sec      7495.29    7254.20   89233.83
    Latency        6.66ms     3.83ms   350.52ms
    HTTP codes:
      1xx - 0, 2xx - 87101, 3xx - 0, 4xx - 0, 5xx - 0
      others - 12899
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 12899
    Throughput:     1.87MB/s
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
    Reqs/sec     24383.27    7680.09   37797.84
    Latency        2.05ms     1.94ms   175.75ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.52MB/s
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
    Reqs/sec     21851.32    6388.98   31004.03
    Latency        2.29ms     1.88ms   171.35ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.94MB/s
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
    Reqs/sec     65329.08    3536.33   70913.67
    Latency      762.84us    59.23us     2.79ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.28MB/s
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
    Reqs/sec     18670.16    8037.18   67200.64
    Latency        2.67ms     2.26ms   197.64ms
    HTTP codes:
      1xx - 0, 2xx - 93050, 3xx - 0, 4xx - 0, 5xx - 0
      others - 6950
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 6950
    Throughput:     3.93MB/s
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
    Reqs/sec     26350.96    9203.76   84062.45
    Latency        1.89ms     1.90ms   163.07ms
    HTTP codes:
      1xx - 0, 2xx - 96180, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3820
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3808
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 12
    Throughput:     5.81MB/s
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
    Reqs/sec     78194.04    3817.64   83817.43
    Latency      636.18us   208.80us    11.68ms
    HTTP codes:
      1xx - 0, 2xx - 96735, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3265
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3252
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 13
    Throughput:    11.97MB/s
  ```


