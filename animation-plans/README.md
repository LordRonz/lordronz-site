# Animation audit

The homepage should feel responsive, not busy. These plans keep content
immediately readable and reserve motion for feedback or a short decorative
accent.

| Priority | Plan                                                                | Outcome                                                                   |
| -------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| High     | [001 — Tighten button feedback](./001-tighten-button-feedback.md)   | Fast, transform-only press and hover feedback without layout shifts       |
| Medium   | [002 — Settle the homepage shine](./002-settle-homepage-shine.md)   | One intentional light pass instead of perpetual decoration                |
| Medium   | [003 — Make ambient motion safe](./003-make-ambient-motion-safe.md) | Reduced-motion support and cleanup for long-running footer/status effects |

Rejected: hero text entrances (delays the LCP), cursor-following/parallax
decoration (continuous pointer work), and animated body copy (motion on
information the user is trying to read).
