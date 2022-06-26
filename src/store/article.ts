import { makeAutoObservable } from 'mobx';
import { RootStore } from './index';
import { getArticles } from '@/api/article';
import { ArticleItem } from '@/types/article';

import type { StatusType } from '@/types/util';
import type { GetArticlesRespon } from '@/types/article';

type DataMapType = Map<
  string,
  {
    loginStatus: StatusType;
    inited: boolean;
    list: ArticleItem[];
    meta: {
      currentPage: number;
      hasNext: boolean;
    };
  }
>;
export default class ArticleStore {
  rootStore: RootStore;
  dataMap: DataMapType = new Map();

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  // 初始化数据结构
  initDataMap(keys: string[]) {
    keys.forEach((key) => {
      this.dataMap.set(key, {
        loginStatus: 'loading',
        inited: false,
        list: [],
        meta: {
          currentPage: 0,
          hasNext: true,
        },
      });
    });
  }

  getDataMap(type: string) {
    return this.dataMap.get(type);
  }

  async getArticles(category: string, tag: string, params?) {
    const map = this.getDataMap(tag || category)!;

    try {
      map.loginStatus = 'loading';
      const {
        result: { list, meta },
      } = await getArticles(category, tag, params);

      map.list = [...map.list, ...list];
      map.meta = meta;
      map.loginStatus = 'success';
      map.inited = true;
    } catch (error) {
      map.loginStatus = 'error';
    }
  }

  fetchArticles(type: string) {}
}
