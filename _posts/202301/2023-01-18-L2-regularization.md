---
layout: post
title: "線形モデルのRidge回帰"
categories: note
description: MAP推定とL2正則化の関係を概説します．
tags:
- regression
katex: true
---

事前分布に独立な正規分布を仮定してMAP推定を行なうと，L2正則化の効果が出現する．

{% include contents/regression.md %}

## 過学習

線形回帰モデル

$$
    p(\bm y | \bm X, \bm w)
    = \mathcal N_d(\bm y | \bm X \bm w, \sigma^2 \bm I_d)
$$

に対する<tex>$\bm w$</tex>の最尤推定量は

$$
\begin{aligned}
    \widehat{\bm w}
    = (\bm X^\mathsf{T} \bm X)^{-1} \bm X^\mathsf{T} \bm y
\end{aligned}
$$

で与えられる．このとき，与えられたデータが少なすぎたり，あまりにも偏った値が集められている場合に最尤推定を行なうと，その偏った値にモデルが吸い寄せられて，本来の入出力関係をうまく表現できなくなることがある．これを**過学習 (overfitting; 過剰適合)** という．

$$
\text{データが少ない / 偏っている} \implies \text{overfitting}
$$

数式の上では，過学習は「逆行列<tex>$(\bm X^\mathsf{T} \bm X)^{-1}$</tex>の計算が不安定になる」という形で出現する．特に，極端にデータがスッカスカの場合，行列<tex>$\bm X^\mathsf{T} \bm X$</tex>に逆行列が存在しないような状況も発生しうる．

$$
\begin{aligned}
    \hat {\bm w}
    &= \underbrace{(\bm X^\mathsf{T} \bm X)^{-1}}_{\text{unstable}} \bm X^\mathsf{T} \bm y
\end{aligned}
$$

このような問題の対処方法の1つは，事前分布<tex>$p(\bm w)$</tex>として定数ではなく何らかの意味を持つ確率分布を仮定してMAP推定を行なうことである．

## 独立正規事前分布を仮定した場合の事後分布

パラメータ<tex>$\bm w$</tex>の事前分布として，次のような独立な正規分布を考える．

$$
\begin{aligned}
    p(\bm w)
    &= \mathcal N_n (\bm w | \bm 0, \tau^2 \bm I_n)
\end{aligned}
$$

ベイズの定理により事後分布を計算してみる．

$$
\begin{aligned}
    & p(\bm w | \bm X, \bm y) \\
    \propto{}& p(\bm y | \bm X, \bm w) p(\bm w) \\
    ={}&
    \mathcal N_d (\bm y | \bm X \bm w, \sigma^2 \bm I_d)
    \mathcal N_n (\bm w | \bm 0, \tau^2 \bm I_n) \\
    \propto{}&
    \exp \left( -\frac{1}{2\sigma^2} \| \bm y - \bm X \bm w \|_2^2 \right)
    \exp \left( -\frac{1}{2\tau^2} \| \bm w \|_2^2 \right) \\
    ={}&
    \exp \left( -\frac{1}{2} \underbrace{\left(
        \frac{1}{\sigma^2} \| \bm y - \bm X \bm w \|_2^2
        + \frac{1}{\tau^2} \| \bm w \|_2^2
    \right)}_{(1)} \right) \\
\end{aligned}
$$

$$
\left|\quad
\begin{aligned}
    (1)
    ={}& \frac{1}{\sigma^2} \| \bm y - \bm X \bm w \|_2^2 + \frac{1}{\tau^2} \| \bm w \|_2^2 \\
    ={}& 
    \frac{1}{\sigma^2} \left(
        \bm w^\mathsf{T} \bm X^\mathsf{T} \bm X \bm w
        + \underbrace{\frac{\sigma^2}{\tau^2}}_{\lambda} \bm w^\mathsf{T} \bm w
        - 2 \bm w^\mathsf{T} \bm X^\mathsf{T} \bm y
    \right) + \mathrm{const.} \\
    ={}& 
    \frac{1}{\sigma^2} \left(
        \bm w^\mathsf{T} (\bm X^\mathsf{T} \bm X + \lambda \bm I_n) \bm w
        - 2 \bm w^\mathsf{T} \bm X^\mathsf{T} \bm y
    \right) + \mathrm{const.} \\
    ={}&
    \left( \bm w - \underbrace{(\bm X^\mathsf{T} \bm X + \lambda \bm I_n)^{-1} \bm X^\mathsf{T} \bm y}_{\bm m_d} \right)^\mathsf{T} \\&\quad
    \underbrace{\frac{1}{\sigma^2} (\bm X^\mathsf{T} \bm X + \lambda \bm I_n)}_{\bm V_d^{-1}} \\&\qquad
    \left( \bm w - \underbrace{(\bm X^\mathsf{T} \bm X + \lambda \bm I_n)^{-1} \bm X^\mathsf{T} \bm y}_{\bm m_d} \right) + \mathrm{const.} \\
    ={}&
    (\bm w - \bm m_d)^\mathsf{T} \bm V_d^{-1} (\bm w - \bm m_d) + \mathrm{const.}
