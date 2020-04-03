
const HtmlWebpackPlugin = require('html-webpack-plugin')
//1.引入mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
                test:/\.css$/,
                use:[
                    // 'style-loader',
                    //3. 这个loader取代style-loader。作用：提取js中的css成单独文件
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[
                    // 'style-loader',
                    //3. 这个loader取代style-loader。作用：提取js中的css成单独文件
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        //2.配置插件
        new MiniCssExtractPlugin({
            //对输出的css文件进行文件夹配置和重命名
            filename:'css/bundle.css'
        })
    ]
}