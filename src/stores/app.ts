import { action, observable } from "mobx";
import RootStore from "./root";

export default class AppStore {
  @observable public isLogined = false;
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  public login = () => {
    this.rootStore.appStore.isLogined = true;
  }

  @action
  public logout = () => {
    this.rootStore.appStore.isLogined = false;
  }
}