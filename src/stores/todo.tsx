import { action, observable } from "mobx"
import { TodoSerializer } from '../serializer';

export default class TodoStore {
    @observable public todoList: TodoSerializer[] = [];

    @action
    public setTodoList = (data: TodoSerializer[]) => {
        this.todoList = data;
    }

    @action
    public addTodoList = (data: TodoSerializer) => {
        this.todoList.push(data);
    }

    @action
    public setLike = (id: number, like: number) => {
        this.todoList.forEach((item) => {
            if(item.id === id) {
                item.like = like;
            }
        });
    }
}