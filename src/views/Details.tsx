import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../App'
type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function Home({route, navigation}: Props){
  return(
    <View style={styles.view}>
      <Text>Details {route.params.id}</Text>
      <Button 
        title="Go to details algin ..."
        onPress={() => navigation.push('Details', {
          id: String(Math.random())
        })}
      />
      <Button 
        title="go Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button 
        title="go back"
        onPress={() => navigation.goBack()}
      />
      <Button
        title="set Params"
        onPress={() => navigation.setParams({id: '55555'}) }
      />

      <Button
        title="GO TO USER"
        onPress={() => navigation.navigate('Home', {screen: 'User'}) }
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