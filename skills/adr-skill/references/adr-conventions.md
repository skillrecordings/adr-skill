# ADR Conventions (Reference)

This skill's default conventions are based on common ADR practices and the `architecture-decision-record` reference repo by Joel Parker Henderson.

## Directory

If the repo already has an ADR directory, keep it.

If the repo has no ADR directory, a pragmatic default is:

- `adr/`

Reference: `architecture-decision-record` README.md, "How to start using ADRs with git" suggests creating an `adr` directory.

## Filename Conventions

Prefer a present-tense imperative verb phrase, lowercase, with dashes:

- `choose-database.md`
- `format-timestamps.md`
- `manage-passwords.md`

Reference: `architecture-decision-record` README.md, "File name conventions for ADRs".

If a repo already uses numeric prefixes, stick with that convention:

- `0001-choose-database.md`
- `0002-format-timestamps.md`

## Minimal Sections

At minimum, every ADR should clearly include:

1. Context: why the decision exists now, what constraints/drivers apply.
2. Decision: what is chosen.
3. Consequences: what becomes easier/harder, risks, costs, follow-ups.

Reference: `architecture-decision-record` templates and guidance emphasize context + decision + consequences as the core.

## Status Values

Common statuses (pick what matches the repo's existing taxonomy):

- `proposed`
- `accepted`
- `rejected`
- `deprecated`
- `superseded`

If superseded, include a link to the newer ADR.

## Mutability

Idealized ADR guidance tends to say "don't rewrite history"; practical teams often treat ADRs as living documents.

If editing an existing ADR:

- Prefer appending new information with a date stamp.
- If the decision is replaced, create a new ADR and explicitly supersede the old one.

Reference: `architecture-decision-record` README.md, "Suggestions for writing good ADRs" and "Teamwork advice for ADRs" discuss immutability vs living documents.

