import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon } from '@rneui/themed';

export default ({ prompt = '发生了错误请稍后再试' }: { prompt?: string }) => (
  <View style={styles.error}>
    <Icon name="error" type="iconfont" size={32} color="#808080" />
    <Text style={styles.prompt}>{prompt}</Text>
  </View>
);

const styles = StyleSheet.create({
  error: {
    paddingTop: 80,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prompt: {
    marginTop: 5,
  },
});
