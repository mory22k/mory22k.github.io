---
layout: post
title: "[回帰1] 線形回帰モデル"
categories: note
description: 線形回帰モデルの尤度関数を導出します．
tags:
- regression
katex: true
---

回帰モデルの基本である線形回帰モデルを取り扱う．

- 次回: [線形回帰モデルのMAP推定と最尤推定](/2023/01/16)

## 線形回帰モデル

データセット

$$
    \mathcal D = \{
        (\bm x_1, y_1),
        (\bm x_2, y_2),
        \cdots,
        (\bm x_d, y_d)
    \}
$$

に含まれる<tex>$\bm x$</tex>と<tex>$y$</tex>の関係が，

$$
    f(\bm x | \bm w) = \bm x^\mathsf{T} \bm w
$$

を用いて，

$$
    y = f(\bm x | \bm w) + \varepsilon
$$

によって与えられていると仮定する．このようなモデルを**線形回帰モデル (linear regression model)** という．

## パラメータ

線形回帰モデルには具体的に値が定まっていない定数<tex>$\bm w$</tex>が含まれており，<tex>$\bm w$</tex>に値が与えられることで入出力関係が定まるようになっている．このようなとき，定数<tex>$\bm w$</tex>を**パラメータ (parameter; 母数)** という．

$$
    f(\bm x | \bm w) \implies \bm w \text{ is a param.}
$$

線形回帰モデルを**学習する (learn)** または**訓練する (train)** という場合には，「パラメータ<tex>$\bm w$</tex>をデータ<tex>$\mathcal D$</tex>および何らかの知識に基づいて推定する」ことを指す．以降，<tex>$\bm w$</tex>の推定量を<tex>$\hat{\bm w}$</tex>と表すことにする．

$$
    \hat{\bm w} \coloneqq \operatorname{estimate}(\bm w)
$$

線形回帰モデルのように，パラメータによって特徴づけされ，パラメータが決まることで形状が定まるモデルのことを**パラメトリックモデル (parametric model)** という．入出力関係にパラメトリックモデルを仮定するような回帰手法では，「データや知識に基づいてパラメータを推定する」ことがテーマとなる．

## ノイズ

確率変数<tex>$\varepsilon$</tex>は，モデル<tex>$f$</tex>を用いて評価された<tex>$f(\bm x_i)$</tex>の値と，実際に観測された出力<tex>$y_i$</tex>の差を表す確率変数であり，**ノイズ (noise)** などと呼ばれる．ノイズを付加する理由は次の2つである．

1. 入出力関係を完璧に表現することは不可能であり，予測結果には常に不正確さがつきまとうため
2. 入出力データが完全に正確であるという保証が与えられない場合も多く，データを完全に信頼することは不自然であるため

典型的には，正規分布に従う確率変数を仮定する場合が多い．

$$
    \varepsilon \sim \mathcal N(\varepsilon | 0, \sigma^2)
$$

すると<tex>$p(y | \bm x, \bm w)$</tex>もまた正規分布となる．

$$
    p(y | \bm x, \bm w) =  \mathcal N(y | \bm x^\mathsf{T} \bm w, \sigma^2)
$$

## 尤度関数

データセット<tex>$\mathcal D$</tex>の中身を次のように配列としてまとめる．

$$
\begin{aligned}
    \bm y
    &:=
    \begin{bmatrix}
        y_1 \\ y_2 \\ \vdots \\ y_d
    \end{bmatrix}
    && \in \mathbb R^d
\\
    \bm X
    &:=
    \begin{bmatrix}
        \bm x_1^\mathsf{T} \\
        \bm x_2^\mathsf{T} \\
        \vdots \\
        \bm x_d^\mathsf{T}
    \end{bmatrix} =
    \begin{bmatrix}
        x_{11} & x_{12} & \cdots & x_{1n} \\
        x_{21} & x_{22} & \cdots & x_{2n} \\
        \vdots & \vdots & \ddots & \vdots \\
        x_{d1} & x_{d2} & \cdots & x_{dn} \\
    \end{bmatrix}
    && \in \mathbb R^{d \times n}
\end{aligned}
$$

すると，<tex>$\mathcal D$</tex>内のすべての入出力の組をまとめて次のように書くことができる．

$$
    \bm y \sim p(\bm y | \bm X, \bm w)
$$

さらに各回の試行<tex>$y_i \sim p(y_i | \bm x_i, \bm w)$</tex>が独立であると仮定すると，次のように変形できる．

$$
\begin{aligned}
    p(\bm y | \bm X, \bm w)
    &= \prod_{i=1}^d p(y_i | \bm x_i, \bm w) \\
    &= \prod_{i=1}^d \mathcal N (y_i | f(\bm x | \bm w), \sigma^2) \\
    &\propto
    \prod_{i=1}^d \exp \left(
        - \frac{1}{2\sigma^2} \left(y_i - f(\bm x | \bm w) \right)^2
    \right) \\
    &=
    \exp \left(
        - \frac{1}{2\sigma^2} \sum_{i=1}^d \left(y_i - \bm x^\mathsf{T} \bm w \right)^2
    \right) \\
    &=
    \exp \left(
        - \frac{1}{2\sigma^2} \left\| \bm y - \bm X \bm w \right\|_2^2
    \right)
\end{aligned}
$$

この<tex>$p(\bm y | \bm X, \bm w)$</tex>を<tex>$\bm w$</tex>についての関数と捉えた場合「<tex>$\bm X$</tex>と<tex>$\bm y$</tex>が得られたときのパラメータ<tex>$\bm w$</tex>の尤もらしさ」を表す関数と解釈できる．そこで<tex>$p(\bm y | \bm X, \bm w)$</tex>を<tex>$\bm w$</tex>の**尤度関数 (likelihood function)** という．

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
    \sqrt \frac{1}{2\pi \sigma^2} \exp \left( -\frac{1}{2\sigma^2} (x_i - m_i)^2 \right) \\
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
