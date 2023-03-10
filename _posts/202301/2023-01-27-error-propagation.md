---
layout: post
title: "[分析5] 誤差伝播"
categories: note
description: 標本統計量を関数に入力したときの誤差伝播の考え方をまとめておく．
tags: analysis
katex: true
---

標本統計量を関数に入力したときの誤差伝播の考え方をまとめておく．

{% include contents/analysis.md %}

## 誤差伝播

とある実験を<tex>$N$</tex>回行なって，サイズ<tex>$N$</tex>の標本<tex>$\{x_i\}_{i=1}^N$</tex>を得たとき，「中心極限定理」が成り立つ場合，標本平均<tex>$\overline x$</tex>は<tex>$68\%$</tex>の頻度で<tex>$\mu_{\overline x} \pm \sigma_{\overline x}$</tex>の範囲に入る．

$$
    \overline x \underset{68\%}\sim \mathbb E[\overline x] \pm \sqrt{\mathbb V[\overline x]}
$$

$$
    \left\lbrace
        \begin{aligned}
        \mathbb E[\overline x] &= \mathbb E[x] \\
        \mathbb V[\overline x] &= \frac{\mathbb V[x]}{N} = \frac{\mathbb E[s_x^2]}{N-1}
        \end{aligned}
    \right.
$$

ここで標本平均<tex>$\overline x$</tex>を何らかの関数に入力して，出力<tex>$f(\overline x)$</tex>を得る場合を考える．標本平均<tex>$\overline x$</tex>は確率変数とみなしているため<tex>$f(\overline x)$</tex>もまた確率的な値となることに着目する．

$$
\begin{alignedat}{3}
    &&          \overline x    &\sim \mathbb E[\overline x]    &&\pm \sqrt{\mathbb V[\overline x]} \\
    &\to\qquad& f(\overline x) &\sim \mathbb E[f(\overline x)] &&\pm \sqrt{\mathbb V[f(\overline x)]}
\end{alignedat}
$$

そこで，期待値<tex>$\mathbb E[f(\overline x)]$</tex>と標準偏差<tex>$\sqrt{\mathbb V[f(\overline x)]}$</tex>を，標準誤差の伝播という観点から近似計算することを考える．このような方法をしばしば**誤差伝播 (error probagation)** という．

## 推定量の導出

以下，期待値<tex>$\mathbb E[x]$</tex>を<tex>$\mu_x$</tex>と表す．

$$
\begin{aligned}
    \mu_x &\coloneqq \mathbb E[x]
\end{aligned}
$$

### 期待値の推定量

期待値<tex>$\mathbb E[f(\overline x)]$</tex>の推定量を求める．<tex>$f(\overline x)$<tex>を点<tex>$\mu_x$</tex>の周りで2次までテイラー展開すると

$$
\begin{aligned}
    f(\overline x)
    &\approx f(\mu_x) + \frac{df}{d \mu_x} (\overline x - \mu_x) + \frac{1}{2} \frac{d^2 f}{d \mu_x^2} (\overline x - \mu_x)^2 + \dots \\
\end{aligned}
$$

となる．さらに期待値を計算すると

$$
\begin{aligned}
    \mathbb E[f(\overline x)]
    &= \langle f(\overline x) \rangle \\
    &\approx
    \left\langle
        f(\mu_x)
        + \frac{df}{d \mu_x} \underbrace{(\overline x - \mu_x)}_{0}
        + \frac{1}{2} \frac{d^2 f}{d \mu_x^2} \underbrace{(\overline x - \mu_x)^2}_{\text{variance}}
        + \dots
    \right\rangle \\
    &= f(\mu_x) + \frac{1}{2} \frac{d^2 f}{d \mu_x^2} \mathbb V[\overline x] + \dots \\
    &= f(\mu_x) + \frac{1}{2} \frac{1}{N} \frac{d^2 f}{d \mu_x^2} \mathbb V[x] + \dots \\
\end{aligned}
$$

となる．よって2次までの式を取り入れれば，期待値の推定量は次式で与えられる．

$$
\begin{aligned}
    \mathbb E[f(\overline x)]
    &\approx f(\mu_x) + \frac{1}{2} \frac{1}{N} \frac{d^2 f}{d \mu_x^2} \mathbb V[x] \\
    &= f(\mu_x) + \frac{1}{2} \frac{1}{N-1} \frac{d^2 f}{d \mu_x^2} \mathbb E[s_x^2] \\
    &\simeq f(\mu_x) + \frac{1}{2} \frac{1}{N-1} \frac{d^2 f}{d \mu_x^2} s_x^2
\end{aligned}
$$

### 標準偏差の推定量

続いて分散<tex>$\mathbb V[f(\overline x)]$</tex>を計算する．今度は<tex>$f(\overline x)$</tex>を1次まで展開する[^3]．

[^3]: なぜ1次までなのかというと「分散の推定のために後で2乗計算が入るから，2次まで展開する重要性がそれほどないため」である．…がまあこれは建前で，実際のところ「2次以降の展開をしても推定量の導出で詰む」というのが本音である．

$$
    f(\overline x) \approx f(\mu_x) + \frac{df}{d \mu_x} (\overline x - \mu_x) + \dots
