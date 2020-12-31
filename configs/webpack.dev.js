const { merge } = require('webpack-merge');
const commonWebpack = require('./webpack.common');

const config = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 4200,
    hot: true,
    progress: false
  },
};

// const HtmlWebpackPlugin = mergeWithCustomize({
//   customizeArray: unique(
//       'plugins',
      
//       ),
// });

module.exports = merge(config, commonWebpack);
