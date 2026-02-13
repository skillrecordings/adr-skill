# ADR Skill

Architecture Decision Records as executable specifications for coding agents. An agent reads the ADR and implements the decision. A human reviews and approves.

## Install

```bash
npx skills add skillrecordings/adr-skill
```

## What It Does

Uses a four-phase workflow to produce ADRs that agents can implement from directly:

0. **Scan the Codebase** — Read existing ADRs, check the tech stack, find related code patterns. Context before questions.
1. **Capture Intent** — Socratic questioning to understand the decision space. One question at a time. Ends with an intent summary the human confirms before anything gets written.
2. **Draft the ADR** — Generate a structured ADR including an implementation plan (affected files, patterns to follow/avoid, dependencies, verification criteria).
3. **Review** — Validate against an agent-readiness checklist. Could an agent implement this from the ADR alone? Are verification criteria testable? Is the implementation plan specific?

## What's Inside

```
skills/adr-skill/
├── SKILL.md                          # Main skill definition (four-phase workflow)
├── assets/templates/
│   ├── adr-simple.md                 # Lean template for straightforward decisions
│   ├── adr-madr.md                   # MADR 4.0 template with options/drivers/pros/cons
│   └── adr-readme.md                 # Index scaffold for bootstrap
├── references/
│   ├── review-checklist.md           # Agent-readiness checklist for Phase 3
│   ├── examples.md                   # Filled-out short + long ADR examples
│   ├── adr-conventions.md            # Directory, filename, status, lifecycle conventions
│   └── template-variants.md          # When to use simple vs MADR
└── scripts/
    ├── new_adr.js                    # Create a new ADR (auto-detects conventions)
    ├── set_adr_status.js             # Update status (YAML front matter or inline)
    └── bootstrap_adr.js              # Initialize ADRs in a repo
```

## Key Design Choices

- **ADRs as executable specs**: Every ADR includes an Implementation Plan (affected files, dependencies, patterns, config changes) and Verification criteria (checkboxes an agent can validate). The ADR is the work order.
- **Socratic before writing**: The skill interviews the human before drafting. An intent summary gate ensures the human confirms what's being captured before any file is generated.
- **Codebase-aware**: Phase 0 scans existing ADRs, tech stack, and related code. The ADR references specific files and patterns, not abstractions.
- **Bidirectional code linking**: ADRs name the files they govern. Code comments reference ADRs back (`// ADR-0004`). Navigable both directions.
- **Proactive triggers**: Agents are instructed to recognize when they're making an ADR-worthy decision mid-coding and propose capturing it.
- **MADR 4.0 aligned**: YAML front matter, RACI fields, Good/Bad/Neutral arguments, extended with agent-first sections.

## Sources / Prior Art

- [MADR](https://adr.github.io/madr/) — Markdown Architectural Decision Records (template structure, YAML front matter, RACI fields)
- [macromania/adr-agent](https://github.com/macromania/adr-agent) — Socratic questioning approach for ADR creation
- Michael Nygard, ["Documenting architecture decisions"](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) — Status/Context/Decision/Consequences structure
- Joel Parker Henderson, [`architecture-decision-record`](https://github.com/joelparkerhenderson/architecture-decision-record) — ADR overview, naming conventions, template collection
