import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { observer } from 'mobx-react-lite';
import { WebView } from 'react-native-webview';

export default observer(function MarkdownEditor() {
  return (
    <WebView
      originWhitelist={['*']}
      source={
        Platform.OS === 'ios'
          ? require('@/assets/markdown-viewer/index.html')
          : { uri: 'file:///android_asset/markdown-viewer/index.html' }
      }
      // style={{
      //   height: Dimensions.get('window').height,
      //   width: Dimensions.get('window').width,
      // }}
    />
  );
});
