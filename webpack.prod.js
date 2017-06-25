const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const nib = require('nib');
const webpack = require('webpack');
const packageJSON = require("./package.json");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackPlugins = require("./webpack_plugins");

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

module.exports = {
  entry: {
    app: __dirname + '/src/client',
    "vendor": webpackPlugins.getVendors()
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.css/,
      loader: 'style-loader!css-loader'
    },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader")
      },
      {
        test: /\.(json)$/,
        loaders: ['json-loader']
      }, {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: [/node_modules/]
      },
      {
        test: /\.(ico|png|jpe?g|gif)$/,
        loader: "file-loader?name=images/[name].[ext]"
      }, {
        test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader'
      }, {
        test: /\.(ttf|eot|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `[name].bundle.[chunkhash].v${packageJSON.version}.js`,
    publicPath: '/',
    sourceMapFilename: `[name].bundle.[chunkhash].v${packageJSON.version}.map.js`
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin(`[name].bundle.[chunkhash].v${packageJSON.version}.css`),
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */`vendor.bundle.[chunkhash].v${packageJSON.version}.js`, Infinity),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CleanWebpackPlugin(['dist'], {
      verbose: true,
      dry: false
    }),
    webpackPlugins.manifestPlugin()
  ],
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.css', '.js', '.json', '.jsx', '.styl']
  },
  stylus: {
    use: [nib()],
    import: [
      '~nib/lib/nib/index.styl',
      path.resolve(__dirname, 'src', 'ui', 'assets', 'styles', 'colors.styl'),
      path.resolve(__dirname, 'src', 'ui', 'assets', 'styles', 'assets.prod.styl')
    ]
  }
};
