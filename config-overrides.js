const path = require('path');
const webpack = require('webpack');
const {
  override,
  babelInclude,
  addWebpackPlugin,
  addWebpackAlias,
  disableEsLint,
} = require('customize-cra');

module.exports = override(
  disableEsLint(),
  babelInclude([
    path.resolve(__dirname, 'node_modules/@rneui/base'),
    path.resolve(__dirname, 'node_modules/@rneui/themed'),
    path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
    path.resolve(__dirname, 'node_modules/react-native-ratings'),
    path.resolve(__dirname, 'node_modules/react-native-reanimated'),
    path.resolve(__dirname, 'src'),
  ]),
  addWebpackPlugin(
    new webpack.DefinePlugin({
      __DEV__: process.env,
    })
  ),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  })
);
