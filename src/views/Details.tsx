import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Avatar, Icon, Image, Text, Button } from '@rneui/themed';
// import Markdown from 'react-native-markdown-renderer';
import { getArticle } from '@/api/article';
import Markdown from '@/components/Markdown';

import type { StatusType } from '@/types/util';
import type { ArticleItem } from '@/types/article';
import avatar from '@/assets/avatar.jpg';
import { useStore } from '@/hook/useStore';

export default observer(function Details({ route, navigation }: any) {
  const [loadingStatus, setLoadingStatus] = useState<StatusType>('loading');
  const [article, setArticle] = useState<ArticleItem>();
  const { userStore } = useStore();
  async function fetchData() {
    try {
      setLoadingStatus('loading');
      const res = await getArticle(route.params.id);
      setArticle(res.result);
      console.log(res.result);
      setLoadingStatus('success');
    } catch (error) {
      setLoadingStatus('error');
    }
  }

  useEffect(() => {
    fetchData();
    navigation.setOptions({
      title: route.params.title,
    });
  }, []);

  if (loadingStatus === 'loading') {
    return <Text>loading....</Text>;
  }

  if (loadingStatus === 'error') {
    return <Text>error....</Text>;
  }

  return (
    <ScrollView style={styles.view}>
      <Image source={require('@/assets/banner.png')} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>
        {article?.title}
      </Text>
      <View style={styles.markdown}>
        <Markdown>{article?.content}</Markdown>
      </View>
      {/* <View style={styles.header}>
        <Avatar
          source={avatar}
          size={20}
          rounded
          containerStyle={styles.avatar}
        />
        <Text style={styles.username}>{article?.author.username}</Text>
      </View> */}
      <View style={styles.metaInfo}>
        <View style={styles.metaItem}>
          <Icon name="like" type="iconfont" size={16} style={styles.metaIcon} />
          <Text style={styles.metaText}>{article?.meta.like}</Text>
        </View>
        <View style={styles.metaItem}>
          <Icon name="view" type="iconfont" size={16} style={styles.metaIcon} />
          <Text style={styles.metaText}>{article?.meta.view}</Text>
        </View>
        <View style={styles.createdAt}>
          <Text style={styles.createdAtText}>{article?.createdAt}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.like}>
          <Icon
            reverse
            name="view"
            type="iconfont"
            color="#2089dc"
            onPress={() => console.log('hello')}
          />
          <Text style={styles.likeText}>点赞</Text>
        </View>

        {!userStore.logined && (
          <View style={styles.actions}>
            <Button type="clear" size="sm" titleStyle={styles.buttonStyle}>
              删除
            </Button>
            <Button type="clear" size="sm" titleStyle={styles.buttonStyle}>
              编辑
            </Button>
            <Button type="clear" size="sm" titleStyle={styles.buttonStyle}>
              编辑分类
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  avatar: {
    marginRight: 5,
  },
  username: {
    color: '#808080',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 180,
    marginBottom: 15,
  },
  markdown: {
    paddingHorizontal: 20,
  },
  metaInfo: {
    color: '#808080',
    flexDirection: 'row',
    fontSize: 12,
    width: '100%',
    paddingHorizontal: 20,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  createdAtText: {
    color: '#808080',
  },

  footer: {
    alignItems: 'center',
    marginTop: 15,
    paddingBottom: 15,
  },
  like: {
    alignItems: 'center',
  },
  likeText: {
    color: '#808080',
  },
  actions: {
    flexDirection: 'row',
    fontSize: 14,
  },
  buttonStyle: {
    fontSize: 14,
  },
});
