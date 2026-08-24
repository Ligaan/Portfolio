---
title: "RL Racing Agent Trainer"
category: "AI / Tools"
summary: "A from-scratch C++ tool for training reinforcement-learning agents to drive a custom racing track, covering environment design, DQN implementation, and training-loop profiling."
thumbnail: "/projects/rl_trainer/RL1.png"
team: "Solo project"
featured: true
order: 3
links:
  blog: "https://ligaan.github.io/2024/01/22/Reinforcement-Learning-in-C++.html"
---

RL Racing Agent Trainer is a solo research and tooling project built to explore reinforcement learning as a way of driving NPC behavior. The goal was to train an agent to complete a custom-built race track from scratch — environment, algorithm, and training pipeline all written in C++ with a PyTorch backend — while treating algorithm selection, environment design, and performance as equally important problems rather than assuming any one of them would just work out of the box.

## What I did

**Research & algorithm selection**
- Surveyed the RL algorithm landscape (SARSA, REINFORCE, DQN, Actor-Critic, SAC, PPO) against the project's actual constraints: off-policy, non-model-based, continuous-state
- Prototyped SARSA and REINFORCE first and rejected both based on real results — SARSA doesn't extend to continuous state without discretization, and REINFORCE showed local-maximization issues that made it unreliable for an environment that had to reach a valid end state every run
- Settled on **DQN** as the implementation target, with Actor-Critic scoped as a stretch goal once DQN was stable
- Iterated non-linearly: environment design pulled in ideas from Gym's CarRacing and LunarLander environments, and the observation space was redesigned mid-project (from raw position/velocity/orientation to a 5-ray raycast + velocity model) after the first version caused the agent to overspecialize on a single track layout

**Custom training environment**
- Built a **Racing Track environment from scratch** in C++, including a track editor with three interactive build modes: outline placement (click to place points, following a right-then-left placement rule so the track connects correctly), checkpoint placement, and player-start placement
- Implemented a **run mode** for manual/keyboard driving of the same environment used for training, useful for sanity-checking track geometry and reward shaping by hand

<video controls style="width: 100%; height: auto;">
  <source src="/projects/rl_trainer/BuildMod.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

*Track editor in action: outline mode, checkpoint mode, and player-placement mode used to build a track from scratch before training on it.*

- Added **track serialization/deserialization** so tracks can be built once in the editor and reloaded for repeated training runs
- Designed and iterated on a **raycast-based observation space** (5 directional ray lengths + velocity) specifically to generalize across track layouts instead of memorizing one
- Designed the **reward function** through iteration rather than upfront, balancing incentives so the agent had to actually drive well rather than exploit a shortcut in the scoring:
  - Positive reward for maintaining high speed and using the acceleration action
  - Negative reward for slowing down, for taking no action, and for moving backward
  - Negative reward for getting too close to a wall, since that's the leading indicator of going off-track
  - Positive reward per checkpoint passed, and a larger positive reward for finishing the track (also an end condition)
  - Negative reward — and episode termination — for going off-track
  - Found in practice that this reward shaping mattered more to final agent behavior than the choice of algorithm; a working algorithm with a bad reward function still produced a bad driver

**DQN implementation**
- Implemented **DQN in C++ using LibTorch**, including the Q-network, epsilon-greedy action selection with exponential decay, and a replay buffer
- Exposed a small, reusable API (`DQN`, `act()`, `step()`, environment `reset()`/`step()`) so the same training loop could run against any environment implementing the expected interface, and validated this on Gym's LunarLander before pointing the same DQN implementation at the custom Racing Track

<video controls style="width: 100%; height: auto;">
  <source src="/projects/rl_trainer/Week_7_demo.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

*Sanity-checking the DQN implementation against LunarLander first — same `DQN` class, same training loop, different environment plugged in.*

- Trained the agent to a checkpoint (~3,200 episodes) that reliably completed the custom track and, notably, **generalized to tracks it hadn't seen during training** — direct evidence the observation-space redesign worked

**Profiling & optimization**
- Used a CPU profiler to find that `learn`/`sample` dominated frame time, and that scaling to **32 parallel training environments** cut a 7-hour/2000-episode run down to roughly 2–3 hours — well short of the expected ~10x, prompting further investigation
- Root-caused the shortfall to `std::vector::erase` calls in the replay buffer's eviction logic, confirmed via inlined-function profiling
- Rewrote single-experience inserts into a **bulk-insert path** (`addBulk`), replacing per-step `push_back`+`erase` with a single batched insert and a single batched erase — reduced time spent in the buffer's add path by **over 7x** and roughly doubled overall training speed
- Stress-tested the fix across 1/32/320 concurrent agents and buffer sizes of 2e5/2e6 to confirm the improvement scaled rather than just working at small sizes
- Evaluated a `std::list`-based buffer as a further optimization, but found it net-negative once sampling/shuffling costs were included, and documented the trade-off rather than shipping it

<img src="/projects/rl_trainer/replay-buffer-optimization-comparison.png" alt="Time spent inside the experience-add path: before optimization, after the bulk-insert fix, and after an additional (rejected) vector-to-list change" style="width: 100%; height: auto;" />

*Time spent inside the buffer's add path, log scale, across 1/32/320 concurrent agents and two buffer sizes. The bulk-insert fix alone took the worst case from ~1,826ms down to ~6.6ms — over 270x for that configuration — while the list variant looked good on paper but cost more once sampling was factored back in, which is why it wasn't shipped.*

Net effect on actual training: a 2,000-episode run that took **~7 hours** before the fix dropped to **~2–3 hours** after it, purely from removing overhead that had nothing to do with the RL algorithm itself.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; align-items: start;">
<div>
<video controls style="width: 100%; height: auto; display: block;">
  <source src="/projects/rl_trainer/BeforeOptimization.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
<em>Early training — before the bulk-insert replay buffer fix, wobbly and slow to converge.</em>
</div>
<div>
<img src="/projects/rl_trainer/TrainingOptimization.gif" alt="Agent behavior mid/late training, after the replay buffer optimization" style="width: 100%; height: auto; display: block;" />
<em>Same setup after the fix — noticeably faster convergence per wall-clock hour.</em>
</div>
</div>

## Contributions

The clearest lesson from this project was that iteration speed matters more than algorithm choice: the training-loop profiling and the resulting buffer optimization did more for how much RL experimentation I could actually run than picking DQN over Actor-Critic ever would have. The observation-space and reward-system redesigns are the other throughline — both went through at least one full "implement, test, discover it doesn't generalize, rework" cycle, which is also why the environment ended up with a proper editor and serialization instead of a single hardcoded track.

## Result

A working C++/LibTorch DQN pipeline with a custom, editable racing environment, a profiled and optimized training loop, and an agent that generalizes across track layouts rather than memorizing one. Documented in a public technical blog post covering the tool's design and the algorithm trade-offs evaluated along the way.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; align-items: start;">
<div>
<img src="/projects/rl_trainer/TrainedModel.gif" alt="Trained agent completing custom track 1" style="width: 100%; height: auto; display: block;" />
<em>Trained checkpoint (~3,200 episodes) completing the track it was trained on.</em>
</div>
<div>
<img src="/projects/rl_trainer/TrainedModel2.gif" alt="Trained agent completing a different custom track" style="width: 100%; height: auto; display: block;" />
<em>The same checkpoint on a track it never trained on — generalization, not memorization.</em>
</div>
</div>

<a href="https://ligaan.github.io/2024/01/22/Reinforcement-Learning-in-C++.html" target="_blank" rel="noopener noreferrer">Read the technical blog post for this project →</a>