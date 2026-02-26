---
title: "Five things your vibe-coded app isn't ready for"
description: "Vibe coding gets you to v1. These are the things it skips."
date: "2026-02-24"
---

# Five things your vibe-coded app isn't ready for

_Vibe coding gets you to v1. These are the things it skips._

---

## No rate limiting

Without throttling, any public endpoint — login, signup, contact forms, API routes — can be hammered by a malicious actor. Credential stuffing, brute-force attacks, and bill-inflating abuse all become trivial.

### How to fix it

Add rate limiting at the edge (Cloudflare, Vercel or a reverse proxy) or in your app middleware.

Start with auth endpoints: cap login attempts per IP to something reasonable (e.g., 10/minute). For APIs, enforce per-user request quotas and return `429 Too Many Requests` with a `Retry-After` header.

---

## No environment separation

Dev and prod share the same database, the same API keys, and the same config. A careless migration wipes real user data. A debug flag left on leaks stack traces. There's no safe place to test anything.

### How to fix it

Maintain at least two environments: a non-production environment for testing and a production environment for real users.

Each gets its own database, its own secrets, and its own deploy pipeline. Ideally, non-prod should be as close to production as possible. Deploys must go through lower, non-prod environments before getting to prod.

Use environment variables (never hardcoded values) to switch between them, and make it impossible to accidentally point a local dev setup at the production database.

---

_I write about the unglamorous stuff that keeps apps running in production. Subscribe if you want fewer 3am incidents._

---

## No rollback strategy

When a deploy breaks something, the only option is to frantically push a fix forward. There's no way to revert to the last known-good state, and every minute of downtime is spent debugging under pressure.

### App changes

Use immutable, versioned deployments (most platforms like Vercel, Netlify and Railway support this out of the box). Know how to revert to a previous deployment in under a minute. Practice it before you need it. Maintain a playbook for when something goes wrong.

### Database changes

Make migrations backward-compatible. Use an expand/contract pattern:

1. Add the new column first. DON'T remove the old one just yet
2. Deploy code that writes to both old and new
3. Migrate existing data
4. Remove the old column in a later deploy

Never make a schema change that can't coexist with the previous version of your code. Test in non-production environments before deploying to production (see _No environment separation_ above).

---

## No input validation at boundaries

Data from users, webhooks, and third-party APIs is trusted implicitly. `req.body.email` goes straight into a query. A malformed payload crashes the server. An unexpected type silently corrupts data.

### How to fix it

Validate every external input at the point it enters your system — API route handlers, webhook receivers, form submissions.

Use a schema validation library (Zod, Ajv) to define the expected shape and reject anything that doesn't match. Return clear error messages to the caller and log the rejected payload for debugging.

---

## Secrets in client-side code

API keys, database URLs, and service credentials get embedded in frontend bundles where anyone can extract them from the browser's network tab or source maps. `NEXT_PUBLIC_`, `VITE_`, and similar prefixes make this dangerously easy to do by accident.

### How to fix it

Audit every environment variable that's exposed to the client. If a secret grants write access, billing access, or access to user data, it MUST NOT be in the browser.

Move those calls to a server-side route or an edge function that proxies the request (Cloudflare, Vercel, etc.). The client calls your backend; your backend calls the third-party service with the secret.

---

## Need help?

I'm Luke, a full-stack software engineer with 10+ years of experience shipping and operating web apps. I'm obsessive about the boring production stuff — auth edge cases, migrations, env/secrets, observability, and making sure there's a runbook when something breaks.

Want help fixing this stuff, or got an app that's almost there? [Let's talk](https://shipmyapp.dev/).
