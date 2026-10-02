# Ongoing Media — website

De website van Ongoing Media (altijd zo geschreven: twee woorden, met hoofdletters). Vooral een portfoliosite.

## Werkafspraken

Deze afspraken gelden bij elke sessie, voor iedereen die aan dit project werkt:

> kijk of er al code gebruikt wordt. Zo niet, kijk of de gewenste code op meerdere plekken gebruikt gaat worden. Zo ja, shared code maken. Maak alle code S.O.L.I.D. Voeg testcoverage toe. Voor elke wijziging branch af van fresh main. Na build deploy naar staging. Zet in pull request de prompt die ik heb ingevuld. We willen de feature branch deployen, niet vanaf main. Na de feature branch validatie pas deployeer naar main. Antwoord altijd in het Nederlands en simpele taal, want ik ben geen developer. Als ik tevreden ben met de staging validatie wil ik altijd eerst nog simplify, review en security review doen.

## Projectafspraken

- **Hosting:** Netlify (project "ongoingmedia"). De site staat op https://ongoingmedia.nl (DNS bij Mijndomein; e-mail via Google, dus MX- en TXT-regels niet aanpassen). Staging = de Netlify Deploy Preview die automatisch per pull request wordt gemaakt. Productie = merge naar main. Nooit direct naar main pushen (main is beschermd, alles via pull request).
- **Geen database/Supabase:** het is een statische portfoliosite. Contactformulier later via Netlify Forms.
- **Video's NOOIT in de repo of op Netlify.** Die komen van Vimeo en worden alleen ingesloten.
- **Afbeeldingen geoptimaliseerd** (moderne formaten, juiste formaten), want het Netlify free plan heeft een beperkt tegoed.
- **Geen wachtwoorden, API-keys of tokens in de code.** Alleen via environment variables in Netlify.
- **Merges naar main beperken** tot afgeronde, geteste wijzigingen (elke productie-deploy kost tegoed).

## Techniek

- Gebouwd met [Astro](https://astro.build) (statische site). Build-instellingen voor Netlify staan in `netlify.toml`; in het Netlify-scherm hoeft niets ingesteld te worden.
- Node-versie staat in `.nvmrc`.

### Commando's

- `npm run dev` — site lokaal bekijken
- `npm run build` — site bouwen naar `dist/`
- `npm test` — build + tests met coverage (dit draait ook bij elke pull request via GitHub Actions)

### Indeling

- `src/config/site.ts` — gedeelde sitegegevens (naam, taal, e-mail, adres, lettertype-kit). Gebruik dit in plaats van de naam los over te typen.
- `src/config/routes.ts` — alle adressen binnen de site en het menu
- `src/data/` — inhoud: diensten (`services.ts`)
- `src/lib/` — gedeelde hulpfuncties (met tests), o.a. sitemap
- `src/components/` — herbruikbare bouwstenen (Section, SplitHeading, Photo, Button, ContactForm, ContactDetails, …)
- `src/styles/global.css` — huisstijl: kleuren, lettertype, basisopmaak; `motion.css` — animaties (via `data-motion`)
- `src/assets/images/` — bronfoto's; Astro maakt er bij de build kleine WebP-versies van
- `src/layouts/BaseLayout.astro` — gedeelde basisopmaak voor elke pagina (SEO, favicons, header, footer)
- `src/pages/` — de pagina's zelf
- `public/brand/` — officiële logo's
- `tests/` — tests; `tests/build.test.ts` controleert de echt gebouwde site, `tests/repo.test.ts` bewaakt de afspraken (geen video's, PDF's of geheimen)

### Website-afspraken

- De site is **Engelstalig**. Lettertype: Helvetica LT Pro via Adobe Fonts (kit in `site.ts`).
- Lime (`#9FFF3E`) alleen op donkere achtergronden; op licht is het onleesbaar.
- De pagina **Work** (cases met Vimeo-video's) is tijdelijk weggehaald tot er echte cases zijn. Terughalen: de code staat in commit `e5d2ddf` (`src/pages/work/`, `src/data/cases.ts`, `src/lib/vimeo.ts`, `CaseCard`, `VimeoPlayer`); zet dan ook `frame-src https://player.vimeo.com` terug in `netlify.toml`.
- Geen inline scripts of stijlen: de beveiligingsregels (CSP) in `netlify.toml` blokkeren die.
