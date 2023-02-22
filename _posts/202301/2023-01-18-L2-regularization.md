---
layout: post
title: "[回帰4] L2正則化"
categories: note
description: MAP推定とL2正則化の関係を概説します．
tags:
- regression
katex: true
---

事前分布に独立な正規分布を仮定してMAP推定を行なうと，L2正則化の効果が出現する．

{% include contents/regression.md %}

## 線形回帰モデルと最尤推定

ガウスノイズを仮定した線形回帰モデルの尤度関数

$$
    p(\bm y | \bm X, \bm w)
    = \prod_{i=1}^d \mathcal N (y_i | \bm x_i^\mathsf{T} \bm w, \sigma^2)
$$

に対する<tex>$\bm w$</tex>の最尤推定量は

$$
\begin{aligned}
    \hat{\bm w}
    &= \argmax_{\bm w} p(\bm y | \bm X, \bm w) \\
    &= \argmin_{\bm w} \frac{1}{2} \| \bm y - \bm X \bm w \|_2^2
\end{aligned}
$$

すなわち

$$
    \hat {\bm w} = (\bm X^\mathsf{T} \bm X)^{-1} \bm X^\mathsf{T} \bm y
$$

で与えられる．

## 過学習

与えられたデータが少なすぎたり，あまりにも偏った値が集められている場合に最尤推定を行なうと，その偏った値にモデルが吸い寄せられて，本来の入出力関係をうまく表現できなくなることがある．これを**過学習 (overfitting; 過剰適合)** という．

$$
\text{データが少ない / 偏っている} \implies \text{overfitting}
$$

数式の上では，過学習は「逆行列<tex>$(\bm X^\mathsf{T} \bm X)^{-1}$</tex>の計算が不安定になる」という形で出現する．

$$
\begin{aligned}
    \hat {\bm w}
    &= \underbrace{(\bm X^\mathsf{T} \bm X)^{-1}}_{\text{unstable}} \bm X^\mathsf{T} \bm y
\end{aligned}
$$

このような問題の対処方法の1つは，事前分布<tex>$p(\bm w)$</tex>として定数ではなく何らかの意味を持つ確率分布を仮定してMAP推定を行なうことである．

$$
\begin{aligned}
    &\text{MAP:}&
    \hat{\bm w}
    &= \argmax_{\bm w} p(\bm w | \bm X, \bm y)
    = \argmax_{\bm w} p(\bm y | \bm X, \bm w) p(\bm w)
    \\
    &\text{ML:}&
    \hat{\bm w}
    &= \argmax_{\bm w} p(\bm y | \bm X, \bm w)
\end{aligned}
$$

## 正規事前分布

パラメータ<tex>$\bm w$</tex>の事前分布として，次のような独立な正規分布を考える．

$$
\begin{aligned}
    p(\bm w)
    &= \prod_{j=1}^{n} \mathcal N (w_j | 0, s^2)
\end{aligned}
$$

すると事後分布はベイズの定理により

$$
\begin{aligned}
    p(\bm w | \bm X, \bm y)
    &= \frac{p(\bm y | \bm X, \bm w) p(\bm w)}{p(\bm y | \bm X)} \\
    &\propto
    p(\bm y | \bm X, \bm w) p(\bm w) \\
    &=
    \prod_{i=1}^d \mathcal N (y_i | f(\bm x), \sigma^2)
    \prod_{j=1}^{n} \mathcal N (w_j | 0, s^2)
\end{aligned}
$$

と計算できるので，MAP推定量は次式で与えられる．

$$
\begin{aligned}
    \hat{\bm w}
    &=
    \argmax_{\bm w} p(\bm w | \bm X, \bm y) \\
    &=
    \argmax_{\bm w}
    \prod_{i=1}^d \mathcal N (y_i | f(\bm x), \sigma^2)
    \prod_{j=1}^{n} \mathcal N (w_j | 0, s^2)
\end{aligned}
$$

## 対数事後確率

尤度関数と同様に，事後分布もまた指数関数となることが多いため，対数をとって考えることが多い．

$$
\begin{aligned}
    \log p(\bm w | \bm X, \bm y)
    &=
    \log \prod_{i=1}^d \mathcal N (y_i | f(\bm x), \sigma^2)
    + \log \prod_{j=1}^{n} \mathcal N (w_j | 0, s^2) \\
    &=
    \sum_{i=1}^d \log \mathcal N (y_i | f(\bm x), \sigma^2)
    + \sum_{j=1}^{n} \log \mathcal N (w_j | 0, s^2) \\
    &=
    - \frac{1}{2\sigma^2} \sum_{i=1}^{d} \left(y_i - \bm x_i^\mathsf{T} \bm w \right)^2
    - \frac{1}{2s^2} \sum_{j=1}^{n} w_j^2
    + \mathrm{const.}
    \\
    &=
    - \frac{1}{2\sigma^2} \|\bm y - \bm X \bm w\|_2^2
    - \frac{1}{2s^2} \| \bm w \|_2^2
    + \mathrm{const.}
\end{aligned}
$$

これにより，MAP推定量は次式で与えられる．

$$
\begin{aligned}
    \hat{\bm w}
    &=
    \argmax_{\bm w} \log p(\bm w | \bm X, \bm y) \\
    &=
    \argmin_{\bm w} \left(
        \frac{1}{2} \|\bm y - \bm X \bm w\|_2^2
        + \frac{1}{2} \lambda \| \bm w \|_2^2
    \right)
