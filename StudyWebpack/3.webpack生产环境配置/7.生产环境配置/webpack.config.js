
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 抽离css插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 复用loader
const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        // 还需要在package.json中定义browserslist
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [require('postcss-preset-env')()]
        }
    }
];
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                // 处理css
                test: /\.css$/,
                use: [...commonCssLoader]
            },
            {
                //处理less
                test: /\.less$/,
                use: [...commonCssLoader, 'less-loader']
            },
            /*
                正常来讲，一个文件只能被一个loader处理。
                当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
                    先执行eslint 在执行babel
            */
            {
                // 在package.json中eslintConfig --> airbnb
                test: /\.js$/,
                exclude: /node_modules/,
                // 优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        useBuiltIns: 'usage',
                        corejs: {version: 3},
                        targets: {
                          chrome: '60',
                          firefox: '50'
                        }
                      }
                    ]
                  ]
                }
              },
              {
                test: /\.(jpg|png|gif)/,
                loader: 'url-loader',
                options: {
                  limit: 8 * 1024,
                  name: '[hash:10].[ext]',
                  outputPath: 'imgs',
                  esModule: false
                }
              },
              {
                test: /\.html$/,
                loader: 'html-loader'
              },
              {
                exclude: /\.(js|css|less|html|jpg|png|gif)/,
                loader: 'file-loader',
                options: {
                  outputPath: 'media'
                }
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
              }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css'
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ]
}