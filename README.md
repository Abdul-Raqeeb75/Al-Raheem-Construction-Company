# Al-Raheem Construction Website

> **Purpose:** A single-page, responsive construction and property portfolio website for **Al-Raheem Construction**. The experience presents the brand through a warm property-editorial visual system, clear service information, project work, current projects, approved client records and a practical contact path.

This README is written for the person who will maintain content, update visuals or extend the frontend. The project is intentionally **frontend-first**: its page content and interactions are currently managed in the React source rather than through a database or admin panel.

## 1. Project at a glance

| Area | Current implementation |
|---|---|
| Project type | Static React single-page website |
| Main framework | React 19 with TypeScript |
| Build tool | Vite 7 |
| Package manager | pnpm |
| Styling approach | Global handcrafted CSS in `client/src/index.css`, with Tailwind 4 available in the build setup |
| Visual direction | Warm cream, walnut, coffee and sand-gold property editorial design |
| Hosting asset paths | Managed `/manus-storage/...` paths for supplied brand/project images |
| Icons | `lucide-react` |
| Page route | A single Home page rendered by `client/src/App.tsx` |
| Validation commands | `pnpm check` and `pnpm build` |

The visible page follows this approved sequence:

| Order | Section | Anchor | Main purpose |
|---:|---|---|---|
| 1 | Home / Hero | `#home` | Establishes the brand, headline, actions and proof summary. |
| 2 | About | `#about` | Explains the company approach using an editorial split composition. |
| 3 | Services | `#services` | Lists construction services with service-specific interactive image previews. |
| 4 | Portfolio | `#projects` | Shows selected previous work in an asymmetric image mosaic. |
| 5 | Current Projects | `#current-projects` | Presents active work with status and a detail action. |
| 6 | Testimonials | `#testimonials` | Displays approved client records and neutral pending feedback states. |
| 7 | Contact | `#contact` | Provides contact details and a project-planning call to action. |
| 8 | Footer | — | Repeats brand, navigation, contact and social-information structure. |

## 2. Running the project locally

Install dependencies once, then run the development server. All commands should be executed from the project root, `/home/ubuntu/construction-website`.

```bash
pnpm install
pnpm dev
```

| Command | What it does |
|---|---|
| `pnpm dev` | Starts the Vite development server on port `3000` when available. |
| `pnpm check` | Runs TypeScript in strict no-output validation mode. |
| `pnpm build` | Builds the client into `dist/public` and bundles the small production server. |
| `pnpm preview` | Serves the Vite production build locally for previewing. |
| `pnpm start` | Runs the built Express static-server wrapper. |
| `pnpm format` | Formats files through Prettier. |

> **Recommended workflow:** Make one coherent change, run `pnpm check`, then run `pnpm build`. Visual changes should also be checked at a desktop width and a narrow mobile width.

## 3. Technology and project architecture

The active website is a **React 19 + TypeScript + Vite** application. Styling is primarily authored as deliberate global CSS rather than utility-heavy JSX, allowing the editorial composition, hover treatments and responsive overrides to stay in one place.

```text
construction-website/
├── client/
│   ├── index.html                    # HTML head, title, favicon, analytics script
│   └── src/
│       ├── App.tsx                   # Thin application shell; renders Home and Toaster
│       ├── main.tsx                  # React mount point
│       ├── index.css                 # Global tokens, components, animation and breakpoints
│       ├── pages/
│       │   └── Home.tsx              # Main page sections and page-level interaction state
│       ├── components/
│       │   ├── SiteHeader.tsx        # Desktop/mobile navigation and animated menu state
│       │   ├── ProjectDialog.tsx     # Shared project-detail dialog
│       │   └── ui/                   # Available shadcn/ui primitives from the template
│       └── data/
│           └── siteContent.ts        # Typed navigation, brand, services, projects, testimonials
├── server/
│   └── index.ts                      # Small Express static-file production fallback
├── shared/                            # Template compatibility shared area
├── vite.config.ts                    # Vite, aliases, managed-storage proxy and local debug setup
├── tsconfig.json                     # Strict TypeScript configuration and aliases
├── package.json                       # Scripts and installed packages
├── ideas.md                           # Approved visual-system decisions
├── TESTIMONIALS_GUIDE.md              # Rules for future genuine testimonial additions
└── todo.md                            # Historical/active implementation checklist
```

### Active implementation dependencies

