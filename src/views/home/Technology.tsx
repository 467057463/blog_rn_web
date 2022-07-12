import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hook/useStore';
import ArticleList from '@/components/articleList';

const Tab = createMaterialTopTabNavigator();

export default observer(function Technology() {
  const { tagStore } = useStore();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          width: 'auto',
          minWidth: 30,
        },
        swipeEnabled: false,
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
