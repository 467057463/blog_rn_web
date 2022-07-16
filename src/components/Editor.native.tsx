import React, { useEffect, useRef } from 'react';
import { Platform, Dimensions } from 'react-native';
import { observer } from 'mobx-react-lite';
import { WebView } from 'react-native-webview';

export default observer(function MarkdownEditor({ onChange, value }: any) {
  const webviewRef = useRef<WebView>(null);

  // 初始化文章内容
  useEffect(() => {
    webviewRef.current?.postMessage(value);
  }, []);

  return (
    <WebView
      ref={webviewRef}
      originWhitelist={['*']}
      source={
        Platform.OS === 'ios'
          ? require('@/assets/markdown-editor/index.html')
          : { uri: 'file:///android_asset/markdown-editor/index.html' }
      }
      onMessage={(event) => {
        onChange(event.nativeEvent.data);
      }}
    />
  );
});
