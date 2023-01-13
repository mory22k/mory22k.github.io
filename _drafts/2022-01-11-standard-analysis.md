---
layout: post
title: "データの分析 (基本編)"
categories: note
description: 何らかの確率分布に従うデータのサンプルの処理の基本をまとめます．
tags:
katex: true
---

ある実験によってデータを得たときのデータの取り扱いの最も基本的な部分をまとめる．

### 参考

Peter によるノート[^Peter]と Taylor の書籍[^Taylor]を参考にした．

[^Peter]: Young, Peter. 2012. “Everything You Wanted to Know about Data Analysis and Fitting but Were Afraid to Ask.” arXiv [physics.data-An]. arXiv. <http://arxiv.org/abs/1210.3781>.

[^Taylor]: Taylor, J. R. 1997. "The Study of Uncertainties in Physical Measurements." University Science Books, Sausalito, California.

## 状況設定

ある値 $x$ を得る実験を同じ条件のもとで $N$ 回行い，$N$ 個のデータを得たとする．

$$
    \mathcal D_N = \{ x_1, x_2, \dots, x_N \}
$$

各 $x_i$ には誤差が含まれる．そこで，各 $x_i$ はある未知の確率分布 $p(x)$ に従う確率変数 $x$ からサンプルされた値として取り扱うことがよく行われる．

$$
    x_i \sim p(x)
$$

得られた $N$ 個のデータを代表する値として，標本平均 $\overline x$ を $x$ の真の値の推定値として採用するということをよく行う．

$$
    \overline x \coloneqq \frac{1}{N} \sum_{i=1}^N x_i
$$

標本平均 $\overline x$ は「$N$ 回の実験を行う」という操作を行うたびに変動することが予想される．したがって $\overline x$ もまた確率分布 $\widetilde p(\overline x)$ からサンプルされたものとして取り扱うことができる．

$$
    \overline x \sim \widetilde p(\overline x)
$$

ここで「グラフに $x$ の推定値をプロットする」というタスクを考える．まず $x$ の推定値として $\overline x$ を得たので，それを示す点をうつ．

<figure class="center">
<img src="/img/2022-01-11-1.svg">
<figcaption>
a
</figcaption>
</figure>

得られたデータ $\mathcal D_N$ を何らかのグラフにプロットし，それにエラーバーをつけるということは，「プロットおよびエラーバーによって分布 $p(x)$ を表現する」ということを行っていると理解すればよい．

## 確率密度関数と標本

「$x_i$ が確率分布 $p(x)$ に従う」というとき，ここでは次のようなことを意味するとする．$x_i$ を $N$ 個集める．$N$ をどんどん大きくしていき，得られた実現値についてのヒストグラムを描くと，あるなめらかなグラフに漸近していく．このグラフを表す関数が $p(x)$ である．

とくに実数 $r_1 \lt r_2$ について，実現値 $x_i$ が $r_1 \le x_i \le r_2$ となる確率は

$$\begin{aligned}
    \mathbb P[r_1 \le x_i \le r_2] = \int_{r_1}^{r_2} dx p(x)
\end{aligned}$$

で表されることから，$p(x)$ を **確率密度関数 (probability density function; pdf)** と呼ぶ．

他方，$N$ 回の実験によって得られた実現値の集合を **標本 (sample; サンプル)** という．

$$\begin{aligned}
    &\text{pdf} && p(x) \\
    &\text{sample} && \{ x_1, x_2, \dots, x_N \}
\end{aligned}$$

## 確率分布の平均と分散

確率分布 $p(x)$ の **$\alpha$ まわりの $n$ 次モーメント (n-th moment)** を次式で定義する．

$$
\begin{aligned}
    \left\langle (x - \alpha)^n \right\rangle \coloneqq \int dx x^n p(x)
\end{aligned}
$$

特に $0$ まわりの $1$ 次モーメントを **期待値 (expected value)** または **平均 (mean)** といい，期待値まわりの $2$ 次モーメントを **分散 (variance)** という．また，分散の正の平方根を母集団の **標準偏差 (standard deviation)** という．

