---
layout: post
title: "Spectral Geometry of Attention: From Information Routing to Uncertainty"
date: 2026-05-01
tags: [ai, transformers, geometry, interpretability, uncertainty]
categories: [science, geometry, machine-learning]
featured: True
---

## Introduction

Attention is often described through heatmaps: grids of numbers showing how much each token attends to every other token. This view is intuitive, and it has been extremely useful for understanding transformers. But it also hides something important.

An attention head is not only a table of probabilities. It is also an **operator**: it takes information stored across tokens and routes it to new token positions.

This post summarizes the main idea of our paper: attention can be studied through the lens of **spectral geometry**. By doing so, we can better distinguish between two phenomena that are often confused:

1. attention mass concentrating on a few tokens,
2. genuine information routing across the sequence.

This distinction matters because attention sinks can make a head look important even when little token-dependent information is actually being routed. Our work introduces a geometric framework that separates these effects and uses the resulting signal to improve uncertainty estimation in large language models.

<figure>
  <img src="/assets/img/teaser_Neurips2026.svg" alt="Teaser figure showing the three blocks of the contribution">
  <figcaption><strong>Figure 1.</strong> <em>(Right block)</em> We study transformer attention as a functional map between Hilbert spaces equipped with an inner product. The properties of the operator change with the standard Euclidean measure (blue) and with an intrinsic probability geometry measure (red). <em>(Center block)</em> Parametrizing a row-stochastic causal map that interpolates between a copy map and a sink map, the Euclidean spectrum gets biased towards the sink, while reweighting the input measure relaxes this bias. <em>(Left block)</em> We use these insights to design an uncertainty quantifier, identifying uncertainty as a routing-capacity collapse in selected heads.</figcaption>
</figure>

---

## Step 1: Attention as an operator

In a transformer, an attention head computes an attention matrix $A$ and applies it to the value matrix $V$:

$$
V \mapsto AV.
$$

The usual interpretation is row-wise: each row of $A$ is a probability distribution over tokens. Row $i$ tells us where token $i$ is looking.

But there is another interpretation. The matrix $A$ is a **linear operator on token-space signals**. It takes a function defined on input tokens and transports it to output tokens.

In other words, instead of asking only:

> Which tokens receive attention mass?

we ask:

> Which token-dependent signals survive the attention operation?

This shift from local attention weights to global operator behavior is the starting point of our work.

---

## Step 2: Why the usual spectrum can be misleading

A natural way to study an operator is through its spectrum. For attention, one might look at the singular values of $A$, or equivalently at the spectrum of:

$$
A^\top A.
$$

However, this standard Euclidean analysis has a structural problem.

Attention matrices are row-stochastic: every row sums to one. In causal transformers, early tokens are visible to many later positions, while later tokens are visible to fewer positions. This naturally creates **attention sinks**, where large amounts of attention mass accumulate on early tokens.

The issue is that Euclidean spectral diagnostics can amplify this column-mass concentration. As a result, a head may appear to have strong spectral structure simply because it sends mass to a sink token, not because it preserves meaningful token-dependent variation.

In the extreme case, all tokens attend to the first token. The attention map has a strong spectral signal, but it has collapsed all token information into one direction.

So the usual spectrum can confuse:

| Phenomenon | What it means |
|---|---|
| Sink concentration | Attention mass accumulates on a few tokens |
| Routing capacity | Token-dependent information survives the attention step |

The goal is to separate these two.

---

## Step 3: The Token Difference Operator

To fix this, we introduce the **Token Difference Operator** (TDO).

Instead of treating attention as an operator in ordinary Euclidean space, we view it as a map between two weighted Hilbert spaces on the token sequence:

$$
A : L^2(\mu) \to L^2(\pi).
$$

Here, $\mu$ and $\pi$ are measures that define the geometry of the input and output token spaces.

Given this setup, the adjoint of attention is:

$$
A^* = \Omega_\mu^{-1} A^\top \Omega_\pi,
$$

and the Token Difference Operator is:

$$
D_{\mu,\pi} = A^*A = \Omega_\mu^{-1} A^\top \Omega_\pi A.
$$

This operator measures how much attention stretches or compresses token-space signals under the chosen geometry.

The key point is that the spectrum of $D_{\mu,\pi}$ depends on the geometry. If we choose the wrong geometry, we see sink bias. If we choose the right geometry, we isolate genuine routing.

---

## Step 4: The intrinsic probability geometry

We propose an intrinsic geometry induced by attention itself.

We choose the output measure to be uniform:

$$
\pi = \frac{1}{n}\mathbf{1},
$$

and define the input measure by pulling it back through attention:

$$
\mu = A^\top \pi.
$$

