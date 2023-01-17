---
layout: post
title: "線形回帰モデル"
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

に含まれる $\bm x$ と $y$ の関係が，

$$
    f(\bm x | \bm w) = \bm x^\mathsf{T} \bm w
$$

を用いて，

$$
    y = f(\bm x | \bm w) + \varepsilon
$$

によって与えられていると仮定する．このようなモデルを **線形回帰モデル (linear regression model)** という．

## パラメータ

線形回帰モデルには具体的に値が定まっていない定数 $\bm w$ が含まれており，$\bm w$ に値が与えられることで入出力関係が定まるようになっている．このようなとき，定数 $\bm w$ を **パラメータ (parameter; 母数)** という．

$$
    f(\bm x | \bm w) \implies \bm w \text{ is a param.}
$$

線形回帰モデルを **学習する (learn)** または **訓練する (train)** という場合には，「パラメータ $\bm w$ をデータ $\mathcal D$ および何らかの知識に基づいて推定する」ことを指す．以降，$\bm w$ の推定量を $\hat{\bm w}$ と表すことにする．

$$
    \hat{\bm w} \coloneqq \operatorname{estimate}(\bm w)
$$

線形回帰モデルのように，パラメータによって特徴づけされ，パラメータが決まることで形状が定まるモデルのことを **パラメトリックモデル (parametric model)** という．入出力関係にパラメトリックモデルを仮定するような回帰手法では，「データや知識に基づいてパラメータを推定する」ことがテーマとなる．

## ノイズ

$\varepsilon$ は，モデル $f$ を用いて評価された $f(\bm x_i)$ の値と，実際に観測された出力 $y_i$ の差を表す確率変数であり，**ノイズ (noise)** などと呼ばれる．ノイズを付加する理由は次の2つである．

1. 入出力関係を完璧に表現することは不可能であり，予測結果には常に不正確さがつきまとうため
2. 入出力データが完全に正確であるという保証が与えられない場合も多く，データを完全に信頼することは不自然であるため

典型的には，正規分布に従う確率変数を仮定する場合が多い．

$$
    \varepsilon \sim \mathcal N(\varepsilon | 0, \sigma^2)
$$

すると $p(y \| \bm x, \bm w)$ もまた正規分布となる．

$$
    p(y | \bm x, \bm w) =  \mathcal N(y | \bm x^\mathsf{T} \bm w, \sigma^2)
$$

## 尤度関数

データセット $\mathcal D$ の中身を次のように配列としてまとめる．

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

すると，$\mathcal D$ 内のすべての入出力の組をまとめて次のように書くことができる．

$$
    \bm y \sim p(\bm y | \bm X, \bm w)
$$

さらに各回の試行 $y_i \sim p(y_i \| \bm x_i, \bm w)$ が独立であると仮定すると，次のように変形できる．

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

この $p(\bm y \| \bm X, \bm w)$ を $\bm w$ についての関数と捉えた場合「$\bm X$ と $\bm y$ が得られたときのパラメータ $\bm w$ の尤もらしさ」を表す関数と解釈できる．そこで $p(\bm y \| \bm X, \bm w)$ を $\bm w$ の **尤度関数 (likelihood function)** という．