| Technology | Role in this website |
|---|---|
| **React 19** | Builds the page UI and manages active interaction state. |
| **TypeScript 5** | Adds typed project and testimonial content models and strict validation. |
| **Vite 7** | Provides fast local development and production bundling. |
| **Tailwind CSS 4** | Is configured in the project and available for utilities; the current visual system is mainly custom CSS. |
| **Lucide React** | Supplies icons such as menus, arrows, phone, email, map pin, quotes and modal close controls. |
| **Express** | Serves the compiled static output with an `index.html` fallback in production. |
| **shadcn/ui / Radix packages** | Included with the base template for future accessible UI extensions; the public page currently uses a lightweight custom presentation layer. |

### Aliases and build output

| Alias or path | Meaning |
|---|---|
| `@/` | Points to `client/src/`; use it for page, component and data imports. |
| `@shared/` | Points to the `shared/` directory. |
| `dist/public` | Client build output directory. |
| `/manus-storage/...` | Managed, deployment-safe image path used by supplied static visual assets. |

## 4. Content and section guide

### 4.1 Home / Hero

The Hero uses the `brand.heroImage` asset from `siteContent.ts`, a dark readability overlay, the main brand line and two anchor actions. Its headline includes an animated text loop. The loop currently cycles through **Dream Home**, **Future Space** and **Next Chapter** using a letter-by-letter writing effect, cursor blink, brief hold and soft dissolve before the next phrase.

| Element | Where to edit | Notes |
|---|---|---|
| Hero image | `client/src/data/siteContent.ts` → `brand.heroImage` | Keep images outside the project directory and use a managed storage path. |
| Eyebrow, supporting copy and CTA labels | `client/src/pages/Home.tsx` | Use short, specific construction/property language. |
| Rotating Hero phrases | `heroWords` constant in `Home.tsx` | Keep phrases short so they fit mobile widths. |
| Hero motion and gradient | `client/src/index.css` → `.editorial-hero__loop-word` | Includes typing cursor and dissolve-related styling. |
| Proof-card figures | `Home.tsx` | Update only with verified company/project information. |

### 4.2 About

The About block is a walnut/coffee editorial split: written brand positioning appears on the left while a completed-property image appears on the right. The section is designed to balance the image-led Hero with a more grounded company statement.

The text and call to action are in `Home.tsx`. The image currently reuses a suitable approved project image from `previousProjects`. Its layout styles are under `.editorial-about` in `index.css`.

### 4.3 Services

Services are defined in the `services` array inside `siteContent.ts`. Each item contains a number, title, detail and `image`. The service rows are keyboard-focusable buttons so a visitor can interact by mouse, keyboard or touch.

On desktop, a relevant small image overlay appears **only while the corresponding service row is hovered or focused**. On touch devices, it appears while the row is pressed. It is not a permanently visible image panel.

| Service property | Purpose |
|---|---|
| `number` | Visual sequence such as `01`, `02`. |
| `title` | Service name shown in the row. |
| `detail` | Concise explanation of the construction service. |
| `image` | Relevant image used by the temporary hover/focus preview. |

### 4.4 Portfolio / Selected work

The Portfolio is sourced from `previousProjects` in `siteContent.ts`. By default, the first five projects appear. The **Explore all projects** action toggles the full collection. Each tile opens the shared `ProjectDialog` component.

The word **build** in the Portfolio heading uses the sand-gold animated gradient treatment. Project thumbnails use a restrained warm image filter to align different source images with the same editorial art direction.

### 4.5 Current Projects

Current work comes from the `currentProjects` array in `siteContent.ts`. Cards show a status, title and location. Selecting a card opens the same shared project-detail dialog used by the Portfolio.

Progress percentages were deliberately removed. If status information is updated, retain practical words such as `In Progress`, `Foundation Works` or another verified stage rather than adding speculative completion percentages.

### 4.6 Testimonials

The testimonial area follows a strict authenticity policy. `approvedTestimonials` currently contains the supplied record for **Nawaz Chattha**: 25 homes completed and a 5/5 rating, with no fabricated quotation. Empty positions use neutral pending states so the carousel layout remains ready for genuine future approval.

> **Do not invent client names, quotes, ratings or reviews.** Add only client information and exact written feedback that has been approved for publication. See `TESTIMONIALS_GUIDE.md` before editing this area.

### 4.7 Contact

The Contact section is a premium conversion band with a warm architectural background pattern, a clear heading, compact contact detail cards and a dark project-planning panel. Its current phone number is plain information, not a call-button treatment.

