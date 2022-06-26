import React, { useEffect, useLayoutEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Platform, View } from 'react-native';
import { Text } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@/views/home/index';
import Details from '@/views/Details';
import Login from '@/views/Login';
import { useStore } from '@/hook/useStore';

import type { RootStackParamsList } from '@/types/router';
const Stack = createNativeStackNavigator<RootStackParamsList>();

export default observer(function AppRouter() {
  const store = useStore();

  useEffect(() => {
    store.init();
  }, []);

  if (store.loginStatus === 'loading') {
    return (
      <View>
        <Text>loading....</Text>
      </View>
    );
  }

  if (store.loginStatus === 'error') {
    return (
      <View>
        <Text>error....</Text>
      </View>
    );
  }

  return (
    <NavigationContainer linking={store.tagStore.linking}>
      <Stack.Navigator id="rootStack">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: Platform.OS === 'web' ? true : false,
            title: '首页',
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: '登录',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
