---
name: adr-skill
description: Create and maintain Architecture Decision Records (ADRs) optimized for agentic coding workflows. Use when you need to propose, write, update, accept/reject, deprecate, or supersede an ADR; bootstrap an adr folder and index; or enforce ADR conventions. This skill uses Socratic questioning to capture intent before drafting, and validates output against an agent-readiness checklist.
---

# ADR Skill

## Philosophy

ADRs created with this skill are **agent-first**: they are written so that a coding agent can read one and implement the decision without further clarification. Humans review and approve, but the primary consumer is an agent working from the ADR.

This means:
- Constraints must be explicit and measurable, not vibes
- Decisions must be specific enough to act on ("use PostgreSQL 16 with pgvector" not "use a database")
- Consequences must map to concrete follow-up tasks
- Non-goals must be stated to prevent scope creep
- The ADR must be self-contained — no tribal knowledge assumptions

## Three-Phase Workflow

Every ADR goes through three phases. Do not skip Phase 1.

### Phase 1: Capture Intent (Socratic)

Before writing anything, interview the human to understand the decision space. Ask questions **one at a time**, building on previous answers. Do not dump a list of questions.

**Core questions** (ask in roughly this order, skip what's already clear from context):

1. **What are you deciding?** — Get a short, specific title. Push for a verb phrase ("Choose X", "Adopt Y", "Replace Z with W").
2. **Why now?** — What broke, what's changing, or what will break if you do nothing? This is the trigger.
3. **What constraints exist?** — Tech stack, timeline, budget, team size, existing code, compliance. Be concrete.
4. **What does success look like?** — Measurable outcomes. Push past "it works" to specifics (latency, throughput, DX, maintenance burden).
5. **What options have you considered?** — At least two. For each: what's the core tradeoff? If they only have one option, help them articulate why alternatives were rejected.
6. **What's your current lean?** — Capture gut intuition early. Often reveals unstated priorities.
7. **Who needs to know or approve?** — Decision-makers, consulted experts, informed stakeholders.
8. **What would you tell a new engineer (or agent) implementing this?** — This surfaces the practical context that often gets left out.

**Adaptive follow-ups**: Based on answers, probe deeper where the decision is fuzzy. Common follow-ups:
- "What's the worst-case outcome if this decision is wrong?"
- "What would make you revisit this in 6 months?"
- "Is there anything you're explicitly choosing NOT to do?"
- "What prior art or existing patterns in the codebase does this relate to?"

**When to stop**: You have enough when you can mentally draft every section of the ADR without making things up. If you're guessing at any section, ask another question.

### Phase 2: Draft the ADR

1. **Choose the ADR directory.**
   - If one exists (`adr/`, `docs/adr/`, `docs/decisions/`, etc.), use it.
   - If none exists, create `docs/decisions/` (MADR default) or `adr/` (simpler repos).

2. **Choose a filename strategy.**
   - If existing ADRs use numeric prefixes (`0001-...`), continue that.
   - Otherwise use slug-only filenames (`choose-database.md`).

3. **Choose a template.**
   - Use `assets/templates/adr-simple.md` for straightforward decisions (one clear winner, minimal tradeoffs).
   - Use `assets/templates/adr-madr.md` when you need to document multiple options with structured pros/cons/drivers.
   - See `references/template-variants.md` for guidance.

4. **Fill every section from Phase 1 answers.** Do not leave placeholder text. Every section should contain real content or be removed (optional sections only).

5. **Generate the file.**
   - Preferred: run `scripts/new_adr.js` (handles directory, naming, and optional index updates).
   - If you can't run scripts, copy a template from `assets/templates/` and fill it manually.

### Phase 3: Review Against Checklist

After drafting, review the ADR against the agent-readiness checklist in `references/review-checklist.md`. Present findings to the human and iterate.

Key questions the review answers:
- Could an agent implement this decision from the ADR alone?
- Are there ambiguities that would cause an agent to guess or ask for clarification?
- Are consequences actionable (specific tasks, not vague aspirations)?
- Is the scope bounded (what's in AND what's out)?

Do not finalize until the ADR passes the checklist or the human explicitly accepts the gaps.

## Other Operations

### Update an Existing ADR

1. Identify the intent:
   - **Accept / reject**: change status, add any final context.
   - **Deprecate**: status → `deprecated`, explain replacement path.
   - **Supersede**: create a new ADR, link both ways (old → new, new → old).
   - **Add learnings**: append to `## More Information` with a date stamp. Do not rewrite history.

2. Use `scripts/set_adr_status.js` for status changes (supports both YAML front matter and inline status).

### Index

If the repo has an ADR index/log file (often `README.md` or `index.md` in the ADR dir), keep it updated.

Preferred: let `scripts/new_adr.js --update-index` do it. Otherwise:
- Add a bullet entry for the new ADR.
- Keep ordering consistent (numeric if numbered; date or alpha if slugs).

### Bootstrap

When introducing ADRs to a repo that has none:

```bash
node /path/to/adr-skill/scripts/bootstrap_adr.js
```

This creates the directory, an index file, and the first ADR ("Adopt architecture decision records"). Use `--json` for machine-readable output. Use `--dir` to override the directory name.

### Categories (Large Projects)

For repos with many ADRs, organize by subdirectory:

```
docs/decisions/
  backend/
    0001-use-postgres.md
  frontend/
    0001-use-react.md
  infrastructure/
    0001-use-terraform.md
```

Numbers are local to each category. Choose a categorization scheme early (by layer, by domain, by team) and document it in the index.

## Resources

### scripts/
- `scripts/new_adr.js` — create a new ADR file from a template, using repo conventions.
- `scripts/set_adr_status.js` — update an ADR status in-place (YAML front matter or inline). Use `--json` for machine output.
- `scripts/bootstrap_adr.js` — create ADR dir, `README.md`, and initial "Adopt ADRs" decision.

### references/
- `references/review-checklist.md` — agent-readiness checklist for Phase 3 review.
- `references/adr-conventions.md` — directory, filename, status, and lifecycle conventions.
- `references/template-variants.md` — when to use simple vs MADR-style templates.
- `references/examples.md` — filled-out short and long ADR examples.

### assets/
- `assets/templates/adr-simple.md` — lean template for straightforward decisions.
- `assets/templates/adr-madr.md` — MADR 4.0 template for decisions with multiple options and structured tradeoffs.
- `assets/templates/adr-readme.md` — default ADR index scaffold used by `scripts/bootstrap_adr.js`.

### Script Usage

From the target repo root:

```bash
# Simple ADR
node /path/to/adr-skill/scripts/new_adr.js --title "Choose database" --status proposed

# MADR-style with options
node /path/to/adr-skill/scripts/new_adr.js --title "Choose database" --template madr --status proposed

# With index update
node /path/to/adr-skill/scripts/new_adr.js --title "Choose database" --status proposed --update-index

# Bootstrap a new repo
node /path/to/adr-skill/scripts/bootstrap_adr.js --dir docs/decisions
```

Notes:
- Scripts auto-detect ADR directory and filename strategy.
- Use `--dir` and `--strategy` to override.
- Use `--json` to emit machine-readable output.
