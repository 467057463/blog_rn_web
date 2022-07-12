import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Text } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useStore } from '@/hook/useStore';
import Home from '@/views/home/index';
import Details from '@/views/Details';
import Login from '@/views/Login';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

import type { RootStackParamsList } from '@/types/router';
const Stack = createNativeStackNavigator<RootStackParamsList>();

export default observer(function AppRouter() {
  const store = useStore();

  useEffect(() => {
    store.init();
  }, []);

  if (store.loginStatus === 'loading') {
    return <Loading />;
  }

  if (store.loginStatus === 'error') {
    return <Error />;
  }

  return (
    <NavigationContainer linking={store.tagStore.linking}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: '首页',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: '登录',
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={({ route }: any) => ({
            title: route.params.id,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
});
