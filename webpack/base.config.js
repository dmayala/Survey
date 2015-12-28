var path = require('path');
var writeStats = require('./utils/writeStats');

var JS_REGEX = /\.js$|\.jsx$|\.es6$|\.babel$/;

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './app/app.js'
  },
  output: {
    path: path.resolve(__dirname, '..', 'public'),
    filename: 'js/app.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {test: /\.json$/, exclude: /node_modules/, loader: 'json'},
      {test: JS_REGEX, exclude: /node_modules/, loader: 'babel?optional[]=runtime&stage=0'},
      {test: /\.(png|woff|woff2|eot|ttf|svg)$/, exclude: /(node_modules|bower_components)/, loader: 'url-loader?limit=100000'}
    ],
  },
  plugins: [
    function () {
      this.plugin('done', writeStats);
    }
  ],
  resolve: {
    extensions: ['', '.react.js', '.js', '.json', '.jsx', '.es6', '.babel', '.scss' ],
    modulesDirectories: ['node_modules', 'app', 'shared' ]
  }
};
