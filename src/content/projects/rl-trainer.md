---
title: "RL Racing Agent Trainer"
category: "AI / Tools"
summary: "A C++/Python tool for training reinforcement-learning agents to race, built and profiled from scratch."
thumbnail: "/projects/rl-trainer.jpg"
team: "Solo project"
featured: true
order: 3
links:
  github: ""
---

A solo research and tooling project: a tool for training reinforcement-learning agents to drive a race track, written in a mix of C++ and Python, built to compare multiple RL algorithms head-to-head in the same environment.

## What I did

- Built a training tool supporting **multiple RL algorithms** in a shared racing environment, to compare behavior and performance under identical conditions
- **Profiled and optimized** training/tick performance, cutting down avoidable overhead in the training loop
- Wrote up the tool and findings as a **public technical blog post** aimed at a technical audience

## Contributions

Training and simulation speed turned out to matter more than any single algorithm choice — early on, profiling revealed real overhead in the tick and training-loop run time that was silently eating iteration time. Fixing that meant every subsequent RL experiment ran faster, which mattered more for actually getting through the comparison work than picking the "best" algorithm on paper.

## Result

Documented in a public technical blog post covering the tool's features and the trade-offs between the RL algorithms tested.