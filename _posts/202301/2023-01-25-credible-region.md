---
layout: post
title: "[分析3] 期待値の信頼区間"
categories: note
description: 標本統計量から計算された母数の信頼区間を求める．
tags: analytics
katex: true
---

標本統計量をもとに母数を区間推定することを考える．

## 標準誤差

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

このとき<tex>$\sigma_{\overline x}$</tex>を<tex>$\overline x$</tex>の標準誤差という．

## 信頼区間とエラーバー

<figure class="center">
<img src="/assets/2023-01-25.svg">
<figcaption>

図1: エラーバーの例 (エラーバーは68%信頼区間)

</figcaption>
</figure>

この関係は，次のように変形することができる．

$$
\begin{aligned}
    \overline x &\underset{68\%}\sim \mathbb E[x] \pm \sqrt\frac{\mathbb V[x]}{N} \\
    \mathbb E[x] &\underset{68\%}\sim \overline x \pm \sqrt\frac{\mathbb V[x]}{N} \\
\end{aligned}
$$

**期待値<tex>$\mathbb E[x]$</tex>が<tex>$\overline x \pm \sqrt\dfrac{\mathbb V[x]}{N}$</tex>の範囲に入っている確率が<tex>$68 \%$</tex>となる**のである．このような推定方法を**頻度主義的 (frequentism)** な推定といい，推定された区間<tex>$\overline x \pm \sqrt\dfrac{\mathbb V[x]}{N}$</tex>を期待値<tex>$\mu_x$</tex>の**68％信頼区間 (68% confidence interval; CI)** という．これを図1のようなエラーバーとして表現することが多い．


## 標本からの標準誤差の推定

標準誤差<tex>$\mathbb V[\overline x] = \sqrt\dfrac{\mathbb V[x]}{N}$</tex>を標本から推定するためには，標準偏差<tex>$\sqrt{\mathbb V[x]}$</tex>を推定する必要がある．これを求めるために，標本分散<tex>$s^2$</tex>の期待値<tex>$\mathbb E[s^2]$</tex>を計算してみる．

$$
\begin{aligned}
    \mathbb E[s_x^2]
    &= \langle s_x^2 \rangle \\
    &= \langle \overline{x^2} - \overline{x}^2 \rangle \\
    &= \underbrace{\langle \overline{x^2} \rangle}_{(1)} - \underbrace{\langle \overline{x}^2 \rangle}_{(2)} \\
    & \quad \left\| \quad \begin{aligned}
        (1)
        &= \left\langle \frac{1}{N} \sum_{i=1}^N x_i^2 \right\rangle
        = \frac{1}{N} \sum_{i=1}^N \langle x_i^2 \rangle
        = \langle x^2 \rangle
        \\
        (2)
        &= \left\langle \frac{1}{N} \sum_{i=1}^N x_i \times \frac{1}{N} \sum_{j=1}^N x_j \right\rangle \\
        &= \frac{1}{N^2} \sum_{i = j} \langle x_i x_j \rangle + \frac{1}{N^2} \sum_{i \ne j} \langle x_i \rangle \langle x_j \rangle \\
        &= \frac{1}{N} \langle x^2 \rangle + \frac{N-1}{N} \langle x \rangle^2
    \end{aligned} \right.
    \\
    &= \langle x^2 \rangle - \frac{1}{N} \langle x^2 \rangle - \frac{N-1}{N} \langle x \rangle^2 \\
    &= \frac{N-1}{N} \left( \langle x^2 \rangle - \langle x \rangle^2 \right) \\
    &= \frac{N-1}{N} \mathbb V[x]
\end{aligned}
$$

ゆえに分散<tex>$\mathbb V[x]$</tex>は

$$
\begin{aligned}
    &&      \mathbb V[x] &= \frac{N}{N-1} \mathbb E[s_x^2] \\
    &\to&   \mathbb V[x] &\simeq \frac{N}{N-1} s_x^2
\end{aligned}
$$

で推定できる．さらに<u>もしも<tex>$\sqrt{\mathbb E[s_x^2]} = \mathbb E[s_x]$</tex> が成り立つならば</u>標準偏差<tex>$\sqrt{\mathbb V[x]}$</tex>は

$$
\begin{aligned}
    && \sqrt{\mathbb V[x]} &= \sqrt{\frac{N}{N-1} \mathbb E[s_x^2]} \\
    &\to& \sqrt{\mathbb V[x]} &= \sqrt\frac{N}{N-1} \mathbb E[s_x] \\
    &\to& \sqrt{\mathbb V[x]} &\simeq \frac{N}{N-1} s_x
\end{aligned}
$$

で推定することが可能であり，標準誤差は次のように推定できる．

$$
    \sigma_{\overline x} \simeq \sqrt\frac{1}{N-1} \sqrt{s_x^2} = \sqrt\frac{1}{N-1} s_x
$$

ということで，68％信頼区間は次式で計算できる．

$$
    \mu_x \underset{68\%}\sim \overline x \pm \sqrt\frac{1}{N-1} s_x
$$

## 不偏推定量

標本平均の期待値<tex>$\mathbb E[\overline x]$</tex>は期待値<tex>$\mathbb E[x]$</tex>に一致する．

$$
    \mathbb E[x] = \mathbb E[\overline x]
$$

また<tex>$\dfrac{N}{N-1} \mathbb E[s_x^2]$</tex>は分散<tex>$\mathbb V[x]$</tex>に一致する．

$$
    \mathbb V[x] = \frac{N}{N-1} \mathbb E[s_x^2]
$$

このように，統計量を変形して得られた推定量<tex>$\widehat w$</tex>の期待値<tex>$\mathbb E[\widehat w]$</tex>が母数<tex>$w$</tex>に一致するとき，推定量<tex>$\widehat w$</tex>を母数<tex>$w$</tex>の**不偏推定量 (unbiased estimator)** という．

$$
    \mathbb E[\widehat w] = w \implies \widehat w \text{ is an unbiased estimator of } w
$$

すなわち，標本平均<tex>$\overline x$</tex>は期待値<tex>$\mu_x$</tex>の不偏推定量であり，標本分散の定数倍<tex>$\dfrac{N}{N-1}s_x^2$</tex>は分散<tex>$\sigma_x$</tex>の不偏推定量であるということができる．

---

ところが，**分散の不偏推定量の平方根<tex>$\sqrt\dfrac{N}{N-1}s_x$</tex>は標準偏差<tex>$\sigma_x$</tex>の不偏推定量ではない**．なぜなら，ほとんどの場合において<tex>$\sqrt{\mathbb E[s_x^2]} = \mathbb E[s_x]$</tex>は厳密には成り立たず，そのような場合

$$
    \sigma_x = \sqrt{\frac{N}{N-1} \mathbb E[s_x^2]} \neq \sqrt\frac{N}{N-1} \mathbb E[s_x]
$$

となるからである．このことからただちに分かるように，標本統計量から推定された<tex>$\mu_x$</tex>の標準誤差

$$
    \sigma_{\overline x} \simeq \sqrt{\frac{1}{N-1}} s_x
$$

は不偏推定量ではなく，ややバイアスがかかっている．ただしこの推定量はまったく役に立たないかといえばそういうわけでもなく，標準誤差がどれくらいのオーダーに乗っているかを推定するためには十分に役に立つ．

たとえばエラーバーの長さを<tex>$1/2$</tex>に縮めるには，標本サイズ<tex>$N$</tex>を<tex>$4$</tex>倍に増やせばよいことがわかる．
