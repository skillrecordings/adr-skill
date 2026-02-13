# ADR Review Checklist

Use this checklist in Phase 3 to validate an ADR before finalizing. The goal: **could a coding agent read this ADR and implement the decision without asking clarifying questions?**

## Agent-Readiness Checks

### Context & Problem
- [ ] A reader with no prior context can understand why this decision exists
- [ ] The trigger is clear (what changed, broke, or is about to break)
- [ ] No tribal knowledge is assumed — acronyms are defined, systems are named explicitly
- [ ] Links to relevant issues, PRs, or prior ADRs are included

### Decision
- [ ] The decision is specific enough to act on (not "use a better approach" but "use X for Y")
- [ ] Scope is bounded — what's in AND what's out (non-goals)
- [ ] Constraints are explicit and measurable where possible (e.g., "< 200ms p95" not "fast enough")

### Consequences
- [ ] Each consequence is concrete and actionable, not aspirational
- [ ] Follow-up tasks are identified (migrations, config changes, documentation, new tests)
- [ ] Risks are stated with mitigation strategies or acceptance rationale
- [ ] No consequence is a disguised restatement of the decision

### Options (MADR template)
- [ ] At least two options were genuinely considered (not just "do the thing" vs "do nothing")
- [ ] Each option has real pros AND cons (not a straw-man comparison)
- [ ] The justification for the chosen option references specific drivers or tradeoffs
- [ ] Rejected options explain WHY they were rejected, not just what they are

### Confirmation (if included)
- [ ] Verification criteria are specific enough to implement as tests or checks
- [ ] It's clear who/what confirms and when

### Meta
- [ ] Status is set correctly (usually `proposed` for new ADRs)
- [ ] Date is set
- [ ] Decision-makers are listed
- [ ] Title is a verb phrase describing the decision (not the problem)
- [ ] Filename follows repo conventions

## Quick Scoring

Count the checked items. This isn't a gate — it's a conversation tool.

- **All checked**: Ship it.
- **1–3 unchecked**: Discuss the gaps with the human. Most can be fixed in a minute.
- **4+ unchecked**: The ADR needs more work. Go back to Phase 1 for the fuzzy areas.

## Common Failure Modes

| Symptom | Root Cause | Fix |
|---------|-----------|-----|
| "Improve performance" as a consequence | Vague intent | Ask: "improve which metric, by how much, measured how?" |
| Only one option listed | Decision already made, ADR is post-hoc | Ask: "what did you reject and why?" — capture the reasoning |
| Context reads like a solution pitch | Skipped problem framing | Rewrite context as the problem, move solution to Decision |
| Consequences are all positive | Cherry-picking | Ask: "what gets harder? what's the maintenance cost?" |
| "We decided to use X" with no why | Missing justification | Ask: "why X over Y?" — the 'over Y' forces comparison |
