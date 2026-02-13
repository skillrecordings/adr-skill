---
name: adr-skill
description: Create and maintain Architecture Decision Records (ADRs) optimized for agentic coding workflows. Use when you need to propose, write, update, accept/reject, deprecate, or supersede an ADR; bootstrap an adr folder and index; consult existing ADRs before implementing changes; or enforce ADR conventions. This skill uses Socratic questioning to capture intent before drafting, and validates output against an agent-readiness checklist.
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

## When to Write an ADR

Write an ADR when a decision:
- **Changes how the system is built or operated** (new dependency, architecture pattern, infrastructure choice, API design)
- **Is hard to reverse** once code is written against it
- **Affects other people or agents** who will work in this codebase later
- **Has real alternatives** that were considered and rejected

Do NOT write an ADR for:
- Routine implementation choices within an established pattern
- Bug fixes or typo corrections
- Decisions already captured in an existing ADR (update it instead)
- Style preferences already covered by linters or formatters

When in doubt: if a future agent working in this codebase would benefit from knowing *why* this choice was made, write the ADR.

## Creating an ADR: Four-Phase Workflow

Every ADR goes through four phases. Do not skip phases.

### Phase 0: Scan the Codebase

Before asking any questions, gather context from the repo:

1. **Find existing ADRs.** Check `docs/decisions/`, `adr/`, `docs/adr/`, `decisions/` for existing records. Read them. Note:
   - Existing conventions (directory, naming, template style)
   - Decisions that relate to or constrain the current one
   - Any ADRs this new decision might supersede

2. **Check the tech stack.** Read `package.json`, `go.mod`, `requirements.txt`, `Cargo.toml`, or equivalent. Note relevant dependencies and versions.

3. **Find related code patterns.** If the decision involves a specific area (e.g., "how we handle auth"), scan for existing implementations. The ADR should reference what exists today, not assume a blank slate.

4. **Note what you found.** Carry this context into Phase 1 — it will sharpen your questions and prevent the ADR from contradicting existing decisions.

### Phase 1: Capture Intent (Socratic)

Interview the human to understand the decision space. Ask questions **one at a time**, building on previous answers. Do not dump a list of questions.

