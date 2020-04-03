
module.exports = {
    mode:'development',//开发环境  development:开发环境  production:生成环境
    entry:'./src/index.js',//入口文件
    output:{//出口配置
        filename:'index.js',//出口文件名
        path:__dirname+'/dist'//出口路径
    }
}