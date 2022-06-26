import React, { useEffect, useLayoutEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button, Icon } from '@rneui/themed';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hook/useStore';
import { LargeSize } from '@/constant';
import ArticleList from '@/components/articleList';

import type { ScreenProps } from '@/types/router';

const Tab = createMaterialTopTabNavigator();

export default observer(function Technology(props: ScreenProps<'Technology'>) {
  // const dimensions = useWindowDimensions();
  const { tagStore } = useStore();

  // useLayoutEffect(() => {
  //   props.navigation.getParent('rootStack')?.setOptions({
  //     headerLeft: () =>
  //       dimensions.width < LargeSize ? (
  //         <Icon
  //           name="view"
  //           type="iconfont"
  //           onPress={() => props.navigation.toggleDrawer()}
  //           style={{ marginHorizontal: 10 }}
  //         />
  //       ) : null,
  //   });
  // }, [props.navigation, dimensions]);

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
