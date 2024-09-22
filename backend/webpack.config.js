const webpack = require('webpack');

module.exports = {
  // Other configurations...
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
      path: require.resolve('path-browserify'),
      url: require.resolve('url/'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
