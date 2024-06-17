## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76169` | `4904` | `99257` |
| **84%** | [Hyper Express](#hyper-express) | `64284` | `3625` | `70567` |
| **33%** | [Node (Default)](#node-default) | `24867` | `8421` | `74573` |
| **32%** | [Fastify](#fastify) | `24069` | `7336` | `36297` |
| **28%** | [Hono](#hono) | `21706` | `6194` | `30526` |
| **26%** | [Koa](#koa) | `19511` | `9100` | `77317` |
| **11%** | [Carbon](#carbon) | `8073` | `1370` | `10312` |
| **8%** | [Express](#express) | `6423` | `1035` | `8437` |


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
    Reqs/sec      8665.84    4996.91   62351.12
    Latency        5.76ms     4.28ms   365.77ms
    HTTP codes:
      1xx - 0, 2xx - 92271, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7729
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7729
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
    Reqs/sec      6342.61     991.16    8550.50
    Latency        7.88ms     3.62ms   347.93ms
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
    Reqs/sec     23676.13    6749.74   35858.49
    Latency        2.11ms     1.90ms   172.28ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.36MB/s
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
    Reqs/sec     21409.47    5859.91   29666.52
    Latency        2.33ms     1.99ms   177.56ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.84MB/s
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
    Reqs/sec     64880.11    3992.76   72758.60
    Latency      769.53us    67.79us     3.63ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.21MB/s
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
    Reqs/sec     18612.11    9305.26   79749.84
    Latency        2.67ms     2.39ms   214.54ms
    HTTP codes:
      1xx - 0, 2xx - 90287, 3xx - 0, 4xx - 0, 5xx - 0
      others - 9713
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 9713
    Throughput:     3.81MB/s
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
    Reqs/sec     25304.68    8220.35   76948.14
    Latency        1.97ms     1.90ms   165.46ms
    HTTP codes:
      1xx - 0, 2xx - 96730, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3270
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3270
    Throughput:     5.60MB/s
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
    Reqs/sec     75505.88    2789.19   82638.94
    Latency      659.15us   252.99us    14.57ms
    HTTP codes:
      1xx - 0, 2xx - 94799, 3xx - 0, 4xx - 0, 5xx - 0
      others - 5201
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 5201
    Throughput:    11.33MB/s
  ```


