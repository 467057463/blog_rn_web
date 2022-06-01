 import React from 'react';
 import { NavigationContainer, TabRouter } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 import Home from './views/Home'
 import Details from './views/Details'

 export type RootStackParamList = {
  Home: undefined;
  Details: {
    id: number
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
 const App = () => { 
   return (
    <NavigationContainer>    
      <Stack.Navigator 
        initialRouteName='Home'
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#f4511e'
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            title: '首页',            
          }}
        />
        <Stack.Screen name="Details" 
          component={Details}
          options={({route}) => ({
            title: String(route.params.id)
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default App;
 