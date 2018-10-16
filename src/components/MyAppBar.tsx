import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { action, observable } from "mobx"
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import AppStore from '../stores/app';
import LoadingStore from '../stores/loading';
import TodoStore from'../stores/todo';
import { engTheme, korTheme } from '../theme';


const styles = createStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        flexGrow: 1
    },
    buttonAdd: {
        position: 'fixed',
        top: '36px',
        zIndex: 1101
    },
    buttonLogout: {
        color: 'white',
        fontSize: '16px'
    },
    dialogTitle: {
        width: '552px'
    },
    dialogFailedContent: {
        color: 'rgba(0, 0, 0, 0.54)'
    }
});

interface IProps extends WithStyles<typeof styles> {
    app?: AppStore;
    loading?: LoadingStore;
    todo?: TodoStore;
}

@inject('app', 'loading', 'todo')
@observer
class MyAppBar extends React.Component<IProps> {
    @observable private isOpenedDialogAdd = false;
    @observable private content = '';
    @observable private isOpenedDialogFailed = false;

    @action private openDialogAdd = () => {
        this.isOpenedDialogAdd = true;
    }

    @action private closeDialogAdd = () => {
        this.isOpenedDialogAdd = false;
        this.content = '';
    }

    @action private openDialogFailed = () => {
        this.isOpenedDialogFailed = true;
    }

    @action private closeDialogFailed = () => {
        this.isOpenedDialogFailed = false;
    }


    @action
    private handleChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.content = event.currentTarget.value;
    }

    private handleClickButtonLogout = (event: React.MouseEvent<HTMLDivElement>) => {
        const app = this.props.app as AppStore;
        app.logout();
        localStorage.removeItem('authToken');
    }

    private handleClickFabButtonAdd = () => {
        this.openDialogAdd();
    }
    
    private handleClickButtonAdd = () => {
        if(this.content.length > 100) {
            this.openDialogFailed();
        } else {
            this.addTodo(this.content);
        }
        this.closeDialogAdd();
    }

    private handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if(event.keyCode === 13) {
            this.addTodo(this.content);
            this.closeDialogAdd();
        }
    }

    private handleCloseDialogAdd = () => {
        this.closeDialogAdd();
    }

    private handleClickButtonCancel = () => {
        this.closeDialogAdd();
    }

    private addTodo = (content: string) => {
        const loading = this.props.loading as LoadingStore;
        const todo = this.props.todo as TodoStore;
        loading.startLoading();
        axios.post('https://practice.alpaca.kr/api/todo/', {
            content: this.content
        }, {
            headers: { 'Authorization': 'Token ' + localStorage.getItem('authToken') },
        })
        .then((response: AxiosResponse) => {
            todo.addTodo(response.data);
            loading.endLoading();
        })
        .catch((err: AxiosError) => {
            if(err.response !== undefined) {
                console.log(err.response);
            }
            loading.endLoading();
        });
    }

    private handleCloseDialogFailed = () => {
        this.closeDialogFailed();
    }

    private handleClickButtonSubmit = () => {
        this.closeDialogFailed();
    }

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
                                <Button className={classes.buttonLogout} onClick={this.handleClickButtonLogout}>로그아웃</Button>
                                </MuiThemeProvider>
                            ) : ('')}
                        </Toolbar>
                    </AppBar>
                    {app.isLogined ? (
                        <Button className={classes.buttonAdd} variant="fab" color="secondary" aria-label="add" onClick={this.handleClickFabButtonAdd}>
                            <AddIcon />
                        </Button>
                    ) : ('')}
                </MuiThemeProvider>
                <MuiThemeProvider theme={korTheme}>
                    <Dialog open={this.isOpenedDialogAdd} onClose={this.handleCloseDialogAdd}>
                        <DialogTitle className={classes.dialogTitle}>새 할 일 추가하기</DialogTitle>
                        <DialogContent>
                            <TextField autoFocus={true} margin="dense" label="내용" fullWidth={true} value={this.content} onChange={this.handleChangeContent} onKeyDown={this.handleKeyDown} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClickButtonCancel} color="primary">
                                취소
                            </Button>
                            <Button onClick={this.handleClickButtonAdd} color="primary">
                                추가
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={this.isOpenedDialogFailed} onClose={this.handleCloseDialogFailed}>
                        <DialogTitle className={classes.dialogTitle}>할 일 추가에 실패했습니다.</DialogTitle>
                        <DialogContent>
                            <Typography className={classes.dialogFailedContent}>할 일의 내용이 너무 깁니다. 100자 이내의 내용만 추가할 수 있습니다.</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClickButtonSubmit} color="primary">
                                확인
                            </Button>
                        </DialogActions>
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withStyles(styles)(MyAppBar);