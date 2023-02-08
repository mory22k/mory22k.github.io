---
layout: post
title: "モンテカルロ積分"
categories: note
description: 数値積分法に乱択アルゴリズムを組み合わせたモンテカルロ積分を簡単に導入する．
tags: numerical_integrals
katex: true
---

数値積分法に乱択アルゴリズムを組み合わせたモンテカルロ積分を簡単に導入する．

## モンテカルロ積分

ある確率変数<tex>$x$</tex>の確率密度関数が<tex>$p(x)$</tex>である場合，<tex>$x$</tex>を何らかの関数<tex>$g$</tex>に入力すると，その出力値<tex>$g(x)$</tex>も確率的な値になる．

$$
\begin{aligned}
    &x : && \text{stochastic} \\
    \implies &g(x) : && \text{stochastic}
\end{aligned}
$$

このとき，出力値の期待値は<tex>$f(x)$</tex>の<tex>$0$</tex>まわりの1次モーメントとして与えられる．

$$
    \mathbb E[g(x)] \coloneqq \langle g(x) \rangle = \int dx g(x)p(x)
$$

もしも確率密度関数<tex>$p(x)$</tex>の**台 (support)** が<tex>${\cal X}$</tex>である，すなわち

$$
    p(x) =
    \left\{\begin{aligned}
        & p(x) && x \in {\cal X} \\
        & 0    && \text{otherwise}
    \end{aligned}\right.
$$

であるならば，期待値は次式で計算される．

$$
    \mathbb E[g(x)] = \int_{\cal X} dx g(x) p(x)
$$

ここで<tex>$g(x) = \dfrac{f(x)}{p(x)}$</tex>という書き換えを施すと次式が得られる．

$$
    \mathbb E \left[ \frac{f(x)}{p(x)} \right]
    = \int_{\cal X} dx \frac{f(x)}{p(x)}p(x)
    = \int_{\cal X} dx f(x)
$$

標本平均<tex>$\overline{\dfrac{f(x)}{p(x)}}$</tex>の期待値<tex>$\mathbb E \left[ \overline{\dfrac{f(x)}{p(x)}} \right]$</tex>は期待値<tex>$\mathbb E \left[ \dfrac{f(x)}{p(x)} \right]$</tex>に一致するから，左辺は次のように近似することができる．

$$
    \mathbb E \left[ \frac{f(x)}{p(x)} \right]
    \simeq \overline{\dfrac{f(x)}{p(x)}}
    = \frac{1}{N} \sum_{i=1}^N \frac{f(x_i)}{p(x_i)}
$$

これにより次のような数値積分の計算式が得られる．

$$
    \int_{\cal X} dx f(x) \simeq \frac{1}{N} \sum_{i=1}^N \frac{f(x_i)}{p(x_i)}
$$

$$
    x_i \sim p(x)
$$

このような乱択アルゴリズムを組み込んだ数値積分の方法を**モンテカルロ積分 (Monte Carlo integration)** という．


## 精度

ここで気になるのは，次の近似がどれほど正しいといえるかである．

$$
    \mathbb E[g(x)]
    \simeq \overline{g(x)}
$$

これを定量的に計るには，標本平均<tex>$\overline{g(x)}$</tex>の標準誤差<tex>$\sqrt{\mathbb V[\overline{g(x)}]}$</tex>を使用すればよい．この量は標準偏差<tex>$\sqrt{\mathbb V[g(x)]}$</tex>の<tex>$\sqrt\dfrac{1}{N}$</tex>倍であるから，オーダーは

$$
    \sqrt{\mathbb V[\overline{g(x)}]} = \sqrt\frac{\mathbb V[g(x)]}{N} = {\cal O} \left( \sqrt\frac{1}{N} \right)
$$

となる．よって

$$
    \mathbb E[g(x)] = \overline{g(x)} + {\cal O} \left( \sqrt\frac{1}{N} \right)
$$

と見積もれる．この精度はそのまま積分の精度に伝播する．

$$
    \int_{\cal X} dx f(x) = \frac{1}{N} \sum_{i=1}^N \frac{f(x_i)}{p(x_i)} + {\cal O} \left( \sqrt\frac{1}{N} \right)
$$

これは，精度を<tex>$n$</tex>倍にしたいならば，サンプルの大きさを<tex>$n^2$</tex>倍にする必要があるということを主張している．

## 連続一様分布からのサンプル

たとえば<tex>$p(x)$</tex>として1次元連続一様分布<tex>${\cal U}(a, b)$</tex>を仮定する．

$$
    p(x) = {\cal U}(a, b) \coloneqq \frac{1}{b-a}
$$

この場合，<tex>$p(x)$</tex>の台は<tex>${\cal X} = [a, b]$</tex>であるから，次のような数値積分公式が得られる．

$$
\begin{aligned}
    \int_a^b dx f(x)
    &= \frac{1}{N} \sum_{i=1}^N \frac{f(x_i)}{\frac{1}{b-a}} + {\cal O} \left( \sqrt\frac{1}{N} \right) \\
    &= \frac{b-a}{N} \sum_{i=1}^N f(x_i) + {\cal O} \left( \sqrt\frac{1}{N} \right)
\end{aligned}
$$

$$
    x_i \sim {\cal U}(x | a, b)
$$
