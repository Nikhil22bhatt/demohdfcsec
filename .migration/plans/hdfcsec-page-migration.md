# HDFC Securities Homepage Migration Plan

Yes, I'm here and ready. The plan is fully built — but I'm currently still in **plan mode**, which only allows read-only tools. That's why file writes and the import scripts can't run yet. To actually execute the migration, plan mode needs to be turned off on your side (accept the plan when prompted, or press **Shift+Tab** to cycle into normal/execute mode). Once that's off, say "go" and I'll run the whole pipeline start to finish.

Migrate **https://www.hdfcsec.com/** to Adobe Edge Delivery Services with full visual fidelity — CSS, fonts, JavaScript behaviors, UI, and design — plus fully instrumented global header/navigation (megamenu) and footer as reusable blocks. Reproduce the **exact** page.

## Scope
- **In scope:** Homepage as a single landing page; global header/navigation (megamenu); global footer. All styling, web fonts, interactive JS behaviors, and design tokens carried over to match the source.
- **Out of scope:** Other page types/templates across the site (deferred to a later full-site effort).

## Current status
- **Mode:** Single Page (homepage) + header/footer instrumentation
- **Environment checked:** Standard EDS boilerplate confirmed; no `catalog/block-catalog.json` → per-page block generation
- **Tasks created:** 8 migration tasks are set up and tracked (Init in progress)
- **Blocker:** Harness is in plan mode — writes/commands are blocked. **Execution requires Execute mode.**

## How to start execution
- [ ] Turn off plan mode (accept plan, or Shift+Tab to Execute mode)
- [ ] Send "go" — I'll run all phases below without re-asking

## Checklist

### Phase 1 — Project setup & discovery
- [ ] Detect project type (doc / da / xwalk) and correct Block Library endpoint
- [ ] Confirm local dev/preview environment is ready
- [ ] Inventory existing block palette (project + Block Collection)

### Phase 2 — Scrape & analyze the homepage
- [ ] Scrape https://www.hdfcsec.com/ — cleaned HTML, metadata, images, fonts, CSS/JS refs (bot-protection fallback if blocked)
- [ ] Capture reference screenshots (desktop + mobile)
- [ ] Analyze structure: sections, content sequences, candidate block variants
- [ ] Name and catalog each homepage block variant

### Phase 3 — Content modeling & block generation
- [ ] Model each section (default content vs. blocks)
- [ ] Generate/customize block code for each homepage variant (one at a time)
- [ ] Set up import infrastructure (parsers + transformers)

### Phase 4 — Content import
- [ ] Generate and run the bundled import script
- [ ] Verify imported HTML renders in local preview

### Phase 5 — Design & styling migration
- [ ] Extract design tokens (colors, typography, spacing) and web fonts
- [ ] Apply site-level styles (fonts, global CSS, tokens)
- [ ] Style each block to match original computed styles
- [ ] Carry over interactive JS behaviors as pixel-matched static/styled UI

### Phase 6 — Navigation (header/megamenu)
- [ ] Extract header structure and per-item hover/click behavior
- [ ] Instrument EDS header/navigation block (desktop + mobile + megamenu)
- [ ] Validate nav structure and appearance vs. original

### Phase 7 — Footer
- [ ] Extract footer structure and content
- [ ] Build EDS footer block (desktop + mobile)
- [ ] Validate footer structure and appearance vs. original

### Phase 8 — Verification
- [ ] Preview full page (homepage + header + footer)
- [ ] Visually critique vs. original (full-page + per-section)
- [ ] Iterate on styling/behavior fixes until fidelity is acceptable
- [ ] Final QA pass (responsive, fonts, interactions)

## Notes
- **Bot protection:** Financial site may block scraping; scrape step uses an automatic fallback.
- **Interactive elements:** Market tickers, live quotes, carousels, login/CTA reproduced as pixel-matched static/styled UI (live data feeds aren't reproducible statically).
- **Fonts/licensing:** Source web fonts carried over for visual match; licensed fonts may need proper hosting.
- **Verification:** Final deliverable includes a local preview to review before anything ships.
