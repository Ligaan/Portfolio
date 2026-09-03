---
title: "Year 1 buas, Block B — Raspberry Pi 3D RTS"
category: "Foundations"
summary: "A 3D RTS in C++/OpenGL ES for Raspberry Pi 4, with Bullet physics, custom shaders, and procedural terrain."
thumbnail: "/projects/year1_blockB/image.png"
team: "Solo"
featured: false
order: 10
---

<div class="content-with-video">
  <div class="content-text">

A 3D RTS built from scratch in C++ over a 9-week block with a starting template for the libraries needed and alternative libraries for different builds for PC and raspberry pi 4. Target was Raspberry Pi 4 with OpenGL ES 3.0, using Bullet for physics and custom shaders — the direct follow-up to the framework and rendering groundwork laid in block A with added complexity given by 3D environment and physics along with custom shaders.

## What I did

- Built a **cross-platform C++ framework** running on both Raspberry Pi 4 and PC, including the full Pi-side build/deploy/debug workflow, with a class hierarchy relying on inheritance and polymorphism for the entities used as units
- Implemented **OpenGL ES 3.0 rendering with custom shaders**: Phong lighting (diffuse/specular, supporting multiple light types — point, spot, directional) with one directional light, a multi-mesh tank model (6 meshes total) with an independently rotating turret and instanced meshes
- Used **Bullet physics** for the dynamic world: convex hull collision shapes for loaded tank models, a **custom plane collider approximating the terrain** for ground collision, a custom debug-draw integration, and a raycast against that terrain collider to translate cursor position into world-space movement orders
- Built **procedurally generated terrain** (Perlin-noise heightmaps with height-based two-texture blending) across **3 levels of increasing difficulty**
- Implemented **stencil-buffer outlining** for unit selection (clip-space-to-world-space selection box) and **physics-driven enemy tank AI**, using Bullet for movement and ray-cast for targeting
- Added supporting systems: a **loading screen and ImGui-based UI manager**, multiple game states/menus, **bullet object pooling** (reusing projectiles instead of allocating/deleting them), and randomly generated tank driver names for a bit of personality based on 2 name arrays

## Contributions

The framework work carried real cross-platform weight — developing directly against Raspberry Pi 4 meant dealing with an unfamiliar build/deploy/debug loop and EGL-specific quirks (getting the stencil buffer working required adjusting the EGL window configuration itself, not just shader code) that don't come up when targeting PC alone.

Two things stood out as harder than expected: the enemy tank AI, driven through Bullet physics rather than simple scripted movement, and getting GPU instancing to work cleanly — instancing worked for regular rendering, including the multi-mesh tank/turret split, but never worked correctly together with the stencil-buffer outline system, and that combination was left unresolved by the end of the block rather than forced into a fragile fix.

## Result
A playable, finished 3-level tank RTS running natively on Raspberry Pi 4 hardware: real embedded-platform deployment experience layered on top of procedural terrain, physics-driven AI, and instanced rendering, with the instancing/stencil-buffer conflict documented as a known, unresolved limitation rather than a silently shipped bug.

  </div>
  <div class="video-column">
    <figure class="video-figure">
      <div class="video-wrapper">
        <img src="/projects/year1_blockB/SelectionEntityIdentityShadersShadows.gif" alt="Unit selection, stencil-buffer outlining, and shaded/shadowed rendering" />
      </div>
      <figcaption>
        Unit selection with stencil-buffer outlining, alongside the shaded, shadowed rendering of the tanks and terrain.
      </figcaption>
    </figure>
    <figure class="video-figure">
      <div class="video-wrapper">
        <img src="/projects/year1_blockB/EnemyAIProceduralTerrainPhysics.gif" alt="Enemy AI on procedurally generated terrain with Bullet physics" />
      </div>
      <figcaption>
        Enemy tank AI moving across the procedurally generated terrain, driven by Bullet physics.
      </figcaption>
    </figure>
    <figure class="video-figure">
      <div class="video-wrapper">
        <img src="/projects/year1_blockB/OwnUnitsTargetingAI.gif" alt="Player units targeting and engaging the enemy AI" />
      </div>
      <figcaption>
        Player-controlled units targeting and engaging enemy tanks.
      </figcaption>
    </figure>
  </div>
</div>