| Contact field | Current state | Maintenance action |
|---|---|---|
| Phone | `+92 0301 2345678` | Replace only when a verified business number is available. |
| Email | Editable visible placeholder | Replace the placeholder in `Home.tsx` with the real company email. |
| Address | Editable visible placeholder | Replace with the registered business address. |
| WhatsApp | Floating control currently links to `#contact` | Replace the link with the verified `https://wa.me/...` URL when supplied. |

### 4.8 Footer

The footer is intentionally darker than the page body. It repeats brand context, the approved navigation order, contact information and a social-information placeholder. Its layout becomes a single column at smaller widths to prevent logo or text overflow.

## 5. Design system and styling

The visual direction is documented in `ideas.md` as **Warm Property Editorial**. The page avoids a generic blue/cyber style and instead uses natural, construction/property-led tones.

### Color tokens

These custom properties are the primary visual vocabulary. They are declared in `client/src/index.css` under `:root`.

| Token | Value | Intended use |
|---|---|---|
| `--cream` | `#f7f5f0` | Main page canvas. |
| `--paper` | `#fffefa` | Raised light surfaces and cards. |
| `--ink` | `#24221f` | Main readable text. |
| `--muted` | `#767068` | Secondary supporting copy. |
| `--line` | `#e5e0d7` | Dividers and low-contrast boundaries. |
| `--walnut` | `#5a4433` | Warm brown accent. |
| `--coffee` | `#302821` | Dark grounded sections and controls. |
| `--gold` | `#b98748` | Primary action and premium accent. |
| `--gold-light` | `#d7af72` | Light gold text and supporting highlights. |
| `--ease` | `cubic-bezier(.23,1,.32,1)` | Shared snappy, controlled motion curve. |

### Typography

| Font | Use |
|---|---|
| **DM Sans** | Default body, navigation, cards, labels and functional UI text. It is used for direct readability. |
| **Playfair Display** | Italic or editorial emphasis in selected headlines, such as `Build Today.` and selected lower headings. |

Both fonts are loaded from Google Fonts in `client/src/index.css`. Do not replace them with a generic default font unless the design direction is intentionally changed.

### Gradient hierarchy

The warm animated text gradient is intentionally selective. It is present on the typed Hero loop words and selected lower-page editorial emphasis, including **Services: “clearly delivered”** and **Portfolio: “build”**. The Contact heading is intentionally not gradient-treated.

### Responsive breakpoints

| Breakpoint | Key behavior |
|---:|---|
| `1050px` | Reduces header spacing and adapts medium desktop/tablet component proportions. |
| `900px` | Switches to mobile navigation, stacks Services and adjusts current-project cards. |
| `820px` | Adds footer overflow protections and single-column footer handling. |
| `620px` | Applies phone-specific header, Hero, gallery, contact, footer and fixed-control refinements. |

## 6. Motion and interaction inventory

The site uses motion sparingly to communicate state rather than as decoration. Most transitions use `--ease`, and the CSS includes a `prefers-reduced-motion` override that shortens non-essential animation for visitors who request reduced motion.

| Interaction | Behavior |
|---|---|
| Startup state | Three-bar loader, followed by a lightweight page skeleton before the page becomes ready. |
| Header | Becomes a frosted fixed surface after a small scroll threshold. |
| Hero word loop | Types one phrase, pauses, dissolves and writes the next phrase. |
| Primary buttons | Lift slightly, show a light sweep and support concise icon motion. |
| Services | Service-specific image appears only during direct hover, focus or touch press. |
| Portfolio/current card | Opens the project-detail dialog. |
| Project dialog | Opens with an animated detail card over a neutral blurred backdrop; closes via X or backdrop click. |
| Testimonials | The marquee is structured to pause on hover. |
| Mobile menu | Toggle changes open/close state; dropdown uses opacity/scale entry and staggered link motion. |
| Back-to-Top | Appears after scrolling beyond the defined threshold; uses a compact mobile stack with WhatsApp. |
| WhatsApp | Fixed lower-right visual control; currently points users toward Contact until a direct WhatsApp URL is supplied. |

## 7. Content maintenance recipes

### Add or update a previous/current project

Edit `client/src/data/siteContent.ts`. Every project must provide the following values:

```ts
{
  id: "unique-project-id",
  title: "Project name",
  category: "Residential | Commercial | Infrastructure | ...",
  location: "Verified location label",
  scope: "Concise project scope",
  description: "Accurate project description",
  image: "/manus-storage/managed-image-file.jpg",
  status: "Optional: verified current stage"
}
```

