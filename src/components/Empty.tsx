import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Text, Icon } from '@rneui/themed';

export default ({ prompt = '暂无相关数据' }: { prompt?: string }) => (
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
