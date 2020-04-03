
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            /*
               js兼容性处理：babel-loader @babel/core 
               1. 基本js兼容性处理 --> @babel/preset-env
                   问题：只能转换基本语法，如promise高级语法不能转换
               2. 全部js兼容性处理 --> @babel/polyfill  
                   问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~
               3. 需要做兼容性处理的就做：按需加载  --> core-js，就不需要@babel/polyfill包了
           */
            {
                // 匹配以.js结尾的文件
                test: /\.js$/,
                // 排除node_modules下的文件，只检查自己写的代码，不检查第三方的代码
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    // 预设：指示babel做怎么样的兼容性处理
                    presets: [
                      [
                        '@babel/preset-env',
                        {
                          // 按需加载
                          useBuiltIns: 'usage',
                          // 指定core-js版本
                          corejs: {
                            version: 3
                          },
                          // 指定兼容性做到哪个版本浏览器
                          targets: {
                            chrome: '60',
                            firefox: '60',
                            ie: '9',
                            safari: '10',
                            edge: '17'
                          }
                        }
                      ]
                    ]
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