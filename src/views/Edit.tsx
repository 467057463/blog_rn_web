import React from 'react';
import { observer } from 'mobx-react-lite';
import { View } from 'react-native';
import { Text } from '@rneui/themed';
import Editor from '@/components/Editor';

export default observer(function Edit() {
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <Editor />
    </View>
  );
});
