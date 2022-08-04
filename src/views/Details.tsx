import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Icon, Image, Text } from '@rneui/themed';
import { useToast } from 'react-native-toast-notifications';

import { getArticle } from '@/api/article';
import Markdown from '@/components/Markdown';

import type { StatusType } from '@/types/util';
import type { ArticleItem } from '@/types/article';
import { useStore } from '@/hook/useStore';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import dayjs from 'dayjs';

export default observer(function Details({ route, navigation }: any) {
  const toast = useToast();
  const [loadingStatus, setLoadingStatus] = useState<StatusType>('loading');
  const [article, setArticle] = useState<ArticleItem>();
  const { articleStore } = useStore();

  // 获取数据
  async function fetchData() {
    try {
      setLoadingStatus('loading');
      const res = await getArticle(route.params.id);
      setArticle(res.result);
      setLoadingStatus('success');
    } catch (error) {
      setLoadingStatus('error');
    }
  }

  // 点赞
  async function likeArticle() {
    try {
      await articleStore.likeArticle(route.params.id);
      toast.show('点赞成功', {
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
    articleStore.viewArticle(route.params.id);
    navigation.setOptions({
      title: route.params.title,
    });
  }, []);

  if (loadingStatus === 'loading') {
    return <Loading />;
  }

  if (loadingStatus === 'error') {
    return <Error />;
  }

  return (
    <ScrollView style={styles.view}>
      {!!article?.cover && (
        <Image source={{ uri: article?.cover }} style={styles.image} />
      )}
      <Text style={styles.title} numberOfLines={2}>
        {article?.title}
      </Text>
      <View style={styles.markdown}>
        <Markdown>{article?.content}</Markdown>
      </View>
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
          <Text style={styles.createdAtText}>
            {dayjs(article?.createdAt).format('YYYY/MM/DD HH:mm:ss')}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.like}>
          <Icon
            reverse
            name="good"
            type="iconfont"
            color="#fe9404"
            onPress={() => likeArticle()}
          />
          <Text style={styles.likeText}>点赞鼓励一下！</Text>
        </View>
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
    marginTop: 15,
  },
  image: {
    width: '100%',
    height: 180,
  },
  markdown: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
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
    marginTop: 25,
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
