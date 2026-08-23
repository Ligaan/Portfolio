---
title: "Pizzapocalypse 2"
category: "Technical Lead"
summary: "Technical Lead at Monkey Strike Games — CI/CD infra, rendering optimization, baked lighting, and Steam platform integration for a UE5.6 production."
thumbnail: "/projects/pizzapocalypse.jpg"
team: "Studio production (Monkey Strike Games)"
featured: true
order: 2
links:
  video: ""
---

Pizzapocalypse 2 is a UE5.6 production at Monkey Strike Games, where I work as Technical Lead. My work spans the full pipeline: the studio's infrastructure (Perforce, Jenkins, VPN), rendering optimization and baked lighting for open, densely set-dressed levels, and Steam platform integration built largely from scratch since Unreal's official plugins didn't cover what we needed.

## What I did

**Infrastructure**
- Set up and administer the studio's **Perforce Helix Core server** (user/workspace management, recovery from lockouts, ticket policy)
- Set up and maintain the **Jenkins CI/CD pipeline**: multiple build agents/nodes, node labeling and priority, a dedicated lighting-bake pipeline, Google Drive and Steam deployment stages, plugin/credential maintenance
- Set up the studio's **NetBird VPN overlay** for remote access to Perforce/Jenkins, including onboarding docs for the rest of the team
- Built a **Jenkins-triggered automated profiling pipeline** with input record/replay, pushing results to a shared drive

**Rendering & optimization**
- Built a suite of **shadow-culling tools** for forward shading (distance-based dynamic shadow culling, impostor shadow-casters, volume-based dynamic shadow culling) since forward shading has no default shadow distance culling
- Built an **HISM conversion tool** (mesh-to-HISM and back) to let level design iterate freely without permanently locking meshes into instanced form
- Wrote **Python merging scripts** to collapse Italy's rooftile meshes into simplified impostors, cutting draw calls on a mesh type that was otherwise very expensive
- Authored the team's **set-dressing rules** (when to instance vs. merge vs. leave as-is, draw call/triangle budgets, material-slot guidance) based on profiling real problem areas
- Optimized **skeletal mesh CPU cost** using the Animation Budget Allocator (distance-based tick prioritization)
- Fixed **asynchronous tick performance** on high-count interactive props (e.g. shifting props in Morocco) by splitting them into low/high-performance tick groups instead of ticking everything every frame
- Set up the **LOD pipeline** and **cull-distance volume** workflow used across levels
- Owned **baked lighting** for large levels (e.g. a ~9-10 hour bake for one level), including visibility volume builds and production-quality settings for release builds

**Steam & platform integration**
- Built a **custom Steam Input plugin** from scratch (the official Unreal plugin was outdated), including the manifest-generation system, per-controller mapping support, and CommonUI integration for correct per-controller button icons (PlayStation, Xbox, Switch, Steam Deck)
- Built **Steam Stats** support (int/float stat tracking) and a **cross-platform rich presence system** (Steam + Discord, with an expandable per-SDK provider architecture)
- Implemented **PSO precaching and a custom PSO bundling pipeline** to reduce shader-compilation stutter
- Converted video/movie playback from MP4 to WebM for cross-platform compatibility (Steam Deck, console-style platforms)

**Tools & systems**
- Built the team's **save system** (persistent settings/collectibles via an interface-based callback contract, plus a simpler checkpoint/respawn system for temporary state)
- Built a **cheat manager** exposing developer console commands (god mode, sublevel load/unload, skin unlocks, time dilation, view-mode debugging, etc.)
- Integrated and maintain a **Perforce-connected bug-reporting tool** (Codecks integration) used by the whole team
- Built and maintain a **Discord bot** for team availability tracking and scheduling
- Wrote the studio's internal technical documentation (~30 pages covering the systems above) so the rest of the team can maintain them independently

## Contributions

Most of the rendering work traces back to the same root cause: forward shading with no Nanite/Lumen means a lot of the safety nets modern Unreal projects lean on don't exist here, so shadow culling, LOD strategy, and draw-call discipline all had to be handled deliberately rather than left to engine defaults. The set-dressing rules document came directly out of profiling real problem levels — dense, open areas with lots of unique meshes and materials were the actual bottleneck, not any one system in isolation.

The Steam Input plugin is the clearest example of building something from nothing: the official Unreal plugin was too outdated to use, so the manifest generation, controller-type support, and CommonUI hookup for per-platform button icons were built as a new plugin from the ground up, and are still being actively polished.

## Result
A studio-wide pipeline (Perforce + Jenkins + automated profiling) that lets the team ship builds without manual intervention, plus a rendering/optimization approach and toolset that made large, densely set-dressed levels runnable on the intended target hardware.