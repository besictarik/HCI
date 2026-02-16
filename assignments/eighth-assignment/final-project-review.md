# Scholia - Final Project Review

## 1. Project Summary
Scholia is a modern learning platform built to provide short, practical, project-based online courses with a clean and focused user experience. The project was designed for students and early-career learners who want faster, more structured learning paths than typical long-form course platforms.

The final result demonstrates a full-stack implementation with a public marketing/content layer, a protected customer learning flow, and a CMS-powered admin experience.

## 2. Scope Delivered
The final implementation includes:

- Customer authentication flow:
  - Register
  - Login
  - Logout
- Payload CMS integration for content and data management
- Courses module:
  - Courses list page
  - Server-side search/filtering through URL params
  - Pagination + configurable "show per page"
  - Course preview page
  - Learn page with lesson navigation
  - Lesson completion tracking
- News/Articles module powered by CMS content
- Account page with purchased courses and progress state
- Responsive behavior for desktop and mobile (including mobile navigation and learn sidebar behavior)

Out-of-scope/left minimal by intent:
- Real payment processing
- Advanced role/permission matrix beyond current needs
- Formal automated test suite

## 3. Technical Implementation
### Stack
- Next.js (App Router)
- TypeScript
- Payload CMS
- PostgreSQL
- Tailwind CSS
- shadcn/ui components

### Architecture
- Route-based component locality was used (`/app/[route]/_components/...`).
- CMS collections were split by responsibility (admin users vs customers, content vs enrollment/progress data).
- Server Components were used by default, with Client Components only for interaction-heavy or session-dependent UI.

### Endpoint Extension
A custom endpoint was added through the `Courses` collection to support efficient CTA state resolution for course preview:
- `GET /api/courses/access?courseId=...`
- Returns `isCustomer` and `isEnrolled`

This reduced the previous client waterfall from two requests into one.

## 4. UX and Frontend Quality
Key UX improvements delivered:

- Mobile-accessible navbar with drawer-style menu
- Learn page mobile lesson navigation (drawer trigger in top bar)
- Form quality upgrades (validation feedback, reduced layout shift)
- Active nav state support
- Improved responsive spacing/stacking on key pages

The design aims to be minimal and premium while keeping interaction behavior clear and predictable.

## 5. CMS and Data Model
Main data structures implemented in Payload:

- `users` (CMS/admin auth)
- `customers` (platform/auth users)
- `media`
- `articles`
- `courses`
- `enrollments`
- `lesson-progress`
- `home` global

A key architectural decision was separating CMS auth (`users`) from app/customer auth (`customers`). This avoids coupling admin access with learner access and keeps domain responsibilities clearer.

## 6. Performance and Caching
Optimization approach used:

- Cached server data helpers for course list/details/content
- Tag-based revalidation integration where relevant
- URL-driven filters and pagination executed server-side
- Course preview page refactored to static-first rendering:
  - Page content is data-driven (course content)
  - Personalized CTA logic moved into a Suspense-wrapped client island

This supports better rendering performance while preserving personalized UX.

## 7. Challenges and Resolutions
During development, the project addressed:

- Next.js/Payload version compatibility and dependency conflicts
- Auth flow coordination between CMS and customer-facing app behavior
- Revalidation strategy alignment with dynamic content updates
- Responsive navigation issues on small screens
- Render-path cleanup to reduce unnecessary dynamic dependency on request headers

Each issue was resolved with incremental refactors rather than large rewrites to keep progress stable.

## 8. Current Limitations
The project is intentionally course-assignment scoped, so current limitations include:

- No production payment gateway integration
- No comprehensive automated tests yet
- Some areas use lightweight fallback UX instead of enterprise-level state orchestration
- Build/deploy robustness still depends on environment configuration quality (DB/connectivity, lint config consistency)

## 9. Final Evaluation
The final project demonstrates the expected full-stack competencies for grading purposes:

- Practical system design decisions
- CMS integration with meaningful data modeling
- Authentication and protected user interactions
- Responsive, interaction-capable frontend implementation
- Performance-aware rendering strategy in Next.js

Overall, Scholia meets the learning objectives of building a real, modern web application with both product and engineering depth.

## 10. Links
- Production: https://hci-lana-tarik.vercel.app
- Repository: https://github.com/besictarik/HCI
