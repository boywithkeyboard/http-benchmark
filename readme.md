## http-benchmark

This repository compares the performance of some of the most popular web frameworks for Node.js against `node:http` using [bombardier](https://github.com/codesenberg/bombardier).

```bash
bombardier -n 100000 -c 50 -p r http://127.0.0.1:3000
```

### Summary

| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |
| :--- | :--- | :--- | :--- | :--- |
| **100%** | [uWS](#uws) | `77315` | `3614` | `85864` |
| **85%** | [Hyper Express](#hyper-express) | `65478` | `4136` | `75545` |
| **35%** | [Node (Default)](#node-default) | `26868` | `8444` | `59070` |
| **31%** | [Fastify](#fastify) | `23763` | `7068` | `37047` |
| **26%** | [Hono](#hono) | `20410` | `5427` | `30640` |
| **24%** | [Koa](#koa) | `18638` | `8066` | `79367` |
| **10%** | [Carbon](#carbon) | `7829` | `1262` | `9996` |
| **8%** | [Express](#express) | `6526` | `1040` | `8481` |


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
    Reqs/sec      8226.76    5636.18   69908.76
    Latency        6.06ms     4.20ms   367.42ms
    HTTP codes:
      1xx - 0, 2xx - 92274, 3xx - 0, 4xx - 0, 5xx - 0
      others - 7726
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 7726
    Throughput:     1.73MB/s
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
    Reqs/sec      6639.53    1069.91    9023.83
    Latency        7.53ms     3.43ms   331.24ms
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
    Reqs/sec     23410.86    7473.05   36435.03
    Latency        2.13ms     1.97ms   176.68ms
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
    Reqs/sec     20998.94    6033.19   30172.81
    Latency        2.38ms     1.99ms   179.15ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     4.75MB/s
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
    Reqs/sec     65454.92    3704.77   73209.47
    Latency      762.14us    61.59us     3.10ms
    HTTP codes:
      1xx - 0, 2xx - 100000, 3xx - 0, 4xx - 0, 5xx - 0
      others - 0
    Throughput:     9.29MB/s
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
    Reqs/sec     19440.06    9062.23   73961.67
    Latency        2.57ms     2.30ms   212.53ms
    HTTP codes:
      1xx - 0, 2xx - 91362, 3xx - 0, 4xx - 0, 5xx - 0
      others - 8638
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 8638
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
    Reqs/sec     26172.88    8669.97   77689.60
    Latency        1.91ms     1.99ms   166.06ms
    HTTP codes:
      1xx - 0, 2xx - 96764, 3xx - 0, 4xx - 0, 5xx - 0
      others - 3236
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 3236
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
    Reqs/sec     79161.56    4583.15   87382.21
    Latency      630.15us   155.09us     8.41ms
    HTTP codes:
      1xx - 0, 2xx - 97378, 3xx - 0, 4xx - 0, 5xx - 0
      others - 2622
    Errors:
      dial tcp 127.0.0.1:3000: connect: connection refused - 2622
    Throughput:    12.19MB/s
  ```


