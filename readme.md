## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76785` | `5451` | `85208` |
| **85%** | [Hyper Express](#hyper-express) | `65427` | `3436` | `69068` |
| **35%** | [Node (Default)](#node-default) | `27087` | `9643` | `89183` |
| **31%** | [Fastify](#fastify) | `23950` | `7266` | `37132` |
| **28%** | [Hono](#hono) | `21803` | `6315` | `29882` |
| **25%** | [Koa](#koa) | `19142` | `10192` | `89950` |
| **10%** | [Carbon](#carbon) | `7901` | `1318` | `10147` |
| **9%** | [Express](#express) | `6676` | `1085` | `8617` |


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
    Reqs/sec      8321.38    5679.29   78657.45
    Latency        6.00ms     4.30ms   375.16ms
    HTTP codes:
      1xx - 0, 2xx - 92501, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7499
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7499
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
    Reqs/sec      6659.26    1085.66    8658.34
    Latency        7.51ms     3.61ms   344.39ms
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
    Reqs/sec     23501.75    7367.37   36960.14
    Latency        2.13ms     1.95ms   178.39ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.32MB/s
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
    Reqs/sec     21044.50    6196.26   30652.07
    Latency        2.37ms     1.99ms   178.36ms
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
    Reqs/sec     66938.88    3398.71   80422.05
    Latency      744.79us    61.32us     3.49ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.51MB/s
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
    Reqs/sec     18837.43    8372.07   77883.02
    Latency        2.64ms     2.37ms   207.04ms
    HTTP codes:
      1xx - 0, 2xx - 92029, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7971
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7971
    Throughput:     3.92MB/s
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
    Reqs/sec     26007.77    8365.77   81647.80
    Latency        1.92ms     1.84ms   156.53ms
    HTTP codes:
      1xx - 0, 2xx - 96637, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3363
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3363
    Throughput:     5.76MB/s
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
    Reqs/sec     77028.03    4042.95   87048.79
    Latency      646.95us   221.55us    12.81ms
    HTTP codes:
      1xx - 0, 2xx - 97431, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2569
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2569
    Throughput:    11.88MB/s
  ```


