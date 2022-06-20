import { makeAutoObservable } from 'mobx';
import { RootStore } from './index';
import type { StatusType } from '@/types/util';
import { delay } from '@/utils';

type TagItem = {
  name: string;
  _id: string;
};

export default class TagStore {
  rootStore: RootStore;

  loginStatus: StatusType = 'loading';
  data: TagItem[] = [];

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  async getTags() {
    try {
      this.loginStatus = 'loading';
      await delay(1000);
      this.data = [
        {
          name: 'css',
          _id: '1',
        },
        {
          name: 'js',
          _id: '2',
        },
      ];
      this.loginStatus = 'success';
    } catch (error) {
      this.loginStatus = 'error';
    }
  }
}
