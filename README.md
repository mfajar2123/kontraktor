# Muhamad Fajar Portfolio

Personal portfolio for Muhamad Fajar, a web application developer focused on full stack development and DevOps.

## Technology

- Nuxt 4 and Vue 3
- Nuxt UI 4 and Tailwind CSS 4
- Nuxt Image for responsive WebP images
- Local Lucide icons through Nuxt UI
- Playwright for browser checks and Lighthouse for performance audits

## Pages and Features

| Route | Content |
| --- | --- |
| `/` | Introduction, capabilities, and experience overview |
| `/experience` | Work history and responsibilities |
| `/stack` | Backend, frontend, and DevOps tools |
| `/about` | Profile, education, and certifications |
| `/contact` | Project and hiring inquiries, email copy, WhatsApp, and LinkedIn |
| `/resume` | Resume with print and save-as-PDF support |

The interface uses a dark theme with mint accents, responsive navigation, keyboard focus indicators, and a skip-to-content link. CSS transitions respect reduced-motion preferences. Scrolling uses native browser behavior.

Contact actions open email or messaging applications. The site does not submit inquiries to a backend. The resume uses the browser print dialog to save a PDF.

SEO metadata includes page-specific titles and descriptions, social sharing metadata, and Person structured data. Canonical URLs and absolute social image URLs require a configured production domain.

## Requirements

- Node.js 22.19 or newer in the Node 22 release line, or Node.js 24.11 or newer
- pnpm 10
- Google Chrome for the configured Playwright tests

The Docker build uses Node.js 24.

## Local Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Environment Configuration

Copy `.env.example` to `.env` and set the public production origin:

```dotenv
NUXT_PUBLIC_SITE_URL=https://your-domain.com
```

Replace the example with your actual domain, without a trailing slash. Set this value before generating static files because metadata is included at build time.

## Production

### Static Generation

```bash
pnpm generate
```

Deploy the contents of `.output/public` to a static host. The six portfolio routes are prerendered.

To inspect the generated site locally:

```bash
node scripts/serve.mjs
```

Open `http://127.0.0.1:4173`. This script is a local preview server.

### Node Server

For deployment with server-side rendering:

```bash
pnpm build
node .output/server/index.mjs
```

### Docker

```bash
docker build --build-arg NUXT_PUBLIC_SITE_URL=https://your-domain.com -t portfolio-app .
docker run --rm -p 3000:80 portfolio-app
```

Open `http://localhost:3000`. The multi-stage image generates the static site and serves it through Nginx on container port 80. The Nginx configuration enables gzip and long-lived caching for versioned Nuxt assets.

## Validation

Generate the site before running browser checks:

```bash
pnpm generate
pnpm exec playwright test
```

Playwright starts the local static preview server when needed. The checks cover desktop and mobile routes, metadata, horizontal overflow, contact actions, mobile navigation, reduced motion, and print styling.

To run Lighthouse, start the static preview server in one terminal and run the audit in another:

```bash
node scripts/serve.mjs
```

```bash
pnpm exec lighthouse http://127.0.0.1:4173 --only-categories=performance,accessibility,best-practices,seo --output=html --output-path=./lighthouse-report.html
```

Performance scores depend on the device, network, hosting, and build. No Lighthouse score is guaranteed by this repository.

## Content and Styling

- `data/portfolio.json`: biography, contact details, work history, skills, education, and certifications.
- `pages/index.vue`: landing page capabilities and experience summary.
- `components/HeroSection.vue`: introduction and portrait.
- `components/ContactCta.vue`: shared contact call to action.
- `pages/contact.vue`: project and hiring email templates.
- `assets/css/main.css`: layout, colors, responsive behavior, motion, and print styles.
- `layouts/default.vue`: header logo and navigation.
- `public/favicon.ico`: mint favicon matching the header's lowercase f and period.

Some landing page copy is defined directly in Vue components. When updating work history, review both the central JSON file and the landing page summary.

## Project Structure

```text
assets/css/          Global styles
components/          Shared page sections
data/                Portfolio content
layouts/             Shared navigation and footer layout
pages/               Application routes
public/              Images and favicon
scripts/             Local static preview server
tests/               Playwright browser checks
app.vue              Application wrapper and SEO metadata
app.config.ts        Nuxt UI theme
nuxt.config.ts       Modules, runtime configuration, and prerender routes
playwright.config.ts Browser test configuration
Dockerfile           Static production image
nginx.conf           Production static server configuration
```
