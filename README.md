# Ship My App — Static Landing Page

Single-page, mobile-first landing site for the "Ship My App" productized service. Built with Vite + React + TypeScript + Tailwind CSS v4.

## Prerequisites

- Node.js 20+
- pnpm

## Getting started

```bash
pnpm install
```

### Environment variables

Copy the example file and fill in your EmailJS credentials:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

See [EmailJS docs](https://www.emailjs.com/docs/tutorial/overview/) to set up your account, email service, and template.

### Configuration

Edit `src/config.ts` to set your brand name, contact links (LinkedIn, WhatsApp, Telegram), and other site-wide settings.

## Development

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

Produces a static site in `dist/` — no server dependency.

## Preview production build

```bash
pnpm preview
```

## Deploy to GitHub Pages

### Option A: Manual

1. Run `pnpm build`
2. Push the `dist/` folder contents to a `gh-pages` branch
3. In your repo settings, set GitHub Pages source to the `gh-pages` branch

### Option B: GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4.2.2
      - uses: pnpm/action-setup@v4.1.0
      - uses: actions/setup-node@v4.4.0
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
        env:
          VITE_EMAILJS_SERVICE_ID: ${{ secrets.VITE_EMAILJS_SERVICE_ID }}
          VITE_EMAILJS_TEMPLATE_ID: ${{ secrets.VITE_EMAILJS_TEMPLATE_ID }}
          VITE_EMAILJS_PUBLIC_KEY: ${{ secrets.VITE_EMAILJS_PUBLIC_KEY }}
      - uses: actions/upload-pages-artifact@v3.0.1
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4.0.5
```

Add the `VITE_EMAILJS_*` values as repository secrets.
