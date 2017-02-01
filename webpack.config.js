const webpack = require('webpack')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: ['babel-polyfill', './front/index.js'],
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
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
      __DEVTOOLS__: devMode
    })],
  devServer: {
    contentBase: ['./front/compiled', './front/'],
    compress: true,
    host: '0.0.0.0',
    port: 80,
    historyApiFallback: {
      rewrites: [
        {from: /[^/]/, to: 'index.html'}
      ]
    }
  },
  resolve: {
    extensions: ['.js', '.css']
  }
}

if(!devMode){
  module.exports.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    minimize: !devMode,
    output: {
      comments: devMode
    }
  }))
}
