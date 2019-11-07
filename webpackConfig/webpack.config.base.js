/**
 *  created on 2019-10-30.
 *  author litao
 */
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const utils = require('./utils');
const resolveDir = utils.resolveDir;
module.exports = function (mode) {
    const isProduction = utils.isProduction(mode);
    return {
        mode: mode,
        resolve: {
            alias: {
                /*'vue$': 'vue/dist/vue.esm.js',*/
                '@src': resolveDir('src'),
                '@pages': resolveDir('src/pages'),
                '@components': resolveDir('src/components'),
                '@route': resolveDir('src/route'),
                '@render': resolveDir('render'),
                '@store': resolveDir('src/store'),
                '@lib': resolveDir('src/lib')
            },
        },

        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                // 它会应用到普通的 `.js` 文件
                // 以及 `.vue` 文件中的 `<script>` 块
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                // 它会应用到普通的 `.css` 文件
                // 以及 `.vue` 文件中的 `<style>` 块

            ]
        },
        plugins: [
            //new CleanWebpackPlugin(),
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin({
                filename: utils.cssFilename(isProduction),
                fileChunkname: utils.cssChunkFilename(isProduction)
            }),
            //new HtmlWebpackPlugin()
        ],
        optimization: {
            minimizer: [
                new TerserPlugin(),
                new OptimizeCssAssetsPlugin(),
            ]

        }

    };
}
