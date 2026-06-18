---
layout: post
title: "Spectral Geometry of Attention: From Information Routing to Uncertainty"
date: 2026-05-01
tags: [ai, transformers, geometry, interpretability, uncertainty]
categories: [science, geometry, machine-learning]
featured: True
---

*Joint work with [Simone Melzi](https://sites.google.com/site/melzismn/) and [Maks Ovsjanikov](http://www.lix.polytechnique.fr/~maks/). The paper is currently under review.*


## Introduction

Attention has been studied from many angles. The most common one is row-wise: each row of an attention matrix is a probability distribution over tokens, and the resulting heatmaps tell us where each query position is looking. Other lines of work treat attention as a graph operator, a Markov transition matrix, or analyze the QK eigenspectrum. These perspectives have produced real insights.

What has been less explored is a different angle on the same object: the single-step map $V \mapsto AV$ as a global linear operator between token-space signals, with its own geometry on each side. This is the perspective our paper develops.

The reason this matters is that the conventional spectral analysis of attention — singular values of $A$, eigenvalues of $A^\top A$ — uses an unweighted Euclidean geometry that does not fit a row-stochastic causal map well. As a consequence, three things end up tangled together that the paper argues should be separated:

1. **attention sinks**: mass accumulating on a few early tokens,
2. **dimensional collapse**: the head output losing effective rank,
3. **routing capacity**: how much token-dependent information survives one attention step.

Standard diagnostics conflate these. The framework we introduce — a Token Difference Operator equipped with an intrinsic probability geometry pulled back from attention itself — separates them. The resulting spectral signal also turns out to carry useful information for uncertainty estimation in language models, especially when the task depends on routing distinctions through long contexts.

<figure>
  <img src="/assets/img/teaser_Neurips2026.svg" alt="Teaser figure showing the three blocks of the contribution" style="width: 100%;">
  <figcaption><strong>Figure 1.</strong> <em>(Right block)</em> We study transformer attention as a functional map between Hilbert spaces equipped with an inner product. The properties of the operator change with the standard Euclidean measure (blue) and with an intrinsic probability geometry measure (red). <em>(Center block)</em> Parametrizing a row-stochastic causal map that interpolates between a copy map and a sink map, the Euclidean spectrum gets biased towards the sink, while reweighting the input measure relaxes this bias. <em>(Left block)</em> We use these insights to design an uncertainty quantifier, identifying uncertainty as a routing-capacity collapse in selected heads.</figcaption>
</figure>

---

## Step 1: Attention as an operator

In a transformer, an attention head computes an attention matrix $A$ and applies it to the value matrix $V$:

$$
V \mapsto AV.
$$

The standard view is row-wise: each row of $A$ is a probability distribution over tokens, and row $i$ tells us where token $i$ is looking. This is informative, and it is not the only way to read $A$. Prior work has analyzed attention as a graph operator on an associated Laplacian, as a Markov transition matrix iterated through depth, or through the spectrum of $QK^\top$.

The angle we take is specific in two ways. First, we focus on the **single-step** map $V \mapsto AV$ rather than its repeated or graph-Laplacian variants. Second, we treat the input and output token spaces as carrying their **own geometries**, so that the same matrix $A$ is read as a linear map between two distinct Hilbert spaces rather than as an operator on a single Euclidean space. With this setup, the natural object of study is no longer the raw spectrum of $A^\top A$ but the spectrum of an associated operator that takes both geometries into account.

---

## Step 2: Why the usual spectrum can be misleading

The standard way to study an operator is through its spectrum, so for attention one might look at the singular values of $A$ or the eigenvalues of:

$$
A^\top A.
$$

This analysis carries a structural problem.

Attention matrices are row-stochastic: every row sums to one. Under causal masking, early tokens are visible to many later positions while later tokens are visible to fewer, so column mass naturally piles up on the first tokens — the well-documented attention sink phenomenon. The Euclidean spectrum is sensitive to this column-mass concentration. In the extreme case where every row attends only to the first token, $A^\top A$ becomes a rank-one matrix with all its spectral energy at the sink coordinate. The matrix looks spectrally rich, but no token-dependent variation has actually been routed.

Three distinct phenomena get tangled in this picture:

| Phenomenon | What it means |
|---|---|
| Sink concentration | Column mass piles up on a few (typically early) tokens |
| Dimensional collapse | The head output $AV$ loses effective rank |
| Routing capacity | Token-dependent variation survives the attention step |

These are related but not equivalent. Rank deficiency of causal $A$ forces both sink concentration and routing collapse, and routing collapse implies dimensional collapse downstream. But a head can have substantial sink mass and still route a rich centered signal: the converse fails. The goal of the framework is to give a diagnostic that does not flatten these three regimes onto the same number.

---

## Step 3: The Token Difference Operator

We view $A$ as a map between two weighted Hilbert spaces on the token sequence:

$$
A : L^2(\mu) \to L^2(\pi).
$$

Here $\mu$ and $\pi$ are positive measures encoding the geometries of the input and output token spaces. The adjoint of attention under these inner products is:

$$
A^* = \Omega_\mu^{-1} A^\top \Omega_\pi,
$$

and the **Token Difference Operator** (TDO) is:

$$
D_{\mu,\pi} = A^*A = \Omega_\mu^{-1} A^\top \Omega_\pi A.
$$

The operator is self-adjoint and positive semidefinite in $L^2(\mu)$, and its eigenvalues are the squared gains of $A$ between the two geometries. The standard Euclidean Gram matrix $A^\top A$ is just the special case $\mu = \pi = \mathbf{1}$. The point of the construction is that the spectrum of $D_{\mu,\pi}$ depends on the choice of geometry, so the question becomes: which geometry isolates the routing signal?

---

## Step 4: The intrinsic probability geometry

The choice we make is to take the output geometry uniform and pull the input geometry back through attention:

$$
\pi = \frac{1}{n}\mathbf{1}, \qquad \mu = A^\top \pi.
$$

Both are probability measures. Intuitively, $\mu_j$ is the average attention mass received by token $j$ across all query positions, so sink tokens are upweighted in the input geometry, exactly compensating for the column-mass imbalance that biased the Euclidean spectrum.

Under this choice, attention is non-expansive:

$$
\|Af\|_\pi \leq \|f\|_\mu,
$$

with operator norm one. The constant function attains this norm, so $\lambda_1(D_{\mu,\pi}) = 1$ and its eigenvector is the constant mode. Every row-stochastic attention map preserves constants automatically, so the leading eigenvalue carries no information about routing — it is fixed by the constraints alone. The informative part of the spectrum lives on the $\mu$-orthogonal complement of the constants: the centered subspace, which carries actual token-dependent variation.

---

## Step 5: Separating the mean from routing

This leads to a clean decomposition of the head output. Define the $\mu$-weighted mean of the value matrix and the centered remainder:

$$
m = \mu^\top V, \qquad V_c = V - \mathbf{1}m.
$$

Since $A\mathbf{1} = \mathbf{1}$, the output of attention splits as:

$$
AV = \mathbf{1}m + AV_c.
$$

The first term, $\mathbf{1}m$, is the transported mean. Every row-stochastic attention map produces this term automatically, and it carries the same value at every token position. The second term, $AV_c$, is what actually depends on which token is being read out: it is the routed component.

The nontrivial spectrum of $D_{\mu,\pi}$ controls how much of this centered variation survives. In particular, the second eigenvalue $\lambda_2(D_{\mu,\pi})$ bounds the contraction of the routed component:

$$
\|AV_c\|_\pi \leq \sqrt{\lambda_2(D_{\mu,\pi})}\, \|V_c\|_\mu.
$$

This is the precise sense in which the spectrum measures routing capacity. After the trivial constant mode has been accounted for, it bounds the energy of the centered, token-dependent component that can survive one attention step.

---

## Step 6: What this tells us about attention heads

With the framework in place, we can test it on real attention heads. The two predictions are that intrinsic spectral diagnostics should be (i) less dominated by sink concentration and (ii) more aligned with the dimensionality of the head output than their Euclidean counterparts.

<figure>
  <img src="/assets/img/representative_heads%20(1).svg" alt="Representative attention heads with metric comparison" style="width: 100%;">
  <figcaption><strong>Figure 2.</strong> Four representative attention heads from LLaMA-3.1-8B (top row) and how the different metrics classify their routing behaviour (bar charts). The intrinsic TDO (red and orange bars) is the only metric that correctly aligns the <em>Sink-Biased</em> head with the other high-routing maps (copying and shifting), instead of collapsing it onto the pure <em>Sinking</em> head.</figcaption>
</figure>

The four heads in Figure 2 are chosen to expose failure modes of standard diagnostics: a *copying* head that preserves token-dependent information along the diagonal, a pure *sinking* head that collapses everything onto the first token, a *sink-biased* head with substantial sink mass but nontrivial routing through other positions, and a *shifting* head that routes information one position back.

Counting-geometry and graph-based diagnostics treat the sink-biased head almost identically to the pure sink head, because they cannot separate column-mass concentration from routing collapse. Previous-token score correctly flags the shifting head, but for the same reason misses the copying head, which routes through a different position. The intrinsic TDO is the only diagnostic in this comparison that assigns high routing scores to copying, shifting, and sink-biased heads while still separating them from the pure sink head.

<figure>
  <img src="/assets/img/sink_vs_metrics%20(1).svg" alt="Scatterplots of diagnostics versus sink score" style="width: 100%;">
  <figcaption><strong>Figure 3.</strong> Each diagnostic for attention heads of LLaMA-3.1-8B on 200 inputs, plotted against sink score. Spearman correlations are reported in the top-right of each panel. Raw attention statistics and Euclidean spectra correlate strongly with sink score; the intrinsic TDO statistics (rightmost two panels) decorrelate from it.</figcaption>
</figure>

Across the full head population, this generalizes. Raw attention statistics, Euclidean spectra, and previous-token score all correlate strongly with sink score, with Spearman correlations between 0.5 and 1 in absolute value. The intrinsic TDO diagnostics decorrelate from sink score: they are measuring something other than where the mass goes.

<figure>
  <img src="/assets/img/output_vs_metrics%20(1).svg" alt="Scatterplots of diagnostics versus output spectral entropy" style="width: 100%;">
  <figcaption><strong>Figure 4.</strong> Same heads as above, now plotted against the output entropy $H(AV)$. The intrinsic TDO statistics show the strongest correlation with output dimensionality, while raw entropies and counting-geometry ranks fail in complementary ways.</figcaption>
</figure>

The next question is whether that "something" lines up with the output dimensionality of the head. Plotting the same diagnostics against the spectral entropy $H(AV)$, the intrinsic TDO statistics show the strongest correlation. The baselines fail in complementary ways: raw entropies are dominated by sink structure, while log-determinant and Laplacian-based scores flag the collapsed extreme but miss the full range of output dimensionalities.

The conclusion is structural rather than head-specific. Sink concentration does not by itself imply that a head has collapsed, and a clean diagonal does not by itself imply rich routing. The intrinsic spectrum is what tells these regimes apart.

---

## Step 7: From routing to uncertainty

The second half of the paper uses this routing signal for uncertainty estimation. Most uncertainty methods for language models work at the output: entropy of the next-token distribution, perplexity, sequence likelihood, sampling-based consistency. These quantities are computed after the residual stream has been compressed into logits, so when task-relevant distinctions are lost upstream they cannot be recovered downstream.

<figure>
  <img src="/assets/img/perturbation_analysis_across_metrics (1).svg" alt="Perturbation analysis showing routing-based signals remain sensitive to a task-relevant perturbation" style="width: 100%;">
  <figcaption><strong>Figure 5.</strong> Perturbation sensitivity in a controlled copy task. As the sequence length $n$ grows, perplexity (left) and mean token entropy collapse the two input families together, even though they differ in a task-relevant position. Routing-based signals (RAUQ and ours) keep the two families separated, because the distinction is still visible upstream in the attention geometry.</figcaption>
</figure>

A controlled copy task illustrates this. The model is given a bit string and asked to reproduce it. Two input families are compared: the all-zero string, and a string with a single one at a hidden position. As the sequence length grows, perplexity and mean token entropy stop distinguishing the two families even though they differ in a task-relevant position — the distinction is being compressed before reaching the logits. Routing-based signals computed from hidden-layer attention geometry remain sensitive to it.

This motivates **Spectral Attention Uncertainty Quantification** (SAUQ): when routing capacity collapses inside a head, the model may be uncertain even if its output probabilities still look confident. SAUQ combines local token probability with a spectral routing score in a recurrent confidence:

$$
c_t = \alpha\, p_t + (1-\alpha)\, s_t\, c_{t-1}.
$$

Here:

- $p_t$ is the probability assigned to the generated token,
- $s_t = \mathrm{PR}(D_{\mu,\pi,t})$ is the participation ratio of the TDO at step $t$,
- $c_t$ is the propagated confidence,
- $\alpha$ controls the balance between local probability and routed confidence.

The recurrent structure follows RAUQ. What changes is the quantity entering the recurrence: a participation ratio of an intrinsic spectral operator rather than a scalar attention statistic.

---

## Step 8: Empirical results

The empirical picture is regime-dependent rather than uniformly positive.

On question-answering tasks, SAUQ is competitive with strong unsupervised estimators but is not the best method on average — several sample-based baselines obtain stronger QA means. On summarization, where uncertainty depends more on preserving long-range distinctions through the context, SAUQ has the strongest mean among the methods considered, with the clearest gains on SAMSum and XSum.

A condensed view of the main numbers (Prediction Rejection Ratio, higher is better):

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

The pattern is consistent with the motivation. When task-relevant distinctions are still visible in the output distribution, output-probability estimators already capture them, and routing-based signals do not add much. When the relevant information has been compressed upstream, routing-based spectral signals can still see what the logits no longer can. SAUQ is therefore best read as a complementary single-pass signal — particularly useful for long-context generation — rather than as a uniform replacement for probability-based methods.

The comparison with LapEigValRAUQ and LogDetRAUQ is the most direct ablation of the framework's contribution: these methods share SAUQ's recurrence and head-selection protocol, and differ only in what spectral quantity enters the routing score. The ranking on summarization mirrors the diagnostic comparison from the previous section — intrinsic TDO statistics carry more of the routing signal than Laplacian or log-determinant alternatives, and this translates into stronger single-pass uncertainty.

---

## Main contributions

The paper makes four contributions.

First, a **global single-step operator view of attention**. We treat each attention head as a linear functional operator $V \mapsto AV$ between geometrically distinct token spaces, focusing on the action of one attention step rather than on repeated or graph-Laplacian variants used in prior work.

Second, a **separation between sinks, dimensional collapse, and routing capacity**. We show that the Euclidean spectrum of $A$ is structurally biased by column-mass concentration, and derive an intrinsic probability geometry in which the constant mode is fixed and the remaining spectrum describes the centered, token-dependent routing.

Third, a **spectral characterization of routing**. The Token Difference Operator gives a precise bound on how much centered variation survives one attention step, and its participation ratio aligns with the dimensionality of the head output across the model.

Fourth, a **single-pass uncertainty estimator**. SAUQ replaces the scalar attention statistic inside an established recurrence with an intrinsic spectral routing score, and provides a complementary uncertainty signal that is particularly effective on long-form summarization.

---

## Why this matters

The broader point is that the row-stochastic / heatmap view and the operator-geometric view are **complementary**, not competing. Heatmaps tell us where attention mass goes; the spectrum of the Token Difference Operator tells us what variation survives the routing step that this mass implements. Both descriptions act on the same matrix.

What changes once the second description is in place is what counts as a "rich" attention head. A head with substantial sink mass is not automatically collapsed, and a head with a clean diagonal is not automatically routing in a meaningful way: what matters is the centered spectrum under the right geometry. This has practical consequences for interpretability — where sink behavior is sometimes used as a proxy for low information flow — and for uncertainty estimation, where routing collapse upstream can predict failures the output distribution will not.

---

## Conclusion

Spectral geometry gives a complementary way to read attention. Standard Euclidean diagnostics conflate sink concentration, dimensional collapse, and routing capacity. The intrinsic probability geometry separates the constant mode from the centered routing modes and gives a clean bound on how much token-dependent variation survives one attention step. The same spectral signal yields a complementary single-pass uncertainty estimator, with the strongest gains where uncertainty depends on long-range routing.
