---
layout: post
title: "線形モデルと正規事前分布"
categories: note
description: 多変量正規分布を事前分布とした場合の線形回帰モデルの事後分布を概説します．
tags:
- regression
katex: true
---

線形回帰モデルに対して，MAP推定ではなく，事後分布を計算することによるパラメータの推定を考える．

{% include contents/regression.md %}

## 多変量正規事前分布を仮定した場合の事後分布

正規分布に従うノイズを仮定した場合の線形回帰モデル

$$
\begin{aligned}
    p(\bm y | \bm X, \bm w)
    &= \mathcal N_d(\bm y | \bm X \bm w, \sigma^2 \bm I_d)
\end{aligned}
$$

に対し，パラメータ<tex>$\bm w$</tex>の事前分布として多変量正規分布を仮定する．

$$
\begin{aligned}
    p(\bm w)
    &= \mathcal N_n(\bm w | \bm 0, \bm V_0) \\
    &\propto
    \exp \left( -\frac{1}{2} \bm w^\mathsf{T} \bm V_0^{-1} \bm w \right)
\end{aligned}
$$

このときの事後分布を計算してみよう．

$$
\begin{aligned}
    p(\bm w | \bm X, \bm y)
    \propto{}&
    p(\bm y | \bm X, \bm w) p(\bm w)\\
    ={}&
    \mathcal N_d(\bm y | \bm X \bm w, \bm I_d)
    \mathcal N_n(\bm w | \bm 0, \bm V_0) \\
    \propto{}&
    \exp \left( -\frac{1}{2\sigma^2} \|\bm y - \bm X \bm w\|_2^2 \right)
    \exp \left( -\frac{1}{2} \bm w^\mathsf{T} \bm V_0^{-1} \bm w \right) \\
    ={}&
    \exp \left( - \frac{1}{2} \underbrace{\left(
        \frac{1}{\sigma^2} \|\bm y - \bm X \bm w\|_2^2 + \bm w^\mathsf{T} \bm V_0^{-1} \bm w
    \right)}_{(1)}
    \right)
\end{aligned}
$$

$$
\left|\quad
\begin{aligned}
    (1)
    ={}&
    \frac{1}{\sigma^2} \|\bm y - \bm X \bm w\|_2^2 + \bm w^\mathsf{T} \bm V_0^{-1} \bm w \\
    ={}&
    \frac{1}{\sigma^2} \left(
        \bm w^\mathsf{T} \bm X^\mathsf{T} \bm X \bm w
        + \bm w^\mathsf{T} \bm V_0^{-1} \bm w
        - 2 \bm w^\mathsf{T} \bm X^\mathsf{T} \bm y
    \right)
    + \mathrm{const.} \\
    ={}&
    \frac{1}{\sigma^2} \left(
        \bm w^\mathsf{T} (\bm X^\mathsf{T} \bm X + \bm V_0^{-1}) \bm w
        - 2 \bm w^\mathsf{T} \bm X^\mathsf{T} \bm y
    \right)
    + \mathrm{const.} \\
    ={}&
    \left( \bm w - \underbrace{(\bm X^\mathsf{T} \bm X + \bm V_0)^{-1} \bm X^\mathsf{T} \bm y}_{\bm m_d} \right)^\mathsf{T} \\&\quad
    \underbrace{\frac{1}{\sigma^2} (\bm X^\mathsf{T} \bm X + \bm V_0)}_{\bm V_d^{-1}} \\&\qquad
    \left( \bm w - \underbrace{(\bm X^\mathsf{T} \bm X + \bm V_0)^{-1} \bm X^\mathsf{T} \bm y}_{\bm m_d} \right) + \mathrm{const.} \\
    ={}&
    (\bm w - \bm m_d)^\mathsf{T} \bm V_d^{-1} (\bm w - \bm m_d) + \mathrm{const.}
\end{aligned}
\right.
$$

$$
\begin{aligned}
    \therefore
    \quad p(\bm w | \bm X, \bm y)
    \propto{}&
    \exp \left( - \frac{1}{2} \underbrace{\left(
        \frac{1}{\sigma^2} \|\bm y - \bm X \bm w\|_2^2 + \bm w^\mathsf{T} \bm V_0^{-1} \bm w
    \right)}_{(1)} \right) \\
    \propto{}&
    \exp \left( -\frac{1}{2} (\bm w - \bm m_d)^\mathsf{T} \bm V_d^{-1} (\bm w - \bm m_d) \right)
    \\
    \propto{}& \mathcal N_n (\bm w | \bm m_d, \bm V_d)
\end{aligned}
$$

よって，事後分布は次のようになる．

$$
    p(\bm w | \bm X, \bm y) = \mathcal N_n(\bm w | \bm m_d, \bm V_d)
$$

$$
    \left\lbrace\begin{aligned}
        \bm m_d &= (\bm X^\mathsf{T} \bm X + \bm V_0)^{-1} \bm X^\mathsf{T} \bm y \\
        \bm V_d^{-1} &= \frac{1}{\sigma^2} (\bm X^\mathsf{T} \bm X + \bm V_0)
    \end{aligned}\right.
$$

## 共役事前分布

このように，正規分布を尤度関数として採用し，事前分布として多変量正規分布を使用した場合，事後分布もまた多変量正規分布となる．

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
