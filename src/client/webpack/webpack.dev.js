const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  
  devtool: 'eval-source-map',

  devServer: {
    static: {
      directory: './dist',
    },
    hot: true,
    port: 3001,
    open: true,
  },

  optimization: {
    runtimeChunk: 'single',
  },
});
