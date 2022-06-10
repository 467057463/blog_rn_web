import React from 'react';
import { useWindowDimensions } from 'react-native';
import Technology from './Technology';
import Life from './Life';
import About from './About';
import Iconfont from 'react-native-vector-icons/Iconfont';
import { createDrawerNavigator } from '@react-navigation/drawer';

const DrawerStack = createDrawerNavigator();

export default function Home() {
  const dimensions = useWindowDimensions();
  return (
    <DrawerStack.Navigator
      screenOptions={{
        drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
      }}
    >
      <DrawerStack.Screen
        name="Technology"
        component={Technology}
        options={{
          title: '首页',
          drawerIcon: ({ focused, color, size }) => (
            <Iconfont name="view" size={size} color={color} />
          ),
        }}
      />
      <DrawerStack.Screen
        name="Life"
        component={Life}
        options={{
          title: '随笔',
          drawerIcon: ({ focused, color, size }) => (
            <Iconfont name="view" size={size} color={color} />
          ),
        }}
      />
      <DrawerStack.Screen
        name="About"
        component={About}
        options={{
          title: '关于',
          drawerIcon: ({ focused, color, size }) => (
            <Iconfont name="view" size={size} color={color} />
          ),
        }}
      />
    </DrawerStack.Navigator>
  );
}
