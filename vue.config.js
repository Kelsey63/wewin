module.exports = {
  devServer: {
    disableHostCheck: true,
    host: '192.168.1.111', // host改成自己的IP,
    bonjour: true,
    open: true, // 配置后自动启动浏览器
    port: 8080, // 端口号
    hotOnly: true, // 热更新
    proxy: {
      // 配置多个代理
      '/api': {
        target: 'http://121.11.118.203:9813',
        changeOrigin: true,
        ws: true, // websocket支持
        secure: false,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "./src/assets/styles/variables.scss";',
      },
    },
    sourceMap: true,
  },

  publicPath: '/wewin',
  runtimeCompiler: true,
  outputDir: 'wewin',
  lintOnSave: false,
};
