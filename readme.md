## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `77820` | `3354` | `82118` |
| **84%** | [Hyper Express](#hyper-express) | `65009` | `2968` | `74639` |
| **35%** | [Node (Default)](#node-default) | `27001` | `9716` | `83785` |
| **30%** | [Fastify](#fastify) | `23301` | `7022` | `36330` |
| **28%** | [Hono](#hono) | `21498` | `6487` | `30632` |
| **25%** | [Koa](#koa) | `19088` | `11059` | `84740` |
| **10%** | [Carbon](#carbon) | `7778` | `1321` | `9997` |
| **8%** | [Express](#express) | `6563` | `1063` | `8612` |


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
    Reqs/sec      8522.98    6203.64   79791.42
    Latency        5.85ms     4.20ms   370.12ms
    HTTP codes:
      1xx - 0, 2xx - 91446, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8554
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8554
    Throughput:     1.77MB/s
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
    Reqs/sec      6624.86    1131.80    8615.47
    Latency        7.55ms     3.57ms   341.81ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     1.89MB/s
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
    Reqs/sec     22997.37    6918.47   36966.49
    Latency        2.17ms     1.92ms   171.76ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.22MB/s
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
    Reqs/sec     20662.72    5683.43   30334.06
    Latency        2.42ms     2.00ms   178.78ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.67MB/s
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
    Reqs/sec     65040.87    2310.36   68897.20
    Latency      766.36us    60.60us     2.81ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.24MB/s
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
    Reqs/sec     17928.57    8760.39   81915.93
    Latency        2.78ms     2.30ms   205.21ms
    HTTP codes:
      1xx - 0, 2xx - 91266, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8734
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8734
    Throughput:     3.70MB/s
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
    Reqs/sec     26506.60    8866.66   88827.24
    Latency        1.88ms     1.78ms   153.41ms
    HTTP codes:
      1xx - 0, 2xx - 96114, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3886
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3885
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 1
    Throughput:     5.84MB/s
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
    Reqs/sec     78086.61    4301.17   91333.27
    Latency      638.59us   207.33us    12.90ms
    HTTP codes:
      1xx - 0, 2xx - 96533, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3467
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3463
      dial tcp 127.0.0.1:3000: connect: connection reset by peer - 4
    Throughput:    11.90MB/s
  ```


