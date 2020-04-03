
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:__dirname+'/dist'
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
        })
    ],
     // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
    // 特点：只会在内存中编译打包，不会有任何输出
    // 启动devServer指令为：npx webpack-dev-server
    devServer: {
        // 项目构建后路径
        contentBase:__dirname+'/dist',
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true,
         // 开启HMR功能
        //  hot: true,
      },
      //监控 实时打包
    // watch:true,
    // //监控的配置项
    // watchOptions:{
    //     poll:1000,//每秒询问1000次
    //     aggregateTimeout:500,//防抖 停留500毫秒后再打包
    //     ignored:/node_modules/  //不需要监控的文件
    // }
   
}