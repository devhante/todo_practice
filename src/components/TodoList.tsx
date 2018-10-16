import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
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
    search?: SearchStore;
    todo?: TodoStore;
}

@inject('search', 'todo')
@observer
class Content extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
        this.getTodoList();
    }

    private getTodoList = () => {
        const todo = this.props.todo as TodoStore;
        axios.get('https://practice.alpaca.kr/api/todo/', {
            headers: { 'Authorization': 'Token ' + localStorage.getItem('authToken') }
        })
        .then((response: AxiosResponse) => {
            todo.setTodoList(response.data);
            console.log(response.data);
        })
        .catch((err: AxiosError) => {
            if(err.response !== undefined) {
                console.log(err.response);
            }
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

export default withStyles(styles)(Content);