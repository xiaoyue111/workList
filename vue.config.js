const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  // devServer: {},
  // publicPath: "./",
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@images', resolve('src/assets/images'))
      .set('@components', resolve('src/components'))
      .set('@assets', resolve('src/assets'))
      .set('@view', resolve('src/view'))
  },
  configureWebpack: (config) => {
    config.externals = {
      vue: 'Vue',
      'element-ui': 'ELEMENT',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      vant: 'Vant',
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("autoprefixer")({
            // 配置使用 autoprefixer
            overrideBrowserslist: ["last 15 versions"]
          }),
          require("postcss-pxtorem")({
            rootValue: 75,
            selectorBlackList: ["ig"],
            propList: ["*"],
            exclude: /node_modules/
          })
        ]
      }
    }
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 8081,
    proxy: {
      "/attr": {
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/attr": "/attr",
        },
      },
    },
  },
}



