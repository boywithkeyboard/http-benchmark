import indentString from 'https://esm.sh/indent-string@5.0.0'

const meta = JSON.parse(
  Deno.readTextFileSync('./meta.json')
)

async function benchJson(file) {
  const process = new Deno.Command('node', {
    args: ['frameworks/' + file]
  }).spawn()

  let isUp

  while(!isUp) {
    try {
      const res = await fetch('http://127.0.0.1:3000')

      await res.body?.cancel()

      isUp = res.ok
    } catch (err) {}
  }

  const result = new Deno.Command('bombardier', {
    args: ['-n', '100000', '-c', '50', '-p', 'r', '-o', 'j', 'http://127.0.0.1:3000']
  }).outputSync()

  process.kill()

  return JSON.parse(
    new TextDecoder().decode(result.stdout)
  )
}

async function benchStr(file) {
  const process = new Deno.Command('node', {
    args: ['frameworks/' + file]
  }).spawn()

  let isUp

  while(!isUp) {
    try {
      const res = await fetch('http://127.0.0.1:3000')

      await res.body?.cancel()

      isUp = res.ok
    } catch (err) {}
  }

  const result = new Deno.Command('bombardier', {
    args: ['-n', '100000', '-c', '50', '-p', 'r', '-o', 'pt', 'http://127.0.0.1:3000']
  }).outputSync()

  process.kill()

  return new TextDecoder().decode(result.stdout)
}

async function run() {
  let readme = Deno.readTextFileSync('./readme_template.md')

  // summary

  console.log('Creating "Summary"...')

  let summary = '| RELATIVE | FRAMEWORK | AVG | STDDEV | MAX |\n'

  summary += '| :--- | :--- | :--- | :--- | :--- |\n'

  let results = []

  for (const [name, data] of Object.entries(meta)) {
    console.log(`Benchmarking ${name}...`)

    const { result } = await benchJson(data.file)

    results.push([name, data, result])
  }

  results = results.sort((a, b) => {
    if (a[2].rps.mean < b[2].rps.mean) {
      return -1
    } else if (a[2].rps.mean > b[2].rps.mean) {
      return 1
    }
  
    return 0
  }).reverse()

  for (const [name, _, result] of results) {
    summary += `| **${Math.round((result.rps.mean / results[0][2].rps.mean) * 100)}%** | [${name}](#${name.toLowerCase().replaceAll(' ', '-').replaceAll('(', '').replaceAll(')', '')}) | \`${Math.round(result.rps.mean)}\` | \`${Math.round(result.rps.stddev)}\` | \`${Math.round(result.rps.max)}\` |\n`
  }

  readme = readme.replace('<!-- summary -->', summary)

  // in detail

  console.log('Creating "In Detail"...')

  let inDetail = ''

  for (const [name, data] of Object.entries(meta)) {
    console.log(`Benchmarking ${name}...`)

    const result = await benchStr(data.file)

    inDetail += `- #### ${name}\n`

    let str = ''

    if (data.npm) {
      str += `[NPM](https://npmjs.com/${data.npm}) | `
    }

    if (data.url.startsWith('https://github.com')) {
      str += `[GitHub](${data.url})\n`
    } else {
      str += `[Website](${data.url})\n`
    }

    str += '```js\n' + Deno.readTextFileSync('./frameworks/' + data.file) + '```\n\n'

    str += '```\n' + result + '```\n\n'

    inDetail += indentString(str, 2)
  }

  readme = readme.replace('<!-- in_detail -->', inDetail)

  Deno.writeTextFileSync('./readme.md', readme)
}

run()
