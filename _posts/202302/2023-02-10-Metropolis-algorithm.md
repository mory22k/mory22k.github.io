---
layout: post
title: "[MCMC3] メトロポリス法"
categories: note
description: M-H法の一種であるメトロポリス法を簡単に導入する．
tags: MCMC Monde_Carlo_method
katex: true
---

M-H法の一種であるメトロポリス法を簡単に導入する．

## メトロポリス・ヘイスティングス法からの導入

M-H法は次のようなアルゴリズムであった．

<tex>
$\quad
\begin{aligned}
    &1. && X \leftarrow \{\} \\
    &2. && \text{for } t \in \{1, 2, \dots, N\} : \\
    &3. && \qquad y \sim Q(y | x) \\
    &4. && \qquad r \sim {\cal U}(0, 1) \\
    &5. && \qquad \text{if } A(y | x) \gt r : \\
    &6. && \qquad \qquad x \leftarrow y \\
    &7. && \qquad X \leftarrow X \cup \{x\} \\
    &8. && \operatorname{return} X
\end{aligned}
$
</tex>

ただし，<tex>$A(y | x)$</tex>は受理確率と呼ばれる関数で，次式で表される．

$$
    A(y | x) = \frac{P(y) Q(x | y)}{P(x) Q(y | x)}
$$

ここで，提案分布<tex>$Q(y | x)$</tex>を，関数の台<tex>${\cal Y}$</tex>が

$$
\begin{gathered}
    {\cal Y} = \{x + \lambda c | \lambda \in [1, -1]\}
\end{gathered}
$$

であるような連続一様分布，すなわち

$$
    Q(y | x) = {\cal U}(y | x-c, x+c) = \frac{1}{2c}
$$

とおくと，受理確率は次式に変化する．

$$
    A(y | x) = \frac{P(y) Q(x | y)}{P(x) Q(y | x)} = \frac{P(y)}{P(x)}
$$

これを用いれば，MH法は次のようなアルゴリズムに変化する．

<tex>
$\quad
\begin{aligned}
    &1. && X \leftarrow \{\} \\
    &2. && \text{for } t \in \{1, 2, \dots, N\} : \\
    &3. && \qquad y \sim {\cal U}(y | x-c, x+c) \\
    &4. && \qquad r \sim {\cal U}(0, 1) \\
    &5. && \qquad \text{if } \frac{P(y)}{P(x)} \gt r : \\
    &6. && \qquad \qquad x \leftarrow y \\
    &7. && \qquad X \leftarrow X \cup \{x\} \\
    &8. && \operatorname{return} X
\end{aligned}
$
</tex>

このようなMH法をとくに**メトロポリス法 (Metropolis algorithm)** という．定数<tex>$c$</tex>は**ステップ幅**と呼ばれる．

## 注意事項

このアルゴリズムをちょっと書き換えれば，<tex>$x$</tex>がスカラーではなくベクトル<tex>$\bm x$</tex>であるような場合のメトロポリス法も容易に作成できる．その際，提案<tex>$\bm y$</tex>の各要素<tex>$y_i$</tex>を一様分布<tex>${\cal U}(y_i | x_i - c_i, x_i + c_i)$</tex>からサンプルすることになるのだが，このとき以下のように，ステップ幅の各要素が時間によって変化しなければ，全要素が同一である必要はない．ただし**アルゴリズムの途中で要素<tex>$c_i$</tex>が変化してはいけない**ので注意が必要である．

$$
\begin{aligned}
    &\text{valid}:
    && \bm c = \begin{bmatrix} 1 \\ 1 \end{bmatrix} && \to
    && \bm c = \begin{bmatrix} 1 \\ 1 \end{bmatrix} && \to
    && \dots \\
    \\
    &\text{valid}:
    && \bm c = \begin{bmatrix} 1.5 \\ 0.5 \end{bmatrix} && \to
    && \bm c = \begin{bmatrix} 1.5 \\ 0.5 \end{bmatrix} && \to
    && \dots \\
    \\
    &\text{invalid}:
    && \bm c = \begin{bmatrix} 1.5 \\ 0.5 \end{bmatrix} && \to
    && \bm c = \begin{bmatrix} 0.5 \\ 1 \end{bmatrix} && \to
    && \dots \\
    \\
\end{aligned}
$$
