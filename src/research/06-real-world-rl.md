---
title: Real-World Reinforcement Learning
order: 6
publications:
  - 2023-gvfs-in-the-real-world-making-predictions-online-for-water-treatment
  - 2026-pc-gym-benchmark-environments-for-process-control-problems
  - 2021-sim2real-in-robotics-and-automation-applications-and-challenges
  - 2023-exploiting-action-impact-regularity-and-exogenous-state-variables-for-offline-reinforcement-learning
  - 2023-the-in-sample-softmax-for-offline-reinforcement-learning
  - 2026-dynamics-models-for-offline-yperparameter-selection-in-real-world-RL
---
I have recently made an intentional shift to using reinforcement learning in process control, including on real physical systems. We have published one key work on our project using reinforcement learning for a real water treatment problem [74], where we set up a physical pilot system in collaboration with a town in Alberta and with an engineering firm. This work led to a larger vision that reinforcement learning could change how we do process control and help facilities reduce costs and improve sustainability. I have started a venture-backed company, called RLCore, that is bringing this technology to water and wastewater treatment plants, and ultimately broadly to industrial automation. It has been deployed to 5 facilities (some for more than 16 months), saving between 10-25% in chemical costs and improving process reliability, with more deployments in the pipeline. 

A key differentiation in our work is focusing on the use of reinforcement learning without access to a simulator, which remains a big open question. Most advanced process control strategies either require strict assumptions or access to a model (simulator) of the environment. Our focus on learning in deployment is largely unique, but I think is critical for wide-spread deployment of reinforcement learning in process control. Note that the most common route has been to painstakingly create simulators, train policies in those simulators, and then transfer to the real world, resulting in the well-known sim2real gap; I was invited to participate in a debate and follow-up position paper on sim2real in robotics [54]. 

Much of our work on off-policy learning and continual learning is towards practical deployment. A couple of other key topics focused on deployment in the real world is offline-to-online RL (aka hybrid RL) and handling hyperparameters. In offline-to-online RL, the goal is to leverage historical data and then continue updating learning online in deployment [64,65,68,76]. Though learning online is arguably the most important component, starting from a better solution when deploying in the realworld is also key. Another often overlooked issue is the reliance of RL algorithms on hyperparameters, and the barrier this causes to use in applications. In simulation, we can test many hyperparameters; this is not feasible on a real system (as each sample is precious and we cannot run terrible agents). We have developed ideas around how to specify hyperparameters without access to the real system or a simulator [60,97,105]. 
