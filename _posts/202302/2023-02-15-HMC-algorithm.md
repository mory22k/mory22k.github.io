---
layout: post
title: "[MCMC6] ハミルトニアン・モンテカルロ法"
categories: note
description: 分子動力学法を用いたMH法であるハミルトニアン・モンテカルロ法を導入する．
tags: MCMC Monde_Carlo_method
katex: true
---

分子動力学法を用いたMH法であるハミルトニアン・モンテカルロ法を導入する．

{% include contents/mcmc.md %}

## 「ハミルトニアン」を用いたM-H法

ハミルトニアン・モンテカルロ法は，M-H法の1つ．ギブスサンプリングと同様に提案分布<tex>$Q(\bm y | \bm x)$</tex>を工夫したものであるが，こちらは提案分布が必ず1になるものではなく，できるだけ1に近づけるようなダイナミクスを用いている．その工夫が「<tex>$\bm y \sim Q(\bm y | \bm x)$</tex>という操作に分子動力学法による時間発展を加える」というものであり，「エネルギー保存則」を近似的に利用することで提案分布を1に近づけている．

…という説明をされると難しそうに聞こえるが，1つ1つ読み解いていけばそれほどややこしいアルゴリズムではないとわかるはずだ．

## 導出

確率分布<tex>$P(\bm x)$</tex>が以下の形をしているとする．

$$
    P(\bm x) = \frac{1}{Z} \exp(-S(\bm x))
$$

ここで<tex>$S(\bm x)$</tex>は「作用」と呼ばれる関数である．ここに「共役運動量」と呼ばれる新たな変数<tex>$\bm p$</tex>を導入し，次のようなハミルトニアンを定義する．

$$
    {\cal H}(\bm x, \bm p) \coloneqq S(\bm x) + \frac{1}{2} \|\bm p\|_2^2
$$

ただし共役運動量<tex>$\bm p$</tex>は多変量標準正規分布からサンプルされたものとする．

$$
    \bm p \sim {\cal N}_N (\bm p | \bm 0, \bm I)
$$

このハミルトニアンを「分子動力学法」と呼ばれるアルゴリズムにより時間発展させ，時間発展後の<tex>$\bm x$</tex>を，提案<tex>$\bm y$</tex>として扱うことにする．

$$
    {\cal H} (\bm x, \bm p) \to {\cal H} (\bm y, \bm q)
$$

## 分子動力学法の条件

分子動力学法による時間発展<tex>${\cal H}(\bm x, \bm p) \to {\cal H} (\bm y, \bm q)$</tex>に伴う変化およびその出力を次のように表すことにする．

$$
\begin{alignedat}2
    (\bm y, \bm q) &\gets&& \operatorname{MD}(\bm x, \bm p) \\
    (\bm y, \bm q) &=&& \operatorname{MD}(\bm x, \bm p)
\end{alignedat}
$$

「分子動力学法」の具体的なアルゴリズムはここには書かないが，以下の2つの要件は重要なので記しておく．

1. 共役運動量<tex>$\bm p$</tex>を逆向きにすることで，逆向きの時間発展が可能でなくてはならない:

    $$
        \begin{aligned}
        (\bm y, \bm q) &= \operatorname{MD}(\bm x, \bm p) \\
        (\bm x, -\bm p) &= \operatorname{MD}(\bm y, -\bm q)
        \end{aligned}
    $$

2. 時間発展前後におけるハミルトニアンの差分<tex>$\Delta {\cal H} = {\cal H}(\bm y, \bm q) - {\cal H}(\bm x, \bm p)$</tex>はできるだけ小さいほうが好ましい:

    $$
        | \Delta \cal H | \ll 1
    $$

## 受理確率はハミルトニアンの差分の関数になる

以上の提案アルゴリズムは，提案分布を次のように設定することに相当する．

