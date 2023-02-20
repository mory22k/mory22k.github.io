---
layout: post
title: "[MCMC5] ギブスサンプリング法"
categories: note
description: 効率の良いMCMC法の1つであるギブスサンプリングをMH法の特殊例という観点から導入する．
tags: MCMC Monde_Carlo_method
katex: true
---

効率の良いMCMC法の1つであるギブスサンプリングをMH法の特殊例という観点から導入する．

{% include contents/mcmc.md %}

## 状況設定

次のような状況を考える．

- 確率分布<tex>$P(\bm x)$</tex>に従う乱数列<tex>$\{\bm x^i\}$</tex>を生成したい
- 目標となる確率分布<tex>$P(\bm x)$</tex>から直接乱数<tex>$\bm x$</tex>をサンプルすることは難しい
- 条件付き確率<tex>$P(x_j | \bm x_{\setminus j})$</tex>からサンプルすることは容易い

ここで<tex>$\bm x_{\setminus j}$</tex>は，<tex>$\bm x$</tex>から<tex>$j$</tex>番目の要素を除外したような配列である．

$$
    \bm x \coloneqq \left[\begin{darray}{} x_1 \\ \vdots \\ x_{j-1} \\ x_j \\ x_{j+1} \\ \vdots \\ x_N \end{darray}\right]
    \implies
    \bm x_{\setminus j} \coloneqq \left[\begin{darray}{} x_1 \\ \vdots \\ x_{j-1} \\ x_{j+1} \\ \vdots \\ x_N \end{darray}\right]
$$

## メトロポリス・ヘイスティングス法からの導入

M-H法では，以下のようなアルゴリズムを利用すればよいのであった．

<tex>
$\quad
\begin{aligned}
    &1. && X \gets \{\} \\
    &2. && \text{for } t \in \{1, 2, \dots, n\} : \\
    &3. && \qquad \bm y \sim Q(\bm y | \bm x) \\
    &4. && \qquad r \sim {\cal U}(r | 0, 1) \\
    &5. && \qquad \text{if } A(\bm y | \bm x) \gt r : \\
    &6. && \qquad \qquad \bm x \gets \bm y \\
    &7. && \qquad X \gets X \cup \{\bm x\} \\
    &8. && \operatorname{return} X
\end{aligned}
$
</tex>

ここで<tex>$Q(\bm y | \bm x)$</tex>は提案分布と呼ばれる確率分布，<tex>$A(\bm y | \bm x)$</tex>は受理確率と呼ばれる関数で，次のような式で定義される．

$$
    A(\bm y | \bm x) = \frac{P(\bm y) Q(\bm x | \bm y)}{P(\bm x) Q(\bm y | \bm x)}
$$

## 受理確率を1にする

問題は提案分布をどう定義するかであるが，ここでは次のようなものを使用する．

$$
    Q(\bm y | \bm x) =
    \left\lbrace\begin{aligned}
        & P(y_j | \bm x_{\setminus j}) && \text{if } \bm y_{\setminus j} = \bm x_{\setminus j} \\
        & 0 && \text{otherwise}
    \end{aligned}\right.
$$

すなわち，**<tex>$j$</tex>番目以外の要素はすべて<tex>$\bm x$</tex>のものと同じにし** (<tex>$\bm y_{\setminus j} = \bm x_{\setminus j}$</tex>)，**<tex>$j$</tex>番目の要素は<tex>$P(y_j | \bm x_{\setminus j})$</tex>に従うようにサンプリングする**．このようにすると，提案分布<tex>$Q(\bm y | \bm x)$</tex>からサンプルされた<tex>$\bm y$</tex>は必ず<tex>$\bm y_{\setminus j} = \bm x_{\setminus j}$</tex>を満たす．これに注意すると，受理確率が必ず<tex>$1$</tex>になることがわかる．

$$
\begin{aligned}
    A(\bm y | \bm x)
    &= \frac{P(\bm y) Q(\bm x | \bm y)}{P(\bm x) Q(\bm y | \bm x)} \\
    &= \frac{P(\bm y) P(x_j | \bm y_{\setminus j})}{P(\bm x) P(y_j | \bm x_{\setminus j})} \\
    &\qquad\left\|\quad\begin{aligned}
        P(\bm x)
        &= P(x_j, \bm x_{\setminus j}) \\
        &= P(x_j | \bm x_{\setminus j}) P(\bm x_{\setminus j})
    \end{aligned}\right. \\
    &= \frac{P(y_j | \bm y_{\setminus j}) P(\bm y_{\setminus j}) P(x_j | \bm y_{\setminus j})}{P(x_j | \bm x_{\setminus j}) P(\bm x_{\setminus j}) P(y_j | \bm x_{\setminus j})} \\
    &\qquad\left\|\quad\begin{aligned}
        \bm y_{\setminus j} = \bm x_{\setminus j}
    \end{aligned}\right. \\
    &= \frac{P(y_j | \bm x_{\setminus j}) P(\bm x_{\setminus j}) P(x_j | \bm x_{\setminus j})}{P(x_j | \bm x_{\setminus j}) P(\bm x_{\setminus j}) P(y_j | \bm x_{\setminus j})} \\
    &= 1
\end{aligned}
$$

## アルゴリズム

以上の考察から，次のようなアルゴリズムを得る．

<tex>
$\quad
\begin{aligned}
    &1. && X \gets \{\} \\
    &2. && \text{for } t \in \{1, 2, \dots, n\} : \\
    &3. && \qquad \text{for } j \in \{1, 2, \dots, N\} : \\
    &4. && \qquad \qquad x_j \sim Q(x_j | \bm x_{\setminus j})\\
    &5. && \qquad \qquad X \gets X \cup \{\bm x\} \\
    &6. && \operatorname{return} X
\end{aligned}
$
</tex>

このように，元の確率分布から直接サンプルする代わりに，条件付き確率分布から次々と各要素をサンプルすることによって乱数列を近似的に生成する方法を**ギブスサンプリング (a Gibbs sampling; a Gibbs sampler)** という．

## メリット

受理確率を1にすることのメリットは大きく2つある．

1. 提案された乱数<tex>$\bm y$</tex>が棄却されることはないため，乱数列<tex>$\{\bm x^t\}_{t=1}^n$</tex>を長くする必要がない
2. メトロポリステストを実施する必要がないため，アルゴリズムは非常にシンプルなものとなる

もちろん，ギブスサンプリングが使えるのは条件付き確率分布<tex>$P(x_j | \bm x_{\setminus j})$</tex>からのサンプリングが容易な場合のみで，より一般のM-H法に比べれば限定的である．とはいえ，**この方法が使える場合には非常に効率のよい乱数サンプリングアルゴリズムとして重宝する**のはいうまでもない．実際，さまざまな最適化アルゴリズムやシミュレーションアルゴリズムに応用されている．
