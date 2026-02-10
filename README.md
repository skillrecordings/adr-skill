# ADR Skill

Install:

```bash
npx skills add skillrecordings/adr-skill
```

What it does:

- Creates and maintains Architecture Decision Records (ADRs) in git repos.
- Bootstraps an `adr/` directory with an index and an initial "Adopt ADRs" decision.

Repo contents:

- The skill lives in `skills/adr-skill/SKILL.md` (plus `skills/adr-skill/scripts`, `skills/adr-skill/assets`, `skills/adr-skill/references`).

Packaging:

- `npx skills add ...` installs from the GitHub repo (`owner/repo`). It does not require a committed `dist/` artifact.
- `dist/` is intentionally ignored by git. You don't need a packaged artifact checked in for Skills distribution.

Sources / prior art:

- Joel Parker Henderson, `architecture-decision-record` (ADRs overview, naming conventions, template collection).
- Michael Nygard, "Documenting architecture decisions" (Status/Context/Decision/Consequences structure).
- MADR project (decision drivers, considered options, outcome, pros/cons structure).
