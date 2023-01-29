---
layout: post
title: "ベクトル・行列の微分計算"
categories: note
description: 高次元配列に関する微分計算についてまとめます．
tags: knowledge
katex: true
---

機械学習の理論を取り扱うとき，しばしばベクトルや行列を巻き込んだ微分計算に遭遇する．そのようなときに困惑しないよう，考え方を整理しておく．

## ベクトルのスカラー微分

$$
\begin{aligned}
    \bm y(x) \in \mathbb R^n
\end{aligned}
$$

とする．ベクトルのスカラー微分を次のように定義する．

$$
\begin{aligned}
    &&
    \frac{\partial \bm y(x)}{\partial x} &:=
    \left[\begin{darray}{}
        \dfrac{\partial y_i}{\partial x}
    \end{darray}\right]_{i}
    \in \mathbb R^n
    \\
    & \text{i.e.} &
    \frac{\partial \bm y(x)}{\partial x} &:=
    \left[\begin{darray}{}
        \frac{\partial y_1}{\partial x} \\
        \frac{\partial y_2}{\partial x} \\
        \vdots \\
        \frac{\partial y_n}{\partial x}
    \end{darray}\right]
\end{aligned}
$$

## スカラーのベクトル微分

続いて，

$$
\begin{aligned}
    \bm x \in \mathbb R^m
\end{aligned}
$$

とする．スカラーのベクトル微分は次のように定義する．

$$
\begin{aligned}
    &&
    \frac{\partial y(\bm x)}{\partial \bm x} &:=
    \left[\begin{darray}{}
        \dfrac{\partial y}{\partial x_i}
    \end{darray}\right]_{i}
    \in \mathbb R^m
    \\
    & \text{i.e.} &
    \frac{\partial y(\bm x)}{\partial \bm x} &:=
    \left[\begin{darray}{}
        \frac{\partial y}{\partial x_1} \\
        \frac{\partial y}{\partial x_2} \\
        \vdots \\
        \frac{\partial y}{\partial x_m}
    \end{darray}\right]
\end{aligned}
$$

## ベクトルのベクトル微分

$$
\begin{aligned}
    \bm x & \in \mathbb R^m \\
    \bm y & \in \mathbb R^n
\end{aligned}
$$

として，ベクトルのベクトル微分を次式で与える．

$$
\begin{aligned}
    &&
    \frac{\partial \bm y(\bm x)}{\partial \bm x} &:=
    \left[\begin{darray}{}
        \dfrac{\partial y_j}{\partial x_i}
    \end{darray}\right]_{ij}
    \in \mathbb R^{m \times n}
    \\
    & \text{i.e.} &
    \frac{\partial \bm y(\bm x)}{\partial \bm x} &:=
    \left[\begin{darray}{}
        \frac{\partial y_1}{\partial x_1} &
        \frac{\partial y_2}{\partial x_1} &
        \cdots &
        \frac{\partial y_n}{\partial x_1}
        \\
        \frac{\partial y_1}{\partial x_2} &
        \frac{\partial y_2}{\partial x_2} &
        \cdots &
        \frac{\partial y_n}{\partial x_2}
        \\
        \vdots & \vdots & \ddots & \vdots
        \\
        \frac{\partial y_1}{\partial x_m} &
        \frac{\partial y_2}{\partial x_m} &
        \cdots &
        \frac{\partial y_n}{\partial x_m}
    \end{darray}\right]
\end{aligned}
$$

[Bishop, 2006] などでは上記の定義を転置したものが採用されているが[^1]，本サイトでは上記の定義を採用することにする．

[^1]: Bishop, Christopher M. 2006. Pattern Recognition and Machine Learning. Springer.

なお，少々強引だが次のように解釈することも可能である．

$$
\begin{aligned}
    \frac{\partial \bm y(\bm x)}{\partial \bm x} :=
    \left[\begin{darray}{}
        \frac{\partial}{\partial x_1} \\
        \frac{\partial}{\partial x_2} \\
        \vdots \\
        \frac{\partial}{\partial x_m}
    \end{darray}\right]
    \left[\begin{darray}{}
        y_1 & y_2 & \cdots & y_n
    \end{darray}\right]
\end{aligned}
$$

## 行列の微分

行列のスカラー微分，行列のベクトル微分，行列の行列微分なども同様に定義する．

$$
\begin{aligned}
    x &\in \mathbb R, \\
    \bm x &\in \mathbb R^{m}, \\
    \bm X &\in \mathbb R^{m_1 \times m_2}, \\
    \bm Y &\in \mathbb R^{n_1 \times n_2}
\end{aligned}
$$

とするとき，

$$
\begin{aligned}
    \frac{\partial \bm Y(x)}{\partial x} &:=
    \left[\begin{darray}{}
        \dfrac{\partial y_{ij}}{\partial x}
    \end{darray}\right]_{ij}
    \in \mathbb R^{n_1 \times n_2}
    \\
    \frac{\partial \bm Y(\bm x)}{\partial \bm x} &:=
    \left[\begin{darray}{}
        \dfrac{\partial y_{jk}}{\partial x_{i}}
    \end{darray}\right]_{ijk}
    \in \mathbb R^{m \times n_1 \times n_2}
    \\
    \frac{\partial \bm Y(\bm X)}{\partial \bm X} &:=
    \left[\begin{darray}{}
        \dfrac{\partial y_{kl}}{\partial x_{ij}}
    \end{darray}\right]_{ijkl}
    \in \mathbb R^{m_1 \times m_2 \times n_1 \times n_2}
\end{aligned}
$$

である．

ここで，<tex>$\mathbb R^{a \times b \times c}$</tex>を「<tex>$a \times b \times c$</tex>配列」と呼ぶことにする．また，テンソルの呼び方に倣って

$$
\begin{darray}{c}
    \mathbb R^{a}
    &:& \text{1階の配列} & \text{(ベクトル)} \\
    \mathbb R^{a \times b}
    &:& \text{2階の配列} & \text{(行列)} \\
    \mathbb R^{a \times b \times c}
    &:& \text{3階の配列} \\
    \mathbb R^{a \times b \times c \times d}
    &:& \text{4階の配列} \\
    \vdots && \vdots
\end{darray}
$$

と呼ぶことにする．

ごちゃごちゃと書いたが，とにかく「分子を分母の配列の各要素で微分し，それを並べる」と理解しておけばよい．
