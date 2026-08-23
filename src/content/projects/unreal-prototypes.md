---
title: "Unreal Mechanic Prototypes"
category: "Gameplay Prototyping"
summary: "Solo prototyping of movement mechanics, shaders, and multiplayer replication in Unreal Engine 5."
thumbnail: "/projects/unreal-prototypes.jpg"
team: "Solo (within a small team)"
featured: false
order: 6
---

A block of solo mechanic prototyping in Unreal Engine 5, exploring several unrelated gameplay systems before some fed into later team production work.

## What I did

- A **gravity-shifting movement mechanic** (Manifold Garden–inspired), including solving player/camera orientation coherence across gravity changes
- A **stencil-based outline shader** for highlighting interactable objects
- A **grappling hook mechanic** with physics-driven movement
- A **radial weapon-selection wheel** (Gran Turismo 5–style UI)
- **Multiplayer/replication research**: tried Playfab (dead end — too little Unreal-specific documentation), moved to Epic Online Services, then the community EIK plugin for a working peer-to-peer prototype, including a small platformer demo built specifically to prove replication worked correctly
- A **Gameplay Ability System (GAS)**-based ability system inspired by *Watch Dogs 2*'s hacking mechanic, including an AI-driven "fear" ability built with EQS

## Contributions

The multiplayer path is a good example of iterating past dead ends rather than forcing a bad fit — Playfab looked reasonable on paper but had too little Unreal-specific support to be usable in the time available, so the move to EOS and then EIK was driven by hitting real documentation/API walls, not just picking differently up front.

## Result
Several standalone, working prototypes exploring distinct gameplay systems — useful both as a demonstration of range and as groundwork that informed later production decisions.