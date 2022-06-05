import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import Technology from './Technology'
import Life from './Life'
import User from './User'
import Iconfont from 'react-native-vector-icons/Iconfont';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

const N = Platform.OS === 'web' ? createDrawerNavigator() : createBottomTabNavigator();

export default function Home(){
  return(
    <N.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#f4511e'
        },
        drawerType: 'slide'
      })}
    >
      <N.Screen 
        name="Technology" 
        component={Technology} 
        options={{
          title: '首页',
          tabBarIcon:({focused, color, size }) => (
            <Iconfont name='view' size={size} color={color}/>
          ),
          drawerIcon: ({focused, color, size }) => (
            <Iconfont name='view' size={size} color={color}/>
          )
        }}
      />
      <N.Screen 
        name="Life" 
        component={Life} 
        options={{
          title: '随笔',
          tabBarIcon:({focused, color, size }) => (
            <Iconfont name='view' size={size} color={color}/>
          ),
          drawerIcon: ({focused, color, size }) => (
            <Iconfont name='view' size={size} color={color}/>
          )
        }}
      />
      <N.Screen 
        name="User" 
        component={User} 
        options={{
          title: '我的',
          tabBarIcon:({focused, color, size }) => (
            <Iconfont name='view' size={size} color={color}/>
          ),
          drawerIcon: ({focused, color, size }) => (
            <Iconfont name='view' size={size} color={color}/>
          )
        }}
      />
    </N.Navigator>
  )
}
