/**
 *  created on 2019-11-07.
 *  author litao
 */
const express = require('express');
const path = require('path');
const render = require('vue-server-renderer').createRenderer();
const app = express();
const createApp = require('./render').default;
const appData = require('../data/index.json');
const apiRoutes = express.Router();
const fs = require("fs");

apiRoutes.get('/home', function (req, res) {
    res.json(appData.home);
});

apiRoutes.get('/news', function (req, res) {
    res.json(appData.news);
});

app.use('/api', apiRoutes);
console.log(__dirname)
app.use('/static', express.static(__dirname+'/static'));
app.use((req, res) => {
    const context = {url: req.url};
    createApp(context).then((appComponent) => {
        render.renderToString(appComponent).then(function (content) {
            res.send(htmlFactory(content, context, res));
        }, () => {

        })
    }, (error) => {
        res.status(error.code).end(error.msg);
    })
    //res.send(htmlFactory('', res));
});
app.listen(8080);
const manifestJson = getManifestContent();

function htmlFactory(content, context, res) {
    const state = context.state || {};
    return (`
            <html>
              <head>
                <title>My App</title>
                ${getStyles()}
              </head>
              <body>
                <div id="app">
                ${content}
                </div>
                <script>
                    window.context=${JSON.stringify({state})}
                </script>
                ${getScripts()}
              </body>
            </html>
           `);
}

function getScripts() {
    return `
         <script src="${manifestJson['main.js']}"></script>
   `
}

function getStyles() {
    return `<link rel="stylesheet" href="${manifestJson['main.css']}" ></link>`
}

function getManifestContent() {
    const root = __dirname;
    let relativeFilePath = 'manifest.json';
    let filePath = path.join(root, relativeFilePath);
    const content = fs.readFileSync(filePath, {
        encoding: 'utf-8'
    })
    return JSON.parse(content);
}
