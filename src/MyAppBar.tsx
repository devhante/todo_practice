import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { createStyles, withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import AppStore from './stores/app'
import { engTheme, korTheme } from './theme';

const styles = createStyles({
    root: {

    },
    title: {
        flexGrow: 1
    },
    buttonLogout: {
        color: 'white',
        fontSize: '16px'
    }
});

@inject('app')
@observer
class MyAppBar extends React.Component {
    public render() {
        const app = this.props as AppStore;
        return (
            <div className={styles.root.toString()}>
                <MuiThemeProvider theme={engTheme}>
                    <AppBar color='primary'>
                        <Toolbar>
                            <Typography className={styles.title.toString()} variant="title" color="inherit">
                                TODO Practice
                            </Typography>

                            {app.isLogined ? (
                            <MuiThemeProvider theme={korTheme}>
                                <Button className={styles.buttonLogout.toString()}>로그아웃</Button>
                            </MuiThemeProvider>
                            ) : ('')}
                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withStyles(styles)(MyAppBar);