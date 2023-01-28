---
layout: post
title: "[分析2] 標準誤差"
categories: note
description: 得られたデータをエラーバーで表現するための統計量の基本的な扱い方について概説します．
tags: data_analysis
katex: true
---

実験で得たデータに対してエラーバーをつけるために期待値を区間推定する必要が生じる．その基本についてまとめておく．

## 状況設定

ある<tex>$N$</tex>個のデータ<tex>$\lbrace x_i \rbrace_{i=1}^N$</tex>が

$$
    x_i \underset{\rm i.i.d.}{\sim} p(x)
$$

として得られたと仮定し，期待値<tex>$\mu_x$</tex>を区間推定することを考える．当然ながらわれわれは期待値<tex>$\mu_x$</tex>の正体を知らないので，代わりに標本平均<tex>$\overline x$</tex>を使用することが多い．

$$
    \text{use } \overline x \text{ instead of } \mu_x
$$

すると気になるのは期待値<tex>$\mu_x$</tex>と標本平均<tex>$\overline x$</tex>はどれほどずれているのかである．これを考えていく．

## 標本平均を確率変数とみなす

標本平均<tex>$\overline x$</tex>は「<tex>$N$</tex>回の実験を行う」という操作を行うたびに変動することが予想される．そこで，<tex>$\overline x$</tex>もまた確率分布<tex>$\widetilde p(\overline x)$</tex>からサンプルされたものとして取り扱う．

$$
    \overline x \sim \widetilde p(\overline x)
$$

「中心極限定理」によれば，「標本<tex>$\lbrace x_i \rbrace_{i=1}^N$</tex>を採取して標本平均<tex>$\overline x$</tex>を得る」という操作を何度も繰り返すと，次第に標本平均<tex>$\overline x$</tex>は正規分布に従うようになる．これを利用して次のように近似する．

$$
\begin{aligned}
    &
    \widetilde p(\overline x) \approx \mathcal N(\mu_{\overline x}, \sigma_{\overline x}) \\
    &
    \left\lbrace
        \begin{aligned}
        \mu_{\overline x}    = \mu_{\overline x} &\coloneqq \langle \overline x \rangle \\
        \sigma_{\overline x} = \mathbb V[\overline x] &\coloneqq \langle \overline x^2 \rangle - \langle \overline x \rangle^2
        \end{aligned}
    \right.
\end{aligned}
$$

すると，正規分布の性質により，標本平均<tex>$\overline x$</tex>が<tex>$\mu_{\overline x} \pm \sigma_{\overline x}$</tex>の範囲に入っている確率が<tex>$68 \%$</tex>となる．このことをこれ以降次のように表すことにしよう．

$$
    \overline x
    \underset{68\%}\sim
    \mu_{\overline x} \pm \sigma_{\overline x}
$$

## 標本平均の期待値

標本平均の期待値<tex>$\mu_{\overline x}$</tex>を計算すると

$$
\begin{aligned}
    \mu_{\overline x}
    &= \langle \overline x \rangle \\
    &= \frac{1}{N} \sum_{i=1}^N \langle x_i \rangle \\
    & \quad \left\| \quad \begin{aligned}
        x_i \underset{\rm i.i.d.}{\sim} p(x)
        \implies
        \langle x_i \rangle = \langle x \rangle
    \end{aligned} \right. \\
    &= \frac{1}{N} \sum_{i=1}^N \langle x \rangle \\
    &= \langle x \rangle \\
    &= \mu_x
\end{aligned}
$$

である．このことから，標本平均の期待値<tex>$\mu_{\overline x}$</tex>は期待値<tex>$\mu_x$</tex>に一致する．

$$
    \mu_{\overline x} = \mu_x
$$

## 標本平均の標準偏差

標本平均の分散<tex>$\sigma_{\overline x}^2$</tex>は次のように計算できる．

