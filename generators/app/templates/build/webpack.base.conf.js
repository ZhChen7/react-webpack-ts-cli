const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 提取css文件
const PostcssPresetEnv = require('postcss-preset-env') // 可让您将现代 CSS 转换为大多数浏览器可以理解的内容，根据您的目标浏览器或运行时环境确定您需要的 polyfill。
const PostcssFlexbugsFixes = require('postcss-flexbugs-fixes') // PostCSS插件 这个项目试图修复所有flexbug 的问题。
const PostcssCustomProperties = require('postcss-custom-properties');
const {
  EnvironmentPlugin
} = require('webpack')
const config = require('../config')

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = {
  entry: {
    index: path.join(__dirname, '../src')
  },
  watch: true,
  resolve: {
    alias: {
      '@/src': path.resolve(__dirname, '../src'),
    },
    extensions: ['.ts', '.tsx', '.scss', '.js']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash:4].bundle.js',
    chunkFilename: '[id].[chunkhash].js',
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.(css|scss|sass)?$/,
      use: [
        config.build.isDevelopment ?
          'style-loader' // 将 JS 字符串生成为 style 节点
          :
          {
            loader: MiniCssExtractPlugin.loader, // 单独提取css
            options: {
              publicPath: `${config.build.assetsHost}/`
            }
          },
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                PostcssCustomProperties({
                  preserve: false, // 如果想直接将样式转义，不留变量参数，则解除注释
                  importFrom: [
                    `./src/styles/palette.css`,
                  ]
                }),
                PostcssFlexbugsFixes,
                PostcssPresetEnv({
                  autoprefixer: {
                    flexbox: 'no-2009'
                  },
                  stage: 3
                })
              ]
            },
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader'
        } // 将 Sass 编译成 CSS
      ]
    },
    {
      test: /[^iconfont]\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: `${config.build.assetsRoot}/images/[name].[ext]`
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: `${config.build.assetsRoot}/media/[name].[ext]`
      }
    },
    {
      test: /iconfont.svg|\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: `${config.build.assetsRoot}/fonts/[name].[ext]`
      }
    }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new EnvironmentPlugin({
      VERSION: `v${config.build.packageVersion}@${Date.now()}`,
    }),
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'index.html',
      template: path.resolve(__dirname, '../template/index.html'),
    })
  ],
};
