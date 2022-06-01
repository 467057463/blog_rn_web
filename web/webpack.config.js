const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../index.web'), // 入口文件
  output: {
    path: path.resolve(__dirname, '../dist'), // 输出的路径
    filename: 'bundle.js', // 打包后文件
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {},
      //   },
      //   exclude: /node_modules/,
      // },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: 'ts-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            // name: 'images/[name].[ext]'
          },
        },
        // exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    port: 9090,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      inject: 'body',
    }),
  ],
};
