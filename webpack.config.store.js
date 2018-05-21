const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/store/client/index.js'],
    theme: ['theme']
  },

  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'theme'),
    filename: 'assets/js/[name]-[hash].js',
    chunkFilename: 'assets/js/[name]-[hash].js'
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'theme',
          test: 'theme',
          enforce: true
        },
      }
    }
  },

  resolve: {
    alias: {      
      ApiClient: path.resolve(__dirname, 'src/api-client')
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            use: [
                {
                    loader: "css-loader",
                    options: {
                        modules: false,
                        importLoaders: true
                    }
                }
            ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            use: [{
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin("assets/css/bundle-[hash].css"),
    new HtmlWebpackPlugin({
      template: 'theme/index.html',
      inject: 'body',
      filename: 'assets/index.html'
    }),
    new webpack.BannerPlugin({
      banner: `Created: ${new Date().toUTCString()}`,
      raw: false,
      entryOnly: false
    }),
    new webpack.DefinePlugin({
      "process.env": {
        AJAX_BASE_URL: JSON.stringify(process.env.AJAX_BASE_URL || 'http://localhost:3001/ajax')
      },
    }),
  ]
};
