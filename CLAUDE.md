# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository. It is the onboarding brief for any fresh session — read it fully before making changes.

---

## 1. What this project is

**Spark Claw** is SparkLabs' first accelerator program for **solo founders and small teams building
in the era of Agentic AI** ("AI가 당신의 팀입니다 / AI is your team"). This repo is the program's
**bilingual (KO/EN) marketing landing site**. Cohort 01 recruiting is currently live.

- It is a standalone product site that sits alongside the main SparkLabs corporate site
  (`www.sparklabs.co.kr`, a separate Next.js project — not this repo).
- Audience: prospective applicants (Korean-first), plus partners and press.
- Goal of the page: drive **지원하기 (Apply)** conversions for Cohort 01.

**Ownership / approvals:** the project owner and decision-maker is **Eunbit**. Structural or visual
changes that go to production should be confirmed with Eunbit first. Always use the name "Eunbit" in
any SparkLabs-facing copy, docs, or commit/PR descriptions — no other names or nicknames.

The day-to-day operator driving content updates is non-technical, so when surfacing changes, lead
with what they will see and what action they need to take (commit / push / refresh), not code detail.

---

## 2. Production & deployment

| Thing | Value |
|-------|-------|
| Production URL | **https://www.sparkclaw.co.kr** (canonical — use this in `og:url`, absolute asset URLs, etc.) |
| Host | Vercel — static site, no build step, repo root is the deploy root |
| GitHub repo | `SparkLabs-kr/spark-claw` (public) |
| Production branch | **`main`** — every push to `main` auto-deploys to production via the Vercel GitHub integration |
| Git remote | `origin` → `git@github-spark:SparkLabs-kr/spark-claw.git` (uses an SSH host alias `github-spark`; pushes go over SSH) |

### Deploy workflow (important)

There is **no CLI/manual deploy** in normal use. To ship: **commit → push to `main` → Vercel deploys
automatically** (usually live in 1–2 minutes).

- `application-form-update` is an old feature branch. **Production is `main` only.** Don't assume a
  commit is live until it's on `main`. (Past incident: image files were committed to the feature
  branch and the live site stayed broken because they never reached `main`.)
- `vercel.json` configures clean URLs (`/insights` not `/insights.html`), trailing-slash suppression,
  and security headers.

### Caching gotchas (these cause "I pushed but nothing changed")

- `styles.css`, `script.js`, `favicon.svg` are served with `Cache-Control: public, max-age=3600,
  must-revalidate` (see `vercel.json`). After a CSS/JS change the browser may show the **old file for
  up to ~1 hour**. Verify in a private/incognito tab or hard-refresh before assuming a bug.
- **Favicons and the OG image cache very aggressively** in browsers and in messengers. When changing
  a favicon, renaming the file (or bumping a `?v=` query) forces a refresh.
- KakaoTalk caches link previews. After changing OG tags/image, clear it at
  `https://developers.kakao.com/tool/clear/og`.

---

## 3. Running locally

No build step — pure static files. Serve from the repo root:

```bash
python3 -m http.server 5173
# or
npx serve .
```

Open `http://localhost:5173`.

---

## 4. Architecture

Bilingual (KO/EN) **static landing site**. Everything runs client-side, no framework, no bundler.

### Pages

| File | Route | Purpose |
|------|-------|---------|
| `index.html` | `/` | Main landing page — **source of truth**, all program sections |
| `insights.html` | `/insights` | Insights article index (has its own inline styles, does **not** load `script.js`) |
| `sparkclaw-insight-*.html` | `/sparkclaw-insight-*` | Individual long-form insight articles |
| `index.deploy.html` | — | Stale alternate variant — not deployed, don't edit unless asked |
| `index.all-in-one.html` | — | Stale self-contained single-file variant — not deployed |

### i18n system (`script.js`)

All copy lives in a single `dict` object at the top of `script.js` with `ko` and `en` keys. HTML
elements carry `data-i18n="dotted.key.path"`; `applyLang()` resolves them at runtime.
`data-i18n-placeholder` handles `<input placeholder>`. Selected language persists in `localStorage`
under `sparkclaw.lang`.

**Rule: never edit one language only.** To add/change copy, update **both** `dict.ko` and `dict.en`.
HTML structure stays the same — only text/`innerHTML` changes (translation strings may contain
`<em>`, `<strong>`, `<br>`, `<span>`).

### Navigation (current structure)

