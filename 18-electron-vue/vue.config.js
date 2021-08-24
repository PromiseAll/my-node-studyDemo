const { resolve } = require("path");
module.exports = {
  // 合并webpack 配置
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve(__dirname, "src/src-view/"),
      },
    },
  },
  pages: {
    index: {
      // page 的入口
      entry: "src/src-view/main.js",
      // 模板来源
      template: "src/src-view/public/index.html",
    },
  },
};
