
/*
  插件的使用步骤：
  plugins: 1. 下载  2. 引入  3. 使用
*/
//引入html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //模式
    mode:'development',//开发环境  development:开发环境  production:生成环境
    //入口
    entry:'./src/index.js',
    //出口
    output:{
        filename:'bundle.js',//文件名
        path:__dirname+'/dist'//出口路径
    },
    //配置插件
    plugins:[
        // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
        // 需求：需要有结构的HTML文件
        new HtmlWebpackPlugin({
            // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
            template:'./src/index.html'
        })
    ]

}