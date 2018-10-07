import { action, observable } from "mobx";

export default class AppStore {
    @observable public isLogined = false;

    @action
    public logined = () => {
      this.isLogined = true;
    }
  }