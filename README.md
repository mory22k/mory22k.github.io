# mory22k.github.io

EleventyとSCSSで構築する静的ウェブサイトです。

## GitHub Pages への公開

`master` ブランチへの push で GitHub Actions がサイトをビルドし、GitHub Pages へデプロイします。
GitHub のリポジトリ設定で、公開ソースに `GitHub Actions` を選択してください。

```sh
npm ci
npm run build
```

生成物は `_site` に出力されます。
