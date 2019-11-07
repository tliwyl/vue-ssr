/**
 *  created on 2019-10-30.
 *  author litao
 */
//此配置用于服务端渲染 编译 渲染所需要组件
const merge = require('webpack-merge');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.config.base.js');
const utils = require('./utils');


module.exports = function (mode) {
    const isProduction = utils.isProduction(mode);
    const styleLoaders = utils.styleLoaders(false);
    return merge(baseConfig(mode), {
        target: 'node',
        externals: [nodeExternals()],//防止打包nodejs的代码
        entry: './serverRender/index.js',
        output: {
            path: utils.resolveDir("dist"),
            filename: "./render.js",
            libraryTarget: 'commonjs2'
        },
        module: {
            rules: [].concat(styleLoaders)
        }
    });
}
