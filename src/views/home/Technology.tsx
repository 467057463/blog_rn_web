import React, { useEffect, useLayoutEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button, Icon } from '@rneui/themed';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hook/useStore';
import { LargeSize } from '@/constant';
import ArticleList from '@/components/articleList';

import type { CompositeScreenProps } from '@react-navigation/native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { HomeParamsList, RootStackParamsList } from '@/types/router';

type ListProps = CompositeScreenProps<
  DrawerScreenProps<HomeParamsList, 'Technology'>,
  NativeStackScreenProps<RootStackParamsList, 'Home', 'rootStack'>
>;

const Tab = createMaterialTopTabNavigator();

export default observer(function Technology(props: ListProps) {
  const dimensions = useWindowDimensions();
  const { tagStore } = useStore();

  useLayoutEffect(() => {
    props.navigation.getParent('rootStack')?.setOptions({
      headerLeft: () =>
        dimensions.width < LargeSize ? (
          <Icon
            name="view"
            type="iconfont"
            onPress={() => props.navigation.toggleDrawer()}
            style={{ marginHorizontal: 10 }}
          />
        ) : null,
    });
  }, [props.navigation, dimensions]);

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
              {...(props as ListProps)}
              category="TECHNICAL"
              tag={tag._id}
            />
          )}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
});
