# Agent Instructions

This file is the primary briefing for Codex and must live at the repository root.

## Authority
- agents/ARCHITECTURE.md is authoritative and immutable
- agents/KNOWLEDGE.md is append-only and serves as the agent’s working memory

## Workflow
1. Propose approach before coding
2. Ask only blocking questions
3. Implement minimal diff
4. Verify correctness and quality
5. Propose knowledge updates if applicable
6. Stop

## Knowledge Capture
- KNOWLEDGE.md is the agent’s working memory for non-obvious, reusable insights.
- When such an insight is discovered, the agent must propose an entry for KNOWLEDGE.md.
- The agent must never write directly; all updates require explicit user approval.
- Proposals must be made at natural stopping points, not mid-task.
- Do not propose entries for obvious or code-visible facts.

## Constraints
- Do not refactor unrelated code
- Do not promote abstractions without approval
- Default to premium UI quality

## Definition of Done
- Feature works as described
- No regressions introduced
- Type check passes
- Do not assume the existence of npm scripts (e.g. typecheck, lint).
- Changes are minimal and intentional
