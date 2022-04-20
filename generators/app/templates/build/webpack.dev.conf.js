const path = require('path');
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.js')
const config = require('../config')

const webpackConfig = merge(baseWebpackConfig,{
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash:4].bundle.js',
    chunkFilename: '[id].[chunkhash].js',
    publicPath: '/',
    clean: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-map',
  cache: true,
  devServer: {
    // 该配置项允许配置从目录提供静态文件的选项（默认是 'public' 文件夹）。将其设置为 false 以禁用：
    static: [
      path.resolve(__dirname, config.build.assetsRoot)
    ],
    host: config.dev.host,
    port: config.dev.port,
    open: [`/show`],
    allowedHosts: 'auto',
    hot: true,
    webSocketServer: 'ws',
    client: {
      overlay: {
        warnings: false,
        errors: true
      },
    },
    historyApiFallback: true,   // 使用HTML5 History API时，index.html可能需要提供页面来代替任何404响应。devServer.historyApiFallback通过将其设置为启用true：
  },
})

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