Use `previousProjects` for completed/selected work and `currentProjects` for active work. Keep `id` values unique. The shared dialog reads the values automatically.

### Add a new service

Add an item to `services` in `siteContent.ts` and include an appropriate `image` value. Preview images should be warm, architectural, relevant to the service and compatible with the managed asset workflow.

```ts
{
  number: "07",
  title: "New service title",
  detail: "Short service explanation.",
  image: "/manus-storage/managed-service-image.jpg"
}
```

### Add a genuine testimonial

Read `TESTIMONIALS_GUIDE.md` first. Then add only approved material to `approvedTestimonials` in `siteContent.ts`.

```ts
{
  id: "client-name-slug",
  clientName: "Approved client name",
  clientRole: "Approved role or project context",
  quote: "Exact approved quote"
}
```

If a quotation has not been supplied, do **not** make one up. A verified non-quote record can use `homesCompleted` and `ratingOutOfFive` when those facts have been supplied and approved.

### Update contact or social information

The visible Contact and Footer detail strings are currently in `client/src/pages/Home.tsx`. Search for the exact placeholders, replace them with verified business information, then update the WhatsApp floating link if a direct number is available.

## 8. Asset management

Visual assets are deliberately referenced through managed `/manus-storage/...` paths. This avoids shipping large local image files inside the deployed repository and keeps production deployment lightweight.

| Asset type | Current location | Rule |
|---|---|---|
| Transparent brand logo | Managed storage, referenced by `brand.logo` | Use for header/footer branding. |
| Browser favicon | Managed storage, referenced in `client/index.html` | Keep the supplied building mark. |
| Hero image | Managed storage, referenced by `brand.heroImage` | Preserve legibility against the Hero overlay. |
| Project/service images | `siteContent.ts` URLs or managed-storage paths | Prefer a warm architectural edit; do not repeat one image across unrelated sections. |

When adding new visual files, keep the original local file outside the project directory (for example under `/home/ubuntu/webdev-static-assets/`) and use the managed public path in source code. Avoid placing large media inside `client/public` or `client/src/assets`.

## 9. Accessibility and quality expectations

The current implementation includes meaningful image alt text for project/brand imagery, button labels for interactive cards, `aria-expanded` on the mobile menu, modal semantics for project detail, and visible focus treatment on Services rows.

When extending the site, retain these principles:

| Do | Avoid |
|---|---|
| Preserve visible keyboard focus and descriptive button labels. | Do not turn meaningful links into non-semantic `div` click handlers. |
| Keep text contrast high over image surfaces. | Do not rely on images alone for readable text. |
| Use real approved testimonials and project facts. | Do not add fabricated ratings, reviews or claims. |
| Use short animations based on opacity and transform. | Do not introduce long, distracting or layout-shifting motion. |
| Check desktop and mobile after layout changes. | Do not assume a desktop-only change works on a phone. |

## 10. Deployment and troubleshooting notes

The Vite build creates static client files under `dist/public`. The small Express wrapper in `server/index.ts` serves those files and returns `index.html` as a fallback for client-side navigation. The production server uses `PORT` when supplied, otherwise port `3000`.

During local development, `vite.config.ts` includes two project-specific support functions:

| Feature | Development purpose |
|---|---|
| Debug collector | Captures browser console, network and session log entries under `.manus-logs/`. |
| Managed storage proxy | Resolves `/manus-storage/...` paths through signed URLs during development. |

If something appears broken after a change, use this order:

1. Run `pnpm check` to find TypeScript issues.
2. Run `pnpm build` to confirm production compilation.
3. Review the relevant browser/mobile layout.
4. For interaction errors, inspect `.manus-logs/browserConsole.log` and `.manus-logs/networkRequests.log` from the command line.

## 11. Design guardrails for future changes

The site should continue to feel like a composed, premium construction/property brand rather than a generic template. Keep the warm cream canvas, walnut grounding, sand-gold action language, rounded architectural imagery, editorial type hierarchy and concise craft-led voice.

> Before accepting a new visual decision, ask: **“Does this strengthen the warm property-editorial direction, or does it dilute it?”**

Avoid excessive centered content, heavy purple/blue surfaces, unnecessary rounded pills, generic filler copy, fabricated social proof and unrelated stock imagery. The supplied logo, favicon, footer structure, mobile controls and approved section order should be preserved unless the business intentionally changes direction.

---

**Document owner:** Al-Raheem Construction project team  
**Last updated:** 26 August 2026  
**Maintainer note:** Update this README whenever architecture, content ownership, external links or visual-system rules materially change.
