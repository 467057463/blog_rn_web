import { makeAutoObservable } from 'mobx';
import { RootStore } from './index';

export default class UIStore {
  rootStore: RootStore;

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }
}
