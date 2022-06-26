import React from 'react';
import { useWindowDimensions } from 'react-native';
import Iconfont from 'react-native-vector-icons/Iconfont';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LargeSize } from '@/constant';
import Technology from './Technology';
import Life from './Life';
import About from './About';
import ArticleList from '@/components/articleList';

const DrawerStack = createDrawerNavigator();

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamsList } from '@/types/router';
type Props = NativeStackScreenProps<RootStackParamsList, 'Home'>;

export default function Home({ route, navigation }: Props) {
  const dimensions = useWindowDimensions();

  return (
    <DrawerStack.Navigator
      screenOptions={{
        drawerType: dimensions.width >= LargeSize ? 'permanent' : 'front',
        headerShown: false,
        drawerStyle: {
          // backgroundColor: '#c6cbef',
          width: 240,
        },
      }}
    >
      <DrawerStack.Screen
        name="Technology"
        component={Technology}
        options={{
          title: '技术',
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
