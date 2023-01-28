---
layout: post
title: "[分析3] 誤差伝播法"
categories: note
description: 得られたデータをエラーバーで表現するための統計量の基本的な扱い方について概説します．
tags: data_analysis
katex: true
---

標本統計量を関数に入力したときの誤差伝播の考え方をまとめておく．

## 誤差伝播

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

で与えられる．ただし

$$
\begin{aligned}
    \overline x &\coloneqq \frac{1}{N} \sum_{i=1}^N x_i, \\
    \overline y &\coloneqq \frac{1}{N} \sum_{i=1}^N y_i, \\
\end{aligned}
\\
\begin{aligned}
    \sigma_{\overline x}^2 &\simeq \frac{1}{N-1} s_x^2, \\
    \sigma_{\overline y}^2 &\simeq \frac{1}{N-1} s_y^2
\end{aligned}
$$

である．

ここで，期待値を何らかの関数に入力して，出力<tex>$f(\mu_x, \mu_y)$</tex>を得る場合を考えよう．

$$
    \text{get }f(\mu_x, \mu_y)
$$

当然ながら<tex>$\mu_x, \mu_y$</tex>は未知の値であるから<tex>$f(\mu_x, \mu_y)$</tex>も未知であるため，どうにかして推定する必要がある．

手っ取り早いのが，代わりに<tex>$\overline x, \overline y$</tex>を用いて $f(\overline x, \overline y)$ を推定量として取り扱うことだが，これにはいわゆる「バイアス」と呼ばれる推定の「ずれ」が生じる場合があり，推定量の「不偏性」という観点では適切ではない[^2]．そこで有効なのが<tex>$f(\mu_x, \mu_y)$</tex>と<tex>$f(\overline x, \overline y)$</tex>の誤差を伝達していくことによって<tex>$f(\mu_x, \mu_y)$</tex>の信頼区間を求める方法であり，これは **誤差伝播 (error propagation)** と呼ばれる．以下では誤差伝播の基本的な考え方に基づいて，<tex>$f(\mu_x, \mu_y)$</tex>を区間推定する．

[^2]: 「不偏推定量」は「推定量 (estimator) の期待値が推定される量 (estimand) に一致する」ような推定量を指す．よって<tex>$f(\overline x, \overline y)$</tex>を<tex>$f(\mu_x, \mu_y)$</tex>の不偏推定量としたいならば<tex>$\langle f(\overline x, \overline y) \rangle = f(\mu_x, \mu_y)$</tex>が成り立つことを確認する必要があるが，本記事で明らかにするようにこれは一般に成り立たない．

## 標本平均の平均と期待値

標本平均<tex>$\overline x, \overline y$</tex>は確率変数とみなしているため，その出力<tex>$f(\overline x, \overline y)$</tex>もまた確率的な値となる．したがって，<tex>$f(\overline x, \overline y)$</tex>にも期待値と分散を考えることができる．

$$
\begin{aligned}
    \mu_f &\coloneqq \langle f(\overline x, \overline y) \rangle \\
    \sigma_f^2 &\coloneqq \langle f^2(\overline x, \overline y) \rangle - \langle f(\overline x, \overline y) \rangle^2
\end{aligned}
$$

すなわち，<tex>$f(\overline x, \overline y)$</tex>の**期待値±1標準偏差**の範囲は，

$$
    f(\overline x, \overline y) \sim \mu_f \pm \sigma_f
$$

で表現できる．

### 期待値の推定

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
    \mu_f
    &=
        \langle f(\overline x, \overline y) \rangle \\
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
            \frac{\partial^2 f}{\partial \mu_x^2} \underbrace{\langle (\overline x - \mu_x)^2 \rangle}_{\text{varaince}}
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
            2 \frac{\partial^2 f}{\partial \mu_x \partial \mu_y} \sigma_{\overline x \overline y}
        \right)
    \\
    &=
        f(\mu_x, \mu_y)
        +
        \frac{1}{2} \frac{1}{N-1} \left(
            \frac{\partial^2 f}{\partial \mu_x^2} \langle s_x^2 \rangle
            +
            \frac{\partial^2 f}{\partial \mu_y^2} \langle s_x^2 \rangle
            +
            2 \frac{\partial^2 f}{\partial \mu_x \partial \mu_y} \langle s_{xy}^2 \rangle
        \right)
