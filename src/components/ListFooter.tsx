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

  if (!data.inited || !data.list.length) {
    return null;
  }
  return (
    <Footer
      showLoading={data.loginStatus === 'loading'}
      text={
        data.loginStatus === 'loading'
          ? '加载中，请稍后...'
          : !data.meta.hasNext
          ? '暂无更多'
          : '滚动加载更多'
      }
    />
  );
});

function Footer({
  text = '滚动加载更多',
  showLoading = false,
}: {
  text: string;
  showLoading: boolean;
}) {
  return (
    <View style={styles.container}>
      {showLoading && (
        <ActivityIndicator color="#007aff" size="small" style={styles.icon} />
      )}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: '#808080',
  },
});
