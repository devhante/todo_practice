import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import axios, { AxiosError, AxiosResponse } from 'axios';
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

const baseUrl: string = 'https://practice.alpaca.kr/api'

const login = () => {
    axios.post(baseUrl + '/users/login/', {
        username: "user1",
        password: "qwerrewq"
    })
    .then((response: AxiosResponse) => {
        console.log(response);
    })
    .catch((err: AxiosError) => {
        console.log(err);
    });
}

class LoginCard extends React.Component<ClassNames> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <MuiThemeProvider theme={korTheme}>
                    <Card className={classes.card}>
                        <TextField className={classes.idTextField} label="아이디" />
                        <TextField className={classes.pwTextField} label="비밀번호" type="password" />
                        <Button className={classes.loginButton} variant="contained" color="primary" onClick={login}>로그인</Button>
                    </Card>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default withStyles(styles)(LoginCard);