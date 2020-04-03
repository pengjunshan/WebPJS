
const HtmlWebpackPlugin = require('html-webpack-plugin')
//1.引入mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


// 设置nodejs环境变量 默认是production环境
// process.env.NODE_ENV = 'development';

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 'style-loader',
                    //3. 这个loader取代style-loader。作用：提取js中的css成单独文件
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    //帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
                    {
                        // 使用loader的默认配置
                        // 'postcss-loader',
                        // 修改loader的配置
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                // postcss 的插件
                                require('postcss-preset-env')()
                            ]
                        }
                    }
                ]
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        //2.配置插件
        new MiniCssExtractPlugin({
            //对输出的css文件进行文件夹配置和重命名
            filename: 'css/bundle.css'
        })
    ]
}