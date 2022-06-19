import React, { useLayoutEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button, Icon } from '@rneui/themed';
import All from './All';

const Tab = createMaterialTopTabNavigator();

export default function Technology({ navigation }) {
  const dimensions = useWindowDimensions();

  useLayoutEffect(() => {
    navigation.getParent('rootStack').setOptions({
      headerLeft: () =>
        dimensions.width < 768 ? (
          // <Button onPress={() => navigation.toggleDrawer()}>text</Button>
          <Icon
            name="view"
            type="iconfont"
            onPress={() => navigation.toggleDrawer()}
            style={{ marginHorizontal: 10 }}
          />
        ) : null,
    });
  }, [navigation, dimensions]);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          width: 'auto',
          minWidth: 30,
        },
        lazy: true,
      }}
    >
      <Tab.Screen name="All" component={All} />
      <Tab.Screen name="css" component={All} />
      <Tab.Screen name="javascript" component={All} />
      <Tab.Screen name="typescript" component={All} />
      <Tab.Screen name="vue" component={All} />
      <Tab.Screen name="react" component={All} />
      <Tab.Screen name="react native" component={All} />
      <Tab.Screen name="liunx" component={All} />
      <Tab.Screen name="flutter" component={All} />
    </Tab.Navigator>
  );
}
