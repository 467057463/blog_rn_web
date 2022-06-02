import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../App'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
export default function Home({navigation}:Props){
  return(
    <View style={styles.view}>
      <Text>Home screenab</Text>
      <Button 
        title="go to Details"
        onPress={() => navigation.navigate('Details', {
          id: 1111
        })}
      />
      
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
})