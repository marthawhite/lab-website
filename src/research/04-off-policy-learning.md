---
title: Off-Policy Learning
order: 1
publications:
  - 2022-a-generalized-projected-bellman-error-for-off-policy-value-estimation-in-reinforcement-learning
  - 2022-robust-losses-for-learning-value-functions
  - 2018-an-off-policy-policy-gradient-theorem-using-emphatic-weightings
  - 2023-off-policy-actor-critic-with-emphatic-weightings
  - 2019-importance-resampling-for-off-policy-prediction
  - 2012-off-policy-actor-critic
---
This direction constitutes the major focus in my lab. In the off-policy learning setting, data from a behaviour policy is used to learn about a different target policy. For example, a water treatment agent could execute a trusted policy (behavior) for controlling mixing speeds, and learn an improved policy (target) in the background. Once it is confident about the new policy, it can deploy it, or report expected outcomes under this new policy to the human operator. 

This research question is critical because off-policy learning is critical for sample efficiency: reducing the amount of interaction needed during learning. For real-world deployment, each sample is precious. Logged, older data is off-policy, and we want to be able to re-use that data. On-policy learning would constrain the agent to only use the most recent data. Though natural, off-policy learning results in more difficult learning problems, due to distribution shifts. It is well-known that, due to this issue, there are convergence issues with some of the foundational algorithms in reinforcement learning, including temporal difference learning methods and actor-critic methods. Despite these known issues, much of the community continues to use these algorithms, potentially because they are simple and well-understood and also potentially because so much research is conducted in simulation where soundness and reliability are less of an issue than in the real world. 

We have made several theoretical contributions resolving these issues, and to improving these foundational algorithms that are widely used. There are two most important contributions. One introduces a unified objective that simplifies sound algorithm development for foundational TD learning methods (Patterson et al, Generalized Projected Bellman Error, 2022), that also provides a comprehensive study to understand how to make it more feasible to switch from the well-understood foundational algorithms to these newer, sound ones. The second solves a long-standing open problem about the existence of a Policy Gradient Theorem for the off-policy setting (Imani et al. 2018), with a follow-up journal paper providing further insights and a sound, practical actor-critic algorithm (Graves et al., 2023). These papers actually fix an issue in my own paper, called Off-policy Actor Critic published in 2012. This paper introduced the first off-policy actor-critic algorithm, and it has become the foundation of many other algorithms since. 

In addition to these papers that provide the most important insights for algorithm development, my lab has published more than 30 papers on off-policy reinforcement learning that would be too long of a list above.
