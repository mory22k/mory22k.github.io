---
layout: post
title: "母数と標本統計量"
categories: note
description: 何らかの確率分布に従うデータのサンプルの処理に対する最も基本的な考え方をまとめます．
tags: data_analysis
katex: true
---

ある実験によってデータを得たときのデータの取り扱いの最も基本的な部分をまとめる．

### 参考

以下，Young によるノート[^Peter]と Taylor の書籍[^Taylor]を参考にする．

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

## 確率密度関数

「$x_i$ が確率分布 $p(x)$ に従う」というとき，ここでは次のようなことを意味するとする．$x_i$ を $N$ 個集める．$N$ をどんどん大きくしていき，得られた実現値についてのヒストグラムを描くと，あるなめらかなグラフに漸近していく．このグラフを表す関数が $p(x)$ である．

とくに実数 $r_1 \lt r_2$ について，実現値 $x_i$ が $r_1 \le x_i \le r_2$ となる確率は

$$\begin{aligned}
    \mathbb P[r_1 \le x_i \le r_2] = \int_{r_1}^{r_2} dx p(x)
\end{aligned}$$

で表されることから，$p(x)$ を **確率密度関数 (probability density function; pdf)** と呼ぶ．

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

$N$ 回の実験によって得られた実現値の集合 $\lbrace x_i \rbrace_{i=1}^{N}$ を **標本 (sample; サンプル)** という．標本 $\mathcal D_N$ の **標本平均 (sample mean)**，**標本分散 (sample variance)**，ならびに標本の **標準偏差 (standard deviation)** を次式で定義する．

$$\begin{aligned}
    & \text{sample mean} &
    \overline x &\coloneqq \frac{1}{N} \sum_{i=1}^N x_{i} \\
    & \text{sample variance} &
    s_x^2 &\coloneqq \overline{(x - \overline x)^2} = \overline{x^2} - \overline{x}^2 \\
    & \text{standard deviation} &
    s_x &\coloneqq \sqrt{s_x^2}
\end{aligned}$$

標本平均や標本分散のように，標本 $\mathcal D_N$ を特徴づける値のことを **標本統計量 (sample statistic)** または単に **統計量 (statistic)** という．

## 信頼区間とエラーバー

データの真の値が，平均 $\mu_x$ であると仮定する．われわれは平均 $\mu_x$ の正体を知らないので，代わりに標本平均 $\overline x$ を真の値 $\mu_x$ の推定値として採用するということをよく行う．

$$
    \mu_x \approx \overline x
$$

しかし，標本平均 $\overline x$ は「$N$ 回の実験を行う」という操作を行うたびに変動することが予想されるため，$\overline x$ だけでは真の値の推定には不十分である．そこで次のように考える．まず，$\overline x$ もまた確率分布 $\widetilde p(\overline x)$ からサンプルされたものとして取り扱う．

$$
    \overline x \sim \widetilde p(\overline x)
$$

続いて $\widetilde p(\overline x)$ の標準偏差 $\sigma_{\overline x}$を見積もる．

$$
\begin{aligned}
    & \operatorname{estimate} \quad \sigma_{\overline x} \\
\end{aligned}
$$

「中心極限定理」によれば，データ $x$ が大量にある場合，その平均 $\overline x$ は正規分布に従う．これを利用して $\widetilde p(\overline x)$ を平均 $\mu_x$，標準偏差 $\sigma_{\overline x}$ の正規分布と近似する．

$$
    \widetilde p(\overline x) \approx \mathcal N(\mu_x, \sigma_{\overline x})
$$

これを信じるならば，正規分布の性質により，標本平均 $\overline x$ が $\mu_{x} \pm \sigma_{\overline x}$ の範囲に入っている確率が $68 \ \%$ となる．すると以下のように，真の値 $\mu_x$ が $\overline x \pm \sigma_{\overline x}$ の範囲に入っている確率もまた $68 \ \%$ となる．

$$
\begin{gathered}
    \mu_x - \sigma_{\overline x}
    \le \overline x
    \le \mu_x + \sigma_{\overline x}
    & \cdots & 68 \ \%
    \\
    \overline x - \sigma_{\overline x}
    \le \mu_x
    \le \overline x + \sigma_{\overline x}
    & \cdots & 68 \ \%
\end{gathered}
$$

ここでいう「$68 \ \%$」とは，<u>仮に「$N$ 個のデータを得る」という操作を10,000回繰り返した場合，だいたい6,800回くらいは真の値 $\mu_x$ が区間 $\overline x \pm \sigma_{\overline x}$ に含まれている</u>という意味である．このような推定方法を **頻度主義的な推定 (frequentism)** といい，推定された区間 $\overline x \pm \sigma_{\overline x}$ を **68％ 信頼区間 (68 % confidence interval; CI)** という．これを次のようなエラーバーとして表現することが多い．

<figure class="center">
<img src="/assets/2023-01-23.svg">
<figcaption>

図1. エラーバーの例 (エラーバーは 68 % 信頼区間)

</figcaption>
</figure>
