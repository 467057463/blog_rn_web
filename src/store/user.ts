import { autorun, makeAutoObservable, observable } from 'mobx';
import { delay } from '@/utils';
import type { StatusType } from '@/types/util';
import RootStore from './index';
export default class UserStore {
  rootStore: RootStore;
  inited: boolean = false;
  status: StatusType = 'success';
  data: any = {};

  constructor(rootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  get length() {
    return this.status.length;
  }

  // 登录
  async login() {
    this.status = 'loading';
    await delay(1000);
    this.status = 'error';
  }

  // 退出
  logout() {}
}
