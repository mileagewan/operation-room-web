'use strict';
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');
const resolve = (dir) => path.resolve(__dirname, dir);
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const cdn = {
  // 忽略打包的第三方库
  externals: {},
  // 通过cdn方式使用
  js: [
    'https://cdn.bootcdn.net/ajax/libs/vConsole/3.9.0/vconsole.min.js'
  ],
  css: [],
};

module.exports = {
  publicPath: '/', // 基本路径
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'static',
  indexPath: 'index.html',
  productionSourceMap: false, // 关闭生产环境的 source map
  chainWebpack: (config) => {
    // 配置cdn引入
    config.plugin('html').tap((args) => {
      args[0].cdn = cdn;
      return args;
    });
  },
  // 这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  configureWebpack: (config) => {
    // 忽略打包配置
    config.externals = cdn.externals;
    // 生产环境相关配置
    if (isProduction) {
      // gzip压缩
      const productionGzipExtensions = ['html', 'js', 'css'];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false, // 删除原文件
        })
      );
      // 公共代码抽离
      config.optimization = {
        // 分割代码块
        splitChunks: {
          cacheGroups: {
            // 公用模块抽离
            common: {
              chunks: 'initial',
              minSize: 0, // 大于0个字节
              minChunks: 2, // 抽离公共代码时，这个代码块最小被引用的次数
            },
            // 第三方库抽离
            vendor: {
              priority: 1, // 权重
              test: /node_modules/,
              chunks: 'initial',
              minSize: 0, // 大于0个字节
              minChunks: 2, // 在分割之前，这个代码块最小应该被引用的次数
            },
          },
        },
      };
    }
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
    open: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: true,
    // proxy: {
    //   '/api': {
    //     // 代理地址
    //     target: process.env.VUE_APP_API,
    //     changeOrigin: true, // 是否跨域
    //     secure: false,
    //     pathRewrite: {
    //       '^/api': '/api/ctrl', // 测试环境
    //       // '/api': '', //需要rewrite重写的, //本地联调
    //     },
    //   },
    // },
    proxy: {
      '/comom': {
        target: process.env.VUE_APP_API,
        // target: 'http://124.196.4.220:8088/',
        //  target: 'http://192.168.223.194:8080',
        // target: 'http://192.168.223.194:7311',
        // target: 'http://192.168.223.194:7311',
        // target: 'http://192.168.201.99:7311',
        changeOrigin: true,
        pathRewrite: {
          '^/comom': '', // 开发环境
        },
      },
    },
  }
};
