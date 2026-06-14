# Changelog

All notable changes to S-parks are documented in this file.

## [4.5.0] - 2026-06-14

### Release Ops

- Prepare S-parks V4.5 as an in-place upgrade for the existing `logifore/s-parks-v4` GitHub repository.
- Align repository documentation with the V4.5 release target and add a dedicated changelog for future version pushes.
- Keep the deployment plan on the existing Vercel project instead of creating a separate `v4.5` project.

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
