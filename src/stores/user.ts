import { action, observable } from "mobx"
import { UserSerializer } from '../serializer';

export default class UserStore {
    @observable public user: UserSerializer;

    @action
    public setUser = (user: UserSerializer) => {
        this.user = user;
    }
}