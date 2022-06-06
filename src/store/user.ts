import { makeAutoObservable } from 'mobx';

export default class User {
  state = 'initing';

  constructor() {
    makeAutoObservable(this);
  }
}
