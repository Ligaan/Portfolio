---
title: "BEE Engine — Core Systems"
category: "Engine Programming"
summary: "Custom C++ engine work — resource manager, particle system, Lua scripting, and cross-platform/Steam Deck support."
thumbnail: "/projects/bee-engine.jpg"
team: "Team of ~10"
featured: false
order: 5
links:
  github: ""
---

Work on BEE, a custom C++ engine built from scratch by a student team (no Unreal/Unity underneath). I owned several core subsystems and, separately, cross-platform/Steam Deck compatibility work.

## What I did

- Built a **template-based Resource Manager** owning per-type asset managers (models, textures, materials), redesigned after recognizing the first version didn't generalize well across resource types
- Built a **particle system** through two major API redesigns — the first version was function-heavy and slow due to poor data layout; the second reduced the API surface to essentially "create emitter, update system" while making per-particle updates cache-friendly
- Built a **Lua scripting manager** to let non-programmers script simple engine behavior, including a camera implemented via Lua as a demonstration
- Built an **ImGui-based UI layer** exposing engine systems to the team
- Owned **cross-platform work and Steam SDK integration**, including getting the engine running on **Steam Deck** specifically

## Contributions

The Resource Manager and particle system both went through the same lesson twice: expose only what the user actually needs, not what's convenient to expose internally. The particle system's first version leaked implementation details into its API and paid for it in performance; the rewrite fixed both problems at once by changing how particle data was laid out in memory.

## Result
Multiple engine subsystems that shipped as part of the team's later projects (see Owlet), plus hands-on experience with the practical side of cross-platform support — SDK integration and debugging that only surfaces on real target hardware, not a desktop dev environment.