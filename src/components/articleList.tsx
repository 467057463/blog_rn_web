import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Avatar, Icon, Text, ListItem, useTheme, Button } from '@rneui/themed';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';

import { useStore } from '@/hook/useStore';
import ListEmpty from '@/components/ListEmpty';
import ListFooter from '@/components/ListFooter';
import { ArticleItem } from '@/types/article';
import avatar from '@/assets/avatar.jpg';

export default observer(({ category, tag, navigation }: any) => {
  const { articleStore } = useStore();
  const { theme } = useTheme();

  const data = computed(() => articleStore.getDataMap(tag || category)).get()!;

  // 获取数据
  function getList(category: string, tag: string, params?) {
    articleStore.getArticles(category, tag, params);
  }

  // 加载更多
  function loadmore() {
    if (!data.meta.hasNext || data.loginStatus === 'loading') {
      return;
    }
    getList(category, tag, {
      page: data.meta.currentPage + 1,
    });
  }

  // 初始化加载数据
  useEffect(() => {
    getList(category, tag);
  }, []);

  // 列表项
  const renderItem = ({ item: article }: { item: ArticleItem }) => (
    <ListItem.Swipeable
      bottomDivider
      leftContent={(reset) => (
        <Button
          title="Info"
          onPress={() => reset()}
          icon={{ name: 'info', color: 'white' }}
          buttonStyle={{ minHeight: '100%' }}
        />
      )}
      rightContent={(reset) => (
        <Button
          title="Delete"
          onPress={() => reset()}
          icon={{ name: 'delete', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
        />
      )}
      onPress={() =>
        navigation.navigate('Details', {
          id: article._id,
          title: article.title,
        })
      }
    >
      <ListItem.Content>
        <View style={styles.header}>
          <Avatar
            source={avatar}
            size={20}
            rounded
            containerStyle={styles.avatar}
          />
          <Text style={styles.username} selectable={false}>
            {article.author.username}
          </Text>
        </View>
        <View style={styles.body}>
          <Avatar source={avatar} containerStyle={styles.image} size={60} />
          <View style={styles.content}>
            <ListItem.Title
              style={styles.title}
              numberOfLines={2}
              selectable={false}
            >
              {article.title}
            </ListItem.Title>
            <ListItem.Subtitle
              style={styles.describe}
              numberOfLines={2}
              selectable={false}
            >
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
            <Text style={styles.metaText} selectable={false}>
              {article.meta.like}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Icon
              name="view"
              type="iconfont"
              size={16}
              style={styles.metaIcon}
            />
            <Text style={styles.metaText} selectable={false}>
              {article.meta.view}
            </Text>
          </View>
          {/* <View  style={styles.metaItem}>
          <Icon name="like" type="iconfont" />
          {article.meta.view}
        </View> */}
          <View style={styles.createdAt}>
            <Text style={styles.createdAtText} selectable={false}>
              {article.createdAt}
            </Text>
          </View>
        </View>
      </ListItem.Content>
    </ListItem.Swipeable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.container}
        data={data.list}
        renderItem={renderItem}
        onEndReached={loadmore}
        onEndReachedThreshold={0.1}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={() => <ListEmpty category={category} tag={tag} />}
        ListFooterComponent={() => <ListFooter category={category} tag={tag} />}
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
    marginTop: 15,
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
    marginTop: 15,
    color: '#808080',
    flexDirection: 'row',
    // paddingHorizontal: 15,
    fontSize: 12,
    width: '100%',
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
