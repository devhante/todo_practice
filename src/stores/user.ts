import { action, observable } from "mobx"
import { UserSerializer } from '../serializer';
import RootStore from "./root";

export default class UserStore {
    @observable public user: UserSerializer;
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }


    @action
    public setUser = (user: UserSerializer) => {
        this.rootStore.userStore.user = user;
    }
}