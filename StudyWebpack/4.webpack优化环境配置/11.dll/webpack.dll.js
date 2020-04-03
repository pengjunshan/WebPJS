/*
  使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
    当你运行 webpack 时，默认查找 webpack.config.js 配置文件
    需求：需要运行 webpack.dll.js 文件
      --> webpack --config webpack.dll.js
*/
const webpack = require('webpack')
module.exports = {
    //需要打包的第三方库
    entry:{
        jquery:['jquery'],
        // vue:['vue']
    },
    output:{
        filename:'[name].js',
        path:__dirname+'/dll',
        library:'[name]_[hash:10]'// 打包的库里面向外暴露出去的内容叫什么名字
    },
    plugins:[
        // 打包生成一个 manifest.json --> 提供和jquery映射
        new webpack.DllPlugin({
            name:'[name]_[hash:10]',//映射库暴露出的名称
            path:__dirname+'/dll/manifest.json'//文件地址
        })
    ],
    mode: 'production'
}