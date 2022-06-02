import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function User({navigation}){
  return(
    <View>
      <Text>用户</Text>
      <Button
        title="GO BACK"
        onPress={() => navigation.goBack()}
      />
      <Button
        title="GO LOGIN"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  )
}