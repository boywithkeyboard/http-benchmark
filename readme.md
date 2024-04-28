## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `77502` | `3116` | `85684` |
| **85%** | [Hyper Express](#hyper-express) | `66120` | `4138` | `70364` |
| **35%** | [Node (Default)](#node-default) | `27460` | `9811` | `84873` |
| **31%** | [Fastify](#fastify) | `24352` | `7285` | `36833` |
| **27%** | [Hono](#hono) | `21247` | `5598` | `30308` |
| **24%** | [Koa](#koa) | `18811` | `8898` | `81776` |
| **10%** | [Carbon](#carbon) | `7842` | `1304` | `10399` |
| **8%** | [Express](#express) | `6520` | `1027` | `8509` |


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
    Reqs/sec      8574.18    7035.85   86561.93
    Latency        5.81ms     4.22ms   367.09ms
    HTTP codes:
      1xx - 0, 2xx - 89775, 3xx - 0, 4xx - 0, 5xx - 0
      others - 10225
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 10225
    Throughput:     1.75MB/s
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
    Reqs/sec      6629.84    1128.72    8713.81
    Latency        7.54ms     3.59ms   342.53ms
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
    Reqs/sec     23768.39    7066.00   36495.71
    Latency        2.10ms     1.94ms   174.20ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.39MB/s
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
    Reqs/sec     21113.71    6042.56   30666.27
    Latency        2.37ms     2.03ms   183.88ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.77MB/s
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
    Reqs/sec     66136.35    4454.84   72870.76
    Latency      753.67us    68.43us     3.28ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.40MB/s
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
    Reqs/sec     17947.27    7793.03   67677.39
    Latency        2.78ms     2.29ms   202.34ms
    HTTP codes:
      1xx - 0, 2xx - 92915, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7085
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7085
    Throughput:     3.77MB/s
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
    Reqs/sec     26271.43    8852.58   75446.71
    Latency        1.90ms     1.90ms   168.89ms
    HTTP codes:
      1xx - 0, 2xx - 96984, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3016
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3014
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 2
    Throughput:     5.83MB/s
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
    Reqs/sec     78178.64    5074.41   99389.71
    Latency      636.76us   227.99us    13.17ms
    HTTP codes:
      1xx - 0, 2xx - 96690, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3310
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3310
    Throughput:    11.96MB/s
  ```


