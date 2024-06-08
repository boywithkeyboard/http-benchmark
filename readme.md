## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `75547` | `4319` | `81073` |
| **84%** | [Hyper Express](#hyper-express) | `63526` | `4664` | `66504` |
| **35%** | [Node (Default)](#node-default) | `26242` | `8699` | `80703` |
| **31%** | [Fastify](#fastify) | `23744` | `7648` | `35651` |
| **26%** | [Hono](#hono) | `19868` | `5673` | `30641` |
| **24%** | [Koa](#koa) | `18321` | `8042` | `71214` |
| **11%** | [Carbon](#carbon) | `8051` | `1324` | `10314` |
| **9%** | [Express](#express) | `6600` | `1044` | `8458` |


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
    Reqs/sec      9337.47    8076.53   85159.38
    Latency        5.34ms     4.14ms   357.74ms
    HTTP codes:
      1xx - 0, 2xx - 87932, 3xx - 0, 4xx - 0, 5xx - 0
      others - 12068
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 12068
    Throughput:     1.87MB/s
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
    Reqs/sec      7162.75    5463.19   66369.55
    Latency        6.97ms     3.85ms   352.49ms
    HTTP codes:
      1xx - 0, 2xx - 91054, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8946
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8946
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
    Reqs/sec     24915.80    7968.37   36473.34
    Latency        2.00ms     2.04ms   181.70ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.66MB/s
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
    Reqs/sec     21374.90    6401.06   29982.11
    Latency        2.34ms     1.99ms   181.25ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.83MB/s
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
    Reqs/sec     63546.45    3329.02   68020.89
    Latency      784.44us    61.75us     2.85ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.03MB/s
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
    Reqs/sec     18431.12    8525.84   79085.47
    Latency        2.71ms     2.33ms   205.25ms
    HTTP codes:
      1xx - 0, 2xx - 92130, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7870
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7870
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
    Reqs/sec     26324.18    8052.10   56497.92
    Latency        1.89ms     1.91ms   165.09ms
    HTTP codes:
      1xx - 0, 2xx - 97781, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2219
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2219
    Throughput:     5.90MB/s
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
    Reqs/sec     76950.79    4343.54   90822.31
    Latency      647.99us   198.72us    10.46ms
    HTTP codes:
      1xx - 0, 2xx - 96580, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3420
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3420
    Throughput:    11.74MB/s
  ```


