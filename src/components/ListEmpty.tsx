import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hook/useStore';
import { Text } from '@rneui/themed';
import { computed } from 'mobx';
import type { StatusType } from '@/types/util';

import Loading from '@/components/Loading';
import Error from '@/components/Error';
import Empty from '@/components/Empty';

type Props = {
  category: 'TECHNICAL' | 'LIFE' | 'PRIVACY' | 'DRAFT';
  tag: string;
};

export default observer(({ category, tag }: Props) => {
  const { articleStore } = useStore();
  const data = computed(() => articleStore.getDataMap(tag || category)).get()!;

  if (data.inited) {
    return <Empty />;
  }
  if (data.loginStatus === 'error') {
    return <Error />;
  }
  return <Loading />;
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // flex: 1,
    height: '100%',
  },
});
