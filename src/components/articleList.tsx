import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Avatar, Icon, Text, ListItem, useTheme } from '@rneui/themed';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';

import { useNavigation } from '@react-navigation/native';

import { useStore } from '@/hook/useStore';
import ListEmpty from '@/components/ListEmpty';
import ListFooter from '@/components/ListFooter';
import { ArticleItem } from '@/types/article';
import avatar from '@/assets/avatar.jpg';
import type { ScreenProps } from '@/types/router';
type Props = {
  category: 'TECHNICAL' | 'LIFE' | 'PRIVACY' | 'DRAFT';
  tag: string;
};

// import type { CompositeScreenProps } from '@react-navigation/native';
// import type { DrawerScreenProps } from '@react-navigation/drawer';
// import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// import type { HomeParamsList, RootStackParamsList } from '@/types/router';

// // type ListProps = NativeStackScreenProps<RootStackParamsList, 'Home'>;
// type ListProps = CompositeScreenProps<
//   DrawerScreenProps<HomeParamsList, 'Technology' | 'Life'>,
//   NativeStackScreenProps<RootStackParamsList>
// >;

export default observer(
  ({
    category,
    tag,
    navigation,
  }: ScreenProps<'Technology' | 'Life'> & Props) => {
    const { articleStore } = useStore();
    const { theme } = useTheme();
    // const navigation = useNavigation<ListProps['navigation']>();

    const data = computed(() =>
      articleStore.getDataMap(tag || category)
    ).get()!;

    // 获取数据
    function getList(category: string, tag: string, params?) {
      articleStore.getArticles(category, tag, params);
    }

    // 加载更多
    function loadmore() {
      if (!data.meta.hasNext) {
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
      <ListItem
        bottomDivider
        onPress={() =>
          navigation.navigate('Details', {
            id: article._id,
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
      </ListItem>
    );

    return (
      <View style={styles.container}>
        <FlatList
          data={data.list}
          renderItem={renderItem}
          onEndReached={loadmore}
          onEndReachedThreshold={0.95}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={() => <ListEmpty category={category} tag={tag} />}
          ListFooterComponent={() => (
            <ListFooter category={category} tag={tag} />
          )}
        />
      </View>
    );
  }
);

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
