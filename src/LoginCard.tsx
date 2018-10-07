import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import AppStore from './stores/app';
import { korTheme } from './theme';

const styles = createStyles({
    root: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        height: "inherit"
    },
    card: {
        minWidth: '344px',
        minHeight: '220px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    idTextField: {
        marginBottom: '18px'
    },
    pwTextField: {
        marginBottom: '24px'
    },
    loginButton: {

    },
    errorMessage: {
        marginTop: "16px",
        color: "red"
    }
});

interface IProps extends WithStyles<typeof styles> {
    app?: AppStore;
}

@inject('app')
@observer
class LoginCard extends React.Component<IProps> {
    @observable private username = '';
    @observable private password = '';
    @observable private isLoginFailed = false;

    @action
    private handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.username = event.currentTarget.value;
    }

    @action
    private handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.password = event.currentTarget.value;
    }

    @action
    private loginFailed = () => {
        this.isLoginFailed = true;
    }

    private handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if(event.keyCode === 13) {
            this.login();
        }
    }

    private login = () => {
        const app = this.props.app as AppStore;
        axios.post('https://practice.alpaca.kr/api/users/login/', {
            username: this.username,
            password: this.password
        })
        .then((response: AxiosResponse) => {
            if(response.status === 200) {
                app.logined();
                console.log("성공");
            }
        })
        .catch((err: AxiosError) => {
            if(err.response !== undefined) {
                if(err.response.status === 422) {
                    this.loginFailed();
                    console.log("실패");
                }
            }
        });
    }

    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <MuiThemeProvider theme={korTheme}>
                    <Card className={classes.card}>
                        <TextField className={classes.idTextField} label="아이디" value={this.username} onChange={this.handleChangeUsername} onKeyDown={this.handleKeyDown} />
                        <TextField className={classes.pwTextField} label="비밀번호" type="password" value={this.password} onChange={this.handleChangePassword} onKeyDown={this.handleKeyDown} />
                        <Button className={classes.loginButton} variant="contained" color="primary" onClick={this.login} >로그인</Button>
                    </Card>
                    {this.isLoginFailed ? (
                        <div className={classes.errorMessage}>
                            아이디 또는 비밀번호가 일치하지 않습니다.
                        </div>
                    ) : ('')}
                </MuiThemeProvider>
            </div>
        )
    }
}

export default withStyles(styles)(LoginCard);