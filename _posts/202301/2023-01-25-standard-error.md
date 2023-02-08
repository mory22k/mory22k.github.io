---
layout: post
title: "[分析3] 標準誤差"
categories: note
description: 標本統計量の標準偏差，すなわち標準誤差について触れる．
tags: analysis
katex: true
---

標本統計量の標準偏差，すなわち標準誤差について触れる．

{% include contents/analysis.md %}

## 標準誤差

標本平均の標準偏差<tex>$\sqrt{\mathbb V[\overline x]}$</tex>を標本平均の**標準誤差 (standard error)** という．より一般に，何らかの統計量<tex>$\widehat w$</tex>の標準偏差<tex>$\sqrt{\mathbb V[\widehat w]}$</tex>を「<tex>$\widehat w$</tex>の標準誤差」というが，単に「標準誤差」といった場合は「標本平均<tex>$\overline x$</tex>の標準誤差<tex>$\sqrt{\mathbb V[\overline x]}$</tex>」を表す．

$$
\begin{aligned}
    & \text{standard deviation of }x:       & \sqrt{\mathbb V[x]} \\
    & \text{standard error of }\overline x: & \sqrt{\mathbb V[\overline x]}
\end{aligned}
$$

## 標準誤差の計算

標本平均の分散<tex>$\mathbb V[\overline x]$</tex>は次式のように計算できる．

$$
\begin{aligned}
    \mathbb V[\overline x]
    &= \underbrace{\langle \overline x^2 \rangle}_{(1)} - \underbrace{\langle \overline x \rangle^2}_{(2)}
    \\
    & \quad \left\| \quad \begin{aligned}
        (1)
        &= \left\langle
            \frac{1}{N} \sum_{i=1}^N x_i \times
            \frac{1}{N} \sum_{j=1}^N x_j
        \right\rangle
        \\
        &= \frac{1}{N^2} \sum_{i = j} \langle x_i x_j \rangle + \frac{1}{N^2} \sum_{i \ne j} \langle x_i \rangle \langle x_j \rangle
        \\
        &= \frac{1}{N} \langle x^2 \rangle + \frac{N-1}{N} \langle x \rangle^2,
        \\
        (2)
        &= \langle x \rangle^2
    \end{aligned} \right.
    \\
    &= \frac{1}{N} \langle x^2 \rangle + \frac{N-1}{N} \langle x \rangle^2 - \langle x \rangle^2
    \\
    &= \frac{1}{N} \left( \langle x^2 \rangle - \langle x \rangle^2 \right)
    \\
    &= \frac{1}{N} \mathbb V[x]
\end{aligned}
$$

ゆえに標準誤差は次式で与えられる．

$$
    \sqrt{\mathbb V[\overline x]} = \sqrt{\frac{\mathbb V[x]}{N}}
$$

## 標準誤差の推定

$$
    \mathbb V[x] = \frac{N}{N-1} \mathbb E[s_x^2]
$$

なる関係を用いれば，標本平均の分散の不偏推定量を得ることができる．

$$
    \mathbb V[\overline x] = \frac{1}{N-1} \mathbb E[s_x^2] \simeq \frac{1}{N-1} s_x^2
$$

さらにこれの平方根をとれば，バイアス付きではあるが標準誤差が推定できる．

$$
    \sqrt{\mathbb V[\overline x]} \simeq \sqrt{\frac{1}{N-1} s_x^2}
$$

ただし<u>この量は不偏推定量ではないことに注意が必要である</u>．分散の不偏推定量の平方根が標準偏差の不偏推定量ではないのと同様である．

## まとめ

<tex>
$\begin{aligned}
    1. && \mathbb V[\overline x] &= \frac{\mathbb V[x]}{N} \simeq \frac{1}{N-1} s_x^2 \\
    2. && \sqrt{\mathbb V[\overline x]} &= \sqrt{\frac{\mathbb V[x]}{N}}
\end{aligned}$
</tex>
