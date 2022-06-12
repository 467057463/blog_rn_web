import { configure } from 'mobx';
import UserStore from './user';
import ArticleStore from './article';

configure({
  enforceActions: 'never',
});

export class RootStore {
  userStore: UserStore;
  articleStore: ArticleStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.articleStore = new ArticleStore(this);
  }
}

export default new RootStore();
