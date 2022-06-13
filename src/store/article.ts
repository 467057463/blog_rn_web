import { makeAutoObservable } from 'mobx';
import { RootStore } from './index';
import { getArticles } from '@/api/article';
import { ArticleItem } from '@/types/article';
import { StatusType } from '@/types/util';
export default class ArticleStore {
  rootStore: RootStore;

  loginStatus: StatusType = 'loading';
  list: ArticleItem[] = [];

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  async getArticles() {
    try {
      this.loginStatus = 'loading';
      const {
        result: { list, meta },
      } = await getArticles();
      this.list = list;
      this.loginStatus = 'success';
    } catch (error) {
      this.loginStatus = 'error';
    }
  }
}
