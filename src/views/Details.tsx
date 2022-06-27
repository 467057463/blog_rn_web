import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Text } from '@rneui/themed';
import { getArticle } from '@/api/article';

import type { StatusType } from '@/types/util';
import type { ArticleItem } from '@/types/article';

export default observer(function Details({ route, navigation }: any) {
  const [loadingStatus, setLoadingStatus] = useState<StatusType>('loading');
  const [article, setArticle] = useState<ArticleItem>();

  async function fetchData() {
    try {
      setLoadingStatus('loading');
      const res = await getArticle(route.params.id);
      setArticle(res.result);
      // console.log(res.result);
      setLoadingStatus('success');
    } catch (error) {
      setLoadingStatus('error');
    }
  }

  useEffect(() => {
    navigation.getParent().setOptions({
      headerShown: false,
    });
    fetchData();
    navigation.setOptions({
      title: route.params.title,
    });
    return () => {
      navigation.getParent().setOptions({
        headerShown: true,
      });
    };
  }, []);

  return (
    <View style={styles.view}>
      <Text>{article?.content}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
