import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputBase from '@material-ui/core/InputBase';
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
import RootStore from '../stores/root';
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
    ratio: {
        color: 'white',
        marginRight: '28px'
    },
    search: {
        padding: '2px 12px',
        marginRight: '20px',
        backgroundColor: 'white',
        border: '1px solid rgba(0, 0, 0, 0.54)',
        borderRadius: '6px'
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
    root?: RootStore
}

@inject('root')
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

    private handleChangeSearchWord = (event: React.ChangeEvent<HTMLInputElement>) => {
        const root = this.props.root as RootStore;
        root.searchStore.setSearchWord(event.currentTarget.value);
    }

    private handleClickButtonLogout = (event: React.MouseEvent<HTMLDivElement>) => {
        const root = this.props.root as RootStore;
        root.appStore.logout();
        localStorage.removeItem('authToken');
    }

    private handleClickFabButtonAdd = () => {
        this.openDialogAdd();
    }
    
    private onSubmitAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(this.content.length > 100) {
            this.openDialogFailed();
        } else {
            this.addTodo(this.content);
        }
        this.closeDialogAdd();
    }

    private handleCloseDialogAdd = () => {
        this.closeDialogAdd();
    }

    private handleClickButtonCancel = () => {
        this.closeDialogAdd();
    }

    private addTodo = (content: string) => {
        const root = this.props.root as RootStore;
        root.loadingStore.startLoading();
        axios.post('https://practice.alpaca.kr/api/todo/', {
            content: this.content
        }, {
            headers: { 'Authorization': 'Token ' + localStorage.getItem('authToken') },
        })
        .then((response: AxiosResponse) => {
            root.todoStore.addTodo(response.data);
            root.loadingStore.endLoading();
        })
        .catch((err: AxiosError) => {
            if(err.response !== undefined) {
                console.log(err.response);
            }
            root.loadingStore.endLoading();
        });
    }

    private handleCloseDialogFailed = () => {
        this.closeDialogFailed();
    }

    private handleClickButtonSubmit = () => {
        this.closeDialogFailed();
    }

    private dialogContentAddStyle = {
        paddingTop: '0px'
    };

    public render() {
        const root = this.props.root as RootStore;
        const { classes } = this.props;
        const count = root.todoStore.todoList.length;
        let completedCount = 0
        root.todoStore.todoList.forEach((item) => {
            if(item.isCompleted) {
                completedCount++;
            }
        });
        return (
            <div className={classes.root}>
                <MuiThemeProvider theme={engTheme}>
                    <AppBar color='primary'>
                        <Toolbar>
                            <Typography className={classes.title} variant="title" color="inherit">
                                TODO Practice
                            </Typography>
                            {root.appStore.isLogined ? (
                                <MuiThemeProvider theme={korTheme}>
                                    <Typography className={classes.ratio}>
                                        {count === 0 ? 0 : Math.ceil(completedCount / count * 10000) / 100}% 완료되었습니다. ({count}개 중 {completedCount}개 완료)
                                    </Typography>
                                    <InputBase className={classes.search} placeholder="검색" value={root.searchStore.searchWord} onChange={this.handleChangeSearchWord} />
                                    <Button className={classes.buttonLogout} onClick={this.handleClickButtonLogout}>로그아웃</Button>
                                </MuiThemeProvider>
                            ) : ('')}
                        </Toolbar>
                    </AppBar>
                    {root.appStore.isLogined ? (
                        <Button className={classes.buttonAdd} variant="fab" color="secondary" aria-label="add" onClick={this.handleClickFabButtonAdd}>
                            <AddIcon />
                        </Button>
                    ) : ('')}
                </MuiThemeProvider>
                <MuiThemeProvider theme={korTheme}>
                    <Dialog open={this.isOpenedDialogAdd} onClose={this.handleCloseDialogAdd}>
                        <DialogTitle className={classes.dialogTitle}>새 할 일 추가하기</DialogTitle>
                        <form onSubmit={this.onSubmitAdd}>
                            <DialogContent style={this.dialogContentAddStyle}>
                                <TextField autoFocus={true} margin="dense" label="내용" fullWidth={true} value={this.content} onChange={this.handleChangeContent}/>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClickButtonCancel} color="primary">
                                    취소
                                </Button>
                                <Button type="submit" color="primary">
                                    추가
                                </Button>
                            </DialogActions>
                        </form>
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