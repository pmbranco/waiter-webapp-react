import assign from 'object-assign';
import path from 'path';
import prodConf from './webpack.prod.js';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import nib from 'nib';
import webpackPlugins from "./webpack_plugins";
import * as packageJSON from "./package.json";

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

Object.assign = assign;

const BABEL_QUERY = {
  presets: ['react', 'es2015', 'stage-2'],
  plugins: [
    ['transform-class-properties'],
    ['transform-object-rest-spread'],
    ['transform-es2015-destructuring'],
    [
      'react-transform',
      {
        transforms: [{
          transform: 'react-transform-hmr',
          imports: ['react', 'react-dom'],
          locals: ['module']
        }, {
          transform: "react-transform-catch-errors",
          imports: ["react", "redbox-react"
          ]
        }]
      }
    ]
  ]
};

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

export default function (app) {
  const config = Object.assign(prodConf, {
    debug: true,
    devtool: 'inline-source-map',
    devServer: {
      contentBase: "./build",
    },
    entry: {
      'webpack-hot-middleware/client': 'webpack-hot-middleware/client',
      app: __dirname + '/src/client',
      "vendor": webpackPlugins.getVendors()
    },
    module: {
      loaders: [{
        test: /\.css/,
        loader: 'style-loader!css-loader',
        exclude: [/bower_components/]
      },
        {
          test: /\.(json)$/,
          loaders: ['json-loader']
        },
        {
          test: /\.(js|jsx)$/,
          loader: 'babel',
          exclude: [/node_modules/],
          query: BABEL_QUERY
        },
        {
          test: /\.styl$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader")
        },
        {
          test: /\.(ico|png|jpe?g|gif)$/,
          loader: "file-loader?name=images/[name].[ext]"
        },
        {
          test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader'
        },
        {
          test: /\.scss$/,
          loader: 'sass-loader'
        },
        {
          test: /\.(ttf|eot|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        }],
      noParse: [/.elm$/]
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: `[name].bundle.v${packageJSON.version}.js`,
      publicPath: '/'
    },
    plugins: [
      new ExtractTextPlugin(`[name].bundle.v${packageJSON.version}.css`),
      new webpack.DefinePlugin({
        'process.env': {
          BROWSER: JSON.stringify(true),
          NODE_ENV: JSON.stringify('development'),
          REDUX_DEBUG: process.env.REDUX_DEBUG
        }
      }),
      new webpack.optimize.CommonsChunkPlugin("vendor", `vendor.bundle.v${packageJSON.version}.js`, Infinity),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new CleanWebpackPlugin(['dist'], {
        verbose: true,
        dry: false
      })
    ],
    stylus: {
      use: [nib()],
      import: [
        '~nib/lib/nib/index.styl',
        path.resolve(__dirname, 'src', 'ui', 'assets', 'styles', 'colors.styl'),
        path.resolve(__dirname, 'src', 'ui', 'assets', 'styles', 'assets.dev.styl')
      ]
    }
  });

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    noInfo: true,
    publicPath: config.output.publicPath,
    watchOptions: {
      poll: true
    }
  }));

  app.use(webpackHotMiddleware(compiler));
}
