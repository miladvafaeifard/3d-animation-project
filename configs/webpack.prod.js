const webpackMerge = require('webpack-merge');
const commonWebpack = require('./webpack.common');

const config = {
    mode: 'production'
};

module.exports = webpackMerge(commonWebpack, config);