\end{aligned}
$$

ただし，<tex>$\sigma_{\overline x}^2, \sigma_{\overline y}^2$</tex>はそれぞれ標本平均<tex>$\overline x, \overline y$</tex>の分散であり，<tex>$\sigma_{\overline x \overline y}^2$</tex>は<tex>$\overline x, \overline y$</tex>の共分散である．また

$$
\begin{aligned}
    \sigma_{\overline x}^2 &= \frac{1}{N-1} \langle s_x^2 \rangle, \\
    \sigma_{\overline y}^2 &= \frac{1}{N-1} \langle s_y^2 \rangle, \\
    \sigma_{\overline x \overline y}^2 &= \frac{1}{N-1} \langle s_{xy}^2 \rangle \\
\end{aligned}
$$

であることを用いた．よって，期待値は次のように推定することができる．

$$
    \mu_f
    \simeq
        f(\mu_x, \mu_y)
        +
        \frac{1}{2} \frac{1}{N-1} \left(
            \frac{\partial^2 f}{\partial \mu_x^2} s_x^2
            +
            \frac{\partial^2 f}{\partial \mu_y^2} s_x^2
            +
            2 \frac{\partial^2 f}{\partial \mu_x \partial \mu_y} s_{xy}^2
        \right)
$$

**第2項が<tex>$f(\overline x, \overline y)$</tex>と<tex>$f(\mu_x, \mu_y)$</tex>の差を表している**ことに注意．次のように書けば分かりやすいだろう．

$$
    \langle f(\overline x, \overline y) \rangle
    -
    f(\mu_x, \mu_y)
    \simeq
        \underbrace{
            \frac{1}{2} \frac{1}{N-1} \left(
                \frac{\partial^2 f}{\partial \mu_x^2} s_x^2
                +
                \frac{\partial^2 f}{\partial \mu_y^2} s_x^2
                +
                2 \frac{\partial^2 f}{\partial \mu_x \partial \mu_y} s_{xy}^2
            \right)
        }_{\text{bias}}
$$

### 標準偏差の推定

続いて，出力の分散<tex>$\sigma_f$</tex>を計算する．今度は<tex>$f(\overline x, \overline y)$</tex>を点<tex>$(\mu_x, \mu_y)$</tex>の周りで1次まで展開する[^3]．

[^3]: なぜ1次までなのかというと「分散の推定のために後で2乗計算が入るから，2次まで展開する重要性がそれほどないため」である．…がまあこれは建前で，実際のところ「2次以降の展開をしても推定量の導出で詰む」というのが本音である．

$$
    f(\overline x, \overline y)
    =
        f(\mu_x, \mu_y)
        +
        \frac{\partial f}{\partial \mu_x} (\overline x - \mu_x)
        +
        \frac{\partial f}{\partial \mu_y} (\overline y - \mu_y)
$$

これにより，

$$
\begin{aligned}
    \langle f(\overline x, \overline y) \rangle^2
    &=
    \left\langle
        f(\mu_x, \mu_y)
        +
        \frac{\partial f}{\partial \mu_x} (\overline x - \mu_x)
        +
        \frac{\partial f}{\partial \mu_y} (\overline y - \mu_y)
    \right\rangle^2
    \\
    &=
    \left(
        f(\mu_x, \mu_y)
        +
        \frac{\partial f}{\partial \mu_x} \underbrace{\langle \overline x - \mu_x \rangle}_{0}
        +
        \frac{\partial f}{\partial \mu_y} \underbrace{\langle \overline y - \mu_y \rangle}_{0}
    \right)^2
    \\
    &= f^2(\mu_x, \mu_y)
\end{aligned}
$$

および

