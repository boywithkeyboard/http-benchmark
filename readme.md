## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76648` | `4006` | `83707` |
| **84%** | [Hyper Express](#hyper-express) | `64751` | `3460` | `67610` |
| **32%** | [Node (Default)](#node-default) | `24898` | `7316` | `61274` |
| **30%** | [Fastify](#fastify) | `22772` | `6800` | `34731` |
| **28%** | [Hono](#hono) | `21459` | `6028` | `29892` |
| **23%** | [Koa](#koa) | `18000` | `7674` | `68039` |
| **10%** | [Carbon](#carbon) | `7857` | `1371` | `10070` |
| **8%** | [Express](#express) | `6274` | `974` | `8281` |


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
    Reqs/sec      8477.81    5489.57   73979.30
    Latency        5.88ms     4.37ms   380.36ms
    HTTP codes:
      1xx - 0, 2xx - 92675, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7325
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7325
    Throughput:     1.79MB/s
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
    Reqs/sec      6324.15    1017.29    8245.05
    Latency        7.90ms     3.69ms   351.05ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     1.81MB/s
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
    Reqs/sec     23166.44    6604.77   34395.87
    Latency        2.16ms     1.95ms   173.60ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.25MB/s
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
    Reqs/sec     20555.27    5761.18   29443.22
    Latency        2.43ms     2.01ms   181.16ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.64MB/s
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
    Reqs/sec     64644.67    4315.04   73019.57
    Latency      771.06us    70.57us     3.56ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.18MB/s
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
    Reqs/sec     19152.22    9264.75   83528.04
    Latency        2.60ms     2.33ms   205.57ms
    HTTP codes:
      1xx - 0, 2xx - 90959, 3xx - 0, 4xx - 0, 5xx - 0
      others - 9041
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 9041
    Throughput:     3.94MB/s
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
    Reqs/sec     25528.55    8005.55   66329.23
    Latency        1.95ms     1.92ms   161.22ms
    HTTP codes:
      1xx - 0, 2xx - 97160, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2840
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2840
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
    Reqs/sec     76644.98    4277.59   84565.09
    Latency      648.76us   231.06us    12.41ms
    HTTP codes:
      1xx - 0, 2xx - 96849, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3151
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3151
    Throughput:    11.76MB/s
  ```


