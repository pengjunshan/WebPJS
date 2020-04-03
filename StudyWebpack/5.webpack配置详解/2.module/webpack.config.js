
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'js/[name].js',
        path: __dirname + '/dist',
    },
    module: {
        // loader配置
        rules: [
            {
                test: /\.css$/,
                // 配置多个loader使用use
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                // 配置单个loader使用loader
                loader: 'babel-loader',
                // 排除node_modules下的js
                exclude: /node_modules/,
                // 只匹配src下的js
                include: __dirname + '/src',
                // 优先执行
                enforce: 'pre',
                // 延后执行
                enforce: 'post',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                // 以下配置中loader只会生效一个
                oneOf: []
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}