**Core questions** (ask in roughly this order, skip what's already clear from context or Phase 0):

1. **What are you deciding?** — Get a short, specific title. Push for a verb phrase ("Choose X", "Adopt Y", "Replace Z with W").
2. **Why now?** — What broke, what's changing, or what will break if you do nothing? This is the trigger.
3. **What constraints exist?** — Tech stack, timeline, budget, team size, existing code, compliance. Be concrete. Reference what you found in Phase 0 ("I see you're already using X — does that constrain this?").
4. **What does success look like?** — Measurable outcomes. Push past "it works" to specifics (latency, throughput, DX, maintenance burden).
5. **What options have you considered?** — At least two. For each: what's the core tradeoff? If they only have one option, help them articulate why alternatives were rejected.
6. **What's your current lean?** — Capture gut intuition early. Often reveals unstated priorities.
7. **Who needs to know or approve?** — Decision-makers, consulted experts, informed stakeholders.
8. **What would you tell an agent implementing this?** — This surfaces the practical context that often gets left out. What files to touch, what patterns to follow, what to avoid.

**Adaptive follow-ups**: Based on answers, probe deeper where the decision is fuzzy. Common follow-ups:
- "What's the worst-case outcome if this decision is wrong?"
- "What would make you revisit this in 6 months?"
- "Is there anything you're explicitly choosing NOT to do?"
- "What prior art or existing patterns in the codebase does this relate to?"
- "I found [existing ADR/pattern] — does this new decision interact with it?"

**When to stop**: You have enough when you can mentally draft every section of the ADR without making things up. If you're guessing at any section, ask another question.

**Intent Summary Gate**: Before moving to Phase 2, present a structured summary of what you captured and ask the human to confirm or correct it:

> **Here's what I'm capturing for the ADR:**
>
> - **Title**: {title}
> - **Trigger**: {why now}
> - **Constraints**: {list}
> - **Options**: {option 1} vs {option 2} [vs ...]
> - **Lean**: {which option and why}
> - **Non-goals**: {what's explicitly out of scope}
> - **Related ADRs/code**: {what exists that this interacts with}
>
> **Does this capture your intent? Anything to add or correct?**

Do NOT proceed to Phase 2 until the human confirms the summary.

### Phase 2: Draft the ADR

1. **Choose the ADR directory.**
   - If one exists (found in Phase 0), use it.
   - If none exists, create `docs/decisions/` (MADR default) or `adr/` (simpler repos).

2. **Choose a filename strategy.**
   - If existing ADRs use numeric prefixes (`0001-...`), continue that.
   - Otherwise use slug-only filenames (`choose-database.md`).

3. **Choose a template.**
   - Use `assets/templates/adr-simple.md` for straightforward decisions (one clear winner, minimal tradeoffs).
   - Use `assets/templates/adr-madr.md` when you need to document multiple options with structured pros/cons/drivers.
   - See `references/template-variants.md` for guidance.

4. **Fill every section from the confirmed intent summary.** Do not leave placeholder text. Every section should contain real content or be removed (optional sections only).

5. **Reference existing code and ADRs.** Link to specific files, functions, or prior ADRs discovered in Phase 0. The ADR should situate the decision in the codebase, not float in the abstract.

6. **Generate the file.**
   - Preferred: run `scripts/new_adr.js` (handles directory, naming, and optional index updates).
   - If you can't run scripts, copy a template from `assets/templates/` and fill it manually.

### Phase 3: Review Against Checklist

After drafting, review the ADR against the agent-readiness checklist in `references/review-checklist.md`.

**Present the review as a summary**, not a raw checklist dump. Format:

> **ADR Review**
>
> ✅ **Passes**: {list what's solid — e.g., "context is self-contained, constraints are measurable, consequences include follow-up tasks"}
>
> ⚠️ **Gaps found**:
> - {specific gap 1 — e.g., "Non-goals not stated — could an agent accidentally scope-creep into X?"}
> - {specific gap 2}
>
> **Recommendation**: {Ship it / Fix the gaps first / Needs more Phase 1 work}

Only surface failures and notable strengths — do not recite every passing checkbox.

If there are gaps, propose specific fixes. Do not just flag problems — offer solutions and ask the human to approve.

Do not finalize until the ADR passes the checklist or the human explicitly accepts the gaps.

## Consulting ADRs (Read Workflow)

Agents should read existing ADRs **before implementing changes** in a codebase that has them. This is not part of the create-an-ADR workflow — it's a standalone operation any agent should do.

### When to Consult ADRs

- Before starting work on a feature that touches architecture (auth, data layer, API design, infrastructure)
- When you encounter a pattern in the code and wonder "why is it done this way?"
- Before proposing a change that might contradict an existing decision
- When a human says "check the ADRs" or "there's a decision about this"

### How to Consult ADRs

1. **Find the ADR directory.** Check `docs/decisions/`, `adr/`, `docs/adr/`, `decisions/`. Also check for an index file (`README.md` or `index.md`).

2. **Scan titles and statuses.** Read the index or list filenames. Focus on `accepted` ADRs — these are active decisions.

3. **Read relevant ADRs fully.** Don't just read the title — read context, decision, consequences, and non-goals. The constraints and non-goals are especially important for implementation.

4. **Respect the decisions.** If an accepted ADR says "use PostgreSQL," don't propose switching to MongoDB without creating a new ADR that supersedes it. If you find a conflict between what the code does and what the ADR says, flag it to the human.

5. **Reference ADRs in your work.** When implementing a feature guided by an ADR, mention which ADR you're following. This creates a paper trail.

## Other Operations

### Update an Existing ADR

1. Identify the intent:
   - **Accept / reject**: change status, add any final context.
   - **Deprecate**: status → `deprecated`, explain replacement path.
   - **Supersede**: create a new ADR, link both ways (old → new, new → old).
   - **Add learnings**: append to `## More Information` with a date stamp. Do not rewrite history.

2. Use `scripts/set_adr_status.js` for status changes (supports YAML front matter, bullet status, and section status).

### Post-Acceptance Lifecycle

After an ADR is accepted:

1. **Create implementation tasks.** Each consequence and follow-up identified in the ADR should become a trackable task (issue, ticket, or TODO).
2. **Reference the ADR in PRs.** When implementing the decision, link to the ADR in PR descriptions so the reasoning is discoverable.
3. **Update status after implementation.** If the Confirmation section defined verification criteria, check them. Note in `## More Information` when implementation was completed.
4. **Revisit when triggers fire.** If the ADR specified revisit conditions ("if X happens, reconsider"), monitor for those conditions.

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

This creates the directory, an index file, and a filled-out first ADR ("Adopt architecture decision records") with real content explaining why the team is using ADRs. Use `--json` for machine-readable output. Use `--dir` to override the directory name.

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
