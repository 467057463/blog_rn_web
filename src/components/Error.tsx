import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon } from '@rneui/themed';

export default ({ prompt = '发生了错误请稍后再试' }: { prompt?: string }) => (
  <View style={styles.loading}>
    <Icon name="view" type="iconfont" size={64} />
    <Text style={styles.prompt}>{prompt}</Text>
  </View>
);

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prompt: {
    marginTop: 5,
  },
});
