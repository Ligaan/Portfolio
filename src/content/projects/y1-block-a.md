---
title: "Year 1, Block A — 2D RTS"
category: "Foundations"
summary: "A 2D RTS with pixel-buffer rendering, A* pathfinding with local steering, and pixel-perfect collision."
thumbnail: "/projects/y1-block-a.jpg"
team: "Solo"
featured: false
order: 9
---

An unnamed first-year 2D RTS, rendered directly via a pixel buffer, built to explore pathfinding, collision, and basic RTS unit control.

## What I did

- Built a **tile-based, scrollable map** (3x the physical screen size) with zoom in/out
- Implemented **unit selection and ordering**, including switching control between multiple unit groups
- Implemented **A\* pathfinding** combined with local steering for unit movement, including fixing units cutting diagonally through obstacle corners and getting units to avoid each other locally, not just avoid static obstacles
- Implemented **AABB and pixel-perfect sprite collision**, using AABB as an early-out test before the more expensive pixel-perfect check

## Result
A functional 2D RTS prototype with working pathfinding and collision — the first project to combine pathfinding, steering, and precise collision in one system, patterns that carried forward into later, larger projects.