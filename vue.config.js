// module.exports = {
//   lintOnSave: false
// }

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: './',
  filenameHashing: true,
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  productionSourceMap: false,
  transpileDependencies: ["fuse", "fuse.js"],
  devServer: {
    port: 8080,
    host: 'localhost',
    disableHostCheck: true,
    proxy: {
      // "/tmr": {
      //   // target: "http://192.168.110.43:8220",
      //   target: "http://fangwei.hefengzhimian.com",
      //   // pathRewrite: {
      //   //   "/tmr": "/crm"
      //   // },
      //   ws: true,
      //   changeOrigin: true,
      //   cookieDomainRewrite: { "*": "localhost" },
      //   cookiePathRewrite: {
      //     "*": "/tmr"
      //   }
      // },
      "/kidda": {
        // target: "http://192.168.110.43:8220",
        target: "http://app.aptenon.com",
        // target: "http://fangwei.hefengzhimian.com",
        // pathRewrite: {
        //   "/tmr": "/crm"
        // },
        ws: true,
        changeOrigin: true,
        cookieDomainRewrite: { "*": "localhost" },
        cookiePathRewrite: {
          "*": "/kidda"
        }
      },
    }
  },

};

