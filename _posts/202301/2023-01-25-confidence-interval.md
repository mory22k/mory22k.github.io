---
layout: post
title: "[分析3] 標準誤差と信頼区間"
categories: note
description: 標本統計量から計算された母数の信頼区間を求める．
tags: analysis
katex: true
---

標本統計量をもとに母数を区間推定することを考える．

{% include contents/analysis.md %}

## 標準誤差

とある実験を<tex>$N$</tex>回行なって，サイズ<tex>$N$</tex>の標本<tex>$\{x_i\}_{i=1}^N$</tex>を得たとき，「中心極限定理」が成り立つ場合，標本平均<tex>$\overline x$</tex>は<tex>$68\%$</tex>の頻度で<tex>$\mathbb E[\overline x] \pm \sqrt{\mathbb V[\overline x]}$</tex>の範囲に入る．

$$
    \overline x \underset{68\%}\sim \mathbb E[\overline x] \pm \sqrt{\mathbb V[\overline x]}
$$

$$
    \left\lbrace
        \begin{aligned}
        \mathbb E[\overline x] &= \mathbb E[x] \\
        \mathbb V[\overline x] &= \frac{\mathbb V[x]}{N}
        \end{aligned}
    \right.
$$

このとき，標本平均の標準偏差<tex>$\sqrt{\mathbb V[\overline x]}$</tex>を標本平均の**標準誤差 (standard error)** という．より一般に，何らかの統計量<tex>$\widehat w$</tex>の標準偏差<tex>$\sqrt{\mathbb V[\widehat w]}$</tex>を「<tex>$\widehat w$</tex>の標準誤差」というが，単に「標準誤差」といった場合は「標本平均<tex>$\overline x$</tex>の標準誤差<tex>$\sqrt{\mathbb V[\overline x]}$</tex>」を表す．

$$
\begin{aligned}
    & \text{standard deviation of }x:       & \sqrt{\mathbb V[x]} \\
    & \text{standard error of }\overline x: & \sqrt{\mathbb V[\overline x]}
\end{aligned}
$$

## 信頼区間とエラーバー

<figure class="center">
<img src="/assets/2023-01-25.svg">
<figcaption>

図1: エラーバーの例 (エラーバーは68%信頼区間)

</figcaption>
</figure>

標本平均<tex>$\overline x$</tex>，期待値<tex>$\mathbb E[x]$</tex>，標準誤差<tex>$\mathbb V[\overline x]$</tex>の関係は，次のように変形することができる．

$$
\begin{aligned}
    \overline x &\underset{68\%}\sim \mathbb E[x] \pm \sqrt\frac{\mathbb V[x]}{N} \\
    \mathbb E[x] &\underset{68\%}\sim \overline x \pm \sqrt\frac{\mathbb V[x]}{N} \\
\end{aligned}
$$

**期待値<tex>$\mathbb E[x]$</tex>が<tex>$68 \%$</tex>の頻度で<tex>$\overline x \pm \sqrt\dfrac{\mathbb V[x]}{N}$</tex>の範囲に入っている**のである．このような推定方法を**頻度主義的 (frequentism)** な推定といい，推定された区間<tex>$\overline x \pm \sqrt\dfrac{\mathbb V[x]}{N}$</tex>を期待値<tex>$\mathbb E[x]$</tex>の**68％信頼区間 (68% confidence interval; CI)** という．これを図1のようなエラーバーとして表現することが多い．

## 標本から標準誤差を推定する

標準誤差<tex>$\sqrt{\mathbb V[\overline x]} = \sqrt\dfrac{\mathbb V[x]}{N}$</tex>を標本から推定するためには，標準偏差<tex>$\sqrt{\mathbb V[x]}$</tex>を推定する必要がある．これを求めるために，標本分散<tex>$s^2$</tex>の期待値<tex>$\mathbb E[s^2]$</tex>を計算してみる．

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

で推定でき，標本平均の分散は

$$
\begin{aligned}
    &&      \mathbb V[\overline x] &= \frac{1}{N-1} \mathbb E[s_x^2] \\
    &\to&   \mathbb V[\overline x] &\simeq \frac{1}{N-1} s_x^2
\end{aligned}
$$

で推定できる．

---

さらに<u>もしも<tex>$\sqrt{\mathbb E[s_x^2]} = \mathbb E[s_x]$</tex> が成り立つならば</u>標準偏差<tex>$\sqrt{\mathbb V[x]}$</tex>は

$$
\begin{aligned}
    && \sqrt{\mathbb V[x]} &= \sqrt{\frac{N}{N-1} \mathbb E[s_x^2]} \\
    &\to& \sqrt{\mathbb V[x]} &= \sqrt\frac{N}{N-1} \mathbb E[s_x] \\
    &\to& \sqrt{\mathbb V[x]} &\simeq \sqrt\frac{N}{N-1} s_x
\end{aligned}
$$

で推定することが可能であり，標本平均の標準偏差は次のように推定できる．

$$
    \sqrt{\mathbb V[\overline x]} \simeq \sqrt\frac{1}{N-1} \sqrt{s_x^2} = \sqrt\frac{1}{N-1} s_x
$$

よって<tex>$\mathbb E[x]$</tex>の68％信頼区間は次式で計算できる．

$$
    \mathbb E[x] \underset{68\%}\sim \overline x \pm \sqrt\frac{1}{N-1} s_x
$$
