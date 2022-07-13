import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Text } from '@rneui/themed';

export default ({ prompt = '加载中...' }: { prompt?: string }) => (
  <View style={styles.loading}>
    <ActivityIndicator size="large" />
    <Text style={styles.prompt}>{prompt}</Text>
  </View>
);

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    // backgroundColor: 'red',
  },
  prompt: {
    marginTop: 5,
  },
});
