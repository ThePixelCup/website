const webpack = require('webpack');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
   resolve: {
      fallback: {
        util: require.resolve('util/'),
        assert: require.resolve('assert/'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer/'),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
  })
}