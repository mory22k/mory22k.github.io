---
layout: post
title: "[分析6] ジャックナイフ法"
categories: note
description: 誤差伝播を自動化する方法の1つであるジャックナイフ法を導入する．
tags: analysis
katex: true
---

誤差伝播を自動化する方法の1つであるジャックナイフ法を導入する．

{% include contents/analysis.md %}

## 誤差伝播

サイズ<tex>$N$</tex>の標本<tex>$\{x_i\}$</tex>について，期待値が<tex>$\mu_x$</tex>で，標本平均が<tex>$\overline x$</tex>であるとき，標本平均を関数に入力したときの出力値<tex>$f(\overline x)$</tex>については，テイラー展開により期待値と分散を

$$
\left\{
\begin{aligned}
    \mathbb E[f(\overline x)]
    &\approx f(\mu_x) + \frac{1}{2} \frac{1}{N} \frac{d^2 f}{d \mu_x^2} \mathbb V[x]
    \\
    \mathbb V[f(\overline x)]
    &\approx \frac{1}{N} \left(\frac{df}{d \mu_x}\right)^2 \mathbb V[x]
\end{aligned}
\right.
$$

で求めることができ，これによって<tex>$f(\mu_x)$</tex>の信頼区間を次式で計算することができる．

$$
    f(\mu_x) = \mathbb E[f(\overline x)] - f_\text{bias} \pm \mathbb V[f(\mu_x)]
$$

$$
\left\{
\begin{aligned}
    f_\text{bias}
    &= \frac{1}{2} \frac{1}{N} \frac{d^2 f}{d \mu_x^2} \mathbb V[x]
    \\
    \sqrt{\mathbb V[f(\mu_x)]}
    &\approx \frac{1}{N} \left(\frac{df}{d \mu_x}\right)^2 \mathbb V[x]
\end{aligned}
\right.
$$

これを使用するとき，次の量については手計算が必須となる．

$$
\begin{gathered}
    \frac{df}{d\mu_x}, & \frac{d^2f}{d\mu_x^2}
\end{gathered}
$$

これは面倒なので，自動的にバイアス<tex>$f_\text{bias}$</tex>および標準偏差<tex>$\sqrt{\mathbb V[f(\mu_x)]}$</tex>を計算する方法が開発されている．ここではそのうち**ジャックナイフ法 (jackknife resampling)** と呼ばれる方法を導入する．

## ジャックナイフ標本

次式のように<tex>$i$</tex>番目の**ジャックナイフ標本**<tex>$x_i^{\rm jack}$</tex>を定義する．

$$
    x_i^{\rm jack} \coloneqq \frac{1}{N-1} \sum_{j \ne i} x_j = \overline x - \frac{1}{N-1} (\overline x - x_i)
$$

ジャックナイフ標本の標本平均<tex>$\overline{x^{\rm jack}}$</tex>は<tex>$\overline x$</tex>に一致する．

$$
\begin{aligned}
    \overline{x^{\rm jack}}
    &= \overline x - \frac{1}{N-1} \overline{(\overline x - x_i)} \\
    &= \overline x - \frac{1}{N-1} (\overline x - \overline x) \\
    &= \overline x
\end{aligned}
$$

また標本分散<tex>$s_{x^{\rm jack}}^2$</tex>は<tex>$s_x^2$</tex>の<tex>$\dfrac{1}{(N-1)^2}$</tex>倍に一致する．

$$
\begin{aligned}
    s_{x^{\rm jack}}^2
    &= \underbrace{ \overline{ (x^{\rm jack})^2 } }_{(1)} - \underbrace{ (\overline{ x^{\rm jack} })^2 }_{(2)}
    \\
    &\qquad\left\|\quad\begin{aligned}
        (1)
        &= \overline{\left( \overline{x} - \frac{1}{N-1}(\overline x - x) \right)^2} \\
        &= \overline{ \overline{x}^2 - \frac{2}{N-1} \overline x \underbrace{(\overline x - x)}_{0} + \frac{1}{(N-1)^2} \underbrace{(\overline x - x)^2}_{\text{sample variance}} } \\
        &= \overline{x}^2 + \frac{1}{(N-1)^2} s_x^2
        \\
        (2)
        &= \overline{x}^2
    \end{aligned}\right.
    \\
    &= \frac{1}{(N-1)^2} s_x^2
\end{aligned}
$$
