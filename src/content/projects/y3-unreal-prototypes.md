---
title: "Dreadtome — Prototyping Phase"
category: "Gameplay Prototyping"
summary: "Solo mechanic prototyping for Dreadtome's early exploratory phase — movement, shaders, ability systems, and multiplayer replication in Unreal Engine 5."
thumbnail: "/projects/y3_unreal_prototypes/y3Prototypes.png"
team: "Solo (within a small team project)"
featured: false
order: 6
media:
  - type: video
    src: "/projects/y3_unreal_prototypes/Uncover.mp4"
    caption: "Uncover/scan mechanic — nearby interactable items in the current room get outlined on trigger."
  - type: video
    src: "/projects/y3_unreal_prototypes/GravityShifting.mp4"
    caption: "Gravity-shifting movement — player orientation and physics re-align to a new surface on trigger."
  - type: video
    src: "/projects/y3_unreal_prototypes/GrapplingHook.mp4"
    caption: "Physics-driven grappling hook with object-pulling, before the prototype was shelved."
  - type: video
    src: "/projects/y3_unreal_prototypes/WallMovement.mp4"
    caption: "Wall-movement prototype for the turret enemy, using a 3D pathfinding plugin — later replaced by simpler spline movement."
  - type: video
    src: "/projects/y3_unreal_prototypes/SelectionWheel.mp4"
    caption: "Radial item-selection wheel — hover-to-select and click-to-trigger, later reused in the ability system's targeting UI."
  - type: video
    src: "/projects/y3_unreal_prototypes/AbilitySystem.mp4"
    caption: "GAS-based modular ability system — four demo abilities showing the interface-driven targeting and effect flow."
  - type: video
    src: "/projects/y3_unreal_prototypes/ServerSideMultiplayer.mp4"
    caption: "Two-client platformer demo (host side) built with EIK to validate session hosting and world-object replication."
  - type: video
    src: "/projects/y3_unreal_prototypes/ClientSideMultiplayer.mp4"
    caption: "Same demo from the client side, showing joining and replicated dynamic-object state."
---

During the ~2-month exploratory/prototyping phase of Dreadtome, a team project, I built out a series of fast, standalone gameplay prototypes in Unreal Engine 5 to test which mechanics were worth pursuing. While Dreadtome was a team project, this exploratory work was done entirely solo — each prototype was built, tested, and shared back with the team for feedback before any decision was made on what to carry into production.

**Repo:** [prototypes for 5.4](https://github.com/Ligaan/Prototyping)

## What I did

- An **uncover/scan mechanic**, revealing nearby interactable items in the player's current room with an outline shader — later reused as the base for the ability system's targeting outline
- A **gravity-shifting movement mechanic** (Manifold Garden–inspired), including solving player/camera orientation coherence across gravity changes
- A **grappling hook mechanic** with physics-driven movement and object-pulling, later abandoned when a teammate had prior work in the same space
- A **radial item/weapon-selection wheel** (GTA 5–style UI), later reused as part of the ability system's targeting UI
- A **wall-movement prototype for a turret enemy**, using a third-party 3D pathfinding plugin to let it navigate across walls — later dropped in favor of a simpler spline-based movement once the team scoped the turret down to occasional movement only
- A **Gameplay Ability System (GAS)**-based modular ability system inspired by *Watch Dogs 2*'s hacking mechanic — interface-driven abilities that any actor could support, with four demo abilities built to prove the concept
- **Multiplayer/replication research and prototyping**: tried PlayFab first (abandoned after a broken 5.4 update with no resolution from their support), moved to Epic Online Services' EOS subsystem, then to the community EIK plugin after EOS session creation issues persisted across SDK versions — validated with a small two-client platformer demo built specifically to test replication of dynamic, physics-simulated objects

## Contributions

Each prototype went through the same loop: build a minimal working version, share it in the team's show-and-tell, and use that feedback to decide whether it was worth continuing. That process is what ruled several mechanics out early — gravity shifting worked technically but didn't suit a fast-paced first-person shooter, the grappling hook was cut once it overlapped with a teammate's existing work, and the wall-movement plugin was dropped once the team scoped the turret enemy down to occasional movement, making the full 3D navigation solution overkill — while validating others (the outline shader and selection wheel) as reusable pieces that carried directly into the ability system prototype.

The multiplayer research followed the same "fail fast, don't force a bad fit" approach at a larger scale: PlayFab looked reasonable on paper but had too little Unreal-specific support to debug within the available time, so the move to EOS and then EIK was driven by hitting real documentation and API walls, not just picking differently up front.

## Result
A working set of standalone prototypes — most importantly the outline shader, selection wheel, and modular ability system — that fed directly into Dreadtome's production phase, plus a validated (if imperfect) peer-to-peer multiplayer replication pipeline for future use.