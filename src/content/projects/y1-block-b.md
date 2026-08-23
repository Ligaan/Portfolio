---
title: "Year 1, Block B — Raspberry Pi Tank RTS"
category: "Foundations"
summary: "A tank RTS in C++/OpenGL ES for Raspberry Pi 4, with Bullet physics, custom shaders, and procedural terrain."
thumbnail: "/projects/y1-block-b.jpg"
team: "Solo"
featured: false
order: 10
---

An unnamed tank RTS built from scratch in C++, targeting Raspberry Pi 4 with OpenGL ES 3.0, using Bullet for physics and custom shaders.

## What I did

- Built a **cross-platform C++ framework** running on both Raspberry Pi 4 and PC, including the full Pi-side build/deploy/debug workflow
- Implemented **OpenGL ES 3.0 rendering with custom shaders**: Phong lighting (diffuse/specular, supporting multiple light types), multi-mesh model loading (a 6-mesh tank model with independently rotating turret)
- Used **Bullet physics** for the dynamic world: convex hull collision for tank models, custom collision filtering (terrain-only raycasting for cursor-to-world picking), and a custom collision callback
- Built **procedurally generated terrain** (Perlin-noise heightmaps with height-based texture blending) across 3 levels of increasing difficulty
- Implemented **stencil-buffer outlining** for unit selection and basic enemy tank AI

## Result
A playable, winnable 3-level tank RTS running natively on Raspberry Pi 4 hardware — real embedded-platform deployment experience on top of the usual gameplay/rendering work.