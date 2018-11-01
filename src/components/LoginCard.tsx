import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import RootStore from '../stores/root';

const styles = createStyles({
    root: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: "inherit"
    },
    card: {
        minWidth: '344px',
        minHeight: '220px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
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
    errorMessage: {
        marginTop: "16px",
        color: "red"
    }
});

interface IProps extends WithStyles<typeof styles> {
    root?: RootStore;
}

@inject('root')
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

    constructor(props: IProps) {
        super(props);
        const root = this.props.root as RootStore;
        if(localStorage.getItem('authToken') !== null) {
            root.appStore.login();
        }
    }

    private onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.login();
    }

    private login = () => {
        const root = this.props.root as RootStore;
        root.loadingStore.startLoading();
        axios.post('https://practice.alpaca.kr/api/users/login/', {
            username: this.username,
            password: this.password
        })
        .then((response: AxiosResponse) => {
            localStorage.setItem('authToken', response.data.authToken);
            root.appStore.login();
            root.loadingStore.endLoading();
        })
        .catch((err: AxiosError) => {
            this.loginFailed();
            root.loadingStore.endLoading();
        });
    }

    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <form className={classes.form} onSubmit={this.onSubmit}>
                        <TextField className={classes.idTextField} label="아이디" value={this.username} onChange={this.handleChangeUsername}/>
                        <TextField className={classes.pwTextField} label="비밀번호" type="password" value={this.password} onChange={this.handleChangePassword}/>
                        <Button type="submit" variant="contained" color="primary">로그인</Button>
                    </form>
                </Card>
                {this.isLoginFailed ? (
                    <Typography className={classes.errorMessage} component="p">
                        아이디 또는 비밀번호가 일치하지 않습니다.
                    </Typography>
                ) : ('')}
            </div>
        )
    }
}

export default withStyles(styles)(LoginCard);