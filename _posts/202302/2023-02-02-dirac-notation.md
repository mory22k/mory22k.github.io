---
layout: post
title: "[量子情報1] ディラックの表記 (量子ビット)"
categories: note
description: 量子情報科学で用いられるディラックの記法を概説する．
tags: quantum
katex: true
---

量子情報科学で用いられるディラックの記法を概説する．

## 読み方

まず基本的な取り扱い方を確認する．

### 1. <tex>$| \psi \rangle$</tex>は列ベクトル，<tex>$\langle \psi |$</tex>は行ベクトル

記号<tex>$| \rangle$</tex>を**ケット (ket)** といい，<tex>$| \psi \rangle$</tex>を**ケットベクトル (ket vector)** という．ケットベクトルは列ベクトルを表す．

$$
    | \psi \rangle \coloneqq
    \left[\begin{darray}{}
        1+i \\
        \sqrt 2
    \end{darray}\right] \in \mathbb C^2
$$

このようなケットベクトル<tex>$| \psi \rangle$</tex>に対し，記号の向きを反対にした<tex>$\langle \psi |$</tex>はエルミート共役<tex>$| \psi \rangle^\dagger$</tex>を表す．

$$
    \langle \psi | \coloneqq
    \left[\begin{darray}{}
        1-i & \sqrt 2
    \end{darray}\right] \in \mathbb C^2
$$

### 2. <tex>$\langle \psi | \phi \rangle$</tex>は内積

2つのベクトル<tex>$| \psi \rangle$</tex>と<tex>$| \phi \rangle$</tex>に対し，<tex>$\langle \psi | \phi \rangle$</tex>は複素ユークリッド内積を表す．

$$
\begin{aligned}
    && | \psi \rangle &\coloneqq \left[\begin{darray}{} 1-i \\ \sqrt 2 \end{darray}\right] && \in \mathbb C^2, \\
    && | \phi \rangle &\coloneqq \left[\begin{darray}{} 3 \\ 4i \end{darray}\right] && \in \mathbb C^2 \\
\end{aligned}
$$

$$
\begin{aligned}
    \implies \quad \langle \psi | \phi \rangle
    &= \langle \psi | | \phi \rangle \\
    &= \left[\begin{darray}{} 1+i & \sqrt 2 \end{darray}\right] \left[\begin{darray}{} \sqrt 3 \\ 4i \end{darray}\right] \\
    &= (1 + i) \times \sqrt 3 + \sqrt 2 \times 4i \\
    &= \sqrt 3 + (4 \sqrt 2 + \sqrt 3)i
\end{aligned}
$$

## これからわかること

以上の読み方により，次のことがわかるようになる．

### 3. <tex>$\sqrt{\langle \psi | \phi \rangle}$</tex>はユークリッドノルム

行列<tex>$| \psi \rangle$</tex>に対して，自身のエルミート共役との内積は正の実数であり，その平方根はユークリッドノルムを表す．

$$
    | \psi \rangle \coloneqq \left[\begin{darray}{} c_1 \\ c_2 \\ \vdots \\ c_N \end{darray}\right] \in \mathbb C^N
$$

$$
\implies
\left\lbrace\begin{aligned}
    \langle \psi | \psi \rangle
    &= \sum_{i=1}^N c_i^\ast c_i
    \\
    \sqrt{\langle \psi | \psi \rangle}
    &= \sqrt{\sum_{i=1}^N c_i^\ast c_i} = \| \psi \|_2
\end{aligned}\right.
$$

### 4. <tex>$\left( | \phi \rangle \langle \psi | \right) | \xi \rangle = \left( \langle \psi | \xi \rangle \right) | \phi \rangle$</tex>

行ベクトル<tex>$\langle \psi |$</tex>に左から列ベクトル<tex>$| \phi \rangle$</tex>を掛けた<tex>$| \phi \rangle \langle \psi |$</tex>は行列となる．

