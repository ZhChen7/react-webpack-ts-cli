const path = require('path');
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const config = require('../config')
const { ZcPlugin } = require('../plugin/customPlugin.js')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  optimization: {
    usedExports: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          safari10: true
        },
        extractComments: false //禁止生成LICENSE.txt文件
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      maxInitialRequests: 4,
      cacheGroups: {
        translation: {
          test: /.*\.json/,
          name: 'trans.chunk',
          chunks: 'initial',
          minChunks: 1
        },
        react: {
          test: /[\\/]node_modules[\\/](react|react-.*|rxjs)[\\/]/,
          name: 'react',
          chunks: 'initial',
          minChunks: 1
        },
        polyfill: {
          test: /[\\/]node_modules[\\/](@babel\/polyfill|classlist-polyfill)[\\/]/,
          name: 'polyfill',
          chunks: 'initial',
          minChunks: 1
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/](intl|axios|classnames|dayjs|js-cookie|lodash)[\\/]/,
          name: 'vendor.chunk',
          chunks: 'initial',
          minChunks: 1
        },
      }
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js',
    chunkFilename: '[id].[chunkhash].js',
    publicPath: '/'
  },
  plugins: [
    new ZcPlugin({
      productName: 'zc',
      platform: 'pc'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
})

module.exports = webpackConfig