Intuitively, $\mu$ is the average amount of attention received by each token. Tokens that receive more mass are weighted accordingly in the input geometry.

This choice removes the artificial amplification of sink tokens. The constant mode becomes the trivial mode that every row-stochastic attention map preserves, while the remaining modes describe actual token-dependent routing.

In this geometry, the operator is non-expansive:

$$
\|Af\|_\pi \leq \|f\|_\mu.
$$

The leading mode is always the constant function. Therefore, the interesting part is not the first eigenvalue, but the spectrum on the centered subspace: the directions that carry variation between tokens.

---

## Step 5: Separating the mean from routing

This leads to one of the central decompositions of the paper.

Given a value matrix $V$, we decompose it into its attention-weighted mean and its centered component:

$$
m = \mu^\top V, \qquad V_c = V - \mathbf{1}m.
$$

Then the output of attention decomposes as:

$$
AV = \mathbf{1}m + AV_c.
$$

This equation has a simple interpretation.

The term $\mathbf{1}m$ is the transported mean. It is the part that every row-stochastic attention map preserves by construction.

The term $AV_c$ is the routed component. It contains the token-dependent information that survives the attention step.

The nontrivial spectrum of the Token Difference Operator controls how much of this centered variation remains. In particular, the second eigenvalue controls the strongest possible contraction of centered signals.

This gives a clean mathematical separation between:

1. what attention preserves automatically,
2. what attention actually routes.

---

## Step 6: What this tells us about attention heads

We test this idea on real attention heads.

The main prediction is that intrinsic spectral diagnostics should be less dominated by sink behavior and more aligned with output dimensionality.

This is exactly what we observe.

<figure>
  <img src="/assets/img/representative_heads%20(1).svg" alt="Representative attention heads with metric comparison">
  <figcaption><strong>Figure 2.</strong> Four representative attention heads from LLaMA-3.1-8B (top row) and how the different metrics classify their routing behaviour (bar charts). The intrinsic TDO (red and orange bars) is the only metric that correctly aligns the <em>Sink-Biased</em> head with the other high-routing maps (copying and shifting), instead of collapsing it onto the pure <em>Sinking</em> head.</figcaption>
</figure>

Consider four heads with clear routing roles: a *copying* head that preserves token information along the diagonal, a *sinking* head that collapses everything to the first token, a *sink-biased* head that has substantial sink mass but still routes information, and a *shifting* head that routes information one position back.

Standard attention statistics, Euclidean spectra, and graph-based diagnostics struggle here. They often treat the sink-biased head almost identically to the pure sink head, because they conflate column-mass concentration with routing collapse. The previous-token score correctly flags the shifting head, but for the same reason misses the copying head, which routes through a different position.

The intrinsic TDO is the only metric that assigns high routing scores to copying, shifting, *and* sink-biased heads, while still separating them from the pure sink head. This matches what we want from a routing diagnostic.

Stepping beyond cherry-picked examples, we can plot the metrics against sink score and against the output entropy $H(AV)$ across all heads in the model.

<figure>
  <img src="aseets/img/sink_vs_metrics%20(1).svg" alt="Scatterplots of diagnostics versus sink score">
  <figcaption><strong>Figure 3.</strong> Each diagnostic for attention heads of LLaMA-3.1-8B on 200 inputs, plotted against sink score. Spearman correlations are reported in the top-right of each panel. Raw attention statistics and Euclidean spectra correlate strongly with sink score; the intrinsic TDO statistics (rightmost two panels) decorrelate from it.</figcaption>
</figure>

The intrinsic TDO is essentially measuring something different from where the mass goes. The next question is whether that "something" lines up with the actual output dimensionality of the head.

<figure>
  <img src="/assets/img/output_vs_metrics%20(1).svg" alt="Scatterplots of diagnostics versus output spectral entropy">
  <figcaption><strong>Figure 4.</strong> Same heads as above, now plotted against the output entropy $H(AV)$. The intrinsic TDO statistics show the strongest correlation with output dimensionality, while raw entropies and counting-geometry ranks fail in complementary ways.</figcaption>
</figure>

So sink behaviour does not always imply routing collapse, and the intrinsic spectrum is what we need to tell the two apart.

---

## Step 7: From routing to uncertainty

The second part of the paper uses this geometric signal for uncertainty estimation.

Many uncertainty methods for language models rely on output probabilities: entropy, perplexity, likelihood, or sampling-based consistency. These methods look at the model after all internal computation has already been compressed into logits.

But if relevant distinctions are lost before reaching the logits, probability-based uncertainty can miss them.

A clean demonstration of this comes from a controlled copy task. The model is given a bit string and asked to reproduce it. Two input families are compared: the all-zero string (easy) and a string with a single one at a hidden position (hard).

