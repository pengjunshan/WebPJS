
const webpack = require('webpack');

module.exports = {

    chainWebpack:config=>{
        //发布模式
        config.when(process.env.NODE_ENV === 'production',config=>{
            //entry找到默认的打包入口，调用clear则是删除默认的打包入口
            //add添加新的打包入口
            config.entry('app').clear().add('./src/main-prod.js')

             //使用externals设置排除项
             config.set('externals',{
                vue:'Vue',
                'vant': 'vant',
                'vue-router':'VueRouter',
                axios:'axios',
                echarts:'echarts'
            })

              //使用插件
              config.plugin('html').tap(args=>{
                //添加参数isProd
                args[0].isProd = true
                return args
            })
        })
        //开发模式
        config.when(process.env.NODE_ENV === 'development',config=>{
            config.entry('app').clear().add('./src/main-dev.js')
             //使用插件
             config.plugin('html').tap(args=>{
                //添加参数isProd
                args[0].isProd = false
                return args
            })
        })
    },

    // devServer: {
    //     proxy: {
    //         '/api': {
    //             // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
    //             target: 'http://220.189.213.2:44045/pressure-meter/meterController/',
    //             // 允许跨域
    //             changeOrigin: true,
    //             ws: true,
    //             pathRewrite: {
    //                 '^/api': ''
    //             }
    //         }
    //     }
    // },
    configureWebpack: {
        plugins: [
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "windows.jQuery":"jquery"
            })
        ]
      }
}