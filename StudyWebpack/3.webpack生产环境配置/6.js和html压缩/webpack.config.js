
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    //生产环境下js代码自动压缩
    mode:'production',
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:__dirname+'/dist'
    },
    module:{
        rules:[
           
        ]
    },
   plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // 压缩html代码
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
              }
        })
    ]
}