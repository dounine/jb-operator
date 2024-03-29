const port = 8082
const {name} = require('./package.json')
module.exports = {
    // 生产环境不生成css跟js对应的map文件
    productionSourceMap: false,
    devServer: {
        hot: true,
        port,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            "/api": {
                target: `http://localhost:${port}`,
                ws: true,
                changeOrigin: true, // 是否改变域名
                pathRewrite: {
                    "^/api": ""
                }
            }
        },
        before: require('./mock/mock.js')
    },
    configureWebpack: {
        output: {
            library: `${name}`,
            libraryTarget: 'umd',
        }
    },
    publicPath: process.env.NODE_ENV === 'production' ? './' : `/`
}