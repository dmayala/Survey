var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
  entry: {
    app: './app/app.js'
  },
  output: {
    path: require('path').resolve('./public'),
    publicPath: '/',
    filename: 'js/app.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { 
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        loader: ExtractTextPlugin.extract(
          // activate source maps via loader query
          'css?sourceMap!' +
          'sass?sourceMap' +
          '&includePaths[]=' +
            encodeURIComponent(path.resolve(__dirname,
            '../node_modules')) 
        )
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [ 'babel?optional[]=runtime&stage=0' ]
      },
      {
        test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['', '.react.js', '.js', '.json', '.jsx', '.es6', '.babel', '.scss' ],
    modulesDirectories: [ 'node_modules' , 'app', 'shared' ]
  },
  plugins: [
    new ExtractTextPlugin('css/app.css'),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true)
      }
    })
  ]
};
