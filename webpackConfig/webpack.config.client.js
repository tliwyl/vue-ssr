/**
 *  created on 2019-10-30.
 *  author litao
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');
const baseConfig = require('./webpack.config.base.js');
const utils = require('./utils');
const isProduction = process.env.NODE_ENV === 'production';
function getPlugins(isProduction){
    const plugins = [];
    isProduction && plugins.push(new ManifestPlugin({
            generate: (seed, files) => {
                const manifestFiles = files.reduce(function (manifest, file) {
                    manifest[file.name] = file.path;
                    return manifest;
                }, seed);

                return manifestFiles;
            }
        }
    ));
    return plugins;
}
module.exports = function (mode) {
    const isProduction = utils.isProduction(mode);
    const styleLoaders = utils.styleLoaders(true);

    return merge(baseConfig(mode), {
        entry: './src/index.js',
        output: {
            path: utils.resolveDir("dist"),
            filename: utils.outputFilename(isProduction),
            chunkFilename: utils.outputChunkFilename(isProduction)
        },
        module: {
            rules: [].concat(styleLoaders)
        },
        plugins: getPlugins(isProduction)
        /*optimization: {
            splitChunks: {
                chunks: 'all',
                name: false,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                },
            }
        }*/
    })
};


