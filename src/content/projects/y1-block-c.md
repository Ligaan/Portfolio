---
title: "Year 1 buas, Block C — 2D Ray Tracer"
category: "Foundations"
summary: "A from-scratch 2D ray tracer — occluders, shadows, and an acceleration grid — built into a small light-avoidance game."
thumbnail: "/projects/year1_blockC/image.png"
team: "Solo"
featured: false
order: 11
---

A from-scratch 2D ray tracer built over an 8-week block (based on the template from block A), rendering directly to a custom float-based pixel buffer, then extended into a small playable game built around light and shadow.

## What I did

- Built core **rendering primitives from scratch** on a float-based screen buffer: string/scaled/rotated text, lines, scaled lines, and circles, plus a frame counter targeting 60+ FPS
- Implemented **world-space to screen-space conversion**, with translation, scaling, and rotation applied to the world independently of the underlying screen buffer
- Built a **ray tracer with point lights, a spotlight, and 3 occluder types** (circles, line segments, boxes) sharing a common `Occluder` base class with virtual methods for reusability — including shadow casting via line-ray intersection, with the box-intersection routine derived from the line-line -intersection algorithm
- Built a **spatial grid for lights and shadows**, using a DDA (Digital Differential Analysis) line-traversal algorithm to determine which grid cells a ray passes through — an optimization that went through several broken iterations (particularly at small cell sizes) before becoming reliable
- Added **transforms for occluders** (position/rotation/scale), a **scrolling background texture** (adapted from the course template's sprite class), toggleable **occluder outlines**, and experimented with **multithreading** for performance (roughly doubled frame rate, at some real implementation cost)
- Turned the renderer into a small **light-avoidance game**: the player controls a point-light avatar and must avoid touching other light sources or occluders before a timer runs out, with **Poisson-disk sampling** (via a header-only library) used to place objects in the scene without overlap, across **4 screens** (main menu, in-level, win, lose)

## Contributions

The recurring hard problem across the block was the lights/shadows acceleration grid — multiple structural rewrites were needed to get ray-to-cell traversal working correctly, and even the final DDA-based version had known edge cases at small cell sizes. Rather than let that block progress on the rest of the project, later weeks moved forward on the game layer (transforms, textures, multithreading, gameplay) in parallel, accepting the grid as a working-but-imperfect optimization instead of stalling on a perfect fix.

Turning a pure rendering technique into an actual mechanic was the more interesting design decision here: rather than treating ray tracing as a rendering demo, the project reframed "the player's own light exposes them" as the core gameplay risk, making the rendering system and the game rules the same system rather than two separate layers bolted together.

## Result
A finished, genuinely winnable (if difficult) small game built entirely on a self-written 2D ray tracer — real light/shadow rendering fundamentals, occluder intersection tests, and a spatial acceleration structure, wrapped in a complete game loop with win/lose conditions and multiple screens.