const path = require('path');

module.exports = {
  entry: ['./src/DOMchanges.js', './src/DOMmain.js', './src/eventListeners.js', './src/logic.js'],
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
};

