import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Text } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useStore } from '@/hook/useStore';
import Home from '@/views/home/index';
import Details from '@/views/Details';
import Edit from '@/views/Edit';
import Create from '@/views/Create';
import EditCategory from '@/views/EditCategory';
import Login from '@/views/Login';
import Draft from '@/views/Draft';
import Privacy from '@/views/Privacy';
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
    // @ts-ignore
    <NavigationContainer linking={store.tagStore.linking}>
      <StatusBar
        backgroundColor="#007aff"
        barStyle="default"
        translucent={false}
      />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS !== 'web' ? '#007aff' : '#fff',
          },
          headerTintColor: Platform.OS !== 'web' ? '#fff' : '#000',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: Platform.OS !== 'web' ? 'bold' : 'normal',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: '首页',
            headerShown: false,
          }}
        />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{
            title: '文章编辑',
          }}
        />
        <Stack.Screen
          name="EditCategory"
          component={EditCategory}
          options={{
            title: '编辑文章信息',
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: '登录',
          }}
        />
        <Stack.Screen
          name="Draft"
          component={Draft}
          options={{
            title: '草稿箱',
          }}
        />
        <Stack.Screen
          name="Privacy"
          component={Privacy}
          options={{
            title: '日记',
          }}
        />
        <Stack.Screen
          name="Create"
          component={Create}
          options={{
            title: '发布文章',
          }}
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
