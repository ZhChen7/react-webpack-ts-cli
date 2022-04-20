# react-webpack-typescript-template
> react-webpack-typescript-template 模版
>
> 方便后续脚手架工具生成
>
> 纯原生初始化搭建项目



- react + webpack + ts 基础模版

![](https://i.bmp.ovh/imgs/2022/04/20/56f60e6e3f58b431.png)

## 目录结构

~~~shell
react-webpack-typescript-template
├─README.md
├─package-lock.json
├─package.json
├─tsconfig.json
├─template
|    └index.html
├─src
|  ├─App.scss
|  ├─App.tsx
|  ├─index.tsx
|  ├─utils
|  |   ├─constant.ts
|  |   └index.ts
|  ├─styles
|  |   └palette.css
├─lib
|  ├─src
|  |  ├─App.d.ts
|  |  └index.d.ts
├─dist
|  ├─index.39c0.bundle.js
|  ├─index.39c0.bundle.js.map
|  ├─index.css
|  ├─index.css.map
|  └index.html
├─config
|   └index.js
├─build
|   ├─webpack.base.conf.js
|   └webpack.dev.conf.js
├─.git
|  ├─HEAD
|  ├─config
|  ├─description
|  ├─index
|  ├─packed-refs
|  ├─refs
|  |  ├─tags
|  |  ├─remotes
|  |  |    ├─origin
|  |  |    |   └HEAD
|  |  ├─heads
|  |  |   └main
|  ├─objects
|  |    ├─pack
|  |    |  ├─pack-d7d3efbbe8d6a72b379a1c9cdf34748a220066df.idx
|  |    |  └pack-d7d3efbbe8d6a72b379a1c9cdf34748a220066df.pack
|  |    ├─info
|  ├─logs
|  |  ├─HEAD
|  |  ├─refs
|  |  |  ├─remotes
|  |  |  |    ├─origin
|  |  |  |    |   └HEAD
|  |  |  ├─heads
|  |  |  |   └main
|  ├─info
|  |  └exclude
|  ├─hooks
|  |   ├─applypatch-msg.sample
|  |   ├─commit-msg.sample
|  |   ├─fsmonitor-watchman.sample
|  |   ├─post-update.sample
|  |   ├─pre-applypatch.sample
|  |   ├─pre-commit.sample
|  |   ├─pre-merge-commit.sample
|  |   ├─pre-push.sample
|  |   ├─pre-rebase.sample
|  |   ├─pre-receive.sample
|  |   ├─prepare-commit-msg.sample
|  |   └update.sample
~~~

## 已经安装相关依赖

~~~json
  "dependencies": {
    "browserslist": "^4.20.2",
    "classnames": "^2.3.1",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "webpack-merge": "^5.8.0"
  },
  "devDependencies": {
    "@babel/core": "^7.17.9",
    "@babel/preset-env": "^7.16.11",
    "@types/react": "^18.0.5",
    "@types/react-dom": "^18.0.1",
    "autoprefixer": "^10.4.4",
    "babel-loader": "^8.2.4",
    "clean-webpack-plugin": "^4.0.0",
    "cross-env": "^7.0.3",
    "css-loader": "^6.7.1",
    "html-webpack-plugin": "^5.5.0",
    "mini-css-extract-plugin": "^2.6.0",
    "postcss-custom-properties": "^12.1.7",
    "postcss-flexbugs-fixes": "^5.0.2",
    "postcss-loader": "^6.2.1",
    "postcss-preset-env": "^7.4.3",
    "sass": "^1.50.1",
    "sass-loader": "^12.6.0",
    "style-loader": "^3.3.1",
    "ts-loader": "^9.2.8",
    "typescript": "^4.6.3",
    "url-loader": "^4.1.1",
    "webpack": "^5.72.0",
    "webpack-bundle-analyzer": "^4.5.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.8.1"
  },
~~~



#### build/webpack.base.conf.js

~~~js
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

~~~



#### build/webpack.dev.conf.js

~~~js
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


module.exports = webpackConfig

~~~

