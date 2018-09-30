import AppBar from '@material-ui/core/AppBar';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import theme from './theme';

const styles = createStyles({
    root: {
        display: 'flex'
    }
});

type ClassNames = WithStyles<keyof typeof styles>;

class MyAppBar extends React.Component<ClassNames> {
    public render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <MuiThemeProvider theme={theme}>
                    <AppBar color='primary'>
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                                TODO Practice
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withStyles(styles)(MyAppBar);