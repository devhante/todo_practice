import { action, observable } from "mobx";

export default class AppStore {
  @observable public isLogined = false;

  @action
  public login = () => {
    this.isLogined = true;
  }

  @action
  public logout = () => {
    this.isLogined = false;
  }
}