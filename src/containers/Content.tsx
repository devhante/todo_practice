import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import LoadingSwitch from '../components/LoadingSwitch';
import LoginCard from '../components/LoginCard';
import TodoList from '../components/TodoList';
import AppStore from '../stores/app';
import LoadingStore from '../stores/loading';
import { korTheme } from '../theme';


const styles = createStyles({
    root: {
        display: 'flex',
        minHeight: 'inherit',
        flexDirection: 'column'
    },
    progress: {
        display: 'flex',
        position: 'fixed',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

interface IProps extends WithStyles<typeof styles> {
    app?: AppStore;
    loading?: LoadingStore;
}

@inject('app', 'loading')
@observer
class Content extends React.Component<IProps> {
    public render() { 
        const app = this.props.app as AppStore;
        const loading = this.props.loading as LoadingStore;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <MuiThemeProvider theme={korTheme}>
                    {app.isLogined ? (
                        <TodoList />
                    ) : (
                        <LoginCard />
                    )}
                    <LoadingSwitch />
                    {loading.isLoading ? (
                        <div className={classes.progress}>
                            <CircularProgress />
                        </div>
                    ) : ('')}
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withStyles(styles)(Content);