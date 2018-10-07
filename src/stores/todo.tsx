import { action, observable } from "mobx"
import { TodoSerializer } from '../serializer';

export default class TodoStore {
    @observable public todo: TodoSerializer;

    @action
    public setTodo = (todo: TodoSerializer) => {
        this.todo = todo;
    }
}