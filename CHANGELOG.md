# Changelog

All notable changes to S-parks are documented in this file.

## [5.0.2] - 2026-06-15

### Release Ops

- Prepare S-parks V5 as the in-place upgrade target for the existing live GitHub and Vercel release chain.
- Align repository, deployment, page-title, and release-document naming to the V5 version line.
- Restrict local test-account fallback to local development surfaces so public deployments do not expose built-in admin access.

### Identity And Roles

- Add role-based account routing for user, creator, and admin entry flows.
- Introduce `assets/js/auth.js` and `assets/js/config.js` to support Supabase-backed login structure and session restore.
- Add role-specific homepage destinations so each account enters the matching workspace after sign-in.

### Admin Workspace

- Add a dedicated admin homepage with review queue summaries, moderation actions, and status transitions.
- Support review-item refresh and review-status updates through the auth client when backend configuration is available.

### Platform Integration

- Add Supabase setup and seed SQL references for profile, review item, and review log structures.
- Document local account mapping and backend setup flow in `SUPABASE_SETUP.md` and `TEST_ACCOUNTS.md`.

### Validation

- Extend the local verification script to cover the V5 role-profile and admin layout expectations.

## [4.5.0] - 2026-06-14

### Release Ops

- Prepare S-parks V4.5 as an in-place upgrade for the existing `logifore/s-parks-v4-5` GitHub repository.
- Align repository documentation with the V4.5 release target and add a dedicated changelog for future version pushes.
- Keep the deployment plan on the existing Vercel project instead of creating a separate `v4.5` project.
- Remove the legacy V3 GitHub/Vercel release and consolidate the live version under the single V4.5 release name.

### UX And Routing

- Persist search keywords and category filters in route parameters so refresh, back, and shared result pages remain stable.
- Extend route parsing and link generation for multi-parameter navigation flows.
- Refine creator menu behavior with delayed close handling for more stable desktop navigation.

### Mobile And Accessibility

- Add mobile navigation modal-state syncing with `inert` focus isolation for the main surface, brand, actions, and footer.
- Strengthen visible focus treatment and feedback states for search results and navigation controls.
- Improve mobile menu semantics with explicit `aria-controls` and expanded-state handling.

### Interface Updates

- Upgrade the home, asset library, and creator-facing layouts to the V4.5 visual pass.
- Improve sticky library navigation, toolbar consistency, and sparse-result placeholder rendering.
- Tune the particle layer and page-tone behavior so lighter surfaces remain clearer and less distracting.

### Validation

- Expand `tests/verify-v4.mjs` to cover V4.5 route-state, navigation, accessibility, and rendering expectations.
