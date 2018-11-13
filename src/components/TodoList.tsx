import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import { AxiosError, AxiosResponse } from 'axios';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import RootStore from '../stores/root';
import TodoCard  from './TodoCard';

const styles = createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '140px'
    }
});

interface IProps extends WithStyles<typeof styles> {
    root?: RootStore;
}

@inject('root')
@observer
class TodoList extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        const root = this.props.root as RootStore;
        root.axiosStore.create();
        this.getTodoList();
    }

    private getTodoList = () => {
        const root = this.props.root as RootStore;
        root.loadingStore.startLoading();
        root.loadingStore.endLoading();
        root.axiosStore.instance.get('todo/')
        .then((response: AxiosResponse) => {
            root.todoStore.setTodoList(response.data);
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
        const root = this.props.root as RootStore;
        const { classes } = this.props;
        
        return (
            <div className={classes.root}>
                {root.todoStore.todoList.map((item) => (
                    root.searchStore.searchWord.trim() !== '' ? (item.content.includes(root.searchStore.searchWord.trim()) ? <TodoCard key={item.id} id={item.id} /> : '') : <TodoCard key={item.id} id={item.id} />
                ))}
            </div>
        );
    }
}

export default withStyles(styles)(TodoList);