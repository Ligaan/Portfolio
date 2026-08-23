---
title: "Dreadtome"
category: "Shipped Game"
summary: "Unreal Engine 5 team production — save system, enemy AI, and an automated profiling pipeline."
thumbnail: "/projects/dreadtome.jpg"
team: "Team of ~10 (Team Seven)"
featured: true
order: 4
links:
  itch: ""
  video: ""
---

Dreadtome is a hard-difficulty action game made in Unreal Engine 5 with a team of around 10 developers. My role covered enemy AI, gameplay programming, and — over the course of production — I became the long-term owner of two core systems: the save/checkpoint system and the team's profiling pipeline.

## What I did

- Designed and rebuilt the **save/checkpoint system** through 3 major iterations as level design requirements evolved, ending in a generalized, interface-based save/restore contract used for both gameplay state and settings persistence
- Built an **automated profiling pipeline** (in-editor widget, Perforce-integrated) that the whole team used to catch performance issues across multiple scalability settings
- Refactored and iterated on **enemy AI** (turret and crawler enemies), including converting behavior-tree logic to a tick-based system and implementing proportional-navigation homing for enemy projectiles
- Fixed a shipping-build issue where profiling/editor-only modules broke the packaging process
- Before full production, prototyped solo mechanics for the team's direction phase: a gravity-shifting movement mechanic, a stencil-outline highlight shader, a grappling hook, and an early GAS-based ability system
- Early production **enemy AI systems**: attack behavior, a customized third-party 3D navmesh/pathfinding plugin modified for wall navigation, spline-based turret movement, and path randomization for more organic enemy movement

## Contributions

The save system's story is really the story of the project's scope changing under it. It started as a simple "reset to a backup on death" system for linear levels. When level design introduced branching, non-linear exploration paths, the rules for what needed saving and when got a lot more complicated, so the system needed a rework to handle that. Later, as more dynamic per-object state needed saving, I settled on an interface-based contract — actors implement a "serialize to string array" / "restore from string array" pair — rather than hand-coding cases per object type. That same contract ended up getting reused by the UI team to persist player settings (key bindings, display options), which wasn't the original use case but fit cleanly because of how the system was designed.

The profiling pipeline came from a similar need for something that didn't require manual, one-off effort every time someone wanted performance data. It runs the stress-test level across scalability settings, captures trace data, and moves the resulting files to Perforce and the team's trace store automatically. I iterated on it based on team feedback (one pass cut per-session profiling time by more than half) and fixed cross-machine issues that only showed up once a teammate on a different setup started relying on it.

On the enemy AI side, the crawler enemy went through several iterations — first converting its behavior tree to a tick-based implementation (a team-wide direction), then multiple passes on movement, attack, and state-transition feel based on playtest and teammate feedback, eventually preparing it for procedural animation.

## Release

Dreadtome shipped as the team's full production for the block. The save system remained one of the game's core systems throughout — the game leans into a harder difficulty where dying is expected, so save/checkpoint reliability directly affected the intended player experience. The profiling pipeline stayed in active use by the team through the rest of production.