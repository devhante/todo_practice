import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import TodoStore from '../stores/todo';

const styles = createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '12px'
    },
    text: {

    }
});

interface IProps extends WithStyles<typeof styles> {
    todo?: TodoStore;
}

@inject('todo')
@observer
class CompletedRatio extends React.Component<IProps> {
    public render() {
        const todo = this.props.todo as TodoStore;
        const { classes } = this.props;
        const count = todo.todoList.length;
        let completedCount = 0

        todo.todoList.forEach((item) => {
            if(item.isCompleted) {
                completedCount++;
            }
        });


        return (
            <div className={classes.root}>
                <Typography className={classes.text}>
                    {count === 0 ? 0 : Math.ceil(completedCount / count * 10000) / 100}% 완료되었습니다. ({count}개 중 {completedCount}개 완료)
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles)(CompletedRatio);