---
title: "Snake — Samsung Smart TV"
category: "Personal Project / Embedded"
summary: "A Snake game built for a 2017 Samsung Smart TV, deployed as a real Tizen app on decade-old hardware."
thumbnail: "/projects/snake-tv.jpg"
team: "Solo"
featured: false
order: 15
---

A small personal project: a Snake game built and deployed to a real Samsung Smart TV (a 2017 UE32M5602 running early Tizen firmware), written in plain ES5 JavaScript to work around the age of the TV's built-in web engine.

## What I did

- Set up the **Tizen Studio / VS Code Tizen extension** toolchain and got a real device deploy pipeline working (including tracking down a certificate-profile mismatch between the VS Code extension and the Tizen CLI's default paths)
- Wrote the game in **plain ES5** (no arrow functions, no classes) on an HTML5 canvas at 1920x1080, since the TV's older WebKit engine doesn't support modern JS syntax
- Built the core game loop: turtle-style directional movement, wall/self collision, food spawning that avoids the snake body, growth, and a start screen
- Handled **TV remote input** via keyboard events (OK/Enter for pause, correcting an initial mismap to a key that doesn't exist on a real remote)
- Implemented audio with fallbacks for the older engine: background music via `HTMLAudioElement`, SFX via Web Audio API using `XMLHttpRequest` instead of `fetch()` (which silently failed on-device) and the older callback-based `decodeAudioData` signature
- Implemented **auto-pause on backgrounding** using both `visibilitychange` and `window.blur`, since the TV's WebKit doesn't reliably fire `visibilitychange` on a Home-button press
- Added a build-version marker on the start screen to catch stale installs during iteration, and designed a matching app icon

## Contributions

Most of the real difficulty here wasn't the game logic — it was working around a decade-old, non-standard web engine where modern assumptions (fetch, visibilitychange, ES6 syntax) silently fail rather than throwing clear errors, which made debugging a matter of suspecting the platform first rather than the code.

## Result
A working, installed Snake game running natively on real (old) Smart TV hardware, controllable entirely with the TV remote.