import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
}

export default {
  entry: path.resolve(PATHS.src, 'index.js'),
  output: {
    path: PATHS.dist,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
        }),
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: {
            loader: 'css-loader',
          },
        }),
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|mp3|ogg|wav|mp4|mkv)$/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.(txt|code|example|sample)$/,
        exclude: /node_modules/,
        use: {
          loader: 'raw-loader',
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: path.resolve(PATHS.src, 'shell', 'index.html'),
      filename: 'index.html',
    }),
  ],
  resolve: {
    modules: [
      PATHS.src,
      'node_modules',
    ],
  },
}
