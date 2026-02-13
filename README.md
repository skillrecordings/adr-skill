# ADR Skill

Architecture Decision Records for agentic coding workflows. ADRs are written so a coding agent can read one and implement the decision without further clarification. Humans review and approve.

## Install

```bash
npx skills add skillrecordings/adr-skill
```

## What It Does

Uses a three-phase workflow to produce high-quality, agent-readable ADRs:

1. **Capture Intent** — Socratic questioning to understand the decision space before writing anything. Asks targeted questions one at a time to surface constraints, tradeoffs, and unstated assumptions.
2. **Draft the ADR** — Generates a structured ADR from captured intent using MADR 4.0-aligned templates.
3. **Review** — Validates the draft against an agent-readiness checklist. Could an agent implement this from the ADR alone? Are consequences actionable? Is scope bounded?

## What's Inside

```
skills/adr-skill/
├── SKILL.md                          # Main skill definition (three-phase workflow)
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

- **Agent-first**: Constraints must be explicit and measurable. Decisions must be specific enough to act on. Consequences must map to concrete tasks. No tribal knowledge assumptions.
- **Socratic before writing**: The skill interviews the human before drafting. This captures intent and surfaces the "why" that typically gets lost.
- **MADR 4.0 aligned**: Templates use YAML front matter for metadata (status, date, decision-makers, consulted, informed), include a Confirmation section, and support Good/Bad/Neutral arguments.
- **Two template tiers**: Simple (context → decision → consequences) for straightforward choices. MADR (drivers → options → outcome → pros/cons) for complex tradeoffs.

## Sources / Prior Art

- [MADR](https://adr.github.io/madr/) — Markdown Architectural Decision Records (template structure, YAML front matter, RACI fields, Confirmation section)
- [macromania/adr-agent](https://github.com/macromania/adr-agent) — Socratic questioning approach for ADR creation
- Michael Nygard, ["Documenting architecture decisions"](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) — Status/Context/Decision/Consequences structure
- Joel Parker Henderson, [`architecture-decision-record`](https://github.com/joelparkerhenderson/architecture-decision-record) — ADR overview, naming conventions, template collection
