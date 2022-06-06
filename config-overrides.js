const path = require('path');
const webpack = require('webpack');
const {
  override,
  addBabelPlugins,
  babelInclude,
  addBabelPresets,
  addWebpackPlugin,
  addWebpackResolve,
  addWebpackAlias,
  disableEsLint,
  useEslintRc,
} = require('customize-cra');

module.exports = override(
  disableEsLint(),
  // ...addBabelPresets(
  //   '@babel/preset-react'
  // ),
  ...addBabelPlugins(),
  // "react-native-reanimated/plugin",
  // '@babel/plugin-syntax-jsx'
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
      // process: { env: {} }
    })
  ),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  })
  // addWebpackResolve({
  //   extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
  //   alias: {
  //     "@src": path.resolve(__dirname, 'src')
  //   }
  // })
);