$$
\begin{aligned}
    \langle f^2(\overline x, \overline y) \rangle
    &=
        \langle
            f^2(\mu_x, \mu_y)
        \rangle
        \\ &\qquad
        +
        \left\langle
            2
            f(\mu_x, \mu_y)
            \left(
                \frac{\partial f}{\partial \mu_x} (\overline x - \mu_x)
                +
                \frac{\partial f}{\partial \mu_y} (\overline y - \mu_y)
            \right)
        \right\rangle
        \\ &\qquad
        +
        \left\langle
            \left(
                \frac{\partial f}{\partial \mu_x} (\overline x - \mu_x)
                +
                \frac{\partial f}{\partial \mu_y} (\overline y - \mu_y)
            \right)^2
        \right\rangle
    \\
    &=
        f^2(\mu_x, \mu_y)
        \\ &\qquad
            + 2 f(\mu_x, \mu_y) \frac{\partial f}{\partial \mu_x} \underbrace{\langle \overline x - \mu_x \rangle}_{0}
            + 2 f(\mu_x, \mu_y) \frac{\partial f}{\partial \mu_y} \underbrace{\langle \overline y - \mu_y \rangle}_{0}
        \\ &\qquad
            + \left( \frac{\partial f}{\partial \mu_x} \right)^2 \underbrace{\langle (\overline x - \mu_x)^2 \rangle}_{\text{variance}}
            + \left( \frac{\partial f}{\partial \mu_y} \right)^2 \underbrace{\langle (\overline y - \mu_y)^2 \rangle}_{\text{variance}}
        \\ &\qquad
            + 2 \frac{\partial f}{\partial \mu_x} \frac{\partial f}{\partial \mu_y} \underbrace{\langle (\overline x - \mu_x) (\overline y - \mu_y) \rangle}_{\text{covariance}}
    \\
    &=
        f^2(\mu_x, \mu_y)
        + \left( \frac{\partial f}{\partial \mu_x} \right)^2 \sigma_x^2
        + \left( \frac{\partial f}{\partial \mu_y} \right)^2 \sigma_y^2
        + 2\frac{\partial f}{\partial \mu_x} \frac{\partial f}{\partial \mu_y} \sigma_{xy}
\end{aligned}
$$

が得られる．これにより，分散は

$$
\begin{aligned}
    \sigma_f^2
    &=
        \langle f(\overline x, \overline y) \rangle^2 - \langle f^2(\overline x, \overline y) \rangle
    \\
    &=
        \left( \frac{\partial f}{\partial \mu_x} \right)^2 \sigma_x^2
        + \left( \frac{\partial f}{\partial \mu_y} \right)^2 \sigma_y^2
        + 2\frac{\partial f}{\partial \mu_x} \frac{\partial f}{\partial \mu_y} \sigma_{xy}
    \\
    &=
        \frac{1}{N-1}
        \left(
            \left( \frac{\partial f}{\partial \mu_x} \right)^2 \langle s_x^2 \rangle
            +
            \left( \frac{\partial f}{\partial \mu_y} \right)^2 \langle s_y^2 \rangle
            +
            2\frac{\partial f}{\partial \mu_x} \frac{\partial f}{\partial \mu_y} \langle s_{xy} \rangle
        \right)
\end{aligned}
$$

となり，結局次のように推定することができる．

$$
\begin{aligned}
    \sigma_f^2
    \simeq
        \frac{1}{N-1}
        \left(
            \left( \frac{\partial f}{\partial \mu_x} \right)^2 s_x^2
            +
            \left( \frac{\partial f}{\partial \mu_y} \right)^2 s_y^2
            +
            2\frac{\partial f}{\partial \mu_x} \frac{\partial f}{\partial \mu_y} s_{xy}
        \right)
\end{aligned}
$$

あとは，この推定量の平方根をとったものを標準偏差の推定量として採用することで，標準偏差の推定量を得ることができる[^1]．

