import childProcess from 'child_process'
import path from 'path'

import webpack from 'webpack'

import BabiliPlugin from 'babili-webpack-plugin'
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import NoEmitPlugin from 'no-emit-webpack-plugin'
import SimpleProgressPlugin from 'webpack-simple-progress-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import {getRouterPaths} from './src/routing'

import elements from './data/dist/basic'

export default env => {
  const devMode = env !== 'production'

  const routesData = {
    elements: Object.keys(elements).slice(1, devMode ? 18 + 1 : undefined)
  }
  const routerPaths = getRouterPaths(routesData)

  const cssIdentifier = 'css.css'

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
          use: ExtractTextPlugin.extract({
            use: {loader: 'css-loader',
              query: {
                localIdentName: devMode ? '[local]-[emoji:1]' : '[emoji:2]',
                modules: true,
                minimize: !devMode
              }}
          })
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
      ...routerPaths.map((routerPath, routeNumber) => new StaticSiteGeneratorPlugin({
        entry: 'static',
        paths: routerPath.endsWith('.html') ? routerPath : `${routerPath}.html`,
        locals: {
          routerPath,
          routeNumber,
          routerPaths,
          cssIdentifier
        }
      })),
      new ExtractTextPlugin(cssIdentifier, {
        allChunks: true
      }),
      new SimpleProgressPlugin(),
      new CopyWebpackPlugin([{
        from: './data/dist/'
      }], {ignore: ['basic.json', 'full.json']}),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(devMode ? 'development' : 'production')
        },
        __DEVTOOLS__: devMode
      }),
      !devMode ? new BabiliPlugin() : () => undefined,
      new NoEmitPlugin(['static.js', 'static.map.js', 'all.css'])
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
