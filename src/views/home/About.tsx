import React, { useEffect, useLayoutEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { LargeSize } from '@/constant';

export default function User({ navigation }) {
  const dimensions = useWindowDimensions();

  useLayoutEffect(() => {
    navigation.getParent('rootStack').setOptions({
      headerLeft: () =>
        dimensions.width < LargeSize ? (
          <Icon
            name="view"
            type="iconfont"
            onPress={() => navigation.toggleDrawer()}
            style={{ marginHorizontal: 10 }}
          />
        ) : null,
    });
  }, [navigation, dimensions]);

  return (
    <View>
      <Text>用户</Text>
      <Button title="GO BACK" onPress={() => navigation.goBack()} />
      <Button title="GO LOGIN" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
