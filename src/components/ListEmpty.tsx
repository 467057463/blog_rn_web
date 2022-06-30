import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hook/useStore';
import { Text } from '@rneui/themed';
import { computed } from 'mobx';
import type { StatusType } from '@/types/util';

type Props = {
  category: 'TECHNICAL' | 'LIFE' | 'PRIVACY' | 'DRAFT';
  tag: string;
};

export default observer(({ category, tag }: Props) => {
  const { articleStore } = useStore();
  const data = computed(() => articleStore.getDataMap(tag || category)).get()!;

  if (data.inited) {
    return (
      <View style={styles.container}>
        <Text>暂无相关数据...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
});
