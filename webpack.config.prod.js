var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  resolve: {
    root: __dirname + '/source'
  },
  entry: [
    './source/index'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'index.js',
    publicPath: './static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'source'),
      query: {
        presets: ['es2015', 'stage-0', 'react']
      }
    },
    {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
      include: path.join(__dirname, 'source/sass')
    },
    {
      test: /\.svg$/,
      loaders: ['raw-loader', 'svgo-loader?useConfig=svgoConfig'],
      include: path.join(__dirname, 'source/images')
    },
    {
      test: /\.(jpe?g|png)$/,
      loader: 'file?name=[path][hash].[ext]',
      include: path.join(__dirname, 'source/images')
    }]
  },
  svgoConfig: {
    plugins: [
      { removeTitle: true },
      { convertColors: { shorthex: false } },
      { convertPathData: false },
      { removeDimensions: true },
      { addClassesToSVGElement: { className: 'svg-img' } }
    ]
  }
};
