import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
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

interface IProps extends WithStyles<typeof styles> {
    app?: AppStore;
}

@inject('app')
@observer
class MyAppBar extends React.Component<IProps> {
    public render() {
        const app = this.props.app as AppStore;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <MuiThemeProvider theme={engTheme}>
                    <AppBar color='primary'>
                        <Toolbar>
                            <Typography className={classes.title} variant="title" color="inherit">
                                TODO Practice
                            </Typography>

                            {app.isLogined ? (
                            <MuiThemeProvider theme={korTheme}>
                                <Button className={classes.buttonLogout}>로그아웃</Button>
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