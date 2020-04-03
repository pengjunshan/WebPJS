
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  //开启生产环境
  mode: 'production',
  // 单页面入口
  entry: './src/index.js',
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: __dirname + '/dist'
  },
  devtool:'eval-source-map',
  module: {
    rules: [
      {
        // 处理css资源
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
          ]
        }
      }
    ]
  },
   /*
    1. 可以将node_modules中代码单独打包一个chunk最终输出
    2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
  */
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename:'css/bundle.css'
  })
  ]
}