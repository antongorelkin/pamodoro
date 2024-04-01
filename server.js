const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.ts');
const compiler = webpack(config);


app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    hot: true,
  })
);


app.listen(3000, function () {
  console.log('listening on port 3000');
})

