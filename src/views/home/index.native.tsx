import React from 'react';
import Technology from './Technology';
import Life from './Life';
import About from './About';
import Iconfont from 'react-native-vector-icons/Iconfont';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const TabStack = createBottomTabNavigator();
export default function Home() {
  return (
    <TabStack.Navigator>
      <TabStack.Screen
        name="Technology"
        component={Technology}
        options={{
          title: '技术',
          tabBarIcon: ({ focused, color, size }) => (
            <Iconfont name="view" size={size} color={color} />
          ),
        }}
      />
      <TabStack.Screen
        name="Life"
        component={Life}
        options={{
          title: '随笔',
          tabBarIcon: ({ focused, color, size }) => (
            <Iconfont name="view" size={size} color={color} />
          ),
        }}
      />
      <TabStack.Screen
        name="About"
        component={About}
        options={{
          title: '关于',
          tabBarIcon: ({ focused, color, size }) => (
            <Iconfont name="view" size={size} color={color} />
          ),
        }}
      />
    </TabStack.Navigator>
  );
}
