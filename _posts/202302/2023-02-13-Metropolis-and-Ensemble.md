---
layout: post
title: "[MCMC4] メトロポリス法とカノニカル分布"
categories: note
description: メトロポリス法を熱平衡状態の系のシミュレーションの観点から導入する．
tags: MCMC Monde_Carlo_method
katex: true
---

メトロポリス法を熱平衡状態の系のシミュレーションの観点から導入する．

{% include contents/mcmc.md %}

## 熱平衡状態からの導入

確率分布<tex>$P(\bm x)$</tex>を，熱平衡状態の系における自由度<tex>$\bm x$</tex>の分布とする．

$$
    P(\bm x) = \frac{1}{Z} \exp \left( -\beta E(\bm x) \right)
$$

エネルギー状態<tex>$E(\bm x)$</tex>から別のエネルギー状態<tex>$E(\bm y)$</tex>への遷移が発生する頻度を<tex>$W(\bm y | \bm x)$</tex>と表すことにしよう．系は熱平衡状態であるという仮定により，詳細釣り合い条件が成立する．

$$
    P(\bm x) W(\bm y | \bm x) = P(\bm y) W(\bm x | \bm y)
$$

これを変形すると，<tex>$W$</tex>が満たすべき条件式を以下のように表すことができる．

$$
\begin{aligned}
    \frac{W(\bm y | \bm x)}{W(\bm x | \bm y)}
    &= \frac{P(\bm y)}{P(\bm x)} \\
    &= \exp(-\beta (E(\bm y)-E(\bm x))) \\
    &= \exp(-\beta \Delta E) \\
\end{aligned}
$$

これを満たすような遷移の頻度<tex>$W(\bm y | \bm x)$</tex>として，例えば次のようなものを考えることができる．

$$
\begin{aligned}
    W(\bm y | \bm x)
    &= \min(\exp(-\beta \Delta E), 1)\\
    &= \left\{
    \begin{aligned}
        & 1 && (\Delta E \le 0) \\
        & \exp(-\beta \Delta E) && (\Delta E \gt 0)
    \end{aligned}
    \right.
\end{aligned}
$$

すなわち，エネルギーが低くなるような場合には確実に遷移し，エネルギーが高くなるような場合には確率<tex>$\exp(-\beta \Delta E)$</tex>で遷移する．定義式から明らかなように，遷移先のエネルギーが高ければ高いほど遷移する確率は低くなる．

## シミューレーション

以上を再現するために，次のようなものを考える．まず，2つのエネルギー状態<tex>$E(\bm x)$</tex>，<tex>$E(\bm y)$</tex>における自由度<tex>$\bm x$</tex>と<tex>$\bm y$</tex>の差分を<tex>$\Delta \bm x$</tex>として表す．そして，遷移後の自由度をサンプルする代わりに，この差分の各成分を一様分布からサンプルする．

$$
    \bm y = \bm x + \Delta \bm x
$$

$$
    \Delta x_i \sim {\cal U}(- c_i, + c_i)
$$

その上でエネルギーの差分<tex>$\Delta E = E(\bm x + \Delta \bm x) - E(\bm x)$</tex>を計算した上で，

1. もしも<tex>$\Delta E \le 0$</tex>ならば遷移後の自由度を受け入れる: <tex>$\bm x \leftarrow \bm x + \Delta \bm x$</tex>
2. さもなくば，確率<tex>$\exp(-\beta \Delta E)$</tex>で<tex>$\bm x \leftarrow \bm x + \Delta \bm x$</tex>

とする．こうして生成される自由度の系列<tex>$\{\bm x^i\}_{i=1}^n$</tex>は，確率分布<tex>$P(\bm x)$</tex>に従う．

## メトロポリス法

以上の考察から，次のようなアルゴリズムが得られる．

<tex>
$\quad
\begin{aligned}
    &1. && X \leftarrow \{\} \\
    &2. && \text{for } t \in \{1, 2, \dots, n\} : \\
    &3. && \qquad \text{for } i \in \{1, 2, \dots, N\} : \\
    &4. && \qquad \qquad \Delta x_i \sim {\cal U}(\Delta x_i | -c_i, c_i) \\
    &5. && \qquad \Delta E \leftarrow E(\bm x + \Delta \bm x) - E(\bm x) \\
    &6. && \qquad r \sim {\cal U}(r | 0, 1) \\
    &7. && \qquad \text{if } \exp(-\beta \Delta E) \gt r : \\
    &8. && \qquad \qquad \bm x \leftarrow \bm x + \Delta \bm x \\
    &9. && \qquad X \leftarrow X \cup \{\bm x\} \\
    &10. && \operatorname{return} X
\end{aligned}
$
</tex>

このアルゴリズムにより確率分布<tex>$P(\bm x)$</tex>に従う乱数列<tex>$\{\bm x^i\}_{i=1}^n$</tex>を生成する方法を**メトロポリス法**という．ここに<tex>$P(\bm x) = \exp(-\beta E(\bm x))$</tex>を用いて書き換えを行なえば次のアルゴリズムに帰着する．

<tex>
$\quad
\begin{aligned}
    &1. && X \leftarrow \{\} \\
    &2. && \text{for } t \in \{1, 2, \dots, n\} : \\
    &3. && \qquad \text{for } i \in \{1, 2, \dots, N\} : \\
    &4. && \qquad \qquad y_i \sim {\cal U}(\Delta x_i | x_i-c_i, x_i+c_i) \\
    &5. && \qquad r \sim {\cal U}(r | 0, 1) \\
    &6. && \qquad \text{if } \frac{P(\bm y)}{P(\bm x)} \gt r : \\
    &7. && \qquad \qquad \bm x \leftarrow \bm y \\
    &8. && \qquad X \leftarrow X \cup \{\bm x\} \\
    &9. && \operatorname{return} X
\end{aligned}
$
</tex>
