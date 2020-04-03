
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bunder.js',
        path: __dirname + '/dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            name: 'index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            //处理其它资源
            {
                //excude排除法 后期手动添加
                exclude: /\.(css|js|html|less|png|jpg|jpeg|gif)$/,
                //使用file-loader
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    }
}