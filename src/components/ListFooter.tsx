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

  if (!data.inited || !data.list.length) {
    return null;
  }
  if (data.loginStatus === 'loading') {
    return (
      <View>
        <Text>加载中，请稍后...</Text>
      </View>
    );
  }
  if (!data.meta.hasNext) {
    return (
      <View>
        <Text>暂无更多</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>滚动加载更多</Text>
    </View>
  );
});