$$
\begin{aligned}
    Q(\bm y | \bm x) &\coloneqq
    \left\{\begin{aligned}
        & {\cal N}_N (\bm p | \bm 0, \bm I)
        && \text{if } (\bm y, \bm q) = \operatorname{MD}(\bm x, \bm p) \\
        & 0
        && \text{otherwise}
    \end{aligned}\right. \\
    Q(\bm x | \bm y) &\coloneqq
    \left\{\begin{aligned}
        & {\cal N}_N (-\bm q | \bm 0, \bm I)
        && \text{if } (\bm x, -\bm p) = \operatorname{MD}(\bm y, -\bm q) \\
        & 0
        && \text{otherwise}
    \end{aligned}\right.
\end{aligned}
$$

これを用いて受理確率を計算すると，この関数はハミルトニアンの差分<tex>$\Delta {\cal H} = {\cal H}(\bm y, \bm q) - {\cal H}(\bm x, \bm p)$</tex>の関数になる．

$$
\begin{aligned}
    A(\bm y | \bm x)
    &= \frac{ P(\bm y) Q(\bm x | \bm y) }{ P(\bm x) Q(\bm y | \bm x) } \\
    &\qquad\left\|\quad\begin{aligned}
        Q(\bm y | \bm x) &= {\cal N}_N (\bm p | \bm 0, \bm I) = \sqrt\frac{1}{(2\pi)^N} \exp \left( -\frac{1}{2} \|\bm p\|_2^2 \right) \\
        Q(\bm x | \bm y) &= {\cal N}_N (-\bm q | \bm 0, \bm I) = \sqrt\frac{1}{(2\pi)^N} \exp \left( -\frac{1}{2} \|\bm q\|_2^2 \right) \\
    \end{aligned}\right. \\
    &= \frac{
            P(\bm y) \exp \left( -\dfrac{1}{2} \|\bm p\|_2^2 \right)
        }{
            P(\bm x) \exp \left( -\dfrac{1}{2} \|\bm q\|_2^2 \right)
        } \\
    &\qquad\left\|\quad\begin{aligned}
        P(\bm y) &= \frac{1}{Z_2} \exp(-S(\bm y)) \\
        P(\bm x) &= \frac{1}{Z_2} \exp(-S(\bm x)) \\
    \end{aligned}\right. \\
    &= \frac{
            \exp(-S(\bm y)) \exp \left( -\dfrac{1}{2} \|\bm p\|_2^2 \right)
        }{
            \exp(-S(\bm x)) \exp \left( -\dfrac{1}{2} \|\bm q\|_2^2 \right)
        } \\
    &= \frac{
            \exp\left(-S(\bm y) - \dfrac{1}{2} \|\bm p\|_2^2 \right)
        }{
            \exp\left(-S(\bm x) - \dfrac{1}{2} \|\bm q\|_2^2 \right)
        } \\
    &= \frac{ \exp(-{\cal H} (\bm y, \bm q)) }{ \exp(-{\cal H} (\bm x, \bm p)) } \\
    &= \exp( -({\cal H} (\bm y, \bm q) - {\cal H} (\bm x, \bm p)) ) \\
    &= \exp( -\Delta \cal H )
\end{aligned}
$$

差分<tex>$\Delta \cal H$</tex>が<tex>$0$</tex>に近いほど好ましいのは，そのほうが受理確率が<tex>$1$</tex>に近づくためである．

## アルゴリズム

以上の考察から，次のようなアルゴリズムを得る．

<tex>
$\quad
\begin{aligned}
    &1. && X \gets \{\} \\
    &2. && \text{for } t \in \{1, 2, \dots, n\} : \\
    &3. && \qquad \bm p \sim {\cal N}_N (\bm p | \bm 0, \bm I) \\
    &4. && \qquad (\bm y, \bm q) \gets \operatorname{MD}(\bm x, \bm p) \\
    &5. && \qquad \Delta {\cal H} \gets {\cal H} (\bm y, \bm q) - {\cal H} (\bm x, \bm p) \\
    &6. && \qquad r \sim {\cal U}(r | 0, 1) \\
    &7. && \qquad \text{if } \exp(-\Delta {\cal H}) \gt r: \\
    &8. && \qquad \qquad \bm x \gets \bm y \\
    &9. && \qquad X \gets X \cup \{ \bm x \} \\
    &10. && \text{return } X
\end{aligned}
$
</tex>

このようなM-H法の実装を特に**ハミルトニアン・モンテカルロ法 (the Hamiltonian Monte Carlo method; HMC法)** という．

## ちなみに

ハミルトニアン・モンテカルロ法 (HMC法) は**ハイブリッド・モンテカルロ法 (hybrid Monte Carlo; HMC)** と呼ばれることもある．
