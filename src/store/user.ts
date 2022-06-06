import { makeAutoObservable } from 'mobx';
import { delay } from '@/utils';
import type { StatusType } from '@/types/util';

export default class User {
  inited: boolean = false;
  status: StatusType = 'success';
  data: any = {};

  constructor() {
    makeAutoObservable(this);
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
