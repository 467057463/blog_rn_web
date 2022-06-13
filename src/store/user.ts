import { autorun, makeAutoObservable, observable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { delay } from '@/utils';
import { RootStore } from './index';
import { login } from '@/api/user';
import type { StatusType } from '@/types/util';

type UserData = {
  _id: string;
  username: string;
  token: string;
};

export default class UserStore {
  rootStore: RootStore;
  inited: boolean = false;
  logined: boolean = false;
  data?: UserData = undefined;

  constructor(rootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  async init() {
    const res = await AsyncStorage.getItem('user');
    if (res) {
      this.logined = true;
      this.data = JSON.parse(res);
    }
  }

  // 登录
  async login(params) {
    try {
      const res = await login(params);
      const data = {
        _id: res.result.user._id,
        username: res.result.user.username,
        token: res.result.token,
      };
      this.data = data;
      await AsyncStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  // 退出
  logout() {}
}
