import React from 'react';
import { useWindowDimensions } from 'react-native';
import Iconfont from 'react-native-vector-icons/Iconfont';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LargeSize } from '@/constant';
import Technology from './Technology';
import Life from './Life';
import About from './About';
import Details from '@/views/Details';

import type { CompositeScreenProps } from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeParamsList, RootStackParamsList } from '@/types/router';
type Props = DrawerScreenProps<RootStackParamsList, 'Home'>;

// type Props = CompositeScreenProps<
//   DrawerScreenProps<HomeParamsList, 'About'>,
//   NativeStackScreenProps<RootStackParamsList>
// >;

const DrawerStack = createDrawerNavigator<HomeParamsList>();

function CustomDrawerContent(props) {
  console.log(props);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function Home({ route, navigation }: Props) {
  const dimensions = useWindowDimensions();

  return (
    <DrawerStack.Navigator
      defaultStatus="closed"
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
      <DrawerStack.Screen
        name="Details"
        component={Details}
        initialParams={{
          id: 'test',
        }}
        options={({ route }) => ({
          title: String(route.params.id),
          drawerLabel: () => null,
          drawerItemStyle: { display: 'none' },
        })}
      />
    </DrawerStack.Navigator>
  );
}
