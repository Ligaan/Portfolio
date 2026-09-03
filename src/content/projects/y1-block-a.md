---
title: "Year 1 buas, Block A — 2D RTS"
category: "Foundations"
summary: "A 2D RTS with pixel-buffer rendering, A* pathfinding with local steering, and unit selection via AABB."
thumbnail: "/projects/year1_blockA/image.png"
team: "Solo"
featured: false
order: 9
---

<div class="content-with-video">
  <div class="content-text">

First project done at buas, built over roughly 2 months, using a school-provided template that covered only rendering — physics (collision, movement resolution) was implemented from scrath based on AABB detection and steering along with the rest of the common mechanics for an RTS.
## What I did

- Built a **tile-based, scrollable map** (3x the physical screen size) using a custom tile map/sprite class, with **zoom in/out** — including a custom equation for zooming centered on the mouse cursor position, rather than a fixed screen point
- Implemented **unit selection via AABB** (drag-select, checking whether a unit's edges fall inside the selection box) and **ordering/movement for selected units**, including switching control between multiple numbered unit groups (0–9)
- Implemented **A\* pathfinding combined with local steering** (seek, avoid, arrive) for unit movement — fixing diagonal movement cutting through obstacle corners, and reserving individual tiles per unit (via a per-tile occupancy struct) so units queue for space instead of blocking each other
- Attempted **pixel-perfect sprite collision** as a more precise alternative to AABB, but a vector bug meant it only worked reliably in a narrow one-on-one case due to overlapping bullets — ultimately shipped with AABB-based collision only
- Added a **bullet/shooting system** — units fire at enemies within range, bullets travel along the distance vector to the target and get destroyed on wall impact or after a lifespan
- Built the map itself in **Tiled**, including obstacles (e.g. water tiles units can't cross)
- Added a **main menu, win/lose conditions**, and basic UI instructions for controls

## Contributions

Local movement was the hardest problem in the project — steering alone caused units to conflict with each other while pathfinding around static obstacles, and integrating steering with A* initially broke the pathfinding that was already working. The fix was to move from a simple boolean occupancy grid to a richer per-cell struct tracking occupancy and reservations, letting units queue for a tile rather than fight over it — which also resolved the diagonal-corner-cutting bug.

Since the provided template only handled rendering, all of the physics — collision response, movement resolution, the steering/pathfinding interaction — had to be built from scratch rather than adapted from existing systems. Pixel-perfect collision was a case of scoping honestly rather than forcing a broken feature to ship: once the underlying vector math bug proved hard to track down within the time available, the project shipped with AABB-based collision for both selection and gameplay, rather than a half-working pixel-perfect system.

## Result
A functional 2D RTS prototype with a custom tile map, mouse-centered zoom, group-based unit control, and a working combination of A* and local steering for movement — patterns that carried forward into later, larger projects. Pixel-perfect collision remained an unresolved stretch goal, documented as a known limitation rather than shipped broken.

  </div>
  <div class="video-column">
    <figure class="video-figure">
      <div class="video-wrapper">
        <img src="/projects/year1_blockA/AStar.gif" alt="A* pathfinding for units" />
      </div>
      <figcaption>
        A* pathfinding — units routing around static obstacles across the map.
      </figcaption>
    </figure>
    <figure class="video-figure">
      <div class="video-wrapper">
        <img src="/projects/year1_blockA/AStartSteringFinalResult.gif" alt="Final combined A* and steering result" />
      </div>
      <figcaption>
        The finished movement system — A* pathfinding combined with local steering, units no longer blocking or cutting through each other.
      </figcaption>
    </figure>
    <figure class="video-figure">
      <div class="video-wrapper">
        <img src="/projects/year1_blockA/Shooting.gif" alt="Final gameplay showing shooting and full unit behavior" />
      </div>
      <figcaption>
        The game in its final state — units selecting, moving, and shooting together.
      </figcaption>
    </figure>
  </div>
</div>