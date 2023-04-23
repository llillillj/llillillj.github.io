const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // outputDir:'../docs', // ファイルの出力先ルート
  publicPath: process.env.NODE_ENV === 'production'
  ? '/weather-app/'   //任意
  : '/',
  pages: { // 特に今回書く必要はない
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html', // webview フォルダからの相対パス
    },
  }
})
