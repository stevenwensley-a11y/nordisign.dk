# DELIVERY-PACK — nordisign.dk

> Teknisk overdragelsesdokument for nordisign.dk.
> Genereret: 13. marts 2026
> Ansvarlig: Steven Wensley, BygMedAI

---

## 1. Repository

| Felt | Værdi |
|------|-------|
| **URL** | `https://github.com/stevenwensley-a11y/nordisign.dk` |
| **Branch-strategi** | `main` = produktion. Push til main trigger deploy. |
| **CI status** | Quality Gate (build + HTML-validering + Lighthouse + Smoke tests) → Deploy via GitHub Actions |
| **Teknologi** | Eleventy (11ty) v3.1.2, Nunjucks templates |
| **Node version** | 20 LTS |
| **Build kommando** | `npm run build` |
| **Output mappe** | `_site/` |

### Repo-struktur

```
├── src/
│   ├── _includes/
│   │   └── base.njk             # Base layout (nav + footer + Layer 2 CSS)
│   ├── _data/
│   │   └── site.json            # Global site config (SINGLE SOURCE OF TRUTH)
│   ├── assets/
│   │   ├── css/
│   │   │   ├── base.css         # Layer 1: CSS reset + design tokens
│   │   │   └── nordisign.css    # Layer 4: Site-specifik skin (lyst tema)
│   │   ├── fonts/               # Tangerine (woff2/woff) + Tomato Pasta (otf)
│   │   ├── images/              # NORDISIGN-black.png, NORDISIGN-white.png, portfolio
│   │   └── thumbs/              # Portfolio thumbnails
│   ├── index.njk                # Forside
│   ├── blog.njk                 # Blog oversigt
│   ├── om.njk                   # Om Sophia Obel
│   ├── kontakt.njk              # Kontakt
│   ├── portfolio.njk            # Portfolio (med filter)
│   ├── proces.njk               # Produktionsproces
│   ├── produkt.njk              # Ydelse (brandfilm)
│   ├── robots.txt
│   └── sitemap.xml
├── eleventy.config.js           # 11ty konfiguration
├── package.json                 # Dependencies
├── CNAME                        # Custom domain
├── .github/workflows/
│   ├── test.yml                 # Quality Gate
│   └── deploy.yml               # Build + Deploy til GitHub Pages
└── tests/                       # E2E tests (Playwright)
```

---

## 2. Deploy

