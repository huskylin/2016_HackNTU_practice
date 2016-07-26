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
};