$$

すると分散は

$$
\begin{aligned}
    \mathbb V[f(\overline x)]
    &= \underbrace{\langle f(\overline x) \rangle^2}_{(1)} - \underbrace{\langle f^2(\overline x) \rangle}_{(2)} \\
    &\quad \left\| \quad \begin{aligned}
        (1)
        &\approx \left\langle f(\mu_x) + \frac{df}{d \mu_x} \underbrace{(\overline x - \mu_x)}_{0} + \dots \right\rangle^2 \\
        &= \left( f(\mu_x) + \dots \right)^2 \\
        &= f^2(\mu_x) + \dots, \\
        (2)
        &\approx \left\langle \left( f(\mu_x) + \frac{df}{d \mu_x} (\overline x - \mu_x) + \dots \right)^2 \right\rangle \\
        &=
            \left\langle
                f^2(\mu_x)
                + 2 f^2(\mu_x) \frac{df}{d \mu_x} \underbrace{(\overline x - \mu_x)}_{0}
                + \left(\frac{df}{d \mu_x}\right)^2 \underbrace{(\overline x - \mu_x)^2}_{\text{variance}}
                + \dots
            \right\rangle
        \\
        &= f^2(\mu_x) + \left(\frac{df}{d \mu_x}\right)^2 \mathbb V[\overline x] + \dots \\
    \end{aligned}\right.
    \\
    &\approx \left(\frac{df}{d \mu_x}\right)^2 \mathbb V[\overline x] \\
    &= \frac{1}{N} \left(\frac{df}{d \mu_x}\right)^2 \mathbb V[x] \\
\end{aligned}
$$

となる．結果，次のように推定することができる．

$$
\begin{aligned}
    \mathbb V[f(\overline x)]
    &\approx \frac{1}{N} \left(\frac{df}{d \mu_x}\right)^2 \mathbb V[x] \\
    &= \frac{1}{N-1} \left(\frac{df}{d \mu_x}\right)^2 \mathbb E[s_x^2] \\
    &\simeq \frac{1}{N-1} \left(\frac{df}{d \mu_x}\right)^2 s_x^2
\end{aligned}
$$

あとは，この推定量の平方根をとったものを標準偏差の推定量として採用することで，標準偏差の推定量を得ることができる[^1]．

$$
    \sqrt{\mathbb V[f(\overline x)]}
    \simeq
    \sqrt\frac{1}{N-1}
    \frac{df}{d \mu_x} s_x
$$

[^1]: **分散の不偏推定量の平方根は標準偏差の不偏推定量ではない**問題は依然として残るが，$N$ が十分大きな場合にはそれほど核心的な問題に発展することはほとんどないのでここでは無視した．

### 結果

以上をまとめると，

$$
    f(\overline x) \sim \mathbb E[f(\overline x)] \pm \sqrt{\mathbb V[f(\overline x)]}
$$

$$
\left\{
\begin{aligned}
    \mathbb E[f(\overline x)]
    &\simeq f(\mu_x) + \frac{1}{2} \frac{1}{N-1} \frac{d^2 f}{d \mu_x^2} s_x^2
    \\
    \mathbb V[f(\overline x)]
    &\simeq \frac{1}{N-1} \left(\frac{df}{d \mu_x}\right)^2 s_x^2
\end{aligned}
\right.
$$

である．ここで期待値の推定量の第2項を「<tex>$f_\text{bias}$</tex>」と書くことにすれば，期待値±1標準偏差の範囲は次のように書ける．

$$
    f(\overline x) \sim f(\mu_x) + f_\text{bias} \pm \sqrt{\mathbb V[f(\overline x)]}
$$

$$
\left\{
\begin{aligned}
    f_\text{bias} &\simeq \frac{1}{2} \frac{1}{N-1} \frac{d^2 f}{d \mu_x^2} s_x^2 \\
    \mathbb V[f(\overline x)] &\simeq \frac{1}{N-1} \left( \frac{d f}{d \mu_x} \right)^2 s_x^2
\end{aligned}
\right.
$$

## 信頼区間

関数<tex>$f$</tex>に期待値<tex>$\mu_x = \mathbb E[x]$</tex>を入力したときの値<tex>$f(\mu_x)$</tex>については，次式で信頼区間を与えることができる．

$$
    f(\mu_x) \sim f(\overline x) - f_\text{bias} \pm \sqrt{\mathbb V[f(\overline x)]}
$$

$$
\left\{
\begin{alignedat}{2}
    f_\text{bias}
    &= \frac{1}{2} \frac{1}{N} \frac{d^2 f}{d \mu_x^2} \mathbb V[x]
    && \simeq \frac{1}{2} \frac{1}{N-1} \frac{d^2 f}{d \mu_x^2} s_x^2, \\
    \mathbb V[f(\overline x)]
    &= \frac{1}{N} \left(\frac{df}{d \mu_x}\right)^2 \mathbb V[x]
    && \simeq \frac{1}{N-1} \left( \frac{d f}{d \mu_x} \right)^2 s_x^2
\end{alignedat}
\right.
$$

出力値<tex>$f(\mu_x)$</tex>のエラーバーを表示したいときは，以上の量を使用すればよい．