$$
\begin{aligned}
    | \phi \rangle &\coloneqq \left[\begin{darray}{} a_1 \\ a_2 \\ \vdots \\ a_N \end{darray}\right] \\
    \langle \psi | &\coloneqq \left[\begin{darray}{} b_1 &  b_2 &  \cdots &  b_N \end{darray}\right] \\
\end{aligned}
$$

$$
\begin{aligned}
    \implies
    | \phi \rangle \langle \psi |
    &=
    \left[\begin{darray}{} a_1 \\ a_2 \\ \vdots \\ a_N \end{darray}\right]
    \left[\begin{darray}{} b_1 &  b_2 &  \cdots &  b_N \end{darray}\right]
    \\
    &=
    \left[\begin{darray}{}
        a_1b_1 & a_1b_2 & \cdots & a_1b_N \\
        a_2b_1 & a_2b_2 & \cdots & a_2b_N \\
        \vdots & \vdots & \ddots & \vdots \\
        a_Nb_1 & a_Nb_2 & \cdots & a_Nb_N
    \end{darray}\right]
    \\
\end{aligned}
$$

この行列<tex>$| \phi \rangle \langle \psi |$</tex>を列ベクトル<tex>$| \xi \rangle$</tex>に作用させると，列ベクトルになる．

$$
\begin{aligned}
    | \xi \rangle &\coloneqq \left[\begin{darray}{} c_1 \\ c_2 \\ \vdots \\ c_N \end{darray}\right] \\
\end{aligned}
$$

$$
\begin{aligned}
    \implies
    \left( | \phi \rangle \langle \psi | \right) | \xi \rangle
    &=
    \left[\begin{darray}{}
        a_1b_1 & a_1b_2 & \cdots & a_1b_N \\
        a_2b_1 & a_2b_2 & \cdots & a_2b_N \\
        \vdots & \vdots & \ddots & \vdots \\
        a_Nb_1 & a_Nb_2 & \cdots & a_Nb_N
    \end{darray}\right]
    \left[\begin{darray}{} c_1 \\ c_2 \\ \vdots \\ c_N \end{darray}\right] \\
    &=
    \left[\begin{darray}{}
        a_1 \sum_{i=1}^N b_i c_i \\
        a_2 \sum_{i=1}^N b_i c_i \\
        \vdots \\
        a_N \sum_{i=1}^N b_i c_i \\
    \end{darray}\right] \\
\end{aligned}
$$

行列の中で繰り返し生じる部分を抜き出し，さらに

$$
\begin{aligned}
    \sum_{i=1}^N b_i c_i &= \langle \psi | \xi \rangle, \\
    | \phi \rangle
    &=
    \left[\begin{darray}{}
        a_1 \\
        a_2 \\
        \vdots \\
        a_N \\
    \end{darray}\right]
\end{aligned}
$$

を用いれば，次のように書ける．

$$
\begin{aligned}
    \left[\begin{darray}{}
        a_1 \sum_{i=1}^N b_i c_i \\
        a_2 \sum_{i=1}^N b_i c_i \\
        \vdots \\
        a_N \sum_{i=1}^N b_i c_i \\
    \end{darray}\right]
    &=
    \sum_{i=1}^N b_i c_i
    \left[\begin{darray}{}
        a_1 \\
        a_2 \\
        \vdots \\
        a_N \\
    \end{darray}\right]
    = \langle \psi | \xi \rangle | \phi \rangle
\end{aligned}
$$

よって，次のことが確認できる．

$$
\underbrace{| \phi \rangle \langle \psi |}_{\text{matrix}} | \xi \rangle
=
\underbrace{\langle \psi | \xi \rangle}_{\text{scalar}} | \phi \rangle
$$

この関係は，行列や内積の関係を考えるよりも，純粋に

$$
    | \phi \rangle \langle \psi | \times | \xi \rangle
    =
    | \phi \rangle \times \langle \psi | \xi \rangle
$$

というふうに変形ができると覚えておけばよいらしい．
