import React from 'react';
import Technology from './Technology';
import Life from './Life';
import About from './About';
import Iconfont from 'react-native-vector-icons/Iconfont';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from '@rneui/themed';

const TabStack = createBottomTabNavigator();

export default function Home() {
  return (
    <TabStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007aff',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <TabStack.Screen
        name="Technology"
        component={Technology}
        options={{
          title: '技术',
          tabBarIcon: ({ focused, color, size }) => (
            <Iconfont name="technology" size={size} color={color} />
          ),
        }}
      />
      <TabStack.Screen
        name="Life"
        component={Life}
        options={{
          title: '随笔',
          tabBarIcon: ({ focused, color, size }) => (
            <Iconfont name="life" size={size} color={color} />
          ),
        }}
      />
      <TabStack.Screen
        name="About"
        component={About}
        options={{
          title: '关于',
          tabBarIcon: ({ focused, color, size }) => (
            <Iconfont name="about" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </TabStack.Navigator>
  );
}
