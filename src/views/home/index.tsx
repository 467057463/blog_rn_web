import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Technology from './Technology'
import Life from './Life'
import User from './User'

const Tab = createBottomTabNavigator();

export default function Home(){
  return(
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#f4511e'
        },
      }}
    >
      <Tab.Screen 
        name="Technology" 
        component={Technology} 
        options={{
          title: '首页'
        }}
      />
      <Tab.Screen 
        name="Life" 
        component={Life} 
        options={{
          title: '随笔'
        }}
      />
      <Tab.Screen 
        name="User" 
        component={User} 
        options={{
          title: '我的'
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
})