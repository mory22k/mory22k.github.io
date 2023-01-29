---
layout: post
title: "[分析1] 母数と標本統計量"
categories: note
description: 何らかの確率分布に従うデータのサンプルの処理に対する最も基本的な考え方をまとめます．
tags: analytics
katex: true
---

ある実験によってデータを得たときのデータの取り扱いの最も基本的な部分をまとめる．

### 参考

以下，Young によるノート[^Peter]と Taylor の書籍[^Taylor]を参考にする．

[^Peter]: Young, Peter. 2012. “Everything You Wanted to Know about Data Analysis and Fitting but Were Afraid to Ask.” arXiv [physics.data-An]. arXiv. <http://arxiv.org/abs/1210.3781>.

[^Taylor]: Taylor, J. R. 1997. "The Study of Uncertainties in Physical Measurements." University Science Books, Sausalito, California.

## 状況設定

ある値<tex>$x$</tex>を得る実験を同じ条件のもとで<tex>$N$</tex>回行い，<tex>$N$</tex>個のデータを得たとする．

$$
    \lbrace x_i \rbrace_{i=1}^N = \{ x_1, x_2, \dots, x_N \}
$$

各<tex>$x_i$</tex>には誤差が含まれる．そこで，以下では各<tex>$x_i$</tex>はある未知の確率分布<tex>$p(x)$</tex>に従う確率変数<tex>$x$</tex>から独立同分布サンプルされた値として取り扱う．

$$
    x_i \underset{\text{i.i.d.}}{\sim} p(x)
$$

## 確率密度関数

「<tex>$x_i$</tex>が確率分布<tex>$p(x)$</tex>に従う」というとき，ここでは次のようなことを意味するとする．<tex>$x_i$</tex>を<tex>$N$</tex>個集める．<tex>$N$</tex>をどんどん大きくしていき，得られた実現値についてのヒストグラムを描くと，あるなめらかなグラフに漸近していく．このグラフを表す関数が<tex>$p(x)$</tex>である．

とくに実数<tex>$r_1 \lt r_2$</tex>について，実現値<tex>$x_i$</tex>が<tex>$r_1 \le x_i \le r_2$</tex>となる確率は

$$
    \operatorname{Pr}[r_1 \le x_i \le r_2] = \int_{r_1}^{r_2} dx p(x)
$$

で表されることから，<tex>$p(x)$</tex>を**確率密度関数 (probability density function; pdf)** と呼ぶ．

## 確率分布の平均と分散

確率分布<tex>$p(x)$</tex>の**<tex>$\alpha$</tex>まわりの<tex>$n$</tex>次モーメント (n-th moment)** を次式で定義する．

$$
\begin{aligned}
    \left\langle (x - \alpha)^n \right\rangle \coloneqq \int dx x^n p(x)
\end{aligned}
$$

特に<tex>$0$</tex>まわりの<tex>$1$</tex>次モーメントを**期待値 (expected value)** または**平均 (mean)** といい，<tex>$\mathrm E[x]$</tex>と表す．また期待値まわりの<tex>$2$</tex>次モーメントを**分散 (variance)** といい，<tex>$\mathrm V[x]$</tex>と表す．さらに分散の正の平方根を母集団の**標準偏差 (standard deviation)** という．

$$
\begin{aligned}
    & \text{expected value} &       \mathrm E[x] &\coloneqq \left\langle x \right\rangle \\
    & \text{variance} &             \mathrm V[x] &\coloneqq \left\langle (x - \left\langle x \right\rangle )^2 \right\rangle = \left\langle x^2 \right\rangle - \left\langle x \right\rangle^2 \\
    & \text{standard deviation} &   \sqrt{\mathrm V[x]}
\end{aligned}
$$

これらはしばしば次のように記号が付けられる．

$$\begin{aligned}
    & \text{expected value} &       \mu_x &= \mathrm E[x] \\
    & \text{variance} &             \sigma_x^2 &= \mathrm V[x] \\
    & \text{standard deviation} &   \sigma_x &= \sqrt{\mathrm V[x]}
\end{aligned}$$

期待値や分散のように，確率分布<tex>$p(x)$</tex>を特徴づける値のことを**母数 (parameter; パラメータ)** という．

## 標本の平均と分散

ある<tex>$N$</tex>回の実験によって得られた実現値の集合<tex>$\lbrace x_i \rbrace_{i=1}^{N}$</tex>を**標本 (sample; サンプル)** といい，<tex>$N$</tex>を標本サイズという．標本<tex>$\lbrace x_i \rbrace_{i=1}^N$</tex>の**標本平均 (sample mean)** ，**標本分散 (sample variance)** ，ならびに標本の**標準偏差 (standard deviation)** を次式で定義する．

$$\begin{aligned}
    & \text{sample mean} &
    \overline x &\coloneqq \frac{1}{N} \sum_{i=1}^N x_{i} \\
    & \text{sample variance} &
    s_x^2 &\coloneqq \overline{(x - \overline x)^2} = \overline{x^2} - \overline{x}^2 \\
    & \text{standard deviation} &
    s_x &\coloneqq \sqrt{s_x^2}
\end{aligned}$$

標本平均や標本分散のように，標本<tex>$\lbrace x_i \rbrace_{i=1}^N$</tex>を特徴づける値のことを**標本統計量 (sample statistic)** または単に**統計量 (statistic)** という．
