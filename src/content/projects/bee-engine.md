---
title: "BEE Engine — Core Systems"
category: "Engine Programming"
summary: "Custom C++ engine work — resource manager, particle system, Lua scripting, and cross-platform/Steam Deck support."
thumbnail: "/projects/bee_engine/beeEngine.png"
team: "Solo"
featured: false
order: 5
links:
  github: ""
---

Work on BEE, a custom C++ engine I built from scratch based on a school template as a solo project.

<div class="content-with-video">
  <div class="content-text">

## What I did

- Built a **template-based Resource Manager** owning per-type asset managers (models, textures, materials), redesigned after recognizing the first version didn't generalize well across resource types
- Built a **particle system** on top of **EnTT (ECS)** — each particle and emitter is an entity, with data laid out for cache-friendly batch updates — through two major API redesigns; the first version was function-heavy and slow due to poor data layout, the second reduced the API surface to essentially "create emitter, update system"
- Added **emitter serialization/deserialization**, letting particle setups be saved and reloaded rather than rebuilt by hand each session
- Built a **glTF model loader** that recursively binds a model's node hierarchy into the engine, keeping each mesh's transform relative to its parent node
- Built a **Lua scripting manager** to script simple engine behavior at runtime, including a camera implemented via Lua as a demonstration
- Built a **first-person camera system** (WASD movement, mouse or arrow-key rotation with adjustable sensitivity), inspired by LearnOpenGL's camera and driven through the Lua scripting system
- Built an **ImGui-based UI layer** exposing engine systems for editing and debugging, including a dedicated inspector for particle emitters and an asset browser for loading/unloading textures, meshes, models, and Lua scripts by file path

## Contributions

The Resource Manager and particle system both went through the same lesson twice: expose only what the user actually needs, not what's convenient to expose internally. The particle system's first version leaked implementation details into its API, stored per-particle data that only the emitter needed, and updated fields across separate functions — hurting both performance and readability. The rewrite moved the system to a proper **data-oriented, EnTT-driven design**, cutting the API down to creating emitters and updating the system, while keeping particle data contiguous in memory for fast, cache-friendly updates.

Other C++ practices applied throughout the engine: const references for read-only paths and lookups (resource managers, Lua script manager) to avoid unnecessary string copies; `unordered_map` for resource storage where ordering isn't needed; `deque<bool>` instead of `vector<bool>` where element access semantics mattered more than the bit-packing optimization; and STL algorithms (`std::find`, `std::remove`) for value-based lookups and removals in the resource managers. Ownership is centralized — each manager (mesh, texture, model, material, Lua scripts) is owned and cleaned up by the `Resources` class, and engine-level systems are owned and torn down by the `Engine` class.

## Result
Multiple engine subsystems that later carried over into other projects (see Owlet), plus hands-on experience with the practical side of cross-platform support — SDK integration and debugging that only surfaces on real target hardware, not a desktop dev environment.

  </div>
  <div class="video-column">
    <figure class="video-figure">
      <div class="video-wrapper">
        <video controls playsinline preload="metadata">
          <source src="/projects/bee_engine/ParticleSystem.mp4" type="video/mp4" />
          Your browser does not support embedded video.
        </video>
      </div>
      <figcaption>
        The particle system driven entirely through ImGui — creating/destroying emitters and editing emission rate, lifespan, color transitions, and mesh/texture, while sustaining 40k+ particles as EnTT entities.
      </figcaption>
    </figure>
    <figure class="video-figure">
      <div class="video-wrapper">
        <video controls playsinline preload="metadata">
          <source src="/projects/bee_engine/luaScripting.mp4" type="video/mp4" />
          Your browser does not support embedded video.
        </video>
      </div>
      <figcaption>
        The Lua scripting manager in action — a camera implemented entirely through a loaded Lua script, demonstrating per-frame and cooldown-based function calls exposed at runtime.
      </figcaption>
    </figure>
  </div>
</div>