import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import LoadingSwitch from '../components/LoadingSwitch';
import LoginCard from '../components/LoginCard';
import TodoList from '../components/TodoList';
import RootStore from '../stores/root';
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
    root?: RootStore;
}

@inject('root')
@observer
class Content extends React.Component<IProps> {
    public render() { 
        const root = this.props.root as RootStore;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <MuiThemeProvider theme={korTheme}>
                    {root.appStore.isLogined ? (
                        <TodoList />
                    ) : (
                        <LoginCard />
                    )}
                    <LoadingSwitch />
                    {root.loadingStore.isLoading ? (
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