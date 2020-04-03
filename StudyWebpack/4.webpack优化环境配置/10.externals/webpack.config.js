
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //模式
    mode:'production',//开发环境  development:开发环境  production:生成环境
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',//文件名
        path:__dirname+'/dist'//出口路径
    },
    devtool:'veal-source-map',
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    // 移除某些包被打包进来
    externals:{
        jquery:'jQuery'
    }

}