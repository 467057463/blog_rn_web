import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hook/useStore';
import ArticleList from '@/components/articleList';
import Details from '@/views/Details';
import type { ScreenProps } from '@/types/router';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

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
            <ArticleList
              {...(props as ScreenProps<'Technology'>)}
              category="TECHNICAL"
              tag={tag._id}
            />
          )}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
});

export default observer(function Technology(props: ScreenProps<'Technology'>) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
      <Stack.Screen name="Details" component={Details}></Stack.Screen>
    </Stack.Navigator>
  );
});