$$
\begin{aligned}
    \sigma_{\overline x}^2
    &=
    \langle \overline x^2 \rangle - \langle \overline x \rangle^2 \\
    &=
    \left\langle
        \frac{1}{N} \sum_{i=1}^N x_i \times
        \frac{1}{N} \sum_{j=1}^N x_j
    \right\rangle
    -
    \left\langle \frac{1}{N} \sum_{i=1}^N x_i \right\rangle
    \left\langle \frac{1}{N} \sum_{j=1}^N x_j \right\rangle
    \\
    &=
    \frac{1}{N^2}
    \underbrace{\sum_{i=1}^N \sum_{j=1}^N \langle x_i x_j \rangle}_{(1)}
    -
    \frac{1}{N^2}
    \underbrace{\sum_{i=1}^N \sum_{j=1}^N \langle x_i \rangle \langle x_j \rangle}_{(2)}
    \\
    & \quad \left\| \quad \begin{aligned}
        (1)
        &=
            \sum_{i = j} \langle x_i x_j \rangle +
            \sum_{i \ne j} \langle x_i \rangle \langle x_j \rangle \\
        &=
            N \langle x^2 \rangle + N (N-1) \langle x \rangle^2,
        \\
        (2) &= N^2 \langle x \rangle^2
    \end{aligned} \right.
    \\
    &=
    \frac{1}{N} \langle x^2 \rangle
    + \frac{N-1}{N} \langle x \rangle^2
    - \langle x \rangle^2
    \\
    &=
    \frac{1}{N} \left( \langle x^2 \rangle - \langle x \rangle^2 \right)
    \\
    &=
    \frac{1}{N} \sigma_x^2
\end{aligned}
$$

よって標本平均の標準偏差は次式で計算できる．

$$
    \sigma_{\overline x} = \sqrt\frac{1}{N} \sigma_x
$$

## 標準誤差

以上のことを用いると次のことがいえる．

$$
\begin{aligned}
    \overline x &\underset{68\%}\sim \mu_{\overline x} \pm \sigma_{\overline x} \\
    \overline x &\underset{68\%}\sim \mu_x \pm \sqrt\frac{1}{N} \sigma_x \\
    \mu_x &\underset{68\%}\sim \overline x \pm \sqrt\frac{1}{N} \sigma_x \\
\end{aligned}
$$

**期待値<tex>$\mu_x$</tex>が<tex>$\overline x \pm \sqrt\dfrac{1}{N} \sigma_x$</tex>の範囲に入っている確率が<tex>$68 \%$</tex>となる**のである．ただし，ここでいう「<tex>$68 \%$</tex>」とは，仮に「<tex>$N$</tex>個のデータを得る」という操作を<tex>$10,000$</tex>回繰り返した場合，期待値<tex>$\mu_{\overline x}$</tex>が区間<tex>$\overline x \pm \sigma_{\overline x}$</tex>に含まれているという事象がだいたい<tex>$6,800$</tex>回くらい生じるという意味である．


<figure class="center">
<img src="/assets/2023-01-24.svg">
<figcaption>

図1: エラーバーの例 (エラーバーは68%信頼区間)

</figcaption>
</figure>

このような推定方法を**頻度主義的 (frequentism)** な推定といい，推定された区間<tex>$\overline x \pm \sigma_{\overline x}$</tex>を期待値<tex>$\mu_x$</tex>の**68％信頼区間 (68% confidence interval; CI)** という．これを図1のようなエラーバーとして表現することが多い．

以上のように標本平均の標準偏差<tex>$\sigma_{\overline x}$</tex>は期待値の区間推定に役に立つため，<tex>$\sigma_{\overline x}$</tex>のことを期待値<tex>$\mu_x$</tex>の**標準誤差 (standard error)** という．より一般に，何らかの母数<tex>$w$</tex>の推定量<tex>$\widehat w$</tex>の標準偏差<tex>$\sigma_{\widehat w}$</tex>を「<tex>$w$</tex>の標準誤差」というが，単に「標準誤差」といった場合は「標本平均<tex>$\overline x$</tex>によって推定された期待値<tex>$\mu_x$</tex>の標準誤差<tex>$\sigma_{\overline x}$</tex>」を表す．

$$
\begin{darray}{lcl}
    w                       &\cdots& \text{a parameter }  \\
    \widehat w              &\cdots& \text{an estimator of } w \\
    \sigma_{\widehat w}^2   &\cdots& \text{the variance of } \widehat w \\
    \sigma_{\widehat w}     &\cdots& \text{the standard deviation of } \widehat w = \text{the standard error of } w
\end{darray}
$$

## 標本からの標準誤差の推定

標準誤差<tex>$\sigma_{\overline x} = \sqrt\dfrac{1}{N} \sigma_x$</tex>を標本から推定するためには，標準偏差<tex>$\sigma_x$</tex>を推定する必要がある．これを求めるために，標本分散<tex>$s^2$</tex>の期待値<tex>$\langle s^2 \rangle$</tex>を計算してみる．

