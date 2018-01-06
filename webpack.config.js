const childProcess = require('child_process')
const path = require('path')

const webpack = require('webpack')

const BabiliPlugin = require('babili-webpack-plugin')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const SimpleProgressPlugin = require('webpack-simple-progress-plugin')

const elements = require('./data/dist/basic')

module.exports = env => {
  const devMode = env !== 'production'
  const config = {
    entry: {
      client: ['babel-polyfill', './src/client.js'],
      static: './src/static.js'
    },
    output: {
      path: devMode ? '/' : path.resolve('./dist'),
      filename: '[name].js',
      libraryTarget: 'umd'
    },
    target: 'node',
    devtool: devMode ? 'source-map' : undefined,
    module: {
      rules: [
        {
          test: /\.js$/,
          use: devMode ? 'babel-loader' : 'babel-loader?cacheDirectory',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'node-style-loader',
            {
              loader: 'css-loader',
              query: {
                localIdentName: devMode ? '[local]-[emoji:1]' : '[emoji:2]',
                modules: true,
                minimize: !devMode
              }
            }
          ]
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: [
            'node-style-loader',
            {
              loader: 'css-loader',
              query: {
                minimize: !devMode
              }
            }
          ]
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
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'COMMON',
      //   chunks: elements.map(atomicNumber => `./elements/output/${atomicNumber}`)
      // }),
      new StaticSiteGeneratorPlugin({entry: 'static'}),
      ...(devMode ? Object.keys(elements).slice(1, 5) : Object.keys(elements).slice(1)).map(atomicNumber =>
        new StaticSiteGeneratorPlugin({
          entry: 'static',
          paths: `${atomicNumber}.html`,
          locals: {atomicNumber}
        })),
      new SimpleProgressPlugin(),
      new CopyWebpackPlugin([{
        from: './data/dist/'
      }], {ignore: ['basic.json', 'full.json']}),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(devMode ? 'development' : 'production')
        },
        __DEVTOOLS__: devMode,
        __BUILD__: JSON.stringify(devMode ? 'DEV' : childProcess.execSync('git rev-parse HEAD').toString().trim())
      }),
      !devMode ? new BabiliPlugin() : () => undefined
    ],
    devServer: {
      contentBase: './dist',
      compress: true,
      host: '0.0.0.0',
      disableHostCheck: true,
      port: 1616,
      inline: false,
      historyApiFallback: {
        rewrites: [{
          from: /^.*\/(.+)\/?$/,
          to: context => `/${context.match[0]}.html`
        }]
      }
    },
    resolve: {
      extensions: ['.js', '.css', '.json']
    }
  }

  return config
}
