import webpack from 'webpack';
import baseConfig from './base.config';
import path from 'path';
import startExpress from './utils/startExpress';

const config = Object.assign({}, baseConfig, {
  devtool: 'eval-source-map',
  entry: {
    app: [
      `webpack-dev-server/client?http://localhost:3001`,
      'webpack/hot/only-dev-server',
      './app/app.js'
    ]
  }
});

config.module.loaders = config.module.loaders.concat([
  {
    test: /\.(jpe?g|png|gif|svg|woff|eot|ttf)$/,
    loader: 'file?name=[sha512:hash:base64:7].[ext]',
    exclude: /node_modules/
  },
  { 
    test: /\.scss$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'style!css!sass?' +
            '&includePaths[]=' + encodeURIComponent(path.resolve(__dirname, '../node_modules')) 
  },
  {
    test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
    loader: 'url-loader?limit=100000'
  }
]);

// add `react-hot` on JS files
delete config.module.loaders[1].loader;
config.module.loaders[1].loaders = [ 'react-hot', 'babel?optional[]=runtime&stage=0' ]

config.plugins = [
  // hot reload
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),

  new webpack.DefinePlugin({
    'process.env': {
      BROWSER: JSON.stringify(true),
      NODE_ENV: JSON.stringify('development')
    }
  }),

  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin()
].concat(config.plugins).concat([
  function() {
    this.plugin('done', startExpress);
  }
]);

export default {
  server: {
    port: 3001,
    options: {
      publicPath: '/',
      hot: true,
      historyApiFallback: true,
      proxy: {
        '*': 'http://localhost:3000'
      },
      stats: {
        assets: true,
        colors: true,
        version: false,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false
      }
    }
  },
  webpack: config
};