$$\begin{aligned}
    & \text{mean} &
    \mu_x
    &\coloneqq \left\langle x \right\rangle \\
    & \text{variance} &
    \sigma_x^2
    &\coloneqq \left\langle (x - \left\langle x \right\rangle )^2 \right\rangle
    = \left\langle x^2 \right\rangle - \left\langle x \right\rangle^2 \\
    & \text{standard deviation} &
    \sigma_x &\coloneqq \sqrt{\sigma_x^2}
\end{aligned}$$

期待値や分散のように，確率分布 $p(x)$ を特徴づける値のことを **母数 (parameter; パラメータ)** という．

## 標本の平均と分散

$N$ 回の実験で得られた標本 $\mathcal D_N$ の **標本平均 (sample mean)**，**標本分散 (sample variance)**，ならびに標本の **標準偏差 (standard deviation)** を次式で定義する．

$$\begin{aligned}
    & \text{sample mean} &
    \overline x &\coloneqq \frac{1}{N} \sum_{i=1}^N x_{i} \\
    & \text{sample variance} &
    s_x^2 &\coloneqq \overline{(x - \overline x)^2} = \overline{x^2} - \overline{x}^2 \\
    & \text{standard deviation} &
    s_x &\coloneqq \sqrt{s_x^2}
\end{aligned}$$

標本平均や標本分散のように，標本 $\mathcal D_N$ を特徴づける値のことを **標本統計量 (sample statistic)** または単に **統計量 (statistic)** という．

## 標本平均のプロット

得られたデータ $\mathcal D_N$ を何らかのグラフにプロットし，それにエラーバーをつけるということは，「プロットおよびエラーバーによって分布 $p(x)$ を表現する」ということを行っていると理解すればよい．

## 不偏推定量

標本をもとに母数を推定することを考える．推定される母数を **推定対象 (the estimand)**，推定する式のことを **推定関数 (the estimator)** といい，実際に具体的に計算された値のことを **推定値 (the estimate)** という[^3] [^4]．推定関数と推定値はしばしば混同され，**推定量 (estimator)** と呼ばれる．

$$\begin{aligned}
    & \text{the estimand}  && w \\
    & \text{the estimator} && \widehat w : \mathbb R \to \mathbb R \\
    & \text{the estimate}  && \widehat w(\bm x) \in \mathbb R \\
    & \text{estimator} && \widehat w
\end{aligned}$$

推定量もまた，ある種の確率分布からサンプルされた実現値であると捉えることが可能である．

$$\begin{aligned}
    \widehat w \sim \widetilde p(\widehat w)
\end{aligned}$$

するとここで新たに「推定量の期待値」という興味が生まれる．

$$\begin{aligned}
    \langle \widehat w \rangle \coloneqq \int d \widehat w \widehat w \widetilde p(\widehat w)
\end{aligned}$$

この場合，推定量の期待値とは「$N$ 回実験して推定量を得る」という操作を $M$ 回行って平均を取ったものと考えてよい．ただし $M$ は十分に大きいとする．

$$\begin{aligned}
    \langle \widehat w \rangle \simeq \frac{1}{M} \sum_{j=1}^M \widehat w
\end{aligned}$$

推定量の期待値 $\widehat w$ が母数の真の値 $w$ に一致する場合，推定量は **不偏である (unbiased)** といい，そのような推定量を **不偏推定量 (unbiased estimator)** と呼ぶ．

### 期待値の不偏推定量

標本平均 $\overline x$ の期待値を $\mu_{\overline x}$ とすると，

$$\begin{aligned}
    \mu_{\overline x}
    &= \langle \overline x \rangle \\
    &= \left\langle \frac{1}{N} \sum_{i=1}^N x_i \right\rangle \\
    &= \frac{1}{N} \sum_{i=1}^N \langle x_i \rangle \\
    &= \frac{1}{N} N \langle x \rangle \\
    &= \mu_x
\end{aligned}$$

となる．よって，期待値 $\mu_x$ の不偏推定量は標本平均 $\overline x$ である．

$$\begin{aligned}
    \widehat \mu_x = \overline x
\end{aligned}$$

### 分散の不偏推定量

標本分散 $s_x^2$ の期待値は

