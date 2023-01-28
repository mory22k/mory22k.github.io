---
layout: post
title: "[回帰6] 線形回帰モデルと正規事前分布"
categories: note
description: 多変量正規分布を事前分布とした場合の線形回帰モデルの事後分布を概説します．
tags:
- regression
katex: true
---

線形回帰モデルに対して，MAP推定ではなく，事後分布を計算することによるパラメータの推定を考える．

- 前回: [MAP推定とL1正則化](/2023/01/19)

## 線形回帰モデル

ガウスノイズを仮定した線形回帰モデルの尤度関数を以下に記しておく．

$$
    p(\bm y | \bm X, \bm w) = \prod_{i=1}^{d} \mathcal N(y_i | \bm x_i^\mathsf{T} \bm w, \sigma^2)
$$

## 多変量正規分布

**多変量正規分布 (multivariate normal distribution)** と呼ばれる同時確率分布を導入する．確率密度関数は次式で与えられる．

$$
    \mathcal N_d(\bm x | \bm m, \bm V)
    = \sqrt\frac{1}{(2\pi)^d \det \bm V} \exp \left( -\frac{1}{2} (\bm x - \bm m)^\mathsf{T} V^{-1} (\bm x - \bm m) \right)
$$

パラメータ<tex>$\bm m$</tex>は平均ベクトルと呼ばれる<tex>$d$</tex>次元ベクトルで，<tex>$\bm V$</tex>は共分散行列と呼ばれる<tex>$d \times d$</tex>半正定値行列である．<tex>$\bm V$</tex>の<tex>$(i,j)$</tex>要素は<tex>$x_i$</tex>と<tex>$x_j$</tex>の共分散を表す．

$$
\begin{gathered}
\begin{gathered}
    \bm x &\in& \mathbb R^{d} \\
    \bm m &\in& \mathbb R^{d} \\
    \bm V &\in& \mathbb R^{d \times d} \\
\end{gathered} \\
    {}^\forall \bm x \in \mathbb R^d, \bm x^\mathsf{T} \bm V \bm x \ge 0
\end{gathered}
$$

もしも共分散行列が<tex>$\bm V = \sigma^2 \bm I_d$</tex>ならば，次のことが成り立つ．

$$
\begin{aligned}
    \mathcal N_d(\bm x | \bm m, \sigma^2 \bm I)
    &=
    \sqrt \frac{1}{(2\pi)^d \det (\sigma^2 \bm I_d)} \exp \left( -\frac{1}{2} (\bm x - \bm m)^\mathsf{T} (\sigma^2 \bm I)^{-1} (\bm x - \bm m) \right)
    \\
    &=
    \sqrt \frac{1}{(2\pi\sigma^2)^d} \exp \left( -\frac{1}{2 \sigma^2} \|\bm x - \bm m\|_2^2 \right) \\
    &=
    \prod_{i=1}^{d}
    \sqrt \frac{1}{2\pi \sigma^2} \exp \left( -\frac{1}{2\sigma^2} (x_i - m_i) \right) \\
    &=
    \prod_{i=1}^{d} \mathcal N(x_i | m_i, \sigma^2)
\end{aligned}
$$

このことを用いれば，線形回帰モデルの尤度関数は次のようにも表現できる．

$$
\begin{aligned}
    p(\bm y | \bm X, \bm w)
    &= \prod_{i=1}^{d} \mathcal N(y_i | \bm x_i^\mathsf{T} \bm w, \sigma^2) \\
    &= \mathcal N_d(\bm y | \bm X \bm w, \sigma^2 \bm I_d)
\end{aligned}
$$

## 事後分布の計算

事前分布として多変量正規分布を仮定する．

$$
\begin{aligned}
    p(\bm w)
    &= \mathcal N_n(\bm w | \bm 0, \bm V_{0}) \\
    &= \sqrt \frac{1}{(2\pi)^n \det \bm V_{0}} \exp \left( -\frac{1}{2} \bm w^\mathsf{T} \bm V_{0}^{-1} \bm w \right) \\
    &\propto
    \exp \left( -\frac{1}{2} \bm w^\mathsf{T} \bm V_{0}^{-1} \bm w \right)
\end{aligned}
$$

### ベイズの定理による計算

まずベイズの定理を適用して事後分布を探っていく．

$$
\begin{aligned}
    p(\bm w | \bm X, \bm y)
    &\propto
    p(\bm y | \bm X, \bm w) p(\bm w)\\
    &=
    \prod_{i=1}^d \mathcal N(y_i | \bm x_i^\mathsf{T} \bm w, \sigma^2)
    \mathcal N_n(\bm w | \bm 0, \bm V_{0}) \\
    &\propto
    \prod_{i=1}^d \exp \left( -\frac{1}{2\sigma^2} (y_i - \bm x_i^\mathsf{T} \bm w)^2 \right)
    \exp \left( -\frac{1}{2} \bm w^\mathsf{T} \bm V_{0}^{-1} \bm w \right) \\
    &=
    \exp \left( -\frac{1}{2\sigma^2} \|\bm y - \bm X \bm w\|_2^2 \right)
    \exp \left( -\frac{1}{2} \bm w^\mathsf{T} \bm V_{0}^{-1} \bm w \right) \\
    &=
    \exp \left(
        - \frac{1}{2} \left(
        \frac{1}{\sigma^2} \|\bm y - \bm X \bm w\|_2^2
        + \bm w^\mathsf{T} \bm V_{0}^{-1} \bm w
    \right)
    \right)
\end{aligned}
$$

### 平方完成

最後の行の指数関数の中をさらに平方完成させる．<tex>$\bm w$</tex>について整理する．

