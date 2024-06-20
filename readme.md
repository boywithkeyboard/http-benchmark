## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `76532` | `3608` | `83088` |
| **85%** | [Hyper Express](#hyper-express) | `65093` | `3268` | `70603` |
| **36%** | [Node (Default)](#node-default) | `27349` | `9319` | `84085` |
| **30%** | [Fastify](#fastify) | `23098` | `6344` | `35687` |
| **28%** | [Hono](#hono) | `21367` | `6249` | `31060` |
| **24%** | [Koa](#koa) | `18717` | `7129` | `65037` |
| **11%** | [Carbon](#carbon) | `8165` | `1402` | `10311` |
| **9%** | [Express](#express) | `6636` | `1089` | `8521` |


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
    Reqs/sec      8877.28    7519.11   90205.10
    Latency        5.62ms     4.10ms   352.11ms
    HTTP codes:
      1xx - 0, 2xx - 88888, 3xx - 0, 4xx - 0, 5xx - 0
      others - 11112
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 11112
    Throughput:     1.79MB/s
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
    Reqs/sec      7092.94    5500.42   67263.44
    Latency        7.04ms     3.73ms   340.68ms
    HTTP codes:
      1xx - 0, 2xx - 90993, 3xx - 0, 4xx - 0, 5xx - 0
      others - 9007
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 9007
    Throughput:     1.85MB/s
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
    Reqs/sec     24778.39    7680.72   36341.32
    Latency        2.02ms     1.92ms   172.54ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     5.62MB/s
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
    Reqs/sec     21811.21    6147.62   30338.30
    Latency        2.29ms     1.92ms   173.46ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.93MB/s
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
    Reqs/sec     65596.03    3795.48   68309.57
    Latency      760.17us    60.67us     2.95ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.31MB/s
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
    Reqs/sec     19077.22    8748.78   80815.10
    Latency        2.61ms     2.26ms   195.49ms
    HTTP codes:
      1xx - 0, 2xx - 91246, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8754
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8754
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
    Reqs/sec     27557.03    9192.96   82035.66
    Latency        1.81ms     1.91ms   160.35ms
    HTTP codes:
      1xx - 0, 2xx - 96755, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3245
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3245
    Throughput:     6.11MB/s
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
    Reqs/sec     75162.49    4440.45   87093.55
    Latency      661.19us   214.86us    20.07ms
    HTTP codes:
      1xx - 0, 2xx - 96519, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3481
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3481
    Throughput:    11.49MB/s
  ```


