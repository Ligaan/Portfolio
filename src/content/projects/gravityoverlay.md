---
title: "GravityOverlay"
category: "Personal Project / Android"
summary: "A one-day Android overlay prototype with a physics-driven ragdoll that responds to real device motion sensors."
thumbnail: "/projects/gravityoverlay/image.jpeg"
team: "Solo"
featured: false
order: 14
media:
  - type: image
    src: "/projects/gravityoverlay/idle.jpeg"
    alt: "Ragdoll at rest"
    caption: "Idle state — the ragdoll grounded and at rest."
  - type: image
    src: "/projects/gravityoverlay/falling.jpeg"
    alt: "Ragdoll falling"
    caption: "Falling state, driven by the gravity vector read from the device's motion sensor."
  - type: image
    src: "/projects/gravityoverlay/Falltotheleft.jpeg"
    alt: "Ragdoll tipped to the left"
    caption: "Tilting the phone left shifts the gravity vector accordingly."
  - type: image
    src: "/projects/gravityoverlay/configuration.jpeg"
    alt: "Runtime tuning sliders"
    caption: "Runtime tuning sliders for physics feel (scale, drag, bounciness, throw sensitivity) backed by SharedPreferences."
---

A one-day proof-of-concept prototype: an Android system overlay app featuring a ragdoll character that physically reacts to the phone's real motion — tilt, shake, and throw — using the device's motion sensors. This was my first Kotlin/Android project after a background entirely in Unreal Engine/C++, and the gravity-driven ragdoll concept itself was inspired by *Pocket God*.

Given the tight one-day scope and zero prior Android experience, I leaned on AI assistance heavily for the unfamiliar parts of the platform: setting up Android Studio, navigating unfamiliar Kotlin syntax, and figuring out which Android APIs existed for a given problem (overlay permissions, sensor types, foreground services). Once I had a working grasp of the language and platform, the actual design — the physics model, the math behind gravity-driven orientation and grounding, and the class structure — was my own work, with AI used from that point mostly as a reference for API usage rather than for the implementation itself.

## What I did

- Built a **foreground-service overlay** (`TYPE_APPLICATION_OVERLAY`) that persists across other apps and survives Recents dismissal
- Built a **vsync-tied physics loop** using `Choreographer` with real delta-time integration, rather than a fixed-timestep hack
- Implemented **gravity as a proper 2D vector** (not a scalar) driven by the `TYPE_GRAVITY` sensor, plus `TYPE_LINEAR_ACCELERATION` for shake/throw impulses
- Separated the ragdoll into distinct **physics, rendering, and view** classes (`RagdollPhysics` / `RagdollRenderer` / `RagdollView`) rather than one monolithic class
- Implemented gravity-driven whole-body orientation with a threshold gate, four-edge grounding, stiction dead zones, and bounce cutoff tied to movement thresholds
- Exposed all physics tuning (scale, drag, bounciness, expression threshold, throw sensitivity) as **runtime sliders** backed by `SharedPreferences`, rather than hardcoded constants
- Designed the app icon (a tumbling figure with motion streaks)

## Contributions

Coming from Unreal/C++ with no prior Android experience and a one-day timeline, the practical approach was to offload the platform-learning curve — Android Studio setup, Kotlin syntax, which APIs exist for overlays/sensors/services — to AI assistance, so time could go toward the part that actually needed original thinking: the physics model itself. Foreground services, notification channels, and the split between an Activity (settings UI) and a long-lived Service (the actual overlay) don't map cleanly onto engine-side patterns, so understanding that structure well enough to design around it — rather than just copying a pattern — was the real work.

Once past that initial ramp-up, the physics design (gravity as a 2D vector rather than a scalar, the grounding/stiction/bounce-cutoff logic, the class split between physics/rendering/view) and the *Pocket God*-inspired concept itself were my own design decisions. Insisting on separating physics from rendering early, and exposing tuning values as sliders instead of hardcoded constants, paid off directly during iteration — every feel adjustment became a slider drag instead of a rebuild, which mattered a lot given the one-day scope.

## Result
A working, persistent overlay ragdoll that responds convincingly to real phone motion, built as a one-day proof of concept and delivered as a personal gift project — a useful first look at Android/Kotlin development, with AI covering the platform-learning curve and the physics/design work done independently.