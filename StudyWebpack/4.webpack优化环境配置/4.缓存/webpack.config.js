
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/*
  缓存：
    babel缓存
      cacheDirectory: true
      --> 让第二次打包构建速度更快
*/
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash:10].js',
    path: __dirname + '/dist'
  },
  devServer: {
    contentBase: __dirname+'/dist',
    compress: true,
    port: 3000,
    open: true,
    // 模块热替换
    // hot: true
  },
  module: {
    rules: [
     
      {
        // 以下loader只会匹配一个
        // 注意：不能有两个配置处理同一种类型文件
        oneOf: [
          {
            // 处理css资源
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                  '@babel/preset-env',
              ],
               // 开启babel缓存
              // 第二次构建时，会读取之前的缓存
              cacheDirectory:true
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
      filename: 'css/built.[contenthash:10].css'
    }),
  ]
}