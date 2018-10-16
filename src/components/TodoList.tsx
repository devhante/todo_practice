import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import LoadingStore from '../stores/loading'
import SearchStore from '../stores/search';
import TodoStore from '../stores/todo'
import TodoCard  from './TodoCard';

const styles = createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '64px'
    }
});

interface IProps extends WithStyles<typeof styles> {
    loading?: LoadingStore
    search?: SearchStore;
    todo?: TodoStore;
}

@inject('loading', 'search', 'todo')
@observer
class TodoList extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.getTodoList();
        console.log('constructor 호출됨');
    }

    private getTodoList = () => {
        const loading = this.props.loading as LoadingStore;
        const todo = this.props.todo as TodoStore;
        loading.startLoading();
        loading.endLoading();
        axios.get('https://practice.alpaca.kr/api/todo/', {
            headers: { 'Authorization': 'Token ' + localStorage.getItem('authToken') }
        })
        .then((response: AxiosResponse) => {
            todo.setTodoList(response.data);
            console.log(response.data);
            // loading.endLoading();
        })
        .catch((err: AxiosError) => {
            if(err.response !== undefined) {
                console.log(err.response);
            }
            // loading.endLoading();
        });
    }

    public render() {
        const search = this.props.search as SearchStore;
        const todo = this.props.todo as TodoStore;
        const { classes } = this.props;
        
        return (
            <div className={classes.root}>
                {todo.todoList.map((item) => (
                    search.searchWord.trim() !== '' ? (item.content.includes(search.searchWord.trim()) ? <TodoCard id={item.id} /> : '') : <TodoCard id={item.id} />
                ))}
            </div>
        );
    }
}

export default withStyles(styles)(TodoList);