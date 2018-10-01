import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { korTheme } from './theme';

const styles = createStyles({
    root: {

    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '344px',
        minHeight: '218px'
    },
    idTextField: {
        marginBottom: '18px'
    },
    pwTextField: {
        marginBottom: '24px'
    },
    loginButton: {

    }
});

type ClassNames = WithStyles<keyof typeof styles>;

class LoginCard extends React.Component<ClassNames> {
    public render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <MuiThemeProvider theme={korTheme}>
                    <Card className={classes.card}>
                        <TextField className={classes.idTextField} label="아이디" />
                        <TextField className={classes.pwTextField} label="비밀번호" type="password" />
                        <Button className={classes.loginButton} variant="contained" color="primary">로그인</Button>
                    </Card>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default withStyles(styles)(LoginCard);