# RUNBOOK — nordisign.dk

> Driftsvejledning for nordisign.dk.
> Genereret: 13. marts 2026
> Ansvarlig: Steven Wensley, BygMedAI

---

## 1. Deploy

### Normal deploy (indholdsændring)

```bash
# 1. Klon repo (første gang)
git clone https://github.com/stevenwensley-a11y/nordisign.dk.git
cd nordisign.dk

# 2. Installer dependencies
npm install

# 3. Foretag ændringer i src/ mappen

# 4. Test lokalt
npm run start
# Åbn http://localhost:8080 i browser

# 5. Commit og push
git add .
git commit -m "Opdateret [beskriv ændring]"
git push origin main

# 6. Vent på deploy (1-3 minutter)
#    Tjek: GitHub → Actions → grønt flueben = LIVE
```

### Tidsramme

| Handling | Tid |
|----------|-----|
| Push til main | 0 min |
| CI Quality Gate | ~1-2 min |
| Deploy til GitHub Pages | ~1 min |

---

## 2. Opdatering af Indhold

### Sidens filer

| Side | Fil |
|------|-----|
| Forside | `src/index.njk` |
| Om Sophia | `src/om.njk` |
| Brandfilm-ydelse | `src/produkt.njk` |
| Portfolio | `src/portfolio.njk` |
| Proces | `src/proces.njk` |
| Blog | `src/blog.njk` |
| Kontakt | `src/kontakt.njk` |

### Tekst

Åbn den relevante `.njk` fil i en teksteditor. Find teksten og erstat.

**Vigtigt:**
- Rør IKKE ved `{% %}` eller `{{ }}` template-kode
- Rør IKKE ved `---` frontmatter i toppen af filer
- Hold HTML-tags intakte (`<h1>`, `<p>`, `<a>` osv.)

### Billeder

Billeder ligger i `src/assets/images/` og `src/assets/thumbs/`. Erstat billedfilen eller tilføj nye, og opdater `src`-attributten i HTML.

**Krav:** WebP eller JPG, maks 200KB, alt-tekst er obligatorisk.

### Logo

Logo er defineret som image-baseret i `src/_data/site.json`:
- Nav logo (sort): `assets/images/NORDISIGN-black.png`
- Footer logo (hvid): `assets/images/NORDISIGN-white.png`

Erstat filerne hvis nyt logo ønskes.

### Navigation

Navigation er defineret i `src/_data/site.json` under `nav.links`. Tilføj eller fjern items her.

### Footer

Footer bruges `site.json` under `footer.links`. Links og tagline styres centralt.

### Global konfiguration

`src/_data/site.json` styrer: sitenavn, email, CVR, logo, fonts, navigation, footer, skin. Ændr her for globale opdateringer.

### Portfolio-filter

Portfolio-filtring kører via JavaScript. Hvert portfolio-item har `data-category` attribut. Filter-knapper har `data-filter` attribut. JavaScript matcher og viser/skjuler items.

```html
<!-- Filter-knapper -->
<button class="filter-btn" data-filter="brandfilm">Brandfilm</button>

<!-- Portfolio-items -->
<div class="portfolio-item" data-category="brandfilm">
  ...
</div>
```

---

## 3. Rollback

### Hurtig rollback

```bash
git log --oneline -5       # Find den gode commit
git revert HEAD             # Fortryd seneste
git push origin main        # Deploy automatisk
```

### Hvis deploy fejler

1. GitHub → repo → Actions tab
2. Klik på fejlet run (rødt kryds)
3. Læs fejlbeskeden
4. Typiske fejl:
   - **Build fejl:** Syntaks i .njk fil → ret og push igen
   - **Style tag mismatch:** Ulukket `<style>` tag → tilføj `</style>`
   - **YAML-lækage:** `---` eller `jsonLd: |` i indhold → flyt til frontmatter
   - **Portfolio-filter:** JavaScript-fejl i console → tjek syntax i .njk

---

## 4. Fejlfinding

### Siden viser ikke mine ændringer

| Tjek | Løsning |
|------|---------|
| Browser cache | Ctrl+Shift+R (hard refresh) |
| Deploy status | GitHub → Actions → skal være grøn |
| Korrekt fil | Redigér i `src/`, ALDRIG i `_site/` |
| Push gennemført | `git status` → "nothing to commit" |

### Sitet er nede

| Tjek | Løsning |
|------|---------|
| GitHub Status | [githubstatus.com](https://githubstatus.com) |
| Simply.com betaling | Bekræft at domæne-faktura er betalt |
| DNS | `dig nordisign.dk` → skal pege på 185.199.x.x |
| CNAME | Tjek at `CNAME` fil indeholder `nordisign.dk` |

### Build fejler lokalt

```bash
rm -rf node_modules _site
npm install
npm run build
```

### Portfolio-filter virker ikke

1. Åbn browser console (F12)
2. Tjek for JavaScript-fejl (røde linjer)
3. Bekræft at `data-filter` og `data-category` attributter matcher i HTML
4. Genopfrisk siden (Ctrl+Shift+R)

---

## 5. Kontakt & Eskalering

| Kanal | Kontakt | Svartid |
|-------|---------|---------|
| Email | steven@bygmedai.dk | 1-2 hverdage |
| Telefon | +45 5388 6061 | Hverdage 9-17 |

**Supportomfang:** Se SUPPORT.md for hvad der er inkluderet.

---

*Genereret af BygMedAI. Fase 3 pilot — nordisign.dk.*
