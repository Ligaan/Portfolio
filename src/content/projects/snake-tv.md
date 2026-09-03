---
title: "Snake — Samsung Smart TV"
category: "Personal Project / Embedded"
summary: "A one-day Snake game built for a 2017 Samsung Smart TV, deployed as a real Tizen app on decade-old hardware."
thumbnail: "/projects/snakegametv/image.png"
team: "Solo"
featured: false
order: 15
media:
  - type: video
    src: "/projects/snakegametv/recordoftv.mp4"
    caption: "Gameplay running natively on the real 2017 Samsung Smart TV. Filmed with a phone rather than screen-recorded — the TV's decade-old hardware has no reliable native capture method, and the browser DevTools route only grabs single stills, not video."
  - type: video
    src: "/projects/snakegametv/simulatedonpc.mp4"
    caption: "The same build running through the Tizen TV Simulator on PC, used throughout development for fast iteration before deploying to real hardware."
---

A one-day personal project: a Snake game built and deployed to a real Samsung Smart TV (a 2017 UE32M5602 running early Tizen firmware), written in plain ES5 JavaScript to work around the age of the TV's built-in web engine. This was my first time working with Tizen/Samsung TV development, coming from a background entirely in Unreal Engine/C++.

Given the one-day scope and zero prior experience with the Tizen toolchain, I leaned on AI assistance for the unfamiliar platform-specific parts: setting up Tizen Studio and the VS Code Tizen extension, tracking down a certificate-profile mismatch between the two, and working through the real-device deployment pipeline (`sdb`, network connectivity, developer mode quirks). Once that pipeline was working, writing the actual game — the ES5 workarounds, the game loop, and the platform-specific fallbacks for the TV's older WebKit engine — was my own work, with AI used from that point mostly to help diagnose why something silently failed on-device rather than to write the logic itself.

## What I did

- Set up the **Tizen Studio / VS Code Tizen extension** toolchain and got a real device deploy pipeline working (including tracking down a certificate-profile mismatch between the VS Code extension and the Tizen CLI's default paths)
- Wrote the game in **plain ES5** (no arrow functions, no classes) on an HTML5 canvas at 1920x1080, since the TV's older WebKit engine doesn't support modern JS syntax
- Built the core game loop: turtle-style directional movement, wall/self collision, food spawning that avoids the snake body, growth, and a start screen
- Handled **TV remote input** via keyboard events (OK/Enter for pause, correcting an initial mismap to a key that doesn't exist on a real remote)
- Implemented audio with fallbacks for the older engine: background music via `HTMLAudioElement`, SFX via Web Audio API using `XMLHttpRequest` instead of `fetch()` (which silently failed on-device) and the older callback-based `decodeAudioData` signature
- Implemented **auto-pause on backgrounding** using both `visibilitychange` and `window.blur`, since the TV's WebKit doesn't reliably fire `visibilitychange` on a Home-button press
- Added a build-version marker on the start screen to catch stale installs during iteration, and designed a matching app icon

## Contributions

Coming into this with no prior Tizen experience and a one-day timeline, the practical approach was the same one I used for GravityOverlay: offload the unfamiliar platform plumbing — toolchain setup, certificate profiles, real-device networking — to AI assistance, so the limited time went toward the part that actually needed original thinking: making a decade-old, non-standard web engine run modern-looking game code reliably. Setting up the actual deploy pipeline (VS Code extension configuration, the certificate-profile mismatch between the extension and the CLI, `sdb` connectivity to a real device over the network) took real troubleshooting, but it was platform onboarding rather than design work.

The genuinely interesting problems were all on the game side: this TV's WebKit engine fails silently rather than throwing clear errors when a modern API assumption doesn't hold, which made debugging a matter of suspecting the platform first rather than the code. `fetch()` for audio loading, `visibilitychange` on Home-button press, and any ES6 syntax all had to be identified as suspects and worked around individually — that diagnosis-and-workaround process, not the game logic itself, was where most of the actual time went.

## Result
A working, installed Snake game running natively on real (old) Smart TV hardware, controllable entirely with the TV remote, built in a single day — a first look at Tizen/embedded web development, with AI covering the toolchain-onboarding curve and the platform-workaround diagnosis done independently.