import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import TodoStore from '../stores/todo'
import TodoCard  from './TodoCard';

const styles = createStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        marginTop: "120px"
    }
});

interface IProps extends WithStyles<typeof styles> {
    todo?: TodoStore;
}

@inject('todo')
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
        const todo = this.props.todo as TodoStore;
        const { classes } = this.props;
        
        return (
            <div className={classes.root}>
                {todo.todoList.map((item) => (
                    <TodoCard id={item.id} />
                ))}
            </div>
        );
    }
}

export default withStyles(styles)(Content);