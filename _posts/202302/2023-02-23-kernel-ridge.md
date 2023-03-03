---
layout: post
title: "カーネルリッジ回帰"
categories: note
description: カーネル法を用いてリッジ回帰を行なう．
tags:
- regression
- kernel method
katex: true
---

カーネル法を用いてリッジ回帰を行なう．

{% include contents/regression.md %}

## カーネルリッジ回帰

カーネル法を用いた場合の尤度関数は次のように書ける．

$$
\begin{aligned}
    p(\bm y | \bm \Phi, \bm u)
    &= \mathcal N_d (\bm y | \bm K \bm u, \sigma^2 \bm I_d) \\
\end{aligned}
$$

回帰問題についてカーネル法を論じる場合，Ridge回帰を取り上げて導入することが多いようなので，ここでもそれに倣ってRidge回帰を見ていく．

まず事前分布に独立正規分布を仮定する．

$$
    p(\bm w) = \mathcal N_p (\bm w | \bm 0, s^2 \bm I_d)
$$

ここで<tex>$\bm w = \bm \Phi^\mathsf{T} \bm u$</tex>を用いると次のようになる．

$$
\begin{aligned}
    p(\bm w)
    ={}&
    \mathcal N_p (\bm w | \bm 0, s^2 \bm I_d) \\
    \propto{}&
    \exp \left( - \frac{1}{2s^2} \| \bm w \|_2^2 \right) \\
    ={}&
    \exp \left( - \frac{1}{2s^2} \| \bm \Phi^\mathsf{T} \bm u \|_2^2 \right) \\
    ={}&
    \exp \left( - \frac{1}{2s^2} \bm u^\mathsf{T} \bm \Phi \bm \Phi^\mathsf{T} \bm u \right) \\
    ={}&
    \exp \left( - \frac{1}{2s^2} \bm u^\mathsf{T} \bm K \bm u \right) \\
    \propto{}&
    \mathcal N_d (\bm u | \bm 0, s^2 \bm K^{-1})
\end{aligned}
$$

$$
    \text{i.e.} \quad p(\bm u) = \mathcal N_d (\bm u | \bm 0, s^2 \bm K^{-1})
$$

## 事後分布の計算

ベイズの定理を用いて事後分布を計算する．ここで<tex>$\bm K^\mathsf{T} = \bm K$</tex>であることに注意しよう．

$$
\begin{aligned}
    p(\bm u | \bm \Phi, \bm y)
    \propto{}& 
    p(\bm y | \bm \Phi, \bm u) p(\bm u) \\
    ={}&
    \mathcal N_d (\bm y | \bm K \bm u, \sigma^2 \bm I_d)
    \mathcal N_d (\bm u | \bm 0, s^2 \bm K^{-1}) \\
    \propto{}&
    \exp \left( - \frac{1}{2 \sigma^2} \| \bm y - \bm K \bm u \|_2^2 \right)
    \exp \left( - \frac{1}{2 s^2} \bm u^\mathsf{T} \bm K \bm u \right) \\
    ={}&
    \exp \left( - \frac{1}{2} \underbrace{\left(
        \frac{1}{\sigma^2} \| \bm y - \bm K \bm u \|_2^2 + \frac{1}{s^2} \bm u^\mathsf{T} \bm K \bm u
    \right)}_{(1)}\right)
\end{aligned}
$$

$$
\left| \quad \begin{aligned}
    (1)
    ={}&
    \frac{1}{\sigma^2} \| \bm y - \bm K \bm u \|_2^2 + \frac{1}{s^2} \bm u^\mathsf{T} \bm K \bm u \\
    ={}&
    \frac{1}{\sigma^2} \left(
        \bm u^\mathsf{T} \bm K \bm K \bm u
        + \underbrace{ \frac{\sigma^2}{s^2} }_{\lambda} \bm u^\mathsf{T} \bm K \bm u
        - 2 \bm u^\mathsf{T} \bm K \bm y
    \right) + \mathrm{const.} \\
    ={}&
    \frac{1}{\sigma^2} \left(
        \bm u^\mathsf{T} \bm K (\bm K + \lambda \bm I_d) \bm u
        - 2 \bm u^\mathsf{T} \bm K \bm y
    \right) + \mathrm{const.} \\
    ={}&
    \left( \bm u - \underbrace{ (\bm K + \lambda \bm I_d)^{-1} \bm y }_{\bm m_d} \right)^\mathsf{T}
    \underbrace{ \frac{1}{\sigma^2} \bm K (\bm K + \lambda \bm I_d) }_{ \bm V_d^{-1} }
    \left( \bm u - \underbrace{ (\bm K + \lambda \bm I_d)^{-1} \bm y }_{\bm m_d} \right) + \mathrm{const.} \\
    ={}&
    (\bm u - \bm m_d)^\mathsf{T} \bm V_d^{-1} (\bm u - \bm m_d) + \mathrm{const.}
\end{aligned}\right.
$$

$$
\begin{aligned}
    \therefore
    \quad p(\bm u | \bm \Phi, \bm y)
    \propto{}&
    \exp \left( - \frac{1}{2} \underbrace{\left(
        \frac{1}{\sigma^2} \| \bm y - \bm K \bm u \|_2^2 + \frac{1}{s^2} \bm u^\mathsf{T} \bm K \bm u
    \right)}_{(1)}\right) \\
    \propto{}& \exp \left( -\frac{1}{2} (\bm u - \bm m_d)^\mathsf{T} \bm V_d^{-1} (\bm u - \bm m_d) \right)
    \\
    \propto{}& \mathcal N_d (\bm u | \bm m_d, \bm V_d)
\end{aligned}
$$

よって，事後分布は次のようになる．

$$
    p(\bm u | \bm \Phi, \bm y) = \mathcal N_d (\bm u | \bm m_d, \bm V_d)
$$

$$
    \left\lbrace\begin{aligned}
        \bm m_d &= (\bm K + \lambda \bm I_d)^{-1} \bm y \\
        \bm V_d^{-1} &= \frac{1}{\sigma^2} \bm K (\bm K + \lambda \bm I_d)
    \end{aligned}\right.
$$

## MAP推定

これにより<tex>$\bm u$</tex>のMAP推定量は次のようになる．

$$
\begin{aligned}
    \widehat{\bm u}
    &= (\bm K + \lambda \bm I_d)^{-1} \bm y
\end{aligned}
$$