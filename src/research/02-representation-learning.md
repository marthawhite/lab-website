---
title: Representation Learning
order: 2
publications:
  - 2021-fuzzy-tiling-activations-a-simple-approach-to-learning-sparse-representations-online
  - 2023-investigating-the-properties-of-neural-network-representations-in-reinforcement-learning
  - 2022-representation-alignment-in-neural-networks
  - 2019-the-utility-of-sparse-representations-for-control-in-reinforcement-learning
  - 2024-real-time-recurrent-learning-using-trace-units
  - 2021-general-value-function-networks
---
Another of the primary research questions in my lab is how to learn representations from a stream of correlated data. We have made significant progress, with papers on sparse representations [C19,C33,C39,C51,C104] and on recurrent neural networks [C42,C84, J50, J71]. A key insight in my group is that sparse activations within the network can significantly improve learning stability [C32], with one of our works showing that such sparsity naturally arises when using an objective that optimizes for online adaptation [C27]. We have also developed a simple activation to facilitate learning such sparse activations [C16], and in recent empirical studies [J3,] have found it can significantly improve performance as compared to the standard ReLU activation. 

For recurrence, we are exploring architectures that make learning more feasible in RL. In particular, we are looking at diagonal or block-diagonal archiectures for which RTRL is efficient, facilitating online learning, such as in our work on Recurrent Trace Units. We have also considered extensions on TD networks called General Value Function Networks [J50] and a completely different way to learn RNNs framing the problem as fixed points [C42].