| Felt | Værdi |
|------|-------|
| **Platform** | GitHub Pages via GitHub Actions |
| **Deploy trigger** | Push til `main` branch |
| **Build step** | `npm ci && npx @11ty/eleventy` |
| **Validering** | YAML-lækage check + style tag balance |
| **Output** | `_site/` → GitHub Pages artifact |
| **Custom domain** | nordisign.dk (CNAME) |
| **SSL** | Automatisk via GitHub Pages (Let's Encrypt) |

### Deploy-flow

```
Push til main
  → test.yml: Quality Gate
    → Build 11ty
    → HTML-validering
    → Broken links check
    → Lighthouse audit
    → Smoke tests
  → deploy.yml: Build & Deploy
    → Build 11ty
    → Artifact validering
    → Upload pages artifact
    → Deploy til GitHub Pages
  → LIVE på nordisign.dk
```

---

## 3. DNS

| Felt | Værdi |
|------|-------|
| **Registrar + DNS** | Simply.com (Sophias konto S492450) |
| **Nameservers** | Simply.com standard |

### DNS Records

| Type | Navn | Værdi |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | stevenwensley-a11y.github.io |

> **NB:** Simply.com er både registrar og DNS-provider for nordisign.dk. Sikr at betalingen er i orden.

---

## 4. Design & Branding

| Element | Værdi |
|---------|-------|
| **Logo (nav)** | NORDISIGN-black.png (image-based, ikke SVG) |
| **Logo (footer)** | NORDISIGN-white.png (image-based) |
| **Tema** | Lyst tema — hvid baggrund, mørk tekst |
| **Farvepalette** | v3 LOCKED: #FFFFFF, #FAFAF8, #B8A080 (gylden/taupe), #000000 |
| **Typografi** | Display: Tangerine (cursive, self-hosted) |
| | Serif: Crimson Pro (Google Fonts) |
| | Body: Montserrat (Google Fonts) |
| | Script: Tomato Pasta (self-hosted, otf) |
| **CSS-arkitektur** | 4-lags: base.css (reset + tokens) → nordisign.css (skin) |
| **Parallax** | Bakgrundssekvenser med `background-attachment: fixed` (iOS Safari fallback) |
| **Portfolio filter** | JavaScript filter med `data-category` og `data-filter` attributter |
| **Nav shrink** | `.scrolled` class tilføjes ved 80px scroll (sticky nav styling) |

---

## 5. Credentials & Adgange

> **SIKKERHED:** Ingen passwords eller tokens i dette dokument.

| Adgang | Placering | Ansvarlig |
|--------|-----------|-----------|
| GitHub repo | stevenwensley-a11y konto | Steven (overdrages til Sophia) |
| Simply.com (DNS + domæne) | Sophias Simply.com konto S492450 | Sophia |
| Google Analytics | GA4: IKKE OPRETTET ENDNU | Sophia (skal oprettet separat) |

### Adgangsoverdragelse

- [ ] Sophia inviteret som collaborator på GitHub repo
- [ ] Simply.com DNS-records verificeret (A-records + CNAME for www)
- [ ] GA4 oprettet og konfigureret (hvis ønsket)
- [ ] Dokumentation overdraget (denne pakke)

---

## 6. Kendte Begrænsninger

### Browser-kompatibilitet

- Parallax (`background-attachment: fixed`) virker ikke på iOS Safari — fallback til scroll
- Self-hosted fonts (Tangerine, Tomato Pasta) kræver moderne browsers
- Google Fonts (Crimson Pro, Montserrat) kræver internetforbindelse

### Performance

- Billeder i `/assets/images/` og `/assets/thumbs/` bør komprimeres til WebP (maks 200KB)
- Portfolio-billeder (portfolio filter) påvirker page load — overvej lazy-loading
- Lighthouse mål: Performance ≥ 90, Accessibility ≥ 85 (self-hosted fonts påvirker scores)

### Kendte issues

| Issue | Beskrivelse | Workaround |
|-------|-------------|------------|
| GA4 ikke oprettet | Analytics-tracking er ikke konfigureret | Sophia skal oprettet GA4 property og tilføje til site.json |
| Kontaktformular | Ingen email-integration via Formspree osv. | Sophia håndterer manuelt via kontakt@nordisign.dk eller lignende |
| Portfolio-filtring | JavaScript-baseret, ikke server-side | Hvis portofolie vokser >50 items, overvej pagineringsstrategi |

---

## 7. Dependencies & Tredjepartstjenester

| Tjeneste | Bruges til | Konto-ejer | Status |
|----------|-----------|------------|--------|
| GitHub Pages | Hosting + deploy | Steven → Sophia | Aktiv |
| Google Fonts | Crimson Pro, Montserrat | Ingen konto nødvendig | CDN |
| Self-hosted fonts | Tangerine (woff2/woff), Tomato Pasta (otf) | Sophia | Lokalt i repo |
| Google Analytics | Analytics (IKKE OPRETTET) | — | Planlagt |

### NPM Dependencies

| Package | Version | Formål |
|---------|---------|--------|
| @11ty/eleventy | ^3.1.2 | Static site generator |
| @playwright/test | ^1.58.2 | E2E testing (CI) |
| http-server | ^14.1.1 | Lokal testserver (CI) |

---

## 8. Content & Sidestruktur

| Side | Fil | Formål |
|------|-----|--------|
| Forside | `src/index.njk` | Hero + pitch + intro til Sophia |
| Om | `src/om.njk` | Sophias historier + tilgang |
| Produkt | `src/produkt.njk` | Brandfilm-ydelsen forklaret |
| Portfolio | `src/portfolio.njk` | Arbejdseksempler med filtring |
| Proces | `src/proces.njk` | Produktionsflow visualiseret |
| Blog | `src/blog.njk` | Artikler og insights |
| Kontakt | `src/kontakt.njk` | Kontaktform eller kontaktoplysninger |

---

## Underskrift

| | Dato | Underskrift |
|--|------|------------|
| **Leverandør (BygMedAI)** | | |
| **Kunde (Sophia Obel)** | | |

---

*Genereret af BygMedAI. Fase 3 pilot — nordisign.dk.*
