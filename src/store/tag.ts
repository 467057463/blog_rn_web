import { makeAutoObservable } from 'mobx';
import { RootStore } from './index';
import type { StatusType } from '@/types/util';
import { delay } from '@/utils';
import { getTags } from '@/api/tag';
import type { TagItem } from '@/types/tag';

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
      const res = await getTags();
      this.data = res;
      this.loginStatus = 'success';
      return res;
    } catch (error) {
      this.loginStatus = 'error';
      return Promise.reject(error);
    }
  }

  get linking() {
    const res = this.data.reduce(
      (prev, item) => {
        return {
          ...prev,
          [item.name]: item.name,
        };
      },
      { All: 'all' }
    );
    return {
      prefixes: [''],
      config: {
        screens: {
          Login: 'login',
          Details: {
            path: 'details/:id',
          },
          Home: {
            path: 'home',
            screens: {
              Technology: {
                path: 'technology',
                exact: true,
                screens: res,
              },
              Life: {
                path: 'life',
                exact: true,
              },
              About: {
                path: 'about',
                exact: true,
              },
            },
          },
        },
      },
    };
  }
}
