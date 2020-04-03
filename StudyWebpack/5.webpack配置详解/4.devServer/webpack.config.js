
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
            template: './src/index.html',
            filename:'index.html'
        })
    ],
    resolve: {
        // 配置解析模块路径别名: 优点简写路径 缺点路径没有提示
        alias: {
            $css: __dirname + '/src/css'
        },
        // 配置省略文件路径的后缀名只会匹配到一个， 一般js和css文件名相同，所以不建议匹配css文
        extensions: ['.js', '.json', '.jsx']
    },
    devServer: {
        // 运行代码目录
        contentBase: __dirname + '/dist',
        // 监视 contentBase 目录下的所有文件，一旦文件变化就会 reload
        watchContentBase: true,
        watchOptions: {
            // 忽略文件
            ignored: /node_modules/
        },
        // 启动压缩
        compress: true,
        // 端口号
        port: 5000,
        // 域名
        host: 'localhost',
        // 自动打开浏览器
        open: true,
        // 开启HMR功能
        hot: true,
        // 不要显示启动服务器日志信息
        clientLogLevel: 'none',
        // 除了一些基本启动信息以外，其他内容都不要显示
        quiet: true,
        // 如果出错了，不要全屏提示~
        overlay: false,
        // 服务器代理 --> 解决开发环境跨域问题
        proxy: {
            // 一旦devServer(5000)服务器接受到 /api/xxx 的请求，就会把请求转发到另外一个服务器(3000)
            '/api': {
                target: 'http://localhost:3000',
                // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }

}