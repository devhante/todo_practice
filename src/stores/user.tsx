import { action, observable } from "mobx"
import { UserSerializer } from '../Serializer';

export default class UserStore {
    @observable public user: UserSerializer;

    @action
    public setUser = (user: UserSerializer) => {
        this.user = user;
    }
}