import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon } from '@rneui/themed';

export default ({ prompt = '暂无数据' }: { prompt?: string }) => (
  <View style={styles.empty}>
    <Icon name="empty" type="iconfont" size={32} color="#808080" />
    <Text style={styles.prompt}>{prompt}</Text>
  </View>
);

const styles = StyleSheet.create({
  empty: {
    paddingTop: 80,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prompt: {
    marginTop: 5,
  },
});
