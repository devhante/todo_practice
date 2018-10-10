import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { TodoSerializer } from '../serializer';
import TodoCard  from './TodoCard';

const styles = createStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        marginTop: "120px"
    }
});

interface IProps extends WithStyles<typeof styles> { }

@observer
class Content extends React.Component<IProps> {
    @observable private todoList: TodoSerializer[] = [];

    @action
    private setTodoList = (data: TodoSerializer[]) => {
        this.todoList = data;
    }

    constructor(props: IProps) {
        super(props);
        this.getTodoList();
    }

    private getTodoList = () => {
        axios.get('https://practice.alpaca.kr/api/todo/', {
            headers: { 'Authorization': 'Token ' + localStorage.getItem('authToken') }
        })
        .then((response: AxiosResponse) => {
            this.setTodoList(response.data);
        })
        .catch((err: AxiosError) => {
            if(err.response !== undefined) {
                console.log(err.response);
            }
        });
    }

    public render() {
        const { classes } = this.props;
        
        return (
            <div className={classes.root}>
                {this.todoList.map((item) => (
                    <TodoCard data={item} />
                ))}
            </div>
        );
    }
}

export default withStyles(styles)(Content);