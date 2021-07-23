import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import webpack from 'webpack'

export default {
  entry: {
    index: './src/index.tsx',
  },
  mode: 'development',
  devtool: 'inline-source-map',

  output: {
    publicPath: '/',
  },

  devServer: {
    static: path.resolve(__dirname, '../build'),
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false
    }),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://localhost:4000/api'),
    }),
    new HtmlWebpackPlugin({
      title: 'React homework',
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
    }),
  ],
}
