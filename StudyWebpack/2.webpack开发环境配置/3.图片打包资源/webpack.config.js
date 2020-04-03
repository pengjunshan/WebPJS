
const HtmlWebpckPlugin = require('html-webpack-plugin')
module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:__dirname+'/dist'
    },
    plugins:[
        new HtmlWebpckPlugin({
            template:'./src/index.html',
            name:'idnex.html'
        })
    ],
    module:{
        rules:[
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                //匹配图片结尾的文件，可手动添加
                test:/\.(png|jpg|jpeg|gif)/,
                // 使用url-loader
                loader:'url-loader',
                options:{
                    // 图片大小小于8kb，就会被base64处理
                    // 优点: 减少请求数量（减轻服务器压力）
                    // 缺点：图片体积会更大（文件请求速度更慢）
                    limit:8*1024,
                     // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
                    // 解析时会出问题：[object Module]
                    // 解决：关闭url-loader的es6模块化，使用commonjs解析
                    esModule:false,
                     // 给图片进行重命名
                    // [hash:10]取图片的hash的前10位
                    // [ext]取文件原来扩展名
                    name: '[hash:10].[ext]'
                }
            },
            {
                //匹配.html结尾的文件
                test:/\.html/,
                // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
                loader:'html-loader'
            }
        ]
    }
}