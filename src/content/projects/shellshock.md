---
title: "Shellshock"
category: "Shipped Game"
summary: "A physics-based sports game built in Unreal Engine, recreating the bounce-and-control feel of Videoball — my first project in Unreal."
thumbnail: "/projects/shellshock/Shellshock.png"
team: "Team 'Termite'"
featured: false
order: 12
links:
    itch: ""
---

Shellshock is a physics-based coach game built with a small team ("Termite") in Unreal Engine 5.4, taking inspiration from *Videoball*'s bounce-and-control ball mechanic. This was both my first project in Unreal and my first team-based game project — I came in having never touched the engine before and never having worked on a game as part of a team, so a good chunk of the block was as much about learning Unreal itself (Blueprints, the Enhanced Input System, C++ inside Unreal specifically) and how to work within a multi-discipline team (Design, Art, Programming) as it was about shipping the game.

## What I did

**Ball physics & feel**
- Prototyped the **ball's bounce behavior**, first via impulse-based pushback with a reflection angle so it didn't just bounce back along the same trajectory, then rebuilt it using Unreal's **Projectile Movement Component** once that became the better fit for the intended feel
- Layered custom rotation logic on top of Projectile Movement, since the component only orients the ball toward its direction of travel and doesn't simulate rolling — wrote a function to fake a convincing roll based on movement
- Diagnosed and fixed a **gimbal lock bug** in that rotation (a visible 180° snap at certain angles) by switching the approach to **quaternions**, which also cleaned up the rotation generally
- Learned along the way that Unreal exposes most of its quaternion functionality to C++ scripts only, not Blueprints — and that Perforce submits from inside the editor don't always include every file (like the `.sln`) a new C++ class needs to be visible to the engine

<img src="/projects/shellshock/rotation.gif" alt="Ball movement and rotation" style="width: 100%; height: auto; display: block;" />

**Gameplay mechanics**
- Built the **hit-detection function** for the crab's stunning mechanic (paired with a teammate who built the stun effect itself), including team IDs so the check couldn't register friendly fire
- Fixed a **team-selection bug** where any player standing in the team-select circle would claim it, and leaving didn't hand control back to another player still standing there — iterated on the fix twice based on teammate feedback until it correctly passed ownership to a remaining player
- Contributed design input on the shell defense mechanic and the ball/power-up ideas during sprint planning

<img src="/projects/shellshock/ids.gif" alt="Team ID assignment" style="width: 100%; height: auto; display: block;" />

**First C++ in Unreal**
- Wrote a **file read/write system** to save and load object layouts to disk — the first C++ (rather than Blueprint) work of the project, needed because Blueprints had no built-in file I/O
- Rebuilt that system a week later using **JSON serialization** (struct ↔ JSON conversion) after the first text-parsing version proved too brittle to extend
- Fixed roughly a third of the team's total logged bugs over the block, working across the ball, team-selection, and shell systems

<img src="/projects/shellshock/Collab.gif" alt="Layout save/load" style="width: 100%; height: auto; display: block;" />

## Contributions

The ball feel was the whole game, so getting it right mattered more than anything else, and it's also where most of the actual learning happened — going from "impulse with a reflection angle" to "Projectile Movement Component plus a hand-rolled rotation" to "the same thing but with quaternions" was a progression of understanding *why* each earlier version fell short, not just what to fix. Coming into this with zero Unreal experience meant the first couple of weeks were slower while the engine's conventions (Blueprints vs. C++, what belongs where, what Perforce needs submitted) clicked into place, but by the second half of the block that same learning curve was letting me pick up C++ tasks — like the layout save system — that fell outside what Blueprints alone could do. It was also the first time coordinating technical work across a multi-discipline team rather than working solo, which showed up in practice as pairing on the stun mechanic (hit detection on my side, the stun effect itself on a teammate's), working alongside a designer and an artist on the ball prototype specifically, and folding in feedback-driven iteration — like reworking the team-selection fix twice based on what teammates flagged — into how the mechanics actually got built.

## Result

A working ball-physics prototype with a distinct, controllable bounce feel, shipped on schedule with the team — along with a working stun/team-selection system and roughly a third of the project's total bug fixes, built by someone who was learning Unreal from scratch over the same eight weeks.

<a href="https://robbinverwijs.itch.io/shellshocked" target="_blank" rel="noopener noreferrer">View on itch.io →</a>