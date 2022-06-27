import React, { useEffect, useLayoutEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Platform, View } from 'react-native';
import { Text } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { useStore } from '@/hook/useStore';
import Technology from '@/views/Technology';
import Life from '@/views/Life';
import About from '@/views/About';
import Details from '@/views/Details';
import Login from '@/views/Login';

import type { RootStackParamsList } from '@/types/router';
const DrawerStack = createDrawerNavigator<RootStackParamsList>();

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
      <DrawerStack.Navigator>
        <DrawerStack.Screen
          name="Technology"
          component={Technology}
          options={{
            title: '首页',
          }}
        />
        <DrawerStack.Screen
          name="Life"
          component={Life}
          options={{
            title: '随笔',
          }}
        />
        <DrawerStack.Screen
          name="About"
          component={About}
          options={{
            title: '关于',
          }}
        />
        {/* <DrawerStack.Screen
          name="Details"
          component={Details}
          initialParams={{
            id: 'test',
          }}
          options={({ route }) => ({
            title: String(route.params.id),
          })}
        /> */}
        {/* <DrawerStack.Screen
          name="Login"
          component={Login}
          options={{
            title: '登录',
          }}
        /> */}
      </DrawerStack.Navigator>
    </NavigationContainer>
  );
});
