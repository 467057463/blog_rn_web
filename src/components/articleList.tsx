import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Avatar, Icon, Text, ListItem, useTheme, Image } from '@rneui/themed';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import dayjs from 'dayjs';

import { useStore } from '@/hook/useStore';
import ListEmpty from '@/components/ListEmpty';
import ListFooter from '@/components/ListFooter';
import { ArticleItem } from '@/types/article';
import avatar from '@/assets/avatar.jpg';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

export default observer(({ category, tag, navigation }: any) => {
  const { articleStore, userStore } = useStore();

  const data = computed(() => {
    const data = articleStore.getDataMap(tag || category);
    const list = data.listId.map((id) => articleStore.listMap.get(id)!);
    // console.log(data, list, articleStore.listMap);
    return { ...data, list };
  }).get()!;

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

  const CustomTag = userStore.logined ? ListItem.Swipeable : ListItem;

  // 列表项
  const ArticleItem = observer(({ article }: { article: ArticleItem }) => {
    return (
      <CustomTag
        bottomDivider
        rightContent={(reset) => (
          <>
            <TouchableOpacity
              style={[styles.articleButton, { backgroundColor: '#fe9404' }]}
              onPress={() => {
                navigation.navigate('Edit', {
                  id: article._id,
                });
                reset();
              }}
            >
              <Icon name="edit_info" type="iconfont" size={16} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.articleButton, { backgroundColor: '#ff6d03' }]}
              onPress={() => {
                navigation.navigate('EditCategory', {
                  id: article._id,
                });
                reset();
              }}
            >
              <Icon name="edit" type="iconfont" size={16} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.articleButton, { backgroundColor: '#ff3b32' }]}
              onPress={() => reset()}
            >
              <Icon name="delete" type="iconfont" size={16} color="#fff" />
            </TouchableOpacity>
          </>
        )}
        rightWidth={120}
        rightStyle={{ flexDirection: 'row' }}
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
            {!!article.cover && (
              <Image
                source={{ uri: article.cover }}
                containerStyle={styles.image}
                resizeMode="cover"
              />
            )}
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
                {article.describe || '暂无描述'}
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

            <View style={styles.createdAt}>
              <Text style={styles.createdAtText} selectable={false}>
                {dayjs(article.createdAt).format('YYYY/MM/DD HH:mm:ss')}
              </Text>
            </View>
          </View>
        </ListItem.Content>
      </CustomTag>
    );
  });

  const renderItem = ({ item: article }: { item: ArticleItem }) => {
    return <ArticleItem article={article} />;
  };

  return (
    <View style={styles.container}>
      {!data.inited && data.loginStatus === 'loading' && <Loading />}
      {!data.inited && data.loginStatus === 'error' && <Error />}
      {data.inited && (
        <FlatList
          data={data.list}
          renderItem={renderItem}
          onEndReached={loadmore}
          onEndReachedThreshold={0.1}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={() => <ListEmpty category={category} tag={tag} />}
          ListFooterComponent={() => (
            <ListFooter category={category} tag={tag} />
          )}
        />
      )}
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
    width: 100,
    height: 82,
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
  articleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
});
