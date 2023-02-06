---
layout: post
title: "[分析4] 不偏推定量"
categories: note
description: 標本統計量から推定された値の「不偏性」に軽く触れる．
tags: analysis
katex: true
---

標本統計量から推定された値の「不偏性」に軽く触れる．

{% include contents/analysis.md %}

## 不偏推定量

統計量を変形して得られた推定量<tex>$\widehat w$</tex>の期待値<tex>$\mathbb E[\widehat w]$</tex>が母数<tex>$w$</tex>に一致するとき，推定量<tex>$\widehat w$</tex>を母数<tex>$w$</tex>の**不偏推定量 (unbiased estimator)** という．

$$
    \mathbb E[\widehat w] = w \implies \widehat w \text{ is an unbiased estimator of } w
$$

## 標本平均は不偏推定量である

標本平均の期待値<tex>$\mathbb E[\overline x]$</tex>は期待値<tex>$\mathbb E[x]$</tex>に一致する．

$$
    \mathbb E[x] = \mathbb E[\overline x]
$$

したがって，標本平均<tex>$\overline x$</tex>は期待値<tex>$\mathbb E[x]$</tex>の不偏推定量である．

$$
    \mathbb E[x] \simeq \overline x
$$

## 標本分散の<tex>$\dfrac{N}{N-1}$</tex>倍は分散の不偏推定量である

また<tex>$\dfrac{N}{N-1} \mathbb E[s_x^2]$</tex>は分散<tex>$\mathbb V[x]$</tex>に一致する．

$$
    \mathbb V[x] = \frac{N}{N-1} \mathbb E[s_x^2]
$$

よって，標本分散の<tex>$\dfrac{N}{N-1}$</tex>倍は分散<tex>$\mathbb V[x]$</tex>の不偏推定量である．

$$
    \mathbb V[x] \simeq \frac{N}{N-1} s_x^2
$$

さらに，標本分散の<tex>$\dfrac{1}{N-1}$</tex>倍は標本平均の分散<tex>$\mathbb V[\overline x]$</tex>の不偏推定量である．

$$
    \mathbb V[\overline x] = \frac{1}{N} \mathbb V[x] \simeq \frac{1}{N-1} s_x^2
$$

## 分散の不偏推定量の平方根は標準偏差の不偏推定量ではない

ところが，ほとんどの場合において<tex>$\sqrt{\mathbb E[s_x^2]} = \mathbb E[s_x]$</tex>は厳密には成り立たないため，ほとんどのケースで

$$
    \sqrt{\mathbb V[x]} = \sqrt{\frac{N}{N-1} \mathbb E[s_x^2]} \neq \sqrt\frac{N}{N-1} \mathbb E[s_x]
$$

となる．それゆえ，**分散の不偏推定量の平方根<tex>$\sqrt\dfrac{N}{N-1}s_x$</tex>は標準偏差<tex>$\sqrt{\mathbb V[x]}$</tex>の不偏推定量ではない**．またこのことからただちに分かるように，標準誤差の推定量

$$
    \sqrt{\mathbb V[\overline x]} \simeq \sqrt{\frac{1}{N-1}} s_x
$$

は不偏推定量ではなく，ややバイアスがかかっている．

しかしこの推定量はまったく役に立たないかといえばそういうわけでもなく，標準誤差がどれくらいのオーダーに乗っているかを推定するためには十分に役に立つ．たとえばエラーバーの長さを<tex>$1/2$</tex>に縮めるには，標本サイズ<tex>$N$</tex>を<tex>$4$</tex>倍に増やせばよいことがわかる．
