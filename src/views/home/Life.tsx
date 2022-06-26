import React, { useEffect, useLayoutEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import ArticleList from '@/components/articleList';
import { observer } from 'mobx-react-lite';
import { LargeSize } from '@/constant';

export default observer(function Life({ navigation }: any) {
  const dimensions = useWindowDimensions();

  useLayoutEffect(() => {
    navigation.getParent('rootStack').setOptions({
      headerLeft: () =>
        dimensions.width < LargeSize ? (
          <Icon
            name="view"
            type="iconfont"
            onPress={() => navigation.toggleDrawer()}
            style={{ marginHorizontal: 10 }}
          />
        ) : null,
    });
  }, [navigation, dimensions]);

  return <ArticleList category="LIFE" tag="" />;
});
