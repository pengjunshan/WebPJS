
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * entry: 入口起点
 * 方式一：单入口 string -->'./src/index.js'
 *      打包形成一个chunk。 输出一个bundle文件。此时chunk的名称默认是 main。
 * 
 * 方式二：多入口 array -->['./src/index.js','./src/add.js']
 *      所有入口文件最终只会形成一个chunk, 输出出去只有一个bundle文件。
 * 
 * 方式三：多入口 object{index:'./src/index.js', add:'./src/add.js'}
 *      有几个入口文件就形成几个chunk，输出几个bundle文件,此时chunk的名称是 key。
 */
module.exports = {
    mode: 'development',
    // entry:'./src/index.js',方式一
    // entry:['./src/index.js','./src/add.js'],方式二
    entry: {//方式三
        index: './src/index.js',
        add: './src/add.js',
        home:'./src/home.js'
    },

    //出口
    output: {
        //文件名 [name]根据入口的名称定义
        filename: 'js/[name].js',
        //输出文件目录（将来所有资源输出的公共目录）
        path: __dirname + '/dist',
        // 所有资源引入公共路径前缀
        publicPath: '/',
        // 非入口chunk的名称
        chunkFilename: 'js/[name]_chunk.js',
        // library: '[name]', // 整个库向外暴露的变量名
        // libraryTarget: 'window' // 变量名添加到哪个上 browser
        // libraryTarget: 'global' // 变量名添加到哪个上 node
        // libraryTarget: 'commonjs'
    },
    plugins: [
        //多出口 一般和多入口对应
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename:'index.html',
            //只引入index.js，不指定的话会引入index、home.js
            chunks:['index']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename:'home.html',
            chunks:['home']
        }),
    ]
}