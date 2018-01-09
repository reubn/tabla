import childProcess from 'child_process'
import path from 'path'

import webpack from 'webpack'

import BabiliPlugin from 'babili-webpack-plugin'
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import SimpleProgressPlugin from 'webpack-simple-progress-plugin'

import elements from './data/dist/basic'

export default env => {
  const devMode = env !== 'production'
  const config = {
    entry: {
      client: ['babel-polyfill', './src/client.js'],
      static: ['babel-polyfill', './src/static.js']
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
      new StaticSiteGeneratorPlugin({
        entry: 'static',
        locals: {
          chunks: ['client.js']
        }
      }),
      ...(devMode ? Object.keys(elements).slice(1, 18 + 1) : Object.keys(elements).slice(1)).map(atomicNumber =>
        new StaticSiteGeneratorPlugin({
          entry: 'static',
          paths: `${atomicNumber}.html`,
          locals: {
            atomicNumber,
            chunks: ['client.js']
          }
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
