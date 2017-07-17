const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: [
    './src/app.ts',
    './src/style.scss'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [{
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css-loader?minimize', 'sass-loader'])
      },
      {
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader'
        }]
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader'
        }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: '[name].bundle.css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })/*,
    new UglifyJSPlugin()*/
  ]
}