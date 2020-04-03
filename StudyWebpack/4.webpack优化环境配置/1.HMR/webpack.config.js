
const HtmlWebpackPlugin = require('html-webpack-plugin');
/*
  HMR: hot module replacement 热模块替换 / 模块热替换
    作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块） 
      极大提升构建速度
      
      样式文件：可以使用HMR功能：因为style-loader内部实现了~
      js文件：默认不能使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
        注意：HMR功能对js的处理，只能处理非入口js文件的其他文件。
      html文件: 默认不能使用HMR功能.同时会导致问题：html文件不能热更新了~ （不用做HMR功能）
        解决：修改entry入口，将html文件引入
*/
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    // entry: ['./src/index.js','./src/index.html'],
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    devServer: {
      contentBase: __dirname+'/dist',
      compress: true,
      port: 3000,
      open: true,
      // 开启HMR功能
      // 模块热替换
      hot: true
    },
    module: {
        rules: [
          {
            // 处理css资源
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        })
    ]
}