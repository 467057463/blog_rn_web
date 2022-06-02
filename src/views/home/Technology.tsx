import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Technology({navigation}){
  return(
    <View>
      <Text>export</Text>
      <Button
        title="GO BACK"
        onPress={() => navigation.goBack()}
      />
      <Button
        title="GO DETAILS"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  )
}