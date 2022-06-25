import { makeAutoObservable } from 'mobx';
import { RootStore } from './index';
import { getArticles } from '@/api/article';
import { ArticleItem } from '@/types/article';
import type { StatusType } from '@/types/util';

type DataMapType = Map<
  string,
  {
    loginStatus: StatusType;
    list: ArticleItem[];
    mete: {
      currentPage: number;
      hasNext: boolean;
      hasPrev: boolean;
      size: number;
      total: number;
      totalPage: number;
    };
  }
>;
export default class ArticleStore {
  rootStore: RootStore;

  loginStatus: StatusType = 'loading';
  list: ArticleItem[] = [];
  dataMap: DataMapType = new Map();

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  async getArticles(category: string, tag: string, params?) {
    try {
      this.loginStatus = 'loading';
      const {
        result: { list, meta },
      } = await getArticles(category, tag, params);
      this.list = list;
      this.loginStatus = 'success';
    } catch (error) {
      this.loginStatus = 'error';
    }
  }

  getlistMap(type: string) {
    return this.dataMap.get(type);
  }

  fetchArticles(type: string) {}
}
