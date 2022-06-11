import { configure } from 'mobx';
import UserStore from './user';
import ArticleStore from './article';

configure({
  enforceActions: 'never',
});

export default class RootStore {
  userStore: UserStore;
  articleStore: ArticleStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.articleStore = new ArticleStore(this);
  }
}
