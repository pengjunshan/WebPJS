
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:__dirname+'/dist'
    },
    module:{
        rules:[
            {
                // 匹配以.js结尾的文件
                test:/\.js$/,
                // 排除node_modules下的文件，只检查自己写的代码，不检查第三方的代码
                exclude:/node_modules/,
                loader:'eslint-loader',
                options:{
                    //自动修复eslint错误
                    fix:true
                }

            }
        ]
    },
   plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}