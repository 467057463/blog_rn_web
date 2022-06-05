module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    "@babel/plugin-proposal-private-methods",
    "@babel/plugin-proposal-private-property-in-object",
    "react-native-reanimated/plugin"
  ],
};
