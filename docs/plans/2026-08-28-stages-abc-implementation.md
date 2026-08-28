# Stages A B C Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Deliver and verify every repository-scoped product, content, engineering, classroom, PWA and kiosk capability defined in stages A, B and C without fabricating external user tests or partnerships.

**Architecture:** Extend the current React/Vite prototype into a local-first installable PWA. Typed content and domain services remain framework-independent and fully tested; React consumes those services for museum, training, progress, teacher, administration and kiosk surfaces. Explicit provider and OpenAPI contracts preserve a future multi-model/backend path.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, vite-plugin-pwa, qrcode.react, browser storage, Web Speech API.

---

### Task 1: Stage acceptance matrix

**Files:**
- Create: `docs/verification/stages-abc-matrix.md`
- Create: `docs/operations/user-testing-kit.md`
- Create: `docs/operations/partnership-kit.md`

1. Record every A/B/C requirement as `verified`, `external_pending`, or `not_started`.
2. Write real participant recruitment, consent, task and observation templates.
3. Write school, publisher and museum cooperation packages without invented partners.

### Task 2: Complete knowledge and evidence base

**Files:**
- Create: `src/content/evidence.ts`
- Create: `src/content/catalog.test.ts`
- Modify: `src/content/stratagems.ts`

1. Write failing tests for 36 unique entries, six volumes, eight comic panels, evidence, conditions, boundaries and valid relations.
2. Confirm RED because only three entries exist.
3. Implement all 36 entries, preserving the three detailed samples.
4. Confirm GREEN and run the full suite.

### Task 3: Complete training library and safety guide

**Files:**
- Create: `src/content/trainingCases.ts`
- Create: `src/content/trainingCases.test.ts`
- Create: `src/domain/guide.ts`
- Create: `src/domain/guide.test.ts`

1. Write failing tests for 24 reviewed preset cases and three audiences.
2. Write failing structure/safety/fallback tests for 100 deterministic guide fixtures.
3. Implement local retrieval, uncertainty, high-risk refusal and explicit provider states.
4. Confirm all structure and safety fixtures pass.

### Task 4: Progress, reporting and governance

**Files:**
- Create: `src/domain/progress.ts`
- Create: `src/domain/progress.test.ts`
- Create: `src/domain/governance.ts`
- Create: `src/domain/governance.test.ts`
- Create: `src/domain/teacher.ts`
- Create: `src/domain/teacher.test.ts`

1. Test versioned storage migration, favorites, reading and reviews.
2. Test role permissions, publish transitions, diff, rollback and append-only audit.
3. Test privacy-minimized teacher summaries and classroom cards.
4. Implement minimum domain services until every test passes.

### Task 5: Product surfaces

**Files:**
- Create: `src/components/MuseumHome.tsx`
- Create: `src/components/ExhibitView.tsx`
- Create: `src/components/GraphView.tsx`
- Create: `src/components/LearningCenter.tsx`
- Create: `src/components/TeacherStudio.tsx`
- Create: `src/components/AdminStudio.tsx`
- Create: `src/components/KioskShell.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Modify: `src/styles.css`
- Modify: `tokens.css`

1. Write failing navigation tests for museum, exhibit, graph, training, learning, teacher and admin routes.
2. Implement a single responsive shell with lazy-loaded secondary modes.
3. Add speech controls, captions, QR continuation, collection and report export.
4. Verify keyboard, reduced motion, empty, error, offline and kiosk reset states.

### Task 6: PWA, contract and operations

**Files:**
- Create: `public/icon.svg`
- Create: `public/maskable-icon.svg`
- Create: `docs/api/openapi.yaml`
- Create: `docs/operations/kiosk-runbook.md`
- Modify: `vite.config.ts`
- Modify: `package.json`

1. Configure installable manifest and offline application shell.
2. Define content, guide, training, progress and governance API contracts.
3. Document Kiosk launch, idle reset, offline recovery and privacy clearing.
4. Build and inspect generated manifest and Service Worker files.

### Task 7: Verification and publication

**Files:**
- Modify: `docs/verification/stages-abc-matrix.md`
- Modify: `README.md`
- Modify: `.hallmark/log.json`

1. Run all unit/component tests, type checking, build, dependency and secret scans.
2. Validate content completeness, evidence links, internal relations and training counts.
3. Test production build at 360, 768, 1024 and 1440 plus 320/375/414/1920 safety widths.
4. Exercise offline, PWA manifest, Kiosk reset, search, training and report flows.
5. Record verified and external-pending results, commit and push `main`.
