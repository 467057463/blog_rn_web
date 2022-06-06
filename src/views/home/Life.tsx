import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Life({ navigation }) {
  return (
    <View>
      <Text>随笔</Text>
      <Button title="GO BACK" onPress={() => navigation.goBack()} />
    </View>
  );
}