$$\begin{aligned}
    \langle s_x^2 \rangle
    &= \langle \overline{x^2} - \overline{x}^2 \rangle \\
    &= \langle \overline{x^2} \rangle - \langle \overline{x}^2 \rangle \\
    &= \left\langle \frac{1}{N} \sum_{i=1}^N x_i^2 \right\rangle - \left\langle \left( \frac{1}{N} \sum_{i=1}^N x_i \right)^2 \right\rangle \\
    &= \frac{1}{N} \sum_{i=1}^N \langle x_i^2 \rangle - \frac{1}{N^2} \sum_{i=1}^N \sum_{j=1}^N \langle x_i x_j \rangle \\
        &\quad\left\|\begin{aligned}\quad
            &\sum_{i=1}^N \sum_{j=1}^N \langle x_i x_j \rangle \\
            &= \sum_{i = j} \langle x_i^2 \rangle + \sum_{i \ne j} \langle x_i \rangle \langle x_j \rangle \\
            &= N \langle x^2 \rangle + N(N-1) \langle x \rangle^2
        \end{aligned}\right. \\
    &= \frac{1}{N} \sum_{i=1}^N \langle x_i^2 \rangle - \frac{1}{N^2} \left( N \langle x^2 \rangle + N(N-1) \langle x \rangle^2 \right) \\
    &= \frac{N-1}{N} \left( \langle x^2 \rangle - \langle x \rangle^2 \right) \\
    &= \frac{N-1}{N} \sigma_x^2
\end{aligned}$$

と計算される．よって分散 $\sigma_x^2$ の不偏推定量は次式で与えられる．

$$\begin{aligned}
    \widehat \sigma_x^2 = \frac{N}{N-1} s_x^2
\end{aligned}$$

### 標本平均の分散の推定量

標本平均 $\overline x$ をプロットしてエラーバーを付ける場合，エラーバーは $p(x)$ の分散ではなく $\widetilde p(\overline x)$ の分散となるべきである．そこで，続いて標本平均 $\overline x$ の分散 $\sigma_{\overline x}^2$ を求める．

$$\begin{aligned}
    \sigma_{\overline x}^2
    &= \langle \overline x^2 \rangle - \langle \overline x \rangle^2 \\
    &= \left\langle \left( \frac{1}{N} \sum_{i=1}^N x_i \right)^2 \right\rangle - \left\langle \frac{1}{N} \sum_{i=1}^N x_i \right\rangle^2 \\
    &= \frac{1}{N^2} \left(
        \left\langle \sum_{i=1}^N x_i \sum_{j=1}^N x_j \right\rangle
        - \left\langle \sum_{i=1}^N x_i \right\rangle \left\langle \sum_{j=1}^N x_j \right\rangle
    \right) \\
    &= \frac{1}{N^2} \sum_{i=1}^N \sum_{j=1}^N \left(
        \langle x_i x_j \rangle - \langle x_i \rangle \langle x_j \rangle
    \right) \\
    &= \frac{1}{N^2} \sum_{i=1}^N \left(
        \langle x_i^2 \rangle - \langle x_i \rangle^2
    \right) \\
    &= \frac{1}{N^2} N \left( \langle x^2 \rangle - \langle x \rangle^2 \right) \\
    &= \frac{1}{N} \sigma_x^2
\end{aligned}$$

こうして出てきた $\sigma_x^2$ に，分散の不偏推定量を代入すると

$$\begin{aligned}
    \widehat \sigma^2_{\overline x} = \frac{1}{N-1} s_x^2
\end{aligned}$$

が得られる．

## エラーバーの作成

以上のことから，標本平均 $\overline x$ が従う分布 $\widehat p(\overline x)$

こうして求められた2つの不偏推定量 $\widehat \mu_{\overline x}$

[^3]: Mosteller, F., Tukey, 1968. "Data Analysis, including Statistics". The Collected Works of John W. Tukey: Philosophy and Principles of Data Analysis 1965–1986. Vol. 4. CRC Press. pp. 601–720. ISBN 0-534-05101-4

[^4]: 竹村 彰通, 1991. "現代数理統計学". 創文社.
