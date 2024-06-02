## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `74797` | `3835` | `88000` |
| **85%** | [Hyper Express](#hyper-express) | `63876` | `3551` | `69987` |
| **34%** | [Node (Default)](#node-default) | `25767` | `8406` | `82769` |
| **32%** | [Fastify](#fastify) | `23579` | `6746` | `36296` |
| **27%** | [Hono](#hono) | `20349` | `5164` | `29685` |
| **25%** | [Koa](#koa) | `18555` | `8431` | `69493` |
| **11%** | [Carbon](#carbon) | `7962` | `1301` | `10218` |
| **9%** | [Express](#express) | `6582` | `1059` | `8484` |


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
    Reqs/sec      8734.41    6236.25   85367.91
    Latency        5.72ms     4.14ms   361.62ms
    HTTP codes:
      1xx - 0, 2xx - 91515, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8485
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8485
    Throughput:     1.81MB/s
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
    Reqs/sec      6659.85    1076.89    8518.39
    Latency        7.51ms     3.41ms   328.90ms
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
    Reqs/sec     23758.10    7243.34   36332.02
    Latency        2.10ms     2.01ms   181.63ms
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
    Reqs/sec     20598.87    5547.88   29889.19
    Latency        2.43ms     1.93ms   176.64ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.65MB/s
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
    Reqs/sec     63585.42    3979.50   75826.77
    Latency      784.02us    66.70us     4.02ms
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
    Reqs/sec     18532.51    8575.52   84396.77
    Latency        2.69ms     2.42ms   213.14ms
    HTTP codes:
      1xx - 0, 2xx - 92186, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7814
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7814
    Throughput:     3.87MB/s
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
    Reqs/sec     25621.94    8248.97   80785.92
    Latency        1.94ms     1.86ms   156.57ms
    HTTP codes:
      1xx - 0, 2xx - 96661, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3339
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3339
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
    Reqs/sec     74771.70    3182.70   77200.61
    Latency      665.46us   219.24us    11.83ms
    HTTP codes:
      1xx - 0, 2xx - 96745, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3255
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3255
    Throughput:    11.45MB/s
  ```


