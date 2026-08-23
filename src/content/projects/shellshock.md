---
title: "Shellshock"
category: "Shipped Game"
summary: "A physics-based sports game built in Unreal Engine, recreating the bounce-and-control feel of Videoball."
thumbnail: "/projects/shellshock.jpg"
team: "Team 'Termite'"
featured: false
order: 12
---

Shellshock is a physics-based sports game built with a small team ("Termite") in Unreal Engine, taking inspiration from *Videoball*'s bounce-and-control ball mechanic.

## What I did

- Prototyped the **ball's bounce behavior**, first via impulse-based pushback, then rebuilt it using Unreal's **Projectile Movement Component** with custom rotation logic layered on top — since projectile movement alone doesn't rotate the ball realistically while rolling, so I wrote a function to fake convincing roll rotation based on movement direction
- Worked with **Enhanced Input** outside the standard Character class, since the ball needed input-driven behavior without being a player-controlled pawn in the usual sense

## Contributions

The ball feel was the whole game, so getting it right mattered more than anything else. The real difficulty in the second approach wasn't the movement itself — Projectile Movement Component handles that — but faking a convincing *rotation* on top of it, since the component only orients the object toward its direction of travel and doesn't simulate rolling.

## Result
A working ball-physics prototype with a distinct, controllable bounce feel, delivered on schedule with the team.