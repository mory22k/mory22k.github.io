---
layout: post
title: "[分析3] 誤差伝播法"
categories: note
description: 得られたデータをエラーバーで表現するための統計量の基本的な扱い方について概説します．
tags: data_analysis
katex: true
---

標本統計量を関数に入力したときの誤差伝播の考え方をまとめておく．

## 状況設定

$$
\def\bar{\overline}
\begin{aligned}
    x_i &\underset{\rm i.i.d.}{\sim} p(x) \\
    y_i &\underset{\rm i.i.d.}{\sim} p(y) \\
\end{aligned}
$$

なるサイズ<tex>$N$</tex>の標本<tex>$\lbrace x_i \rbrace_{i=1}^N$</tex>および<tex>$\lbrace y_i \rbrace_{i=1}^N$</tex>を用いて，期待値<tex>$\mu_x, \mu_y$</tex>を区間推定したとき，その68％信頼区間はそれぞれ

$$
\begin{aligned}
    \mu_x &\underset{68\%}{\sim} \overline x \pm \sigma_{\overline x}, \\
    \mu_y &\underset{68\%}{\sim} \overline y \pm \sigma_{\overline y}, \\
\end{aligned}
$$

で与えられる．ここで

$$
\begin{aligned}
    \overline x &\coloneqq \frac{1}{N} \sum_{i=1}^N x_i, \\
    \overline y &\coloneqq \frac{1}{N} \sum_{i=1}^N y_i, \\
    \sigma_{\overline x}^2 &\simeq \frac{1}{N-1} s_x^2, \\
    \sigma_{\overline y}^2 &\simeq \frac{1}{N-1} s_y^2
\end{aligned}
$$

である．

標本平均<tex>$\overline x, \overline y$</tex>は確率変数とみなしているため，その出力<tex>$f(\overline x, \overline y)$</tex>もまた確率的な値となる．したがって，この値にも期待値<tex>$\langle f(\overline x, \overline y) \rangle$</tex>


このようにして区間推定された2つの期待値<tex>$\mu_x, \mu_y$</tex>を2変数関数<tex>$f(x,y)$</tex>に入力したとき，その出力値

$$
    f(\mu_x, \mu_y)
$$

はどのような値を取りうるかを区間推定したい．

## 出力値の推定

まず<tex>$f(\overline x, \overline y)$<tex>を点<tex>$(\mu_x, \mu_y)$</tex>の周りで2次の項までテイラー展開する．

$$
\begin{aligned}
    f(\overline x, \overline y)
    &\approx
        f(\mu_x, \mu_y)
        \\ &\quad
        +
        \nabla f(\mu_x, \mu_y)^\mathsf{T}
        \begin{bmatrix} \overline x - \mu_x \\ \overline y - \mu_y \end{bmatrix}
        \\ &\quad
        +
        \frac{1}{2}
        \begin{bmatrix} \overline x - \mu_x & \overline y - \mu_y \end{bmatrix}
        \nabla^2 f(\mu_x, \mu_y)
        \begin{bmatrix} \overline x - \mu_x \\ \overline y - \mu_y \end{bmatrix}
    \\
    &=
        f(\mu_x, \mu_y)
        \\ &\quad
        +
        \frac{\partial f}{\partial \mu_x} (\overline x - \mu_x)
        +
        \frac{\partial f}{\partial \mu_y} (\overline y - \mu_y)
        \\ &\quad
        +
        \frac{1}{2} \left(
            \frac{\partial^2 f}{\partial \mu_x^2} (\overline x - \mu_x)^2
            +
            \frac{\partial^2 f}{\partial \mu_y^2} (\overline y - \mu_y)^2
            +
            2 \frac{\partial^2 f}{\partial \mu_x \partial \mu_y} (\overline x - \mu_x) (\overline y - \mu_y)
        \right)
\end{aligned}
$$

これの期待値を計算する．

