import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { TodoSerializer } from '../serializer';
import RootStore from '../stores/root';

const styles = createStyles({
    root: {
        width: '344px',
        marginBottom: "36px",
        padding: '16px 24px 8px 8px'
    },
    content: {
        fontSize: '24px',
        marginLeft: '16px',
        marginBottom: '12px'
    },
    middle: {
        marginLeft: '16px',
        color: 'rgba(0, 0, 0, 0.39)' 
    },
    bottom: {
        display: 'flex',
        marginTop: '12px'
    },
    buttonComplete: {
        marginRight: '4px'
    },
    blank: {
        flexGrow: 1
    },
    likeNumber: {
        padding: '12px'
    },
    likeGray: {
        color: 'rgba(0, 0, 0, 0.54)'
    },
    likeRed: {
        color: '#E31B23'
    },
    dialogWarningTitle: {
        width: '552px'
    },
    dialogWarningContent: {
        color: 'rgba(0, 0, 0, 0.54)'
    }
});

interface IProps extends WithStyles<typeof styles> {
    id: number;
    root?: RootStore;
}

@inject('root')
@observer
class TodoCard extends React.Component<IProps> {
    @observable private isOpenedDialogWarning = false;
    
    @action private openDialogWarning = () => {
        this.isOpenedDialogWarning = true;
    }

    @action private closeDialogWarning = () => {
        this.isOpenedDialogWarning = false;
    }

    constructor(props: IProps) {
        super(props);
    }

    private addLike = () => {
        const root = this.props.root as RootStore;
        root.loadingStore.startLoading();
        axios.post('https://practice.alpaca.kr/api/todo/' + this.props.id + '/add_like/','', {
            headers: { 'Authorization': 'Token ' + localStorage.getItem('authToken') }
        })
        .then((response: AxiosResponse) => {
            const data = response.data as TodoSerializer;
            root.todoStore.setLike(data.id, data.like);
            root.loadingStore.endLoading();
        })
        .catch((err: AxiosError) => {
            if(err.response !== undefined) {
                console.log(err.response);
            }
            root.loadingStore.endLoading();
        });
    }

    private revert = () => {
        const root = this.props.root as RootStore;
        root.loadingStore.startLoading();
        axios.post('https://practice.alpaca.kr/api/todo/' + this.props.id + '/revert_complete/', '', {
            headers: { 'Authorization': 'Token ' + localStorage.getItem('authToken') }
        })
        .then((response: AxiosResponse) => {
            const id = response.data.id as number;
            root.todoStore.revertTodo(id);
            root.loadingStore.endLoading();
        })
        .catch((err: AxiosError) => {
            if(err.response !== undefined) {
                console.log(err.response);
            }
            root.loadingStore.endLoading();
        });
    }

    private complete = () => {
        const root = this.props.root as RootStore;
        root.loadingStore.startLoading();
        axios.post('https://practice.alpaca.kr/api/todo/' + this.props.id + '/complete/', '', {
            headers: { 'Authorization': 'Token ' + localStorage.getItem('authToken') }
        })
        .then((response: AxiosResponse) => {
            const data = response.data as TodoSerializer;
            root.todoStore.completeTodo(data.id, data.completedAt);
            root.loadingStore.endLoading();
        })
        .catch((err: AxiosError) => {
            if(err.response !== undefined) {
                console.log(err.response);
            }
            root.loadingStore.endLoading();
        });
    }

    private delete = () => {
        const root = this.props.root as RootStore;
        root.loadingStore.startLoading();
        axios.delete('https://practice.alpaca.kr/api/todo/' + this.props.id + '/', {
            headers: { 'Authorization': 'Token ' + localStorage.getItem('authToken') }
        })
        .then((response: AxiosResponse) => {
            const id = response.data.id as number;
            root.todoStore.deleteTodo(id);
            root.loadingStore.endLoading();
        })
        .catch((err: AxiosError) => {
            if(err.response !== undefined) {
                console.log(err.response);
            }
            root.loadingStore.endLoading();
        });
    }

    private handleCloseDialogWarning = () => {
        this.closeDialogWarning();
    }

    private handleClickButtonCancel = () => {
        this.closeDialogWarning();
    }

