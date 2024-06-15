## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `75210` | `3590` | `79311` |
| **87%** | [Hyper Express](#hyper-express) | `65099` | `4536` | `85469` |
| **34%** | [Node (Default)](#node-default) | `25771` | `7989` | `62142` |
| **31%** | [Fastify](#fastify) | `23590` | `6828` | `36107` |
| **27%** | [Hono](#hono) | `20385` | `5740` | `30317` |
| **25%** | [Koa](#koa) | `18611` | `8102` | `73446` |
| **11%** | [Carbon](#carbon) | `8054` | `1305` | `10351` |
| **9%** | [Express](#express) | `6606` | `1087` | `8559` |


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
    Reqs/sec      8835.55    6316.86   76099.26
    Latency        5.64ms     4.26ms   367.07ms
    HTTP codes:
      1xx - 0, 2xx - 91024, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8976
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8976
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
    Reqs/sec      7242.09    6016.07   80531.82
    Latency        6.89ms     3.93ms   355.96ms
    HTTP codes:
      1xx - 0, 2xx - 90154, 3xx - 0, 4xx - 0, 5xx - 0
      others - 9846
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 9846
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
    Reqs/sec     24258.91    7230.13   36964.77
    Latency        2.06ms     2.00ms   180.26ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.50MB/s
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
    Reqs/sec     20867.84    5923.79   31323.25
    Latency        2.39ms     1.97ms   175.29ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.72MB/s
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
    Reqs/sec     65002.01    2871.08   69832.77
    Latency      766.99us    61.57us     2.65ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.23MB/s
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
    Reqs/sec     19164.51    8389.16   82367.70
    Latency        2.60ms     2.21ms   193.84ms
    HTTP codes:
      1xx - 0, 2xx - 92497, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7503
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7503
    Throughput:     4.01MB/s
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
    Reqs/sec     25901.85    7916.91   52650.42
    Latency        1.93ms     1.89ms   163.25ms
    HTTP codes:
      1xx - 0, 2xx - 97828, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2172
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2172
    Throughput:     5.80MB/s
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
    Reqs/sec     76953.93    3939.57   86975.42
    Latency      647.52us   145.50us    10.04ms
    HTTP codes:
      1xx - 0, 2xx - 97390, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2610
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2602
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 8
    Throughput:    11.86MB/s
  ```


