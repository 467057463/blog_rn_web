import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hook/useStore';
import ArticleList from '@/components/articleList';
import Details from '@/views/Details';

import type {
  ScreenProps,
  TechnologyParamsList,
  TechnologyTabParamsList,
} from '@/types/router';

const Stack = createNativeStackNavigator<TechnologyParamsList>();
const Tab = createMaterialTopTabNavigator<TechnologyTabParamsList>();

const Home = observer(() => {
  const { tagStore } = useStore();
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
      {tagStore.data.map((tag) => (
        <Tab.Screen key={tag._id} name={tag.name}>
          {(props) => (
            <ArticleList {...props} category="TECHNICAL" tag={tag._id} />
          )}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
});

export default observer(function Technology(props: ScreenProps<'Technology'>) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen name="Details" component={Details}></Stack.Screen>
    </Stack.Navigator>
  );
});