    private handleClickButtonSubmit = () => {
        this.delete();
        this.closeDialogWarning();
    }

    public render() {
        const root = this.props.root as RootStore;
        const { classes } = this.props;

        let myTodo = new TodoSerializer;
        root.todoStore.todoList.forEach((item) => {
           if(item.id === this.props.id) {
               myTodo = item;
           }
        });

        const createdYear = Number(myTodo.createdAt.substring(0, 4));
        const createdMonth = Number(myTodo.createdAt.substring(5, 7));
        const createdDate = Number(myTodo.createdAt.substring(8, 10));
        const createdAmpm = Number(myTodo.createdAt.substring(11, 13)) < 12 ? '오전' : '오후';
        let createdHour = Number(myTodo.createdAt.substring(11, 13));
        const createdMinute = Number(myTodo.createdAt.substring(14, 16));
        const createdSecond = Number(myTodo.createdAt.substring(17, 19));

        
        const completedYear = myTodo.isCompleted ? Number(myTodo.completedAt.substring(0, 4)) : null;
        const completedMonth = myTodo.isCompleted ? Number(myTodo.completedAt.substring(5, 7)) : null;
        const completedDate = myTodo.isCompleted ? Number(myTodo.completedAt.substring(8, 10)) : null;
        const completedAmpm = myTodo.isCompleted ? Number(myTodo.completedAt.substring(11, 13)) < 12 ? '오전' : '오후' : null;
        let completedHour = myTodo.isCompleted ? Number(myTodo.completedAt.substring(11, 13)) : null;
        const completedMinute = myTodo.isCompleted ? Number(myTodo.completedAt.substring(14, 16)) : null;
        const completedSecond = myTodo.isCompleted ? Number(myTodo.completedAt.substring(17, 19)) : null;

        if(createdHour > 12) {
            createdHour -= 12;
        }

        if(completedHour != null) {
            if(completedHour > 12) {
                completedHour -= 12;
            }
        }

        return (
            <Card className={classes.root}>
                <Typography className={classes.content}>
                    {myTodo.content}
                </Typography>
                <Typography className={classes.middle}>
                    {myTodo.user.name}
                </Typography>
                <Typography className={classes.middle}>
                    {createdYear}년 {createdMonth}월 {createdDate}일 {createdAmpm} {createdHour}시 {createdMinute}분 {createdSecond}초에 생성됨
                </Typography>
                {myTodo.isCompleted ? (
                    <Typography className={classes.middle}>
                        {completedYear}년 {completedMonth}월 {completedDate}일 {completedAmpm} {completedHour}시 {completedMinute}분 {completedSecond}초에 완료됨
                    </Typography>
                ) : ('')}
                <div className={classes.bottom}>
                    {myTodo.isCompleted ? (
                        <Button size="medium" color="primary" onClick={this.revert}>
                            되돌리기
                        </Button>
                    ) : (
                        <React.Fragment>
                            <Button className={classes.buttonComplete} size="medium" color="primary" onClick={this.complete}>
                                완료
                            </Button>
                            <Button size="medium" color="primary" onClick={this.openDialogWarning}>
                                삭제
                            </Button>
                        </React.Fragment>
                    )}
                    <span className={classes.blank} />
                    <IconButton className={myTodo.like > 0 ? classes.likeRed : classes.likeGray} onClick={this.addLike}>
                        <FavoriteIcon fontSize="small"/>
                    </IconButton>
                    <Typography className={[classes.likeNumber, myTodo.like > 0 ? classes.likeRed : classes.likeGray].join(' ')}>
                        {myTodo.like}
                    </Typography>
                </div>
                <Dialog open={this.isOpenedDialogWarning} onClose={this.handleCloseDialogWarning}>
                    <DialogTitle className={classes.dialogWarningTitle}>할 일 삭제하기</DialogTitle>
                    <DialogContent>
                        <Typography className={classes.dialogWarningContent}>정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClickButtonCancel} color="primary">
                            취소
                        </Button>
                        <Button onClick={this.handleClickButtonSubmit} color="primary">
                            확인
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        );
    }
}

export default withStyles(styles)(TodoCard);