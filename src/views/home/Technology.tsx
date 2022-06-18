import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View, Button } from 'react-native';
import { Avatar, Icon, Text, ListItem } from '@rneui/themed';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hook/useStore';
import { ArticleItem } from '@/types/article';

import avatar from '@/assets/avatar.jpg';

const Item = (article: ArticleItem) => {
  return (
    <View style={styles.item}>
      <View style={styles.header}>
        <Avatar
          source={avatar}
          size={20}
          rounded
          containerStyle={styles.avatar}
        />
        <Text style={styles.username}>{article.author.username}</Text>
      </View>
      <View style={styles.body}>
        <Avatar source={avatar} containerStyle={styles.image} size={60} />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {article.title}
          </Text>
          <Text style={styles.describe} numberOfLines={2}>
            如果想使用除了毫秒以外的单位进行比较，则将单位作为第二个参数传入。如果想使用除了毫秒以外的单位进行比较，则将单位作为第二个参数传入。
          </Text>
        </View>
      </View>
      <View style={styles.metaInfo}>
        <View style={styles.metaItem}>
          <Icon name="like" type="iconfont" size={16} style={styles.metaIcon} />
          <Text style={styles.metaText}>{article.meta.like}</Text>
        </View>
        <View style={styles.metaItem}>
          <Icon name="view" type="iconfont" size={16} style={styles.metaIcon} />
          <Text style={styles.metaText}>{article.meta.view}</Text>
        </View>
        {/* <View  style={styles.metaItem}>
          <Icon name="like" type="iconfont" />
          {article.meta.view}
        </View> */}
        <View style={styles.createdAt}>
          <Text style={styles.createdAtText}>{article.createdAt}</Text>
        </View>
      </View>
    </View>
  );
};

export default observer(() => {
  const { articleStore } = useStore();
  useEffect(() => {
    articleStore.getArticles();
  }, [articleStore]);

  // const renderItem = ({ item }) => <Item {...item} />;
  const renderItem = ({ item: article }: { item: ArticleItem }) => (
    <ListItem.Swipeable
      bottomDivider
      leftContent={(reset) => <Button title="Info" onPress={() => reset()} />}
      rightContent={(reset) => <Button title="Info" onPress={() => reset()} />}
    >
      <ListItem.Content>
        <View style={styles.header}>
          <Avatar
            source={avatar}
            size={20}
            rounded
            containerStyle={styles.avatar}
          />
          <Text style={styles.username}>{article.author.username}</Text>
        </View>
        <View style={styles.body}>
          <Avatar source={avatar} containerStyle={styles.image} size={60} />
          <View style={styles.content}>
            <ListItem.Title style={styles.title} numberOfLines={2}>
              {article.title}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.describe} numberOfLines={2}>
              如果想使用除了毫秒以外的单位进行比较，则将单位作为第二个参数传入。如果想使用除了毫秒以外的单位进行比较，则将单位作为第二个参数传入。
            </ListItem.Subtitle>
          </View>
        </View>
        <View style={styles.metaInfo}>
          <View style={styles.metaItem}>
            <Icon
              name="like"
              type="iconfont"
              size={16}
              style={styles.metaIcon}
            />
            <Text style={styles.metaText}>{article.meta.like}</Text>
          </View>
          <View style={styles.metaItem}>
            <Icon
              name="view"
              type="iconfont"
              size={16}
              style={styles.metaIcon}
            />
            <Text style={styles.metaText}>{article.meta.view}</Text>
          </View>
          {/* <View  style={styles.metaItem}>
          <Icon name="like" type="iconfont" />
          {article.meta.view}
        </View> */}
          <View style={styles.createdAt}>
            <Text style={styles.createdAtText}>{article.createdAt}</Text>
          </View>
        </View>
      </ListItem.Content>
    </ListItem.Swipeable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={articleStore.list}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  header: {
    // height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 15,
  },
  avatar: {
    marginRight: 5,
  },
  username: {
    color: '#808080',
  },
  body: {
    // paddingHorizontal: 15,
    flexDirection: 'row',
  },
  image: {
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  describe: {
    color: '#808080',
    marginTop: 2,
  },
  metaInfo: {
    // height: 40,
    color: '#808080',
    flexDirection: 'row',
    // paddingHorizontal: 15,
    fontSize: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    marginRight: 5,
  },
  metaText: {
    marginRight: 8,
  },
  createdAt: {
    flex: 1,
    // height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // textAlign: 'right',
  },
  createdAtText: {
    color: '#808080',
  },
});
