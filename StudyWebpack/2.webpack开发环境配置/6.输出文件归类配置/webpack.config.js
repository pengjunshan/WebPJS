
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    // 模式
    mode:'development',
    // 入口
    entry:'./src/js/index.js',
    // 出口
    output:{
        filename:'js/bundle.js',//输出路径增加js文件夹
        path:__dirname+'/dist'
    },
    //devServer自动化
    devServer:{
        contentBase:__dirname+'/dist',
        compress:true,
        port:3000,
        open:true
    },
    // 插件配置
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    // loader配置
    module:{
        rules:[
            {   // 处理css
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {   //处理less
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {   //处理图片
                test:/\.(png|jpg|jpeg|gif)/,
                loader:'url-loader',
                options:{
                    limit: 8*1024,
                    name:'[hash:10].[ext]',
                    exModule:false,
                    outputPath:'imgs'//图片输出增加imgs文件夹
                }
            },
            {   //处理html中图片
                test:/\.html$/,
                loader:'html-loader'
            },
            {   //处理其它文件
                exclude:/\.(css|html|js|less|png|jpg|jpeg|gif)/,
                loader:'file-loader',
                options:{
                    name:'[hash:10].[ext]',
                    outputPath:'media'//其它文件增加输出文件夹
                }
            }
        ]
    }
}