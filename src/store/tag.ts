import { makeAutoObservable } from 'mobx';
import { RootStore } from './index';
import type { StatusType } from '@/types/util';
import { delay } from '@/utils';
import { getTags, addTag } from '@/api/tag';
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

  async addTag(name) {
    try {
      const res = await addTag(name);
      this.data.push({
        _id: res.result._id,
        name: res.result.name,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  get linking() {
    const res = this.data.reduce((prev, item) => {
      return {
        ...prev,
        [item.name]: item.name,
      };
    }, {});
    return {
      prefixes: [''],
      config: {
        screens: {
          Home: {
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
          Login: 'login',
          Draft: 'draft',
          Privacy: 'privacy',
          Create: 'create',
          Details: {
            path: 'details/:id',
          },
          Edit: {
            path: 'edit/:id',
          },
          EditCategory: {
            path: 'editCategory/:id',
          },
        },
      },
    };
  }
}
