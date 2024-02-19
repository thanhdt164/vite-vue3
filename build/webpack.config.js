'use strict'

const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

function resolve(dir){
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'development',
  /** Context: Ngữ cảnh bổ sung giúp webpack tìm file khi cấu hình đường dẫn tương đối */
  context: path.resolve(__dirname, '../'),
  /** Entry: Xác định điểm bắt đầu cho webpack biết để thực hiện bundle */
  entry: '../src/index.js',
  /** Output: Xác định đầu ra của packages sau khi bundle */
  output:{
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
      '@': resolve('src'),
    },
  },
  module:{
    rules: [
      { 
        test: /\.vue$/,
        loader: 'vue-loader'
        // include: [resolve('src')],
        // exclude: resolve('node_modules')
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ],
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
};