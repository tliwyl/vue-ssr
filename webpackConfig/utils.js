/**
 *  created on 2019-10-31.
 *  author litao
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    resolveDir: function (dir) {
        return path.resolve(__dirname, '../', dir);
    },
    isProduction: function (mode) {
        return mode === 'production'
    },
    outputFilename: function (isProduction) {
        let filePath = 'static/js/';
        let filename = !isProduction ? 'bundle.js' : 'bundle-[hash:5].js';
        return filePath + filename;
    },
    outputChunkFilename: function (isProduction) {
        let filePath = 'static/js/';
        let filename = !isProduction ? '[name].chunk.js' : '[name].[chunkhash:8].js';
        return filePath + filename;
    },
    cssFilename: function (isProduction) {
        let filePath = 'static/css/';
        let filename = !isProduction ? '[name].css' : '[name]-[contenthash:8].css';
        return filePath + filename;
    },
    cssChunkFilename: function (isProduction) {
        let filePath = 'static/css/';
        let filename = !isProduction ? '[name].css' : '[name]-[contenthash:8].css';
        return filePath + filename;
    },
    styleLoaders: function (isExtractCss) {//在服务端渲染时不提取css不用style-loader
        const loaders = [
            'vue-style-loader'
        ];
        !!isExtractCss && loaders.push(MiniCssExtractPlugin.loader);
        loaders.push('css-loader')

        return [
            {
                test: /\.css$/,
                use: loaders
            },
            {
                test: /\.scss$/,
                use: [].concat(loaders, ['sass-loader'])
            }
        ]
    }
}