<figure>
  <img src="/img/perturbation_analysis_across_metrics.svg" alt="Perturbation analysis showing routing-based signals remain sensitive to a task-relevant perturbation">
  <figcaption><strong>Figure 5.</strong> Perturbation sensitivity in a controlled copy task. As the sequence length $n$ grows, perplexity (left) and mean token entropy collapse the two input families together, even though they differ in a task-relevant position. Routing-based signals (RAUQ and ours) keep the two families separated, because the distinction is still visible upstream in the attention geometry.</figcaption>
</figure>

As the sequence grows, perplexity and token entropy stop distinguishing the two families. The information is being compressed away before it reaches the logits. But routing-based signals, computed from attention geometry inside the model, still see the difference. This is the motivation for looking upstream.

We introduce **Spectral Attention Uncertainty Quantification**, or **SAUQ**. The intuition is:

> If important routing heads lose spectral richness during generation, the model may be uncertain, even if its output probabilities still look confident.

SAUQ combines token probability with a spectral routing score. In simplified form, the recurrence is:

$$
c_t = \alpha\, p_t + (1-\alpha)\, s_t\, c_{t-1}.
$$

Here:

- $p_t$ is the probability assigned to the generated token,
- $s_t$ is the intrinsic spectral routing score,
- $c_t$ is the propagated confidence,
- $\alpha$ controls the balance between local probability and routed confidence.

High spectral participation means that the head is still routing information through multiple active directions. Spectral collapse reduces propagated confidence.

---

## Step 8: Empirical results

The empirical picture is nuanced.

On question-answering tasks, SAUQ is competitive with strong unsupervised uncertainty estimators, but it is not always the best method overall.

On summarization tasks, however, SAUQ performs especially well. It achieves the strongest summarization mean among the compared methods, with the clearest gains on SAMSum and XSum.

A condensed view of the main results (Prediction Rejection Ratio, higher is better):

| Estimator | Category | QA mean | Summ. mean |
|---|---|---|---|
| Perplexity | Single pass | 0.2962 | 0.4562 |
| Mean Token Entropy | Single pass | 0.3716 | 0.4464 |
| LMCheck-EigValLap | Sample-based | **0.4206** | 0.3855 |
| LUQ | Sample-based | 0.3920 | 0.3243 |
| SAR | Sample-based | 0.3724 | 0.3003 |
| RAUQ | Single pass | 0.3677 | 0.4139 |
| LapEigValRAUQ | Single pass | 0.3282 | 0.4096 |
| LogDetRAUQ | Single pass | 0.3280 | 0.4168 |
| **SAUQ (ours)** | Single pass | 0.3831 | **0.5069** |

This fits the motivation of the method. Summarization depends heavily on preserving long-range distinctions across the context. When those distinctions are compressed before reaching the logits, output-probability methods can lose useful uncertainty information. A routing-based spectral signal can still detect that something has collapsed.

The result is not that SAUQ replaces all uncertainty methods. Rather, it provides a complementary single-pass signal, especially useful when uncertainty is tied to long-context information routing.

---

## Main contributions

The paper makes four main contributions.

First, it introduces a **global operator-theoretic view of attention**. Instead of studying attention only as row-wise probabilities, it treats each attention head as a functional operator acting on token-space signals.

Second, it shows a **theoretical separation between sinks and dimensional collapse**. Standard Euclidean spectra can be biased by sink tokens, while the intrinsic probability geometry separates the constant mode from token-dependent routing modes.

Third, it provides a **spectral description of routing capacity**. The Token Difference Operator quantifies how much centered token variation survives one attention step and how this relates to the dimensionality of the head output.

Fourth, it introduces **SAUQ**, a single-pass uncertainty estimator that uses spectral routing information from attention heads rather than relying only on output probabilities.

---

## Why this matters

The broader message is that attention is not just a probability matrix.

It is a routing operator with a geometry of its own.

Once we analyze attention in the right geometry, we can distinguish passive mass concentration from genuine information flow. This gives us better tools for interpreting attention heads, understanding routing collapse, and detecting uncertainty before it appears in the final output probabilities.

This is especially relevant for long-context and long-form generation, where failures may come not from the final token distribution alone, but from information being compressed or lost earlier in the network.

---

## Conclusion

Spectral geometry gives a new way to look at attention.

Instead of asking only where attention mass goes, we ask what information survives the attention step. The Token Difference Operator makes this question precise. Its intrinsic spectrum separates sink effects from true routing capacity, connects attention to output dimensionality, and provides a useful signal for uncertainty estimation.

In short, attention heads should not be understood only as heatmaps. They should also be understood as geometric operators that route, compress, and sometimes collapse information.

The next time we inspect an attention map, the important question may not be:

> Where is the model looking?

but rather:

> What information is still being routed?
