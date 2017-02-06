const webpack = require('webpack')

const BabiliPlugin = require('babili-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
  const devMode = env !== 'production'
  const config = {
    entry: ['babel-polyfill', './front/app.js'],
    output: {
      path: './front/compiled',
      filename: 'bundle.js'
    },
    devtool: devMode ? 'source-map' : undefined,
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              query: {
                localIdentName: devMode ? '[local]-[name]-[hash:base64:10]' : undefined,
                modules: true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.woff2?$/,
          use: {
            loader: 'url-loader',
            query: {
              limit: 10000
            }
          }
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          use: [{
            loader: 'url-loader',
            query: {
              limit: 10000
            }
          },
          {
            loader: 'img-loader',
            query: {
              minimize: true
            }
          }
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(devMode ? 'development' : 'production')
        },
        __DEVTOOLS__: devMode
      }),
      !devMode ? new BabiliPlugin({deadcode: false}) : () => undefined,
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './front/index.js',
        inject: false
      }),
      new HtmlWebpackPlugin({
        filename: '404.html',
        template: './front/index.js',
        inject: false
      })
    ],
    devServer: {
      contentBase: './front/compiled',
      compress: true,
      host: '0.0.0.0',
      port: 80,
      historyApiFallback: 'index.html'
    },
    resolve: {
      extensions: ['.js', '.css']
    }
  }

  return config
}
