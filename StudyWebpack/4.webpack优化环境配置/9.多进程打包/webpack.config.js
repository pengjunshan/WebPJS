
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//安装 thread-loader

module.exports = {
  //开启生产环境
  mode: 'production',
  // 单页面入口
  entry: './src/index.js',
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: __dirname + '/dist'
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        // 处理css资源
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader:'thread-loader',
            options:{
              workers:2//设置进程数量
            }
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/bundle.css'
    })
  ]
}