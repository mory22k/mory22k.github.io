---
layout: post
title: "台形法と中点法"
categories: note
description: 数値積分法の基本である台形法と中点法を取り上げる．
tags: numerical_integrals
katex: true
---

数値積分法の基本である台形法と中点法を取り上げる．

## 数値積分法

ある関数<tex>$f(x)$</tex>の定積分を数値計算によって求めることを考える．このとき，素朴には積分範囲<tex>$[a, b]$</tex>に対して<tex>$N$</tex>個の入力点<tex>$\{x_i\}_{i=0}^N$</tex>を与え，それぞれに対して微小面積<tex>$dF(x_i)$</tex>を計算し，それらを足し合わせるような方法が考えられる．

$$
    \int_a^b f(x) dx = \sum_{i=1}^N dF(x_i)
$$

このような考察に基づく数値計算方法を一般に**数値積分**と呼ぶ．このうち，特にシンプルなものとして台形積分法と中点積分法を考える．

## 台形積分法

台形積分法では，まず入力点を<tex>$N$</tex>個与える．ただし，それらの集合<tex>$\{x_i\}_{i=0}^N$</tex>は順番に並んでいるものと仮定する．

$$
    \underbrace{x_0 \lt x_1 \lt \dots \lt x_N}_{N \text{ inputs}}
$$

そして<tex>$x_i$</tex>と<tex>$x_{i+1}$</tex>に対して，関数の出力値<tex>$f(x_i), f(x_{i+1})$</tex>をそれぞれ上底，下底の長さとし，入力値の差分<tex>$x_{i+1} - x_{i}$</tex>を高さとするような台形を考える．その台形の面積を微小面積<tex>$dF_i$</tex>とする．

$$
    dF_i \coloneqq \frac{1}{2} \underbrace{(f(x_i) + f(x_{i+1}))}_{\text{parallel sides}} \underbrace{(x_{i+1} - x_i)}_{\text{height}}
$$

これを<tex>$i=0, 1, \dots, N-1$</tex>に対して足し合わせることで定積分を計算する．

$$
    \int_a^b f(x) dx \simeq \sum_{i=0}^{N-1} \frac{f(x_i) + f(x_{i+1})}{2} (x_{i+1} - x_i)
$$

特に，積分区間<tex>$[a, b]$</tex>を<tex>$N$</tex>等分する場合，各<tex>$x_i$</tex>は

$$
\begin{aligned}
    x_0 &= a \\
    x_1 &= a + \frac{1}{N}(b-a) \\
    x_2 &= a + \frac{2}{N}(b-a) \\
    &\vdots \\
    x_i &= a + \frac{i}{N}(b-a) \\
\end{aligned}
$$

および

$$
    x_{i+1} - x_i = \frac{b-a}{N}
$$

と書けるから，次のように積分できる．

$$
    \int_a^b f(x) dx \simeq \sum_{i=0}^{N-1} \frac{f(x_i) + f(x_{i+1})}{2} dx
$$

$$
\begin{aligned}
    &\text{where}&
    x_i &= a + idx \\
    &&
    dx &= \frac{b-a}{N}
\end{aligned}
$$

アルゴリズムは次の通り．

1. <tex>$dx \gets \dfrac{b-a}{N}$</tex>
2. <tex>$x_0 \gets a$</tex>
3. <tex>$f_0 \gets f(x_0)$</tex>
4. <tex>$F_0 \gets 0$</tex>
5. **for** <tex>$i \in \{0, 1, 2, \dots, N-1\}$</tex> do:
6. $\quad$ <tex>$x_{i+1} \gets x_i + dx$</tex>
7. $\quad$ <tex>$f_{i+1} \gets f(x_{i+1})$</tex>
8. $\quad$ <tex>$F_{i+1} \gets F_i + \dfrac{f_i + f_{i+1}}{2}$</tex>
9. **return** <tex>$F_N \times dx$</tex>

## 中点積分法

一方，中点積分法では2点<tex>$x_i, x_{i+1}$</tex>の中点における関数値<tex>$f\left(\dfrac{x_i + x_{i+1}}{2}\right)$</tex>を幅，入力値の差分<tex>$x_{i+1} - x_{i}$</tex>を高さとするような長方形を考え，その面積を微小面積<tex>$dF_i$</tex>とする．

$$
    dF_i \coloneqq f\left(\dfrac{x_i + x_{i+1}}{2}\right) (x_{i+1} - x_i)
$$

そしてこれを<tex>$i=0, 1, \dots, N-1$</tex>に対して足し合わせることで積分を近似計算する．

$$
    \int_a^b f(x) dx \simeq \sum_{i=0}^{N-1} f\left(\dfrac{x_i + x_{i+1}}{2}\right) (x_{i+1} - x_i)
$$

台形法の場合と同様に，積分区間<tex>$[a, b]$</tex>を<tex>$N$</tex>等分する場合には，以下のような書き換えが可能である．

$$
    \int_a^b f(x) dx \simeq \sum_{i=0}^{N-1} f\left(\dfrac{x_i + x_{i+1}}{2}\right) dx
$$

$$
\begin{aligned}
    &\text{where}&
    x_i &= a + idx \\
    &&
    dx &= \frac{b-a}{N}
\end{aligned}
$$


アルゴリズムは次の通り．

1. <tex>$dx \gets \dfrac{b-a}{N}$</tex>
2. <tex>$x_0 \gets a + \dfrac{1}{2} dx$</tex>
3. <tex>$f_0 \gets f(x_0)$</tex>
4. <tex>$F_0 \gets 0$</tex>
5. **for** <tex>$i \in \{0, 1, 2, \dots, N-1\}$</tex> do:
6. $\quad$ <tex>$x_{i+1} \gets x_i + dx$</tex>
7. $\quad$ <tex>$f_{i+1} \gets f(x_{i})$</tex>
8. $\quad$ <tex>$F_{i+1} \gets F_i + \dfrac{f_i}{2}$</tex>
9. **return** <tex>$F_N \times dx$</tex>

## 数式の比較

台形積分法と中点積分法を並べて書いてみる．

$$
\begin{aligned}
    & \text{Trapezoidal} & \int_a^b f(x) dx &\simeq \sum_{i=0}^{N-1} \frac{f(x_{i}) + f(x_{i+1})}{2} dx \\
    & \text{Midpoint} &  \int_a^b f(x) dx &\simeq \sum_{i=0}^{N-1} f\left(\dfrac{x_{i} + x_{i+1}}{2}\right) dx
\end{aligned}
$$

どちらを使うにせよ，それなりに<tex>$N$</tex>を大きくしないと使い物にならないので注意．
