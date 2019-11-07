/**
 *  created on 2019-11-07.
 *  author litao
 */
const env = process.argv[2];
const webpack = require('webpack');
const rm = require('rimraf');
const utils = require('../webpackConfig/utils');
const clientConfig = require('../webpackConfig/webpack.config.client')(env);
const serverConfig = require('../webpackConfig/webpack.config.server')(env);
const clientCompiler = webpack(clientConfig);
const serverCompiler = webpack(serverConfig);

rm(utils.resolveDir('dist/static'), err => {
    if (err) throw err
    clientCompiler.run(function (err, stats) {
        if (err) throw error;

        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');
        console.log('client compiler done');
    });
});
serverCompiler.run(function (err,stats) {
    if (err) throw error;
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n');
    console.log('client compiler done');
});
