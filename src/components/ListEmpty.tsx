import React from 'react';
import { StyleSheet, View } from 'react-native';
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
      <View>
        <Text>暂无相关数据</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>数据加载中...</Text>
    </View>
  );
});
