---
layout: post
title: "[分析2] 不偏推定量"
categories: note
description: ある分布から標本を採取したあと，標本をもとに母数を推定するときに重要な指標である不偏性に軽く触れる．
tags: analysis
katex: true
---

ある分布から標本を採取したあと，標本をもとに母数を推定するときに重要な指標である不偏性に軽く触れる．

{% include contents/analysis.md %}

## 不偏推定量

統計量を変形して得られた推定量<tex>$\widehat w$</tex>の期待値<tex>$\mathbb E[\widehat w]$</tex>が母数<tex>$w$</tex>に一致するとき，推定量<tex>$\widehat w$</tex>を母数<tex>$w$</tex>の**不偏推定量 (unbiased estimator)** という．

$$
    \mathbb E[\widehat w] = w \implies \widehat w \text{ is an unbiased estimator of } w
$$

## 期待値の不偏推定量

標本平均の期待値<tex>$\mathbb E[\overline x]$</tex>を計算してみる．

$$
\begin{aligned}
    \mathbb E[\overline x]
    &= \langle \overline x \rangle \\
    &= \left\langle \frac{1}{N} \sum_{i=1}^N x \right\rangle \\
    &= \frac{1}{N} \sum_{i=1}^N \langle x \rangle \\
    &= \langle x \rangle \\
    &= \mathbb E[x]
\end{aligned}
$$

よって期待値<tex>$\mathbb E[x]$</tex>の不偏推定量は標本平均<tex>$\overline x$</tex>であることがわかった．

$$
    \mathbb E[x] = \mathbb E[\overline x] \simeq \overline x
$$

## 分散の不偏推定量

続いて標本分散<tex>$s^2$</tex>の期待値<tex>$\mathbb E[s^2]$</tex>を計算する．

$$
\begin{aligned}
    \mathbb E[s_x^2]
    &= \langle s_x^2 \rangle \\
    &= \langle \overline{x^2} - \overline{x}^2 \rangle \\
    &= \underbrace{\langle \overline{x^2} \rangle}_{(1)} - \underbrace{\langle \overline{x}^2 \rangle}_{(2)} \\
    & \quad \left\| \quad \begin{aligned}
        (1)
        &= \left\langle \frac{1}{N} \sum_{i=1}^N x_i^2 \right\rangle
        = \frac{1}{N} \sum_{i=1}^N \langle x_i^2 \rangle
        = \langle x^2 \rangle
        \\
        (2)
        &= \left\langle \frac{1}{N} \sum_{i=1}^N x_i \times \frac{1}{N} \sum_{j=1}^N x_j \right\rangle \\
        &= \frac{1}{N^2} \sum_{i = j} \langle x_i x_j \rangle + \frac{1}{N^2} \sum_{i \ne j} \langle x_i \rangle \langle x_j \rangle \\
        &= \frac{1}{N} \langle x^2 \rangle + \frac{N-1}{N} \langle x \rangle^2
    \end{aligned} \right.
    \\
    &= \langle x^2 \rangle - \frac{1}{N} \langle x^2 \rangle - \frac{N-1}{N} \langle x \rangle^2 \\
    &= \frac{N-1}{N} \left( \langle x^2 \rangle - \langle x \rangle^2 \right) \\
    &= \frac{N-1}{N} \mathbb V[x]
\end{aligned}
$$

以上により，分散<tex>$\mathbb V[x]$</tex>の不偏推定量は標本分散<tex>$s_x^2$</tex>の<tex>$\dfrac{N}{N-1}$</tex>であることがわかった．

$$
    \mathbb V[x] = \frac{N}{N-1} \mathbb E[s_x^2] \simeq \frac{N}{N-1} s_x^2
$$

## 分散の不偏推定量の平方根は標準偏差の不偏推定量ではない

さらに<u>もしも<tex>$\sqrt{\mathbb E[s_x^2]} = \mathbb E[s_x]$</tex> が成り立つならば</u>標準偏差<tex>$\sqrt{\mathbb V[x]}$</tex>は

$$
\begin{aligned}
    \sqrt{\mathbb V[x]}
    &= \sqrt{\frac{N}{N-1} \mathbb E[s_x^2]} \\
    &= \sqrt\frac{N}{N-1} \mathbb E[s_x] \\
    &\simeq \sqrt\frac{N}{N-1} s_x
\end{aligned}
$$

で推定することが可能である．ところが，ほとんどの場合において<tex>$\sqrt{\mathbb E[s_x^2]} = \mathbb E[s_x]$</tex>は厳密には成り立たないため，ほとんどのケースで

$$
    \sqrt{\frac{N}{N-1} \mathbb E[s_x^2]} \neq \sqrt\frac{N}{N-1} \mathbb E[s_x]
$$

となる．それゆえ，**分散の不偏推定量の平方根<tex>$\sqrt\dfrac{N}{N-1}s_x$</tex>は標準偏差<tex>$\sqrt{\mathbb V[x]}$</tex>の不偏推定量ではない**．

## まとめ

<tex>
$
\begin{aligned}
    1. && \mathbb E[x] &\simeq \overline x \\
    2. && \mathbb V[x] &\simeq \frac{N}{N-1} s_x^2
\end{aligned}
$
</tex>