$$
\begin{aligned}
    \langle s_x^2 \rangle
    &=
    \left\langle
        \overline{x^2} - \overline{x}^2
    \right\rangle
    \\
    &=
    \left\langle
        \frac{1}{N} \sum_{i=1}^N x_i^2
        -
        \frac{1}{N} \sum_{i=1}^N x_i \times
        \frac{1}{N} \sum_{j=1}^N x_j
    \right\rangle
    \\
    &=
    \frac{1}{N} \sum_{i=1}^N \langle x_i^2 \rangle -
    \frac{1}{N^2} \sum_{i=1}^N \sum_{j=1}^N \langle x_i x_j \rangle
    \\
    & \quad \left\| \quad \begin{aligned}
        \sum_{i=1}^N \sum_{j=1}^N \langle x_i x_j \rangle
        &=
        \sum_{i = j} \langle x_i x_j \rangle +
        \sum_{i \ne j} \langle x_i \rangle \langle x_j \rangle \\
        &=
        N \langle x^2 \rangle + N (N-1) \langle x \rangle^2
    \end{aligned} \right.
    \\
    &=
    \langle x^2 \rangle
    - \frac{1}{N} \langle x^2 \rangle
    - \frac{N-1}{N} \langle x \rangle^2
    \\
    &=
    \frac{N-1}{N} \left( \langle x^2 \rangle - \langle x \rangle^2 \right)
    \\
    &=
    \frac{N-1}{N} \sigma_x^2
\end{aligned}
$$

ゆえに

$$
\begin{aligned}
    \sigma_x^2 &= \frac{N}{N-1} \langle s_x^2 \rangle \\
    \sigma_x &= \sqrt\frac{N}{N-1} \sqrt{\langle s_x^2 \rangle}
\end{aligned}
$$

である．よって<tex>$\sigma_{\overline x}$</tex>は

$$
\begin{aligned}
    \sigma_{\overline x}^2 &= \frac{1}{N-1} \langle s_x^2 \rangle \\
    \sigma_{\overline x} &= \sqrt\frac{1}{N-1} \sqrt{\langle s_x^2 \rangle}
\end{aligned}
$$

と表されることになる．ゆえに標準誤差は次のように推定できる．

$$
    \sigma_{\overline x} \simeq \sqrt\frac{1}{N-1} \sqrt{s_x^2} = \sqrt\frac{1}{N-1} s_x
$$

ということで，68％信頼区間は次式で計算できる．

$$
    \mu_x \underset{68\%}\sim \overline x \pm \sqrt\frac{1}{N-1} s_x
$$

## 不偏推定量

標本平均の期待値<tex>$\langle \overline x \rangle$</tex>と期待値<tex>$\mu_x$</tex>は一致する．

$$
    \mu_x = \langle \overline x \rangle
$$

また，分散の定数倍の期待値<tex>$\dfrac{N}{N-1} \langle s_x^2 \rangle$</tex>と分散<tex>$\sigma_x^2$</tex>は一致する．

$$
    \sigma_x^2 = \frac{N}{N-1} \langle s_x^2 \rangle
$$

このように，統計量の期待値を定数倍して得られた推定量<tex>$\widehat w$</tex>が母数<tex>$w$</tex>に一致するとき，推定量<tex>$\widehat w$</tex>を母数<tex>$w$</tex>の**不偏推定量 (unbiased estimator)** という．すなわち，標本平均<tex>$\overline x$</tex>は期待値<tex>$\mu_x$</tex>の不偏推定量であり，標本分散の定数倍<tex>$\dfrac{N}{N-1}s_x^2$</tex>は分散<tex>$\sigma_x$</tex>の不偏推定量であるということができる．

ところが，**分散の不偏推定量の平方根<tex>$\sqrt\dfrac{N}{N-1}s_x$</tex>は標準偏差<tex>$\sigma_x$</tex>の不偏推定量ではない**．なぜなら，ほとんどの場合において<tex>$\sqrt{\langle s_x^2 \rangle} = \langle s_x \rangle$</tex>は厳密に成り立たないため，

$$
    \sigma_x = \sqrt{\frac{N}{N-1} \langle s_x^2 \rangle} \neq \sqrt\frac{N}{N-1} \langle s_x \rangle
$$

となるからである．このことからただちに分かるように，標本統計量から推定された<tex>$\mu_x$</tex>の標準誤差

$$
    \sigma_{\overline x} \simeq \sqrt{\frac{1}{N-1}} s_x
$$

は不偏推定量ではなく，ややバイアスがかかっている．ただしこの推定量はまったく役に立たないかといえばそういうわけでもなく，標準誤差がどれくらいのオーダーに乗っているかを推定するためには十分に役に立つ．

たとえばエラーバーの長さを<tex>$1/2$</tex>に縮めるには，標本サイズ<tex>$N$</tex>を<tex>$4$</tex>倍に増やせばよいことがわかる．
