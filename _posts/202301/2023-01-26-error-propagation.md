---
layout: post
title: "[分析4] 誤差伝播法"
categories: note
description: 得られたデータを何らかの関数に入力するときのエラーバーを誤差伝播で計算することについて概説します．
tags: data_analysis
katex: true
---

標本統計量を関数に入力したときの誤差伝播の考え方をまとめておく．

## 誤差伝播

とある実験を<tex>$N$</tex>回行なって，サイズ<tex>$N$</tex>の標本<tex>$\{x_i\}_{i=1}^N$</tex>を得たとき，「中心極限定理」が成り立つ場合，標本平均<tex>$\overline x$</tex>は<tex>$68\%$</tex>の頻度で<tex>$\mu_{\overline x} \pm \sigma_{\overline x}$</tex>の範囲に入る．

$$
    \overline x \underset{68\%}\sim \mu_{\overline x} \pm \sigma_{\overline x}
$$

$$
    \left\lbrace
        \begin{aligned}
        \mu_{\overline x} &\coloneqq \mathbb E[\overline x] = \mathbb E[x]
        \\
        \sigma_{\overline x}^2 &\coloneqq \mathbb V[\overline x] = \sqrt\frac{\mathbb V[x]}{N}
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

そこで，期待値<tex>$\mathbb E[f(\overline x)]$</tex>と標準偏差<tex>$\sqrt{\mathbb V[f(\overline x)]}$</tex>を計算することを考える．

## 推定量の導出

以下，期待値<tex>$\mathbb E[x]$</tex>および分散<tex>$\mathbb V[x]$</tex>をそれぞれ<tex>$\mu_x, \sigma_x^2$</tex>と表す．

$$
\begin{aligned}
    \mu_x &\coloneqq \mathbb E[x] \\
    \sigma_x^2 &\coloneqq \mathbb V[x] \\
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
    f(\mu_x)
    + \frac{df}{d \mu_x} \underbrace{\langle \overline x - \mu_x \rangle}_{0}
    + \frac{1}{2} \frac{d^2 f}{d \mu_x^2} \underbrace{ \langle (\overline x - \mu_x)^2 \rangle }_{\text{variance}}
    + \dots \\
    &= f(\mu_x) + \frac{1}{2} \frac{d^2 f}{d \mu_x^2} \sigma_x^2 + \dots \\
    &= f(\mu_x) + \frac{1}{2} \frac{1}{N-1} \frac{d^2 f}{d \mu_x^2} \mathbb E[s_x^2] + \dots \\
\end{aligned}
$$

となる．よって2次までの式を取り入れれば，期待値の推定量は次式で与えられる．

$$
\begin{aligned}
    && \mathbb E[f(\overline x)] &\approx f(\mu_x) + \frac{1}{2} \frac{1}{N-1} \frac{d^2 f}{d \mu_x^2} \mathbb E[s_x^2] \\
    &\to& \mathbb E[f(\overline x)] &\simeq f(\mu_x) + \frac{1}{2} \frac{1}{N-1} \frac{d^2 f}{d \mu_x^2} s_x^2
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
        &= f^2(\mu_x) + \left(\frac{df}{d \mu_x}\right)^2 \sigma_x^2 + \dots \\
    \end{aligned}\right.
    \\
    &\approx \left(\frac{df}{d \mu_x}\right)^2 \sigma_x^2 \\
    &= \frac{1}{N-1} \left(\frac{df}{d \mu_x}\right)^2 \mathbb E[s_x^2]
\end{aligned}
$$

となる．結果，次のように推定することができる．

$$
\begin{aligned}
    \mathbb V[f(\overline x)] &\simeq \frac{1}{N-1} \left(\frac{df}{d \mu_x}\right)^2 \mathbb E[s_x^2] \\
    \mathbb V[f(\overline x)] &\simeq \frac{1}{N-1} \left(\frac{df}{d \mu_x}\right)^2 s_x^2
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

## まとめ

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

## 信頼区間

関数<tex>$f$</tex>に期待値<tex>$\mu_x = \mathbb E[x]$</tex>を入力したときの値<tex>$f(\mu_x)$</tex>については，次式で信頼区間を与えることができる．

$$
    f(\mu_x) \sim f(\overline x) - f_\text{bias} \pm \sqrt{\mathbb V[f(\overline x)]}
$$

$$
\left\{
\begin{aligned}
    f_\text{bias} &\simeq \frac{1}{2} \frac{1}{N-1} \frac{d^2 f}{d \mu_x^2} s_x^2 \\
    \mathbb V[f(\overline x)] &\simeq \frac{1}{N-1} \left( \frac{d f}{d \mu_x} \right)^2 s_x^2
\end{aligned}
\right.
$$

出力値<tex>$f(\mu_x)$</tex>のエラーバーを表示したいときは，以上の量を使用すればよい．
