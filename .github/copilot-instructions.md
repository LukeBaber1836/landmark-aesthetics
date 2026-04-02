# Landmark Aesthetics — Copilot Instructions

## Project Overview

Med-spa website for Landmark Aesthetics in Jacksonville, TX. Built with **Next.js 16** (App Router), **React 19**, **TypeScript**, **Tailwind CSS 4**, and **Markdown/MDX** content.

## Quick Reference

| Action | Command |
|---|---|
| Dev server | `yarn dev` |
| Production build | `yarn build` |
| Start prod | `yarn start` |
| Lint | `yarn lint` |
| Format | `yarn format` |

Package manager: **Yarn 1.22** (do not use `npm`).

## Architecture

```
src/
  app/              # Next.js App Router pages (file-based routing)
  config/           # Site config JSON (config, menu, social, theme)
  content/          # Markdown content files (frontmatter + body)
  layouts/
    components/     # Reusable UI blocks (ServiceCard, Button, etc.)
    helpers/        # Utility components (ImageFallback, DynamicIcon, MDXContent)
    partials/       # Page sections (Header, Footer, HeroBanner, etc.)
    shortcodes/     # MDX-embeddable components (Accordion, Tabs, Video, etc.)
  lib/              # Data fetching and utilities
    contentParser.ts   # getListPage(), getSinglePage()
    taxonomyParser.ts  # getTaxonomy(), getTaxonomyWithDetails()
    utils/             # Text converters, sort functions
    zoho/              # Email integration
  styles/           # CSS files (Tailwind layers)
  tailwind-plugin/  # Custom Tailwind plugins (theme, BS grid)
  types/            # TypeScript type definitions
public/images/      # Static images organized by section
```

### Path Aliases (tsconfig)

- `@/*` → `./src/*`
- `@/components/*` → `./src/layouts/components/*`
- `@/partials/*` → `./src/layouts/partials/*`
- `@/helpers/*` → `./src/layouts/helpers/*`
- `@/shortcodes/*` → `./src/layouts/shortcodes/*`

## Content System

All content lives in `src/content/` as Markdown files parsed with `gray-matter`.

- **`_index.md`** — Section list pages (services index, homepage data, etc.)
- **Individual `.md` files** — Single items (service-1.md, project-3.md)
- Files with `draft: true` or future dates are excluded from builds.

### Data Fetching

```tsx
// List page (reads _index.md)
const data = getListPage<FrontmatterType>("services/_index.md");

// All items in a folder (excludes _index.md and drafts)
const items = getSinglePage<FrontmatterType>("services");
```

Pages are server components that call these directly — no client-side fetching.

### Static Generation

Detail pages use `generateStaticParams()` + `dynamicParams = false`:

```tsx
export const generateStaticParams = () =>
  getSinglePage<Type>("services").map((s) => ({ single: s.slug }));
export const dynamicParams = false;
```

## Styling Conventions

### Tailwind + Custom Plugins

- **Theme colors** — Use semantic names: `bg-primary`, `text-secondary`, `border-border`. Colors are defined in `src/config/theme.json` and exposed as CSS variables by `tw-theme.js`.
- **Bootstrap-style grid** — Use `.row`, `.col-*`, `.g-*`, `.offset-*` classes from `tw-bs-grid.js`. 12-column system with responsive prefixes.
- **Typography** — Use `text-h1` through `text-h6`, `text-base` for consistent sizing.
- **Buttons** — Use `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-sm` classes.

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#415947` | Green — brand primary |
| `secondary` | `#F4EDD9` | Cream — backgrounds, accents |
| `body` | `#F4EDD9` | Page background |
| `text` | `#2F4232` | Body text |
| `border` | `#767676` | Borders, dividers |

### Fonts

Primary font: **DM Sans** (loaded from Google Fonts in layout). Use `font-primary` class.

## Component Patterns

### Images

Always use `ImageFallback` (client component wrapping Next.js `Image`):

```tsx
<ImageFallback src={src} fallback="/images/fallback.png" alt="..." width={294} height={352} />
```

### Icons

Use `DynamicIcon` with react-icons FA6 string names:

```tsx
<DynamicIcon icon="FaPhone" />
```

Icons are referenced by string in config/content JSON (e.g., `"icon": "FaFacebook"`).

### Animations

Use AOS (Animate on Scroll) data attributes:

```tsx
<div data-aos="fade-up-sm" data-aos-delay="150">...</div>
```

### SEO

Every page should include `<SeoMeta>` with title, description, image, and canonical fields from frontmatter.

### MDX Shortcodes

Available in markdown content: `Accordion`, `Button`, `Notice`, `Tab`, `Tabs`, `Video`, `Youtube`.

## Key Conventions

- **Server-first** — Pages are React Server Components by default. Use `"use client"` only when interactivity is needed.
- **No test framework** — No testing setup exists. Do not add tests unless asked.
- **Strict TypeScript** — `strict: true`. Avoid `any` types.
- **Output mode** — `standalone` (Docker-optimized).
- **Markdown for content** — Never hardcode content that belongs in `src/content/`. Edit the `.md` files instead.
- **Config-driven** — Site metadata, menus, social links, and theme values live in `src/config/*.json`. Reference these rather than hardcoding.
