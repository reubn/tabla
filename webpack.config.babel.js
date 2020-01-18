import path from 'path'

import webpack from 'webpack'

import BabiliPlugin from 'babili-webpack-plugin'
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin'
import FilterChunk from 'filter-chunk-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import ProgPlugin from './ProgPlugin'

import {getRouterPaths} from './src/routing'

import elements from './data/dist/basic'

// Ensure Full Errors are Shown
process.on('unhandledRejection', r => console.error(r))

export default env => {
  const devMode = env !== 'production'

  const routesData = {
    elements: Object.keys(elements).slice(1, devMode ? 18 + 1 : undefined)
  }
  const routerPaths = getRouterPaths(routesData)

  const cssIdentifier = 'css.css'

  const stats = 'errors-only'

  const progPlugin = new ProgPlugin()

  const config = {
    stats,
    mode: devMode ? 'development' : 'production',
    entry: {
      client: ['@babel/polyfill', './src/client.js'],
      static: ['@babel/polyfill', './src/static.js']
    },
    output: {
      path: devMode ? '/' : path.resolve('./dist'),
      filename: '[name].js',
      libraryTarget: 'umd',
      globalObject: '(typeof window === `object` ? window : global)'
    },
    target: 'web',
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
            use: {
              loader: 'css-loader',
              query: {
                modules: {
                  localIdentName: devMode ? '[path][name]__[local]' : '[hash:base64]'
                },
                sourceMap: devMode
              }
            }
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
                sourceMap: devMode
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
          cssIdentifier,
          progPlugin
        }
      })),
      new ExtractTextPlugin(cssIdentifier, {
        allChunks: true
      }),
      progPlugin._plugin,
      new webpack.DefinePlugin({
        __DEVTOOLS__: devMode
      }),
      !devMode ? new BabiliPlugin() : () => undefined,
      new FilterChunk({
        patterns: ['static*.js', cssIdentifier]
      })
    ],
    devServer: {
      stats,
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
    watchOptions: {
      aggregateTimeout: 4000
    },
    resolve: {
      extensions: ['.js', '.css', '.json']
    }
  }

  return config
}