$$
\begin{aligned}
    &
    \frac{1}{\sigma^2} \|\bm y - \bm X \bm w\|_2^2
    + \bm w^\mathsf{T} \bm V_{0}^{-1} \bm w
    \\
    &=
    \frac{1}{\sigma^2} (\bm X \bm w - \bm y)^\mathsf{T} (\bm X \bm w - \bm y)
    + \bm w^\mathsf{T} \bm V_{0}^{-1} \bm w
    \\
    &=
    \frac{1}{\sigma^2} \left(
        \bm w^\mathsf{T} \bm X^\mathsf{T} \bm X \bm w
        - 2 \bm y^\mathsf{T} \bm X \bm w
        + \bm y^\mathsf{T} \bm y
    \right)
    + \bm w^\mathsf{T} \bm V_{0}^{-1} \bm w
    \\
    &=
    \bm w^\mathsf{T} \left( \frac{1}{\sigma^2} \bm X^\mathsf{T} \bm X + \bm V_{0}^{-1} \right) \bm w
    - 2 \bm y^\mathsf{T} \bm X \bm w + \mathrm{const.}
\end{aligned}
$$

ここで<tex>$\bm w$</tex>を含まない項は定数項<tex>$\mathrm{const.}$</tex>としてまとめた．少々ごちゃついてきたが，

$$
    \bm V_{d}^{-1} \coloneqq \frac{1}{\sigma^2} \bm X^\mathsf{T} \bm X + \bm V_{0}^{-1}
$$

とおき直せば見通しがよくなる．ただし<tex>$\bm X^\mathsf{T} \bm X$</tex>および<tex>$\bm V_0$</tex>はともに対称行列であることから，<tex>$\bm V_{d}^\mathsf{T} = \bm V_{d}$</tex>であることに注意する．

$$
\begin{aligned}
    &
    \bm w^\mathsf{T} \left( \frac{1}{\sigma^2} \bm X^\mathsf{T} \bm X + \bm V_{0}^{-1} \right) \bm w
    - 2 \bm y^\mathsf{T} \bm X \bm w + \mathrm{const.}
    \\
    &=
    \bm w^\mathsf{T} \bm V_{d}^{-1} \bm w
    - 2 \bm y^\mathsf{T} \bm X \bm w + \mathrm{const.}
    \\
    &=
    ( \bm w - \bm V_{d} \bm X^\mathsf{T} \bm y )^\mathsf{T}
    \bm V_{d}^{-1}
    ( \bm w - \bm V_{d} \bm X^\mathsf{T} \bm y ) + \mathrm{const.}
\end{aligned}
$$

さらに

$$
    \bm m_{d} \coloneqq \bm V_{d} \bm X^\mathsf{T} \bm y
$$

とおき直せば，次のようにシンプルな二次形式に帰着する．

$$
\begin{aligned}
    &
    ( \bm w - \bm V_{d} \bm X^\mathsf{T} \bm y )^\mathsf{T}
    \bm V_{d}^{-1}
    ( \bm w - \bm V_{d} \bm X^\mathsf{T} \bm y ) + \mathrm{const.}
    \\
    &=
    ( \bm w - \bm m_{d} )^\mathsf{T}
    \bm V_{d}^{-1}
    ( \bm w - \bm m_{d} ) + \mathrm{const.}
\end{aligned}
$$

### 事後分布計算まとめ

以上のようにして次のように変形することができた．

$$
\begin{aligned}
    p(\bm w | \bm X, \bm y)
    &\propto
    \exp \left(
        -\frac{1}{2} ( \bm w - \bm m_{d} )^\mathsf{T} \bm V_{d}^{-1} ( \bm w - \bm m_{d} )
    \right)
\end{aligned}
$$

## 共役事前分布

計算された事後分布は多変量正規分布そのものである．

$$
\begin{gathered}
    & p(\bm w | \bm X, \bm y)
    = \mathcal N_d(\bm w | \bm m_{d}, \bm V_{d})
    \\
    \text{where} & \left\{ \begin{aligned}
        \bm m_{d} &\coloneqq \bm V_{d} \bm X^\mathsf{T} \bm y \\
        \bm V_{d}^{-1} &\coloneqq \frac{1}{\sigma^2} \bm X^\mathsf{T} \bm X + \bm V_{0}^{-1}
    \end{aligned} \right.
\end{gathered}
$$

事前分布は正規分布で，事後分布もまた正規分布である．このように，正規分布を尤度関数として採用し，事前分布として多変量正規分布を使用した場合，事後分布もまた多変量正規分布となる．

一般に，尤度関数<tex>$p(\mathcal D | w)$</tex>に対して事前分布<tex>$p(w)$</tex>と事後分布<tex>$p(w | \mathcal D)$</tex>が同じ形である場合，事前分布<tex>$p(w)$</tex>を尤度関数<tex>$p(\mathcal D \ w)$</tex>の**共役事前分布 (conjugate prior)** という．特に，尤度関数，事前分布，事後分布ともに同じ分布族 (family) に属す場合，**自然共役 (natural conjugate)** であるといわれる．

今回の場合は，**正規分布 (事前分布) は正規分布 (尤度関数) の自然共役事前分布である**という事実に由来する．

$$
\begin{darray}{ll||cc}
    && \text{distribution} & \text{family} \\ \hline
    p(w)              & \text{prior}      & \text{normal} & \text{exponential family} \\
    p(\mathcal D | w) & \text{likelihood} & \text{normal} & \text{exponential family} \\
    p(w | \mathcal D) & \text{posterior}  & \text{normal} & \text{exponential family}
\end{darray}
$$
