import { action, observable } from "mobx"
import { TodoSerializer } from '../Serializer';

export default class TodoStore {
    @observable public todo: TodoSerializer;

    @action
    public setTodo = (todo: TodoSerializer) => {
        this.todo = todo;
    }
}