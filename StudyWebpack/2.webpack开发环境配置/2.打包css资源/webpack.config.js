
//引入插件
const HtmlWbpackPlugin = require('html-webpack-plugin')

module.exports = {
    //模式
    mode:'development',//开发环境  development:开发环境  production:生成环境
    //入口
    entry:'./src/index.js',
    //出口
    output:{
        filename:'bundle.js',//出口文件名
        path:__dirname+'/dist'//出口文件路径
    },
    //插件配置
    plugins:[
        new HtmlWbpackPlugin({
            template:'./src/index.html',//配置一个模板html
            name:'index.html'//生成的html名称
        })
    ],
    //loader配置
    module:{
        //rules是个数组，因为不同的配置需要不同的loader处理
        rules:[
            {
                //匹配以.css结尾的文件
                test:/\.css$/,
                // use数组中loader执行顺序：从右到左，从下到上 依次执行
                use:[
                    // 创建style标签，将js中的样式资源插入进行，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                //匹配以.less结尾的文件
                test:/\.less$/,
                use:[
                    // 创建style标签，将js中的样式资源插入进行，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
                    'css-loader',
                    // 将less文件编译成css文件
                    'less-loader'
                ]
            }
        ]
    }

}