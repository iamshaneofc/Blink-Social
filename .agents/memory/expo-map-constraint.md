---
name: Expo map constraint
description: Environment-specific guidance for native map dependencies in Expo prototypes.
---

For this project, a first-build native map dependency was not available through the package installer, so the map experience should remain dependency-free unless a future task explicitly adds and verifies a supported map package.

**Why:** The mobile preview needs to stay runnable in Expo Go and on web; an unavailable native dependency would make the entire app fail to load.

**How to apply:** Keep using real foreground location permission where appropriate, and represent nearby activity with a branded map surface and ranked markers until a supported map package can be installed and verified.