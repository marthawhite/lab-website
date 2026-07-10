---
title: Model-Based RL & Planning
order: 3
publications:
  - 2024-goal-space-planning-with-subgoal-models
  - 2024-multistep-predecessor-models-and-mitigating-errors-due-to-hallucinated-value-in-dyna-style-planning
  - 2020-selective-dyna-style-planning-under-limited-model-capacity
  - 2019-planning-with-expectation-models
  - 2018-organizing-experience-a-deeper-look-at-replay-mechanisms-for-sample-based-planning-in-continuous-state-domains
---
Learning and using models is critical towards developing sample efficient agents that learn in deployment. As a simple analogy, consider a vacuum cleaning robot that learns to vacuum the living room and then is moved to a new room. If the policy is a memorized procedure to vacuum the living room, then the agent will not be able to leverage that knowledge in the new room. But a learned dynamics model of the environment might actually generalize between the two rooms. This dynamics model outputs predictions of expected sensory information, after executing an action. The agent can use this model to compute its policy, and adapt its behavior more quickly when seeing novel situations.

This intuition, unfortunately, has not translated into reality, particularly due to the difficulties with learning these dynamics models. We have shown in several works that small inaccuracies in these learned dynamics models can result in bad policies [C26,C36,C44,J79]. It has motivated the introduction of an alternative approach in my lab, that we call goal-space planning [J86]. This approach learns only local models in an abstract space.  Importantly, the model itself is composed only of learned policies and learned value functions, for which we have good (off-policy) algorithms. We have shown that, with this form of model, we can get efficient planning and are much more robust to model inaccuracies. 

