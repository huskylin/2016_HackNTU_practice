const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './public/js/src/index.js',
  output: {
    path: path.join(__dirname, 'public/js/dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.json'],
  },
  plugins: [
    /*
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    */
  ],
};
