---
layout: post
title: "[分析6] ジャックナイフ法によるバイアスの補正"
categories: note
description: ジャックナイフ法によってバイアス項を計算する．
tags: analysis
katex: true
---

ジャックナイフ法によってバイアス項を計算する．

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

## バイアス項の計算

ジャックナイフ標本<tex>$x_i^{\rm jack}$</tex>を関数<tex>$f$</tex>に入力し，さらに<tex>$\mu_x$</tex>の周りで2次の項までテイラー展開する．

$$
\begin{aligned}
    f(x_i^{\rm jack})
    &\approx f(\mu_x) + \frac{df}{d\mu_x} (x_i^{\rm jack} - \mu_x) + \frac{1}{2} \frac{d^2f}{d\mu_x^2} (x_i^{\rm jack} - \mu_x)^2 + \dots
\end{aligned}
$$

標本平均をとると

$$
\begin{aligned}
    \overline {f(x^{\rm jack})}
    &\approx \overline{f(\mu_x) + \frac{df}{d\mu_x} (x^{\rm jack} - \mu_x) + \frac{1}{2} \frac{d^2f}{d\mu_x^2} (x^{\rm jack} - \mu_x)^2 + \dots} \\
    &= f(\mu_x) + \frac{df}{d\mu_x}(\overline x - \mu_x) + \frac{1}{2} \frac{d^2f}{d\mu_x^2} \overline {(x^{\rm jack} - \mu_x)^2} + \dots
\end{aligned}
$$

となる．さらにこれの期待値をとる．

$$
\begin{aligned}
    \mathbb E[\overline {f(x^{\rm jack})}]
    &\approx \left\langle f(\mu_x) + \frac{df}{d\mu_x}\underbrace{(\overline x - \mu_x)}_{0} + \frac{1}{2} \frac{d^2f}{d\mu_x^2} \overline{(x^{\rm jack} - \mu_x)^2} + \dots \right\rangle \\
    &= f(\mu_x) + \frac{1}{2} \frac{d^2f}{d\mu_x^2} \underbrace{ \langle \overline{(x^{\rm jack} - \mu_x)^2} \rangle }_{(1)} + \dots \\
    &\quad\left\|\quad\begin{aligned}
        (1) &= \langle \overline{(x^{\rm jack})^2 - 2 x^{\rm jack} \mu_x + \mu_x^2} \rangle \\
            &= \langle \overline{(x^{\rm jack})^2} \rangle - 2 \langle \overline{x} \rangle \mu_x + \mu_x^2 \\
            &= \langle \overline{(x^{\rm jack})^2} \rangle - 2 \mu_x^2 + \mu_x^2 \\
            &= \langle \underbrace{\overline{(x^{\rm jack})^2}}_{(2)} \rangle - \mu_x^2 \\
            &\quad\left\|\quad\begin{aligned}
                (2) &= \overline{x}^2 + \frac{1}{(N-1)^2} s_x^2
            \end{aligned}\right. \\
            &= \left\langle \overline{x}^2 + \frac{1}{(N-1)^2} s_x^2 \right\rangle - \mu_x^2 \\
            &= \underbrace{\langle \overline{x}^2 \rangle}_{(3)} + \frac{1}{(N-1)^2} \underbrace{\langle s_x^2 \rangle}_{(4)} - \mu_x^2 \\
            &\quad\left\|\quad\begin{aligned}
                (3) &= \left\langle \frac{1}{N} \sum_{i=1}^N x_i \times \frac{1}{N} \sum_{j=1}^N x_j \right\rangle \\
                    &= \frac{1}{N^2} \sum_{i = j} \langle x_i x_j \rangle + \frac{1}{N^2} \sum_{i \ne j} \langle x_i \rangle \langle x_j \rangle \\
                    &= \frac{1}{N} \langle x^2 \rangle + \frac{N-1}{N} \langle x \rangle^2 \\
                    &= \frac{1}{N} (\langle x^2 \rangle - \langle x \rangle^2) + \langle x \rangle^2 \\
                    &= \frac{1}{N} \mathbb V[x] + \mu_x^2
                \\
                (4) &= \frac{N-1}{N} \mathbb V[x] \quad \left( \because \mathbb V[x] = \frac{N}{N-1} s_x^2 \right)
            \end{aligned}\right. \\
            &= \frac{1}{N} \mathbb V[x] + \frac{1}{N(N-1)} \mathbb V[x] \\
            &= \frac{1}{N-1} \mathbb V[x]
    \end{aligned}\right. \\
    &= f(\mu_x) + \frac{1}{2} \frac{1}{N-1} \frac{d^2f}{d\mu_x^2} \mathbb V[x] \\
    &\quad\left\|\quad\begin{aligned}
        f_\text{bias} = \frac{1}{2} \frac{1}{N} \frac{d^2 f}{d \mu_x^2} \mathbb V[x]
    \end{aligned}\right. \\
    &= f(\mu_x) + \frac{N}{N-1} f_{\text{bias}}
\end{aligned}
$$

こうして連立方程式

$$
\left\lbrace
\begin{aligned}
    \mathbb E[f(\overline x)] &= f(\mu_x) + f_\text{bias} \\
    \mathbb E[\overline {f(x^{\rm jack})}] &= f(\mu_x) + \frac{N}{N-1} f_\text{bias}
\end{aligned}
\right.
$$

が得られた．さらに第1項を<tex>$N$</tex>倍，第2項を<tex>$N-1$</tex>倍して<tex>$f_\text{bias}$</tex>を消去すれば

$$
\begin{aligned}
    f(\mu_x)
    &= N \mathbb E[f(\overline x)] - (N-1) \mathbb E[\overline{f(x^{\rm jack})}] \\
    &= \mathbb E[f(\overline x)] - (N-1) \left( \mathbb E[\overline{f(x^{\rm jack})}] - \mathbb E[f(\overline x)] \right)
\end{aligned}
$$

が得られる．

## ジャックナイフ推定量

以上により，バイアスを補正した<tex>$f(\mu_x)$</tex>の推定量が

$$
\begin{aligned}
    f(\mu_x)
    &\simeq f(\overline x) - (N-1) \left( \overline{f(x^{\rm jack})} - f(\overline x) \right)
\end{aligned}
$$

として計算できる．これを**ジャックナイフ推定量**という．
