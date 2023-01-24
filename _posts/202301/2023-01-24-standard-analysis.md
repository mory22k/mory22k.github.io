---
layout: post
title: "平均と分散の推定"
categories: note
description: 得られたデータをエラーバーで表現するための統計量の基本的な扱い方について概説します．
tags: data_analysis
katex: true
---

実験で得たデータに対して誤差棒をつけるために平均と分散を推定する必要がある．その基本についてまとめておく．

## 状況設定

$$
    x_i \underset{\rm i.i.d.}{\sim} p(x)
$$

なる $N$ 個のデータ $\lbrace x_i \rbrace_{i=1}^N$ を用いて，期待値 $\mu_x$ を推定する．標本平均 $\overline x$ は

$$
    \overline x = \frac{1}{N} \sum_{i=1}^N x_i
$$

で与えられる．標本平均は「$N$ 個のデータを得る」という操作を行うたびに変動するので，何らかの確率分布 $\widetilde p(\overline x)$ からサンプルされているものと見なす．

$$
    \overline{x} \sim \widetilde{p} (\overline{x})
$$

## 平均の推定量

標本平均 $\overline x$ の期待値 $\langle \overline x \rangle$ を計算する．

$$
\begin{aligned}
    \langle \overline x \rangle
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

以上の計算から $\mu_x$ の推定量として $\overline x$ を用いればよいことがわかった．

$$
    \mu_x \simeq \overline x
$$

## 分散の推定量

標本分散 $s^2$ の期待値 $\langle s^2 \rangle$ を計算する．

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

よって $\sigma_x^2$ の推定量として $s^2_x$ に $N / (N - 1)$ を掛けたものを使用すればよいことがわかった．

$$
    \sigma_x^2 \simeq \frac{N}{N-1} s_x^2
$$

## エラーバーへの応用

期待値 $\mu_x$ の68％信頼区間は

$$
    \overline x \pm \sigma_{\overline x}
$$

で与えられる．これをエラーバーで表現したい．そのためには $\sigma_{\overline x}$ の計算が必要である．

確率分布 $\widetilde p(\overline x)$ の分散 $\sigma^2_{\overline x}$ を計算する．

$$
\begin{aligned}
    \sigma^2_{\overline x}
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
    \sum_{i=1}^N \sum_{j=1}^N \langle x_i x_j \rangle
    -
    \frac{1}{N^2}
    \sum_{i=1}^N \sum_{j=1}^N
    \langle x_i \rangle \langle x_j \rangle
    \\
    & \quad \left\| \quad \begin{aligned}
        \sum_{i=1}^N \sum_{j=1}^N \langle x_i x_j \rangle
        &=
        \sum_{i = j} \langle x_i x_j \rangle +
        \sum_{i \ne j} \langle x_i \rangle \langle x_j \rangle \\
        &=
        N \langle x^2 \rangle + N (N-1) \langle x \rangle^2,
        \\
        \sum_{i=1}^N \sum_{j=1}^N
        \langle x_i \rangle \langle x_j \rangle
        &=
        N^2 \langle x \rangle^2
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

これと $\sigma_x^2$ の推定量の式を用いれば

$$
\begin{aligned}
    \sigma_{\overline x}^2
    &= \frac{1}{N} \sigma_x^2 \\
    &= \frac{1}{N} \frac{N}{N-1} \langle s_x^2 \rangle \\
    &= \frac{1}{N-1} \langle s_x^2 \rangle
\end{aligned}
$$

が得られる．したがって $\sigma_{\overline x}^2$ の推定量には $s_x^2$ を $N-1$ で割ったものを利用すればよい．

$$
    \sigma_{\overline x}^2 \simeq \frac{1}{N-1} s_x^2
$$

両辺の平方根をとれば標準偏差の推定量が得られる．

$$
    \sigma_{\overline x} \simeq \sqrt\frac{1}{N-1} s_x
$$

ということで，68％信頼区間をエラーバーとして表示したい場合は，次式の区間を採用すればよい．

$$
    \overline x \pm \sqrt\frac{1}{N-1} s_x
$$
