/**
 *  created on 2019-10-30.
 *  author litao
 */
const env = process.argv[2];
const webpack = require('webpack');
const express = require('express');
const path = require('path');
const devMiddleWare = require('webpack-dev-middleware');
//const hotMiddleware = require('webpack-hot-middleware');
const isObject = require('is-object');
const MFS = require('memory-fs');

const render = require('vue-server-renderer').createRenderer();
const webpackConfig = require('../webpackConfig/webpack.config.client.js')(env);
const webpackServerConfig = require('../webpackConfig/webpack.config.server')(env);

const app = express();
const mfs = new MFS();
const compiler = webpack(webpackConfig);
const renderCompiler = webpack(webpackServerConfig);
const appData = require('../data/index.json');
const apiRoutes = express.Router();
/*const hotMiddlewareInstance = hotMiddleware(compiler, {
    log: () => {}
});*/


apiRoutes.get('/home', function (req, res) {
    res.json(appData.home);
});

apiRoutes.get('/news', function (req, res) {
    res.json(appData.news);
});
let createApp = function () {
};
renderCompiler.outputFileSystem = mfs;
renderCompiler.watch({
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/,
}, (err, stats) => {
    if (err) return console.log(err);
    console.log('compiler done');
    // 编译到内存的路径
    const renderPath = path.join(webpackServerConfig.output.path, webpackServerConfig.output.filename);
    // 读取内容并转成String类型
    const content = mfs.readFileSync(renderPath, 'utf-8').toString();
    // 因为读取的是js文件，所以直接执行可以获取到输出的内容
    // new Function 找不到module 所以改用eval，由于在后端所以避免了风险
    createApp = eval(content).default;
});
app.use('/api', apiRoutes);
app.use(devMiddleWare(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    serverSideRender: true,
}));

app.use((req, res) => {
    const context = {url: req.url};
    createApp(context).then((appComponent) => {
        render.renderToString(appComponent).then(function (content) {
            res.send(htmlFactory(content, context, res));
        }, () => {

        })
    }, (error) => {
        res.status(error.code).end(error.msg);
    }).catch((error) => {
        console.log(error);
    })
    //res.send(htmlFactory('', res));
});
app.use(express.static('static'));
app.listen(8080);

function normalizeAssets(assets) {
    if (isObject(assets)) {
        return Object.values(assets);
    }

    return Array.isArray(assets) ? assets : [assets];
}

function htmlFactory(content, context, res) {
    const statsJson = res.locals.webpackStats.toJson();
    const outputPath = statsJson.outputPath;
    const assetsByChunkName = statsJson.assetsByChunkName;
    const fs = res.locals.fs;
    const state = context.state || {};
    return (`
            <html>
              <head>
                <title>My App</title>
               ${extractMainCss(assetsByChunkName, fs)}
              </head>
              <body>
                <div id="app">
                ${content}
                </div>
                <script>
                    window.context=${JSON.stringify({state})}
                </script>
                ${extractMainJs(assetsByChunkName, fs)}
              </body>
            </html>
           `);
}

function extractMainCss(assetsByChunkName, fs) {

    return normalizeAssets(assetsByChunkName.main)
        .filter((path) => path.endsWith('.css'))
        .map(path => `<link rel="stylesheet" href="${path}" ></link>`)
        .join('\n');
}

function extractMainJs(assetsByChunkName, fs) {
    return normalizeAssets(assetsByChunkName.main)
        .filter((path) => path.endsWith('.js'))
        .map((path) => `<script src="${path}"></script>`)
        .join('\n');
}

