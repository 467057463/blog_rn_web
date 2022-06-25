import React, { useEffect, useLayoutEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@/views/home/index';
import Details from '@/views/Details';
import Login from '@/views/Login';
import { useStore } from '@/hook/useStore';

import type { RootStackParamsList } from '@/types/router';
const Stack = createNativeStackNavigator<RootStackParamsList>();

export default observer(function AppRouter() {
  const { tagStore } = useStore();

  useEffect(() => {
    tagStore.getTags();
  }, [tagStore]);

  if (tagStore.loginStatus === 'loading') {
    return <div>loading....</div>;
  }

  if (tagStore.loginStatus === 'error') {
    return <div>error....</div>;
  }

  return (
    <NavigationContainer linking={tagStore.linking}>
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
          name="Details"
          component={Details}
          initialParams={{
            id: 'test',
          }}
          options={({ route }) => ({
            title: String(route.params.id),
          })}
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
