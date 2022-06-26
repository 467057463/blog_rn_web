import React from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Text } from '@rneui/themed';
import type { StatusType } from '@/types/util';

type Props = {
  hasNext: boolean;
  inited: boolean;
  loginStatus: StatusType;
};
export default observer(({ hasNext, inited, loginStatus }: Props) => {
  if (!inited) {
    return null;
  }
  if (loginStatus === 'loading') {
    return (
      <View>
        <Text>加载中，请稍后...</Text>
      </View>
    );
  }
  if (!hasNext) {
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