\end{aligned}
\right.
$$

$$
\begin{aligned}
    \therefore
    \quad p(\bm w | \bm X, \bm w)
    \propto{}&
    \exp \left( -\frac{1}{2} \underbrace{\left(
        \frac{1}{\sigma^2} \| \bm y - \bm X \bm w \|_2^2
        + \frac{1}{\tau^2} \| \bm w \|_2^2
    \right)}_{(1)} \right) \\
    \propto{}& \exp \left( -\frac{1}{2} (\bm w - \bm m_d)^\mathsf{T} \bm V_d^{-1} (\bm w - \bm m_d) \right)
    \\
    \propto{}& \mathcal N_n (\bm w | \bm m_d, \bm V_d)
\end{aligned}
$$

よって，事後分布は次のようになる．

$$
    p(\bm w | \bm X, \bm y) \propto \mathcal N_n(\bm w | \bm m_d, \bm V_d)
$$

$$
    \left\lbrace\begin{aligned}
        \bm m_d &= (\bm X^\mathsf{T} \bm X + \lambda \bm I_n)^{-1} \bm X^\mathsf{T} \bm y \\
        \bm V_d^{-1} &= \frac{1}{\sigma^2} (\bm X^\mathsf{T} \bm X + \lambda \bm I_n)
    \end{aligned}\right.
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

最小二乗法による推定とRidge回帰による推定を比較すると，Ridge回帰は最小二乗法において行列<tex>$\bm X^\mathsf{T} \bm X$</tex>の対角項に定数<tex>$\lambda$</tex>が加算された形となっていることがわかる．

$$
\begin{darray}{ccl}
    p(\bm w | \bm X, \bm y) \propto \mathcal N_n(\bm w | \bm m_d, \bm V_d)
    ,&&
    \left\lbrace\begin{aligned}
        \bm m_d &= (\bm X^\mathsf{T} \bm X)^{-1} \bm X^\mathsf{T} \bm y \\
        \bm V_d^{-1} &= \frac{1}{\sigma^2} \bm X^\mathsf{T} \bm X
    \end{aligned}\right.
    \\ \\
    &\downarrow&
    \\ \\
    p(\bm w | \bm X, \bm y) \propto \mathcal N_n(\bm w | \bm m_d, \bm V_d)
    ,&&
    \left\lbrace\begin{aligned}
        \bm m_d &= (\bm X^\mathsf{T} \bm X + \lambda \bm I_n)^{-1} \bm X^\mathsf{T} \bm y \\
        \bm V_d^{-1} &= \frac{1}{\sigma^2} (\bm X^\mathsf{T} \bm X + \lambda \bm I_n)
    \end{aligned}\right.
\end{darray}
$$

これによって次の2つの効果が期待できる．

1. 行列<tex>$\bm X^\mathsf{T} \bm X$</tex>が逆行列をもたない行列 (**特異行列; singular matrix**) である場合に，逆行列をもつ行列 (**正則行列; regular matrix**) に変換する
2. 逆行列<tex>$(\bm X^\mathsf{T} \bm X)^{-1}$</tex>の各要素の値が極端に大きくなることを防ぐ

すなわち，<tex>$\bm X^\mathsf{T} \bm X$</tex>の**逆行列計算を安定化させる**という効果が期待できるのである．

$$
\begin{aligned}
    &\text{ML}:&
    \bm m_d
    &= \underbrace{(\bm X^\mathsf{T} \bm X)^{-1}}_{\text{unstable}} \bm X^\mathsf{T} \bm y \\
    &\text{MAP}:&
    \bm m_d
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
