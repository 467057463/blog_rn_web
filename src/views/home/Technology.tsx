import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hook/useStore';
import { ArticleItem } from '@/types/article';

const articleItem = (article) => {
  return (
    <View>
      <Text>{article.title}</Text>
    </View>
  );
};

export default observer(() => {
  const { userStore, articleStore } = useStore();
  // useEffect(() => {
  //   articleStore.getArticles();
  // }, []);
  // articleStore.getArticles();
  return (
    <View>
      <Text>{userStore.data?.username}</Text>
      {/* <Button title="GO DETAILS" /> */}
      <Text>{articleStore.list.length}</Text>
      {/* <FlatList data={articleStore.list} renderItem={articleItem} /> */}
    </View>
  );
});
