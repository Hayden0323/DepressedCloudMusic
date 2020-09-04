const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  publicPath: './',

  outputDir: 'dist',

  // 是否生成SourceMap文件定位错误（文件会比较多影响性能建议取消）
  productionSourceMap: false,

  devServer: {
    port: 4000
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve('src'))
      .set('assets', path.resolve('src/assets'))
      .set('components', path.resolve('src/components'))
      .set('views', path.resolve('src/views'))
  },

  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/, // 对识别到的文件进行压缩
            threshold: 10240, // 对超过10k的数据压缩
            deleteOriginalAssets: false // 不删除源文件，如果nginx开启了gzip可以删除
          })
        ]
      }
    }
  }
}
