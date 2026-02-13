# Template Variants

This skill ships two templates in `assets/templates/`.

## Simple

File: `assets/templates/adr-simple.md`

Use this when:

- The decision is straightforward (one clear winner, minimal tradeoffs)
- You mainly need "why, what, consequences"
- Alternatives are few and can be dismissed in a sentence each
- Speed matters more than exhaustive comparison

Sections: Context and Problem Statement → Decision → Consequences → Alternatives Considered (optional) → More Information (optional).

## MADR (Options-Heavy)

File: `assets/templates/adr-madr.md`

Use this when:

- You have multiple real options and want to document structured tradeoffs
- You need to capture decision drivers explicitly (what criteria mattered)
- The decision is likely to be revisited and the comparison needs to survive
- Stakeholders need to see the reasoning process, not just the outcome

Sections: Context and Problem Statement → Decision Drivers (optional) → Considered Options → Decision Outcome → Consequences → Confirmation (optional) → Pros and Cons of the Options (optional) → More Information (optional).

This template aligns with [MADR 4.0](https://adr.github.io/madr/).

## Both Templates Share

- **YAML front matter** for metadata (status, date, decision-makers, consulted, informed)
- **Agent-first framing**: placeholder text prompts you to be specific, measurable, and self-contained
- **"More Information" section** for cross-links, follow-ups, and revisit triggers (replaces the older "Links" section)
- **"Neutral, because..."** as a third argument category alongside Good and Bad

## Choosing Between Them

| Signal | Use Simple | Use MADR |
|--------|-----------|----------|
| Number of real options | 1–2 | 3+ |
| Team size affected | Small / solo | Cross-team |
| Reversibility | Easily reversed | Hard to undo |
| Expected lifetime | Months | Years |
| Needs stakeholder review | No | Yes |

When in doubt, start with Simple. You can always expand to MADR if the discussion reveals more complexity.