$$
\begin{aligned}
    \sigma_f
    &\simeq
        \sqrt\frac{1}{N-1}
        \sqrt{
            \left( \frac{\partial f}{\partial \mu_x} \right)^2 s_x^2
            +
            \left( \frac{\partial f}{\partial \mu_y} \right)^2 s_y^2
            +
            2\frac{\partial f}{\partial \mu_x} \frac{\partial f}{\partial \mu_y} s_{xy}
        }
\end{aligned}
$$

[^1]: **分散の不偏推定量の平方根は標準偏差の不偏推定量ではない**問題は依然として残るが，$N$ が十分大きな場合にはそれほど核心的な問題に発展することはほとんどないのでここでは無視した．

## 信頼区間の導出

以上をまとめると，

$$
    f(\overline x, \overline y) \sim \mu_f \pm \sigma_f
$$

$$
\begin{aligned}
    \mu_f
    &\simeq
        f(\mu_x, \mu_y)
        +
        \underbrace{
            \frac{1}{2} \frac{1}{N-1} \left(
                \frac{\partial^2 f}{\partial \mu_x^2} s_x^2
                +
                \frac{\partial^2 f}{\partial \mu_y^2} s_x^2
                +
                2 \frac{\partial^2 f}{\partial \mu_x \partial \mu_y} s_{xy}^2
            \right)
        }_{\text{bias}}
        \\
    \sigma_f^2
    &\simeq
        \frac{1}{N-1}
        \left(
            \left( \frac{\partial f}{\partial \mu_x} \right)^2 s_x^2
            +
            \left( \frac{\partial f}{\partial \mu_y} \right)^2 s_y^2
            +
            2\frac{\partial f}{\partial \mu_x} \frac{\partial f}{\partial \mu_y} s_{xy}
        \right)
\end{aligned}
$$

である．便宜上，期待値の推定量の第2項をバイアスとして取り扱い，「<tex>$f_\text{bias}$</tex>」と書くことにすれば期待値±1標準偏差の範囲は次のように書ける．

$$
    f(\overline x, \overline y) \sim f(\mu_x, \mu_y) + f_\text{bias} \pm \sigma_f
$$

このことを用いれば，右辺の<tex>$f(\mu_x, \mu_y)$</tex>を信頼区間を次式で与えることができる．

$$
    f(\mu_x, \mu_y) \sim f(\overline x, \overline y) - f_\text{bias} \pm \sigma_f
$$

$$
\begin{aligned}
    f_\text{bias}
    &\simeq
        \frac{1}{2} \frac{1}{N-1} \left(
            \frac{\partial^2 f}{\partial \mu_x^2} s_x^2
            +
            \frac{\partial^2 f}{\partial \mu_y^2} s_x^2
            +
            2 \frac{\partial^2 f}{\partial \mu_x \partial \mu_y} s_{xy}^2
        \right)
    \\
    \sigma_f^2
    &\simeq
        \frac{1}{N-1}
        \left(
            \left( \frac{\partial f}{\partial \mu_x} \right)^2 s_x^2
            +
            \left( \frac{\partial f}{\partial \mu_y} \right)^2 s_y^2
            +
            2\frac{\partial f}{\partial \mu_x} \frac{\partial f}{\partial \mu_y} s_{xy}
        \right)
\end{aligned}
$$

### オーダーに注目すると

標準偏差<tex>$\sigma_f$</tex>が<tex>$\mathcal O\left(\sqrt\dfrac{1}{N}\right)$</tex>であるのに対し，<tex>$f_\text{bias}$</tex>は<tex>$\mathcal O\left(\dfrac{1}{N}\right)$</tex>である．これは<tex>$N$</tex>が大きくなるとき，<tex>$\sigma_f$</tex>よりも<tex>$f_\text{bias}$</tex>のほうが先に縮小していくことを表している．そのため<u>「計算リソースが無限にあって<tex>$N$</tex>はやたら大きくできるが，結果の解析についてはとにかく荒っぽくてもいいからそれなりの区間を出してくれ」</u>というような特殊ケースの場合，先に<tex>$\sigma_f$</tex>を推定するといいかもしれない．
