import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { gzipSync } from 'node:zlib'

const root = resolve('.output/public')
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.txt': 'text/plain; charset=utf-8', '.wasm': 'application/wasm' }
createServer(async (req, res) => {
  try {
    let file = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname))
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403).end(); return }
    try {
      if ((await stat(file)).isDirectory()) {
        try { await stat(file + '.html'); file += '.html' }
        catch { file = resolve(file, 'index.html') }
      }
    } catch { file += '.html' }
    res.setHeader('Content-Type', file.includes(`${sep}_ipx${sep}f_webp`) ? 'image/webp' : types[extname(file)] || 'application/octet-stream')
    const body = await readFile(file)
    // Match the compression that Netlify applies to text assets in production.
    if (/\.(html|js|css|json|svg|txt|wasm)$/.test(file) && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
      res.setHeader('Content-Encoding', 'gzip')
      res.setHeader('Vary', 'Accept-Encoding')
      res.end(gzipSync(body))
    } else res.end(body)
  } catch {
    try {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(await readFile(resolve(root, '404.html')))
    } catch { res.end('Halaman tidak ditemukan') }
  }
}).listen(4173, '127.0.0.1', () => console.log('Static preview: http://127.0.0.1:4173'))
