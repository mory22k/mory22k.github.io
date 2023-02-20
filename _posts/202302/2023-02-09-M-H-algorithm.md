---
layout: post
title: "[MCMC2] メトロポリス・ヘイスティングス法"
categories: note
description: 基本的なMCMC法であるメトロポリス・ヘイスティングス法を概説する．
tags: MCMC Monde_Carlo_method
katex: true
---

基本的なMCMC法であるメトロポリス・ヘイスティングス法を概説する．

{% include contents/mcmc.md %}

## メトロポリス・ヘイスティングス法

**メトロポリス・ヘイスティングス法 (the Metropolis-Hastings algorithm; M-H法)** は**MCMC法**の一つ．直接サンプリングすることが困難な確率分布からサンプルを生成するために使用される．「提案」という操作のアルゴリズムを工夫することで，**メトロポリス法**，**ギブスサンプリング**，**ハミルトニアン・モンテカルロ法**などに帰着する．M-H法はこれらの一般的な形であると解釈すれば良いだろう．

## 準備

まず「提案分布」と呼ばれる条件付き確率分布<tex>$Q(y | x)$</tex>を準備する．続いて「受理確率」と呼ばれる関数<tex>$A(y | x)$</tex>を準備する．この関数は次式で表される．

$$
    A(y | x) = \frac{P(y) Q(x | y)}{P(x) Q(y | x)}
$$

なお，正確には「確率」と呼ぶにはこれを<tex>$\min$</tex>でラップして<tex>$\min( A(y | x), 1 )$</tex>とするべきだが，アルゴリズム的には何も変化しないので省略した．

## アルゴリズム

確率分布<tex>$P(x)$</tex>に従う乱数列<tex>$X$</tex>を生成する．

<tex>
$\quad
\begin{aligned}
    &1. && X \gets \{\} \\
    &2. && \text{for } t \in \{1, 2, \dots, n\} : \\
    &3. && \qquad y \sim Q(y | x) \\
    &4. && \qquad r \sim {\cal U}(r | 0, 1) \\
    &5. && \qquad \text{if } A(y | x) \gt r : \\
    &6. && \qquad \qquad x \gets y \\
    &7. && \qquad X \gets X \cup \{x\} \\
    &8. && \operatorname{return} X
\end{aligned}
$
</tex>

なお，以上において<tex>$\cal U(0, 1)$</tex>は0以上1未満の連続一様分布を表す．また4. 以降については，次のような内容 (メトロポリステスト) を意味している．

- 確率 <tex>$\min( A(y | x), 1 )$</tex> で提案を受理 (accept)，<tex>$x \gets y$</tex>．
- さもなくば棄却 (reject)，<tex>$y$</tex>を捨てる．

したがって，上記をもう少し端折って書くと

1. 提案: <tex>$y \sim Q(y | x)$</tex>
2. メトロポリステスト: <tex>$\min( A(y | x), 1 )$</tex>の確率で提案を受理

と表現できる。

## 注意事項

このアルゴリズムは，提案分布<tex>$Q(y | x)$</tex>から乱数をサンプルする操作が要求される．したがって，可能な限りサンプルが容易な分布であることが望ましい．例えば次のような標準正規分布などはシンプルで使いやすい．

$$
Q(\bm y | \bm x)
= \mathcal N_N(\bm y | \bm 0, \bm I)
\propto \exp \! \left( -\frac{1}{2} \| \bm y \|_2^2 \right)
$$

ただし，単にシンプルなだけでは不十分で，受理確率<tex>$A(y | x)$</tex>をできるだけ1に近づけたいという要望もある．なぜなら，この確率が小さすぎると，同じサンプルを頻繁に出力してしまうようになるため，乱数として取り扱えるようになるために時間がかかりすぎるからである．

$$
    \text{make } A(y | x) = \frac{P(y) Q(x | y)}{P(x) Q(y | x)} \text{ as large as possible!}
$$

提案分布をシンプルにしつつ，受理確率も高くするようなものが，優れたMH法というわけである．
