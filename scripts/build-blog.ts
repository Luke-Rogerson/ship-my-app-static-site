import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { resolve, basename } from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

interface PostMeta {
  title: string
  description: string
  date: string
  slug: string
}

const rootDir = resolve(import.meta.dirname, '..')
const blogDir = resolve(rootDir, 'blog')
const distDir = resolve(rootDir, 'dist')

function hrefFromHere(href: string, depth: number): string {
  const cleaned = href.replace(/^(\.\/)+/, '').replace(/^\//, '')
  return `${'../'.repeat(depth)}${cleaned}`
}

function getBuiltAssetHrefs(): { cssHref: string; iconHref: string } {
  const indexHtml = readFileSync(resolve(distDir, 'index.html'), 'utf-8')

  const cssMatch = indexHtml.match(
    /<link[^>]+rel="stylesheet"[^>]+href="([^"]+\.css)"/i,
  )
  if (!cssMatch) {
    throw new Error('Could not find stylesheet link in dist/index.html')
  }

  const iconMatch = indexHtml.match(
    /<link[^>]+rel="icon"[^>]+href="([^"]+)"/i,
  )

  return {
    cssHref: cssMatch[1],
    iconHref: iconMatch?.[1] ?? 'favicon.svg',
  }
}

function darkModeScript(): string {
  return `<script>(function(){var s=localStorage.getItem("theme");if(s==="light"||(!s&&!window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.remove("dark")}})()</script>`
}

const BRAND = 'Ship My App'
const CONTACTS = {
  linkedin: 'https://www.linkedin.com/in/lukerogerson/',
  telegram: 'https://t.me/lukerogerson',
} as const

const builtAssets = getBuiltAssetHrefs()

function renderPageShell(options: {
  depth: number
  title: string
  description: string
  ogType: 'website' | 'article'
  ogUrl: string
  headerRight: { label: string; hrefFromHere: string }
  mainHtml: string
}): string {
  const cssHref = hrefFromHere(builtAssets.cssHref, options.depth)
  const iconHref = hrefFromHere(builtAssets.iconHref, options.depth)
  const homeHref = '../'.repeat(options.depth) || './'

  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${options.title}</title>
  <meta name="description" content="${options.description}" />
  <meta name="robots" content="index, follow" />
  <meta property="og:type" content="${options.ogType}" />
  <meta property="og:title" content="${options.title}" />
  <meta property="og:description" content="${options.description}" />
  <meta property="og:url" content="${options.ogUrl}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${options.title}" />
  <meta name="twitter:description" content="${options.description}" />
  <link rel="icon" type="image/svg+xml" href="${iconHref}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${cssHref}" />
  ${darkModeScript()}
</head>
<body class="min-h-screen bg-white text-gray-900 dark:bg-void-950 dark:text-gray-100">
  <header class="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl dark:border-neon-cyan/10 dark:bg-void-950/80">
    <div class="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
      <a href="${homeHref}" class="font-mono text-lg font-bold tracking-tight text-gray-900 dark:text-neon-cyan">&gt; ${BRAND}</a>
      <a href="${options.headerRight.hrefFromHere}" class="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-neon-cyan">${options.headerRight.label}</a>
    </div>
  </header>
  ${options.mainHtml}
  <footer class="border-t border-gray-200 bg-white px-4 py-8 sm:px-6 dark:border-neon-cyan/10 dark:bg-void-950">
    <div class="mx-auto flex max-w-3xl items-center justify-between text-sm text-gray-500">
      <p class="font-mono text-xs">&gt; ${BRAND}</p>
      <nav class="flex gap-4">
        <a href="${CONTACTS.linkedin}" target="_blank" rel="noopener noreferrer" class="transition-colors hover:text-gray-900 dark:hover:text-neon-cyan">LinkedIn</a>
        <a href="${CONTACTS.telegram}" target="_blank" rel="noopener noreferrer" class="transition-colors hover:text-gray-900 dark:hover:text-neon-cyan">Telegram</a>
      </nav>
    </div>
  </footer>
</body>
</html>`
}

function postPage(meta: PostMeta, contentHtml: string): string {
  return renderPageShell({
    depth: 2,
    title: `${meta.title} — ${BRAND}`,
    description: meta.description,
    ogType: 'article',
    ogUrl: `https://shipmyapp.dev/blog/${meta.slug}/`,
    headerRight: { label: 'All posts', hrefFromHere: '../' },
    mainHtml: `  <main class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
    <article class="prose prose-gray dark:prose-invert prose-headings:font-bold prose-a:text-brand-600 dark:prose-a:text-neon-cyan max-w-none">
      ${contentHtml}
    </article>
  </main>`,
  })
}

function listingPage(posts: PostMeta[]): string {
  const postCards = posts
    .map(
      (p) => `
    <a href="./${p.slug}/" class="block rounded-lg border border-gray-200 p-6 transition-colors hover:border-brand-600 dark:border-void-600 dark:hover:border-neon-cyan/40">
      <time datetime="${p.date}" class="text-xs font-medium text-gray-500 dark:text-gray-500">${formatDate(p.date)}</time>
      <h2 class="mt-1 text-lg font-bold text-gray-900 dark:text-white">${p.title}</h2>
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">${p.description}</p>
    </a>`,
    )
    .join('\n')

  const description =
    'Articles about shipping vibe-coded and AI-assisted apps to production.'

  return renderPageShell({
    depth: 1,
    title: `Blog — ${BRAND}`,
    description,
    ogType: 'website',
    ogUrl: 'https://shipmyapp.dev/blog/',
    headerRight: { label: 'Home', hrefFromHere: '../' },
    mainHtml: `  <main class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
    <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Blog</h1>
    <p class="mt-2 text-gray-600 dark:text-gray-400">${description}</p>
    <div class="mt-8 flex flex-col gap-4">
      ${postCards}
    </div>
  </main>`,
  })
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const files = readdirSync(blogDir).filter((f) => f.endsWith('.md'))

const posts: PostMeta[] = []

for (const file of files) {
  const raw = readFileSync(resolve(blogDir, file), 'utf-8')
  const { data, content } = matter(raw)
  const slug = basename(file, '.md')
  const meta: PostMeta = {
    title: data.title ?? slug,
    description: data.description ?? '',
    date: data.date ?? '1970-01-01',
    slug,
  }

  const contentHtml = marked(content) as string
  const html = postPage(meta, contentHtml)

  const postDir = resolve(distDir, 'blog', slug)
  mkdirSync(postDir, { recursive: true })
  writeFileSync(resolve(postDir, 'index.html'), html)
  console.log(`Generated blog/${slug}/index.html`)

  posts.push(meta)
}

posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const blogIndexDir = resolve(distDir, 'blog')
mkdirSync(blogIndexDir, { recursive: true })
writeFileSync(resolve(blogIndexDir, 'index.html'), listingPage(posts))
console.log('Generated blog/index.html')
