import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import CompletedRatio from '../components/CompletedRatio';
import LoginCard from '../components/LoginCard';
import Search from '../components/Search';
import TodoList from '../components/TodoList';
import AppStore from '../stores/app';
import { korTheme } from '../theme';

const styles = createStyles({
    root: {
        display: 'flex',
        minHeight: 'inherit',
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
                <MuiThemeProvider theme={korTheme}>
                    {app.isLogined ? (
                        <React.Fragment>
                            <Search />
                            <CompletedRatio />
                            <TodoList />
                        </React.Fragment>
                    ) : (
                        <LoginCard />
                    )}
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withStyles(styles)(Content);