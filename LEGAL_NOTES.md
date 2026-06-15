# S-parks V5 Legal And Safety Notes

## Current Status

This folder is a static V5 UI prototype. It is not a production marketplace and does not include full production authentication, payments, uploads, licensing records, or server-side moderation.

## Image And Asset Sources

- Several images are still remote generated-image URLs from the Stitch export workflow.
- These are acceptable for internal prototype review only unless the source license and commercial usage rights are confirmed.
- Before public commercial launch, replace remote prototype images with licensed, self-hosted assets and keep a source/license record for each file.

## Security Boundary

- No API keys, OAuth secrets, payment keys, database URLs, or environment variables should be committed to this static project.
- Real login, upload, purchase, member points, creator revenue, and admin moderation must be implemented server-side.
- Production features must include authentication, authorization, input validation, upload scanning, rate limiting, audit logs, abuse reporting, and secure storage.

## Product Notes

The V5 prototype reflects the latest curated concept: AIGC video creators can discover character sheets, scene references, styling assets, prompts, creator profiles, creator onboarding, purchase/licensing flows, and role-based account workspaces. The actual commercial workflow should be reviewed legally before launch.
