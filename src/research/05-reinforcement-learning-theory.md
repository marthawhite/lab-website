---
title: Actor-critic and Continuous Control
order: 5
publications:
  - 2022-greedification-operators-for-policy-optimization-investigating-forward-and-reverse-kl-divergences
  - 2023-greedy-actor-critic-a-new-conditional-cross-entropy-method-for-policy-improvement
  - 2025-deep-reinforcement-learning-with-gradient-eligibility-traces
  - 2025-investigating-the-utility-of-mirror-descent-in-off-policy-actor-critic
---
A key goal in the group is to develop better actor-critic algorithms. A key component of these algorithms is to learn the critic (value function), and so better value estimation algorithms are critical for actor-critic. For example, we have incorporated gradient methods into value estimation for PPO ([94], work on gradient eligibility traces listed below). 

For actor-critic, though, it is also key to understand how to update the parameterized policy (actor) and interactions with the critic (value estimates). We have a line of work understanding a variety of different updates for the actor [61,63,92], as well as better understanding how to parameterize the actor [73,76,99]. We are pursuing a variety of different avenues to better understand why actor-critic methods can be finicky, with the goal to get stable learning performance in continuous control. 
