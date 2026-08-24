---
title: "Owlet"
category: "Shipped Game"
summary: "Team RTS/tower-defense game with a custom C++ engine, shipped on itch.io with full Steam Deck support."
thumbnail: "/projects/owlet/owlet.png"
team: "Team of ~10"
featured: true
order: 1
links:
  itch: ""
  video: ""
---

Owlet is an RTS/tower-defense game built by a team of 14, running on a fully custom C++ engine written from scratch by the team based on a bare bone engine template that covered basic resource management and rendering (the rendering was redone for DX12 by one of our programmers). My role covered gameplay/UI systems within the engine, and I was the sole person responsible for Steam integration and Steam Deck support along with small help regarding data structures for entities and some serialization for the towers class.

## What I did

- Built a **buff-tower system**, including refactoring its base structure to support multiple buff types cleanly
- Added **customizable, in-editor-editable keyboard shortcuts** for orders and UI
- Built a **debug metrics system** for recording and serializing playtest data to inform design decisions
- Shipped readability features driven directly by playtest feedback: a **leaderboard**, **wave counter**, and **enemy-hover indication**
- Owned **Steam API integration and Steam Deck support** end-to-end — the only person on the team working on this
- Wrote **raycast functions** underlying unit orders (go-to, attack, gather)
- Built the **selection system** (redone for screen-space in a later pass), used both in gameplay and in the level editor for deleting props/structures/units
- Designed the **unit/structure/prop attribute and manager system** (initially over-engineered with a modifier system, simplified down to a core attributes/tags model that stayed)
- Built an **input wrapper** unifying the engine's native input and Steam Input under the same function calls, removing platform-specific branching from gameplay code
- Set up **platform-dependent build configuration** separation for cross-platform support

## Contributions

Integrating Steam into a fully custom engine meant there was no existing plugin layer to lean on the way there would be in Unreal or Unity — every piece of SDK setup, initialization, and platform-specific behavior had to be handled directly. Getting the game verified and running correctly on Steam Deck specifically added its own layer of debugging on top of that: control input handling and general behavior that simply doesn't surface on a normal desktop dev environment, so a lot of it only became visible once actually testing on Deck hardware.

On the gameplay side, most of my UI/readability work (the leaderboard, wave counter, and enemy-hover indication) came directly out of early playtest feedback showing that players — especially RTS newcomers — were losing track of game state. The debug metrics system was built specifically to make that kind of feedback loop faster: instead of relying only on qualitative playtest notes, it captured structured per-session data the team could look back on.

## Release

Owlet shipped on itch.io as an early-access release with full Steam Deck compatibility (due to being a school project the steam app id was probably reused for another project), a gameplay trailer, and multiple post-launch updates based on feedback from both RTS veterans and newcomers.

<a href="https://buas.itch.io/owlet" target="_blank" rel="noopener noreferrer">View on itch.io →</a>

<video controls style="width: 100%; height: auto;">
  <source src="/projects/owlet/owlet.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>