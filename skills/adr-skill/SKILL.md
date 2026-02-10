---
name: adr-skill
description: Create and maintain Architecture Decision Records (ADRs) in git repos. Use when you need to propose, write, update, accept/reject, deprecate, or supersede an ADR; bootstrap an adr folder and index; or enforce ADR conventions (status, dates, links, and filenames) for markdown decision logs.
---

# ADR Skill

## Overview

Create high-signal ADRs that capture the "why" behind architecture choices, and keep the ADR log tidy as the system evolves.

## Workflow Decision Tree

1. Determine the request type:
- **Create a new ADR**: Follow "New ADR" below.
- **Update an existing ADR** (status change, add learnings, supersede): Follow "Update ADR" below.
- **Fix or create an ADR index/log**: Follow "Index" below.
- **Adopt ADRs in a repo that has none**: Follow "Bootstrap" below.

2. If the repo already has an ADR convention, follow it:
- Directory: `adr/`, `docs/adr/`, `docs/decisions/`, etc.
- Filenames: `choose-database.md` or `0001-choose-database.md`, etc.
- Template: simple vs option-heavy.

If the repo has no convention yet, default to:
- Directory: `adr/`
- Filenames: numbered, then slug (e.g., `0001-choose-database.md`)
- Template: `assets/templates/adr-simple.md`

## New ADR

1. Choose the ADR directory.
- If one exists, use it.
- If none exists, create `adr/` (or the user's preferred directory).

2. Choose a filename strategy.
- If existing ADRs use numeric prefixes (e.g., `0001-...`), continue that.
- Otherwise use slug-only filenames (e.g., `choose-database.md`).

3. Choose a template.
- Use `assets/templates/adr-simple.md` for most decisions.
- Use `assets/templates/adr-madr.md` when you need to document options, pros/cons, and drivers.

4. Gather inputs (minimum viable ADR).
- Title: short, actionable, ideally verb phrase.
- Status: usually `proposed` initially.
- Context: the constraint, requirement, and why this matters now.
- Decision: the actual choice, not the story.
- Consequences: what gets easier/harder, follow-ups, migration costs, risks.

5. Generate the file.
- Preferred: run `scripts/new_adr.js` (it handles directory, naming strategy, and optional index updates).
- If you can't run scripts, copy a template from `assets/templates/` and fill it manually.

### Script: new_adr.js

From the target repo root:

```bash
node /path/to/adr-skill/scripts/new_adr.js --title "Choose database" --status proposed
```

If you want MADR-style:

```bash
node /path/to/adr-skill/scripts/new_adr.js --title "Choose database" --template madr --status proposed
```

Notes:
- The script tries to auto-detect the ADR directory and filename strategy.
- Use `--dir` and `--strategy` to override.
- Use `--json` to emit machine-readable output for tooling.

## Update ADR

1. Identify the intent:
- **Accept / reject**: change status, and add any final context that made the decision clear.
- **Deprecate**: status becomes `deprecated` and explain replacement path.
- **Supersede**: create a new ADR and link both ways (old points to new; new references old).
- **Add learnings**: append an "After-action" note with a date stamp rather than rewriting history.

2. Keep it navigable:
- Link to PRs/issues, tickets, docs.
- Prefer small edits that explain why reality diverged from the original assumptions.

## Index

If the repo has an ADR index/log file (often `adr/README.md` or `adr/index.md`), keep it updated.

Preferred: let `scripts/new_adr.js --update-index` do it. Otherwise:
- Add a bullet entry for the new ADR.
- Keep ordering consistent (numeric order if numbered; alphabetical or date order if slugs).

## Bootstrap

When introducing ADRs to a repo that has none:

Preferred: run `scripts/bootstrap_adr.js`, which:

1. Creates the directory `adr/`.
2. Creates an index file `adr/README.md`.
3. Creates the first ADR (meta decision): "Adopt architecture decision records".

Example:

```bash
node /path/to/adr-skill/scripts/bootstrap_adr.js
```

If you want machine-readable output:

```bash
node /path/to/adr-skill/scripts/bootstrap_adr.js --json
```

## Resources

Read these when you need more detail or want to align with common ADR conventions:

### scripts/
- `scripts/new_adr.js`: create a new ADR file from a template, using repo conventions.
- `scripts/set_adr_status.js`: update an ADR status in-place (supports the included templates). Use `--json` for machine output.
- `scripts/bootstrap_adr.js`: create `adr/README.md` plus the initial "Adopt ADRs" decision.

### references/
- `references/adr-conventions.md`: directory + filename conventions and lifecycle guidance.
- `references/template-variants.md`: when to use simple vs MADR-style templates.

### assets/
- `assets/templates/adr-simple.md`: a small template for most ADRs.
- `assets/templates/adr-madr.md`: a bigger template for decisions with real options/tradeoffs.
- `assets/templates/adr-readme.md`: default ADR index scaffold used by `scripts/bootstrap_adr.js`.
