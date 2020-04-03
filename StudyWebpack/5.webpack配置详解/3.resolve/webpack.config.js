
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        filename: 'js/[name].js',
        path: __dirname + '/dist',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // 配置多个loader使用use
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    resolve: {
        // 配置解析模块路径别名: 优点简写路径 缺点路径没有提示
        alias: {
            $css: __dirname + '/src/css'
        },
        // 配置省略文件路径的后缀名只会匹配到一个， 一般js和css文件名相同，所以不建议匹配css文
        extensions:['.js', '.json', '.jsx', '.css']
    }
}