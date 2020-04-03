
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
module.exports = {
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
        }),
        // 告诉webpack哪些库不参与打包，同时使用时的名称也得变~
        new webpack.DllReferencePlugin({
            manifest:__dirname+'/dll/manifest.json'
        }),
        // 将某个文件打包输出去，并在html中自动引入该资源
        new AddAssetHtmlWebpackPlugin({
            filepath:__dirname+'/dll/jquery.js'
        })
    ],
   

}