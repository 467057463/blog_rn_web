import React from 'react';
import Iconfont from 'react-native-vector-icons/Iconfont';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Technology from './Technology';
import Life from './Life';
import About from './About';

const DrawerStack = createDrawerNavigator();

export default function Home() {
  return (
    <DrawerStack.Navigator>
      <DrawerStack.Screen
        name="Technology"
        component={Technology}
        options={{
          title: '技术',
          drawerIcon: ({ focused, color, size }) => (
            <Iconfont name="technology" size={size} color={color} />
          ),
        }}
      />
      <DrawerStack.Screen
        name="Life"
        component={Life}
        options={{
          title: '随笔',
          drawerIcon: ({ focused, color, size }) => (
            <Iconfont name="life" size={size} color={color} />
          ),
        }}
      />
      <DrawerStack.Screen
        name="About"
        component={About}
        options={{
          title: '关于',
          drawerIcon: ({ focused, color, size }) => (
            <Iconfont name="about" size={size} color={color} />
          ),
        }}
      />
    </DrawerStack.Navigator>
  );
}
