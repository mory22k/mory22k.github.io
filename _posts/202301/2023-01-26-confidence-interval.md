---
layout: post
title: "[分析4] 信頼区間"
categories: note
description: 標本統計量から推定された母数の信頼区間を求める．
tags: analysis
katex: true
---

標本統計量から推定された母数の信頼区間を求める．

{% include contents/analysis.md %}

## 標本平均の分布

何らかの実験を<tex>$N$</tex>回行なって，データ<tex>$\lbrace x_i \rbrace_{i=1}^N$</tex>を採取するという操作を，次のように書けると仮定する．

$$
    x_i \underset{\rm i.i.d.}{\sim} p(x)
$$

こうして得られたサイズ<tex>$N$</tex>の標本<tex>$\{x_i\}_{i=1}^N$</tex>から期待値<tex>$\mathbb E[x]$</tex>を推定するとき，その不偏推定量としては標本平均が適切である．

$$
    \mathbb E[x] = \mathbb E[\overline x] \simeq \overline x
$$

しかし，計算された標本平均<tex>$\overline x$</tex>は「<tex>$N$</tex>回の実験を行なう」という操作を行なうたびに変動することが予想される．そこで，<tex>$\overline x$</tex>もまた確率分布<tex>$\widetilde p(\overline x)$</tex>からサンプルされたものとして取り扱う．

$$
    \overline x \sim \widetilde p(\overline x)
$$

「中心極限定理」によれば，「標本<tex>$\lbrace x_i \rbrace_{i=1}^N$</tex>を採取して標本平均<tex>$\overline x$</tex>を得る」という操作を何度も繰り返すと，次第に標本平均<tex>$\overline x$</tex>は正規分布に従うようになる．これを利用して次のように近似する．

$$
    \widetilde p(\overline x) \approx \mathcal N(\mathbb E[\overline x], \mathbb V[\overline x]) \\
$$

すると，正規分布の性質により，**<tex>$68\%$</tex>の頻度で標本平均<tex>$\overline x$</tex>が<tex>$\mathbb E[\overline x] \pm \sqrt{\mathbb V[\overline x]}$</tex>の範囲に入っている**ことになる．これは「<tex>$N$</tex>個のデータを得て標本平均<tex>$\overline x$</tex>を計算する」という操作を<tex>$10,000$</tex>回繰り返した場合，標本平均<tex>$\overline x$</tex>が区間<tex>$\mathbb E[\overline x] \pm \sqrt{\mathbb V[\overline x]}$</tex>に含まれているという事象がだいたい<tex>$6,800$</tex>回くらい生じるということを意味している．以降ではこのことを次のように表すことにしよう．

$$
    \overline x \underset{68\%}\sim \mathbb E[\overline x] \pm \sqrt{\mathbb V[\overline x]}
$$

## 信頼区間

<figure class="center">
<img src="/assets/2023-01-25.svg">
<figcaption>

図1: エラーバーの例 (エラーバーは68%信頼区間)

</figcaption>
</figure>

標本平均<tex>$\overline x$</tex>，期待値<tex>$\mathbb E[x]$</tex>，標準誤差<tex>$\sqrt{\mathbb V[\overline x]}$</tex>の関係は，次のように変形することができる．

$$
\begin{aligned}
    \overline x &\underset{68\%}\sim \mathbb E[x] \pm \sqrt{\mathbb V[\overline x]} \\
    \mathbb E[x] &\underset{68\%}\sim \overline x \pm \sqrt{\mathbb V[\overline x]} \\
\end{aligned}
$$

**期待値<tex>$\mathbb E[x]$</tex>が<tex>$68 \%$</tex>の頻度で<tex>$\overline x \pm \sqrt{\mathbb V[\overline x]}$</tex>の範囲に入っている**のである．このような推定方法を**頻度主義的 (frequentism)** な推定といい，推定された区間<tex>$\overline x \pm \sqrt{\mathbb V[\overline x]}$</tex>を期待値<tex>$\mathbb E[x]$</tex>の**68％信頼区間 (68% confidence interval; CI)** という．これを図1のようなエラーバーとして表現することが多い．

## まとめ


<tex>
$
\begin{aligned}
    1. && \mathbb E[x] &\underset{68\%}\sim \overline x \pm \sqrt{\mathbb V[\overline x]} \\
    2. && \overline x &= \frac{1}{N} \sum_{i=1}^N x_i \\
    3. && \mathbb V[\overline x] &= \frac{1}{N-1} \mathbb E[s_x^2] \simeq \frac{1}{N-1} s_x^2
\end{aligned}
$
</tex>
