const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir:'../doc', // ファイルの出力先ルート
  publicPath: './webview', // index.html などの出力されるファイルに書き込まれる、ルートとなるディレクトリ
  pages: { // 特に今回書く必要はない
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html', // webview フォルダからの相対パス
    },
  }
})
