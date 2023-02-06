---
layout: post
title: "[分析8] ジャックナイフ法による標準誤差の推定"
categories: note
description: ジャックナイフ法によってバイアス項を計算する．
tags: analysis
katex: true
---

ジャックナイフ法によって標準誤差を計算する．

{% include contents/analysis.md %}

## 標準誤差

出力値<tex>$f(\overline x)$</tex>の分散<tex>$\mathbb V[f(\overline x)]$</tex>は次式で表されたことを確認しておく．

$$
    \mathbb V[f(\overline x)] \approx \frac{1}{N} \left(\frac{df}{d \mu_x}\right)^2 \mathbb V[x]
$$

## 標準誤差の計算

再び，ジャックナイフ標本を関数に入力し，点<tex>$\mu_x$</tex>の周りで1次まで展開する．

$$
\begin{aligned}
    f(x_i^{\rm jack})
    &\approx f(\mu_x) + \frac{df}{d\mu_x} (x_i^{\rm jack} - \mu_x) + \dots
\end{aligned}
$$

そしてこれの標本分散を<tex>$s_{f^{\rm jack}}^2$</tex>とすると，その期待値は次のように計算される．

$$
\begin{aligned}
    \mathbb E[s_{f^{\rm jack}}^2]
    &= \left\langle \overline{f^2(x^{\rm jack})} - \overline{f(x^{\rm jack})}^2 \right\rangle \\
    &= \underbrace{ \langle \overline{f^2(x^{\rm jack})} \rangle }_{(1)} - \underbrace{ \langle \overline{f(x^{\rm jack})}^2 \rangle }_{(2)} \\
    &\quad\left\|\quad\begin{aligned}
        (1)
        &\approx
            \left\langle
                \overline{ \left( f(\mu_x) + \frac{df}{d\mu_x} (x^{\rm jack} - \mu_x) + \dots \right)^2 }
            \right\rangle \\
        &=
            f^2(\mu_x)
            + 2 f(\mu_x) \frac{df}{d\mu_x} \underbrace{ \langle \overline{x} - \mu_x \rangle }_{0}
            + \left( \frac{df}{d\mu_x} \right)^2 \underbrace{ \langle \overline{(x^{\rm jack} - \mu_x)^2} \rangle }_{(3)}
            + \dots \\
        &\quad\left\|\quad\begin{aligned}
            (3) = \frac{1}{N-1} \mathbb V[x]
        \end{aligned}\right.\\
        &=
            f^2(\mu_x)
            + \frac{1}{N-1} \left( \frac{df}{d\mu_x} \right)^2 \mathbb V[x]
            + \dots
        \\
        (2)
        &\approx
            \left\langle \overline{f(\mu_x) + \frac{df}{d\mu_x} (x_i^{\rm jack} - \mu_x)}^2 \right\rangle \\
        &=
            f^2(\mu_x)
            + 2f(\mu_x) \underbrace{\langle \overline x - \mu_x \rangle}_{0}
            + \left( \frac{df}{d\mu_x}\right)^2 \langle \underbrace{(\overline x - \mu_x}_{\mathbb V[\overline x]})^2 \rangle \\
        &=
            f^2(\mu_x) + \left( \frac{df}{d\mu_x}\right)^2 \mathbb V[\overline x] \\
        &=
            f^2(\mu_x) + \frac{1}{N} \left( \frac{df}{d\mu_x}\right)^2 \mathbb V[x]
    \end{aligned}\right. \\
    &= \left( \frac{1}{N-1} - \frac{1}{N} \right) \left( \frac{df}{d\mu_x}\right)^2 \mathbb V[x] \\
    &= \frac{1}{N(N-1)} \left( \frac{df}{d\mu_x}\right)^2 \mathbb V[x] \\
    &\quad\left\|\quad\begin{aligned}
        \mathbb V[f(\overline x)] \approx \frac{1}{N} \left(\frac{df}{d \mu_x}\right)^2 \mathbb V[x]
    \end{aligned}\right. \\
    &= \frac{1}{N-1} \mathbb V[f(\overline x)]
\end{aligned}
$$

よって分散は

$$
\begin{aligned}
    \mathbb V[f(\overline x)]
    &= (N-1) \mathbb E[s_{f^{\rm jack}}^2] \\
    &\simeq (N-1) s_{f^{\rm jack}}^2 \\
\end{aligned}
$$

と推定でき，さらにこれの平方根を取ることで標準誤差が推定できる[^1]．

$$
\begin{aligned}
    \sqrt{\mathbb V[f(\overline x)]}
    &= \sqrt{(N-1) \mathbb E[s_{f^{\rm jack}}^2]} \\
    &\simeq \sqrt{(N-1)} s_{f^{\rm jack}}
\end{aligned}
$$

[^1]: もはや耳タコだが，平方根を取ることで不偏性がやや崩れてしまうことに注意しよう．
