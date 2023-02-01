---
layout: post
title: "[分析6] ジャックナイフ法によるバイアスの補正"
categories: note
description: ジャックナイフ法によってバイアス項を計算する．
tags: analysis
katex: true
---

ジャックナイフ法によってバイアス項を計算する．

## 期待値

出力値<tex>$f(\overline x)$</tex>の期待値<tex>$\mathbb V[f(\overline x)]$</tex>は次式で表される．

$$
    \mathbb E[f(\overline x)]
    \approx f(\mu_x) + \frac{1}{2} \frac{1}{N} \frac{d^2 f}{d \mu_x^2} \mathbb V[x]
$$

期待値<tex>$\mathbb V[f(\overline x)]$</tex>と出力<tex>$f(\mu_x)$</tex>の差分をバイアスという．バイアスは次式で表される．

$$
    f_\text{bias} = \frac{1}{2} \frac{1}{N} \frac{d^2 f}{d \mu_x^2} \mathbb V[x]
$$

## バイアス項の計算

ジャックナイフ標本<tex>$x_i^{\rm jack}$</tex>を関数<tex>$f$</tex>に入力し，さらに<tex>$\mu_x$</tex>の周りで2次の項までテイラー展開する．

$$
\begin{aligned}
    f(x_i^{\rm jack})
    &\approx f(\mu_x) + \frac{df}{d\mu_x} (x_i^{\rm jack} - \mu_x) + \frac{1}{2} \frac{d^2f}{d\mu_x^2} (x_i^{\rm jack} - \mu_x)^2 + \dots
\end{aligned}
$$

これの標本平均を<tex>$\overline{f(x^{\rm jack})}$</tex>とすると，その期待値は次のように計算される．

$$
\begin{aligned}
    \mathbb E[\overline{f(x^{\rm jack})}]
    &\approx \left\langle
        \overline{f(\mu_x)
        + \frac{df}{d\mu_x} (x^{\rm jack} - \mu_x)
        + \frac{1}{2} \frac{d^2f}{d\mu_x^2} (x^{\rm jack} - \mu_x)^2
        + \dots}
    \right\rangle \\
    &= \left\langle
        f(\mu_x)
        + \frac{df}{d\mu_x}\underbrace{(\overline x - \mu_x)}_{0}
        + \frac{1}{2} \frac{d^2f}{d\mu_x^2} \overline{(x^{\rm jack} - \mu_x)^2}
        + \dots
    \right\rangle \\
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
                (4) &= \frac{N-1}{N} \mathbb V[x] \quad \left( \because \mathbb V[x] = \frac{N}{N-1} \mathbb E[s_x^2] \right)
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

が得られた．第1項を<tex>$N$</tex>倍，第2項を<tex>$N-1$</tex>倍して<tex>$f_\text{bias}$</tex>を消去すれば，次のように推定することができる．

$$
\begin{aligned}
    f(\mu_x)
    &= N \mathbb E[f(\overline x)] - (N-1) \mathbb E[\overline{f(x^{\rm jack})}] \\
    &= \mathbb E[f(\overline x)] - (N-1) \left( \mathbb E[\overline{f(x^{\rm jack})}] - \mathbb E[f(\overline x)] \right) \\
    &\simeq f(\overline x) - (N-1) \left( \overline{f(x^{\rm jack})} - f(\overline x) \right)
\end{aligned}
$$

こうして得られた<tex>$f(\mu_x)$</tex>の推定量を**ジャックナイフ推定量**という．
