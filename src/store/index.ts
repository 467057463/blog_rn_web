import { configure, makeObservable, observable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserStore from './user';
import ArticleStore from './article';
import TagStore from './tag';
import { CATEGORY } from '@/constant';
import type { StatusType } from '@/types/util';

configure({
  enforceActions: 'never',
});

export class RootStore {
  userStore: UserStore;
  articleStore: ArticleStore;
  tagStore: TagStore;
  loginStatus: StatusType = 'loading';

  constructor() {
    this.userStore = new UserStore(this);
    this.articleStore = new ArticleStore(this);
    this.tagStore = new TagStore(this);

    makeObservable(this, {
      loginStatus: observable,
    });
  }

  // 项目初始化
  async init() {
    try {
      this.loginStatus = 'loading';
      await this.userStore.init();
      const tags = await this.tagStore.getTags();
      this.articleStore.initDataMap(
        [...CATEGORY, ...tags.map((item) => item._id)].filter((item) => !!item)
      );
      this.loginStatus = 'success';
    } catch (error) {
      this.loginStatus = 'error';
    }
  }
}

export default new RootStore();