\end{aligned}
$$

ただし<tex>$\lambda \coloneqq \sigma^2 / s^2$</tex>である．

## 解析的な導出

$$
    \hat{\bm w}
    =
    \argmin_{\bm w} \left(
        \frac{1}{2} \|\bm y - \bm X \bm w\|_2^2
        + \frac{1}{2} \lambda \| \bm w \|_2^2
    \right)
$$

より，次式が成り立つ．

$$
    \frac{\partial}{\partial \bm w} \left[
        \frac{1}{2} \|\bm y - \bm X \bm w\|_2^2
        + \frac{1}{2} \lambda \| \bm w \|_2^2
    \right]_{\bm w = \hat{\bm w}}
    = \bm 0
$$


左辺は次のように計算される．

$$
\begin{aligned}
    &
    \frac{\partial}{\partial \bm w} \left[
        \frac{1}{2} \|\bm y - \bm X \bm w\|_2^2 + \frac{1}{2} \lambda \| \bm w \|_2^2
    \right]_{\bm w = \hat{\bm w}} \\
    &=
    \bm X^\mathsf{T} (\bm y - \bm X \bm w) + \lambda \hat{\bm w} \\
    &=
    \bm X^\mathsf{T} \bm y - (\bm X^\mathsf{T} \bm X + \lambda \bm I_n) \hat{\bm w}
\end{aligned}
$$

よってMAP推定量は次の方程式の解として与えられる．

$$
    \bm X^\mathsf{T} \bm y - (\bm X^\mathsf{T} \bm X + \lambda \bm I_n) \hat{\bm w} = \bm 0
$$

これを解くと次式が得られる．

$$
    \hat {\bm w}
    = (\bm X^\mathsf{T} \bm X + \lambda \bm I_n)^{-1} \bm X^\mathsf{T} \bm y
$$

## Ridge回帰

尤度関数として独立同分布な正規分布を仮定した最尤推定が最小二乗法と等価であったように，事前分布として独立同分布な正規分布を仮定したMAP推定は，次式で表される**Ridge回帰 (Ridge regression)** と等価になる．

$$
\begin{aligned}
    \hat {\bm w}
    &=
    \argmin_{\bm w} \left(
        \frac{1}{2} \| \bm y - \bm X \bm w \|_2^2 + \frac{1}{2} \lambda \| \bm w \|_2^2
    \right) \\
    &=
    \argmin_{\bm w} \left(
        \frac{1}{2} \sum_{i=1}^d \left( y_i - \bm w^\mathsf{T} \bm x_i \right) + \frac{1}{2} \lambda \| \bm w \|_2^2
    \right)
\end{aligned}
$$

以上のことは次のようなL2ノルム罰金項を含む最小化問題と等価になる．

$$
\begin{aligned}
    &\underset{\bm w}{\text{minimize}} && \sum_{i=1}^d \left( y_i - \bm w^\mathsf{T} \bm x_i \right) + \lambda \sum_{j=1}^n w_j^2
\end{aligned}
$$

## L2正則化

最尤推定量とMAP推定量を比較すると，MAP推定量は最尤推定量において行列<tex>$\bm X^\mathsf{T} \bm X$</tex>の対角項に定数<tex>$\lambda$</tex>が加算された形となっていることがわかる．これによって次の2つの効果が期待できる．

1. 行列<tex>$\bm X^\mathsf{T} \bm X$</tex>が逆行列をもたない行列 (**特異行列; singular matrix**) である場合に，逆行列をもつ行列 (**正則行列; regular matrix**) に変換する
2. 逆行列<tex>$(\bm X^\mathsf{T} \bm X)^{-1}$</tex>の各要素の値が極端に大きくなることを防ぐ

すなわち，<tex>$\bm X^\mathsf{T} \bm X$</tex>の**逆行列計算を安定化させる**という効果が期待できるのである．

$$
\begin{aligned}
    &\text{ML}:&
    \hat {\bm w}
    &= \underbrace{(\bm X^\mathsf{T} \bm X)^{-1}}_{\text{unstable}} \bm X^\mathsf{T} \bm y \\
    &\text{MAP}:&
    \hat {\bm w}
    &= \underbrace{(\bm X^\mathsf{T} \bm X + \lambda \bm I_n)^{-1}}_{\text{stable}} \bm X^\mathsf{T} \bm y \\
\end{aligned}
$$

特異行列を正則行列に変換するということを強調するために，リッジ回帰はしばしば**L2正則化**を伴う線形回帰などと呼ばれる．

## 一般のL2正則化

L2正則化は，事前分布として独立な正規分布を設定したことで，目的関数にL2ノルムの項が追加されたことに由来する．このことの類推から，一般に最適化問題において目的関数にL2ノルム罰金項を追加することを**L2正則化 (L2 regularization)** と呼ぶ．ただし<u>本来の意味である「特異行列を正則行列に変換する」という意味は失われているので注意</u>．

$$
\begin{aligned}
    &\underset{\bm w}{\text{minimize}} && f(\bm w)
    \\
    &&& \downarrow \text{regularization}
    \\
    &\underset{\bm w}{\text{minimize}} && f(\bm w) + \lambda \| \bm w \|_2^2
\end{aligned}
$$

線形回帰モデルの場合と同様に，L2正則化はデータが少ない場合に過学習を防ぐという効果を持つ．これは行列を正則行列化するという効果ではなく，<u>パラメータの値の二乗和が大きくなりすぎるのを防ぐ</u>という効果である．
