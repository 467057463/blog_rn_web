import React, { useEffect, useLayoutEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import ArticleList from '@/components/articleList';
import { observer } from 'mobx-react-lite';
import { LargeSize } from '@/constant';

import type { ScreenProps } from '@/types/router';
// import type { CompositeScreenProps } from '@react-navigation/native';
// import type { DrawerScreenProps } from '@react-navigation/drawer';
// import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// import type { HomeParamsList, RootStackParamsList } from '@/types/router';

// type ListProps = CompositeScreenProps<
//   DrawerScreenProps<HomeParamsList, 'Life'>,
//   NativeStackScreenProps<RootStackParamsList, 'Home', 'rootStack'>
// >;

export default observer(function Life(props: ScreenProps<'Life'>) {
  // const dimensions = useWindowDimensions();

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

  return <ArticleList {...props} category="LIFE" tag="" />;
});
