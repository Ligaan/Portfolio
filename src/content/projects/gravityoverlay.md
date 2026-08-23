---
title: "GravityOverlay"
category: "Personal Project / Android"
summary: "An Android overlay app with a physics-driven ragdoll that responds to real device motion sensors."
thumbnail: "/projects/gravityoverlay.jpg"
team: "Solo"
featured: false
order: 14
---

A Christmas gift project: an Android system overlay app (`com.andrei.gravityoverlay`) featuring a ragdoll character that physically reacts to the phone's real motion — tilt, shake, and throw — using the device's motion sensors, first Kotlin/Android project after a background entirely in Unreal Engine/C++.

## What I did

- Built a **foreground-service overlay** (`TYPE_APPLICATION_OVERLAY`) that persists across other apps and survives Recents dismissal
- Built a **vsync-tied physics loop** using `Choreographer` with real delta-time integration, rather than a fixed-timestep hack
- Implemented **gravity as a proper 2D vector** (not a scalar) driven by the `TYPE_GRAVITY` sensor, plus `TYPE_LINEAR_ACCELERATION` for shake/throw impulses
- Separated the ragdoll into distinct **physics, rendering, and view** classes (`RagdollPhysics` / `RagdollRenderer` / `RagdollView`) rather than one monolithic class
- Implemented gravity-driven whole-body orientation with a threshold gate, four-edge grounding, stiction dead zones, and bounce cutoff tied to movement thresholds
- Exposed all physics tuning (scale, drag, bounciness, expression threshold, throw sensitivity) as **runtime sliders** backed by `SharedPreferences`, rather than hardcoded constants
- Designed the app icon (a tumbling figure with motion streaks)

## Contributions

Coming from Unreal/C++, the interesting part was less "how do I do physics" and more "how does Android actually want this structured" — foreground services, notification channels, and the split between an Activity (settings UI) and a long-lived Service (the actual overlay) don't map cleanly onto engine-side patterns. Insisting on separating physics from rendering early, and exposing tuning values as sliders instead of hardcoded constants, paid off directly during iteration — every feel adjustment became a slider drag instead of a rebuild.

## Result
A working, persistent overlay ragdoll that responds convincingly to real phone motion, delivered as a personal gift project.