$$
\begin{aligned}
    \langle f(\overline x, \overline y) \rangle
    &=
        f(\mu_x, \mu_y)
        \\ &\quad
        +
        \frac{\partial f}{\partial \mu_x} \underbrace{\langle \overline x - \mu_x \rangle}_{0}
        +
        \frac{\partial f}{\partial \mu_y} \underbrace{\langle \overline y - \mu_y \rangle}_{0}
        \\ &\quad
        +
        \frac{1}{2} \left(
            \frac{\partial^2 f}{\partial \mu_x^2} \underbrace{\langle (\overline x - \mu_x)^2 \rangle}_{\text{variance}}
            +
            \frac{\partial^2 f}{\partial \mu_y^2} \underbrace{\langle (\overline y - \mu_y)^2 \rangle}_{\text{variance}}
            +
            2 \frac{\partial^2 f}{\partial \mu_x \partial \mu_y} \underbrace{\langle (\overline x - \mu_x) (\overline y - \mu_y) \rangle}_{\text{covariance}}
        \right)
    \\
    &=
        f(\mu_x, \mu_y)
        +
        \frac{1}{2} \left(
            \frac{\partial^2 f}{\partial \mu_x^2} \sigma_{\overline x}^2
            +
            \frac{\partial^2 f}{\partial \mu_y^2} \sigma_{\overline y}^2
            +
            2 \frac{\partial^2 f}{\partial \mu_x \partial \mu_y} \sigma_{\overline x \overline y}^2
        \right)
\end{aligned}
$$

ただし，<tex>$\sigma_{\overline x}^2, \sigma_{\overline y}^2$</tex>はそれぞれ標本平均<tex>$\overline x, \overline y$</tex>の分散であり，<tex>$\sigma_{\overline x \overline y}^2$</tex>は<tex>$\overline x, \overline y$</tex>の共分散である．よって

$$
    f(\mu_x, \mu_y)
    =
        \underbrace{\langle f(\overline x, \overline y) \rangle}_{\text{mean}}
        -
        \underbrace{
            \frac{1}{2} \left(
                \frac{\partial^2 f}{\partial \mu_x^2} \sigma_{\overline x}^2
                +
                \frac{\partial^2 f}{\partial \mu_y^2} \sigma_{\overline y}^2
                +
                2 \frac{\partial^2 f}{\partial \mu_x \partial \mu_y} \sigma_{\overline x \overline y}^2
            \right)
        }_{\text{bias}}
$$

である．便宜上，第1項を平均，第2項をバイアスと呼ぶことにする．さらに

$$
\begin{aligned}
    \sigma_{\overline x}^2 &= \frac{1}{N-1} \langle s_x^2 \rangle, \\
    \sigma_{\overline y}^2 &= \frac{1}{N-1} \langle s_y^2 \rangle, \\
    \sigma_{\overline x \overline y}^2 &= \frac{1}{N-1} \langle s_{xy}^2 \rangle \\
\end{aligned}
$$

であることを用いれば

$$
    f(\mu_x, \mu_y)
    =
        \underbrace{\langle f(\overline x, \overline y) \rangle}_{\text{mean}}
        -
        \underbrace{
            \frac{1}{2} \frac{1}{N-1} \left(
                \frac{\partial^2 f}{\partial \mu_x^2} \langle s_x^2 \rangle
                +
                \frac{\partial^2 f}{\partial \mu_y^2} \langle s_x^2 \rangle
                +
                2 \frac{\partial^2 f}{\partial \mu_x \partial \mu_y} \langle s_{xy}^2 \rangle
            \right)
        }_{\text{bias}}
$$

となる．よって，出力値は次のように推定することができる．

$$
    f(\mu_x, \mu_y)
    =
        f(\overline x, \overline y)
        -
        \frac{1}{2} \frac{1}{N-1} \left(
            \frac{\partial^2 f}{\partial \mu_x^2} s_x^2
            +
            \frac{\partial^2 f}{\partial \mu_y^2} s_x^2
            +
            2 \frac{\partial^2 f}{\partial \mu_x \partial \mu_y} s_{xy}^2
        \right)
$$

## 出力値の分散の推定


続いて，出力の分散を推定する．ここで分散は

$$
    \langle f^2(\mu_x, \mu_y) \rangle
$$
