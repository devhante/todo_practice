import { action, observable } from "mobx";

export default class SearchStore {
  @observable public searchWord = '';

  @action
  public setSearchWord = (value: string) => {
    this.searchWord = value;
  }
}