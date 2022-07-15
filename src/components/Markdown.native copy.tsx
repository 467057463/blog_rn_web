import React, { useEffect, useRef } from 'react';
import { Platform, Dimensions } from 'react-native';
import { observer } from 'mobx-react-lite';
import { WebView } from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview';

export default observer(function MarkdownEditor(props) {
  const webviewRef = useRef<AutoHeightWebView>(null);
  // 初始化文章内容
  useEffect(() => {
    console.log('abc', props.children);
    webviewRef.current?.postMessage(props.children as string);
  }, [props.children]);

  return (
    <AutoHeightWebView
      ref={webviewRef}
      originWhitelist={['*']}
      source={
        Platform.OS === 'ios'
          ? require('@/assets/markdown-viewer/index.html')
          : { uri: 'file:///android_asset/markdown-viewer/index.html' }
      }
      style={{
        width: Dimensions.get('window').width - 40,
      }}
    />
  );
});
