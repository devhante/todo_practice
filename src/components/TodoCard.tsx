import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { TodoSerializer } from '../serializer';
import TodoStore from '../stores/todo'

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
    name: {
        
    },
    bottom: {
        display: 'flex',
        marginTop: '12px'
    },
    buttonRevert: {

    },
    buttonComplete: {
        marginRight: '4px'
    },
    buttonDelete: {

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
});

interface IProps extends WithStyles<typeof styles> {
    id: number;
    todo?: TodoStore;
}

@inject('todo')
@observer
class TodoCard extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    private addLike = () => {
        const todo = this.props.todo as TodoStore;
        axios.post('https://practice.alpaca.kr/api/todo/' + this.props.id + '/add_like/','', {
            headers: { 'Authorization': 'Token ' + localStorage.getItem('authToken') }
        })
        .then((response: AxiosResponse) => {
            const data = response.data as TodoSerializer;
            todo.setLike(data.id, data.like);
        })
        .catch((err: AxiosError) => {
            if(err.response !== undefined) {
                console.log(err.response);
            }
        });
    }

    private revert = () => {
        const todo = this.props.todo as TodoStore;
        axios.post('https://practice.alpaca.kr/api/todo/' + this.props.id + '/revert_complete/', '', {
            headers: { 'Authorization': 'Token ' + localStorage.getItem('authToken') }
        })
        .then((response: AxiosResponse) => {
            const id = response.data.id as number;
            todo.revertTodo(id);
        })
        .catch((err: AxiosError) => {
            if(err.response !== undefined) {
                console.log(err.response);
            }
        });
    }

    private complete = () => {
        const todo = this.props.todo as TodoStore;
        axios.post('https://practice.alpaca.kr/api/todo/' + this.props.id + '/complete/', '', {
            headers: { 'Authorization': 'Token ' + localStorage.getItem('authToken') }
        })
        .then((response: AxiosResponse) => {
            const data = response.data as TodoSerializer;
            todo.completeTodo(data.id, data.completedAt);
        })
        .catch((err: AxiosError) => {
            if(err.response !== undefined) {
                console.log(err.response);
            }
        });
    }

    private delete = () => {
        const todo = this.props.todo as TodoStore;
        axios.delete('https://practice.alpaca.kr/api/todo/' + this.props.id + '/', {
            headers: { 'Authorization': 'Token ' + localStorage.getItem('authToken') }
        })
        .then((response: AxiosResponse) => {
            const id = response.data.id as number;
            todo.deleteTodo(id);
        })
        .catch((err: AxiosError) => {
            if(err.response !== undefined) {
                console.log(err.response);
            }
        });
    }

    public render() {
        const todo = this.props.todo as TodoStore;
        const { classes } = this.props;

        let myTodo = new TodoSerializer;
        todo.todoList.forEach((item) => {
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
                <Typography className={[classes.middle, classes.name].join(' ')}>
                    {myTodo.user.name}
                </Typography>
                <Typography className={classes.middle}>
                    {createdYear}년 {createdMonth}월 {createdDate}일 {createdAmpm} {createdHour}시 {createdMinute}분 {createdSecond}초에 생성됨
                </Typography>
                {myTodo.isCompleted ? (
                    <Typography className={classes.middle}>
                        {completedYear}년 {completedMonth}월 {completedDate}일 {completedAmpm} {completedHour}시 {completedMinute}분 {completedSecond}초에 생성됨
                    </Typography>
                ) : ('')}
                <div className={classes.bottom}>
                    {myTodo.isCompleted ? (
                        <Button className={classes.buttonRevert} size="medium" color="primary" onClick={this.revert}>
                            되돌리기
                        </Button>
                    ) : (
                        <React.Fragment>
                            <Button className={classes.buttonComplete} size="medium" color="primary" onClick={this.complete}>
                                완료
                            </Button>
                            <Button className={classes.buttonDelete} size="medium" color="primary" onClick={this.delete}>
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
            </Card>
        );
    }
}

export default withStyles(styles)(TodoCard);