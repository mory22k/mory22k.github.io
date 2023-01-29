---
layout: post
title: "[分析2] 標本平均の標準誤差"
categories: note
description: ある分布に対してそこから標本を採取して標本平均を計算した場合，標本平均がどのあたりに存在しうるかを計算する．
tags: analytics
katex: true
---

ある分布に対してそこから標本を採取して標本平均を計算した場合，標本平均がどのあたりに存在しうるかを計算する．

## 標本平均の分布

何らかの実験を<tex>$N$</tex>回行なって，データ<tex>$\lbrace x_i \rbrace_{i=1}^N$</tex>を採取するという操作を，次のように書けると仮定する．

$$
    x_i \underset{\rm i.i.d.}{\sim} p(x)
$$

得られた標本をもとに計算される標本平均<tex>$\overline x$</tex>は「<tex>$N$</tex>回の実験を行う」という操作を行うたびに変動することが予想される．そこで，<tex>$\overline x$</tex>もまた確率分布<tex>$\widetilde p(\overline x)$</tex>からサンプルされたものとして取り扱う．

$$
    \overline x \sim \widetilde p(\overline x)
$$

「中心極限定理」によれば，「標本<tex>$\lbrace x_i \rbrace_{i=1}^N$</tex>を採取して標本平均<tex>$\overline x$</tex>を得る」という操作を何度も繰り返すと，次第に標本平均<tex>$\overline x$</tex>は正規分布に従うようになる．これを利用して次のように近似する．

$$
\begin{aligned}
    &
    \widetilde p(\overline x) \approx \mathcal N(\mu_{\overline x}, \sigma_{\overline x}^2) \\
    &
    \left\lbrace
        \begin{aligned}
        \mu_{\overline x} &\coloneqq \mathbb E[\overline x] \\
        \sigma_{\overline x}^2 &\coloneqq \mathbb V[\overline x]
        \end{aligned}
    \right.
\end{aligned}
$$

## 標準誤差

すると，正規分布の性質により，<tex>$68\%$</tex>の頻度で標本平均<tex>$\overline x$</tex>が<tex>$\mu_{\overline x} \pm \sigma_{\overline x}$</tex>の範囲に入っていることになる．これは「<tex>$N$</tex>個のデータを得て標本平均<tex>$\overline x$</tex>を計算する」という操作を<tex>$10,000$</tex>回繰り返した場合，標本平均<tex>$\overline x$</tex>が区間<tex>$\mu_{\overline x} \pm \sigma_{\overline x}$</tex>に含まれているという事象がだいたい<tex>$6,800$</tex>回くらい生じるということを意味している．このことをこれ以降次のように表すことにしよう．

$$
    \overline x \underset{68\%}\sim \mu_{\overline x} \pm \sigma_{\overline x}
$$

このとき，標本平均の標準偏差<tex>$\sigma_{\overline x}$</tex>を標本平均の**標準誤差 (standard error)** という．より一般に，何らかの統計量<tex>$\widehat w$</tex>の標準偏差<tex>$\sigma_{\widehat w}$</tex>を「<tex>$\widehat w$</tex>の標準誤差」というが，単に「標準誤差」といった場合は「標本平均<tex>$\overline x$</tex>の標準誤差<tex>$\sigma_{\overline x}$</tex>」を表す．

$$
\begin{aligned}
    & \text{standard deviation of }x:       & \sigma_x             &= \sqrt{\mathbb V[x]} \\
    & \text{standard error of }\overline x: & \sigma_{\overline x} &= \sqrt{\mathbb V[\overline x]}
\end{aligned}
$$

## 期待値と標準偏差の計算

標本平均の期待値<tex>$\mathbb E[\overline x]$</tex>を計算する．

$$
\begin{aligned}
    \mathbb E[\overline x]
    &= \langle \overline x \rangle \\
    &= \left\langle \frac{1}{N} \sum_{i=1}^N x_i \right\rangle \\
    &= \frac{1}{N} \sum_{i=1}^N \langle x \rangle \\
    &= \langle x \rangle \\
    &= \mathbb E[x]
\end{aligned}
$$

続いて標本平均の分散<tex>$\mathbb V[\overline x]$</tex>を計算する．

$$
\begin{aligned}
    \mathbb V[\overline x]
    &= \underbrace{\langle \overline x^2 \rangle}_{(1)} - \underbrace{\langle \overline x \rangle^2}_{(2)}
    \\
    & \quad \left\| \quad \begin{aligned}
        (1)
        &= \left\langle
            \frac{1}{N} \sum_{i=1}^N x_i \times
            \frac{1}{N} \sum_{j=1}^N x_j
        \right\rangle
        \\
        &= \frac{1}{N^2} \sum_{i = j} \langle x_i x_j \rangle + \frac{1}{N^2} \sum_{i \ne j} \langle x_i \rangle \langle x_j \rangle
        \\
        &= \frac{1}{N} \langle x^2 \rangle + \frac{N-1}{N} \langle x \rangle^2,
        \\
        (2)
        &= \langle x \rangle^2
    \end{aligned} \right.
    \\
    &= \frac{1}{N} \langle x^2 \rangle + \frac{N-1}{N} \langle x \rangle^2 - \langle x \rangle^2
    \\
    &= \frac{1}{N} \left( \langle x^2 \rangle - \langle x \rangle^2 \right)
    \\
    &= \frac{1}{N} \mathbb V[x]
\end{aligned}
$$

よって次のことがいえる．

$$
\begin{aligned}
    \mu_{\overline x} &= \mathbb E[x]\\
    \sigma_{\overline x} &= \sqrt\frac{\mathbb V[x]}{N}
\end{aligned}
$$

## まとめ

以上のことを用いれば，標本平均<tex>$\overline x$</tex>について

$$
    \overline x \underset{68\%}\sim \mathbb E[x] \pm \sqrt\frac{\mathbb V[x]}{N}
$$

がいえる．
