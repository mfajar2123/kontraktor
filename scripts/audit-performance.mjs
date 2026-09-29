import { spawn } from 'node:child_process'
import { mkdir, readFile } from 'node:fs/promises'

await mkdir('artifacts', { recursive: true })
for (const route of process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/karir', '/kontak']) {
  const name = route.replace(/\//g, '-') || 'home'
  const output = `artifacts/lighthouse-${name}.json`
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['node_modules/lighthouse/cli/index.js', `http://127.0.0.1:4173${route}`,
      '--only-categories=performance', '--output=json', `--output-path=${output}`, '--chrome-flags=--headless=new', '--quiet'], { stdio: 'inherit' })
    child.on('error', reject)
    child.on('exit', code => code === 0 ? resolve() : reject(new Error(`Lighthouse exited with ${code}`)))
  })
  const report = JSON.parse(await readFile(output, 'utf8'))
  console.log(JSON.stringify({ route, score: Math.round(report.categories.performance.score * 100),
    FCP: report.audits['first-contentful-paint'].displayValue, LCP: report.audits['largest-contentful-paint'].displayValue,
    TBT: report.audits['total-blocking-time'].displayValue, CLS: report.audits['cumulative-layout-shift'].displayValue,
    bytes: report.audits['total-byte-weight'].numericValue, warnings: report.runWarnings, report: output }))
}
