const childProcess = require('child_process')

const webpack = require('webpack')

const BabiliPlugin = require('babili-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
  const devMode = env !== 'production'
  const config = {
    entry: ['babel-polyfill', './src/app.js'],
    output: {
      path: devMode ? '/' : './dist',
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
            'universal-style-loader',
            {
              loader: 'css-loader',
              query: {
                localIdentName: devMode ? '[local]-[emoji:1]' : '[emoji:2]',
                modules: true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: ['universal-style-loader', 'css-loader']
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
        __DEVTOOLS__: devMode,
        __BUILD__: JSON.stringify(devMode ? 'DEV' : childProcess.execSync('git rev-parse HEAD').toString().trim())
      }),
      !devMode ? new BabiliPlugin() : () => undefined,
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.js',
        inject: false
      }),
      new HtmlWebpackPlugin({
        filename: '404.html',
        template: './src/index.js',
        inject: false
      })
    ],
    devServer: {
      contentBase: './dist',
      compress: true,
      host: '0.0.0.0',
      disableHostCheck: true,
      port: 1616,
      historyApiFallback: true
    },
    resolve: {
      extensions: ['.js', '.css']
    }
  }

  return config
}
