import React from 'react';
import { observer } from 'mobx-react-lite';
import { View } from 'react-native';
import { Input } from '@rneui/themed';
import Editor from '@/components/Editor';

export default observer(function Edit() {
  return (
    <View style={{ flex: 1 }}>
      <Input
        placeholder="请输入文章标题"
        errorStyle={{ display: 'none' }}
        inputContainerStyle={{ borderBottomWidth: 0 }}
      />
      <Editor />
    </View>
  );
});