The nav was deliberately simplified to **4 items + an Apply CTA** (don't re-bloat it):

- Mobile menu order: `지원하기` (red pill CTA, `.nav__cta`, shown only inside the mobile overlay) →
  `프로그램` (`#philosophy`) → `일정` (`#timeline`) → `소식` (`#news`) → `FAQ` (`#faq`).
- Desktop: same 4 text links + the Apply button in `.nav__actions`.
- About (`#about` / "스파크랩") lives in the **footer**, not the top nav.
- i18n keys: `nav.program`, `nav.timeline`, `nav.updates`, `nav.faq`, `nav.cta`, `nav.about`.

Section anchors present in `index.html`: `#top #apply #timeline #philosophy #benefits #process
#about #news #insights #faq`.

### Dynamic sections (`script.js`)

- **News** — `newsItems` array rendered into `#newsGrid`, sorted by date desc. Add an item:
  `{ url, publisher, date, title: { ko, en }, image }`.
- **Insights** — `insightsItems` array, same pattern; cards link to `sparkclaw-insight-*.html`.

### Application form

The `#tally-form` iframe has `data-src-ko` / `data-src-en` pointing to separate Tally form URLs;
`applyLang()` swaps `src` on language change.

### Design tokens (`:root` in `styles.css`)

```css
--bg:        #FAFAFB;   /* off-white page background */
--ink:       #0A0E27;   /* deep navy — body text */
--ink-soft:  #1F2745;
--muted:     #4A5161;
--border:    #E1E4E8;
--accent:    #E63946;   /* SparkClaw red — primary brand / CTAs */
--accent-ink:#B82B36;   /* darker red for hovers */
--accent-soft:#FCE5E7;
/* spark accent palette: --spark-yellow #FFB800, --spark-green #16A34A,
   --spark-pink #DB2777, --spark-blue #1D4ED8 */
--font-sans:    "Pretendard Variable", "Inter", system-ui, …;
--font-display: "Space Grotesk", "Pretendard Variable", …;
--radius: 14px;  --radius-sm: 8px;  --container: 1200px;
--ease: cubic-bezier(.2,.7,.2,1);
```

Use these variables — don't hardcode hex values.

---

## 5. Brand & content conventions

- **Positioning / tone:** "Global AI-First". Korean copy = polite, clear business tone, minimal
  flourish. English = clear, direct, globally resonant; avoid unnecessary adjectives.
- **Mascot:** the red crab robot "SparkClaw". Hero uses the full mascot with confetti; the favicon
  uses a tightly-cropped, circular face crop (no confetti) so it's legible at 16px.
- **Inquiry email:** `batch@sparklabs.co.kr` (used in the footer Contact link and the partner-inquiry
  CTA). Newsletter/all-hands address `all@sparklabs.co.kr` is unrelated to this site.
- **PR/bio caution:** if writing program or company copy, don't attribute group achievements to a
  single partner; global AI deals (e.g. OpenAI) are led by Bernard Moon — avoid "under his
  leadership"-style phrasing.

---

## 6. Asset map (`assets/`)

| File | Use |
|------|-----|
| `mascot-hero.png` (640²) | Hero character (crab + confetti) |
| `mascot-sm.png` (128²) | Header/footer wordmark logo |
| `sparklabs-logo.png` | Footer "SparkLabs" parent logo |
| `og-image.png` (1200×630) | Link-share preview (KakaoTalk / social); referenced by `og:image` + `twitter:image` |
| `favicon.ico` (16/32/48) · `favicon-16/32/192/512.png` · `apple-touch-icon.png` | Tab + PWA/touch icons; `favicon.ico` is also at repo root for the default `/favicon.ico` request |
| `Insights/`, `news/` | Article and news-card images |

When adding an image referenced by HTML, make sure the file is actually committed to `assets/` on
`main` — a missing file shows as a broken image even though the path "looks right."

---

## 7. Known gotchas / lessons learned

- **`position: fixed` inside the header breaks** because `.nav` uses `backdrop-filter`. A filtered (or
  transformed) ancestor becomes the containing block for `fixed` descendants, so the mobile menu
  overlay was being sized to the 68px header instead of the viewport. Fix in place: `body.nav-open
  .nav { backdrop-filter: none }` so the overlay escapes to the viewport. Don't reintroduce this.
- **`og:url` must be `https://www.sparkclaw.co.kr/`** (an earlier stale value pointed at a non-canonical
  subdomain and broke link previews).
- After CSS/JS or favicon/OG changes, expect caching — verify in a private tab (see §2).

---

## 8. Recent work log (for continuity)

Most recent first (see `git log` for full history):

1. `Update inquiry email to batch@sparklabs.co.kr` — footer Contact + partner-inquiry CTA.
2. `Simplify nav to 4 items + apply CTA` — nav reduced to 프로그램/일정/소식/FAQ + Apply; About moved to footer.
3. `Fix mobile menu + add scroll-to-top button` — backdrop-filter overlay fix; hamburger→X; floating
   `#toTop` button (appears after 400px scroll, smooth-scrolls to top) for desktop + mobile.
4. `Add favicon and link preview (OG) image` — full favicon set, `og-image.png`, OG/twitter meta tags,
   corrected `og:url`.
5. `Add proper favicon` / `Restore missing logo and mascot images` — restored 4 missing `assets/`
   images that were 404ing in production.

---

## 9. Working agreement

- Preview before production where possible; structural/visual changes get Eunbit's sign-off.
- Ship via `main` (commit → push → Vercel auto-deploys). Confirm the change reached `main`.
- Keep KO and EN in sync on every copy change.
- Run a quick verify after deploy (private tab + check the affected page on mobile width).
