## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `77021` | `5135` | `96457` |
| **84%** | [Hyper Express](#hyper-express) | `64614` | `4150` | `72846` |
| **34%** | [Node (Default)](#node-default) | `25955` | `8635` | `71796` |
| **30%** | [Fastify](#fastify) | `23370` | `7343` | `36046` |
| **27%** | [Hono](#hono) | `21118` | `6237` | `31017` |
| **25%** | [Koa](#koa) | `19278` | `10325` | `81089` |
| **11%** | [Carbon](#carbon) | `8104` | `1423` | `10305` |
| **8%** | [Express](#express) | `6345` | `1014` | `8375` |


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
    Reqs/sec      8674.96    6178.39   77698.56
    Latency        5.75ms     4.24ms   368.14ms
    HTTP codes:
      1xx - 0, 2xx - 91309, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8691
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8691
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
    Reqs/sec      7086.11    5958.72   67853.62
    Latency        7.03ms     4.05ms   373.81ms
    HTTP codes:
      1xx - 0, 2xx - 89325, 3xx - 0, 4xx - 0, 5xx - 0
      others - 10675
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 10675
    Throughput:     1.82MB/s
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
    Reqs/sec     24393.45    7972.18   37424.42
    Latency        2.05ms     2.03ms   180.95ms
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
    Reqs/sec     21040.73    5843.46   30540.98
    Latency        2.37ms     1.94ms   177.19ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.76MB/s
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
    Reqs/sec     64087.50    3769.10   68376.68
    Latency      777.81us    68.18us     4.71ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.10MB/s
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
    Reqs/sec     18899.01    8790.13   82577.74
    Latency        2.64ms     2.41ms   209.27ms
    HTTP codes:
      1xx - 0, 2xx - 92312, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7688
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7688
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
    Reqs/sec     26984.45    9451.89   82533.40
    Latency        1.85ms     1.94ms   166.49ms
    HTTP codes:
      1xx - 0, 2xx - 96153, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3847
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3847
    Throughput:     5.93MB/s
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
    Reqs/sec     77342.47    3878.49   87259.80
    Latency      642.47us   298.77us    20.00ms
    HTTP codes:
      1xx - 0, 2xx - 96062, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3938
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3938
    Throughput:    11.76MB/s
  ```


