## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76886` | `4253` | `106743` |
| **84%** | [Hyper Express](#hyper-express) | `64934` | `3455` | `67830` |
| **34%** | [Node (Default)](#node-default) | `26038` | `8661` | `64625` |
| **31%** | [Fastify](#fastify) | `23575` | `6843` | `36697` |
| **27%** | [Hono](#hono) | `20424` | `5437` | `30123` |
| **25%** | [Koa](#koa) | `19095` | `8153` | `71348` |
| **11%** | [Carbon](#carbon) | `8167` | `1407` | `10423` |
| **9%** | [Express](#express) | `6570` | `1033` | `8455` |


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
    Reqs/sec      8754.91    5616.43   78712.98
    Latency        5.70ms     4.07ms   355.33ms
    HTTP codes:
      1xx - 0, 2xx - 92772, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7228
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7228
    Throughput:     1.84MB/s
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
    Reqs/sec      6590.48    1028.01    8532.41
    Latency        7.58ms     3.42ms   330.47ms
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
    Reqs/sec     24303.84    7158.10   36225.96
    Latency        2.05ms     1.94ms   172.85ms
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
    Reqs/sec     21426.56    5856.23   30603.63
    Latency        2.33ms     1.82ms   167.06ms
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
    Reqs/sec     65102.72    3768.47   72481.47
    Latency      765.77us   117.91us     5.74ms
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
    Reqs/sec     19131.12    8365.29   82706.36
    Latency        2.61ms     2.22ms   196.02ms
    HTTP codes:
      1xx - 0, 2xx - 92741, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7259
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7259
    Throughput:     4.02MB/s
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
    Reqs/sec     26079.68    8481.35   78897.46
    Latency        1.91ms     1.94ms   167.47ms
    HTTP codes:
      1xx - 0, 2xx - 96676, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3324
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3324
    Throughput:     5.78MB/s
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
    Reqs/sec     75985.54    4152.72   83961.93
    Latency      655.66us   223.12us    24.87ms
    HTTP codes:
      1xx - 0, 2xx - 96892, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3108
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3108
    Throughput:    11.64MB/s
  ```


