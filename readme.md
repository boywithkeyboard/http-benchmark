## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `77030` | `3301` | `87713` |
| **85%** | [Hyper Express](#hyper-express) | `65729` | `4505` | `81894` |
| **33%** | [Node (Default)](#node-default) | `25596` | `8930` | `96345` |
| **31%** | [Fastify](#fastify) | `24115` | `7429` | `36370` |
| **27%** | [Hono](#hono) | `21166` | `6063` | `30007` |
| **23%** | [Koa](#koa) | `17945` | `6077` | `52497` |
| **11%** | [Carbon](#carbon) | `8215` | `1422` | `10379` |
| **8%** | [Express](#express) | `6461` | `1022` | `8474` |


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
    Reqs/sec      8644.85    6059.47   81137.93
    Latency        5.75ms     4.17ms   362.75ms
    HTTP codes:
      1xx - 0, 2xx - 91336, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8664
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8664
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
    Reqs/sec      6586.80    1017.54    8569.49
    Latency        7.59ms     3.50ms   337.21ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     1.88MB/s
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
    Reqs/sec     24368.84    7390.88   36761.35
    Latency        2.05ms     1.95ms   175.41ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.53MB/s
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
    Reqs/sec     21121.33    5644.26   30230.37
    Latency        2.37ms     1.82ms   166.93ms
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
    Reqs/sec     65102.94    4137.12   70818.38
    Latency      765.70us    68.49us     3.33ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.25MB/s
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
    Reqs/sec     18606.36    8850.34   79322.07
    Latency        2.68ms     2.33ms   202.24ms
    HTTP codes:
      1xx - 0, 2xx - 90989, 3xx - 0, 4xx - 0, 5xx - 0
      others - 9011
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 9011
    Throughput:     3.83MB/s
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
    Reqs/sec     26479.55    8540.71   81789.58
    Latency        1.88ms     1.87ms   160.41ms
    HTTP codes:
      1xx - 0, 2xx - 96666, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3334
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3334
    Throughput:     5.86MB/s
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
    Reqs/sec     76145.60    5045.91   88279.39
    Latency      654.31us   242.56us    15.22ms
    HTTP codes:
      1xx - 0, 2xx - 96542, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3458
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3458
    Throughput:    11.62MB/s
  ```


