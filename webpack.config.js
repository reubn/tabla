const webpack = require('webpack')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: ['./front/index.js'],
  output: {
    path: './front/compiled',
    filename: 'bundle.js'
  },
  devtool: devMode ? 'source-map' : undefined,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style', `css?${(devMode ? 'localIdentName=[local]-[name]-[hash:base64:10]&' : '')}modules=true`]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style', 'css']
      },
      {
        test: /\.woff2?$/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loaders: ['url?limit=10000', 'img?minimize=true']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
      __DEVTOOLS__: devMode
    }),
    new webpack.optimize.OccurrenceOrderPlugin()],
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.css']
  },
  devServer: {
    contentBase: ['./front/compiled', './front/'],
    compress: true,
    port: 80
  }
}

if(!devMode){
  module.exports.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    minimize: !devMode,
    output: {
      comments: devMode
    }
  }))
}
