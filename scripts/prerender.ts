import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const distDir = resolve(import.meta.dirname, '..', 'dist')

const { render } = await import(
  pathToFileURL(resolve(distDir, 'server', 'entry-server.js')).href
) as { render: () => string }

const indexPath = resolve(distDir, 'index.html')
const html = readFileSync(indexPath, 'utf-8')
const appHtml = render()

const result = html.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`,
)

writeFileSync(indexPath, result)
console.log('Pre-rendered dist/index.html')
