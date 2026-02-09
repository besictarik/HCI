# Architecture Contract

This document defines enforced architectural decisions.
The agent MUST follow this document unless explicit approval is given.

## Tech Stack
- Next.js (App Router)
- TypeScript
- React
- Tailwind CSS
- shadcn/ui (when applicable)

## Component Locality
- No global components directory by default
- Components live as close as possible to their usage

Base pattern:
- /app/[route]/_components/

## Component Structure

A component folder represents a single public component.

Example:
Header/
  index.tsx
  title.tsx
  helpers.ts
  data.ts

Rules:
- index.tsx is the public entry point
- Internal files are private
- Helpers and data are colocated when tightly coupled

## Naming Conventions

Files:
- kebab-case (e.g. agent-photo-field.tsx)

Folders:
- PascalCase for components
- Public export via index.tsx

## Reuse & Promotion
- Reusability is not forced
- Duplication is acceptable
- Promotion to shared location requires explicit approval

## Data Fetching
- Server Components by default
- Client Components only when interaction requires

Streaming:
- Allowed via Promise props
- Pages should remain static where possible

## Styling
- Tailwind CSS only
- No inline styles
- No CSS files

## Refactoring
- Approval required before refactors, file moves, or new patterns

## Quality Bar
- UI must aim for a premium look and feel by default
