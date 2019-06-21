const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: {
    app: './src/index.js',
    
  },

 output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          { loader: 'file-loader', options: { name: '[name].html' } },
          'extract-loader',
          'html-loader',
          'pug-html-loader'
        ] },
      {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: 'src/postcss.config.js' } }
        }
       ]
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: 'src/postcss.config.js' } }
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ]
    },
    {
      test: /\.(ttf|eot|woff|svg|woff2)$/,
      use: [{
          loader: 'url-loader',
          options: {
              publicPath: './',
              name: '/fonts/[name].[ext]',
              limit: 2000
             }
             }]
    }
  ]
  },
  devServer: {
    overlay: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
}