import { action, observable } from "mobx"
import { TodoSerializer } from '../serializer';

export default class TodoStore {
    @observable public todoList: TodoSerializer[] = [];

    @action
    public setTodoList = (data: TodoSerializer[]) => {
        this.todoList = data;
    }

    @action
    public addTodo = (data: TodoSerializer) => {
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

    @action
    public revertTodo = (id: number) => {
        this.todoList.forEach((item) => {
            if(item.id === id) {
                item.isCompleted = false;
            }
        })
    }

    @action
    public completeTodo = (id: number, completedAt: string) => {
        this.todoList.forEach((item) => {
            if(item.id === id) {
                item.isCompleted = true;
                item.completedAt = completedAt;
            }
        })
    }

    @action
    public deleteTodo = (id: number) => {
        let index = 0;
        this.todoList.forEach((item) => {
            console.log(item.id);
            console.log(id);
            if(item.id === id) {
                console.log(id);
                this.todoList.splice(index, 1);
            }
            index += 1;
        });
    }

    
}