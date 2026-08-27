# Responsive Web Prototype Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build and publish a high-fidelity responsive Web concept prototype that turns the three approved stratagem samples into a complete museum-to-training learning loop.

**Architecture:** A static React + TypeScript single-page prototype keeps all reviewed content in a typed local content model. UI state selects an exhibit and records one scenario choice; no model provider or backend is implied. The design system is token-first, mobile-first, and leaves the content model reusable by future App and exhibition clients.

**Tech Stack:** React, TypeScript, Vite, Vitest, Testing Library, CSS.

---

### Task 1: Establish the content contract

**Files:**
- Create: `src/content/stratagems.test.ts`
- Create: `src/content/stratagems.ts`

1. Write failing tests for three unique exhibits, five-layer interpretation, source labels, scenario choices, and review dimensions.
2. Run the focused test and confirm it fails because the content module does not exist.
3. Implement the minimum typed content model and the three approved samples.
4. Run the focused test and confirm it passes.

### Task 2: Build the interactive learning loop

**Files:**
- Create: `src/App.test.tsx`
- Create: `src/App.tsx`
- Create: `src/main.tsx`
- Create: `src/test/setup.ts`

1. Write failing interaction tests for exhibit switching and training feedback.
2. Run the focused test and confirm it fails because the application module does not exist.
3. Implement the museum header, exhibit selector, comic sequence, philosophy layers, scenario decision, and four-part review.
4. Run all tests and confirm they pass.

### Task 3: Apply the visual system and responsive behavior

**Files:**
- Create: `tokens.css`
- Create: `src/styles.css`
- Create: `.hallmark/preflight.json`
- Create: `.hallmark/log.json`
- Create: `index.html`

1. Implement the Almanac token set using OKLCH colors and paired Chinese-safe font stacks.
2. Apply the Workbench macrostructure with N6, H2, F4, C1, and Ft1 archetypes.
3. Cover focus, hover, active, disabled, loading, error, and success states without layout shifts.
4. Verify 320, 375, 414, 768, and desktop widths with no horizontal overflow.

### Task 4: Document and release

**Files:**
- Modify: `README.md`
- Modify: `.gitignore`

1. Document install, test, build, and local preview commands.
2. Run type checking, unit tests, production build, Hallmark checks, and browser acceptance.
3. Review the diff for secrets and unrelated changes.
4. Commit to `main`, push to `origin`, and verify the remote SHA.
