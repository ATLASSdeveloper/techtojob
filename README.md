# TechToJob

Landing page and scalable talent showcase for **TechToJob**, a technology community focused on proving skills through real work instead of relying only on traditional CVs.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript (strict mode)
- Sora via `next/font`
- Plain CSS with responsive layouts and reduced-motion support
- Static talent data layer prepared to be replaced by a database/API

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run lint
npm run build
npm start
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the GitHub repository.
3. Vercel detects Next.js automatically.
4. Optionally add:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

5. Deploy. Every push to the production branch can trigger an automatic production deployment; pull requests can generate Preview Deployments.

No custom build command or output directory is required.

## Internationalization

Visible content is not hardcoded inside UI components. The current Spanish dictionary lives in:

```text
src/i18n/dictionaries/es.ts
```

To add another language, create another dictionary file and register the locale in `src/i18n/config.ts` and `src/i18n/getDictionary.ts`.

## Adding talent

Talent is modeled independently from the UI in:

```text
src/domain/talent/types.ts
```

Current records live in:

```text
src/data/talents.ts
```

Add a new `TalentProfile` object and the directory/profile routes will render it automatically. The current local data source is intentionally isolated so it can later be replaced with PostgreSQL, a CMS, or an API without rewriting the visual components.

Each profile gets a route:

```text
/talent/[slug]
```

## Brand assets

Original TechToJob SVG assets are stored in `public/brand`. The UI uses the supplied #2f3436, #84c0bf and #ffffff brand palette.

## Architecture notes

The project separates:

- `domain/`: business-facing types/models
- `data/`: current data source
- `features/`: feature-specific UI
- `components/`: reusable shared UI
- `i18n/`: visible content dictionaries
- `lib/`: application configuration
- `app/`: routing and composition

The landing intentionally avoids a heavy 3D runtime. The visual motion is built with CSS/SVG-like UI primitives for faster loading and better mobile performance.
