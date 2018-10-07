import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import LoginCard from '../components/LoginCard';
import TodoList from '../components/TodoList';
import AppStore from '../stores/app';

const styles = createStyles({
    root: {
        display: 'flex',
        height: 'inherit',
        flexDirection: 'column'
    }
});

interface IProps extends WithStyles<typeof styles> {
    app?: AppStore;
}

@inject('app')
@observer
class Content extends React.Component<IProps> {
    public render() { 
        const app = this.props.app as AppStore;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {app.isLogined ? (
                    <TodoList />
                ) : (
                    <LoginCard />
                )}
            </div>
        );
    }
}

export default withStyles(styles)(Content);