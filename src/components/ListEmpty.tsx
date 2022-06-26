import React from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Text } from '@rneui/themed';
import type { StatusType } from '@/types/util';

type Props = {
  inited: boolean;
  length: number;
};

export default observer(({ length, inited }: Props) => {
  if (inited) {
    return (
      <View>
        <Text>暂无相关数据</Text>
      </View>
    );
  }
  return null;
});
