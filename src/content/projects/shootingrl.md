---
title: "ShootingRL"
category: "AI / Self-Development"
summary: "A pixel-input reinforcement-learning project — training a DQN agent from raw screen buffer data in a custom SFML environment."
thumbnail: "/projects/shootingrl/shooting.png"
team: "Solo"
featured: false
order: 13
links:
  github: "https://github.com/Ligaan/ShootingRL"
---

A self-development project exploring image-based reinforcement learning: training a DQN agent using the raw screen pixel buffer as input, rather than hand-crafted state values (the approach used in the earlier RL Racing Agent Trainer). Built over roughly 2 months at around 4–8 hours a week, alongside team production work (Dreadtome).

<div class="content-with-video">
  <div class="content-text">

## What I did

- Built a custom 2D training environment from scratch in **SFML** (player, walls, static/dynamic targets), with **ImGui** for UI and **Cereal** for level serialization
- Adapted a DQN implementation from the earlier racing-agent project to accept **raw 800×800 game-screen frames** as network input instead of discrete state values, batching 64 states per training step, each state made up of 2 stacked frames
- Implemented **line-line and line-rectangle intersection** (SAT-based) for the environment's collision/interaction logic
- Set up and debugged **PyTorch** in C++ (CPU-only, after repeated CUDA/CMake version conflicts with the GPU build)
- Profiled the training pipeline and identified the network's learning phase — not data collection — as the actual bottleneck

## Contributions

The core challenge here wasn't the RL algorithm itself (DQN was already proven from the earlier project) — it was the shift from small state vectors to full image input, which changed both the network architecture and the practical performance envelope. Passing batches of 64 states, each built from two 800×800 frames, through the network made each training step dramatically more expensive, to the point where full convergence wasn't reachable in the time available. Profiling made clear that the bottleneck was the network's internal computation on CPU, not data gathering — meaning the realistic fix would have been a working GPU pipeline or a smaller/rearranged network, not further environment optimization.

## Result
A working environment and training pipeline with a functional but under-trained agent — the project's value ended up being a clear, profiled understanding of where image-based RL training costs actually come from, rather than a fully converged agent.

  </div>
  <div class="video-column">
    <figure class="video-figure">
      <div class="video-wrapper">
        <video controls playsinline preload="metadata">
          <source src="/projects/shootingrl/LevelCreation.mp4" type="video/mp4" />
          Your browser does not support embedded video.
        </video>
      </div>
      <figcaption>
        Setting up the project and building the level editor, with serialization/deserialization of the level.
      </figcaption>
    </figure>
    <figure class="video-figure">
      <div class="video-wrapper">
        <video controls playsinline preload="metadata">
          <source src="/projects/shootingrl/PlayerRun.mp4" type="video/mp4" />
          Your browser does not support embedded video.
        </video>
      </div>
      <figcaption>
        The environment's gameplay and rules from the player's perspective.
      </figcaption>
    </figure>
    <figure class="video-figure">
      <div class="video-wrapper">
        <video controls playsinline preload="metadata">
          <source src="/projects/shootingrl/AITraining.mp4" type="video/mp4" />
          Your browser does not support embedded video.
        </video>
      </div>
      <figcaption>
        The AI training loop — the learning phase, driven by batches of 64 states (each two 800×800 frames), is the main bottleneck.
      </figcaption>
    </figure>
  </div>
</div>