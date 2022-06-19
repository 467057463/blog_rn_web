import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Iconfont from 'react-native-vector-icons/Iconfont';
import { registerCustomIconType } from '@rneui/themed';
import { StoreProvider } from '@/hook/useStore';
import rootStore from './store';
import Home from '@/views/home/index';
import Details from '@/views/Details';
import Login from '@/views/Login';
import type { RootStackParamsList } from '@/types/router';

const linking = {
  prefixes: [''],
  config: {
    screens: {
      Login: 'login',
      Details: {
        path: 'details/:id',
      },
      Home: {
        path: 'home',
        screens: {
          Technology: {
            path: 'technology',
            exact: true,
          },
          Life: {
            path: 'life',
            exact: true,
          },
          User: {
            path: 'user',
            exact: true,
          },
        },
      },
    },
  },
};

const Stack = createNativeStackNavigator<RootStackParamsList>();
function App() {
  registerCustomIconType('iconfont', Iconfont);
  rootStore.userStore.init();
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StoreProvider>
          <NavigationContainer linking={linking}>
            <Stack.Navigator
              id="rootStack"
              // initialRouteName="Login"
              // screenOptions={{
              //   headerTitleAlign: 'center',
              // }}
            >
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
        </StoreProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
