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
  },
  prompt: {
    marginTop: 5,
  },
});
