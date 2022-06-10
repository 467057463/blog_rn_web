import { makeAutoObservable } from 'mobx';
import RootStore from './index';

export default class ArticleStore {
  rootStore: RootStore;

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  getStatus() {
    return this.rootStore.userStore.status;
  }
}
