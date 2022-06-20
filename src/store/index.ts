import { configure } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserStore from './user';
import ArticleStore from './article';
import TagStore from './tag';

configure({
  enforceActions: 'never',
});

export class RootStore {
  userStore: UserStore;
  articleStore: ArticleStore;
  tagStore: TagStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.articleStore = new ArticleStore(this);
    this.tagStore = new TagStore(this);
  }
}

export default new RootStore();
