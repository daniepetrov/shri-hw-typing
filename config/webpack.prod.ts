import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
// import UnusedModulesWebpackPlugin from './plugins/unused-modules-plugin'

export default {
  entry: {
    index: './src/index.tsx',
  },
  mode: 'production',
  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].[contenthash].bundle.js',
    clean: true,
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
    },
    extensions: [".tsx", ".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
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
  plugins: [
    // new UnusedModulesWebpackPlugin({
    //   excludeStr: 'src/styles'
    // }),
    new ForkTsCheckerWebpackPlugin({
      async: false
    }),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify('/api'),
    }),
    new HtmlWebpackPlugin({
      title: 'React homework',
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
}
